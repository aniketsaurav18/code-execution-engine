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
exports.Producer = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const rabbitmq_1 = require("../config/rabbitmq");
class Producer {
    createChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield amqplib_1.default.connect(rabbitmq_1.rabbitmqConfig.url);
                this.channel = yield connection.createChannel();
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    publishMessage(routingKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.channel) {
                    yield this.createChannel();
                }
                yield this.channel.assertExchange(rabbitmq_1.rabbitmqConfig.exchangeName, "direct");
                yield this.channel.publish(rabbitmq_1.rabbitmqConfig.exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
                console.log(`The new ${routingKey} submit request is sent to exchange ${rabbitmq_1.rabbitmqConfig.exchangeName}`);
            }
            catch (e) {
                console.log("Producer Error : %s ", e.message);
            }
        });
    }
}
exports.Producer = Producer;
//# sourceMappingURL=mqProducer.js.map