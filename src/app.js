import express from 'express';
import router from './routes';
import { errorHandler } from './middleWares';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);
app.use(errorHandler);

export default app;
