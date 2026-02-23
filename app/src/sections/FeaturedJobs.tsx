import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { jobDB } from '@/data/database';
import type { Job } from '@/types';
import { formatSalary, formatRelativeTime, getJobTypeColor, getJobTypeLabel, truncateText } from '@/utils/helpers';
import { cn } from '@/utils/helpers';

export const FeaturedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const featuredJobs = jobDB.getFeatured().slice(0, 6);
    setJobs(featuredJobs);
  }, []);

  const toggleBookmark = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    setBookmarkedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Featured Jobs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked opportunities from top companies. Find your perfect match today.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-brand-blue rounded-full mx-auto mt-4" />
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <Card
              key={job.id}
              className={cn(
                'group cursor-pointer border border-gray-100 hover:border-brand-green/30 transition-all duration-300',
                'hover:shadow-card-hover hover:-translate-y-2'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.companyLogo || `https://ui-avatars.com/api/?name=${job.company}&background=random`}
                      alt={job.company}
                      className="w-12 h-12 rounded-xl object-cover group-hover:scale-110 transition-transform"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-brand-green transition-colors line-clamp-1">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => toggleBookmark(e, job.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {bookmarkedJobs.has(job.id) ? (
                      <BookmarkCheck className="w-5 h-5 text-brand-green fill-brand-green" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-gray-400 group-hover:text-brand-green transition-colors" />
                    )}
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span>
                      {formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{formatRelativeTime(job.createdAt)}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {truncateText(job.description, 100)}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Badge variant="outline" className={getJobTypeColor(job.type)}>
                    {getJobTypeLabel(job.type)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {job.applications} applications
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate('/jobs')}
            variant="outline"
            size="lg"
            className="group border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
          >
            View All Jobs
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
