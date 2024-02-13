"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitController = void 0;
const nanoid_1 = require("nanoid");
const redis_1 = require("../utils/redis");
const mqProducer_1 = require("../utils/mqProducer");
const submitController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = {
            src: atob(req.body.src),
            input: atob(req.body.input),
            lang: req.body.lang,
            id: (0, nanoid_1.nanoid)(10),
        };
        console.log(data);
        const producer = new mqProducer_1.Producer();
        yield producer.publishMessage("worker", data);
        console.log("data published");
        const status = {
            status: "queued",
            id: data.id,
            stdout: undefined,
            stderr: undefined
        };
        yield (0, redis_1.setData)(status, data.id);
        return res.status(202).json({
            success: true,
            status: "queued",
            submission_id: data.id,
        });
    }
    catch (e) {
        console.log("api error " + e);
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
});
exports.submitController = submitController;
//# sourceMappingURL=submit.js.map