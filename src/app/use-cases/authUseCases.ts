import { StatusCode } from "../../interfaces/enum";
import { LoginResponse, StatusMessage, UserData, UserInterface } from "../../interfaces/interface";
import { IUseCaseInterface } from "../../interfaces/IUseCaseInterface";
import JwtControllers  from "../../services/jwt";
import { comparePassword } from "../../utils/passwordHashing";
import UserRepository from "../repository/userRepository";
import { hashPassword } from "../../utils/passwordHashing";


const userRepo=new UserRepository()
const jwtController=new JwtControllers()

export default class AuthUseCases implements IUseCaseInterface{
    
    register = async (data: UserInterface): Promise<StatusMessage > => {
        try {
            const existingUser = await userRepo.findUser(data.email);

            if (existingUser) return { status: StatusCode.Conflict as number, message: "User already exists" };
            data.password = await hashPassword(data.password);
            const savedUser = await userRepo.saveUser(data);
            if (!savedUser) 
                return { status: StatusCode.InternalServerError as number, message: "Failed to register user" };            
            else
            return { status: StatusCode.OK as number, message: "User registered successfully" };
            
        } catch (error) {

            console.error("Error during registration:", error);

            return { status: StatusCode.InternalServerError as number, message: "Internal Server Error" };
        }
    }
   
    
    login = async (email:string,password:string): Promise<LoginResponse | StatusMessage > => {
        try {
            const existingUser = await userRepo.findUser(email) as UserData
            if(existingUser){
                const isPasswordMatch=await comparePassword(password,existingUser.password)
                if(isPasswordMatch){
                    const accessToken = await jwtController.createToken(existingUser._id.toString(), process.env.JWT_SECRET_KEY||"Rashid",);
                    return {
                        status: StatusCode.OK as number,
                        message: "Login successful",
                        data: {
                            user: existingUser,
                            accessToken,
                        }
                    };
                    }else{
                    return { status: StatusCode.BadRequest as number, message: "Password does not match" }
                }
            }else{
                return { status: StatusCode.NotFound as number, message: "User Not Found" }
            }
        } catch (error) {
            console.error("Error during registration:", error);
            return { status: StatusCode.InternalServerError as number, message: "Internal Server Error" };
        }
    }

    getUserByEmail=async(email: string) =>{
        try {
            const user = await userRepo.findUser(email);
            return user;
        } catch (error) {
            throw new Error('Error retrieving user by email');
        }
    }
}