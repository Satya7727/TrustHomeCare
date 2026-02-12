import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      icon: 'Calendar',
      title: 'Book a Service',
      description: 'Schedule professional care',
      action: () => navigate('/services-booking')
    },
    {
      id: 2,
      icon: 'ShoppingCart',
      title: 'Browse Equipment',
      description: 'Find medical supplies',
      action: () => navigate('/equipment-marketplace')
    },
    {
      id: 3,
      icon: 'Phone',
      title: 'Emergency Support',
      description: 'Available 24/7',
      action: () => window.location.href = 'tel:1-800-CARE-NOW'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-headline">
            Ready to Experience Care Without Compromise?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of families who trust TrustHomeCare for their home healthcare needs. Professional care, delivered with compassion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl p-6 md:p-8 transition-all duration-300 border border-white/20 hover:border-white/40 text-left group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name={action?.icon} size={24} color="#FFFFFF" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-cta">
                {action?.title}
              </h3>
              <p className="text-sm md:text-base text-white/80">
                {action?.description}
              </p>
              <div className="flex items-center gap-2 mt-4 text-white">
                <span className="text-sm font-medium">Get Started</span>
                <Icon name="ArrowRight" size={16} />
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 font-headline">
                Need Help Choosing?
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-white/90 mb-6 leading-relaxed">
                Our care coordination team is available 24/7 to help you find the perfect healthcare solution for your unique needs. Get personalized guidance from our experts.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-2 text-white">
                  <Icon name="Check" size={18} />
                  <span className="text-sm md:text-base">Free Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Icon name="Check" size={18} />
                  <span className="text-sm md:text-base">No Obligation</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Icon name="Check" size={18} />
                  <span className="text-sm md:text-base">Expert Guidance</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <Button
                variant="default"
                size="lg"
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => console.log('Start chat')}
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                Chat with Care Coordinator
              </Button>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                iconName="Phone"
                iconPosition="left"
                onClick={() => window.location.href = 'tel:1-800-CARE-NOW'}
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Call 1-800-CARE-NOW
              </Button>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                iconName="Mail"
                iconPosition="left"
                onClick={() => window.location.href = 'mailto:support@trusthomecare.com'}
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Email Our Team
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white/80 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} />
              <span>HIPAA Compliant</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-2">
              <Icon name="Award" size={16} />
              <span>Certified Professionals</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40"></div>
            <div className="flex items-center gap-2">
              <Icon name="Lock" size={16} />
              <span>Secure Platform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;