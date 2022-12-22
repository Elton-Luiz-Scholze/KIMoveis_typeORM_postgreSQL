import express from "express";
import "express-async-errors";
import { userRoutes } from "./routers/userRoutes";
import { loginRoute } from "./routers/loginRoutes";
import { errorHandler } from "./errors/errors";
import { categoryRoutes } from "./routers/categoryRoutes";
import { propertyRoutes } from "./routers/propertyRoutes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoute);
app.use("/categories", categoryRoutes);
app.use("/properties", propertyRoutes);
app.use(errorHandler);

export default app;