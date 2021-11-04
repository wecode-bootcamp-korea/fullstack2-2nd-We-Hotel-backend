import { userDAO } from '../models';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const createJwtToken = async email => {
  const { secret } = process.env;
  return jwt.sign({ email }, secret, {
    algorithm: 'HS256',
  });
}; //토큰

const createUser = async userInfo => {
  const newUser = await userDAO.createUser(userInfo);
  return newUser;
}; //유저생성

const isExistedUser = async userInfo => {
  const { email } = userInfo;
  const isExistedUser = await userDAO.findUserByEmail(email);
  if (isExistedUser.length !== 0) {
    return true;
  } else {
    false;
  }
};

const getUserInfo = async userInfo => {
  const user = await userDAO.findUserByEmail(userInfo);
  return user;
};

const signInKakao = async userInfo => {
  const {
    email,
    profile: { nickname },
  } = userInfo;
  const isExistedUser = await userDAO.findUserByEmail(email);
  if (!isExistedUser) {
    await userDAO.createSocialUser({
      email,
      nickname,
    });
    return false;
  } else {
    createJwtToken(isExistedUser.email);
  }
};

export default {
  createUser,
  signInKakao,
  isExistedUser,
  getUserInfo,
  createJwtToken,
};
