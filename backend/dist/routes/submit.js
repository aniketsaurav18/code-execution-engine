"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const submit_js_1 = require("../controller/submit.js");
exports.submitRouter = router.post("/", submit_js_1.submitController);
exports.default = router;
//# sourceMappingURL=submit.js.map