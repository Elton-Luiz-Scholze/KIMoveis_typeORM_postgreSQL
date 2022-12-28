import AppDataSource from "../data-source";
import { Properties } from "../entities/propertiesEntity";

const propertyRepository = AppDataSource.getRepository(Properties);

export { propertyRepository };