import { Router } from "express";
import { createScheduleController } from "../controllers/schedulesController";
import { verifyTokenMiddleware } from "../middlewares/userMiddlewares";

const schedulesRoutes = Router();

schedulesRoutes.post("", verifyTokenMiddleware, createScheduleController);

export { schedulesRoutes };