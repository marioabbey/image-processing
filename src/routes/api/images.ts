import express from "express";
import fs from "fs";
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

// Create a filepath based on the filename passed
  const filePath = path.join(__dirname, "../../assets/full", `${filename}.jpg`);

// Check if the file exists in the system
  return fs.promises
    .access(filePath)
    .then(() => {
      // send existing if height and width are not passed or invalid
      if (!(height && width)) {
        console.log('I am here')
        res.sendFile(filePath);
        return;
      }
      const thumbPath = path.join(
        __dirname,
        "../../assets/thumb",
        `${filename}-${width}x${height}.jpg`
      );

      resize(filename, width, height)
        .then(() => {
          res.sendFile(thumbPath);
        })
        .catch((err) => {
          res.status(404).end();
        });
    })

    .catch((err) => {
      console.error(err);
      res.status(404).end();
    });
});

export default images;
