import { Request, Response } from "express";
import { createCategoryService } from "../services/categoriesService";

const createCategoryController = async (req: Request, res: Response) => {
    const newCategory = await createCategoryService(req.body);

    return res.status(201).json(newCategory);
}

export { createCategoryController };