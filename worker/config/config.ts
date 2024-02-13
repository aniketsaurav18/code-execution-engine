export const containerName: { [key: string]: string } = {
    "cpp": "gcccompiler",
    "python": "pythoncompiler"
};

export const executionVariables: { [key: string]: number } = {
    "memoryLimit": 1000000000,  //1gb in bytes
    "timeLimit": 2  //seconds
}

export const extensionName: { [key: string]: string } = {
    "cpp": "cpp",
    "python": "py"
};

export const rabbitmqConfig = {
    url: "amqp://guest:guest@localhost:5672",
    exchangeName: "serverExchange",
    queueName: "worker-queue",
    bindingKey: "worker",
};

