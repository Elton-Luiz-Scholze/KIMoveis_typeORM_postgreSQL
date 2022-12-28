import AppDataSource from "../data-source";
import { Categories } from "../entities/categoriesEntity";

const categoryRepository = AppDataSource.getRepository(Categories);

export { categoryRepository };