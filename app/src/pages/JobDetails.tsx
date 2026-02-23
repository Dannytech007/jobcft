import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, DollarSign, Clock, Briefcase, Building2, 
  CheckCircle, ArrowLeft, Share2, Bookmark, BookmarkCheck,
  Users
} from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { jobDB, companyDB } from '@/data/database';
import { useAuth } from '@/contexts/AuthContext';
import type { Job, Company } from '@/types';
import { 
  formatSalary, formatDate, getJobTypeLabel 
} from '@/utils/helpers';

export const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [job, setJob] = useState<Job | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);


  useEffect(() => {
    if (id) {
      const jobData = jobDB.getById(id);
      if (jobData) {
        setJob(jobData);
        jobDB.incrementViews(id);
        
        // Find company
        const companies = companyDB.getAll();
        const comp = companies.find(c => c.name === jobData.company);
        if (comp) setCompany(comp);
      }
    }
  }, [id]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Job not found</h1>
          <Button onClick={() => navigate('/jobs')} className="mt-4">
            Back to Jobs
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    if (user?.status !== 'active') {
      alert('Please complete your payment to apply for jobs.');
      navigate('/payment');
      return;
    }
    alert('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center text-gray-500 hover:text-brand-green transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Jobs
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={job.companyLogo || `https://ui-avatars.com/api/?name=${job.company}&background=random`}
                alt={job.company}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <h1 className="text-2xl lg:text-3xl font-poppins font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-3 rounded-xl border border-gray-200 hover:border-brand-green hover:bg-brand-green/5 transition-colors"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-brand-green fill-brand-green" />
                ) : (
                  <Bookmark className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <button className="p-3 rounded-xl border border-gray-200 hover:border-brand-green hover:bg-brand-green/5 transition-colors">
                <Share2 className="w-5 h-5 text-gray-400" />
              </button>
              <Button 
                onClick={handleApply}
                className="bg-brand-green hover:bg-brand-darkGreen text-white px-8"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Briefcase className="w-5 h-5 text-brand-green mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Job Type</p>
                  <p className="font-medium">{getJobTypeLabel(job.type)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-5 h-5 text-brand-blue mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-medium text-sm">
                    {formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period)}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-5 h-5 text-brand-yellow mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="font-medium">{formatDate(job.createdAt)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-5 h-5 text-brand-orange mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Applications</p>
                  <p className="font-medium">{job.applications}</p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{resp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="bg-brand-green/5 text-brand-green border-brand-green/20 px-3 py-1"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Company Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">About the Company</h2>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={company?.logo || `https://ui-avatars.com/api/?name=${job.company}&background=random`}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{job.company}</p>
                    {company?.website && (
                      <a 
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-green hover:underline"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  {company?.description || 'Leading company in the industry with great opportunities for growth and development.'}
                </p>
                
                {company && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{company.size} employees</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{company.industry}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Job Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="text-gray-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Apply CTA */}
            <Card className="bg-gradient-to-br from-brand-green to-brand-darkGreen text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Interested in this job?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Apply now and take the next step in your career.
                </p>
                <Button 
                  onClick={handleApply}
                  className="w-full bg-white text-brand-green hover:bg-white/90"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
   
    </div>
  );
};

