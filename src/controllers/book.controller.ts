import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book.model';
import multer from 'multer';

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Get all books with pagination and filtering
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  const { page = 1, limit = 10, author, rating } = req.query;
  const query: any = {};
  if (author) query.author = author;
  if (rating) query.rating = { $gte: rating };

  try {
    const books = await Book.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    const totalBooks = await Book.countDocuments(query);

    res.status(200).json({
      status: 'success',
      message: 'Successfully fetched books',
      data: books,
      total: totalBooks,
      page,
      limit,
    });
  } catch (error) {
    next(error);
  }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      res.status(404).json({
        status: 'error',
        message: 'Book not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully get book',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// Add a new book with file upload
export const addBook = [
  upload.single('coverImage'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, publishedDate, publisher, description, tags, initialQty, qty, rating } = req.body;
    const coverImage = req.file ? req.file.path : null;

    try {
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
        data: savedBook,
      });
    } catch (error) {
      next(error);
    }
  },
];

// Modify an existing book
export const modifyBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBook) {
      res.status(404).json({
        status: 'error',
        message: 'Book not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated book',
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      res.status(404).json({
        status: 'error',
        message: 'Book not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully removed book',
    });
  } catch (error) {
    next(error);
  }
};

// Search books by keyword in title or description
export const searchBooks = async (req: Request, res: Response, next: NextFunction) => {
  const { keyword } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    });
    res.status(200).json({
      status: 'success',
      message: 'Search results',
      data: books,
    });
  } catch (error) {
    next(error);
  }
};
