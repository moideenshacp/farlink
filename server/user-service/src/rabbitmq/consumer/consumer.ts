import { userRepository } from "../../repositories/userRepository";
import { getChannel } from "../../config/rabbitmq";


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
                

                if (event.event === "REGISTER_EMPLOYEE") {
                    console.log("gettttttttttt-------------------");
                    
                    const {id,role, name, email ,firstName,lastName,phone,image,organizationId} = event.payload;
                    const employeeData = {
                        _id: id,
                        role:role,
                        name,
                        email,
                        firstName,
                        lastName,
                        phone,
                        image,
                        organizationId
                    };
                    const userRepo = new userRepository();

                    // Call user service logic to create the user
                   const savedData =  await userRepo.createUser(employeeData)
                   if(savedData){
                    console.log("saveddd");
                    
                   }else{
                    console.log("failed");
                    
                   }
                }

                // // Acknowledge the message
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error("Error in consumeEvents:", error);
    }
};
