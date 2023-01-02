import express from 'express';
import images from './api/images';

//define a router for the default homepage
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('default page');
});

// using the image router
routes.use('/images', images);

export default routes;
