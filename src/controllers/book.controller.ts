// src/controllers/book.controller.ts
import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book.model';

// Controller for getting all books
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.status(200).json({
            status: 'success',
            message: 'Successfully get all books',
            data: books
        });
    } 
    
    catch (error) {
        next(error);
    }
};

// Controller for getting a book by ID
export const getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id); // Fetch book by ID

        if (!book) {
            res.status(404).json({
                status: 'error',
                message: 'Book not found'
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully get book',
            data: book
        });
    } catch (error) {
        next(error);
    }
};

export const addBook = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { title, author, publishedDate, publisher, description, coverImage, tags, initialQty, qty, rating } = req.body;
        const newBook = new Book({
            title,
            author,
            publishedDate,
            publisher,
            description,
            coverImage,
            rating,
            tags,
            initialQty,
            qty,
        });

        const savedBook = await newBook.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Book added successfully',
            data: newBook,
        });
    } 
    
    catch (error) {
        next(error);
    }
};

// Controller for modifying a book
export const modifyBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find and update the book by ID
        const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBook) {
            res.status(404).json({
                status: 'error',
                message: 'Book not found'
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully update book',
            data: updatedBook
        });
    } 
    
    catch (error) {
        next(error);
    }
};

export const bookQty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { addQty } = req.body; //jumlah stok yg akan ditambahkan
    
    try{
        // update qty pd database
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { $inc: { qty: addQty } }, //increment qty dgn addQty
            { new: true } //return buku stelah diupdate
        );

        if (!updatedBook) {
            res.status(404).json({ 
                message: 'Buku tidak ditemukan' 
            });
            return;
        }
        res.status(200).json({ message: 'Stok berhasil ditambahkan', book: updatedBook });
    }

    catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui stok', error });
    }
};

// Controller for deleting a book
export const deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        // Find and delete the book by ID
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            res.status(404).json({
                status: 'error',
                message: 'Book not found'
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully remove book'
        });
    } 
    
    catch (error) {
        next(error);
    }
};