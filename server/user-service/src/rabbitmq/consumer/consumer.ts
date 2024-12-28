import { userRepository } from "../../repositories/userRepository";
import { getChannel } from "../../config/rabbitmq";
import { publishEvent } from "../producer/producer";

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

          const {
            id,
            role,
            name,
            email,
            firstName,
            lastName,
            phone,
            image,
            organizationId,
          } = event.payload;
          const employeeData = {
            _id: id,
            role: role,
            name,
            email,
            firstName,
            lastName,
            phone,
            image,
            organizationId,
          };
          const userRepo = new userRepository();

          const savedData = await userRepo.createUser(employeeData);
          if (savedData) {
            console.log("saveddd");
          } else {
            console.log("failed");
          }
        }
        if (event.event === "UPDATE_EMPLOYEE") {
          const {
            id,
            role,
            name,
            email,
            firstName,
            lastName,
            phone,
            image,
            organizationId,
          } = event.payload;
          const employeeData = {
            _id: id,
            role,
            name,
            email,
            firstName,
            lastName,
            phone,
            image,
            organizationId,
          };

          console.log("Updating employee with data:", employeeData);

          const userRepo = new userRepository();
          try {
            const updateData = await userRepo.findByIdAndUpdate(
              id,
              employeeData
            );

            if (updateData) {
              console.log("Employee updated successfully:", updateData);
            } else {
              console.log("Employee update failed, no matching record found.");
            }
          } catch (error) {
            console.error("Error during employee update:", error);
          }
        }
        if (event.event === "SET_UP_PASSWORD") {
            console.log("gettttttttttt-------------------");
  
            const {
              password,email
            } = event.payload;
           console.log(password,email,"we are from user-service");
           
            const userRepo = new userRepository();
  
            const updateEmployee = await userRepo.update({ email }, { password })
            if (updateEmployee) {
                console.log("saveddd");
            } else {
                console.log("failed");
            }
          }

          if(event.event === "FIND_SUBCRIPTION_PLAN"){
            const {email,responseQueue} = event.payload

            const userRepo = new userRepository();
            
            const details = await userRepo.findByEmailWithPopulate(email,"organizationId")
            console.log(details);
            await publishEvent(responseQueue, { success: true, details });
          }

        // // Acknowledge the message
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error in consumeEvents:", error);
  }
};
