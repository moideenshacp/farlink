import BaseRepository from "./baseRepository";
import NotificationModel from "../models/NotificationModel";
import InotificationRepository from "../interfaces/InotificationRepository";
import InotificationModel from "../interfaces/INotificationModel";

export class NotificationRepository
  extends BaseRepository<InotificationModel>
  implements InotificationRepository
{
  constructor() {
    super(NotificationModel);
  }

  async createNotification(
    notificationData: Partial<InotificationModel>
  ): Promise<InotificationModel | null> {
    try {
      const notification = new this.model(notificationData);
      return await notification.save();
    } catch (error) {
      console.error("Error creating notification:", error);
      throw new Error("Failed to create notification");
    }
  }
  async getNotificationsByUserId(
    userId: string
  ): Promise<InotificationModel[]> {
    try {
      const notifications = await this.model
        .find({
          reciever: userId,
        })
        .sort({ timestamp: -1 });

      return notifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw new Error("Failed to fetch notifications");
    }
  }
  async markAllAsRead(userId: string): Promise<void> {
    try {
      await this.model.updateMany(
        { reciever: userId, read: false },
        { $set: { read: true } }
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      throw new Error("Failed to mark notifications as read");
    }
  }
  async clearReadNotifications(userId: string): Promise<void> {
    try {
      await this.model.deleteMany({ reciever: userId, read: true });
    } catch (error) {
      console.error("Error clearing read notifications:", error);
      throw new Error("Failed to clear read notifications");
    }
  }
}
