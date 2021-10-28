const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  if (err.name === 'TokenExpiredError')
    res.status(419).json({ message: 'TOKEN_EXPIRED' });
  if (err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError')
    res.status(401).json({ message: 'INVALID_TOKEN' });
  console.error(err);

  res.status(statusCode || 500).json({ message });
};

export default errorHandler;
