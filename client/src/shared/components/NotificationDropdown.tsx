import React, { useState, useEffect } from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { Dropdown, Badge, Empty } from "antd";
import socket from "../../utils/socket";
import { fetchEmployeesByIds } from "../../api/authApi";

interface Employee {
  firstName: string;
  lastName: string;
  _id: string;
  image: string; 
}

interface NotificationData {
  sender: string;
  message: string;
}

interface Notification {
  id: number;
  message: string;
  senderName: string;
  senderImage: string; 
  timestamp: Date;
  read: boolean;
}

const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const handleNotification = async (notification: NotificationData) => {
      try {
        const res = await fetchEmployeesByIds(notification.sender);
        if (res?.data?.employees?.length > 0) {
          const sender: Employee = res.data.employees[0];
          const name = `${sender.firstName} ${sender.lastName}`;
          console.log(sender,"sender------------------");
          
          const newNotification: Notification = {
            id: Date.now(),
            message: notification.message,
            senderName: name,
            senderImage: sender.image || "/default-avatar.png",
            timestamp: new Date(),
            read: false,
          };
          
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
        }
      } catch (error) {
        console.error("Failed to fetch sender details:", error);
      }
    };

    socket.on("notifyUser", handleNotification);

    return () => {
      socket.off("notifyUser", handleNotification);
    };
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
      setUnreadCount(0);
    }
  };

  const handleClearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const notificationPanel = (
    <div className="w-80 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto scrollbar-thin">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-sm text-[#1677ff] hover:text-[#1356cc] transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {notifications.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No notifications"
            className="py-6"
          />
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className="p-4 hover:bg-gray-50 transition-colors flex items-center space-x-3"
            >
              <img
                src={notification.senderImage}
                alt={notification.senderName}
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-800">
                    {notification.senderName}
                  </p>
                  <span className="text-xs text-[#1677ff]">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <Dropdown
      overlay={notificationPanel}
      trigger={["click"]}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
      onOpenChange={handleOpenChange}
    >
      <Badge count={unreadCount} offset={[-2, 2]}>
        <button
          aria-label="Notifications"
          className="flex items-center relative hover:opacity-80"
        >
          <MdOutlineNotificationsActive size={24} color="#8C97A8" />
        </button>
      </Badge>
    </Dropdown>
  );
};

export default NotificationDropdown;
