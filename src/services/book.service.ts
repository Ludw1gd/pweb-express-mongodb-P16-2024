// src/services/book.service.ts
import { Book, IBook } from '../models/book.model';

export const addNewBook = async (bookData: IBook) => {
    const newBook = new Book(bookData);
    await newBook.save();
    return newBook;
};
