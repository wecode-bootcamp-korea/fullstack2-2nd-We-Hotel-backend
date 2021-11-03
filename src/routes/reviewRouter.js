import express from 'express';
import { reviewController } from '../controllers';
import { tokenVerification } from '../middleware';

const router = express.Router();

router.get('/', reviewController.getReviews);
router.post('/', tokenVerification, reviewController.createReview);

export default router;
