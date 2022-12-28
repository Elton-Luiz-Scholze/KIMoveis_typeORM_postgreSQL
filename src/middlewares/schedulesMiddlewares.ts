import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { propertyRepository } from "../repositories/propertyRepository";
import { scheduleRepository } from "../repositories/schedulesRepository";

const verifyIfScheduleExists = async (req: Request, res: Response, next: NextFunction) => {
    const { propertyId } = req.body;
    const userId = req.user.id;

    const findScheduleExists = await scheduleRepository.findOne({
        where: { property: { id: propertyId } }
    });

    const schedules = await scheduleRepository.createQueryBuilder("schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .innerJoinAndSelect("schedules.property", "property")
    .where("property.id = :id_property", { id_property: propertyId })
    .select(["schedules", "user.name", "user.email", "user.id", "property"])
    .getMany()

    const schedulesEquals = await scheduleRepository.createQueryBuilder("schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .innerJoinAndSelect("schedules.property", "property")
    .where("user.id = :id_user", { id_user: userId })
    .select(["schedules", "user.name", "user.email", "user.id", "property"])
    .getMany()
    
    schedules.find((schedule) => {
        if(schedule.hour === findScheduleExists.hour && schedule.date === findScheduleExists.date) {
            throw new AppError(409,  "Property schedule already exists");
        }

        schedulesEquals.filter((scheduleEqual) => {
            if(scheduleEqual.hour === schedule.hour && scheduleEqual.date === schedule.date && userId === schedule.user.id) {
                throw new AppError(409,  "User schedule already exists");
            }
        });
    })

    return next();
}

const verifyIfPropertyExists = async (req: Request, res: Response, next: NextFunction) => {
    const { propertyId } = req.body;

    const findProperty = await propertyRepository.findOneBy({ id: propertyId });
    
    if(!findProperty) {
        throw new AppError(404, "Property not found");
    }

    return next();
}

const verifyIfHourIsInvalidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { hour } = req.body
    const splitHour = hour.split(":");
    const newHour = splitHour[0];

    if(newHour < "08" || newHour >= "18") {
        throw new AppError(400, "Invalid hour");
    }

    req.newHour = newHour

    return next();
}

const verifyIfDateIsInvalidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { date } = req.body;
    const newDate = new Date(date);
    const dayOfTheWeek = newDate.getDay();
    
    
    if(dayOfTheWeek === 0 || dayOfTheWeek === 6) {
        throw new AppError(400, "Invalid Date");
    }

    return next();
}

export { verifyIfScheduleExists, verifyIfPropertyExists, verifyIfHourIsInvalidMiddleware, verifyIfDateIsInvalidMiddleware };