import jwt from "jsonwebtoken";
import "dotenv/config";
import { userRepository } from "../repositories/userRepository";

const loginService = async (email: string) => {
    const user = await userRepository.findOneByOrFail({email: email});
    
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