import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { categoryRepository } from "../repositories/categoryRepository";

const verifyCategoryExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    
    const findCategory = await categoryRepository.findOneBy({ name: name });

    if(findCategory) {
        throw new AppError(409, "Category already exists");
    }

    return next();
}

export { verifyCategoryExistsMiddleware };