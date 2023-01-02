"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
//import routes from './routes/api/images';
//import logger from './routes/utilities/logger';
const app = (0, express_1.default)();
const port = 3000;
//all endpoint should use api
app.use('/api', index_1.default);
//start Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
