import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-soft mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search medical equipment (e.g., wheelchair, oxygen concentrator)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="w-full lg:w-64">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
          />
        </div>
        <Button
          variant="default"
          iconName="Search"
          iconPosition="left"
          className="lg:w-auto"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;