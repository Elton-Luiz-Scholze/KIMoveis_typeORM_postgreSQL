import AppDataSource from "../data-source";
import { Schedules_user_properties } from "../entities/schedulesUserPropertiesEntity";

const scheduleRepository = AppDataSource.getRepository(Schedules_user_properties);

export { scheduleRepository };