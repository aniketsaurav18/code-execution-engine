"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitmqConfig = void 0;
exports.rabbitmqConfig = {
    url: "amqp://guest:guest@localhost:5672",
    exchangeName: "serverExchange",
    queueName: "worker-queue",
    bindingKey: "worker",
};
//# sourceMappingURL=rabbitmq.js.map