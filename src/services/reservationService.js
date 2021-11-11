import { reviewDAO } from '../models';

const getReservations = async userid => {
  return await reviewDAO.getReviews(userid);
};

const createReservation = async newReservation => {
  const { userId, startDate, endDate, accommodationId } = newReservation;

  let [createdReservation] = await reviewDAO.createReservation(
    userId,
    startDate,
    endDate,
    accommodationId
  );
  return createdReservation;
};

export default { getReservations, createReservation };
