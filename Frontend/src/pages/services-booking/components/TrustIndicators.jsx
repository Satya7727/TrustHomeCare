import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const indicators = [
    {
      icon: 'Shield',
      color: 'var(--color-success)',
      title: 'HIPAA Compliant',
      description: 'Your health data is protected with industry-leading security'
    },
    {
      icon: 'Award',
      color: 'var(--color-trust)',
      title: 'Certified Professionals',
      description: 'All healthcare providers are licensed and background-checked'
    },
    {
      icon: 'Clock',
      color: 'var(--color-primary)',
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your healthcare needs'
    },
    {
      icon: 'Heart',
      color: 'var(--color-accent)',
      title: 'Patient-Centered',
      description: 'Compassionate care tailored to your unique needs'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-6">
      {indicators?.map((indicator, index) => (
        <div
          key={index}
          className="bg-card rounded-lg shadow-soft border border-border p-4 hover:shadow-medium transition-smooth"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Icon name={indicator?.icon} size={20} color={indicator?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground mb-1 font-cta">
                {indicator?.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {indicator?.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators;