import { Router } from "express";
import { createScheduleController, listAllSchedulesByPropertyIdController } from "../controllers/schedulesController";
import { verifyIfDateIsInvalidMiddleware, verifyIfHourIsInvalidMiddleware, verifyIfPropertyExists, verifyIfScheduleExists } from "../middlewares/schedulesMiddlewares";
import { verifyTokenMiddleware, verifyUserPermissionsMiddleware } from "../middlewares/userMiddlewares";

const schedulesRoutes = Router();

schedulesRoutes.post("", verifyTokenMiddleware, verifyIfPropertyExists, verifyIfHourIsInvalidMiddleware, verifyIfDateIsInvalidMiddleware, verifyIfScheduleExists, createScheduleController);
schedulesRoutes.get("/properties/:id", verifyTokenMiddleware, verifyUserPermissionsMiddleware, listAllSchedulesByPropertyIdController)

export { schedulesRoutes };