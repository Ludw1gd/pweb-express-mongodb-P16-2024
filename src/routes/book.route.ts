// src/routes/book.route.ts
import express from 'express';
import { addBook, getAllBooks, getBookById, modifyBook, deleteBook } from '../controllers/book.controller';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

//GET - get all books
router.get('/book', authMiddleware, getAllBooks);
//GET - get book by id
router.get('/book/:id', authMiddleware, getBookById);
//POST - add new book
router.post('/book', authMiddleware, addBook);
//PATCH - modify book data
router.patch('/book/:id', authMiddleware, modifyBook); // Modify book data by ID
//DELETE - remove book
router.delete('/book/:id', authMiddleware, deleteBook); // Delete book by ID

export default router;