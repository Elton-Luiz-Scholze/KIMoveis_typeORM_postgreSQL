import { Request, Response } from "express";
import { createCategoryService, listAllCategoriesService } from "../services/categoriesService";

const createCategoryController = async (req: Request, res: Response) => {
    const newCategory = await createCategoryService(req.body);

    return res.status(201).json(newCategory);
}

const listAllCategoriesController = async (req: Request, res: Response) => {
    const categories = await listAllCategoriesService();

    return res.status(200).json(categories);
}

export { createCategoryController, listAllCategoriesController };