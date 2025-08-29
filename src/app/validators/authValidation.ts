// src/app/validators/authValidation.ts
import { body } from 'express-validator';

export const registerValidation = [
    body('username')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters'),
    body('email')
        .isEmail().withMessage('Email must be valid'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];


export const loginValidation = [
    body('email')
        .isEmail().withMessage('Email must be valid')
        .notEmpty().withMessage('Email is required'),
    body('password')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .notEmpty().withMessage('Password is required')
];

