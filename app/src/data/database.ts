import type { User, Job, Application, Payment, Category, Company, Stats } from '@/types';

// Database Keys
const DB_KEYS = {
  USERS: 'cft_jobs_users',
  JOBS: 'cft_jobs_jobs',
  APPLICATIONS: 'cft_jobs_applications',
  PAYMENTS: 'cft_jobs_payments',
  CATEGORIES: 'cft_jobs_categories',
  COMPANIES: 'cft_jobs_companies',
  STATS: 'cft_jobs_stats',
  CURRENT_USER: 'cft_jobs_current_user',
};

// Initialize Database with Default Data
export const initializeDatabase = () => {
  if (!localStorage.getItem(DB_KEYS.USERS)) {
    // Create default admin user
    const adminUser: User = {
      id: 'admin-001',
      email: 'admin@cftjobs.com',
      password: 'admin123',
      fullName: 'CFT Admin',
      role: 'admin',
      status: 'active',
      paymentStatus: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify([adminUser]));
  }

  if (!localStorage.getItem(DB_KEYS.JOBS)) {
    const defaultJobs: Job[] = [
      {
        id: 'job-001',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Solutions',
        companyLogo: 'https://ui-avatars.com/api/?name=TechCorp&background=4CAF50&color=fff',
        location: 'San Francisco, CA',
        type: 'full-time',
        salary: { min: 120000, max: 160000, currency: 'USD', period: 'year' },
        description: 'We are looking for an experienced Frontend Developer to join our growing team. You will be responsible for building scalable web applications using React and modern JavaScript.',
        requirements: ['5+ years React experience', 'TypeScript proficiency', 'CSS/Tailwind expertise'],
        responsibilities: ['Develop frontend features', 'Code reviews', 'Mentor junior developers'],
        benefits: ['Health insurance', 'Remote work', '401k matching'],
        category: 'Technology',
        tags: ['React', 'TypeScript', 'Frontend'],
        status: 'active',
        featured: true,
        views: 245,
        applications: 18,
        postedBy: 'admin-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'job-002',
        title: 'UX/UI Designer',
        company: 'Creative Studio',
        companyLogo: 'https://ui-avatars.com/api/?name=Creative&background=2196F3&color=fff',
        location: 'New York, NY',
        type: 'remote',
        salary: { min: 90000, max: 130000, currency: 'USD', period: 'year' },
        description: 'Join our design team to create beautiful and intuitive user experiences for our clients.',
        requirements: ['3+ years UX/UI experience', 'Figma expertise', 'Portfolio required'],
        responsibilities: ['Design user interfaces', 'Create prototypes', 'User research'],
        benefits: ['Flexible hours', 'Home office stipend', 'Unlimited PTO'],
        category: 'Design',
        tags: ['Figma', 'UI', 'UX'],
        status: 'active',
        featured: true,
        views: 189,
        applications: 24,
        postedBy: 'admin-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'job-003',
        title: 'Marketing Manager',
        company: 'GrowthLabs',
        companyLogo: 'https://ui-avatars.com/api/?name=Growth&background=FFC107&color=fff',
        location: 'Austin, TX',
        type: 'full-time',
        salary: { min: 85000, max: 110000, currency: 'USD', period: 'year' },
        description: 'Lead our marketing efforts and drive growth across all channels.',
        requirements: ['4+ years marketing experience', 'Digital marketing expertise', 'Analytics skills'],
        responsibilities: ['Develop marketing strategy', 'Manage campaigns', 'Analyze performance'],
        benefits: ['Stock options', 'Health benefits', 'Team events'],
        category: 'Marketing',
        tags: ['Marketing', 'Digital', 'Growth'],
        status: 'active',
        featured: false,
        views: 156,
        applications: 12,
        postedBy: 'admin-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'job-004',
        title: 'Full Stack Developer',
        company: 'StartupHub',
        companyLogo: 'https://ui-avatars.com/api/?name=Startup&background=FF9800&color=fff',
        location: 'Remote',
        type: 'remote',
        salary: { min: 100000, max: 140000, currency: 'USD', period: 'year' },
        description: 'Build innovative products from scratch in a fast-paced startup environment.',
        requirements: ['Node.js and React experience', 'Database design', 'AWS knowledge'],
        responsibilities: ['Full stack development', 'Architecture decisions', 'Deploy applications'],
        benefits: ['Equity', 'Remote-first', 'Learning budget'],
        category: 'Technology',
        tags: ['Node.js', 'React', 'Full Stack'],
        status: 'active',
        featured: true,
        views: 312,
        applications: 45,
        postedBy: 'admin-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'job-005',
        title: 'Data Scientist',
        company: 'DataDriven Inc',
        companyLogo: 'https://ui-avatars.com/api/?name=DataDriven&background=4CAF50&color=fff',
        location: 'Boston, MA',
        type: 'full-time',
        salary: { min: 130000, max: 170000, currency: 'USD', period: 'year' },
        description: 'Analyze complex datasets and build machine learning models.',
        requirements: ['Python expertise', 'ML/AI experience', 'Statistics background'],
        responsibilities: ['Build ML models', 'Data analysis', 'Present insights'],
        benefits: ['Conference budget', 'Research time', 'Top-tier benefits'],
        category: 'Technology',
        tags: ['Python', 'Machine Learning', 'Data'],
        status: 'active',
        featured: false,
        views: 198,
        applications: 22,
        postedBy: 'admin-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'job-006',
        title: 'Sales Representative',
        company: 'SalesPro',
        companyLogo: 'https://ui-avatars.com/api/?name=SalesPro&background=2196F3&color=fff',
        location: 'Chicago, IL',
        type: 'full-time',
        salary: { min: 60000, max: 90000, currency: 'USD', period: 'year' },
        description: 'Drive sales growth and build relationships with enterprise clients.',
        requirements: ['2+ years sales experience', 'B2B sales background', 'Communication skills'],
        responsibilities: ['Generate leads', 'Close deals', 'Maintain client relationships'],
        benefits: ['Commission structure', 'Car allowance', 'Travel perks'],
        category: 'Sales',
        tags: ['Sales', 'B2B', 'Enterprise'],
        status: 'active',
        featured: false,
        views: 134,
        applications: 19,
        postedBy: 'admin-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem(DB_KEYS.JOBS, JSON.stringify(defaultJobs));
  }

  if (!localStorage.getItem(DB_KEYS.CATEGORIES)) {
    const defaultCategories: Category[] = [
      { id: 'cat-001', name: 'Technology', icon: 'Code', jobCount: 1250, color: '#4CAF50' },
      { id: 'cat-002', name: 'Design', icon: 'Palette', jobCount: 680, color: '#2196F3' },
      { id: 'cat-003', name: 'Marketing', icon: 'TrendingUp', jobCount: 540, color: '#FFC107' },
      { id: 'cat-004', name: 'Sales', icon: 'DollarSign', jobCount: 420, color: '#FF9800' },
      { id: 'cat-005', name: 'Finance', icon: 'BarChart3', jobCount: 380, color: '#4CAF50' },
      { id: 'cat-006', name: 'Healthcare', icon: 'Heart', jobCount: 620, color: '#2196F3' },
      { id: 'cat-007', name: 'Education', icon: 'GraduationCap', jobCount: 290, color: '#FFC107' },
      { id: 'cat-008', name: 'Engineering', icon: 'Settings', jobCount: 510, color: '#FF9800' },
    ];
    localStorage.setItem(DB_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
  }

  if (!localStorage.getItem(DB_KEYS.COMPANIES)) {
    const defaultCompanies: Company[] = [
      {
        id: 'comp-001',
        name: 'TechCorp Solutions',
        logo: 'https://ui-avatars.com/api/?name=TechCorp&background=4CAF50&color=fff',
        description: 'Leading technology solutions provider',
        website: 'https://techcorp.com',
        location: 'San Francisco, CA',
        industry: 'Technology',
        size: '201-500',
        openPositions: 12,
      },
      {
        id: 'comp-002',
        name: 'Creative Studio',
        logo: 'https://ui-avatars.com/api/?name=Creative&background=2196F3&color=fff',
        description: 'Award-winning design agency',
        website: 'https://creativestudio.com',
        location: 'New York, NY',
        industry: 'Design',
        size: '11-50',
        openPositions: 5,
      },
      {
        id: 'comp-003',
        name: 'GrowthLabs',
        logo: 'https://ui-avatars.com/api/?name=Growth&background=FFC107&color=fff',
        description: 'Growth marketing experts',
        website: 'https://growthlabs.com',
        location: 'Austin, TX',
        industry: 'Marketing',
        size: '51-200',
        openPositions: 8,
      },
      {
        id: 'comp-004',
        name: 'StartupHub',
        logo: 'https://ui-avatars.com/api/?name=Startup&background=FF9800&color=fff',
        description: 'Innovation-driven startup incubator',
        website: 'https://startuphub.com',
        location: 'Remote',
        industry: 'Technology',
        size: '11-50',
        openPositions: 15,
      },
    ];
    localStorage.setItem(DB_KEYS.COMPANIES, JSON.stringify(defaultCompanies));
  }

  if (!localStorage.getItem(DB_KEYS.STATS)) {
    const defaultStats: Stats = {
      totalJobs: 12500,
      totalCompanies: 5200,
      totalCandidates: 50000,
      totalPlaced: 10000,
    };
    localStorage.setItem(DB_KEYS.STATS, JSON.stringify(defaultStats));
  }

  if (!localStorage.getItem(DB_KEYS.APPLICATIONS)) {
    localStorage.setItem(DB_KEYS.APPLICATIONS, JSON.stringify([]));
  }

  if (!localStorage.getItem(DB_KEYS.PAYMENTS)) {
    localStorage.setItem(DB_KEYS.PAYMENTS, JSON.stringify([]));
  }
};

// Generic CRUD Operations
const getAll = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const getById = <T>(key: string, id: string): T | null => {
  const items = getAll<T>(key);
  return items.find((item: any) => item.id === id) || null;
};

const create = <T>(key: string, item: T): T => {
  const items = getAll<T>(key);
  items.push(item);
  localStorage.setItem(key, JSON.stringify(items));
  return item;
};

const update = <T>(key: string, id: string, updates: Partial<T>): T | null => {
  const items = getAll<T>(key);
  const index = items.findIndex((item: any) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  localStorage.setItem(key, JSON.stringify(items));
  return items[index];
};

const remove = <T>(key: string, id: string): boolean => {
  const items = getAll<T>(key);
  const filtered = items.filter((item: any) => item.id !== id);
  if (filtered.length === items.length) return false;
  localStorage.setItem(key, JSON.stringify(filtered));
  return true;
};

// User Operations
export const userDB = {
  getAll: () => getAll<User>(DB_KEYS.USERS),
  getById: (id: string) => getById<User>(DB_KEYS.USERS, id),
  getByEmail: (email: string) => {
    const users = getAll<User>(DB_KEYS.USERS);
    return users.find(u => u.email === email) || null;
  },
  create: (user: User) => create(DB_KEYS.USERS, user),
  update: (id: string, updates: Partial<User>) => update(DB_KEYS.USERS, id, updates),
  delete: (id: string) => remove<User>(DB_KEYS.USERS, id),
};

// Job Operations
export const jobDB = {
  getAll: () => getAll<Job>(DB_KEYS.JOBS),
  getById: (id: string) => getById<Job>(DB_KEYS.JOBS, id),
  getFeatured: () => {
    const jobs = getAll<Job>(DB_KEYS.JOBS);
    return jobs.filter(j => j.featured && j.status === 'active');
  },
  getByCategory: (category: string) => {
    const jobs = getAll<Job>(DB_KEYS.JOBS);
    return jobs.filter(j => j.category === category && j.status === 'active');
  },
  search: (filters: { keyword?: string; location?: string; category?: string; type?: string }) => {
    let jobs = getAll<Job>(DB_KEYS.JOBS).filter(j => j.status === 'active');
    
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      jobs = jobs.filter(j => 
        j.title.toLowerCase().includes(kw) ||
        j.company.toLowerCase().includes(kw) ||
        j.tags.some(t => t.toLowerCase().includes(kw))
      );
    }
    
    if (filters.location) {
      jobs = jobs.filter(j => j.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    
    if (filters.category) {
      jobs = jobs.filter(j => j.category === filters.category);
    }
    
    if (filters.type) {
      jobs = jobs.filter(j => j.type === filters.type);
    }
    
    return jobs;
  },
  create: (job: Job) => create(DB_KEYS.JOBS, job),
  update: (id: string, updates: Partial<Job>) => update(DB_KEYS.JOBS, id, updates),
  delete: (id: string) => remove<Job>(DB_KEYS.JOBS, id),
  incrementViews: (id: string) => {
    const job = getById<Job>(DB_KEYS.JOBS, id);
    if (job) {
      update(DB_KEYS.JOBS, id, { views: job.views + 1 });
    }
  },
};

// Application Operations
export const applicationDB = {
  getAll: () => getAll<Application>(DB_KEYS.APPLICATIONS),
  getById: (id: string) => getById<Application>(DB_KEYS.APPLICATIONS, id),
  getByUser: (userId: string) => {
    const apps = getAll<Application>(DB_KEYS.APPLICATIONS);
    return apps.filter(a => a.userId === userId);
  },
  getByJob: (jobId: string) => {
    const apps = getAll<Application>(DB_KEYS.APPLICATIONS);
    return apps.filter(a => a.jobId === jobId);
  },
  create: (app: Application) => {
    const result = create(DB_KEYS.APPLICATIONS, app);
    // Increment job applications count
    const job = getById<Job>(DB_KEYS.JOBS, app.jobId);
    if (job) {
      update(DB_KEYS.JOBS, app.jobId, { applications: job.applications + 1 });
    }
    return result;
  },
  update: (id: string, updates: Partial<Application>) => update(DB_KEYS.APPLICATIONS, id, updates),
  delete: (id: string) => remove<Application>(DB_KEYS.APPLICATIONS, id),
};

// Payment Operations
export const paymentDB = {
  getAll: () => getAll<Payment>(DB_KEYS.PAYMENTS),
  getById: (id: string) => getById<Payment>(DB_KEYS.PAYMENTS, id),
  getByUser: (userId: string) => {
    const payments = getAll<Payment>(DB_KEYS.PAYMENTS);
    return payments.filter(p => p.userId === userId);
  },
  getPending: () => {
    const payments = getAll<Payment>(DB_KEYS.PAYMENTS);
    return payments.filter(p => p.status === 'pending');
  },
  create: (payment: Payment) => create(DB_KEYS.PAYMENTS, payment),
  update: (id: string, updates: Partial<Payment>) => update(DB_KEYS.PAYMENTS, id, updates),
  confirm: (id: string, adminId: string) => {
    const payment = getById<Payment>(DB_KEYS.PAYMENTS, id);
    if (payment) {
      update(DB_KEYS.PAYMENTS, id, {
        status: 'completed',
        confirmedBy: adminId,
        confirmedAt: new Date().toISOString(),
      });
      // Activate user
      update(DB_KEYS.USERS, payment.userId, {
        status: 'active',
        paymentStatus: 'confirmed',
      });
    }
  },
  delete: (id: string) => remove<Payment>(DB_KEYS.PAYMENTS, id),
};

// Category Operations
export const categoryDB = {
  getAll: () => getAll<Category>(DB_KEYS.CATEGORIES),
  getById: (id: string) => getById<Category>(DB_KEYS.CATEGORIES, id),
  create: (category: Category) => create(DB_KEYS.CATEGORIES, category),
  update: (id: string, updates: Partial<Category>) => update(DB_KEYS.CATEGORIES, id, updates),
  delete: (id: string) => remove<Category>(DB_KEYS.CATEGORIES, id),
  updateJobCount: (categoryName: string, delta: number) => {
    const categories = getAll<Category>(DB_KEYS.CATEGORIES);
    const category = categories.find(c => c.name === categoryName);
    if (category) {
      update(DB_KEYS.CATEGORIES, category.id, { jobCount: Math.max(0, category.jobCount + delta) });
    }
  },
};

// Company Operations
export const companyDB = {
  getAll: () => getAll<Company>(DB_KEYS.COMPANIES),
  getById: (id: string) => getById<Company>(DB_KEYS.COMPANIES, id),
  create: (company: Company) => create(DB_KEYS.COMPANIES, company),
  update: (id: string, updates: Partial<Company>) => update(DB_KEYS.COMPANIES, id, updates),
  delete: (id: string) => remove<Company>(DB_KEYS.COMPANIES, id),
};

// Stats Operations
export const statsDB = {
  get: (): Stats => {
    const stats = localStorage.getItem(DB_KEYS.STATS);
    return stats ? JSON.parse(stats) : { totalJobs: 0, totalCompanies: 0, totalCandidates: 0, totalPlaced: 0 };
  },
  update: (updates: Partial<Stats>) => {
    const current = statsDB.get();
    const updated = { ...current, ...updates };
    localStorage.setItem(DB_KEYS.STATS, JSON.stringify(updated));
    return updated;
  },
  increment: (key: keyof Stats, delta: number = 1) => {
    const current = statsDB.get();
    current[key] = (current[key] as number) + delta;
    localStorage.setItem(DB_KEYS.STATS, JSON.stringify(current));
    return current;
  },
};

// Current User Session
export const sessionDB = {
  getUser: (): User | null => {
    const data = localStorage.getItem(DB_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },
  setUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(DB_KEYS.CURRENT_USER);
    }
  },
};

export { DB_KEYS };
