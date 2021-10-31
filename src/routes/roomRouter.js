import express from 'express';
const router = express.Router();

import { roomController } from '../controllers';

router.get('/', roomController.getRoomList);

export default router;
