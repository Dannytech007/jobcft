import React from 'react';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { FeaturedJobs } from '@/sections/FeaturedJobs';
import { Categories } from '@/sections/Categories';
import { HowItWorks } from '@/sections/HowItWorks';
import { Stats } from '@/sections/Stats';
import { TopCompanies } from '@/sections/TopCompanies';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedJobs />
        <Categories />
        <HowItWorks />
        <Stats />
        <TopCompanies />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
