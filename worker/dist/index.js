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
exports.runner = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const execute_js_1 = require("./utils/execute.js");
const config_js_1 = require("./config/config.js");
const runner = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib_1.default.connect(config_js_1.rabbitmqConfig.url);
        const channel = yield connection.createChannel();
        yield channel.assertExchange(config_js_1.rabbitmqConfig.exchangeName, "direct");
        const q = yield channel.assertQueue(config_js_1.rabbitmqConfig.queueName);
        yield channel.bindQueue(q.queue, config_js_1.rabbitmqConfig.exchangeName, config_js_1.rabbitmqConfig.bindingKey);
        console.log("Consumer waiting for message to arrive");
        channel.consume(q.queue, (msg) => __awaiter(void 0, void 0, void 0, function* () {
            if (msg) {
                const consumedData = JSON.parse(Buffer.from(msg.content).toString());
                const result = yield (0, execute_js_1.execute)(consumedData);
                channel.ack(msg);
            }
        }));
    }
    catch (e) {
        if (e.code === "ECONNREFUSED") {
            console.log("Consumer Error: " + e.code);
            console.log("Error while connecting to the queue.");
        }
        else {
            console.error("Consumer Error");
            console.log(e);
        }
    }
});
exports.runner = runner;
(0, exports.runner)();
//# sourceMappingURL=index.js.map