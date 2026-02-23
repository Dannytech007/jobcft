// User Types
export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
  status: 'pending' | 'active' | 'suspended';
  paymentStatus: 'pending' | 'paid' | 'confirmed';
  paymentMethod?: 'paypal' | 'alipay' | 'wechat';
  paymentProof?: string;
  createdAt: string;
  updatedAt: string;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote' | 'internship';
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hour' | 'day' | 'week' | 'month' | 'year';
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  category: string;
  tags: string[];
  status: 'active' | 'closed' | 'draft';
  featured: boolean;
  views: number;
  applications: number;
  postedBy: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

// Application Types
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  resume?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  createdAt: string;
  updatedAt: string;
}

// Payment Types
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  method: 'paypal' | 'alipay' | 'wechat';
  status: 'pending' | 'completed' | 'failed';
  qrCodeImage?: string;
  transactionId?: string;
  confirmedBy?: string;
  confirmedAt?: string;
  createdAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  jobCount: number;
  color: string;
}

// Company Types
export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
  location: string;
  industry: string;
  size: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
  openPositions: number;
}

// Stats Types
export interface Stats {
  totalJobs: number;
  totalCompanies: number;
  totalCandidates: number;
  totalPlaced: number;
}

// Auth Context Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Search Filters
export interface JobFilters {
  keyword?: string;
  location?: string;
  category?: string;
  type?: string;
  salaryMin?: number;
  salaryMax?: number;
}
