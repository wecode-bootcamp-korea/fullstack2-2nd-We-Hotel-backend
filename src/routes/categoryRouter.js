import express from 'express';
const router = express.Router();

import { categoryController } from '../controllers';

router.get('/main', categoryController.getMainCategoryList);
router.get('/sub', categoryController.getSubCategoryList);

export default router;