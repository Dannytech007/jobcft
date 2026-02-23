import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, Users, DollarSign, 
  LogOut, Plus, Search, Edit2, Trash2, 
  Eye
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { jobDB, userDB, paymentDB, statsDB } from '@/data/database';
import type { Job, User, Payment } from '@/types';
import { formatDate, getJobTypeLabel, cn, generateId } from '@/utils/helpers';

// Job Form Component
const JobForm: React.FC<{
  job?: Job | null;
  onSave: (job: Job) => void;
  onCancel: () => void;
}> = ({ job, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    salary: { min: 0, max: 0, currency: 'USD', period: 'year' },
    description: '',
    requirements: [],
    responsibilities: [],
    benefits: [],
    category: 'Technology',
    tags: [],
    status: 'active',
    featured: false,
    ...job,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: job?.id || generateId('job-'),
      title: formData.title || '',
      company: formData.company || '',
      companyLogo: formData.companyLogo || `https://ui-avatars.com/api/?name=${formData.company}&background=random`,
      location: formData.location || '',
      type: formData.type as any,
      salary: formData.salary as any,
      description: formData.description || '',
      requirements: formData.requirements || [],
      responsibilities: formData.responsibilities || [],
      benefits: formData.benefits || [],
      category: formData.category || '',
      tags: formData.tags || [],
      status: formData.status as any,
      featured: formData.featured || false,
      views: job?.views || 0,
      applications: job?.applications || 0,
      postedBy: job?.postedBy || 'admin-001',
      createdAt: job?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiresAt: job?.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
    onSave(newJob);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <Input
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Input
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Job Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            className="w-full h-10 px-3 border rounded-md"
          >
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full h-10 px-3 border rounded-md"
          >
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Featured</label>
          <select
            value={formData.featured ? 'true' : 'false'}
            onChange={(e) => setFormData({ ...formData, featured: e.target.value === 'true' })}
            className="w-full h-10 px-3 border rounded-md"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Min Salary</label>
          <Input
            type="number"
            value={formData.salary?.min}
            onChange={(e) => setFormData({ 
              ...formData, 
              salary: { ...formData.salary, min: Number(e.target.value) } as any 
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Salary</label>
          <Input
            type="number"
            value={formData.salary?.max}
            onChange={(e) => setFormData({ 
              ...formData, 
              salary: { ...formData.salary, max: Number(e.target.value) } as any 
            })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full h-24 px-3 py-2 border rounded-md resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Requirements (one per line)</label>
        <textarea
          value={formData.requirements?.join('\n')}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value.split('\n').filter(Boolean) })}
          className="w-full h-20 px-3 py-2 border rounded-md resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Benefits (one per line)</label>
        <textarea
          value={formData.benefits?.join('\n')}
          onChange={(e) => setFormData({ ...formData, benefits: e.target.value.split('\n').filter(Boolean) })}
          className="w-full h-20 px-3 py-2 border rounded-md resize-none"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-brand-green hover:bg-brand-darkGreen">
          {job ? 'Update Job' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
};

export const Admin: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [, setStats] = useState({ totalJobs: 0, totalCompanies: 0, totalCandidates: 0, totalPlaced: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    loadData();
  }, [user]);

  const loadData = () => {
    setJobs(jobDB.getAll());
    setUsers(userDB.getAll());
    setPayments(paymentDB.getAll());
    setStats(statsDB.get());
  };

  const handleSaveJob = (job: Job) => {
    if (editingJob) {
      jobDB.update(job.id, job);
    } else {
      jobDB.create(job);
    }
    setIsJobDialogOpen(false);
    setEditingJob(null);
    loadData();
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      jobDB.delete(id);
      loadData();
    }
  };

  const handleConfirmPayment = (paymentId: string) => {
    if (confirm('Confirm this payment and activate the user account?')) {
      paymentDB.confirm(paymentId, user?.id || '');
      loadData();
    }
  };

  const handleActivateUser = (userId: string) => {
    if (confirm('Activate this user account?')) {
      userDB.update(userId, { status: 'active', paymentStatus: 'confirmed' });
      loadData();
    }
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingPayments = payments.filter(p => p.status === 'pending');
  const pendingUsers = users.filter(u => u.status === 'pending');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payments', label: 'Payments', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6">
          <Logo size="sm" />
        </div>
        
        <nav className="px-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                  activeTab === item.id
                    ? 'bg-brand-green/10 text-brand-green'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-poppins font-bold text-gray-900 capitalize">
              {activeTab}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user?.fullName}</span>
              <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center">
                <span className="text-brand-green font-medium">
                  {user?.fullName.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Total Jobs</p>
                        <p className="text-3xl font-bold">{jobs.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-brand-green" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <p className="text-3xl font-bold">{users.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-brand-blue" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Pending Payments</p>
                        <p className="text-3xl font-bold">{pendingPayments.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-brand-yellow/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-brand-yellow" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Pending Users</p>
                        <p className="text-3xl font-bold">{pendingUsers.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-brand-orange" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {jobs.slice(0, 5).map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-gray-500">{job.company}</p>
                          </div>
                          <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                            {job.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingPayments.slice(0, 5).map((payment) => {
                        const paymentUser = users.find(u => u.id === payment.userId);
                        return (
                          <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{paymentUser?.fullName || 'Unknown'}</p>
                              <p className="text-sm text-gray-500">${payment.amount}</p>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => handleConfirmPayment(payment.id)}
                              className="bg-brand-green hover:bg-brand-darkGreen"
                            >
                              Confirm
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => { setEditingJob(null); }}
                      className="bg-brand-green hover:bg-brand-darkGreen"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
                    </DialogHeader>
                    <JobForm
                      job={editingJob}
                      onSave={handleSaveJob}
                      onCancel={() => setIsJobDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{getJobTypeLabel(job.type)}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            job.status === 'active' && 'bg-brand-green/10 text-brand-green',
                            job.status === 'closed' && 'bg-red-100 text-red-600',
                            job.status === 'draft' && 'bg-gray-100 text-gray-600'
                          )}>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{job.applications}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/jobs/${job.id}`)}
                              className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setEditingJob(job); setIsJobDialogOpen(true); }}
                              className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="p-2 hover:bg-red-50 text-red-500 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.fullName}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Badge className={u.role === 'admin' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-gray-100'}>
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          u.status === 'active' && 'bg-brand-green/10 text-brand-green',
                          u.status === 'pending' && 'bg-brand-yellow/10 text-brand-yellow',
                          u.status === 'suspended' && 'bg-red-100 text-red-600'
                        )}>
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          u.paymentStatus === 'confirmed' && 'bg-brand-green/10 text-brand-green',
                          u.paymentStatus === 'paid' && 'bg-brand-yellow/10 text-brand-yellow',
                          u.paymentStatus === 'pending' && 'bg-gray-100 text-gray-600'
                        )}>
                          {u.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(u.createdAt)}</TableCell>
                      <TableCell>
                        {u.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleActivateUser(u.id)}
                            className="bg-brand-green hover:bg-brand-darkGreen"
                          >
                            Activate
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {activeTab === 'payments' && (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => {
                    const paymentUser = users.find(u => u.id === payment.userId);
                    return (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          {paymentUser?.fullName || 'Unknown'}
                        </TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell className="capitalize">{payment.method}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            payment.status === 'completed' && 'bg-brand-green/10 text-brand-green',
                            payment.status === 'pending' && 'bg-brand-yellow/10 text-brand-yellow',
                            payment.status === 'failed' && 'bg-red-100 text-red-600'
                          )}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(payment.createdAt)}</TableCell>
                        <TableCell>
                          {payment.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => handleConfirmPayment(payment.id)}
                              className="bg-brand-green hover:bg-brand-darkGreen"
                            >
                              Confirm
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
