import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EquipmentCard = ({ equipment, onViewDetails, onBookNow }) => {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 text-success';
      case 'limited':
        return 'bg-warning/10 text-warning';
      case 'unavailable':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden bg-muted">
        <Image
          src={equipment?.image}
          alt={equipment?.imageAlt}
          className="w-full h-full object-cover"
        />
        {equipment?.isNew && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            New Arrival
          </div>
        )}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(equipment?.availability)}`}>
          {equipment?.availabilityText}
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <h3 className="text-base md:text-lg font-semibold text-foreground line-clamp-2 font-headline mb-2">
          {equipment?.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {equipment?.description}
        </p>

        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl md:text-3xl font-bold text-primary">
              ${equipment?.rentalPrice}
            </span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => onViewDetails(equipment)}
              iconName="Eye"
              iconPosition="left"
            >
              Details
            </Button>

            <Button
              variant="default"
              size="sm"
              fullWidth
              onClick={() => onBookNow(equipment)}
              iconName="Calendar"
              iconPosition="left"
              disabled={equipment?.availability === 'unavailable'}
            >
              {equipment?.availability === 'unavailable' ? 'Unavailable' : 'Book Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;
