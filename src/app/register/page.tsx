"use client"

import { useState } from "react"
import {
  User, Mail, BookOpen, CreditCard, CheckCircle2,
  ChevronLeft, ChevronRight, Globe,
  Camera, Download, Home, Check,
  Wallet, Building, Clock, Sun, Moon, Smartphone,
  Eye, EyeOff, Calendar, Phone, MapPin, MapPinned,
  Hash, Lock, UserRound, Earth, Briefcase
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PremiumInput } from "@/components/ui/PremiumInput"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { GlassCard } from "@/components/ui/GlassCard"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { courses } from "@/data/courses"
import { api } from "@/lib/api"

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Contact", icon: Mail },
  { id: 3, title: "Courses", icon: BookOpen },
  { id: 4, title: "Mode", icon: Clock },
  { id: 5, title: "Payment", icon: CreditCard },
  { id: 6, title: "Confirm", icon: CheckCircle2 },
]

const initialFormData = {
  firstName: "", middleName: "", lastName: "", gender: "", dateOfBirth: "",
  nationality: "", occupation: "", educationLevel: "",
  password: "", confirmPassword: "",
  phone: "", whatsapp: "", email: "", region: "", district: "", street: "", postalAddress: "",
  trainingMode: "", preferredTime: "",
  paymentMethod: "", transactionId: "",
  declaration: false,
  photo: null as File | null,
}

const stepDescriptions: Record<number, string> = {
  1: "Tell us who you are and create a secure account password.",
  2: "Share your contact details so we can reach you easily.",
  3: "Choose the short course(s) that match your goals.",
  4: "Pick your preferred learning mode and schedule.",
  5: "Select a payment method and confirm your transaction details.",
  6: "Review your information carefully before submitting your form.",
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [paymentRef, setPaymentRef] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState("")
  const [website, setWebsite] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }))
    if (serverError) setServerError("")
  }

  const toggleCourse = (id: string) => {
    setSelectedCourses(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const img = document.createElement("img")
        img.onload = () => {
          if (img.width !== 150 || img.height !== 150) {
            setErrors(prev => ({ ...prev, photo: "Photo must be exactly 150x150 pixels" }))
            return
          }
          setErrors(prev => ({ ...prev, photo: "" }))
          setFormData(prev => ({ ...prev, photo: file }))
          setPhotoPreview(reader.result as string)
        }
        img.onerror = () => {
          setErrors(prev => ({ ...prev, photo: "Invalid image file" }))
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "Required"
      if (!formData.lastName.trim()) newErrors.lastName = "Required"
      if (!formData.photo) newErrors.photo = "Passport photo (150x150px) is required"
      if (!formData.password.trim()) newErrors.password = "Required"
      else if (formData.password.length < 8 || !/[a-z]/.test(formData.password) || !/[A-Z]/.test(formData.password) || !/\d/.test(formData.password))
        newErrors.password = "Min 8 chars, uppercase + lowercase + number"
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    }
    if (step === 2) {
      if (!formData.phone.trim()) newErrors.phone = "Required"
      if (!formData.email.trim()) newErrors.email = "Required"
    }
    if (step === 3) {
      if (selectedCourses.length === 0) newErrors.courses = "Select at least one course"
    }
    if (step === 4) {
      if (!formData.trainingMode) newErrors.trainingMode = "Select a learning mode"
      if (!formData.preferredTime) newErrors.preferredTime = "Select a preferred time"
    }
    if (step === 5) {
      if (!formData.paymentMethod) newErrors.paymentMethod = "Select a payment method"
      if (formData.paymentMethod === "mobile" && !formData.transactionId.trim()) newErrors.transactionId = "Enter the transaction ID"
    }
    if (step === 6) {
      if (!formData.declaration) newErrors.declaration = "Please confirm"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

// Navigation is purely button-driven — no auto-advance

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6))
    }
  }

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    if (!validateStep(6)) return
    setSubmitting(true)

    try {
      const courseTitles = selectedCourses.map(id => {
        const course = courses.find(c => c.id === id)
        return course?.title
      }).filter(Boolean) as string[]

      const formDataToSend = new FormData()
      formDataToSend.append("website", website)
      formDataToSend.append("first_name", formData.firstName)
      formDataToSend.append("middle_name", formData.middleName || "")
      formDataToSend.append("last_name", formData.lastName)
      formDataToSend.append("password", formData.password)
      formDataToSend.append("password_confirmation", formData.confirmPassword)
      if (formData.gender) formDataToSend.append("gender", formData.gender)
      if (formData.dateOfBirth) formDataToSend.append("date_of_birth", formData.dateOfBirth)
      if (formData.nationality) formDataToSend.append("nationality", formData.nationality)
      if (formData.occupation) formDataToSend.append("occupation", formData.occupation)
      if (formData.educationLevel) formDataToSend.append("education_level", formData.educationLevel)
      formDataToSend.append("phone", formData.phone)
      if (formData.whatsapp) formDataToSend.append("whatsapp", formData.whatsapp)
      formDataToSend.append("email", formData.email)
      if (formData.region) formDataToSend.append("region", formData.region)
      if (formData.district) formDataToSend.append("district", formData.district)
      if (formData.street) formDataToSend.append("street", formData.street)
      if (formData.postalAddress) formDataToSend.append("postal_address", formData.postalAddress)
      if (formData.trainingMode) formDataToSend.append("training_mode", formData.trainingMode)
      if (formData.preferredTime) formDataToSend.append("preferred_time", formData.preferredTime)
      courseTitles.forEach((title, i) => formDataToSend.append(`courses[${i}]`, title))
      if (formData.paymentMethod) formDataToSend.append("payment_method", formData.paymentMethod)
      if (formData.transactionId) formDataToSend.append("transaction_id", formData.transactionId)
      if (formData.photo) formDataToSend.append("photo", formData.photo)

      const json = await api.postForm("/auth/register", formDataToSend)

      setRegistrationNumber(json.data.student.registration_number)
      setPaymentRef(json.data.payment_ref)
      setSubmitted(true)
    } catch (e: any) {
      const msg = e.errors ? Object.values(e.errors).flat().join(", ") : e.message || "Registration failed"
      setServerError(msg)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    setSubmitting(false)
  }

  const totalFee = selectedCourses.reduce((sum, id) => {
    const course = courses.find(c => c.id === id)
    return sum + (course?.fee || 0)
  }, 0)

  const downloadReceipt = () => {
    const courseRows = selectedCourses.map((id, i) => {
      const c = courses.find(c => c.id === id)
      return c ? `<tr style="background:${i % 2 === 0 ? "#fff" : "#f8f9fa"}"><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;text-align:center">${i + 1}</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0B1F4D">${c.title}</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">${c.category}</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;color:#0B1F4D">${c.fee.toLocaleString()} TZS</td></tr>` : ""
    }).join("")
    const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    const _txHtml = formData.transactionId ? `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Transaction ID</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0B1F4D;font-size:13px">${formData.transactionId}</td></tr>` : ""
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>CHUGAZ Registration Receipt - ${registrationNumber}</title>
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
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
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
        <div class="value">${registrationNumber}</div>
      </div>
      <div style="text-align:center">
        <div class="label">Payment Ref</div>
        <div class="value" style="font-size:15px;letter-spacing:0.5px">${paymentRef}</div>
      </div>
      <div style="text-align:right">
        <div class="label">Date</div>
        <div class="value" style="font-size:15px">${dateStr}</div>
      </div>
    </div>
  </div>
  <div class="body">
    <div class="section-title">Student Information</div>
    <div class="info-grid">
      <div class="info-item">
        <label>Full Name</label>
        <p>${formData.firstName} ${formData.middleName ? formData.middleName + " " : ""}${formData.lastName}</p>
      </div>
      <div class="info-item">
        <label>Email</label>
        <p>${formData.email}</p>
      </div>
      <div class="info-item">
        <label>Phone</label>
        <p>${formData.phone}${formData.whatsapp ? " / " + formData.whatsapp : ""}</p>
      </div>
      <div class="info-item">
        <label>Training Mode</label>
        <p style="text-transform:capitalize">${formData.trainingMode || "â€”"}</p>
      </div>
      <div class="info-item">
        <label>Preferred Time</label>
        <p style="text-transform:capitalize">${formData.preferredTime || "â€”"}</p>
      </div>
      <div class="info-item">
        <label>Payment Method</label>
        <p style="text-transform:capitalize">${formData.paymentMethod || "â€”"}</p>
      </div>
      <div class="info-item">
        <label>Payment Reference</label>
        <p style="font-family:monospace;letter-spacing:0.5px">${paymentRef}</p>
      </div>
      ${formData.transactionId ? `<div class="info-item">
        <label>Transaction ID</label>
        <p style="font-family:monospace">${formData.transactionId}</p>
      </div>` : ""}
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
    a.download = `CHUGAZ-Receipt-${registrationNumber}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (submitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#0B1F4D]">
        <div className="absolute top-[-10%] left-[-6%] h-96 w-96 rounded-full bg-[#F4B400]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-12%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#1a3a7a]/50 blur-3xl pointer-events-none" />
        <div className="w-full max-w-lg z-10">
          <GlassCard variant="elevated" padding="xl" borderRadius="2xl" className="text-center border border-white/10 bg-gradient-to-br from-[#08153b]/95 via-[#0b1f4d]/95 to-[#08153b]/95 shadow-[0_30px_100px_-35px_rgba(0,0,0,0.8)]">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
              Congratulations!
            </h1>
            <p className="text-gray-400 mb-6">
              Thank you for registering with CHUGAZ ICT Services Office Supplies
            </p>
            <div className="bg-[#F4B400]/10 rounded-[20px] p-6 mb-6 space-y-3">
              <div>
                <p className="text-sm text-gray-400 mb-1">Registration Number</p>
                <p className="text-2xl font-heading font-extrabold text-[#F4B400] tracking-wider">
                  {registrationNumber}
                </p>
              </div>
              <div className="border-t border-[#F4B400]/20 pt-3">
                <p className="text-sm text-gray-400 mb-1">Payment Reference</p>
                <p className="text-lg font-heading font-extrabold text-white tracking-wider font-mono">
                  {paymentRef}
                </p>
              </div>
            </div>
            {formData.paymentMethod === "mobile" && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-[20px] p-4 mb-6 text-left">
                <p className="text-sm text-blue-300 font-medium mb-2">
                  Use this reference when making payment
                </p>
                <p className="text-xs text-blue-400">
                  Send your payment via <strong>Vodacom M-Pesa</strong> to <strong>50360811</strong> (Agustino Emmanuel Wilian)
                  and use <strong>{paymentRef}</strong> as your payment reference.
                </p>
              </div>
            )}
            <p className="text-gray-400 mb-8">
              One of our instructors will contact you shortly at <strong className="text-white">{formData.email}</strong>
            </p>
            <div className="flex gap-4 justify-center">
              <PremiumButton onClick={downloadReceipt} variant="gradient-gold" size="lg" iconLeft={<Download className="w-4 h-4" />}>
                Download Receipt
              </PremiumButton>
              <Link href="/">
                <PremiumButton variant="glass" size="lg" iconLeft={<Home className="w-4 h-4" />}>
                  Back to Home
                </PremiumButton>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    )
  }

  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100

  const inputClass = "w-full bg-[#071538] backdrop-blur-sm border border-white/10 rounded-[16px] px-5 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#F4B400] focus:ring-4 focus:ring-[#F4B400]/15 transition-all"

  return (
<div className="relative min-h-screen py-8 md:py-12 px-4 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(244,180,0,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.10),transparent_40%),linear-gradient(135deg,#0B1F4D_0%,#1a3a7a_50%,#0B1F4D_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,180,0,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.12),transparent_40%),radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.7fr] gap-6 mb-6">
          <GlassCard variant="elevated" padding="xl" borderRadius="2xl" className="border border-white/10 bg-gradient-to-br from-[#08153b]/95 via-[#0b1f4d]/95 to-[#08153b]/95 shadow-[0_30px_100px_-35px_rgba(0,0,0,0.8)]">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-3 py-1 text-sm font-semibold text-[#F4B400]">
                <CheckCircle2 className="w-4 h-4" /> Fast online registration
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300">
                <Calendar className="w-4 h-4 text-gray-400" /> Deadline: 31 August 2026
              </span>
            </div>
<h1 className="text-3xl md:text-4xl font-heading font-extrabold text-[#F4B400] mb-3">
              Join CHUGAZ ICT Services Office Supplies
            </h1>
            <p className="text-base md:text-lg text-gray-200 leading-7 max-w-2xl">
              Register in just a few minutes, select your preferred courses, and complete payment securely with a smooth guided process.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                "6-step guided form",
                "Flexible learning options",
                "Digital registration receipt",
              ].map(item => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300">
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard variant="elevated" padding="xl" borderRadius="2xl" className="border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
<p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-200">Registration summary</p>
                <h2 className="text-xl font-heading font-bold text-[#F4B400]">Your progress</h2>
              </div>
              <div className="rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-3 py-1 text-sm font-semibold text-[#F4B400]">
                Step {currentStep}/6
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#0B1F4D]/60 px-3 py-3">
<span className="text-gray-200">Current step</span>
                <span className="font-semibold text-white">{steps[currentStep - 1].title}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#0B1F4D]/60 px-3 py-3">
                <span className="text-gray-200">Selected courses</span>
                <span className="font-semibold text-white">{selectedCourses.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#0B1F4D]/60 px-3 py-3">
                <span className="text-gray-400">Estimated fee</span>
                <span className="font-semibold text-[#F4B400]">{totalFee.toLocaleString()} TZS</span>
              </div>
              <div className="rounded-[16px] border border-white/10 bg-white/5 p-3 text-sm text-gray-300">
                {stepDescriptions[currentStep]}
              </div>
              {selectedCourses.length > 0 && (
                <div className="rounded-[16px] border border-white/10 bg-white/5 p-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">Selected courses</p>
                  <div className="space-y-2">
                    {selectedCourses.map(id => {
                      const course = courses.find(c => c.id === id)
                      return course ? (
                        <div key={id} className="flex items-center justify-between text-sm text-gray-200">
                          <span>{course.title}</span>
                          <span className="text-[#F4B400]">{course.fee.toLocaleString()} TZS</span>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        <div
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-2">
            Online Registration
          </h2>
          <p className="text-gray-200">
            Complete all 6 steps to register for your courses
          </p>
        </div>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-3 rounded-[20px] mb-4 text-sm">
            {serverError}
          </div>
        )}

        <GlassCard variant="elevated" padding="none" borderRadius="2xl" className="overflow-hidden border border-white/10 bg-[#0B1F4D] shadow-[0_30px_100px_-35px_rgba(0,0,0,0.8)]">
          <div aria-hidden="true" className="absolute opacity-0 pointer-events-none" style={{ height: 0, overflow: "hidden" }}>
            <label>Website</label>
            <input tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
          </div>

          <div className="bg-[linear-gradient(135deg,rgba(6,15,39,0.98),rgba(11,31,77,0.92))] backdrop-blur-2xl p-4 md:p-8 rounded-t-[32px] border-b border-white/10">
            <div className="flex items-center justify-between mb-5 gap-2">
              {steps.map((step, i) => {
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                return (
                  <div key={step.id} className="flex items-center flex-1 min-w-0">
                    <div className="flex flex-col items-center w-full">
                      <div className={`relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full border-2 transition-all duration-300 ${isCompleted ? "border-[#F4B400] bg-[#F4B400] text-[#0B1F4D] shadow-[0_0_0_6px_rgba(244,180,0,0.16)]" : isActive ? "border-[#F4B400] bg-[#F4B400]/15 text-[#F4B400] shadow-[0_0_0_6px_rgba(244,180,0,0.12)]" : "border-white/15 bg-white/5 text-white/60"}`}>
                        {isCompleted ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <step.icon className="w-4 h-4 md:w-5 md:h-5" />}
                      </div>
                      <span className={`mt-2 text-[10px] md:text-xs font-semibold text-center hidden md:block ${isActive || isCompleted ? "text-white" : "text-white/60"}`}>
                        {step.title}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`hidden sm:block h-[2px] flex-1 mx-2 rounded-full transition-all duration-300 ${currentStep > step.id ? "bg-[#F4B400]" : "bg-white/10"}`} />
                    )}
                  </div>
                )
              })}
            </div>
            <div className="relative h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-[linear-gradient(90deg,#F4B400_0%,#ffd96a_100%)] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="p-4 md:p-8">
              <div key={currentStep}>
                {currentStep === 1 && (
                  <div>
                    <div className="mb-6 rounded-[20px] border border-[#F4B400]/20 bg-[#F4B400]/10 px-4 py-4 md:px-5">
                      <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white flex items-center gap-3">
                        <User className="w-6 h-6 text-[#F4B400]" /> Personal Information
                      </h2>
                      <p className="mt-2 text-sm text-gray-300">Create your profile and set up your secure account details.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <PremiumInput
                        label="First Name"
                        iconLeft={<UserRound className="w-5 h-5" />}
                        value={formData.firstName}
                        onChange={e => updateForm("firstName", e.target.value)}
                        placeholder="e.g. Amina"
                        required
                        error={errors.firstName}
                      />
                      <PremiumInput
                        label="Middle Name"
                        iconLeft={<UserRound className="w-5 h-5" />}
                        value={formData.middleName}
                        onChange={e => updateForm("middleName", e.target.value)}
                        placeholder="Optional"
                      />
                      <PremiumInput
                        label="Last Name"
                        iconLeft={<UserRound className="w-5 h-5" />}
                        value={formData.lastName}
                        onChange={e => updateForm("lastName", e.target.value)}
                        placeholder="e.g. Hassan"
                        required
                        error={errors.lastName}
                      />
<div>
                        <label className="block text-sm text-gray-300 mb-2 font-medium">Gender</label>
                        <select value={formData.gender} onChange={e => updateForm("gender", e.target.value)} className={inputClass}>
                          <option value="" className="bg-[#0B1F4D]">Select gender</option>
                          <option value="male" className="bg-[#0B1F4D]">Male</option>
                          <option value="female" className="bg-[#0B1F4D]">Female</option>
                          <option value="other" className="bg-[#0B1F4D]">Other</option>
                        </select>
                      </div>
                      <PremiumInput
                        label="Date of Birth"
                        type="date"
                        iconLeft={<Calendar className="w-5 h-5" />}
                        value={formData.dateOfBirth}
                        onChange={e => updateForm("dateOfBirth", e.target.value)}
                      />
                      <PremiumInput
                        label="Nationality"
                        iconLeft={<Earth className="w-5 h-5" />}
                        value={formData.nationality}
                        onChange={e => updateForm("nationality", e.target.value)}
                        placeholder="e.g., Tanzanian"
                      />
                      <PremiumInput
                        label="Occupation"
                        iconLeft={<Briefcase className="w-5 h-5" />}
                        value={formData.occupation}
                        onChange={e => updateForm("occupation", e.target.value)}
                        placeholder="e.g., Student"
                      />
<div>
                        <label className="block text-sm text-gray-300 mb-2 font-medium">Education Level</label>
                        <select value={formData.educationLevel} onChange={e => updateForm("educationLevel", e.target.value)} className={inputClass}>
                          <option value="" className="bg-[#0B1F4D]">Select education level</option>
                          <option value="secondary" className="bg-[#0B1F4D]">Secondary Education</option>
                          <option value="certificate" className="bg-[#0B1F4D]">Certificate</option>
                          <option value="diploma" className="bg-[#0B1F4D]">Diploma</option>
                          <option value="bachelor" className="bg-[#0B1F4D]">Bachelor&apos;s Degree</option>
                          <option value="master" className="bg-[#0B1F4D]">Master&apos;s Degree</option>
                          <option value="phd" className="bg-[#0B1F4D]">PhD</option>
                          <option value="other" className="bg-[#0B1F4D]">Other</option>
                        </select>
                      </div>
                      <div className="relative">
                        <PremiumInput
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          iconLeft={<Lock className="w-5 h-5" />}
                          value={formData.password}
                          onChange={e => updateForm("password", e.target.value)}
                          placeholder="Use 8+ chars with upper, lower, and a number"
                          required
                          error={errors.password}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors z-20">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="relative">
                        <PremiumInput
                          label="Confirm Password"
                          type={showConfirmPassword ? "text" : "password"}
                          iconLeft={<Lock className="w-5 h-5" />}
                          value={formData.confirmPassword}
                          onChange={e => updateForm("confirmPassword", e.target.value)}
                          placeholder="Re-enter your password"
                          required
                          error={errors.confirmPassword}
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors z-20">
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
<div className="md:col-span-2">
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Student Photo <span className="text-red-400">*</span></label>
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer">
                        <div className="w-24 h-24 rounded-[20px] border-2 border-dashed border-gray-500/50 flex items-center justify-center hover:border-[#F4B400] transition-colors bg-white/5">
                          {photoPreview ? (
                            <Image src={photoPreview} alt="Preview" width={96} height={96} className="rounded-[20px] object-cover w-full h-full" />
                          ) : (
                            <Camera className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                      <div className="flex flex-col justify-center">
                        <p className="text-sm text-gray-500">Upload passport-size photo</p>
                        <p className="text-xs text-gray-500">Exactly 150x150 pixels required</p>
                      </div>
                    </div>
                    {errors.photo && <p className="mt-2 text-sm text-red-400">{errors.photo}</p>}
                  </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <div className="mb-6 rounded-[20px] border border-[#F4B400]/20 bg-[#F4B400]/10 px-4 py-4 md:px-5">
                      <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white flex items-center gap-3">
                        <Mail className="w-6 h-6 text-[#F4B400]" /> Contact Information
                      </h2>
                      <p className="mt-2 text-sm text-gray-300">We’ll use these details to keep you updated and support your enrollment.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <PremiumInput
                        label="Phone"
                        iconLeft={<Phone className="w-5 h-5" />}
                        value={formData.phone}
                        onChange={e => updateForm("phone", e.target.value)}
                        placeholder="+255 XXX XXX XXX"
                        required
                        error={errors.phone}
                      />
                      <PremiumInput
                        label="WhatsApp"
                        iconLeft={<Smartphone className="w-5 h-5" />}
                        value={formData.whatsapp}
                        onChange={e => updateForm("whatsapp", e.target.value)}
                        placeholder="+255 XXX XXX XXX"
                      />
                      <PremiumInput
                        label="Email"
                        type="email"
                        iconLeft={<Mail className="w-5 h-5" />}
                        value={formData.email}
                        onChange={e => updateForm("email", e.target.value)}
                        placeholder="e.g. student@email.com"
                        required
                        error={errors.email}
                      />
                      <PremiumInput
                        label="Region"
                        iconLeft={<MapPin className="w-5 h-5" />}
                        value={formData.region}
                        onChange={e => updateForm("region", e.target.value)}
                        placeholder="e.g., Mbeya"
                      />
                      <PremiumInput
                        label="District"
                        iconLeft={<MapPinned className="w-5 h-5" />}
                        value={formData.district}
                        onChange={e => updateForm("district", e.target.value)}
                        placeholder="e.g. Mbeya Urban"
                      />
                      <PremiumInput
                        label="Street"
                        iconLeft={<MapPinned className="w-5 h-5" />}
                        value={formData.street}
                        onChange={e => updateForm("street", e.target.value)}
                        placeholder="e.g. Nyerere Road"
                      />
                      <div className="md:col-span-2">
                        <PremiumInput
                          label="Postal Address"
                          iconLeft={<Hash className="w-5 h-5" />}
                          value={formData.postalAddress}
                          onChange={e => updateForm("postalAddress", e.target.value)}
                          placeholder="e.g. P.O. Box 123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <div className="mb-4 rounded-[20px] border border-[#F4B400]/20 bg-[#F4B400]/10 px-4 py-4 md:px-5">
                      <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-[#F4B400]" /> Course Selection
                      </h2>
                      <p className="mt-2 text-sm text-gray-300">Choose one or more courses that align with your learning goals.</p>
                    </div>
                    {errors.courses && <p className="text-red-400 text-sm mb-4">{errors.courses}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {courses.map(course => (
                        <label
                          key={course.id}
                          className={`flex items-center gap-3 p-4 rounded-[20px] border cursor-pointer transition-all ${
                            selectedCourses.includes(course.id)
                              ? "border-[#F4B400] bg-[#F4B400]/10 shadow-[0_0_0_1px_rgba(244,180,0,0.25)]"
                              : "border-white/10 hover:border-white/20 bg-white/5"
                          }`}
                        >
                          <Checkbox
                            checked={selectedCourses.includes(course.id)}
                            onCheckedChange={() => toggleCourse(course.id)}
                            className="border-gray-500 data-[state=checked]:bg-[#F4B400] data-[state=checked]:border-[#F4B400]"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-white">{course.title}</p>
                            <p className="text-xs text-gray-400">{course.category}</p>
                          </div>
                          <p className="font-bold text-[#F4B400]">{course.fee.toLocaleString()} TZS</p>
                        </label>
                      ))}
                    </div>
                    {selectedCourses.length > 0 && (
                      <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[20px] flex justify-between items-center">
                        <span className="text-gray-300">{selectedCourses.length} course(s) selected</span>
                        <span className="text-xl font-bold text-[#F4B400]">Total: {totalFee.toLocaleString()} TZS</span>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <div className="mb-6 rounded-[20px] border border-[#F4B400]/20 bg-[#F4B400]/10 px-4 py-4 md:px-5">
                      <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white flex items-center gap-3">
                        <Clock className="w-6 h-6 text-[#F4B400]" /> Training Mode
                      </h2>
                      <p className="mt-2 text-sm text-gray-300">Select the delivery format and schedule that works best for you.</p>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-300 text-lg mb-3 font-medium">How would you like to attend?</label>
                        {errors.trainingMode && <p className="text-red-400 text-sm mb-3">{errors.trainingMode}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {["Physical", "Online"].map(mode => (
                            <button
                              key={mode}
                              onClick={() => updateForm("trainingMode", mode.toLowerCase())}
                              className={`p-4 md:p-6 rounded-[20px] border text-center transition-all ${
                                formData.trainingMode === mode.toLowerCase()
                                  ? "border-[#F4B400] bg-[#F4B400]/10 shadow-[0_0_0_1px_rgba(244,180,0,0.25)]"
                                  : "border-white/10 hover:border-white/20 bg-white/5"
                              }`}
                            >
                              {mode === "Physical" ? (
                                <Building className="w-8 h-8 mx-auto mb-2 text-white" />
                              ) : (
                                <Globe className="w-8 h-8 mx-auto mb-2 text-white" />
                              )}
                              <p className="font-semibold text-white">{mode}</p>
                              <p className="text-sm text-gray-400">
                                {mode === "Physical" ? "Classes in Mbeya" : "From anywhere"}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-lg mb-3 font-medium">Preferred Time</label>
                        {errors.preferredTime && <p className="text-red-400 text-sm mb-3">{errors.preferredTime}</p>}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { value: "morning", label: "Morning", icon: Sun },
                            { value: "afternoon", label: "Afternoon", icon: Sun },
                            { value: "evening", label: "Evening", icon: Moon },
                            { value: "weekend", label: "Weekend", icon: Calendar },
                          ].map(time => (
                            <button
                              key={time.value}
                              onClick={() => updateForm("preferredTime", time.value)}
                              className={`p-3 md:p-4 rounded-[20px] border text-center transition-all ${
                                formData.preferredTime === time.value
                                  ? "border-[#F4B400] bg-[#F4B400]/10 shadow-[0_0_0_1px_rgba(244,180,0,0.25)]"
                                  : "border-white/10 hover:border-white/20 bg-white/5"
                              }`}
                            >
                              <time.icon className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
                              <p className="font-semibold text-sm text-white">{time.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div>
                    <div className="mb-6 rounded-[20px] border border-[#F4B400]/20 bg-[#F4B400]/10 px-4 py-4 md:px-5">
                      <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-[#F4B400]" /> Payment
                      </h2>
                      <p className="mt-2 text-sm text-gray-300">Choose a payment option and confirm your transaction details.</p>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-300 text-lg mb-3 font-medium">Payment Method</label>
                        {errors.paymentMethod && <p className="text-red-400 text-sm mb-3">{errors.paymentMethod}</p>}
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: "cash", label: "Cash", icon: Wallet },
                            { value: "bank", label: "Bank", icon: Building },
                            { value: "mobile", label: "Mobile Money", icon: Smartphone },
                          ].map(method => (
                            <button
                              key={method.value}
                              onClick={() => updateForm("paymentMethod", method.value)}
                              className={`p-3 md:p-4 rounded-[20px] border text-center transition-all ${
                                formData.paymentMethod === method.value
                                  ? "border-[#F4B400] bg-[#F4B400]/10 shadow-[0_0_0_1px_rgba(244,180,0,0.25)]"
                                  : "border-white/10 hover:border-white/20 bg-white/5"
                              }`}
                            >
                              <method.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-white" />
                              <p className="font-semibold text-xs md:text-sm text-white">{method.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {formData.paymentMethod === "mobile" && (
                        <PremiumInput
                          label="M-Pesa Transaction ID"
                          iconLeft={<Hash className="w-5 h-5" />}
                          value={formData.transactionId}
                          onChange={e => updateForm("transactionId", e.target.value.replace(/\s/g, ""))}
                          placeholder="e.g. TRX123456789"
                          maxLength={30}
                          hint="Enter the confirmation code from your M-Pesa message"
                          error={errors.transactionId}
                        />
                      )}

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-[20px] p-4 space-y-2">
                        <p className="text-sm text-blue-300 font-medium">
                          Make your payment to the following account
                        </p>
                        <div className="bg-white/5 backdrop-blur-sm rounded-[20px] p-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Network</span>
                            <span className="text-sm font-semibold text-white">VODACOM (M-Pesa)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Payment Number</span>
                            <span className="text-lg font-bold text-[#F4B400] tracking-wider">50360811</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Account Name</span>
                            <span className="text-sm font-semibold text-white">AGUSTINO EMMANUEL WILIAM</span>
                          </div>
                        </div>
                        <p className="text-xs text-blue-400">
                          After payment, enter the M-Pesa confirmation code above. You can also pay in cash at our office.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div>
                    <div className="mb-6 rounded-[20px] border border-[#F4B400]/20 bg-[#F4B400]/10 px-4 py-4 md:px-5">
                      <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#F4B400]" /> Declaration
                      </h2>
                      <p className="mt-2 text-sm text-gray-300">Review everything carefully before submitting your registration.</p>
                    </div>
                    <div className="space-y-4 mb-6">
                      <h3 className="font-semibold text-lg text-white">Summary</h3>
                      <div className="grid md:grid-cols-2 gap-4 bg-white/5 rounded-[20px] p-6">
                        <div>
                          <p className="text-sm text-gray-400">Name</p>
                          <p className="font-medium text-white">{formData.firstName} {formData.middleName} {formData.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p className="font-medium text-white">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <p className="font-medium text-white">{formData.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Training Mode</p>
                          <p className="font-medium capitalize text-white">{formData.trainingMode}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Selected Courses</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedCourses.map(id => {
                              const c = courses.find(c => c.id === id)
                              return c ? <Badge key={id} className="bg-[#F4B400] text-[#0B1F4D]">{c.title}</Badge> : null
                            })}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Total Fee</p>
                          <p className="font-bold text-[#F4B400] text-lg">{totalFee.toLocaleString()} TZS</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-[20px] border border-white/10">
                      <Checkbox
                        checked={formData.declaration}
                        onCheckedChange={(checked) => updateForm("declaration", checked)}
                        className="border-gray-500 data-[state=checked]:bg-[#F4B400] data-[state=checked]:border-[#F4B400]"
                      />
                      <Label className="text-sm cursor-pointer text-gray-300">
                        I confirm that all the information provided above is correct and complete to the best of my knowledge.
                      </Label>
                    </div>
                    {errors.declaration && <p className="text-red-400 text-sm mt-2">{errors.declaration}</p>}
                  </div>
                )}
              </div>

            <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 mt-8 pt-6 border-t border-white/10">
              <PremiumButton
                variant="glass"
                onClick={prevStep}
                disabled={currentStep === 1}
                size="md"
                iconLeft={<ChevronLeft className="w-4 h-4" />}
              >
                Previous
              </PremiumButton>
              {currentStep < 6 ? (
                <PremiumButton
                  onClick={nextStep}
                  variant="gradient-primary"
                  size="md"
                  iconRight={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </PremiumButton>
              ) : (
                <PremiumButton
                  onClick={handleSubmit}
                  variant="gradient-gold"
                  size="lg"
                  loading={submitting}
                >
                  {submitting ? "Submitting..." : "Register Now"}
                </PremiumButton>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}