import amqp from "amqplib"
import { rabbitmqConfig } from "../config/rabbitmq";

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

class Producer {
    channel: any;

    async createChannel() {
        try {
            const connection = await amqp.connect(rabbitmqConfig.url);
            this.channel = await connection.createChannel();
        } catch (e: any) {
            console.log(e.message);
        }
    }

    async publishMessage(routingKey: string, message: object) {
        try {
            if (!this.channel) {
                await this.createChannel();
            }

            await this.channel.assertExchange(rabbitmqConfig.exchangeName, "direct");
            await this.channel.publish(
                rabbitmqConfig.exchangeName,
                routingKey,
                Buffer.from(JSON.stringify(message))
            );

            console.log(
                `The new ${routingKey} submit request is sent to exchange ${rabbitmqConfig.exchangeName}`
            );
        } catch (e: any) {
            console.log("Producer Error : %s ", e.message);
        }
    }
}

export { Producer };
