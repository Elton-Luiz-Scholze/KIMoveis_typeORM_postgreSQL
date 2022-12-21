import { Router } from "express";
import { createCategoryController } from "../controllers/categoriesController";
import { verifyCategoryExistsMiddleware } from "../middlewares/categoriesMiddleware";
import { verifyTokenMiddleware, verifyUserPermissionsMiddleware } from "../middlewares/userMiddlewares";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware";
import { createCategorySchema } from "../schemas/categoriesSchema";

const categoryRoutes = Router();

categoryRoutes.post("", validateDataMiddleware(createCategorySchema), verifyTokenMiddleware, verifyUserPermissionsMiddleware, verifyCategoryExistsMiddleware, createCategoryController);

export { categoryRoutes };