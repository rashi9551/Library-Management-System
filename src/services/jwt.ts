declare global {
    namespace Express {
        interface Request {
            userId?: string; // Add this line to extend the Request type
        }
    }
}
import { NextFunction ,Response,Request} from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { StatusCode } from '../interfaces/enum'
import { DecodedToken } from '../interfaces/interface';
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'Rashid';
interface JwtPayload {
  userId: string;
}
export default class JwtControllers {

    createToken= async (userId: ObjectId | string,secret:string): Promise<string> => {
       try {
            const options: SignOptions = { expiresIn: '1d' };
            return jwt.sign({ userId }, secret, options);        } catch (error) {
            console.error("Error creating token:", error);
            throw new Error("Failed to create token");
        }
    }
    isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            console.log(token, "Token validating...");
    
            if (!token) {
                return res.status(401).json({ message: "Token is missing" });
            }
    
        
    
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "Rashid") as DecodedToken;
            console.log(decoded, "Decoded token");
    
            if (!decoded) {
                return res.status(StatusCode.Unauthorized).json({ message: 'Invalid token' });
            }
    
            // Attach userId to request object for future use
            req.userId = decoded.id;
    
            // Proceed to next middleware or controller
            next();
        } catch (e) {
            console.error(e);
            return res.status(StatusCode.Unauthorized).json({ message: "Token authentication failed" });
        }
    };





    
    
}
