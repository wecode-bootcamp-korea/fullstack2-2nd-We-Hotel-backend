import { reservationService } from '../services';
import { asyncWrapper, errorGenerator } from '../utils';

const getReservations = asyncWrapper(async (req, res) => {
  const { reservationId, sort, offset, limit } = req.query;
  if (!reservationId) errorGenerator(400, 'RESERVATION_ID_NOT_FOUND');

  const reservations = await reservationService.getReservations(
    reservationId,
    sort,
    offset,
    limit
  ); //req 입력값 수정
  res.status(200).json({ message: 'SUCCESS', result: reservations });
});

const createReservation = asyncWrapper(async (req, res) => {
  const newReservation = req.body;

  const { userId, productId, rating, content } = newReservation;
  if (!userId || !productId || !rating || !content)
    errorGenerator(400, 'NOT_ENOUGH_INFORMATION'); //userId 는 body에서 받아오면 안되고, 인증 미들웨어 통과 시킨 후 req안에서 user 정보 받아주세요

  const reservations = await reviewService.createReservation(newReservation);
  res.status(201).json({ message: 'CREATED', result: reservations });
});

export default { getReservations, createReservation };
