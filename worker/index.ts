import amqp from "amqplib"
// import { RabbitMQConsumer } from "./utils/rabbitmq.js";
import { execute } from "./utils/execute.js";
import { rabbitmqConfig } from "./config/config.js"
// import { setData } from "./utils/redisClient.js";

// const rabbitmqConfig = {
//     url: "amqp://guest:guest@localhost:5672",
//     exchangeName: "serverExchange",
//     queueName: "worker-queue",
//     bindingKey: "worker",
// };

export const runner = async () => {
    try {
        const connection = await amqp.connect(rabbitmqConfig.url);
        const channel = await connection.createChannel();
        await channel.assertExchange(rabbitmqConfig.exchangeName, "direct");
        const q = await channel.assertQueue(rabbitmqConfig.queueName);
        await channel.bindQueue(q.queue, rabbitmqConfig.exchangeName, rabbitmqConfig.bindingKey);


        // consume
        console.log("Consumer waiting for message to arrive");
        channel.consume(q.queue, async (msg) => {
            if (msg) {
                const consumedData = JSON.parse(Buffer.from(msg.content).toString());
                // console.log("consumed data ...................")
                // console.log(consumedData);
                // console.log("consumed data ...................")

                const result = await execute(consumedData);

                // await setData(`output:${consumedData.id}`, result)
                channel.ack(msg);
            }
        });

    } catch (e: any) {
        if (e.code === "ECONNREFUSED") {
            console.log("Consumer Error: " + e.code);
            console.log("Error while connecting to the queue.");
        } else {
            console.error("Consumer Error");
            console.log(e);
        }
    }
}

runner();
