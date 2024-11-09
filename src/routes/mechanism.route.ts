// src/routes/mechanism.route.ts
import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { borrowBook } from '../controllers/mechanism.controller';

const router = express.Router();

router.post('/borrow/:id', authMiddleware, borrowBook);

export default router;
