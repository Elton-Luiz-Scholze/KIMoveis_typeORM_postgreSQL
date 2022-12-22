import { Router } from "express";
import { createCategoryController, listAllCategoriesController, listAllPropertiesByCategoryIdController } from "../controllers/categoriesController";
import { verifyCategoryExistsMiddleware } from "../middlewares/categoriesMiddleware";
import { verifyTokenMiddleware, verifyUserPermissionsMiddleware } from "../middlewares/userMiddlewares";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware";
import { createCategorySchema } from "../schemas/categoriesSchema";

const categoryRoutes = Router();

categoryRoutes.post("", validateDataMiddleware(createCategorySchema), verifyTokenMiddleware, verifyUserPermissionsMiddleware, verifyCategoryExistsMiddleware, createCategoryController);
categoryRoutes.get("", listAllCategoriesController);
categoryRoutes.get("/:id/properties", listAllPropertiesByCategoryIdController);

export { categoryRoutes };