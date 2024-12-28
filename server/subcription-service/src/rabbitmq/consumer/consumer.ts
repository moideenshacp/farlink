import { getChannel } from "../../config/rabbitmq";
import { subcriptionRepository } from "../../repositories/subcriptionRepository";

export const consumeEvents = async (): Promise<void> => {
  try {
    const channel = getChannel();
    const queue = "subscription-service-queue";

    await channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for messages in queue: ${queue}`);

    channel.consume(queue, async (message) => {
      if (message) {
        const event = JSON.parse(message.content.toString());
        
        console.log("Event received1111111111:", event);
        if(event.event === "COMPANY_SUBCRIPTION"){
          const {organizationId,subscriptionType,industry,admin} = event.payload

          const data = {
            organizationId,subscriptionType,industry,admin
          }

          const subcriptionRepo = new subcriptionRepository()
          const subscription = await subcriptionRepo.save(data) 
          if(subscription){
            console.log("subscription",subscription);
            
          }else{
            console.log("subscription failed saved");
            
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
