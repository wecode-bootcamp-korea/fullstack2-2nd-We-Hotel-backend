import prisma from '../../prisma';

const createUser = async userInfo => {
  const { nickname, email, phoneNumber, birthday } = userInfo;

  await prisma.$queryRaw`
  INSERT INTO users (nickname, email, phone_number, policy_agreed, birthday, updated_at, deleted_at) VALUES (
    ${nickname},
    ${email},
    ${phoneNumber},
    true,
    ${birthday},
    DEFAULT,
    DEFAULT
  )
  ;`;
  return await prisma.$queryRaw`
  SELECT 
    email,
    nickname
    from users
    where email = ${email}
;`;
};

const findUserByEmail = async email => {
  return await prisma.$queryRaw`
  SELECT 
    email,
    nickname
  FROM
    users
  WHERE 
    email=${email}
;`;
};

export default { createUser, createUser, findUserByEmail };
