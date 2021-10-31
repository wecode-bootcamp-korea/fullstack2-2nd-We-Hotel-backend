import { reviewDAO } from '../models';

const getReviews = async (id, sort, offset, limit) => {
  return await reviewDAO.getReviews(id, sort, offset, limit);
};

const createReview = async newReview => {
  const { userId, reservationId, scores, content, imageUrl } = newReview;

  let [createdReview] = await reviewDAO.createReview(
    userId,
    reservationId,
    scores,
    content
  );

  if (imageUrl)
    [createdReview] = await reviewDAO.createReviewImg(
      imageUrl,
      createdReview.id
    );

  return createdReview;
};

export default { getReviews, createReview };
