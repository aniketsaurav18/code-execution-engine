import { Request, Response, NextFunction } from "express";
import { getData } from "../utils/redis";


export const statusController = async (req: Request, res: Response, next: NextFunction) => {
    const submission_id = req.params.submission_id;
    const result = await getData(submission_id);
    console.log(result);
    res.status(200).json(result);
};