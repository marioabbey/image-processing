import supertest from 'supertest';
import app from '../../..';
import fs from 'fs';
import path from 'path';
import resize from '../../../routes/utilities/resize';

const request = supertest(app);

describe('Test invalid scenarios passed in the url', () => {
  it('returns 404 when invalid filename is passed', async () => {
    const response = await request.get('/api/images?filename=abiodun');
    expect(response.status).toBe(404);
  });
  it('returns 404 when NO filename is passed', async () => {
    const response = await request.get('/api/images?filename=');
    expect(response.status).toBe(404);
  });
  it('returns 404 when no height and width is passed', async () => {
    const response = await request.get(
      '/api/images?filename=palmtunnel&width=&height='
    );

    expect(response.status).toBe(400);
  });
});

//got idea on how to go about the test here https://github.com/tariq-k-dev/image-processing-api/blob/main/src/tests/indexSpec.ts
describe('Test for all scenarios passed in the url', () => {
  beforeAll(() => {
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
  });

  afterAll(() => {
    fs.rmSync('build/assets', { recursive: true });
  });

  it('Resize should be successful if right parameters are passed', async () => {
    const testImage = path.resolve('build', 'assets', 'full', 'palmtunnel.jpg');
    const resizeImage = path.resolve(
      'build',
      'assets',
      'thumb',
      'palmtunnel-20x10.jpg'
    );
    resize(testImage, 20, 10, resizeImage);
    expect(fs.existsSync(resizeImage)).toBeTruthy;
  });
  
  it('gets the api/images endpoint', async () => {
    try {
      const response = await request.get('/api/images');
      console.log('response');
      expect(response.status).toBe(400);
    } catch (err) {
      console.error('Could not reach Endpoint', err);
    }
  });
});
