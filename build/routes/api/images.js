"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resize_1 = __importDefault(require("../utilities/resize"));
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default();
//define a router for the default homepage
const images = express_1.default.Router();
//Get all parameters
images.get('/', (req, res) => {
    const filename = req.query.filename;
    const heightParam = req.query.height;
    const widthParam = req.query.width;
    // Response when filename is not supplied
    if (typeof filename == 'undefined' || typeof filename != 'string') {
        res.send('Supply a filename');
        return;
    }
    //Checks that width and height are not undefined
    let height = NaN;
    if (typeof heightParam != 'undefined' && typeof heightParam == 'string') {
        height = parseInt(heightParam);
    }
    let width = NaN;
    if (typeof widthParam != 'undefined' && typeof widthParam == 'string') {
        width = parseInt(widthParam);
    }
    // Create a filepath based on the filename passed
    const filePath = path_1.default.join(__dirname, '../../assets/full', `${filename}.jpg`);
    // Check if the file exists in the system
    return fs_1.default.promises
        .access(filePath)
        .then(() => {
        // send existing if height and width are not passed or invalid
        if (!(height && width)) {
            console.log('I am here');
            res.sendFile(filePath);
            return;
        }
        //Cache Implemented here
        const key = req.originalUrl;
        const Response = cache.get(key);
        if (Response) {
            console.log('I am picking from cache');
            res.sendFile(Response);
        }
        else {
            const thumbPath = path_1.default.join(__dirname, '../../assets/thumb', `${filename}-${width}x${height}.jpg`);
            (0, resize_1.default)(filename, width, height)
                .then(() => {
                cache.set(key, thumbPath);
                console.log('I am picking outside the cache');
                res.sendFile(thumbPath);
            })
                .catch((err) => {
                console.error(err);
                res.status(404).end();
            });
        }
    })
        .catch((err) => {
        console.error(err);
        res.status(404).end();
    });
});
exports.default = images;
