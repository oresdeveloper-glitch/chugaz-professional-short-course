"use client"

import { Search, CreditCard, CheckCircle2, XCircle, Bell, Trash2 } from "lucide-react"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/GlassCard"
import { Badge } from "@/components/ui/badge"
import { PremiumInput } from "@/components/ui/PremiumInput"
import { cn } from "@/lib/utils"
import type { Student, SharedActions } from "./types"

interface Props extends SharedActions {
  students: Student[]
  searchQuery: string
  setSearchQuery: (v: string) => void
  filterStatus: string
  setFilterStatus: (v: string) => void
}

export default function StudentsTab({ students, searchQuery, setSearchQuery, filterStatus, setFilterStatus, confirmPayment, updateStudentStatus, sendReminder, deleteStudent }: Props) {
  const filteredStudents = students.filter(s => {
    const fullName = `${s.firstName} ${s.middleName} ${s.lastName}`.toLowerCase()
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || s.regNo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || s.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <GlassCard variant="elevated">
      <GlassCardHeader className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
          <GlassCardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">All Students ({students.length})</GlassCardTitle>
          <div className="flex flex-col sm:flex-row gap-3">
            <PremiumInput label="Search" placeholder="Search by name or reg no." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              iconLeft={<Search className="w-4 h-4" />} className="rounded-[20px] w-full sm:w-48 md:w-64 min-h-[44px]" />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-[20px] border border-input bg-background px-3 md:px-4 py-2 text-sm min-h-[44px] w-full sm:w-auto">
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </GlassCardHeader>
      <GlassCardContent className="p-4 md:p-6 pt-0 md:pt-0">
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
                  {filteredStudents.map((s) => (
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
                          <button onClick={() => { sendReminder(s.email, "payment"); }} className="p-1.5 md:p-1.5 bg-blue-100 rounded-[10px] text-blue-600 hover:bg-blue-200 min-w-[32px] min-h-[32px] flex items-center justify-center" title="Send Payment Reminder"><Bell className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
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
      </GlassCardContent>
    </GlassCard>
  )
}
