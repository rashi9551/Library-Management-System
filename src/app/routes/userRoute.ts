import express, { Router, Request, Response } from 'express';
import AuthControllers from '../controllers/authController';
import JwtControllers from '../../services/jwt';
import { loginValidation, registerValidation } from '../validators/authValidation';
import { validateRequest } from '../../middleware/authMiddleware';



const jwtController=new JwtControllers()

const userRoute: Router = express.Router();
const authController = new AuthControllers();

userRoute.post('/register',registerValidation,validateRequest, authController.register);
userRoute.post('/login',loginValidation,validateRequest, authController.login);


export default userRoute;