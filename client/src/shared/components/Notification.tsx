/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { message } from "antd";
import socket from "../../utils/socket";
import { fetchEmployeesByIds } from "../../api/authApi";

const Notifications = () => {
  useEffect(() => {
    socket.on("notifyUser", async (notification: any) => {
      try {
        const res = await fetchEmployeesByIds(notification.sender);
        if (res?.data?.employees?.length > 0) {
          const name = `${res.data.employees[0].firstName} ${res.data.employees[0].lastName}`;
          console.log("Notification received from:", name);
          message.info(`${notification.message} from ${name}`);
        } else {
          message.info(notification.message);
        }
      } catch (error) {
        console.error("Failed to fetch sender details:", error);
      }
    });

    return () => {
      socket.off("notifyUser");
    };
  }, []);

  return null;
};

export default Notifications;
