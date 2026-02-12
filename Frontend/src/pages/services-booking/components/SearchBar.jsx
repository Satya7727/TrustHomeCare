import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-soft border border-border p-4 md:p-5 lg:p-6">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
            </div>
            <Input
              type="text"
              placeholder="Search for services, professionals, or specializations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
        </div>
        <Button
          variant="default"
          size="default"
          iconName="Search"
          iconPosition="left"
          onClick={onSearch}
          className="md:w-auto"
        >
          Search
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {['Nursing Care', 'Doctor Consultation', 'Physical Therapy', 'Emergency Care']?.map((term) => (
          <button
            key={term}
            onClick={() => {
              onSearchChange(term);
              onSearch();
            }}
            className="px-3 py-1 bg-muted hover:bg-primary hover:text-primary-foreground text-sm rounded-md transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;