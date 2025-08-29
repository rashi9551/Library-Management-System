// src/app/routes/bookRoute.ts
import express, { Router, Request, Response } from 'express';
import BookController from '../controllers/bookController';
import JwtControllers from '../../services/jwt';
import { bookCreateValidation,  } from '../validators/bookValidation';
import { validateRequest } from '../../middleware/authMiddleware';

const jwtController = new JwtControllers();
const bookController = new BookController();
const bookRoute: Router = express.Router();

bookRoute.post(
    '/',
    jwtController.isAuthenticated,         
    bookCreateValidation,       
    validateRequest,           
    bookController.createBook  
);


bookRoute.get(
    '/',
    jwtController.isAuthenticated,  
    bookController.getAllBooks      
);


bookRoute.post(
    '/:id/checkout',
    jwtController.isAuthenticated,       
    validateRequest,
    bookController.checkoutBook
);

export default bookRoute;
