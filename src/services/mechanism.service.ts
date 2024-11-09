// src/services/mechanism.service.ts
import { Book } from '../models/book.model';
import { User } from '../models/user.model';
import mongoose from 'mongoose';

export const borrowBookService = async (bookId: string, userId: string) => {
    try {
        // Check if the book exists and has enough quantity
        const book = await Book.findById(bookId);
        if (!book) throw new Error('Book not found');
        if (book.qty < 1) throw new Error('Book is currently not available, Out of Stock');

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
    }

    catch (err) {
        throw err;
    }
};

export const returnBookService = async (bookId: string, userId: string) => {
    try {
        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) throw new Error('Book not found');

        // Check if the user has borrowed this book
        // const user = await User.findById(userId);
        // if (!user) throw new Error('User not found');
        // const hasBorrowed = user.borrowedBooks.includes(new mongoose.Types.ObjectId(bookId));
        // if (!hasBorrowed) throw new Error('Book not borrowed by user');

        // Increase the quantity of the book
        book.qty += 1;
        await book.save();

        if (book.qty > book.initialQty) {
            throw new Error("Invalid return book, book quantity has exceeded initial qty");
        }

        // Update user's borrowed books
        await User.findByIdAndUpdate(userId, {
            $push: { borrowedBooks: new mongoose.Types.ObjectId(bookId) }
        });

        return {
            currentQty: book.qty
        };
    }

    catch (err) {
        throw err;
    }
};