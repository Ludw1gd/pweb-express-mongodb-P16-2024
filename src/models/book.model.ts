// src/models/book.model.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Rating {
    average: number;
    count: number;
}

export interface IBook extends Document {
    rating: Rating;
    title: string;
    author: string;
    publishedDate: Date;
    publisher: string;
    description: string;
    coverImage: string;
    tags: string[];
    initialQty: number;
    qty: number;
}

const bookSchema = new Schema<IBook>({
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
    },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    publisher: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    tags: { type: [String], required: true },
    initialQty: { type: Number, required: true },
    qty: { type: Number, required: true },
}, { timestamps: true });

export const Book = mongoose.model<IBook>('Book', bookSchema);
