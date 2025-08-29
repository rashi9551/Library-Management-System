// src/app/models/bookModel.ts
import mongoose, { Document, Schema } from "mongoose";
import { BookInterface } from "../interfaces/interface";

// Define the Book interface, extending Document
export interface BookDocument extends BookInterface, Document {}

// Define the Book schema
const BookSchema: Schema<BookDocument> = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    publishedYear: {
        type: Number,
        min: 1000,
        max: new Date().getFullYear(),
    },
    genre: {
        type: String,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true
});

// Create the Book model with the BookDocument interface
const BookModel = mongoose.model<BookDocument>("Book", BookSchema);

export default BookModel;
