import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, TrendingUp, Building2, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { statsDB } from '@/data/database';
import { cn } from '@/utils/helpers';

export const Hero: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [stats, setStats] = useState({ totalJobs: 0, totalCompanies: 0, totalCandidates: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const dbStats = statsDB.get();
    setStats(dbStats);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  const popularSearches = ['Remote', 'Designer', 'Developer', 'Manager', 'Marketing'];

  const floatingShapes = [
    { color: 'bg-brand-green', size: 'w-16 h-16', top: '10%', left: '5%', delay: '0s' },
    { color: 'bg-brand-blue', size: 'w-12 h-12', top: '20%', right: '10%', delay: '1s' },
    { color: 'bg-brand-yellow', size: 'w-20 h-20', bottom: '20%', left: '8%', delay: '2s' },
    { color: 'bg-brand-orange', size: 'w-14 h-14', bottom: '15%', right: '5%', delay: '0.5s' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-brand-green/5">
      {/* Floating Decorative Shapes */}
      {floatingShapes.map((shape, index) => (
        <div
          key={index}
          className={cn(
            'absolute rounded-full opacity-20 animate-float',
            shape.color,
            shape.size
          )}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            animationDelay: shape.delay,
          }}
        />
      ))}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #4CAF50 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 rounded-full">
                <TrendingUp className="w-4 h-4 text-brand-green" />
                <span className="text-sm font-medium text-brand-green">
                  10,000+ Jobs Available
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-gray-900 leading-tight">
                Find Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue">
                  Dream Job
                </span>{' '}
                Today
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl">
                Discover over 10,000+ job opportunities in tech, design, marketing, and more. 
                Your next career move starts here.
              </p>
            </div>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-brand-green focus:ring-brand-green/20"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="City or location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-brand-green focus:ring-brand-green/20"
                  />
                </div>
                <Button 
                  type="submit"
                  className="h-12 px-8 bg-brand-green hover:bg-brand-darkGreen text-white font-medium"
                >
                  Search Jobs
                </Button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setKeyword(term);
                    navigate(`/jobs?keyword=${term}`);
                  }}
                  className="px-3 py-1 text-sm text-gray-600 bg-white border border-gray-200 rounded-full hover:border-brand-green hover:text-brand-green transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {(stats.totalJobs / 1000).toFixed(0)}k+
                  </p>
                  <p className="text-sm text-gray-500">Active Jobs</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {(stats.totalCompanies / 1000).toFixed(0)}k+
                  </p>
                  <p className="text-sm text-gray-500">Companies</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-brand-yellow" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {(stats.totalCandidates / 1000).toFixed(0)}k+
                  </p>
                  <p className="text-sm text-gray-500">Candidates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 animate-float" style={{ animationDuration: '6s' }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop"
                alt="Team collaboration"
                className="rounded-3xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <div className="absolute -left-8 top-1/4 bg-white p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">New Job</p>
                    <p className="text-xs text-gray-500">Just posted</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 bottom-1/4 bg-white p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">500+</p>
                    <p className="text-xs text-gray-500">Hired this week</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-brand-blue/20 rounded-3xl blur-3xl -z-10 transform scale-110" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
