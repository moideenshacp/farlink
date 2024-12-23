import { getChannel } from "../../config/rabbitmq";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const publishEvent = async (queue: string, message: any): Promise<void> => {
    try {
        const channel = getChannel();
        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
        console.log(`Message sent to queue ${queue}:`, message);
    } catch (error) {
        console.error(`Failed to publish message to queue ${queue}`, error);
    }
};
