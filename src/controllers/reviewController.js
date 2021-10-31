import { reviewService } from '../services';
import { asyncWrapper, errorGenerator } from '../utils';

const getReviews = asyncWrapper(async (req, res) => {
  const { accommodationId, sort, offset, limit } = req.query;
  if (!id) errorGenerator(400, 'ID_NOT_FOUND');

  const reviews = await reviewService.getReviews(
    accommodationId,
    sort,
    offset,
    limit
  );
  res.status(200).json({ message: 'SUCCESS', result: reviews });
});

const createReview = asyncWrapper(async (req, res) => {
  const newReview = req.body;

  const { productId, rating, content } = newReview;
  if (!req.userId || !productId || !rating || !content)
    errorGenerator(400, 'NOT_ENOUGH_INFORMATION');

  const reviews = await reviewService.createReview(newReview);
  res.status(201).json({ message: 'CREATED', result: reviews });
});

export default { getReviews, createReview };
