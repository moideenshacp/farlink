import InotificationModel from "./INotificationModel";

export default interface InotificationRepository {
    createNotification(notificationData: Partial<InotificationModel>): Promise<InotificationModel | null>;
    getNotificationsByUserId(userId: string): Promise<InotificationModel[]>
    markAllAsRead(userId: string): Promise<void> 
    clearReadNotifications(userId: string): Promise<void> 
  }
  