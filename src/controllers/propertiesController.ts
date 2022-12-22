import { Request, Response } from "express";
import { createPropertyService, listAllPropertiesService } from "../services/propertiesService";

const createPropertyController = async (req: Request, res: Response) => {
    const newProperty = await createPropertyService(req.body);

    return res.status(201).json(newProperty);
}

const listAllPropertiesController = async (req: Request, res: Response) => {
    const allProperties = await listAllPropertiesService()

    return res.status(200).json(allProperties);
}

export { createPropertyController, listAllPropertiesController };