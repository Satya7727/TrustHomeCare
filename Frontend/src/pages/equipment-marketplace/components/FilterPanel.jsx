import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onResetFilters }) => {
  const availabilityOptions = [
    { value: 'all', label: 'All Equipment' },
    { value: 'available', label: 'Available Now' },
    { value: 'upcoming', label: 'Available Soon' }
  ];

  const conditionOptions = [
    { value: 'all', label: 'All Conditions' },
    { value: 'new', label: 'New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' }
  ];

  const deliveryOptions = [
    { value: 'all', label: 'All Delivery Options' },
    { value: 'same-day', label: 'Same Day' },
    { value: 'next-day', label: 'Next Day' },
    { value: 'standard', label: 'Standard (3-5 days)' }
  ];

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground font-headline">
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Price Range ($/month)
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.priceMin}
              onChange={(e) => onFilterChange('priceMin', e?.target?.value)}
              className="flex-1"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters?.priceMax}
              onChange={(e) => onFilterChange('priceMax', e?.target?.value)}
              className="flex-1"
            />
          </div>
        </div>

        <Select
          label="Availability"
          options={availabilityOptions}
          value={filters?.availability}
          onChange={(value) => onFilterChange('availability', value)}
        />

        <Select
          label="Condition"
          options={conditionOptions}
          value={filters?.condition}
          onChange={(value) => onFilterChange('condition', value)}
        />

        <Select
          label="Delivery Speed"
          options={deliveryOptions}
          value={filters?.delivery}
          onChange={(value) => onFilterChange('delivery', value)}
        />

        <div className="pt-4 border-t border-border">
          <label className="text-sm font-medium text-foreground mb-3 block">
            Features
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Insurance Accepted"
              checked={filters?.insuranceAccepted}
              onChange={(e) => onFilterChange('insuranceAccepted', e?.target?.checked)}
            />
            <Checkbox
              label="Setup Included"
              checked={filters?.setupIncluded}
              onChange={(e) => onFilterChange('setupIncluded', e?.target?.checked)}
            />
            <Checkbox
              label="24/7 Support"
              checked={filters?.support247}
              onChange={(e) => onFilterChange('support247', e?.target?.checked)}
            />
            <Checkbox
              label="Trial Period Available"
              checked={filters?.trialAvailable}
              onChange={(e) => onFilterChange('trialAvailable', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;