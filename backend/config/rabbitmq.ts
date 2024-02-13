export const rabbitmqConfig = {
    url: "amqp://guest:guest@localhost:5672",
    exchangeName: "serverExchange",
    queueName: "worker-queue",
    bindingKey: "worker",
};