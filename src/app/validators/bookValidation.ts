
import { body } from 'express-validator';


export const bookCreateValidation = [
    body('title')
        .isString().withMessage('Title must be a string')
        .notEmpty().withMessage('Title is required'),

    body('author')
        .isString().withMessage('Author must be a string')
        .notEmpty().withMessage('Author is required'),

    body('publishedYear')
        .optional()
        .isInt({ min: 1000, max: new Date().getFullYear() })
        .withMessage('Published year must be a valid year'),

    body('genre')
        .optional()
        .isString().withMessage('Genre must be a string'),

    body('stock')
        .isInt({ min: 0 }).withMessage('Stock must be a positive integer')
        .notEmpty().withMessage('Stock is required')
];

