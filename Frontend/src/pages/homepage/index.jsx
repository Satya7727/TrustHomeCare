import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import ServicesOverview from './components/ServicesOverview';
import TrustSignals from './components/TrustSignals';
import UserPathways from './components/UserPathways';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import BookNowForm from './components/BookNowForm';
import BookingModal from '../services-booking/components/BookingModal';

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 bg-white">
        <HeroSection />
        <ServicesOverview />
        <UserPathways />
        <TrustSignals />
        <TestimonialsSection />
        <CTASection />
        
        
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;