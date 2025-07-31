// backend/routes/productRoutes.js
import express from 'express';
import { addProduct, getProducts } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', authMiddleware, addProduct); // فقط برای مدیران

export default router;