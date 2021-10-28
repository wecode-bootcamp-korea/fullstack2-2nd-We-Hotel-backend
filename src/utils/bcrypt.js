import bcrypt from 'bcrypt';

const encryptPw = async pw => {
  return await bcrypt.hash(pw, 10);
};

const comparePw = async (plainPw, hash) => {
  return await bcrypt.compare(plainPw, hash);
};

export default { encryptPw, comparePw };
