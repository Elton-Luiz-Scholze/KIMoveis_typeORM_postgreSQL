import { Request, Response } from "express";
import { createScheduleService } from "../services/schedulesServices";

const createScheduleController = async (req: Request, res: Response) => {
    const newSchedule = await createScheduleService(req.body, req.user.id);

    return res.status(201).json(newSchedule);
}

export { createScheduleController };