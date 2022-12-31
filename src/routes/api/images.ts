import express from "express";
import path from "path";
import resize from "../utilities/resize";
var cacheService = require("express-api-cache");
const cache = cacheService.cache;

//define a router for the default homepage
const images = express.Router();


//Get all parameters
images.get("/", cache("10 minutes"), (req, res) => {
  const filename = req.query.filename;
  const heightParam = req.query.height;
  const widthParam = req.query.width;

  // Response when filename is not supplied
  if (typeof filename == "undefined" || typeof filename != "string") {
    res.send("Supply a filename");
    return;
  }

  //Checks that width and height are not undefined
  let height = NaN;
  if (typeof heightParam != "undefined" && typeof heightParam == "string") {
    height = parseInt(heightParam);
  }

  let width = NaN;
  if (typeof widthParam != "undefined" && typeof widthParam == "string") {
    width = parseInt(widthParam);
  }


  //create the filepath for the converted image
  const thumbPath = path.join(
    __dirname,
    "../../assets/thumb",
    `${filename}-${width}x${height}.jpg`
  );


  resize(filename, width, height).then(() => {
    res.sendFile(thumbPath);
  })
  .catch((err) => {
    res.status(400).json({ error: err.message })
  });
  
});

export default images ;
