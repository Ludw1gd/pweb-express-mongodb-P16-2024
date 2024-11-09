// src/services/mechanism.service.ts
import { Book } from '../models/book.model';
import { User } from '../models/user.model';
import mongoose from 'mongoose';

export const borrowBookService = async (bookId: string, userId: string) => {
    // Check if the book exists and has enough quantity
    const book = await Book.findById(bookId);
    if (!book) throw new Error('Book not found');
    if (book.qty < 1) throw new Error('Book is currently not available');

    // Decrease the quantity of the book
    book.qty -= 1;
    await book.save();

    // Update user's borrowed books
    await User.findByIdAndUpdate(userId, {
        $push: { borrowedBooks: new mongoose.Types.ObjectId(bookId) }
    });

    return {
        currentQty: book.qty
    };
};
