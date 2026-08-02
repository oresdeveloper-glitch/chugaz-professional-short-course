"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import {
  LayoutDashboard, Users, BookOpen, CreditCard,
  MessageSquare, Settings, LogOut, Menu, X,
  Bell, GraduationCap
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { isAuthenticated, isAdmin, logout, getAllStudents } from "@/lib/auth"
import type { Student, AdminTab, SharedActions } from "./components/types"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"

const DashboardTab = dynamic(() => import("./components/DashboardTab"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-[#F4B400] border-t-transparent rounded-full" /></div>
})
const StudentsTab = dynamic(() => import("./components/StudentsTab"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-[#F4B400] border-t-transparent rounded-full" /></div>
})
const CoursesTab = dynamic(() => import("./components/CoursesTab"))
const PaymentsTab = dynamic(() => import("./components/PaymentsTab"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-[#F4B400] border-t-transparent rounded-full" /></div>
})
const MessagesTab = dynamic(() => import("./components/MessagesTab"))
const SettingsTab = dynamic(() => import("./components/SettingsTab"))

const sidebarItems: { icon: any; label: string; tab: AdminTab }[] = [
  { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" },
  { icon: Users, label: "Students", tab: "students" },
  { icon: BookOpen, label: "Courses", tab: "courses" },
  { icon: CreditCard, label: "Payments", tab: "payments" },
  { icon: MessageSquare, label: "Messages", tab: "messages" },
  { icon: Settings, label: "Settings", tab: "settings" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard")
  const [students, setStudents] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [toast, setToast] = useState("")

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      router.push("/login")
      return
    }
    getAllStudents().then(data => setStudents(data)).catch(e => { console.error("Load students error:", e); showToast("Failed to load students") })
  }, [router])

  const actions: SharedActions = {
    updateStudentStatus: async (email, status) => {
      const student = students.find(s => s.email === email)
      if (!student) return
      try {
        await (await fetch(`/api/students/${student.regNo}/${status}`, { method: "POST" })).json()
        setStudents(prev => prev.map(s => s.email === email ? { ...s, status } : s))
        showToast(`Student ${status}`)
      } catch (e: any) { showToast(e?.message || `Failed to ${status}`) }
    },
    confirmPayment: async (email) => {
      const student = students.find(s => s.email === email)
      if (!student) return
      try {
        const res = await (await fetch(`/api/students/${student.regNo}/payment`, { method: "POST" })).json()
        setStudents(prev => prev.map(s => s.email === email ? { ...s, paymentStatus: (res as any).payment_status } : s))
        showToast(`Payment ${(res as any).payment_status === "confirmed" ? "confirmed" : "reset"}`)
      } catch (e: any) { showToast(e?.message || "Payment action failed") }
    },
    sendReminder: async (email, reason) => {
      const student = students.find(s => s.email === email)
      if (!student) return
      try {
        await (await fetch(`/api/students/${student.regNo}/remind`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reason }) })).json()
        showToast("Reminder sent")
      } catch (e: any) { showToast(e?.message || "Reminder failed") }
    },
    sendCustomNotification: async (email) => {},
    showToast,
    deleteStudent: async (email) => {
      const student = students.find(s => s.email === email)
      if (!student) return
      try {
        await (await fetch(`/api/students/${student.regNo}`, { method: "DELETE" })).json()
        setStudents(prev => prev.filter(s => s.email !== email))
        showToast("Student deleted")
      } catch (e: any) { showToast(e?.message || "Delete failed") }
    },
  }

  const handleLogout = async () => { await logout(); router.push("/") }

  const pendingStudents = students.filter(s => s.status === "pending")
  const approvedStudents = students.filter(s => s.status === "approved")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-white/20 dark:border-white/10 z-50 transition-all duration-300 overflow-y-auto",
        "w-64",
        sidebarOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
        sidebarOpen ? "lg:w-64" : "lg:w-20"
      )}>
        <div className={cn("h-full flex flex-col p-4", !sidebarOpen && "lg:px-2")}>
          <div className="flex items-center gap-3 mb-8 pt-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F4B400] to-[#ffc933] rounded-[20px] flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-[#0B1F4D]" />
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-heading font-extrabold text-sm text-[#0B1F4D] dark:text-white">CHUGAZ</p>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <button key={item.tab} onClick={() => setActiveTab(item.tab)}
                className={cn("w-full flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-[20px] transition-all text-sm font-medium",
                  activeTab === item.tab ? "bg-[#0B1F4D] text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <Separator className="my-4" />
          <PremiumButton variant="glass" size="md" fullWidth onClick={handleLogout} className="!justify-start">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </PremiumButton>
        </div>
      </aside>

      <div className="flex-1 min-h-screen min-w-0">
        {toast && (
          <GlassCard variant="dark" className="fixed top-4 right-4 z-[100] px-5 py-3 shadow-xl text-sm font-medium animate-in slide-in-from-top-2">
            <GlassCardContent className="p-0 text-white">{toast}</GlassCardContent>
          </GlassCard>
        )}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 md:gap-4">
            <PremiumButton variant="glass" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="min-w-[44px] min-h-[44px]">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </PremiumButton>
            <h2 className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">
              {sidebarItems.find(i => i.tab === activeTab)?.label || "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button className="relative text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <Bell className="w-5 h-5" />
              {pendingStudents.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{pendingStudents.length}</span>
              )}
            </button>
            <Avatar className="w-9 h-9 md:w-10 md:h-10 rounded-[20px]">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {activeTab === "dashboard" && (
            <GlassCard variant="default">
              <GlassCardContent className="p-0">
                <DashboardTab students={students} pendingStudents={pendingStudents} approvedStudents={approvedStudents} {...actions} />
              </GlassCardContent>
            </GlassCard>
          )}
          {activeTab === "students" && (
            <GlassCard variant="default">
              <GlassCardContent className="p-0">
                <StudentsTab students={students} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterStatus={filterStatus} setFilterStatus={setFilterStatus} {...actions} />
              </GlassCardContent>
            </GlassCard>
          )}
          {activeTab === "courses" && (
            <GlassCard variant="default">
              <GlassCardContent className="p-0">
                <CoursesTab students={students} />
              </GlassCardContent>
            </GlassCard>
          )}
          {activeTab === "payments" && (
            <GlassCard variant="default">
              <GlassCardContent className="p-0">
                <PaymentsTab students={students} {...actions} />
              </GlassCardContent>
            </GlassCard>
          )}
          {activeTab === "messages" && (
            <GlassCard variant="default">
              <GlassCardContent className="p-0">
                <MessagesTab />
              </GlassCardContent>
            </GlassCard>
          )}
          {activeTab === "settings" && (
            <GlassCard variant="default">
              <GlassCardContent className="p-0">
                <SettingsTab />
              </GlassCardContent>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  )
}
