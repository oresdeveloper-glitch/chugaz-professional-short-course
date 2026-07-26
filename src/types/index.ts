export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  fee: number;
  currency: string;
  image: string;
  modules: string[];
  requirements: string[];
  outcomes: string[];
  instructor: {
    name: string;
    title: string;
    image: string;
    bio: string;
  };
  featured: boolean;
  highlights?: string[];
}

export interface Student {
  id: string;
  registrationNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  occupation: string;
  educationLevel: string;
  photo: string;
  phone: string;
  whatsapp: string;
  email: string;
  region: string;
  district: string;
  street: string;
  postalAddress: string;
  courses: string[];
  trainingMode: string;
  preferredTime: string;
  paymentMethod: string;
  paymentReceipt: string;
  paymentStatus: 'pending' | 'approved' | 'rejected';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  image: string;
  content: string;
  rating: number;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category: string;
}

export interface DashboardStats {
  totalStudents: number;
  newRegistrations: number;
  approvedStudents: number;
  revenue: number;
  pendingPayments: number;
  studentGrowth: { month: string; count: number }[];
  coursePopularity: { course: string; students: number }[];
  income: { month: string; amount: number }[];
}
