import express from 'express';
import { reservationController } from '../controllers';
import { tokenVerification } from '../middleware';

const router = express.Router();

router.get('/reservation', reservationController.getReservation);
router.post('/', tokenVerification, reservationController.createReservation);

export default router;
