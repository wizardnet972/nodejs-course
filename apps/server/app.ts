import express from 'express';
import helmet from 'helmet';
import bodyParser, { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import compress from 'compression';
import path from 'path';
import { routes } from './routes';
import { clientErrorHandler, errorHandler } from '@modules/core';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

app.use(helmet());

app.use(routes);

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
  console.log('in /');
  // write logic...

  res.send('welcome to homepage!');
});

app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
