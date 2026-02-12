import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicesOverview = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      icon: 'Stethoscope',
      title: 'Nursing Care',
      description: 'Certified nurses providing skilled medical care, wound management, medication administration, and health monitoring in your home.',
      features: ['24/7 Availability', 'Licensed RNs & LPNs', 'Insurance Accepted'],
      color: 'from-primary to-secondary',
      iconBg: 'bg-primary'
    },
    {
      id: 2,
      icon: 'Video',
      title: 'Doctor Consultations',
      description: 'Virtual and in-home doctor visits for diagnosis, treatment plans, prescription management, and ongoing care coordination.',
      features: ['Same-Day Appointments', 'Board Certified', 'Telehealth Options'],
      color: 'from-secondary to-trust',
      iconBg: 'bg-secondary'
    },
    {
      id: 3,
      icon: 'Heart',
      title: 'Specialized Care',
      description: 'Expert specialists including physical therapists, occupational therapists, speech therapists, and chronic disease management.',
      features: ['Personalized Plans', 'Progress Tracking', 'Family Training'],
      color: 'from-trust to-accent',
      iconBg: 'bg-trust'
    },
    {
      id: 4,
      icon: 'Activity',
      title: 'Medical Equipment',
      description: 'Comprehensive range of medical equipment for rent or purchase with delivery, setup, training, and ongoing maintenance support.',
      features: ['Same-Day Delivery', 'Setup Included', 'Flexible Rentals'],
      color: 'from-accent to-primary',
      iconBg: 'bg-accent'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full mb-4">
            <Icon name="Sparkles" size={16} color="var(--color-primary)" />
            <span className="text-xs md:text-sm text-primary font-medium">Comprehensive Care Solutions</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-headline">
            Everything You Need for Home Healthcare
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            From professional medical services to essential equipment, we provide complete care coordination that brings hospital-quality healthcare to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
          {services?.map((service) => (
            <div
              key={service?.id}
              className="group bg-card rounded-xl md:rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-border hover:border-primary/20"
            >
              <div className="flex items-start gap-4 mb-4 md:mb-6">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${service?.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={service?.icon} size={24} color="#FFFFFF" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 font-cta">
                    {service?.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {service?.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {service?.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full"
                  >
                    <Icon name="Check" size={14} color="var(--color-success)" />
                    <span className="text-xs md:text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className={`h-1 rounded-full bg-gradient-to-r ${service?.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 text-center border border-primary/10">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 font-headline">
            Ready to Experience Care Without Compromise?
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of families who trust us for their home healthcare needs. Book your first service today and discover the difference professional care makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => navigate('/services-booking')}
            >
              Schedule a Service
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => console.log('Chat with us')}
            >
              Chat with Expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;