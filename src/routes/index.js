import express from 'express';
import categoryRouter from './categoryRouter';
// import accommodationRouter from './accommodationRouter';
// import roomRouter from './roomRouter';
// import userRouter from './userRouter';
import reviewRouter from './reviewRouter';

const router = express.Router();

router.use('/review', reviewRouter);
// router.use('/user', userRouter);
router.use('/category', categoryRouter);
// router.use('/room', roomRouter);
router.use('/accommodation', accommodationRouter);

export default router;
