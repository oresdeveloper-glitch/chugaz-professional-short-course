export type DashboardTab = "dashboard" | "courses" | "payments" | "downloads" | "notifications" | "settings"

export interface DashboardTabProps {
  user: any
  studentData: any
  notifications: any[]
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>
  unreadCount: number
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>
  setActiveTab: (tab: DashboardTab) => void
}
