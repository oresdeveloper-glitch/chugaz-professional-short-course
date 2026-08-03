"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard, BookOpen, CreditCard, Download, Bell,
  Settings, LogOut, Menu, X, GraduationCap
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { getCurrentUser, getStudentData, logout, isAuthenticated } from "@/lib/auth"
import { api } from "@/lib/api"
import type { DashboardTab } from "./components/types"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/GlassCard"
import DashboardTabContent from "./components/DashboardTab"
import CoursesTab from "./components/CoursesTab"
import PaymentsTab from "./components/PaymentsTab"
import DownloadsTab from "./components/DownloadsTab"
import NotificationsTab from "./components/NotificationsTab"
import SettingsTab from "./components/SettingsTab"

const sidebarItems: { icon: any; label: string; tab: DashboardTab }[] = [
  { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" },
  { icon: BookOpen, label: "My Courses", tab: "courses" },
  { icon: CreditCard, label: "Payments", tab: "payments" },
  { icon: Download, label: "Downloads", tab: "downloads" },
  { icon: Bell, label: "Notifications", tab: "notifications" },
  { icon: Settings, label: "Settings", tab: "settings" },
]

export default function StudentDashboard() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [studentData, setStudentData] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [activeTab, setActiveTab] = useState<DashboardTab>("dashboard")

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }
    const u = getCurrentUser()
    setUser(u)
    if (u) {
      getStudentData(u.email).then(data => setStudentData(data))
      api.get("/notifications").then((res) => {
        const r = res as any
        setNotifications(r.data || [])
        setUnreadCount(r.unread || 0)
      }).catch((e) => console.error("Fetch notifications error:", e))
    }
  }, [router])

  const handleLogout = async () => { await logout(); router.push("/") }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#F4B400] border-t-transparent rounded-full" />
      </div>
    )
  }

  const initials = `${(user.firstName || "")[0] || ""}${(user.lastName || "")[0] || ""}` || user.email[0].toUpperCase()
  const safeStudent = studentData || { courses: [], status: "pending", photo: null, phone: "", gender: "", nationality: "", occupation: "", educationLevel: "", region: "", district: "", paymentMethod: "", paymentStatus: "pending", paymentRef: "", transactionId: "", trainingMode: "", preferredTime: "" }
  const studentPhoto = safeStudent.photo || user.photo || null
  const sharedProps = { user, studentData: safeStudent, notifications, setNotifications, unreadCount, setUnreadCount, setActiveTab }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-white/20 dark:border-white/10 z-40 transition-all duration-300 overflow-y-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "w-64"
      )}>
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center gap-3 mb-8 pt-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F4B400] to-[#ffc933] rounded-[20px] flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-[#0B1F4D]" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-sm text-[#0B1F4D] dark:text-white">CHUGAZ</p>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <button key={item.tab} type="button" onClick={() => { setActiveTab(item.tab); setSidebarOpen(false) }} className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-[20px] transition-all text-sm font-medium cursor-pointer",
                activeTab === item.tab ? "bg-[#0B1F4D] text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <Separator className="my-4" />
          <PremiumButton variant="glass" size="md" fullWidth onClick={handleLogout} className="!justify-start">
            <LogOut className="w-5 h-5" /> <span>Logout</span>
          </PremiumButton>
        </div>
      </aside>

      <div className="flex-1 min-h-screen">
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <PremiumButton variant="glass" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden min-w-[44px] min-h-[44px] bg-white border-2 border-primary/20 text-primary hover:bg-white hover:text-primary">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </PremiumButton>
            <h2 className="text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">{sidebarItems.find(i => i.tab === activeTab)?.label || "Dashboard"}</h2>
          </div>
          <div className="flex items-center gap-4 relative">
            <button onClick={() => { setShowNotifications(!showNotifications); if (!showNotifications) { api.post("/notifications/read", { id: "all" }).catch((e) => console.error("Mark read error:", e)); setUnreadCount(0) } }} className="relative text-gray-600 dark:text-gray-400">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <GlassCard variant="default" className="absolute top-full right-0 mt-2 w-80 z-50 max-h-96 overflow-y-auto">
                <GlassCardHeader className="p-3 flex items-center justify-between">
                  <GlassCardTitle className="text-sm font-semibold">Notifications</GlassCardTitle>
                  {notifications.length > 0 && (
                    <button onClick={() => { setNotifications([]); setUnreadCount(0) }} className="text-xs text-gray-500 hover:text-red-500">Clear</button>
                  )}
                </GlassCardHeader>
                <GlassCardContent className="p-0">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-gray-500">No notifications</div>
                  ) : (
                    notifications.map((n: any) => (
                      <div key={n.id} className={`p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${!n.read ? "bg-blue-50 dark:bg-blue-900/10" : ""}`}>
                        <p className="text-xs font-semibold text-[#0B1F4D] dark:text-white">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{new Date(n.created_at).toLocaleDateString()}</p>
                      </div>
                    ))
                  )}
                </GlassCardContent>
              </GlassCard>
            )}
            <Avatar className="w-9 h-9 md:w-10 md:h-10 rounded-[20px]">
              {studentPhoto ? (
                <AvatarImage src={studentPhoto} alt={user.firstName} className="object-cover w-full h-full" />
              ) : (
                <AvatarFallback className="text-sm bg-[#F4B400] text-[#0B1F4D]">{initials}</AvatarFallback>
              )}
            </Avatar>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-8">
          {activeTab === "dashboard" && <DashboardTabContent {...sharedProps} />}
          {activeTab === "courses" && <CoursesTab {...sharedProps} />}
          {activeTab === "payments" && <PaymentsTab {...sharedProps} />}
          {activeTab === "downloads" && <DownloadsTab {...sharedProps} />}
          {activeTab === "notifications" && <NotificationsTab {...sharedProps} />}
          {activeTab === "settings" && <SettingsTab {...sharedProps} />}
        </div>
      </div>
    </div>
  )
}
