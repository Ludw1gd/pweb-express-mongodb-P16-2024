// src/routes/book.route.ts
import express from 'express';
import { addBook, getAllBooks, getBookById, modifyBook, bookQty, deleteBook } from '../controllers/book.controller';
// import { authMiddleware } from '../middleware/auth';

const router = express.Router();

//GET - get all books
router.get('/book', getAllBooks);
//GET - get book by id
router.get('/book/:id', getBookById);
//POST - add new book
router.post('/book', addBook);
//PATCH - modify book data
router.patch('/book/:id', modifyBook); // Modify book data by ID
//PATCH - add qty book data
router.patch('/book/:id', bookQty); // add qty book data by ID
//DELETE - remove book
router.delete('/book/:id', deleteBook); // Delete book by ID

export default router;