import { userDao } from '../models';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const createJwtToken = async (email, status) => {
  const { JWT_SECRET_KEY, JWT_EXPIRES_IN_DAYS } = process.env;
  return jwt.sign({ email, status }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN_DAYS,
  });
}; //토큰

const createUser = async userInfo => {
  const { email } = userInfo;
  const isExistUser = await userDao.findUserByEmail(email);
  if (isExistUser) {
    return new Error('이미 존재하는 유저입니다.');
  }

  userInfo.password = await bcrypt.hash(
    userInfo.password,
    process.env(BCRYPT_SALT_ROUNDS)
  );
  await userDao.createUser(userInfo);
  return { message: 'CREATED' };
}; //유저생성

const signInUser = async userInfo => {
  const { email } = userInfo;
  const isExistUser = await userDao.findUserByEmail(email);
  if (isExistUser === null) {
    throw new Error('존재하지 않는 아이디 입니다.');
  }
  const { password } = isExistUser;
  const isValidUser = await bcrypt.compare(userInfo.password, password);
  if (!isValidUser) {
    throw new Error('비밀번호가 유효하지 않습니다.');
  }
  return createJwtToken(isExistUser.email, isExistUser.status);
}; //유저로그인

const signInKakao = async (userInfo, body) => {
  const { status, socialPlatform } = body;
  const {
    email,
    profile: { nickname },
  } = await userInfo.kakao_account;
  const isExistUser = await userDao.findUserByEmail(email);
  if (isExistUser === null) {
    await userDao.createSocialUser({
      email,
      nickname,
      socialPlatform,
      status,
    });
  }
  if (isExistUser.socialPlatform !== 'kakao') {
    throw new Error('이미 존재하는 아이디입니다.');
  }

  return createJwtToken(isExistUser.email, isExistUser.status);
};

export default { createUser, signInUser, signInKakao };
