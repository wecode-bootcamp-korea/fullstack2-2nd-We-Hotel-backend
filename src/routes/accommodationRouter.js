import express from 'express';
import { accommodationController } from '../controllers';

const router = express.Router();

router.get('/list', accommodationController.getAccommodationList);

export default router;
