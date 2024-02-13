"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const status_js_1 = require("../controller/status.js");
exports.statusRouter = router.get("/:submission_id", status_js_1.statusController);
exports.default = exports.statusRouter;
//# sourceMappingURL=status.js.map