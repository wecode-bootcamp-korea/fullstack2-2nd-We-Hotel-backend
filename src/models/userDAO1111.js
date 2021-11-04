import { prisma, Prisma } from '../../prisma';

const createUser = async userInfo => {
  const { email, password, nickname, status } = userInfo;
  return await prisma.user.create({
    data: {
      email,
      nickname,
      password,
      status,
    },
  });
};

const createSocialUser = async userInfo => {
  const { email, nickname, status, socialPlatform } = userInfo;
  return await prisma.user.create({
    data: {
      email,
      nickname,
      password: '', //nullable 가능
      status,
      snsId: email,
      socialPlatform,
    },
  });
};

const findUserByEmail = async email => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    }, // 이메일, 전화번호, 생일찾기
  });
  return user;
};

export default { createUser, createSocialUser, findUserByEmail };
