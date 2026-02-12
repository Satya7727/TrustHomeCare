import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBanner = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'HIPAA Compliant',
      description: 'Your data is secure',
      color: 'var(--color-success)'
    },
    {
      icon: 'Award',
      title: 'Certified Equipment',
      description: 'FDA approved devices',
      color: 'var(--color-trust)'
    },
    {
      icon: 'Truck',
      title: 'Fast Delivery',
      description: 'Same-day available',
      color: 'var(--color-warning)'
    },
    {
      icon: 'HeadphonesIcon',
      title: '24/7 Support',
      description: 'Always here to help',
      color: 'var(--color-primary)'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 md:p-8 mb-8 shadow-medium">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <Icon name={feature?.icon} size={24} color="#FFFFFF" />
            </div>
            <h3 className="text-sm md:text-base font-semibold text-white mb-1 font-cta">
              {feature?.title}
            </h3>
            <p className="text-xs text-white/80">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBanner;