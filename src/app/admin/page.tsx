"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard, Users, BookOpen, CreditCard, Award,
  FileBarChart, MessageSquare, Settings, LogOut, Menu, X,
  Bell, Search, Download, Trash2, Edit,
  CheckCircle2, XCircle, UserPlus, TrendingUp, Clock,
  GraduationCap, Mail, Phone, MapPin, Calendar, Eye
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { isAuthenticated, isAdmin, logout, getAllStudents } from "@/lib/auth"
import { api } from "@/lib/api"

type Student = {
  regNo: string; firstName: string; middleName: string; lastName: string;
  gender: string; dateOfBirth: string; nationality: string; occupation: string;
  educationLevel: string; phone: string; whatsapp: string; email: string;
  region: string; district: string; street: string; postalAddress: string;
  courses: string[]; trainingMode: string; preferredTime: string;
  paymentMethod: string; paymentRef: string; transactionId: string;
  paymentStatus: string; status: "pending" | "approved" | "rejected";
  createdAt: string;
}

type Tab = "dashboard" | "students" | "courses" | "payments" | "messages" | "settings"

const sidebarItems: { icon: any; label: string; tab: Tab }[] = [
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
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")
  const [students, setStudents] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      router.push("/login")
      return
    }
    getAllStudents().then(data => setStudents(data))
  }, [router])

  const updateStudentStatus = async (email: string, status: "approved" | "rejected") => {
    const student = students.find(s => s.email === email)
    if (!student) return
    try {
      await api.post(`/students/${student.regNo}/${status}`)
      setStudents(prev => prev.map(s => s.email === email ? { ...s, status } : s))
    } catch {}
  }

  const confirmPayment = async (email: string) => {
    const student = students.find(s => s.email === email)
    if (!student) return
    try {
      const res = await api.post(`/students/${student.regNo}/payment`)
      setStudents(prev => prev.map(s => s.email === email ? { ...s, paymentStatus: (res as any).payment_status } : s))
    } catch {}
  }

  const deleteStudent = async (email: string) => {
    const student = students.find(s => s.email === email)
    if (!student) return
    try {
      await api.delete(`/students/${student.regNo}`)
      setStudents(prev => prev.filter(s => s.email !== email))
    } catch {}
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const pendingStudents = students.filter(s => s.status === "pending")
  const approvedStudents = students.filter(s => s.status === "approved")

  const filteredStudents = students.filter(s => {
    const fullName = `${s.firstName} ${s.middleName} ${s.lastName}`.toLowerCase()
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || s.regNo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || s.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return renderDashboard()
      case "students": return renderStudents()
      case "courses": return renderCourses()
      case "payments": return renderPayments()
      case "messages": return renderMessages()
      case "settings": return renderSettings()
      default: return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 overflow-y-auto",
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
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-[20px] transition-all text-sm font-medium",
                  activeTab === item.tab
                    ? "bg-[#0B1F4D] text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <Separator className="my-4" />
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-[20px] transition-all text-sm font-medium">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-h-screen min-w-0">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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
          {renderContent()}
        </div>
      </div>
    </div>
  )

  function renderDashboard() {
    return (
      <>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
          {[
            { icon: Users, label: "Total Students", value: students.length.toString(), change: "+" + students.length, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20" },
            { icon: UserPlus, label: "New Registrations", value: pendingStudents.length.toString(), change: "+" + pendingStudents.length, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20" },
            { icon: CheckCircle2, label: "Approved", value: approvedStudents.length.toString(), change: "+" + approvedStudents.length, color: "text-[#F4B400]", bg: "bg-yellow-100 dark:bg-yellow-900/20" },
            { icon: TrendingUp, label: "Total Revenue", value: `TZS ${(approvedStudents.length * 200000).toLocaleString()}`, change: "+" + (approvedStudents.length * 200000).toLocaleString(), color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/20" },
            { icon: Clock, label: "Pending Payments", value: pendingStudents.length.toString(), change: pendingStudents.length > 0 ? "+" + pendingStudents.length : "0", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/20" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="rounded-[20px] border-0 shadow-md">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div className={`w-8 h-8 md:w-10 md:h-10 ${stat.bg} rounded-[20px] flex items-center justify-center`}>
                      <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
                    </div>
                    <span className="text-[10px] md:text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-[20px] px-2 py-0.5 md:px-2 md:py-1">{stat.change}</span>
                  </div>
                  <p className="text-lg md:text-2xl font-heading font-extrabold text-[#0B1F4D] dark:text-white truncate">{stat.value}</p>
                  <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="rounded-[20px] border-0 shadow-md">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">
              Recent Registrations {pendingStudents.length > 0 && <Badge className="ml-2 bg-[#F4B400] text-[#0B1F4D]">{pendingStudents.length} pending</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
            {students.length === 0 ? (
              <div className="text-center py-8 md:py-12 text-gray-500">
                <Users className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-gray-300" />
                <p className="text-base md:text-lg font-medium mb-1">No registrations yet</p>
                <p className="text-xs md:text-sm">Register a student from the /register page to see them here</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 md:-mx-0">
                <div className="min-w-[700px] md:min-w-0 px-4 md:px-0">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Reg No.</th>
                            <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Name</th>
                            <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Email</th>
                            <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Courses</th>
                            <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Date</th>
                            <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Payment</th>
                            <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Status</th>
                            <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.slice().reverse().map((s, i) => (
                            <motion.tr key={s.regNo} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              <td className="py-3 px-3 md:px-4 text-sm font-medium text-[#0B1F4D] dark:text-white whitespace-nowrap">{s.regNo}</td>
                              <td className="py-3 px-3 md:px-4 whitespace-nowrap"><span className="text-sm">{s.firstName} {s.lastName}</span></td>
                              <td className="py-3 px-3 md:px-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{s.email}</td>
                              <td className="py-3 px-3 md:px-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{s.courses.length} course(s)</td>
                              <td className="py-3 px-3 md:px-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{new Date(s.createdAt).toLocaleDateString()}</td>
                              <td className="py-3 px-3 md:px-4 whitespace-nowrap">
                                <Badge className={cn("rounded-[20px] capitalize", s.paymentStatus === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
                                  {s.paymentStatus === "confirmed" ? <CheckCircle2 className="w-3 h-3 mr-1 inline" /> : <Clock className="w-3 h-3 mr-1 inline" />}
                                  {s.paymentStatus === "confirmed" ? "Paid" : "Pending"}
                                </Badge>
                              </td>
                              <td className="py-3 px-3 md:px-4 whitespace-nowrap">
                                <Badge className={cn("rounded-[20px] capitalize", s.status === "approved" ? "bg-green-100 text-green-700" : s.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}>
                                  {s.status === "approved" ? <CheckCircle2 className="w-3 h-3 mr-1 inline" /> : s.status === "pending" ? <Clock className="w-3 h-3 mr-1 inline" /> : <XCircle className="w-3 h-3 mr-1 inline" />}
                                  {s.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-3 md:px-4 whitespace-nowrap">
                                <div className="flex gap-1">
                                  <button onClick={() => setSelectedStudent(s)} className="p-1.5 md:p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-[10px] text-blue-600 hover:bg-blue-200 min-w-[32px] min-h-[32px] flex items-center justify-center" title="View"><Eye className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                                  <button onClick={() => confirmPayment(s.email)} className={`p-1.5 md:p-1.5 rounded-[10px] min-w-[32px] min-h-[32px] flex items-center justify-center ${s.paymentStatus === "confirmed" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"}`} title={s.paymentStatus === "confirmed" ? "Reset Payment" : "Confirm Payment"}>
                                    <CreditCard className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                  </button>
                                  {s.status === "pending" && (
                                    <>
                                      <button onClick={() => updateStudentStatus(s.email, "approved")} className="p-1.5 md:p-1.5 bg-green-100 dark:bg-green-900/30 rounded-[10px] text-green-600 hover:bg-green-200 min-w-[32px] min-h-[32px] flex items-center justify-center" title="Approve"><CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                                      <button onClick={() => updateStudentStatus(s.email, "rejected")} className="p-1.5 md:p-1.5 bg-red-100 dark:bg-red-900/30 rounded-[10px] text-red-600 hover:bg-red-200 min-w-[32px] min-h-[32px] flex items-center justify-center" title="Reject"><XCircle className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                                    </>
                                  )}
                                  <button onClick={() => deleteStudent(s.email)} className="p-1.5 md:p-1.5 bg-gray-100 dark:bg-gray-800 rounded-[10px] text-gray-600 hover:bg-gray-200 min-w-[32px] min-h-[32px] flex items-center justify-center" title="Delete"><Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 md:p-4" onClick={() => setSelectedStudent(null)}>
            <div className="bg-white dark:bg-gray-900 rounded-[20px] p-4 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto mx-2 md:mx-0" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg md:text-xl font-heading font-bold text-[#0B1F4D] dark:text-white mb-3 md:mb-4">Student Details</h3>
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <p><strong>Reg No:</strong> {selectedStudent.regNo}</p>
                <p><strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.middleName} {selectedStudent.lastName}</p>
                <p><strong>Gender:</strong> {selectedStudent.gender}</p>
                <p><strong>DOB:</strong> {selectedStudent.dateOfBirth}</p>
                <p><strong>Nationality:</strong> {selectedStudent.nationality}</p>
                <p><strong>Occupation:</strong> {selectedStudent.occupation}</p>
                <p><strong>Education:</strong> {selectedStudent.educationLevel}</p>
                <Separator />
                <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>Region:</strong> {selectedStudent.region}</p>
                <Separator />
                <p><strong>Courses:</strong> {selectedStudent.courses.join(", ")}</p>
                <p><strong>Mode:</strong> {selectedStudent.trainingMode}</p>
                <p><strong>Time:</strong> {selectedStudent.preferredTime}</p>
                <p><strong>Payment Method:</strong> {selectedStudent.paymentMethod}</p>
                <p><strong>Payment Ref:</strong> <span className="font-mono text-[#F4B400]">{selectedStudent.paymentRef}</span></p>
                {selectedStudent.transactionId && <p><strong>Transaction ID:</strong> <span className="font-mono">{selectedStudent.transactionId}</span></p>}
                <p><strong>Payment Status:</strong> <Badge className={cn("rounded-[20px]", selectedStudent.paymentStatus === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{selectedStudent.paymentStatus === "confirmed" ? "Paid" : "Pending"}</Badge></p>
                <p><strong>Registration Status:</strong> <Badge className={cn("rounded-[20px] capitalize", selectedStudent.status === "approved" ? "bg-green-100 text-green-700" : selectedStudent.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}>{selectedStudent.status}</Badge></p>
              </div>
              <div className="flex flex-col gap-2 mt-4 md:mt-6">
                <div className="flex gap-2">
                  <Button onClick={() => { confirmPayment(selectedStudent.email); setSelectedStudent(null) }}
                    className={`flex-1 rounded-[20px] min-h-[44px] ${selectedStudent.paymentStatus === "confirmed" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}>
                    <CreditCard className="w-4 h-4 mr-2" /> {selectedStudent.paymentStatus === "confirmed" ? "Reset Payment" : "Confirm Payment"}
                  </Button>
                  {selectedStudent.status === "pending" && (
                    <>
                      <Button onClick={() => { updateStudentStatus(selectedStudent.email, "approved"); setSelectedStudent(null) }}
                        className="flex-1 rounded-[20px] bg-green-600 hover:bg-green-700 text-white min-h-[44px]">
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                      </Button>
                      <Button onClick={() => { updateStudentStatus(selectedStudent.email, "rejected"); setSelectedStudent(null) }}
                        className="flex-1 rounded-[20px] bg-red-600 hover:bg-red-700 text-white min-h-[44px]">
                        <XCircle className="w-4 h-4 mr-2" /> Reject
                      </Button>
                    </>
                  )}
                </div>
                <Button variant="outline" onClick={() => setSelectedStudent(null)} className="rounded-[20px] min-h-[44px]">Close</Button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  function renderStudents() {
    return (
      <Card className="rounded-[20px] border-0 shadow-md">
        <CardHeader className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
            <CardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">All Students ({students.length})</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 rounded-[20px] w-full sm:w-48 md:w-64 min-h-[44px]" />
              </div>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-[20px] border border-input bg-background px-3 md:px-4 py-2 text-sm min-h-[44px] w-full sm:w-auto">
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No students found.</div>
          ) : (
            <div className="overflow-x-auto -mx-4 md:-mx-0">
              <div className="min-w-[650px] md:min-w-0 px-4 md:px-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Reg No.</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Name</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Email</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Phone</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Courses</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Payment</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Status</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s, i) => (
                      <tr key={s.regNo} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-3 px-3 md:px-4 text-sm font-medium text-[#0B1F4D] whitespace-nowrap">{s.regNo}</td>
                        <td className="py-3 px-3 md:px-4 whitespace-nowrap"><span className="text-sm">{s.firstName} {s.lastName}</span></td>
                        <td className="py-3 px-3 md:px-4 text-sm text-gray-600 whitespace-nowrap">{s.email}</td>
                        <td className="py-3 px-3 md:px-4 text-sm text-gray-600 whitespace-nowrap">{s.phone}</td>
                        <td className="py-3 px-3 md:px-4 text-sm text-gray-600 whitespace-nowrap">{s.courses.length}</td>
                        <td className="py-3 px-3 md:px-4 whitespace-nowrap">
                          <Badge className={cn("rounded-[20px] capitalize", s.paymentStatus === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
                            {s.paymentStatus === "confirmed" ? "Paid" : "Pending"}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 md:px-4 whitespace-nowrap">
                          <Badge className={cn("rounded-[20px] capitalize", s.status === "approved" ? "bg-green-100 text-green-700" : s.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}>{s.status}</Badge>
                        </td>
                        <td className="py-3 px-3 md:px-4 whitespace-nowrap">
                          <div className="flex gap-1">
                            <button onClick={() => confirmPayment(s.email)} className={`p-1.5 md:p-1.5 rounded-[10px] min-w-[32px] min-h-[32px] flex items-center justify-center ${s.paymentStatus === "confirmed" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"}`} title={s.paymentStatus === "confirmed" ? "Reset Payment" : "Confirm Payment"}>
                              <CreditCard className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            {s.status === "pending" && (
                              <>
                                <button onClick={() => updateStudentStatus(s.email, "approved")} className="p-1.5 md:p-1.5 bg-green-100 rounded-[10px] text-green-600 hover:bg-green-200 min-w-[32px] min-h-[32px] flex items-center justify-center" title="Approve"><CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                                <button onClick={() => updateStudentStatus(s.email, "rejected")} className="p-1.5 md:p-1.5 bg-red-100 rounded-[10px] text-red-600 hover:bg-red-200 min-w-[32px] min-h-[32px] flex items-center justify-center" title="Reject"><XCircle className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                              </>
                            )}
                            <button onClick={() => deleteStudent(s.email)} className="p-1.5 md:p-1.5 bg-gray-100 rounded-[10px] text-gray-600 hover:bg-gray-200 min-w-[32px] min-h-[32px] flex items-center justify-center" title="Delete"><Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  function renderCourses() {
    return (
      <Card className="rounded-[20px] border-0 shadow-md">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Course Management</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {["Programming Languages", "Engineering & Design", "Creative Skills", "Computer Skills"].map(cat => (
              <Card key={cat} className="rounded-[20px] border border-gray-200 dark:border-gray-700">
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-semibold text-[#0B1F4D] dark:text-white mb-2 text-sm md:text-base">{cat}</h3>
                  <p className="text-xl md:text-2xl font-heading font-extrabold text-[#F4B400]">
                    {students.filter(s => {
                      const catCourses: Record<string, string[]> = {
                        "Programming Languages": ["C Programming","C++","Python","Java","JavaScript","HTML & CSS"],
                        "Engineering & Design": ["AutoCAD","ArchiCAD","SolidWorks"],
                        "Creative Skills": ["Graphic Design","Website Design"],
                        "Computer Skills": ["Computer Basics","Microsoft Word","Microsoft Excel","Microsoft PowerPoint"]
                      }
                      return s.courses.some(c => catCourses[cat]?.includes(c))
                    }).length}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">Registered students</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 md:mt-6 text-center text-gray-500 text-xs md:text-sm">Course editing available in the full Laravel backend.</div>
        </CardContent>
      </Card>
    )
  }

  function renderPayments() {
    const paidStudents = students.filter(s => s.paymentStatus === "confirmed")
    const pendingPay = students.filter(s => s.paymentStatus !== "confirmed")
    const totalRevenue = paidStudents.reduce((sum, s) => sum + (s.courses.length * 200000), 0)
    return (
      <Card className="rounded-[20px] border-0 shadow-md">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Payment Records</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            <Card className="rounded-[20px] bg-green-50 dark:bg-green-900/20 border-0">
              <CardContent className="p-4 md:p-6 text-center">
                <p className="text-xs md:text-sm text-gray-500">Total Revenue</p>
                <p className="text-lg md:text-2xl font-heading font-extrabold text-green-600">TZS {totalRevenue.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="rounded-[20px] bg-yellow-50 dark:bg-yellow-900/20 border-0">
              <CardContent className="p-4 md:p-6 text-center">
                <p className="text-xs md:text-sm text-gray-500">Pending</p>
                <p className="text-lg md:text-2xl font-heading font-extrabold text-[#F4B400]">{pendingPay.length}</p>
              </CardContent>
            </Card>
            <Card className="rounded-[20px] bg-blue-50 dark:bg-blue-900/20 border-0">
              <CardContent className="p-4 md:p-6 text-center">
                <p className="text-xs md:text-sm text-gray-500">Completed</p>
                <p className="text-lg md:text-2xl font-heading font-extrabold text-blue-600">{paidStudents.length}</p>
              </CardContent>
            </Card>
          </div>

          {students.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No payment records yet.</div>
          ) : (
            <div className="overflow-x-auto -mx-4 md:-mx-0">
              <div className="min-w-[700px] md:min-w-0 px-4 md:px-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Student</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Reg No.</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Payment Ref</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Transaction ID</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Method</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Amount</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Status</th>
                      <th className="text-left py-3 px-3 md:px-4 text-sm font-semibold text-gray-500 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice().reverse().map((s, i) => {
                      const amount = s.courses.length * 200000
                      return (
                        <tr key={s.regNo} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="py-3 px-3 md:px-4 text-sm font-medium text-[#0B1F4D] whitespace-nowrap">{s.firstName} {s.lastName}</td>
                          <td className="py-3 px-3 md:px-4 text-sm text-gray-600 whitespace-nowrap">{s.regNo}</td>
                          <td className="py-3 px-3 md:px-4 text-sm font-mono text-[#F4B400] whitespace-nowrap">{s.paymentRef}</td>
                          <td className="py-3 px-3 md:px-4 text-sm font-mono text-gray-600 whitespace-nowrap">{s.transactionId || "—"}</td>
                          <td className="py-3 px-3 md:px-4 text-sm capitalize text-gray-600 whitespace-nowrap">{s.paymentMethod || "—"}</td>
                          <td className="py-3 px-3 md:px-4 text-sm font-semibold text-gray-900 whitespace-nowrap">{amount.toLocaleString()} TZS</td>
                          <td className="py-3 px-3 md:px-4 whitespace-nowrap">
                            <Badge className={cn("rounded-[20px]", s.paymentStatus === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
                              {s.paymentStatus === "confirmed" ? "Paid" : "Pending"}
                            </Badge>
                          </td>
                          <td className="py-3 px-3 md:px-4 whitespace-nowrap">
                            <button onClick={() => confirmPayment(s.email)} className={`p-1.5 md:p-1.5 rounded-[10px] min-w-[32px] min-h-[32px] flex items-center justify-center ${s.paymentStatus === "confirmed" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"}`} title={s.paymentStatus === "confirmed" ? "Reset Payment" : "Confirm Payment"}>
                              <CreditCard className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  function renderMessages() {
    return (
      <Card className="rounded-[20px] border-0 shadow-md">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Contact Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <div className="text-center py-8 md:py-12 text-gray-500">
            <Mail className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-gray-300" />
            <p className="text-base md:text-lg font-medium mb-1">No messages yet</p>
            <p className="text-xs md:text-sm">Messages from the contact form will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  function renderSettings() {
    return (
      <Card className="rounded-[20px] border-0 shadow-md">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-4 md:space-y-6">
          <div>
            <h3 className="font-semibold mb-2 text-sm md:text-base">Admin Profile</h3>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-[20px]">
              <Avatar className="w-12 h-12 md:w-16 md:h-16 rounded-[20px]">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-medium text-sm md:text-base">Administrator</p>
                <p className="text-xs md:text-sm text-gray-500 truncate">admin@chugazstationery.com</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm md:text-base">Institution Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div><label className="text-xs md:text-sm text-gray-500">Institution Name</label><p className="font-medium text-sm md:text-base">CHUGAZ STATIONERY</p></div>
              <div><label className="text-xs md:text-sm text-gray-500">Tagline</label><p className="font-medium text-sm md:text-base">Empowering Minds, Building Futures</p></div>
              <div><label className="text-xs md:text-sm text-gray-500">Location</label><p className="font-medium text-sm md:text-base">Mbeya, Tanzania</p></div>
              <div><label className="text-xs md:text-sm text-gray-500">Deadline</label><p className="font-medium text-sm md:text-base">31 August 2026</p></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}