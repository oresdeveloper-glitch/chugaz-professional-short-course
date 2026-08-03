"use client"

import {
  Users, UserPlus, CheckCircle2, TrendingUp, Clock,
  CreditCard, Eye, Bell, Trash2, XCircle, GraduationCap, Mail
} from "lucide-react"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/GlassCard"
import { Badge } from "@/components/ui/badge"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { getTotalFee } from "@/data/courses"
import type { Student, SharedActions } from "./types"

interface Props extends SharedActions {
  students: Student[]
  pendingStudents: Student[]
  approvedStudents: Student[]
}

export default function DashboardTab({ students, pendingStudents, approvedStudents, updateStudentStatus, confirmPayment, sendReminder, sendCustomNotification, deleteStudent, showToast }: Props) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [customMsg, setCustomMsg] = useState("")
  const closeModal = () => { setSelectedStudent(null); setCustomMsg("") }
  const totalRevenue = students.filter(s => s.paymentStatus === "confirmed").reduce((sum, s) => sum + getTotalFee(s.courses), 0)

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
        {[
          { icon: Users, label: "Total Students", value: students.length.toString(), change: "+" + students.length, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20" },
          { icon: UserPlus, label: "New Registrations", value: pendingStudents.length.toString(), change: "+" + pendingStudents.length, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20" },
          { icon: CheckCircle2, label: "Approved", value: approvedStudents.length.toString(), change: "+" + approvedStudents.length, color: "text-[#F4B400]", bg: "bg-yellow-100 dark:bg-yellow-900/20" },
          { icon: TrendingUp, label: "Total Revenue", value: `TZS ${totalRevenue.toLocaleString()}`, change: "+" + totalRevenue.toLocaleString(), color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/20" },
          { icon: Clock, label: "Pending Payments", value: pendingStudents.length.toString(), change: pendingStudents.length > 0 ? "+" + pendingStudents.length : "0", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/20" },
        ].map((stat, i) => (
          <div key={stat.label}>
            <GlassCard variant="elevated">
              <GlassCardContent className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className={`w-8 h-8 md:w-10 md:h-10 ${stat.bg} rounded-[20px] flex items-center justify-center`}>
                    <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
                  </div>
                  <span className="text-[10px] md:text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-[20px] px-2 py-0.5 md:px-2 md:py-1">{stat.change}</span>
                </div>
                <p className="text-base md:text-xl font-heading font-extrabold text-[#0B1F4D] dark:text-white break-words">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
              </GlassCardContent>
            </GlassCard>
          </div>
        ))}
      </div>

      <GlassCard variant="elevated">
        <GlassCardHeader className="p-4 md:p-6">
          <GlassCardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">
            Recent Registrations {pendingStudents.length > 0 && <Badge className="ml-2 bg-[#F4B400] text-[#0B1F4D]">{pendingStudents.length} pending</Badge>}
          </GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent className="p-4 md:p-6 pt-0 md:pt-0">
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
                      <tr key={s.regNo}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-3 px-3 md:px-4 text-sm font-medium text-[#0B1F4D] dark:text-white whitespace-nowrap">{s.regNo}</td>
                        <td className="py-3 px-3 md:px-4 whitespace-nowrap"><span className="text-sm">{s.firstName} {s.lastName}</span></td>
                        <td className="py-3 px-3 md:px-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{s.email}</td>
                        <td className="py-3 px-3 md:px-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{s.courses.length} course(s)</td>
                        <td className="py-3 px-3 md:px-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{new Date(s.createdAt).toLocaleDateString()}</td>
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
                            <button onClick={() => { sendReminder(s.email, "payment"); }} className="p-1.5 md:p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-[10px] text-blue-600 hover:bg-blue-200 min-w-[32px] min-h-[32px] flex items-center justify-center" title="Send Payment Reminder"><Bell className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                            <button onClick={() => deleteStudent(s.email)} className="p-1.5 md:p-1.5 bg-gray-100 dark:bg-gray-800 rounded-[10px] text-gray-600 hover:bg-gray-200 min-w-[32px] min-h-[32px] flex items-center justify-center" title="Delete"><Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </GlassCardContent>
      </GlassCard>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 md:p-4" onClick={closeModal}>
          <div className="bg-white dark:bg-gray-900 rounded-[20px] p-4 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto mx-2 md:mx-0" onClick={e => e.stopPropagation()}>
            <h3 className="text-base md:text-xl font-heading font-bold text-[#0B1F4D] dark:text-white mb-3 md:mb-4">Student Details</h3>
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
                <PremiumButton onClick={() => { confirmPayment(selectedStudent.email); closeModal() }}
                  variant={selectedStudent.paymentStatus === "confirmed" ? "glass" : "gradient-gold"}
                  className="flex-1 min-h-[44px]" iconLeft={<CreditCard className="w-4 h-4" />}>
                  {selectedStudent.paymentStatus === "confirmed" ? "Reset Payment" : "Confirm Payment"}
                </PremiumButton>
                {selectedStudent.status === "pending" && (
                  <>
                    <PremiumButton onClick={() => { updateStudentStatus(selectedStudent.email, "approved"); closeModal() }}
                      variant="gradient-gold" className="flex-1 min-h-[44px]" iconLeft={<CheckCircle2 className="w-4 h-4" />}>
                      Approve
                    </PremiumButton>
                    <PremiumButton onClick={() => { updateStudentStatus(selectedStudent.email, "rejected"); closeModal() }}
                      variant="gradient-primary" className="flex-1 min-h-[44px]" iconLeft={<XCircle className="w-4 h-4" />}>
                      Reject
                    </PremiumButton>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <PremiumButton onClick={() => { sendReminder(selectedStudent.email, "payment"); closeModal() }}
                  variant="glass" className="flex-1 min-h-[44px] text-xs" iconLeft={<Bell className="w-4 h-4" />}>
                  Remind Payment
                </PremiumButton>
                <PremiumButton onClick={() => { sendReminder(selectedStudent.email, "registration"); closeModal() }}
                  variant="glass" className="flex-1 min-h-[44px] text-xs" iconLeft={<Bell className="w-4 h-4" />}>
                  Reg. Follow-up
                </PremiumButton>
                <PremiumButton onClick={() => { sendReminder(selectedStudent.email, "general"); closeModal() }}
                  variant="glass" className="flex-1 min-h-[44px] text-xs" iconLeft={<Bell className="w-4 h-4" />}>
                  General
                </PremiumButton>
              </div>
              <Separator className="my-2" />
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Custom Notification</label>
                <textarea value={customMsg} onChange={e => setCustomMsg(e.target.value)} className="w-full rounded-[16px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm min-h-[80px] resize-none outline-none focus:ring-2 focus:ring-[#F4B400]" placeholder="Type your message here..." />
                <PremiumButton onClick={() => { sendCustomNotification(selectedStudent.email); closeModal() }} disabled={!customMsg.trim()}
                  variant="gradient-gold" fullWidth className="min-h-[40px] text-sm" iconLeft={<Bell className="w-4 h-4" />}>
                  Send Notification
                </PremiumButton>
              </div>
              <PremiumButton variant="glass" onClick={closeModal} fullWidth className="min-h-[44px]">Close</PremiumButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}