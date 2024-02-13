import express, { Router } from "express";
const router: Router = express.Router();
import { statusController } from "../controller/status.js";

export const statusRouter = router.get("/:submission_id", statusController);


export default statusRouter;
