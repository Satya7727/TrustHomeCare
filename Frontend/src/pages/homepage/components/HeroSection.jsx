import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import BookingModal from '../../services-booking/components/BookingModal';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-amber-500 to-blue-600 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 md:mb-6">
              <Icon name="Shield" size={16} color="#FFFFFF" />
              <span className="text-xs md:text-sm text-white font-medium">HIPAA Compliant & Certified Care</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-headline leading-tight">
              Quality Medical Care Delivered At The Comfort of Your Home
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
              Bring hospital-quality care to your home with our trained General Duty Assistants (GDAs) and professional nurses.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-6 md:mb-8">
              <Button
                variant="default"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => navigate('/services-booking')}
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="ShoppingCart"
                iconPosition="left"
                onClick={() => navigate('/equipment-marketplace')}
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Browse Equipment
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-white">
                <Icon name="Users" size={20} />
                <span className="text-sm md:text-base">5,000+ Families Served</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Icon name="Star" size={20} />
                <span className="text-sm md:text-base">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Icon name="Award" size={20} />
                <span className="text-sm md:text-base">Certified Professionals</span>
              </div>
              
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default HeroSection;