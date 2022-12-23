import { AppError } from "../errors/errors";
import { IScheduleRequest } from "../interfaces/schedules";
import { propertyRepository } from "../repositories/propertyRepository";
import { scheduleRepository } from "../repositories/schedulesRepository";

const createScheduleService = async (data: IScheduleRequest, id: string) => {
    const { date, hour, propertyId } = data;
 
    const newDate = new Date(data.date);
    const dayOfTheWeek = newDate.getDay();
    const splitHour = data.hour.split(":");
    const newHour = splitHour[0];
    const findProperty = await propertyRepository.findOneBy({ id: propertyId });

    const schedules = await scheduleRepository.createQueryBuilder("schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .innerJoinAndSelect("schedules.property", "property")
    .where("property.id = :id_property", { id_property: propertyId })
    .select(["schedules", "user", "property"])
    .getRawMany();
    
    if(dayOfTheWeek === 0 || dayOfTheWeek === 6) {
        throw new AppError(400, "Invalid Date");
    }
    
    if(newHour < "08" || newHour >= "18") {
        throw new AppError(400, "Invalid hour");
    }
    
    if(!findProperty) {
        throw new AppError(404, "Property not found");
    }

    if(schedules.length > 1) {
        throw new AppError(409,  "User schedule already exists") 
    }

    const newSchedule = scheduleRepository.create({
        date: date, 
        hour: hour, 
        property: {id: propertyId},
        user: {id: id}
    })
    
    await scheduleRepository.save(
        newSchedule
    );

    return {message: "Schedule created"};
}

export { createScheduleService };