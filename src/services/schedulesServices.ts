import { AppError } from "../errors/errors";
import { IScheduleRequest } from "../interfaces/schedules";
import { propertyRepository } from "../repositories/propertyRepository";
import { scheduleRepository } from "../repositories/schedulesRepository";

const createScheduleService = async (data: IScheduleRequest, hour: string, userId: string) => {
    const {date, propertyId } = data;
 
    const newSchedule = scheduleRepository.create({
        date: date, 
        hour: hour, 
        property: {id: propertyId},
        user: {id: userId}
    })
    
    await scheduleRepository.save(
        newSchedule
    );

    return {message: "Schedule created"};

}

const listAllSchedulesByPropertyIdService = async (id: string) => {
    const findProperty = await propertyRepository.findOneBy({ id: id });

    if(!findProperty) {
        throw new AppError(404, "Property not found");
    }    

    const allSchedules = await propertyRepository.findOne({ where : { id: id },
        relations: {
            address: true,
            category: true,
            schedules: {
                user: true
            }
        }
    })

    return allSchedules;
}

export { createScheduleService, listAllSchedulesByPropertyIdService };