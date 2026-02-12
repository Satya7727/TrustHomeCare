import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import MissionSection from './components/MissionSection';
import VisionSection from './components/VisionSection';
import FounderSection from './components/FounderSection';
import CompanyInfo from './components/CompanyInfo';
import StatsSection from './components/StatsSection';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 bg-white">
        <MissionSection />
        <VisionSection />
        <StatsSection />
        <CompanyInfo />
        <FounderSection />
      </main>

      <Footer />
    </div>
  );
};

export default About;
