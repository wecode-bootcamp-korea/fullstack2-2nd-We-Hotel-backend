import express from 'express';
const router = express.Router();

import { accommodationController } from '../controllers';

router.get('/', accommodationController.getAccommodationList);

export default router;
