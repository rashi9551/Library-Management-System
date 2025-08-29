// src/app/repository/bookRepository.ts
import BookModel from '../../entities/book';
import { BookInterface } from '../../interfaces/interface';

export default class BookRepository {

    // Save new book
    saveBook = async (data: BookInterface) => {
        try {
            const book = new BookModel(data);
            return await book.save();
        } catch (error) {
            console.error('Error saving book:', error);
            return null;
        }
    }

    // Find book by ID
    findBookById = async (id: string) => {
        try {
            return await BookModel.findById(id);
        } catch (error) {
            console.error('Error finding book by ID:', error);
            return null;
        }
    }

    // Get all books with optional filters and pagination
    getAllBooks = async (filters: any) => {
        try {
            const query: any = {};

            if (filters.genre) query.genre = filters.genre;
            if (filters.author) query.author = filters.author;
            if (filters.minYear) query.publishedYear = { $gte: filters.minYear };
            if (filters.available) query.stock = { $gt: 0 };

            const books = await BookModel.find(query)
                .skip(filters.offset || 0)
                .limit(filters.limit || 10);

            return books;
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }

    // Update book (used for checkout)
    updateBook = async (id: string, data: Partial<BookInterface>) => {
        try {
            return await BookModel.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.error('Error updating book:', error);
            return null;
        }
    }
}
