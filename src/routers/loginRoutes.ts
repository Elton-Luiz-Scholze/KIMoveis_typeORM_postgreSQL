import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { loginMiddleware } from "../middlewares/loginMiddleware";
import { verifyUserIsActivIsFalseMiddleware } from "../middlewares/userMiddlewares";
import { validateDataMiddleware } from "../middlewares/validateDataMiddleware";
import { loginSchema } from "../schemas/loginSchemas";

const loginRoute = Router();

loginRoute.post("", validateDataMiddleware(loginSchema), loginMiddleware, loginController);

export { loginRoute };