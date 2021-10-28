import { errorGenerator, asyncWrapper } from '../utils';
import jwt from '../utils/jwt';

const tokenVerification = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.user.token;
  if (token) {
    const payload = await jwt.verifyToken(token);
    req.body.userId = payload.id;
  } else {
    errorGenerator(401, 'INVALID_TOKEN');
  }
  next();
});

export default tokenVerification;
