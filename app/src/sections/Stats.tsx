import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Building2, Users, UserCheck } from 'lucide-react';
import { statsDB } from '@/data/database';
import { cn } from '@/utils/helpers';

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

export const Stats: React.FC = () => {
  const [stats, setStats] = useState({ totalJobs: 0, totalCompanies: 0, totalCandidates: 0, totalPlaced: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dbStats = statsDB.get();
    setStats(dbStats);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const statItems: StatItem[] = [
    { icon: Briefcase, value: stats.totalJobs, suffix: '+', label: 'Active Jobs', color: 'from-brand-green to-brand-darkGreen' },
    { icon: Building2, value: stats.totalCompanies, suffix: '+', label: 'Companies', color: 'from-brand-blue to-brand-darkBlue' },
    { icon: Users, value: stats.totalCandidates, suffix: '+', label: 'Job Seekers', color: 'from-brand-yellow to-brand-darkYellow' },
    { icon: UserCheck, value: stats.totalPlaced, suffix: '+', label: 'Successfully Placed', color: 'from-brand-orange to-brand-darkOrange' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 lg:py-20 bg-gradient-to-r from-brand-green via-brand-blue to-brand-orange relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={cn(
                  'text-center text-white',
                  'transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  <CounterAnimation 
                    end={stat.value} 
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>
                <p className="text-white/80 text-sm lg:text-base">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface CounterAnimationProps {
  end: number;
  suffix: string;
  isVisible: boolean;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({ end, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end, isVisible]);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'k';
    }
    return num.toString();
  };

  return (
    <span>
      {formatNumber(count)}{suffix}
    </span>
  );
};

export default Stats;
