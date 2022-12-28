import { Request, Response } from "express";
import { createScheduleService, listAllSchedulesByPropertyIdService } from "../services/schedulesServices";

const createScheduleController = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const hour = req.newHour;
    const data = req.body;
    const newSchedule = await createScheduleService(data, hour, userId);

    return res.status(201).json(newSchedule);
}

const listAllSchedulesByPropertyIdController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const allSchedules = await listAllSchedulesByPropertyIdService(id);

    return res.status(200).json(allSchedules);
}

export { createScheduleController, listAllSchedulesByPropertyIdController };