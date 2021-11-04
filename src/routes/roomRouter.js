import express from 'express';
import { roomController  } from '../controllers';

const router = express.Router();

router.get('/:id',roomController.getRoomList);
router.get('/:id/image', roomController.getRoomImage);

export default router;