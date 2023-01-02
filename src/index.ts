import express from 'express';
import routes from "./routes/index"

//import routes from './routes/api/images';
//import logger from './routes/utilities/logger';

const app = express();
const port = 3000;

//all endpoint should use api
app.use('/api', routes);

//start Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

export default app;