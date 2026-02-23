import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, Palette, TrendingUp, DollarSign, 
  BarChart3, Heart, GraduationCap, Settings,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { categoryDB } from '@/data/database';
import type { Category } from '@/types';
import { cn } from '@/utils/helpers';

const iconMap: Record<string, React.ElementType> = {
  Code,
  Palette,
  TrendingUp,
  DollarSign,
  BarChart3,
  Heart,
  GraduationCap,
  Settings,
};

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cats = categoryDB.getAll();
    setCategories(cats);
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore jobs by industry and find opportunities that match your expertise
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-brand-yellow rounded-full mx-auto mt-4" />
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Settings;
            return (
              <Card
                key={category.id}
                className={cn(
                  'group cursor-pointer border-0 shadow-card hover:shadow-card-hover',
                  'transition-all duration-300 hover:-translate-y-2',
                  'bg-white overflow-hidden'
                )}
                style={{ 
                  animationDelay: `${index * 80}ms`,
                }}
                onClick={() => navigate(`/jobs?category=${category.name}`)}
              >
                <CardContent className="p-6">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <Icon 
                      className="w-7 h-7 transition-colors"
                      style={{ color: category.color }}
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-brand-green transition-colors">
                    {category.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.jobCount.toLocaleString()} jobs
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
                
                {/* Hover Gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}08 0%, transparent 60%)`,
                  }}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
