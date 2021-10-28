import jwt from 'jsonwebtoken';

const { KEY } = process.env;

const issueToken = async id => {
  return jwt.sign({ id: id }, KEY, { expiresIn: '1h' });
};

const verifyToken = async token => {
  return jwt.verify(token, KEY);
};

export default { issueToken, verifyToken };
