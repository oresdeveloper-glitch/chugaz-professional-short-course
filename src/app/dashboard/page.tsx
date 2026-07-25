"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard, BookOpen, CreditCard, Download, Bell,
  Settings, User, FileText, Award, LogOut, Menu, X,
  ChevronRight, Clock, CheckCircle2, AlertCircle, GraduationCap, ArrowUpRight
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { getCurrentUser, getStudentData, logout, isAuthenticated } from "@/lib/auth"
import { courses } from "@/data/courses"
import { api } from "@/lib/api"

type Tab = "dashboard" | "courses" | "payments" | "downloads" | "notifications" | "settings"

const sidebarItems: { icon: any; label: string; tab: Tab }[] = [
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
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")

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
      }).catch(() => {})
    }
  }, [router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (!user || !studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#F4B400] border-t-transparent rounded-full" />
      </div>
    )
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transition-all duration-300 overflow-y-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        sidebarOpen ? "w-64" : "w-64 lg:w-64"
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
              <button key={item.tab} onClick={() => { setActiveTab(item.tab); setSidebarOpen(false) }} className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-[20px] transition-all text-sm font-medium",
                activeTab === item.tab ? "bg-[#0B1F4D] text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <Separator className="my-4" />
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-[20px] transition-all text-sm font-medium">
            <LogOut className="w-5 h-5" /> <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 min-h-screen">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-gray-600 dark:text-gray-400">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">{sidebarItems.find(i => i.tab === activeTab)?.label || "Dashboard"}</h2>
          </div>
          <div className="flex items-center gap-4 relative">
            <button onClick={() => { setShowNotifications(!showNotifications); if (!showNotifications) { api.post("/notifications/read", { id: "all" }).catch(() => {}); setUnreadCount(0) } }} className="relative text-gray-600 dark:text-gray-400">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-[20px] shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0B1F4D] dark:text-white">Notifications</span>
                  {notifications.length > 0 && (
                    <button onClick={() => { setNotifications([]); setUnreadCount(0) }} className="text-xs text-gray-500 hover:text-red-500">Clear</button>
                  )}
                </div>
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
              </div>
            )}
            <Avatar className="w-9 h-9 md:w-10 md:h-10 rounded-[20px]">
              <AvatarFallback className="text-sm bg-[#F4B400] text-[#0B1F4D]">{initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-8">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "courses" && renderCoursesTab()}
          {activeTab === "payments" && renderPaymentsTab()}
          {activeTab === "downloads" && renderDownloadsTab()}
          {activeTab === "notifications" && renderNotificationsTab()}
          {activeTab === "settings" && renderSettingsTab()}
        </div>
      </div>
    </div>
  )

  function renderDashboard() {
    return (
      <>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="rounded-[20px] border-0 bg-gradient-to-br from-[#0B1F4D] to-[#1a3a7a] text-white overflow-hidden">
            <CardContent className="p-6 md:p-8 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4B400]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-2xl font-heading font-extrabold mb-1">Welcome back, {user.firstName}!</h2>
                <p className="text-white/70">Reg No: {user.regNo}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "Registered Courses", value: String(studentData.courses?.length || 0), color: "text-blue-600", bg: "bg-blue-100" },
            { icon: CheckCircle2, label: "Status", value: studentData.status, color: studentData.status === "approved" ? "text-green-600" : "text-[#F4B400]", bg: studentData.status === "approved" ? "bg-green-100" : "bg-yellow-100" },
            { icon: Award, label: "Training Mode", value: studentData.trainingMode || "N/A", color: "text-purple-600", bg: "bg-purple-100" },
            { icon: Clock, label: "Prefered Time", value: studentData.preferredTime || "N/A", color: "text-orange-600", bg: "bg-orange-100" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="rounded-[20px] border-0 shadow-md">
                <CardContent className="p-4 md:p-6 flex items-center gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.bg} rounded-[20px] flex items-center justify-center flex-shrink-0`}>
                    <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-gray-500 truncate">{stat.label}</p>
                    <p className="text-lg md:text-2xl font-heading font-extrabold text-[#0B1F4D] dark:text-white truncate capitalize">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-heading font-bold text-[#0B1F4D] dark:text-white">My Courses</h3>
            {studentData.courses?.length > 0 ? studentData.courses.map((courseTitle: string, i: number) => {
              const course = courses.find(c => c.title === courseTitle)
              return (
                <motion.div key={courseTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="rounded-[20px] border-0 shadow-md">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-[#0B1F4D] dark:text-white">{courseTitle}</h4>
                          <p className="text-sm text-gray-500">Fee: {course?.fee?.toLocaleString() || "N/A"} TZS</p>
                        </div>
                        <Badge className={cn("rounded-[20px]", studentData.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
                          {studentData.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress value={studentData.status === "approved" ? 100 : 30} className="flex-1 h-2 rounded-full" />
                        <span className="text-sm font-semibold">{studentData.status === "approved" ? "100%" : "30%"}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-500 flex items-center gap-1"><Clock className="w-4 h-4" /> Duration: 2 Months</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            }) : (
              <Card className="rounded-[20px] border-0 shadow-md">
                <CardContent className="p-8 text-center text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No courses registered yet.</p>
                  <Link href="/courses"><Button className="mt-4 rounded-[20px] bg-[#F4B400] text-[#0B1F4D]">Browse Courses</Button></Link>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-[#0B1F4D] dark:text-white">Quick Info</h3>
            <Card className="rounded-[20px] border-0 shadow-md">
              <CardContent className="p-4 md:p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{user.firstName} {user.lastName}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium truncate ml-2">{user.email}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Reg No.</span>
                  <span className="font-medium">{user.regNo}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <Badge className={cn("rounded-[20px]", studentData.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{studentData.status}</Badge>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl font-heading font-bold text-[#0B1F4D] dark:text-white pt-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Download, label: "Receipt", color: "text-green-600", bg: "bg-green-100", tab: "downloads" as Tab },
                { icon: Award, label: "Certificate", color: "text-[#F4B400]", bg: "bg-yellow-100", tab: "downloads" as Tab },
                { icon: User, label: "Profile", color: "text-blue-600", bg: "bg-blue-100", tab: "settings" as Tab },
                { icon: FileText, label: "Reports", color: "text-purple-600", bg: "bg-purple-100", tab: "downloads" as Tab },
              ].map((action) => (
                <button key={action.label} onClick={() => setActiveTab(action.tab)} className={`p-4 rounded-[20px] ${action.bg} hover:shadow-md transition-all text-center min-h-[64px]`}>
                  <action.icon className={`w-5 h-5 ${action.color} mx-auto mb-1`} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  function renderCoursesTab() {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold text-[#0B1F4D] dark:text-white">My Courses</h3>
        {studentData.courses?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {studentData.courses.map((courseTitle: string, i: number) => {
              const course = courses.find(c => c.title === courseTitle)
              return (
                <motion.div key={courseTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="rounded-[20px] border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-[#0B1F4D] dark:text-white">{courseTitle}</h4>
                          <p className="text-sm text-gray-500">Fee: {course?.fee?.toLocaleString() || "N/A"} TZS</p>
                        </div>
                        <Badge className={cn("rounded-[20px]", studentData.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{studentData.status}</Badge>
                      </div>
                      <Progress value={studentData.status === "approved" ? 100 : 30} className="h-2 rounded-full mb-2" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span><Clock className="w-4 h-4 inline mr-1" /> 2 Months</span>
                        <span>{studentData.status === "approved" ? "100%" : "30%"}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <Card className="rounded-[20px] border-0 shadow-md">
            <CardContent className="p-8 text-center text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No courses registered yet.</p>
              <Link href="/courses"><Button className="mt-4 rounded-[20px] bg-[#F4B400] text-[#0B1F4D]">Browse Courses</Button></Link>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  function renderPaymentsTab() {
    const total = studentData.courses?.length * 200000 || 0
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold text-[#0B1F4D] dark:text-white">Payment Details</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="rounded-[20px] border-0 bg-green-50 dark:bg-green-900/20 shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-gray-500">Total Fee</p>
              <p className="text-2xl font-heading font-extrabold text-green-600">{total.toLocaleString()} TZS</p>
            </CardContent>
          </Card>
          <Card className="rounded-[20px] border-0 bg-blue-50 dark:bg-blue-900/20 shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="text-lg font-heading font-extrabold text-blue-600 capitalize">{studentData.paymentMethod || "—"}</p>
            </CardContent>
          </Card>
          <Card className="rounded-[20px] border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-gray-500">Payment Status</p>
              <Badge className={cn("mt-1 rounded-[20px] text-sm px-4 py-1", studentData.paymentStatus === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
                {studentData.paymentStatus === "confirmed" ? "Paid" : "Pending"}
              </Badge>
            </CardContent>
          </Card>
        </div>
        <Card className="rounded-[20px] border-0 shadow-md">
          <CardContent className="p-6 space-y-3">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Payment Reference</span><span className="font-mono font-semibold text-[#F4B400]">{studentData.paymentRef || "—"}</span></div>
            <Separator />
            <div className="flex justify-between text-sm"><span className="text-gray-500">Transaction ID</span><span className="font-mono">{studentData.transactionId || "—"}</span></div>
            <Separator />
            <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-semibold">{total.toLocaleString()} TZS</span></div>
            {studentData.paymentStatus !== "confirmed" && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-[20px] text-sm text-yellow-700 dark:text-yellow-300">
                Pay via M-Pesa to <strong>50360811</strong> (Agustino Emmanuel Wiliam) using reference <strong className="font-mono">{studentData.paymentRef}</strong>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderDownloadsTab() {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold text-[#0B1F4D] dark:text-white">Downloads</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: Download, label: "Registration Receipt", desc: "Download your registration receipt", color: "text-green-600", bg: "bg-green-100" },
            { icon: Award, label: "Certificate", desc: "Download your course certificate", color: "text-[#F4B400]", bg: "bg-yellow-100", disabled: studentData.status !== "approved" },
            { icon: FileText, label: "Course Materials", desc: "Download course materials", color: "text-purple-600", bg: "bg-purple-100" },
            { icon: User, label: "Student ID", desc: "Download your student ID card", color: "text-blue-600", bg: "bg-blue-100" },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className={cn("rounded-[20px] border-0 shadow-md", item.disabled && "opacity-50")}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`w-12 h-12 ${item.bg} rounded-[20px] flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#0B1F4D] dark:text-white">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  function renderNotificationsTab() {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold text-[#0B1F4D] dark:text-white">Notifications</h3>
          {notifications.length > 0 && (
            <button onClick={() => { setNotifications([]); setUnreadCount(0) }} className="text-sm text-gray-500 hover:text-red-500">Clear all</button>
          )}
        </div>
        {notifications.length === 0 ? (
          <Card className="rounded-[20px] border-0 shadow-md">
            <CardContent className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No notifications</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((n: any) => (
            <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className={cn("rounded-[20px] border-0 shadow-md", !n.read && "border-l-4 border-l-[#F4B400]")}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[#0B1F4D] dark:text-white">{n.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{n.message}</p>
                    </div>
                    <Badge className={cn("rounded-[20px]", n.read ? "bg-gray-100 text-gray-500" : "bg-[#F4B400] text-[#0B1F4D]")}>{n.read ? "Read" : "New"}</Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{new Date(n.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    )
  }

  function renderSettingsTab() {
    return (
      <div className="space-y-4 max-w-2xl">
        <h3 className="text-xl font-heading font-bold text-[#0B1F4D] dark:text-white">Account Settings</h3>
        <Card className="rounded-[20px] border-0 shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 rounded-[20px]">
                <AvatarFallback className="text-xl bg-[#F4B400] text-[#0B1F4D]">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg text-[#0B1F4D] dark:text-white">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <Separator />
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Registration No</span><p className="font-medium">{user.regNo}</p></div>
              <div><span className="text-gray-500">Phone</span><p className="font-medium">{studentData.phone || "—"}</p></div>
              <div><span className="text-gray-500">Gender</span><p className="font-medium capitalize">{studentData.gender || "—"}</p></div>
              <div><span className="text-gray-500">Nationality</span><p className="font-medium">{studentData.nationality || "—"}</p></div>
              <div><span className="text-gray-500">Occupation</span><p className="font-medium">{studentData.occupation || "—"}</p></div>
              <div><span className="text-gray-500">Education Level</span><p className="font-medium">{studentData.educationLevel || "—"}</p></div>
              <div><span className="text-gray-500">Region</span><p className="font-medium">{studentData.region || "—"}</p></div>
              <div><span className="text-gray-500">District</span><p className="font-medium">{studentData.district || "—"}</p></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}
