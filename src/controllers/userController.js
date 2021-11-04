import { userService } from '../services';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const { REST_API_KEY, LOGOUT_REDIRECT_URI } = process.env;

const createUser = async (req, res, next) => {
  await userService.createUser(req.body);
  const token = await userService.createJwtToken(req.body.email);
  const userInfo = await userService.getUserInfo(req.body.email);
  res.status(200).json({ message: 'CREATED', token, userInfo });
};

const logout = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const { data } = await axios.get('https://kapi.kakao.com/v1/user/logout', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  res.status(200).json({ message: '로그아웃 되었습니다.' });
};

const signInKakao = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const { data } = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const isExistedUser = await userService.isExistedUser(data.kakao_account);

    if (isExistedUser) {
      const token = await userService.createJwtToken(data.kakao_account.email);
      const userInfo = await userService.getUserInfo(data.kakao_account.email);
      return res.status(200).json({
        isExistedUser: true,
        message: '카카오 로그인 성공',
        token,
        userInfo,
      });
    } else {
      const {
        email,
        profile: { nickname },
      } = data.kakao_account;
      return res.status(200).json({
        isExistedUser: false,
        newUser: { email, nickname },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `${error.message}` });
  }
};

export default { createUser, signInKakao, logout };
