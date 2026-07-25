"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User, Mail, BookOpen, CreditCard, CheckCircle2,
  ChevronLeft, ChevronRight, Globe,
  Camera, Download, Home, Check,
  Wallet, Building, Clock, Sun, Moon, Smartphone,
  Eye, EyeOff, Calendar
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { Checkbox } from "@/components/ui/checkbox"
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
      setFormData(prev => ({ ...prev, photo: file }))
      const reader = new FileReader()
      reader.onloadend = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "Required"
      if (!formData.lastName.trim()) newErrors.lastName = "Required"
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
    if (step === 6) {
      if (!formData.declaration) newErrors.declaration = "Please confirm"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6))
    }
  }

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!validateStep(6)) return
    setSubmitting(true)

    try {
      const courseTitles = selectedCourses.map(id => {
        const course = courses.find(c => c.id === id)
        return course?.title
      }).filter(Boolean) as string[]

      const json = await api.post("/auth/register", {
        website,
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        gender: formData.gender || undefined,
        date_of_birth: formData.dateOfBirth || undefined,
        nationality: formData.nationality || undefined,
        occupation: formData.occupation || undefined,
        education_level: formData.educationLevel || undefined,
        phone: formData.phone,
        whatsapp: formData.whatsapp || undefined,
        email: formData.email,
        region: formData.region || undefined,
        district: formData.district || undefined,
        street: formData.street || undefined,
        postal_address: formData.postalAddress || undefined,
        training_mode: formData.trainingMode || undefined,
        preferred_time: formData.preferredTime || undefined,
        courses: courseTitles,
        payment_method: formData.paymentMethod || undefined,
        transaction_id: formData.transactionId || undefined,
      })

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
        <h1>CHUGAZ <span>Stationery</span></h1>
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
        <p style="text-transform:capitalize">${formData.trainingMode || "—"}</p>
      </div>
      <div class="info-item">
        <label>Preferred Time</label>
        <p style="text-transform:capitalize">${formData.preferredTime || "—"}</p>
      </div>
      <div class="info-item">
        <label>Payment Method</label>
        <p style="text-transform:capitalize">${formData.paymentMethod || "—"}</p>
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
        <p>CHUGAZ Stationery<br>Mbeya, Tanzania</p>
      </div>
      <div class="footer-item">
        <label>Contact</label>
        <p>+255 503 608 11<br>info@chugazstationery.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      This is a computer-generated receipt. No signature is required.<br>
      &copy; ${new Date().getFullYear()} CHUGAZ Stationery. All rights reserved.
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
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F4D] to-[#1a3a7a] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-900 rounded-[20px] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-heading font-extrabold text-[#0B1F4D] dark:text-white mb-2">
            Congratulations!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Thank you for registering with CHUGAZ Stationery
          </p>
          <div className="bg-[#F4B400]/10 rounded-[20px] p-6 mb-6 space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Registration Number</p>
              <p className="text-2xl font-heading font-extrabold text-[#F4B400] tracking-wider">
                {registrationNumber}
              </p>
            </div>
            <div className="border-t border-[#F4B400]/20 pt-3">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Reference</p>
              <p className="text-lg font-heading font-extrabold text-[#0B1F4D] dark:text-white tracking-wider font-mono">
                {paymentRef}
              </p>
            </div>
          </div>
          {formData.paymentMethod === "mobile" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-[20px] p-4 mb-6 text-left">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">
                Use this reference when making payment
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Send your payment via <strong>Vodacom M-Pesa</strong> to <strong>50360811</strong> (Agustino Emmanuel Wilian)
                and use <strong>{paymentRef}</strong> as your payment reference.
              </p>
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            One of our instructors will contact you shortly at <strong>{formData.email}</strong>
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={downloadReceipt} className="bg-[#F4B400] hover:bg-[#e5a800] text-[#0B1F4D] font-button font-semibold rounded-[20px] px-8">
              <Download className="w-4 h-4 mr-2" /> Download Receipt
            </Button>
            <Link href="/">
              <Button variant="outline" className="rounded-[20px] px-8">
                <Home className="w-4 h-4 mr-2" /> Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-heading font-extrabold text-[#0B1F4D] dark:text-white mb-2">
            Online Registration
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Complete all 6 steps to register for your courses
          </p>
          <p className="text-sm text-[#F4B400] font-semibold mt-1">
            Application Deadline: 31 August 2026
          </p>
        </motion.div>

        {serverError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-3 rounded-[20px] mb-4 text-sm"
          >
            {serverError}
          </motion.div>
        )}

        <Card className="rounded-[20px] shadow-xl border-0">
          {/* Honeypot - invisible to users */}
          <div aria-hidden="true" className="absolute opacity-0 pointer-events-none" style={{ height: 0, overflow: "hidden" }}>
            <label>Website</label>
            <input tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
          </div>

          {/* Progress Bar */}
          <div className="bg-[#0B1F4D] dark:bg-gray-900 p-4 md:p-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${
                        currentStep > step.id
                          ? "bg-[#F4B400] text-[#0B1F4D]"
                          : currentStep === step.id
                          ? "bg-[#F4B400] text-[#0B1F4D] ring-4 ring-[#F4B400]/30"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      {currentStep > step.id ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : step.id}
                    </div>
                    <span className="text-[10px] md:text-xs mt-1 hidden md:block text-white/70 font-medium">
                      {step.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-1 w-6 md:w-16 mx-1 md:mx-2 rounded-full transition-all duration-300 ${
                      currentStep > step.id ? "bg-[#F4B400]" : "bg-white/10"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-[#F4B400] h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <CardContent className="p-4 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-heading font-extrabold text-[#0B1F4D] dark:text-white mb-6 flex items-center gap-3">
                      <User className="w-6 h-6 text-[#F4B400]" /> Personal Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>First Name *</Label>
                        <Input value={formData.firstName} onChange={e => updateForm("firstName", e.target.value)} className="rounded-[20px]" placeholder="Enter first name" />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label>Middle Name</Label>
                        <Input value={formData.middleName} onChange={e => updateForm("middleName", e.target.value)} className="rounded-[20px]" placeholder="Enter middle name" />
                      </div>
                      <div>
                        <Label>Last Name *</Label>
                        <Input value={formData.lastName} onChange={e => updateForm("lastName", e.target.value)} className="rounded-[20px]" placeholder="Enter last name" />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <select value={formData.gender} onChange={e => updateForm("gender", e.target.value)} className="w-full rounded-[20px] border border-input bg-background px-4 py-2 text-sm">
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <Label>Date of Birth</Label>
                        <Input type="date" value={formData.dateOfBirth} onChange={e => updateForm("dateOfBirth", e.target.value)} className="rounded-[20px]" />
                      </div>
                      <div>
                        <Label>Nationality</Label>
                        <Input value={formData.nationality} onChange={e => updateForm("nationality", e.target.value)} className="rounded-[20px]" placeholder="e.g., Tanzanian" />
                      </div>
                      <div>
                        <Label>Occupation</Label>
                        <Input value={formData.occupation} onChange={e => updateForm("occupation", e.target.value)} className="rounded-[20px]" placeholder="e.g., Student" />
                      </div>
                      <div>
                        <Label>Education Level</Label>
                        <select value={formData.educationLevel} onChange={e => updateForm("educationLevel", e.target.value)} className="w-full rounded-[20px] border border-input bg-background px-4 py-2 text-sm">
                          <option value="">Select education level</option>
                          <option value="secondary">Secondary Education</option>
                          <option value="certificate">Certificate</option>
                          <option value="diploma">Diploma</option>
                          <option value="bachelor">Bachelor&apos;s Degree</option>
                          <option value="master">Master&apos;s Degree</option>
                          <option value="phd">PhD</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <Label>Password *</Label>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} value={formData.password} onChange={e => updateForm("password", e.target.value)} className="rounded-[20px] pr-10" placeholder="Min 8 chars, upper + lower + number" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                      </div>
                      <div>
                        <Label>Confirm Password *</Label>
                        <div className="relative">
                          <Input type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={e => updateForm("confirmPassword", e.target.value)} className="rounded-[20px] pr-10" placeholder="Confirm password" />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label>Student Photo</Label>
                        <div className="flex items-center gap-4 mt-1">
                          <label className="cursor-pointer">
                            <div className="w-24 h-24 rounded-[20px] border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-[#F4B400] transition-colors">
                              {photoPreview ? (
                                <Image src={photoPreview} alt="Preview" width={96} height={96} className="rounded-[20px] object-cover w-full h-full" />
                              ) : (
                                <Camera className="w-8 h-8 text-gray-400" />
                              )}
                            </div>
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                          </label>
                          <p className="text-sm text-gray-500">Upload passport-size photo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Contact */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-heading font-extrabold text-[#0B1F4D] dark:text-white mb-6 flex items-center gap-3">
                      <Mail className="w-6 h-6 text-[#F4B400]" /> Contact Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Phone *</Label>
                        <Input value={formData.phone} onChange={e => updateForm("phone", e.target.value)} className="rounded-[20px]" placeholder="+255 XXX XXX XXX" />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <Label>WhatsApp</Label>
                        <Input value={formData.whatsapp} onChange={e => updateForm("whatsapp", e.target.value)} className="rounded-[20px]" placeholder="+255 XXX XXX XXX" />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input type="email" value={formData.email} onChange={e => updateForm("email", e.target.value)} className="rounded-[20px]" placeholder="your@email.com" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label>Region</Label>
                        <Input value={formData.region} onChange={e => updateForm("region", e.target.value)} className="rounded-[20px]" placeholder="e.g., Mbeya" />
                      </div>
                      <div>
                        <Label>District</Label>
                        <Input value={formData.district} onChange={e => updateForm("district", e.target.value)} className="rounded-[20px]" placeholder="Enter district" />
                      </div>
                      <div>
                        <Label>Street</Label>
                        <Input value={formData.street} onChange={e => updateForm("street", e.target.value)} className="rounded-[20px]" placeholder="Enter street" />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Postal Address</Label>
                        <Input value={formData.postalAddress} onChange={e => updateForm("postalAddress", e.target.value)} className="rounded-[20px]" placeholder="P.O. Box ..." />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Course Selection */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-heading font-extrabold text-[#0B1F4D] dark:text-white mb-2 flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-[#F4B400]" /> Course Selection
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Select one or more courses you want to enroll in.</p>
                    {errors.courses && <p className="text-red-500 text-sm mb-4">{errors.courses}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {courses.map(course => (
                        <label
                          key={course.id}
                          className={`flex items-center gap-3 p-4 rounded-[20px] border-2 cursor-pointer transition-all ${
                            selectedCourses.includes(course.id)
                              ? "border-[#F4B400] bg-[#F4B400]/5"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <Checkbox
                            checked={selectedCourses.includes(course.id)}
                            onCheckedChange={() => toggleCourse(course.id)}
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-[#0B1F4D] dark:text-white">{course.title}</p>
                            <p className="text-xs text-gray-500">{course.category}</p>
                          </div>
                          <p className="font-bold text-[#F4B400]">{course.fee.toLocaleString()} TZS</p>
                        </label>
                      ))}
                    </div>
                    {selectedCourses.length > 0 && (
                      <div className="mt-6 p-4 bg-[#0B1F4D] dark:bg-gray-800 rounded-[20px] text-white flex justify-between items-center">
                        <span>{selectedCourses.length} course(s) selected</span>
                        <span className="text-xl font-bold text-[#F4B400]">Total: {totalFee.toLocaleString()} TZS</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Training Mode */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-heading font-extrabold text-[#0B1F4D] dark:text-white mb-6 flex items-center gap-3">
                      <Clock className="w-6 h-6 text-[#F4B400]" /> Training Mode
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-lg mb-3 block">How would you like to attend?</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {["Physical", "Online"].map(mode => (
                            <button
                              key={mode}
                              onClick={() => updateForm("trainingMode", mode.toLowerCase())}
                              className={`p-4 md:p-6 rounded-[20px] border-2 text-center transition-all ${
                                formData.trainingMode === mode.toLowerCase()
                                  ? "border-[#F4B400] bg-[#F4B400]/5"
                                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                              }`}
                            >
                              {mode === "Physical" ? (
                                <Building className="w-8 h-8 mx-auto mb-2 text-[#0B1F4D] dark:text-white" />
                              ) : (
                                <Globe className="w-8 h-8 mx-auto mb-2 text-[#0B1F4D] dark:text-white" />
                              )}
                              <p className="font-semibold">{mode}</p>
                              <p className="text-sm text-gray-500">
                                {mode === "Physical" ? "Classes in Mbeya" : "From anywhere"}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-lg mb-3 block">Preferred Time</Label>
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
                              className={`p-3 md:p-4 rounded-[20px] border-2 text-center transition-all ${
                                formData.preferredTime === time.value
                                  ? "border-[#F4B400] bg-[#F4B400]/5"
                                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                              }`}
                            >
                              <time.icon className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1" />
                              <p className="font-semibold text-sm">{time.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Payment */}
                {currentStep === 5 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-heading font-extrabold text-[#0B1F4D] dark:text-white mb-6 flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-[#F4B400]" /> Payment
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-lg mb-3 block">Payment Method</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: "cash", label: "Cash", icon: Wallet },
                            { value: "bank", label: "Bank", icon: Building },
                            { value: "mobile", label: "Mobile Money", icon: Smartphone },
                          ].map(method => (
                            <button
                              key={method.value}
                              onClick={() => updateForm("paymentMethod", method.value)}
                              className={`p-3 md:p-4 rounded-[20px] border-2 text-center transition-all ${
                                formData.paymentMethod === method.value
                                  ? "border-[#F4B400] bg-[#F4B400]/5"
                                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                              }`}
                            >
                              <method.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" />
                              <p className="font-semibold text-xs md:text-sm">{method.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {formData.paymentMethod === "mobile" && (
                        <div>
                          <Label className="text-lg mb-3 block">M-Pesa Transaction ID</Label>
                          <Input
                            value={formData.transactionId}
                            onChange={e => updateForm("transactionId", e.target.value.replace(/\s/g, ""))}
                            className="rounded-[20px] font-mono"
                            placeholder="e.g. PBT78J4K9M"
                            maxLength={30}
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            Enter the confirmation code from your M-Pesa message
                          </p>
                          {errors.transactionId && <p className="text-red-500 text-sm mt-1">{errors.transactionId}</p>}
                        </div>
                      )}

                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-[20px] p-4 space-y-2">
                        <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                          Make your payment to the following account
                        </p>
                        <div className="bg-white dark:bg-blue-900/40 rounded-[20px] p-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Network</span>
                            <span className="text-sm font-semibold text-[#0B1F4D] dark:text-white">VODACOM (M-Pesa)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Payment Number</span>
                            <span className="text-lg font-bold text-[#F4B400] tracking-wider">50360811</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Account Name</span>
                            <span className="text-sm font-semibold text-[#0B1F4D] dark:text-white">AGUSTINO EMMANUEL WILIAM</span>
                          </div>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          After payment, enter the M-Pesa confirmation code above. You can also pay in cash at our office.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Declaration */}
                {currentStep === 6 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-heading font-extrabold text-[#0B1F4D] dark:text-white mb-6 flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#F4B400]" /> Declaration
                    </h2>
                    <div className="space-y-4 mb-6">
                      <h3 className="font-semibold text-lg">Summary</h3>
                      <div className="grid md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-[20px] p-6">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{formData.firstName} {formData.middleName} {formData.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{formData.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Training Mode</p>
                          <p className="font-medium capitalize">{formData.trainingMode}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Selected Courses</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedCourses.map(id => {
                              const c = courses.find(c => c.id === id)
                              return c ? <Badge key={id} className="bg-[#F4B400] text-[#0B1F4D]">{c.title}</Badge> : null
                            })}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Fee</p>
                          <p className="font-bold text-[#F4B400] text-lg">{totalFee.toLocaleString()} TZS</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-[20px] border border-gray-200 dark:border-gray-700">
                      <Checkbox
                        checked={formData.declaration}
                        onCheckedChange={(checked) => updateForm("declaration", checked)}
                      />
                      <Label className="text-sm cursor-pointer">
                        I confirm that all the information provided above is correct and complete to the best of my knowledge.
                      </Label>
                    </div>
                    {errors.declaration && <p className="text-red-500 text-sm mt-2">{errors.declaration}</p>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="rounded-[20px] px-6 w-full md:w-auto"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              {currentStep < 6 ? (
                <Button
                  onClick={nextStep}
                  className="bg-[#0B1F4D] hover:bg-[#1a3a7a] text-white rounded-[20px] px-8 font-button font-semibold w-full md:w-auto"
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-[#F4B400] hover:bg-[#e5a800] text-[#0B1F4D] rounded-[20px] px-10 font-button font-semibold text-lg w-full md:w-auto"
                >
                  {submitting ? "Submitting..." : "Register Now"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
