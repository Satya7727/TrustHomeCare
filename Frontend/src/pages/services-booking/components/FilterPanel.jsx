import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const serviceTypeOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'nursing', label: 'Nursing Care' },
    { value: 'doctor', label: 'Doctor Consultation' },
    { value: 'specialist', label: 'Specialist Care' },
    { value: 'therapy', label: 'Physical Therapy' },
    { value: 'emergency', label: 'Emergency Care' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'Any Time' },
    { value: 'today', label: 'Available Today' },
    { value: 'tomorrow', label: 'Available Tomorrow' },
    { value: 'week', label: 'This Week' },
    { value: 'urgent', label: 'Urgent (24hrs)' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'manhattan', label: 'Manhattan, NY' },
    { value: 'brooklyn', label: 'Brooklyn, NY' },
    { value: 'queens', label: 'Queens, NY' },
    { value: 'bronx', label: 'Bronx, NY' },
    { value: 'staten', label: 'Staten Island, NY' }
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'experience', label: 'Most Experienced' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-soft border border-border p-4 md:p-5 lg:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-foreground font-headline flex items-center gap-2">
          <Icon name="SlidersHorizontal" size={20} />
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          iconPosition="left"
          onClick={onClearFilters}
        >
          Clear
        </Button>
      </div>
      <div className="space-y-4 md:space-y-5">
        <Select
          label="Service Type"
          options={serviceTypeOptions}
          value={filters?.serviceType}
          onChange={(value) => onFilterChange('serviceType', value)}
        />

        <Select
          label="Availability"
          options={availabilityOptions}
          value={filters?.availability}
          onChange={(value) => onFilterChange('availability', value)}
        />

        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
          searchable
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.priceMin}
              onChange={(e) => onFilterChange('priceMin', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters?.priceMax}
              onChange={(e) => onFilterChange('priceMax', e?.target?.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Professional Features
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Verified Professionals"
              checked={filters?.verifiedOnly}
              onChange={(e) => onFilterChange('verifiedOnly', e?.target?.checked)}
            />
            <Checkbox
              label="Insurance Accepted"
              checked={filters?.insuranceAccepted}
              onChange={(e) => onFilterChange('insuranceAccepted', e?.target?.checked)}
            />
            <Checkbox
              label="Home Visits Available"
              checked={filters?.homeVisits}
              onChange={(e) => onFilterChange('homeVisits', e?.target?.checked)}
            />
            <Checkbox
              label="Telehealth Available"
              checked={filters?.telehealth}
              onChange={(e) => onFilterChange('telehealth', e?.target?.checked)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Minimum Rating
          </label>
          <div className="flex items-center gap-2">
            {[4, 4.5, 5]?.map((rating) => (
              <button
                key={rating}
                onClick={() => onFilterChange('minRating', rating)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  filters?.minRating === rating
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {rating}+
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;