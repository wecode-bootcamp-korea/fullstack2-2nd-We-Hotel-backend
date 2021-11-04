import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`서버가 ${PORT}번에 열렸다!!!!!!!`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
