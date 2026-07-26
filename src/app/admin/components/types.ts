export type StudentStatus = "pending" | "approved" | "rejected"

export interface Student {
  regNo: string; firstName: string; middleName: string; lastName: string;
  gender: string; dateOfBirth: string; nationality: string; occupation: string;
  educationLevel: string; phone: string; whatsapp: string; email: string;
  region: string; district: string; street: string; postalAddress: string;
  courses: string[]; trainingMode: string; preferredTime: string;
  paymentMethod: string; paymentRef: string; transactionId: string;
  paymentStatus: string; status: StudentStatus;
  createdAt: string;
}

export type AdminTab = "dashboard" | "students" | "courses" | "payments" | "messages" | "settings"

export interface SharedActions {
  updateStudentStatus: (email: string, status: StudentStatus) => Promise<void>
  confirmPayment: (email: string) => Promise<void>
  sendReminder: (email: string, reason: string) => Promise<void>
  sendCustomNotification: (email: string) => Promise<void>
  deleteStudent: (email: string) => Promise<void>
  showToast: (msg: string) => void
}
