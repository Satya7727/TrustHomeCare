import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EquipmentModal = ({ equipment, onClose, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [rentalDuration, setRentalDuration] = useState('1');
  const [purchaseOption, setPurchaseOption] = useState('rent');

  const rentalDurationOptions = [
    { value: '1', label: '1 Month' },
    { value: '3', label: '3 Months (5% off)' },
    { value: '6', label: '6 Months (10% off)' },
    { value: '12', label: '12 Months (15% off)' }
  ];

  const purchaseOptions = [
    { value: 'rent', label: 'Rent Equipment' },
    { value: 'buy', label: 'Purchase Equipment' }
  ];

  const calculateTotal = () => {
    if (purchaseOption === 'buy') {
      return equipment?.purchasePrice;
    }
    const months = parseInt(rentalDuration);
    let discount = 0;
    if (months === 3) discount = 0.05;
    if (months === 6) discount = 0.10;
    if (months === 12) discount = 0.15;
    return (equipment?.rentalPrice * months * (1 - discount))?.toFixed(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-strong max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between z-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-headline">
            Equipment Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <Icon name="X" size={24} color="var(--color-foreground)" />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-muted mb-4">
                <Image
                  src={equipment?.gallery?.[selectedImage]}
                  alt={`${equipment?.name} view ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {equipment?.gallery?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-16 md:h-20 overflow-hidden rounded-md border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary' :'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${equipment?.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-headline">
                  {equipment?.name}
                </h3>
                <p className="text-base text-muted-foreground mb-4">
                  {equipment?.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        color={i < Math.floor(equipment?.rating) ? "#FFB800" : "#E0E0E0"}
                        className={i < Math.floor(equipment?.rating) ? "fill-current" : ""}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {equipment?.rating} ({equipment?.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-3 font-cta">
                  Key Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {equipment?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Icon name="Check" size={16} color="var(--color-success)" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-3 font-cta">
                  Specifications
                </h4>
                <div className="space-y-2">
                  {equipment?.specifications?.map((spec, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{spec?.label}:</span>
                      <span className="text-foreground font-medium">{spec?.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <Select
                  label="Choose Option"
                  options={purchaseOptions}
                  value={purchaseOption}
                  onChange={setPurchaseOption}
                  className="mb-4"
                />

                {purchaseOption === 'rent' && (
                  <Select
                    label="Rental Duration"
                    options={rentalDurationOptions}
                    value={rentalDuration}
                    onChange={setRentalDuration}
                    className="mb-4"
                  />
                )}

                <div className="bg-primary/10 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm text-muted-foreground">
                      {purchaseOption === 'buy' ? 'Purchase Price' : 'Total Rental Cost'}
                    </span>
                    <span className="text-3xl font-bold text-primary">
                      ${calculateTotal()}
                    </span>
                  </div>
                  {purchaseOption === 'rent' && parseInt(rentalDuration) > 1 && (
                    <p className="text-xs text-success">
                      You save ${(equipment?.rentalPrice * parseInt(rentalDuration) - calculateTotal())?.toFixed(2)} with this duration!
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    variant="default"
                    size="lg"
                    fullWidth
                    iconName="ShoppingCart"
                    iconPosition="left"
                    onClick={() => {
                      onAddToCart({
                        ...equipment,
                        selectedOption: purchaseOption,
                        duration: purchaseOption === 'rent' ? rentalDuration : null,
                        total: calculateTotal()
                      });
                      onClose();
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                    onClick={() => window.location.href = 'tel:1-800-CARE'}
                  >
                    Call for Consultation
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Shield" size={16} color="var(--color-success)" />
                  <span>Insurance Accepted</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Truck" size={16} color="var(--color-trust)" />
                  <span>{equipment?.delivery} Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Wrench" size={16} color="var(--color-warning)" />
                  <span>Setup Included</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h4 className="text-lg font-semibold text-foreground mb-4 font-headline">
              What's Included
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipment?.included?.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item?.title}</p>
                    <p className="text-xs text-muted-foreground">{item?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentModal;