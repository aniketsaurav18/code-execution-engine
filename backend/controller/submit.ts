import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import { setData } from "../utils/redis";
import { Producer } from "../utils/mqProducer";

export const submitController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = {
            src: atob(req.body.src),
            input: atob(req.body.input),
            lang: req.body.lang,
            id: nanoid(10),
        };
        console.log(data);

        //Produce the data

        const producer = new Producer();
        await producer.publishMessage("worker", data);
        console.log("data published");
        const status = {
            status: "queued",
            id: data.id,
            stdout: undefined,
            stderr: undefined
        }
        await setData(status, data.id);
        return res.status(202).json({
            success: true,
            status: "queued",
            submission_id: data.id,
        });
    } catch (e: any) {
        console.log("api error " + e);
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};