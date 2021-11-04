import express from 'express';
import router from './routes';
import { errorHandler } from './middleware';
import cookieParser from 'cookie-parser';
import passport from 'passport-local';
import cors from 'cors';
import session from 'express-session';
// import './utils/dataUpload/dataUpload' 나중에 csv 파일 업로드 할때 쓰일 것

const app = express();
app.use(
  session({
    secret: '!!@!@!',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);
app.use(errorHandler);

export default app;
