import { Request, Response } from "express";
import { createCategoryService, listAllCategoriesService, listAllPropertiesByCategoryIdService } from "../services/categoriesService";

const createCategoryController = async (req: Request, res: Response) => {
    const newCategory = await createCategoryService(req.body);

    return res.status(201).json(newCategory);
}

const listAllCategoriesController = async (req: Request, res: Response) => {
    const categories = await listAllCategoriesService();

    return res.status(200).json(categories);
}

const listAllPropertiesByCategoryIdController = async (req: Request, res: Response) => {
    const id = req.params.id
    const properties = await listAllPropertiesByCategoryIdService(id);

    return res.status(200).json(properties);
}

export { createCategoryController, listAllCategoriesController, listAllPropertiesByCategoryIdController };