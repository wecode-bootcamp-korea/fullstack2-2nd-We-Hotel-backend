import express from 'express';

const router = express.Router();

router.use('/ping', (req, res) => {
  console.log('pong');
  return res.status(200).json({ message: 'pong' });
});

export default router;
