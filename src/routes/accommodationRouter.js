import express from 'express';
import { accommodationController } from '../controllers';

const router = express.Router();


router.get('/', accommodationController.getAccommodationList);
router.get('/slider', accommodationController.getMainPageAccommodation)

export default router;
