"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.RabbitMQConsumer = void 0;
const amqp = __importStar(require("amqplib"));
class RabbitMQConsumer {
    constructor(rabbitmqConfig) {
        this.rabbitmqConfig = rabbitmqConfig;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    this.connection = yield amqp.connect(this.rabbitmqConfig.url);
                    this.channel = yield this.connection.createChannel();
                    yield this.channel.assertExchange(this.rabbitmqConfig.exchangeName, "direct");
                    const q = yield this.channel.assertQueue(this.rabbitmqConfig.queueName);
                    yield this.channel.bindQueue(q.queue, this.rabbitmqConfig.exchangeName, this.rabbitmqConfig.bindingKey);
                    this.channel.consume(q.queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            if (msg) {
                                const consumedData = JSON.parse(Buffer.from(msg.content).toString());
                                resolve(consumedData);
                            }
                        }
                        catch (error) {
                            console.error("Error handling consumed data:", error);
                            reject(error);
                        }
                    }));
                }
                catch (e) {
                    console.log("Consumer setup error: %s", e.message);
                    reject(e);
                }
            }));
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                yield this.connection.close();
            }
        });
    }
    sendMessage(message) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (_a = this.channel) === null || _a === void 0 ? void 0 : _a.publish(this.rabbitmqConfig.exchangeName, this.rabbitmqConfig.bindingKey, Buffer.from(JSON.stringify(message)));
                console.log("Message sent successfully:", message);
            }
            catch (error) {
                console.error("Error sending message:", error);
                throw error;
            }
        });
    }
}
exports.RabbitMQConsumer = RabbitMQConsumer;
//# sourceMappingURL=rabbitmq.js.map