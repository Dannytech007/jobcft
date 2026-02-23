import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { companyDB } from '@/data/database';
import type { Company } from '@/types';
import { cn } from '@/utils/helpers';

export const TopCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const comps = companyDB.getAll().slice(0, 4);
    setCompanies(comps);
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Top Companies Hiring
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Join industry-leading organizations and take your career to the next level
            </p>
          </div>
          <Button
            onClick={() => navigate('/companies')}
            variant="outline"
            className="mt-4 sm:mt-0 border-brand-green text-brand-green hover:bg-brand-green hover:text-white group"
          >
            View All Companies
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Companies Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <Card
              key={company.id}
              className={cn(
                'group cursor-pointer border-0 shadow-card hover:shadow-card-hover',
                'transition-all duration-300 hover:-translate-y-2',
                'bg-white overflow-hidden'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/jobs?company=${company.name}`)}
            >
              <CardContent className="p-6">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <img
                    src={company.logo || `https://ui-avatars.com/api/?name=${company.name}&background=random`}
                    alt={company.name}
                    className="w-16 h-16 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-brand-green transition-colors">
                    {company.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{company.location}</span>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 bg-brand-green/10 text-brand-green text-sm font-medium rounded-full">
                    {company.openPositions} Open Positions
                  </div>
                </div>
              </CardContent>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;
