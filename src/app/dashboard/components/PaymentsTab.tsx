"use client"

import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { DashboardTabProps } from "./types"

export default function PaymentsTab({ studentData }: DashboardTabProps) {
  const total = studentData.courses?.length * 200000 || 0
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Payment Details</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <GlassCard variant="elevated" className="rounded-[20px] border-0 bg-green-50 dark:bg-green-900/20 shadow-md">
          <GlassCardContent className="p-6 text-center">
            <p className="text-sm text-gray-500">Total Fee</p>
            <p className="text-base sm:text-2xl font-heading font-extrabold text-green-600">{total.toLocaleString()} TZS</p>
          </GlassCardContent>
        </GlassCard>
        <GlassCard variant="elevated" className="rounded-[20px] border-0 bg-blue-50 dark:bg-blue-900/20 shadow-md">
          <GlassCardContent className="p-6 text-center">
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="text-base md:text-lg font-heading font-extrabold text-blue-600 capitalize">{studentData.paymentMethod || "—"}</p>
          </GlassCardContent>
        </GlassCard>
        <GlassCard variant="elevated" className="rounded-[20px] border-0 shadow-md">
          <GlassCardContent className="p-6 text-center">
            <p className="text-sm text-gray-500">Payment Status</p>
            <Badge className={cn("mt-1 rounded-[20px] text-sm px-4 py-1", studentData.paymentStatus === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
              {studentData.paymentStatus === "confirmed" ? "Paid" : "Pending"}
            </Badge>
          </GlassCardContent>
        </GlassCard>
      </div>
      <GlassCard variant="elevated" className="rounded-[20px] border-0 shadow-md">
        <GlassCardContent className="p-6 space-y-3">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Payment Reference</span><span className="font-mono font-semibold text-[#F4B400]">{studentData.paymentRef || "—"}</span></div>
          <Separator />
          <div className="flex justify-between text-sm"><span className="text-gray-500">Transaction ID</span><span className="font-mono">{studentData.transactionId || "—"}</span></div>
          <Separator />
          <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-semibold">{total.toLocaleString()} TZS</span></div>
          {studentData.paymentStatus !== "confirmed" && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-[20px] text-sm text-yellow-700 dark:text-yellow-300">
              Pay via M-Pesa to <strong>50360811</strong> (Agustino Emmanuel Wilian) using reference <strong className="font-mono">{studentData.paymentRef}</strong>
            </div>
          )}
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}
