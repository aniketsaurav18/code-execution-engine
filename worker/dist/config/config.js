"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitmqConfig = exports.extensionName = exports.executionVariables = exports.containerName = void 0;
exports.containerName = {
    "cpp": "gcccompiler",
    "python": "pythoncompiler"
};
exports.executionVariables = {
    "memoryLimit": 1000000000,
    "timeLimit": 2
};
exports.extensionName = {
    "cpp": "cpp",
    "python": "py"
};
exports.rabbitmqConfig = {
    url: "amqp://guest:guest@localhost:5672",
    exchangeName: "serverExchange",
    queueName: "worker-queue",
    bindingKey: "worker",
};
//# sourceMappingURL=config.js.map