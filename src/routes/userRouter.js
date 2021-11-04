import express from 'express';
import { userController } from '../controllers';
import {
  signUpValidator,
  signInValidator,
  statusAndPlatformValidator,
} from '../middleware/validator';
// import { isAuth } from '../middleware/auth';
const router = express.Router();

router.post('/signup', signUpValidator, userController.createUser);
router.post('/signin', signInValidator, userController.signInUser);
router.post('/kakao', statusAndPlatformValidator, userController.signInKakao);
// router.post('/me', isAuth, userController.me); 토큰검사후 개인페이지 우리는 예약페이지

export default router;
