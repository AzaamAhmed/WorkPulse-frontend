export interface Notification {
  id: number;
  description: string;
  firstName: string;
  lastName: string;
  type: "message" | "info" | "important";
  isRead: boolean;
  created: Date;
  createdBy: string;
}
