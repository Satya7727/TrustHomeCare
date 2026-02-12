import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyBanner = () => {
  const handleEmergencyCall = () => {
    window.location.href = 'tel:1-800-CARE-NOW';
  };

  return (
    <div className="bg-gradient-to-r from-error to-error/80 rounded-lg shadow-medium p-4 md:p-5 lg:p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <Icon name="AlertCircle" size={28} color="#FFFFFF" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-1 font-headline">
            Need Urgent Medical Care?
          </h3>
          <p className="text-sm md:text-base text-white/90">
            Our emergency response team is available 24/7 for immediate medical assistance. Get connected with a healthcare professional within minutes.
          </p>
        </div>
        <Button
          variant="outline"
          size="lg"
          iconName="Phone"
          iconPosition="left"
          onClick={handleEmergencyCall}
          className="bg-white text-error hover:bg-white/90 border-white flex-shrink-0"
        >
          Call Now
        </Button>
      </div>
    </div>
  );
};

export default EmergencyBanner;