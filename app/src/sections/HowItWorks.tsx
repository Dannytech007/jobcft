import React from 'react';
import { UserPlus, FileText, Search, Send } from 'lucide-react';
import { cn } from '@/utils/helpers';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Create Profile',
    description: 'Set up your account in minutes. Add your skills, experience, and preferences.',
    color: 'brand-green',
  },
  {
    icon: FileText,
    number: '02',
    title: 'Upload Resume',
    description: 'Showcase your experience with a professional resume that stands out.',
    color: 'brand-blue',
  },
  {
    icon: Search,
    number: '03',
    title: 'Search Jobs',
    description: 'Find your perfect match with our advanced search and filtering options.',
    color: 'brand-yellow',
  },
  {
    icon: Send,
    number: '04',
    title: 'Apply & Get Hired',
    description: 'Apply to jobs with one click and get hired by top companies.',
    color: 'brand-orange',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get hired in 4 simple steps. Your dream job is just a few clicks away.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-yellow to-brand-orange rounded-full mx-auto mt-4" />
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-blue to-brand-orange opacity-50" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorClass = {
                'brand-green': 'bg-brand-green/10 text-brand-green border-brand-green/20',
                'brand-blue': 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
                'brand-yellow': 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20',
                'brand-orange': 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
              }[step.color];

              return (
                <div
                  key={index}
                  className={cn(
                    'relative text-center group',
                    'animate-slide-up'
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Icon Container */}
                  <div className="relative inline-flex flex-col items-center mb-6">
                    <div 
                      className={cn(
                        'w-20 h-20 rounded-2xl flex items-center justify-center border-2',
                        'transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
                        colorClass
                      )}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    {/* Step Number */}
                    <div 
                      className={cn(
                        'absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center',
                        'text-sm font-bold text-white shadow-lg',
                        step.color === 'brand-green' && 'bg-brand-green',
                        step.color === 'brand-blue' && 'bg-brand-blue',
                        step.color === 'brand-yellow' && 'bg-brand-yellow',
                        step.color === 'brand-orange' && 'bg-brand-orange',
                      )}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-brand-green transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
