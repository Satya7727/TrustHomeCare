import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      icon: 'Shield',
      title: 'HIPAA Compliant',
      description: 'Full compliance with healthcare privacy regulations',
      color: 'text-success'
    },
    {
      id: 2,
      icon: 'Award',
      title: 'Certified Professionals',
      description: 'All staff licensed and background-checked',
      color: 'text-trust'
    },
    {
      id: 3,
      icon: 'Lock',
      title: 'Secure Platform',
      description: 'Bank-level encryption for all data',
      color: 'text-primary'
    },
    {
      id: 4,
      icon: 'FileCheck',
      title: 'Insurance Verified',
      description: 'Accepted by major insurance providers',
      color: 'text-secondary'
    }
  ];

  const statistics = [
    {
      id: 1,
      value: '5,000+',
      label: 'Families Served',
      icon: 'Users'
    },
    {
      id: 2,
      value: '500+',
      label: 'Healthcare Professionals',
      icon: 'UserCheck'
    },
    {
      id: 3,
      value: '4.9/5',
      label: 'Average Rating',
      icon: 'Star'
    },
    {
      id: 4,
      value: '98%',
      label: 'Satisfaction Rate',
      icon: 'Heart'
    }
  ];

  const partnerships = [
    {
      id: 1,
      name: 'American Medical Association',
      type: 'Medical Partnership'
    },
    {
      id: 2,
      name: 'National Association for Home Care',
      type: 'Industry Alliance'
    },
    {
      id: 3,
      name: 'Medicare & Medicaid',
      type: 'Insurance Partner'
    },
    {
      id: 4,
      name: 'Joint Commission Accredited',
      type: 'Quality Certification'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-background px-4 py-2 rounded-full mb-4">
            <Icon name="ShieldCheck" size={16} color="var(--color-success)" />
            <span className="text-xs md:text-sm text-success font-medium">Trusted & Certified</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-headline">
            Your Safety is Our Priority
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            We maintain the highest standards of healthcare quality, professional certification, and data security to ensure your complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12 lg:mb-16">
          {certifications?.map((cert) => (
            <div
              key={cert?.id}
              className="bg-background rounded-xl p-6 text-center shadow-soft hover:shadow-medium transition-all duration-300 border border-border"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 ${cert?.color}`}>
                <Icon name={cert?.icon} size={28} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 font-cta">
                {cert?.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {cert?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-background rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 shadow-soft mb-10 md:mb-12 lg:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8 text-center font-headline">
            Trusted by Thousands
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {statistics?.map((stat) => (
              <div key={stat?.id} className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Icon name={stat?.icon} size={24} color="var(--color-primary)" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat?.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl md:rounded-2xl p-6 md:p-8 border border-primary/10">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-6 text-center font-cta">
            Recognized Healthcare Partnerships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partnerships?.map((partner) => (
              <div
                key={partner?.id}
                className="flex items-center gap-4 bg-background rounded-lg p-4 border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Award" size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-semibold text-foreground line-clamp-1">
                    {partner?.name}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {partner?.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;