import React from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: 'Physiotherapy',
      icon: 'Activity',
      description: 'Professional physiotherapy services for recovery and mobility'
    },
    {
      id: 2,
      name: 'Nursing',
      icon: 'Heart',
      description: 'Expert nursing care available 24/7'
    },
    {
      id: 3,
      name: 'Medical Equipment',
      icon: 'Zap',
      description: 'Medical equipment rental and purchase'
    },
    {
      id: 4,
      name: 'Trained Attendants',
      icon: 'Users',
      description: 'Trained caregivers and attendants'
    },
    {
      id: 5,
      name: 'Lab Tests',
      icon: 'Microscope',
      description: 'Laboratory testing services'
    },
    {
      id: 6,
      name: 'Elder Care',
      icon: 'User',
      description: 'Specialized elder care services'
    },
    {
      id: 7,
      name: 'Doctor Consultation',
      icon: 'Stethoscope',
      description: 'Online doctor consultations'
    },
    {
      id: 8,
      name: 'Mother & Baby Care',
      icon: 'Baby',
      description: 'Maternal and neonatal care'
    },
    {
      id: 9,
      name: 'Diabetes Care',
      icon: 'Droplet',
      description: 'Diabetes management and care'
    },
    {
      id: 10,
      name: 'Critical Care',
      icon: 'AlertCircle',
      description: 'Critical and intensive care services'
    },
    {
      id: 11,
      name: 'Covid Care',
      icon: 'Shield',
      description: 'COVID-19 care and support'
    },
    {
      id: 12,
      name: 'Vaccination',
      icon: 'Syringe',
      description: 'Vaccination services'
    },
    {
      id: 13,
      name: 'Counselling',
      icon: 'MessageCircle',
      description: 'Professional counseling services'
    },
    {
      id: 14,
      name: 'Nutrition & Diet Consultation',
      icon: 'Apple',
      description: 'Expert nutrition and diet guidance'
    }
  ];

  const handleServiceClick = (service) => {
    navigate('/services-booking', { state: { selectedService: service } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive healthcare solutions delivered to your home with professional care and compassion
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="group bg-card border border-border rounded-lg p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 text-left"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon 
                    name={service.icon} 
                    size={24}
                    className="text-primary"
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  {service.description}
                </p>

                {/* Arrow Icon */}
                <div className="flex items-center justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon 
                    name="ArrowRight" 
                    size={20}
                    className="text-primary"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 md:mt-20 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Help Choosing a Service?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our expert advisors can help you select the right healthcare service for your needs
            </p>
            <button className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <Icon name="Phone" size={18} className="mr-2" />
              Call +1800 123 4567
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
