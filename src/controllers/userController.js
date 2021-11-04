import { userService } from '../services';
import { userDao } from '../models';
import axios from 'axios';

const createUser = async (req, res, next) => {
  console.log(req.body);
  const result = await userService.createUser(req.body);
  res.json({ message: result.message });
};

const signInUser = async (req, res, next) => {
  try {
    const token = await userService.signInUser(req.body);
    res.json({ message: '로그인성공', token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: `${error.message}` });
  }
};

const signInKakao = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const { data } = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const token = await userService.signInKakao(data, req.body);
    return res.status(200).json({ message: '카카오 로그인 성공', token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `${error.message}` });
  }
};

const me = async (req, res, next) => {
  try {
    const user = await userDao.findUserByEmail(req.userEmail);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res
      .status(200)
      .json({ token: req.token, userEmail: user.email, status: user.status });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: `${error.message}` });
  }
};

export default { createUser, signInUser, signInKakao, me };
