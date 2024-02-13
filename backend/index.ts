import express, { Request, Response } from "express"
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import submitRouter from "./routes/submit.js"
import statusRouter from "./routes/status.js";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/submit", submitRouter);
app.use("/api/status", statusRouter);

// Health Check
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

// Listening on port
const port = process.env.PORT || 7000;
const server = app.listen(port, () => {
  console.log("Server is running on port ", port);
});

module.exports = app;
