"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require("../../.."));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resize_1 = __importDefault(require("../../../routes/utilities/resize"));
const request = (0, supertest_1.default)(__1.default);
describe('Test invalid scenarios passed in the url', () => {
    it('returns 404 when invalid filename is passed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=abiodun');
        expect(response.status).toBe(404);
    }));
    it('returns 404 when NO filename is passed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=');
        expect(response.status).toBe(404);
    }));
    it('returns 404 when no height and width is passed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=palmtunnel&width=&height=');
        expect(response.status).toBe(404);
    }));
});
//got idea on how to go about the test here https://github.com/tariq-k-dev/image-processing-api/blob/main/src/tests/indexSpec.ts
describe('Test for all scenarios passed in the url', () => {
    beforeEach(() => {
        try {
            fs_1.default.mkdirSync(path_1.default.resolve('build', 'assets', 'thumb'), {
                recursive: true,
            });
        }
        catch (err) {
            console.error('could not create directory', err);
        }
        try {
            fs_1.default.mkdirSync(path_1.default.resolve('build', 'assets', 'full'), {
                recursive: true,
            });
        }
        catch (err) {
            console.error('could not create directory', err);
        }
        const TestImage = path_1.default.resolve('src', 'assets', 'full', 'palmtunnel.jpg');
        const ImgOutput = path_1.default.resolve('build', 'assets', 'full', 'palmtunnel.jpg');
        try {
            fs_1.default.copyFileSync(TestImage, ImgOutput);
        }
        catch (err) {
            console.error('System could not copy file', err);
        }
    });
    // afterAll(() => {
    //   fs.rmSync('build/assets', { recursive: true });
    // });
    it('returns 200 when valid details  are  passed', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?filename=palmtunnel&width=20&height=10');
        const testPath = path_1.default.join('build', 'assets', 'thumb', 'palmtunnel-20x$10.jpg');
        (0, resize_1.default)('palmtunnel', 20, 10);
        expect(fs_1.default.existsSync(testPath)).toBeTruthy;
    }));
});
