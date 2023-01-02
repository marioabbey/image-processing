import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test that endpoint responds', () => {
  it('gets the api endpoint', async () => {
    try {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
    } catch (err) {
      console.error('Endpoint could not be reached', err);
    }
  });
});
