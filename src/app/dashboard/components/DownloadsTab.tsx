"use client"

import { Download, Award, FileText, User, ArrowUpRight } from "lucide-react"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { cn } from "@/lib/utils"
import type { DashboardTabProps } from "./types"

export default function DownloadsTab({ user, studentData }: DashboardTabProps) {
  const downloadReceipt = () => {
    const courses = studentData.courses || []
    const totalFee = courses.reduce((sum: number, c: any) => sum + (c.fee || 0), 0)
    const courseRows = courses.map((c: any, i: number) => `
      <tr style="background:${i % 2 === 0 ? "#fff" : "#f8f9fa"}">
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;text-align:center">${i + 1}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0B1F4D">${c.title || c}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">${c.category || "Short Course"}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#0B1F4D">${(c.fee || 0).toLocaleString()} TZS</td>
      </tr>`).join("")
    const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    const photo = studentData.photo || null
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>CHUGAZ Registration Receipt - ${user.regNo}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', -apple-system, Arial, sans-serif; background: #f3f4f6; padding: 40px 20px; -webkit-font-smoothing: antialiased; }
  .page { max-width: 780px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; }
  .header { background: #0B1F4D; padding: 32px 40px 24px; color: #fff; }
  .header-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .header h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
  .header h1 span { color: #F4B400; }
  .header .tagline { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 4px; }
  .receipt-badge { background: rgba(244,180,0,0.15); color: #F4B400; padding: 8px 18px; border-radius: 100px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; }
  .status-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
  .status-bar .label { font-size: 12px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; }
  .status-bar .value { font-size: 18px; font-weight: 700; margin-top: 2px; letter-spacing: 1px; }
  .status-bar .status { background: #10b981; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.5px; }
  .body { padding: 32px 40px; }
  .section-title { font-size: 13px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 14px; }
  .student-head { display: flex; align-items: flex-start; gap: 24px; margin-bottom: 24px; }
  .passport-photo { width: 110px; height: 110px; border: 3px solid #0B1F4D; border-radius: 12px; object-fit: cover; flex-shrink: 0; background: #f9fafb; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .info-item label { display: block; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
  .info-item p { font-size: 14px; font-weight: 600; color: #111827; }
  .divider { height: 1px; background: #e5e7eb; margin: 24px 0; }
  table { width: 100%; border-collapse: collapse; }
  thead th { padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 2px solid #e5e7eb; }
  thead th:last-child { text-align: right; }
  thead th:first-child { text-align: center; width: 40px; }
  tfoot td { padding: 14px 12px 0; }
  .total-row td { padding: 14px 12px; border-top: 2px solid #0B1F4D; font-weight: 800; font-size: 18px; color: #0B1F4D; }
  .total-row td:last-child { text-align: right; }
  .footer { background: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb; }
  .footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .footer-item label { display: block; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .footer-item p { font-size: 13px; color: #374151; }
  .footer-bottom { text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; line-height: 1.6; }
  @media print {
    body { background: #fff; padding: 0; }
    .page { box-shadow: none; border-radius: 0; }
    .no-print { display: none; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="header-top">
      <div>
        <h1>CHUGAZ <span>ICT Services Office Supplies</span></h1>
        <p class="tagline">Professional Short Course Registration</p>
      </div>
      <div class="receipt-badge">RECEIPT</div>
    </div>
    <div class="status-bar">
      <div>
        <div class="label">Registration No</div>
        <div class="value">${user.regNo}</div>
      </div>
      <div style="text-align:center">
        <div class="label">Payment Ref</div>
        <div class="value" style="font-size:15px;letter-spacing:0.5px">${studentData.paymentRef || "—"}</div>
      </div>
      <div style="text-align:right">
        <div class="label">Date</div>
        <div class="value" style="font-size:15px">${dateStr}</div>
      </div>
    </div>
  </div>
  <div class="body">
    <div class="section-title">Student Information</div>
    <div class="student-head">
      ${photo ? `<img class="passport-photo" src="${photo}" alt="Passport Photo" />` : ""}
      <div class="info-grid" style="flex:1">
        <div class="info-item">
          <label>Full Name</label>
          <p>${studentData.firstName || user.firstName} ${studentData.middleName ? studentData.middleName + " " : ""}${studentData.lastName || user.lastName}</p>
        </div>
        <div class="info-item">
          <label>Email</label>
          <p>${user.email}</p>
        </div>
        <div class="info-item">
          <label>Phone</label>
          <p>${studentData.phone || "—"}${studentData.whatsapp ? " / " + studentData.whatsapp : ""}</p>
        </div>
        <div class="info-item">
          <label>Training Mode</label>
          <p style="text-transform:capitalize">${studentData.trainingMode || "—"}</p>
        </div>
        <div class="info-item">
          <label>Preferred Time</label>
          <p style="text-transform:capitalize">${studentData.preferredTime || "—"}</p>
        </div>
        <div class="info-item">
          <label>Payment Method</label>
          <p style="text-transform:capitalize">${studentData.paymentMethod || "—"}</p>
        </div>
        <div class="info-item">
          <label>Payment Reference</label>
          <p style="font-family:monospace;letter-spacing:0.5px">${studentData.paymentRef || "—"}</p>
        </div>
        ${studentData.transactionId ? `<div class="info-item">
          <label>Transaction ID</label>
          <p style="font-family:monospace">${studentData.transactionId}</p>
        </div>` : ""}
      </div>
    </div>
    <div class="divider"></div>
    <div class="section-title">Registered Courses</div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Course</th>
          <th>Category</th>
          <th>Fee</th>
        </tr>
      </thead>
      <tbody>${courseRows}</tbody>
      <tfoot>
        <tr class="total-row">
          <td colspan="3">Total Fee</td>
          <td>${totalFee.toLocaleString()} TZS</td>
        </tr>
      </tfoot>
    </table>
    <div style="margin-top:24px;padding:16px 20px;background:#fefce8;border-radius:12px;font-size:13px;color:#92400e">
      <strong style="display:block;margin-bottom:4px">Payment Instructions</strong>
      Pay via Vodacom M-Pesa to <strong>50360811</strong> (Agustino Emmanuel Wilian). Upload your payment confirmation on the registration portal.
    </div>
  </div>
  <div class="footer">
    <div class="footer-grid">
      <div class="footer-item">
        <label>Institution</label>
        <p>CHUGAZ ICT Services Office Supplies<br>Mbeya, Tanzania</p>
      </div>
      <div class="footer-item">
        <label>Contact</label>
        <p>+255 503 608 11<br>info@chugazstationery.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      This is a computer-generated receipt. No signature is required.<br>
      &copy; ${new Date().getFullYear()} CHUGAZ ICT Services Office Supplies. All rights reserved.
    </div>
  </div>
</div>
</body>
</html>`
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `CHUGAZ-Receipt-${user.regNo}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Downloads</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { icon: Download, label: "Registration Receipt", desc: "Download your registration receipt", color: "text-green-600", bg: "bg-green-100", onClick: downloadReceipt },
          { icon: Award, label: "Certificate", desc: "Download your course certificate", color: "text-[#F4B400]", bg: "bg-yellow-100", disabled: studentData.status !== "approved" },
          { icon: FileText, label: "Course Materials", desc: "Download course materials", color: "text-purple-600", bg: "bg-purple-100" },
          { icon: User, label: "Student ID", desc: "Download your student ID card", color: "text-blue-600", bg: "bg-blue-100" },
        ].map((item, i) => (
          <div key={item.label} onClick={item.onClick} className={cn(item.onClick && "cursor-pointer")}>
            <GlassCard variant="elevated" className={cn("rounded-[20px] border-0 shadow-md", item.disabled && "opacity-50")}>
              <GlassCardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 ${item.bg} rounded-[20px] flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0B1F4D] dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </GlassCardContent>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  )
}
