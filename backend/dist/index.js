"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const submit_js_1 = __importDefault(require("./routes/submit.js"));
const status_js_1 = __importDefault(require("./routes/status.js"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/submit", submit_js_1.default);
app.use("/api/status", status_js_1.default);
app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});
const port = process.env.PORT || 7000;
const server = app.listen(port, () => {
    console.log("Server is running on port ", port);
});
module.exports = app;
//# sourceMappingURL=index.js.map