import jwt from "jsonwebtoken";
import "dotenv/config";
import { userRepository } from "../repositories/userRepository";
import { AppError } from "../errors/errors";

const loginService = async (email: string) => {
    const user = await userRepository.findOneByOrFail({email: email});

    if(!user.isActive) {
        throw new AppError(400, "User is not active");
    }
    
    const token = jwt.sign(
        { 
            isAdm: user.isAdm
        },
        process.env.SECRET_KEY!,
        { expiresIn: "24h", subject: user.id }
    );

    return token;
}

export { loginService };