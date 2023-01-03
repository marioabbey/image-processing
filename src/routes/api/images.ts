import express from 'express';
import path from 'path';
import resize from '../utilities/resize';
import fileExist from '../utilities/file-exist';

//define a router for the default homepage
const images = express.Router();

//Get all parameters
images.get('/', (req, res) => {
  const filename = req.query.filename;
  const heightParam = req.query.height;
  const widthParam = req.query.width;

  // Response when filename is not supplied
  if (typeof filename == 'undefined' || typeof filename != 'string') {
    res.status(400).json({ message: 'Filename was not supplied ' });
    return;
  }

  //Checks that width and height are not undefined and that no alpahbet is passed - New line Added
  let height = NaN;
  if (
    typeof heightParam != 'undefined' &&
    typeof heightParam == 'string' &&
    /^\d+$/.test(heightParam)
  ) {
    height = parseInt(heightParam);
  }

  if (typeof heightParam != 'undefined' && (isNaN(height) || height < 1)) {
    res.status(400).json({ message: 'Invalid Height was passed' });
    return;
  }

  let width = NaN;
  if (
    typeof widthParam != 'undefined' &&
    typeof widthParam == 'string' &&
    /^\d+$/.test(widthParam)
  ) {
    width = parseInt(widthParam);
  }
  if (typeof widthParam != 'undefined' && (isNaN(width) || width < 1)) {
    res.status(400).json({ message: 'Invalid Width was passed' });
    return;
  }

  const thumbPath = path.join(
    __dirname,
    '../../assets/thumb',
    `${filename}-${width}x${height}.jpg`
  );
  //checking if the file already exist
  if (fileExist(thumbPath)) {
    res.sendFile(thumbPath);
    return;
  }

  // Create a filepath based on the filename passed
  const filePath = path.join(__dirname, '../../assets/full', `${filename}.jpg`);
  //const filePath = path.resolve('src', 'assets', 'full', `${filename}.jpg`);

  // Check if the file exists in the system
  if (!fileExist(filePath)) {
    res.status(404).json({ message: 'Filename not found' });
    return;
  }
  // send existing if height and width are not passed or invalid
  if (!(height && width)) {
    res.sendFile(filePath);
    return;
  }

  return resize(filePath, width, height, thumbPath)
    .then(() => {
      res.sendFile(thumbPath);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while processing' });
    });
});

export default images;
