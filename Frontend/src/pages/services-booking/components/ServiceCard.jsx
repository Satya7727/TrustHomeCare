import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ServiceCard = ({ service, onBookNow }) => {
  return (
    <div className="bg-card rounded-lg shadow-soft hover:shadow-medium transition-smooth overflow-hidden border border-border">
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
        <Image
          src={service?.image}
          alt={service?.imageAlt}
          className="w-full h-full object-cover"
        />
        {service?.isUrgent && (
          <div className="absolute top-3 right-3 bg-error text-error-foreground px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            <span>Urgent Care</span>
          </div>
        )}
        {service?.isPopular && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
            <Icon name="Star" size={14} />
            <span>Popular</span>
          </div>
        )}
      </div>
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-1 line-clamp-1 font-headline">
              {service?.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {service?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} color="var(--color-primary)" />
            <span>{service?.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} color="var(--color-primary)" />
            <span>{service?.location}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Icon name="Star" size={16} color="var(--color-accent)" />
            <span className="font-semibold text-foreground">
              {service?.rating}
            </span>
            <span className="text-muted-foreground">({service?.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {service?.features?.map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-xl md:text-2xl font-bold text-primary font-cta">
              ${service?.price}
              <span className="text-sm text-muted-foreground font-normal">
                /visit
              </span>
            </p>
          </div>
          <Button
            variant="default"
            size="default"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => {
              console.log("Book Now clicked:", service);
              onBookNow(service);
            }}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
