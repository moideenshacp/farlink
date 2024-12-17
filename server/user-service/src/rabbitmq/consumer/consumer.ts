import { getChannel } from "../../config/rabbitmq";
import { userService } from "../../services/userService";

export const consumeEvents = async (): Promise<void> => {
    try {
        const channel = getChannel();
        const queue = "user-service-queue";

        await channel.assertQueue(queue, { durable: true });
        console.log(`Waiting for messages in queue: ${queue}`);

        channel.consume(queue, async (message) => {
            if (message) {
                const event = JSON.parse(message.content.toString());
                console.log("Event received:", event);
                console.log("events",event.payload);
                

                // if (event.event === "REGISTER_USER") {
                //     const { name, email } = event.payload;
                //     const userSvc = new userService();

                //     // Call user service logic to create the user
                //     await userSvc.registersUser(name, email, "defaultPassword");
                // }

                // // Acknowledge the message
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error("Error in consumeEvents:", error);
    }
};
