// src/app/use-cases/bookUseCases.ts
import { StatusCode } from "../../interfaces/enum";
import { StatusMessage, BookInterface } from "../../interfaces/interface";
import BookRepository from "../repository/bookRepository";

const bookRepo = new BookRepository();

export default class BookUseCases {

    createBook = async (data: BookInterface): Promise<StatusMessage> => {
        try {
            const savedBook = await bookRepo.saveBook(data);
            if (!savedBook) {
                return { status: StatusCode.InternalServerError as number, message: "Failed to create book" };
            }
            return { status: StatusCode.OK as number, message: "Book created successfully" };
        } catch (error) {
            console.error('Error creating book:', error);
            return { status: StatusCode.InternalServerError as number, message: "Internal Server Error" };
        }
    }

    getAllBooks = async (filters: any) => {
        try {
            return await bookRepo.getAllBooks(filters);
        } catch (error) {
            console.error('Error getting books:', error);
            return [];
        }
    }

    getBookById = async (id: string) => {
        try {
            return await bookRepo.findBookById(id);
        } catch (error) {
            console.error('Error getting book by ID:', error);
            return null;
        }
    }

    checkoutBook = async (id: string): Promise<StatusMessage> => {
        try {
            const book = await bookRepo.findBookById(id);
            if (!book) {
                return { status: StatusCode.NotFound as number, message: "Book not found" };
            }
            if (book.stock <= 0) {
                return { status: StatusCode.BadRequest as number, message: "Book is out of stock" };
            }

            const updatedBook = await bookRepo.updateBook(id, { stock: book.stock - 1 });
            if (!updatedBook) {
                return { status: StatusCode.InternalServerError as number, message: "Failed to checkout book" };
            }

            return { status: StatusCode.OK as number, message: "Book checked out successfully" };
        } catch (error) {
            console.error('Error during book checkout:', error);
            return { status: StatusCode.InternalServerError as number, message: "Internal Server Error" };
        }
    }
}
