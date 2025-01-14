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
            position
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
            position
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
            position
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
            position
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
          if (event.event === "TERMINATE_EMPLOYEE") {
            console.log("gettttttttttt-------------------");
  
            const {
              email
            } = event.payload;
           console.log(email,"we are from user-service");
           
            const userRepo = new userRepository();
            const employee = await userRepo.findByEmail(email)
            let TerminateEmployee;
            if(!employee){
              return null
            }
            if(employee.isActive === true){
              TerminateEmployee = await userRepo.update({email},{isActive:false})
            }else{
              TerminateEmployee  = await userRepo.update({email},{isActive:true})
            }
            if (TerminateEmployee) {
                console.log("Employee terminated");
            } else {
                console.log("Employee termination failed");
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
