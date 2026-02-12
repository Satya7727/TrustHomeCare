import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfessionalCard = ({ professional, onViewProfile, onBookAppointment }) => {
  return (
    <div className="bg-card rounded-lg shadow-soft hover:shadow-medium transition-smooth overflow-hidden border border-border">
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-primary">
              <Image
                src={professional?.avatar}
                alt={professional?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            {professional?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-success rounded-full flex items-center justify-center border-2 border-card">
                <Icon name="CheckCircle2" size={14} color="#FFFFFF" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-1 line-clamp-1 font-headline">
              {professional?.name}
            </h3>
            <p className="text-sm text-primary font-medium mb-1">{professional?.specialization}</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} color="var(--color-accent)" />
                <span className="text-sm font-semibold text-foreground">{professional?.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({professional?.totalReviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="Briefcase" size={12} />
              <span>{professional?.experience} years experience</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} color="var(--color-primary)" />
            <span className="line-clamp-1">{professional?.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Languages" size={14} color="var(--color-primary)" />
            <span className="line-clamp-1">{professional?.languages?.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} color="var(--color-primary)" />
            <span>Available: {professional?.availability}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{professional?.bio}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {professional?.certifications?.slice(0, 3)?.map((cert, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md flex items-center gap-1"
            >
              <Icon name="Award" size={12} />
              {cert}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Consultation fee</p>
            <p className="text-lg md:text-xl font-bold text-primary font-cta whitespace-nowrap">
              ${professional?.consultationFee}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="User"
              iconPosition="left"
              onClick={() => onViewProfile(professional)}
            >
              Profile
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => onBookAppointment(professional)}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;