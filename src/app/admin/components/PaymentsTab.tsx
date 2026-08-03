"use client"

import { CreditCard } from "lucide-react"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/GlassCard"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Student, SharedActions } from "./types"

interface Props extends SharedActions {
  students: Student[]
}

export default function PaymentsTab({ students, confirmPayment }: Props) {
  const paidStudents = students.filter(s => s.paymentStatus === "confirmed")
  const pendingPay = students.filter(s => s.paymentStatus !== "confirmed")
  const totalRevenue = paidStudents.reduce((sum, s) => sum + (s.courses.length * 200000), 0)

  return (
    <GlassCard variant="elevated">
      <GlassCardHeader className="p-4 md:p-6">
        <GlassCardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Payment Records</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="p-4 md:p-6 pt-0 md:pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          <GlassCard variant="elevated" className="bg-green-50 dark:bg-green-900/20">
            <GlassCardContent className="p-4 md:p-6 text-center">
              <p className="text-xs md:text-sm text-gray-500">Total Revenue</p>
              <p className="text-base md:text-xl font-heading font-extrabold text-green-600">TZS {totalRevenue.toLocaleString()}</p>
            </GlassCardContent>
          </GlassCard>
          <GlassCard variant="elevated" className="bg-yellow-50 dark:bg-yellow-900/20">
            <GlassCardContent className="p-4 md:p-6 text-center">
              <p className="text-xs md:text-sm text-gray-500">Pending</p>
              <p className="text-base md:text-xl font-heading font-extrabold text-[#F4B400]">{pendingPay.length}</p>
            </GlassCardContent>
          </GlassCard>
          <GlassCard variant="elevated" className="bg-blue-50 dark:bg-blue-900/20">
            <GlassCardContent className="p-4 md:p-6 text-center">
              <p className="text-xs md:text-sm text-gray-500">Completed</p>
              <p className="text-base md:text-xl font-heading font-extrabold text-blue-600">{paidStudents.length}</p>
            </GlassCardContent>
          </GlassCard>
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
                  {students.slice().reverse().map((s) => {
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
      </GlassCardContent>
    </GlassCard>
  )
}
