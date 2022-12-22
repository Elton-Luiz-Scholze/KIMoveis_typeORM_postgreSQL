import { Router } from "express";
import { createPropertyController, listAllPropertiesController } from "../controllers/propertiesController";
import { verifyTokenMiddleware, verifyUserPermissionsMiddleware } from "../middlewares/userMiddlewares";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware";
import { createPropertySchema } from "../schemas/propertiesSchema";

const propertyRoutes = Router();

propertyRoutes.post("", verifyTokenMiddleware, verifyUserPermissionsMiddleware, validateDataMiddleware(createPropertySchema), createPropertyController);
propertyRoutes.get("", listAllPropertiesController);

export { propertyRoutes };