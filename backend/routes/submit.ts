import express, { NextFunction, Router } from "express";
const router: Router = express.Router();
import { submitController } from "../controller/submit.js";

export const submitRouter = router.post("/", submitController);


export default router;
