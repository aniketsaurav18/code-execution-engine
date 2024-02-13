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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.setData = void 0;
const ioredis_1 = require("ioredis");
const redis_json_1 = __importDefault(require("redis-json"));
const client = new ioredis_1.Redis();
const jsonCache = new redis_json_1.default(client, { prefix: 'data:' });
const setData = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield jsonCache.set(`output:${id}`, data, { expire: 3600 });
    }
    catch (e) {
        throw e;
    }
});
exports.setData = setData;
const getData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield jsonCache.get(`output:${id}`);
        return result;
    }
    catch (e) {
        throw e;
    }
});
exports.getData = getData;
//# sourceMappingURL=redisClient.js.map