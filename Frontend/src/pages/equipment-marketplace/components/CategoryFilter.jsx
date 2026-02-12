import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-soft">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 font-headline">
        Categories
      </h3>
      <div className="space-y-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`w-full flex items-center justify-between p-3 rounded-md transition-colors ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon 
                name={category?.icon} 
                size={20} 
                color={selectedCategory === category?.id ? '#FFFFFF' : 'var(--color-foreground)'}
              />
              <span className="text-sm font-medium">{category?.name}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              selectedCategory === category?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-background text-muted-foreground'
            }`}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;