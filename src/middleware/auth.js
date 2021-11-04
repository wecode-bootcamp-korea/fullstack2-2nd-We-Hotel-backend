import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userDao } from '../models';
dotenv.config();

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(' ')[1];
  const { JWT_SECRET_KEY } = process.env;

  jwt.verify(token, JWT_SECRET_KEY, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userDao.findUserByEmail(decoded.email);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userEmail = user.email;
    req.status = user.status;
    req.token = token;
    next();
  });
};
