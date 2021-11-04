import { prisma, Prisma } from '../../prisma';

const createUser = async userInfo => {
  const { email, nickname, phoneNumber, birthday } = userInfo;
  return await prisma.$queryRaw`
  INSERT INTO users VALUES (
    DEFAULT,
    ${nickname},
    ${email},
    ${phoneNumber},
    social_id,
    true,
    ${birthday},
    DEFAULT,
    DEFAULT,
    DEFAULT
  )
  ;`;
};

const findUserByEmail = async email => {
  return await prisma.queryRaw`
  SELECT
    email
    from users
  ;`;
};

export default { createUser, createUser, findUserByEmail };
