// import { NextFunction, Request, Response } from "express";
// import { propertyRepository } from "../repositories/propertyRepository";
// import { scheduleRepository } from "../repositories/schedulesRepository";

// const verifyIfPropertyExists = async (req: Request, res: Response, next: NextFunction) => {

    

//     console.log(propertyId)
    
//     const schedules = await scheduleRepository.createQueryBuilder("schedules")
//     .innerJoinAndSelect("schedules.property", "property")
//     .innerJoinAndSelect("properties.schedules", "schedules")
//     .where("property.id = :id_property", { id_property: propertyId })
//     .getMany()

//     console.log(schedules)
//     return next()
// }

// export { verifyIfPropertyExists };