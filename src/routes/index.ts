import express from 'express';
import path from 'path';
import images from './api/images';
import fs from 'fs';

//define a router for the default homepage
const routes = express.Router();


  try {
    fs.mkdirSync(path.resolve('build', 'assets', 'thumb'), {
      recursive: true,
    });
  } catch (err) {
    console.error('could not create directory', err);
  }
  try {
    fs.mkdirSync(path.resolve('build', 'assets', 'full'), {
      recursive: true,
    });
  } catch (err) {
    console.error('could not create directory', err);
  }
  const TestImage = path.resolve('src', 'assets', 'full', 'palmtunnel.jpg');
  const ImgOutput = path.resolve('build', 'assets', 'full', 'palmtunnel.jpg');

  try {
    fs.copyFileSync(TestImage, ImgOutput);
  } catch (err) {
    console.error('System could not copy file', err);
  }


routes.get('/', function (req: express.Request, res: express.Response): void {
  res.send('default page');
});

// using the image router
routes.use('/images', images);

export default routes;
