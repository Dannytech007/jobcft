import React from 'react';
import { Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/helpers';

export const CTA: React.FC = () => {

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-brand-blue via-brand-green to-brand-blue rounded-3xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }} />
          </div>

          {/* Floating Shapes */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <Bell className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-white mb-4">
              Get Job Alerts
            </h2>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Subscribe to receive the latest opportunities matching your skills and preferences. 
              Never miss your dream job again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white"
              />
              <Button 
                className={cn(
                  'h-14 px-8 bg-white text-brand-green hover:bg-white/90 font-semibold',
                  'shadow-lg hover:shadow-xl transition-all'
                )}
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <p className="text-sm text-white/60 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
