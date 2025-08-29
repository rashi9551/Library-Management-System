// src/app/controllers/bookController.ts
import { Request, Response } from 'express';
import { StatusCode } from '../../interfaces/enum';
import BookUseCases from '../use-cases/bookUseCase';
import { StatusMessage } from '../../interfaces/interface';

const bookUseCases = new BookUseCases();

export default class BookController {

    createBook = async (req: Request, res: Response) => {
        try {
            const bookData = req.body;

            const createResponse: StatusMessage = await bookUseCases.createBook(bookData) as StatusMessage;
            return res.status(createResponse?.status).json(createResponse);

        } catch (error) {
            console.error('Error creating book:', error);
            return res.status(StatusCode.InternalServerError).json({ message: 'Internal Server Error' });
        }
    }

    getAllBooks = async (req: Request, res: Response) => {
        try {
            const filters = {
                genre: req.query.genre as string,
                author: req.query.author as string,
                minYear: req.query.minYear ? Number(req.query.minYear) : undefined,
                available: req.query.available ? req.query.available === 'true' : undefined,
                limit: req.query.limit ? Number(req.query.limit) : 10,
                offset: req.query.offset ? Number(req.query.offset) : 0
            };

            const books = await bookUseCases.getAllBooks(filters);
            return res.status(StatusCode.OK).json({ data: books });

        } catch (error) {
            console.error('Error fetching books:', error);
            return res.status(StatusCode.InternalServerError).json({ message: 'Internal Server Error' });
        }
    }

    checkoutBook = async (req: Request, res: Response) => {
        try {
            const bookId = req.params.id;

            // Call use-case for checkout
            const checkoutResponse: StatusMessage = await bookUseCases.checkoutBook(bookId) as StatusMessage;

            return res.status(checkoutResponse?.status).json(checkoutResponse);

        } catch (error) {
            console.error('Error during book checkout:', error);
            return res.status(StatusCode.InternalServerError).json({ message: 'Internal Server Error' });
        }
    }
}
