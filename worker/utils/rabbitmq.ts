import * as amqp from "amqplib";


interface RabbitMQConfig {
    url: string;
    exchangeName: string;
    queueName: string;
    bindingKey: string;
}

interface ConsumedData {
    src: string,
    input: string,
    lang: string,
    id: string
}

class RabbitMQConsumer {
    private connection: amqp.Connection | undefined;
    private channel: amqp.Channel | undefined;

    constructor(private rabbitmqConfig: RabbitMQConfig) { }

    async setup(): Promise<ConsumedData> {
        return new Promise<ConsumedData>(async (resolve, reject) => {
            try {
                this.connection = await amqp.connect(this.rabbitmqConfig.url);
                this.channel = await this.connection.createChannel();
                await this.channel.assertExchange(this.rabbitmqConfig.exchangeName, "direct");
                const q = await this.channel.assertQueue(this.rabbitmqConfig.queueName);
                await this.channel.bindQueue(q.queue, this.rabbitmqConfig.exchangeName, this.rabbitmqConfig.bindingKey);

                // Start consuming messages
                this.channel.consume(q.queue, async (msg) => {
                    try {
                        if (msg) {
                            const consumedData: ConsumedData = JSON.parse(Buffer.from(msg.content).toString());
                            // console.log("Consumed data:");
                            // console.log(consumedData);
                            resolve(consumedData);
                        }
                    } catch (error) {
                        console.error("Error handling consumed data:", error);
                        reject(error);
                    }
                });
            } catch (e: any) {
                console.log("Consumer setup error: %s", e.message);
                reject(e);
            }
        });
    }

    async close(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
        }
    }

    async sendMessage(message: ConsumedData): Promise<void> {
        try {
            // Publish the message to the RabbitMQ exchange
            this.channel?.publish(
                this.rabbitmqConfig.exchangeName,
                this.rabbitmqConfig.bindingKey,
                Buffer.from(JSON.stringify(message))
            );
            console.log("Message sent successfully:", message);
        } catch (error) {
            console.error("Error sending message:", error);
            throw error;
        }
    }
}

export { RabbitMQConsumer };

// Example usage:
// const rabbitmqConfig: RabbitMQConfig = {
//     url: "amqp://rabbitmq:5672",
//     exchangeName: "directExchange",
//     queueName: "myQueue",
//     bindingKey: "routingKey",
// };

// const consumer = new RabbitMQConsumer(rabbitmqConfig);

// consumer.setup()
//     .then((consumedData) => {
//         console.log("Setup completed. Received message:", consumedData);
//         // Do something with the received message
//     })
//     .catch((error) => {
//         console.error("Error during setup:", error);
//     });

// To close the connection when done (optional)
// consumer.close();

// Example to send a message
// const messageToSend: ConsumedData = {
//     key1: "value1",
//     key2: 42,
//     // ... other properties
// };

// consumer.sendMessage(messageToSend)
//     .then(() => {
//         console.log("Message sent successfully:", messageToSend);
//     })
//     .catch((error) => {
//         console.error("Error sending message:", error);
//     });
