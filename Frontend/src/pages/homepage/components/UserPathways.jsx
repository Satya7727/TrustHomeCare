import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserPathways = () => {
  const navigate = useNavigate();

  const pathways = [
    {
      id: 1,
      userType: 'Family Caregivers',
      icon: 'Heart',
      tagline: 'Care for Your Loved Ones',
      description: 'Access professional healthcare services and medical equipment to provide the best care for family members at home.',
      benefits: [
        'Book certified nurses and doctors',
        'Rent or buy medical equipment',
        'Coordinate ongoing care plans',
        'Insurance assistance available'
      ],
      cta: 'Find Care Services',
      ctaAction: () => navigate('/services-booking'),
      gradient: 'from-primary to-secondary',
      iconBg: 'bg-primary'
    },
    {
      id: 2,
      userType: 'Healthcare Professionals',
      icon: 'Briefcase',
      tagline: 'Flexible Career Opportunities',
      description: 'Join our network of healthcare professionals and connect with families who need your expertise on your schedule.',
      benefits: [
        'Flexible work arrangements',
        'Competitive compensation',
        'Professional development',
        'Supportive community'
      ],
      cta: 'Join Our Network',
      ctaAction: () => console.log('Professional signup'),
      gradient: 'from-secondary to-trust',
      iconBg: 'bg-secondary'
    },
    {
      id: 3,
      userType: 'Equipment Seekers',
      icon: 'Package',
      tagline: 'Quality Medical Equipment',
      description: 'Browse our comprehensive catalog of medical equipment with flexible rental and purchase options, delivered to your door.',
      benefits: [
        'Wide equipment selection',
        'Rent or purchase options',
        'Same-day delivery available',
        'Setup and training included'
      ],
      cta: 'Browse Equipment',
      ctaAction: () => navigate('/equipment-marketplace'),
      gradient: 'from-trust to-accent',
      iconBg: 'bg-trust'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full mb-4">
            <Icon name="Users" size={16} color="var(--color-primary)" />
            <span className="text-xs md:text-sm text-primary font-medium">Tailored Solutions</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-headline">
            Choose Your Path to Better Care
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you're seeking care for a loved one, looking for professional opportunities, or need medical equipment, we have the right solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {pathways?.map((pathway) => (
            <div
              key={pathway?.id}
              className="bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 border border-border flex flex-col"
            >
              <div className={`bg-gradient-to-br ${pathway?.gradient} p-6 md:p-8`}>
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl ${pathway?.iconBg} flex items-center justify-center mb-4`}>
                  <Icon name={pathway?.icon} size={28} color="#FFFFFF" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-headline">
                  {pathway?.userType}
                </h3>
                <p className="text-sm md:text-base text-white/90 font-medium">
                  {pathway?.tagline}
                </p>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
                  {pathway?.description}
                </p>

                <div className="space-y-3 mb-6 flex-1">
                  {pathway?.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} color="var(--color-success)" />
                      </div>
                      <span className="text-sm md:text-base text-foreground">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={pathway?.ctaAction}
                >
                  {pathway?.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 lg:mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-trust/10 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 text-center border border-primary/20">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 font-headline">
              Not Sure Where to Start?
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-6 md:mb-8">
              Our care coordination team is here to help you find the perfect solution for your unique healthcare needs. Get personalized guidance from our experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => console.log('Start chat')}
              >
                Chat with Care Coordinator
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Phone"
                iconPosition="left"
                onClick={() => window.location.href = 'tel:1-800-CARE-NOW'}
              >
                Call 1-800-CARE-NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPathways;