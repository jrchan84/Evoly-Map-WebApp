import * as express from 'express';
import * as compression from 'compression';
import apiRouter from './routes/routes';

const app = express();

app.use(compression());
app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.listen(port, () => console.log(`Server listening on port: ${port}, env: ${env}`));
