// src/routes/mechanism.route.ts
import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { borrowBook, returnBook } from '../controllers/mechanism.controller';

const router = express.Router();

router.post('/borrow/:id', authMiddleware, borrowBook);
router.post('/return/:id', authMiddleware, returnBook);

export default router;
