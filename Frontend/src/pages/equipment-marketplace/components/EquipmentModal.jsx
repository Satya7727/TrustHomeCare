import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EquipmentModal = ({ equipment, onClose, onBookNow }) => {
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
    if (purchaseOption === 'buy') return equipment?.purchasePrice;

    const months = parseInt(rentalDuration);
    let discount = 0;
    if (months === 3) discount = 0.05;
    if (months === 6) discount = 0.10;
    if (months === 12) discount = 0.15;

    return (equipment?.rentalPrice * months * (1 - discount)).toFixed(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-strong max-w-6xl w-full max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Equipment Details</h2>
          <button onClick={onClose}>
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            
            <div>
              <div className="h-80 rounded-lg overflow-hidden bg-muted mb-4">
                <Image
                  src={equipment?.gallery?.[selectedImage]}
                  alt={equipment?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            
            <div>
              <h3 className="text-2xl font-bold mb-2">{equipment?.name}</h3>
              <p className="text-muted-foreground mb-4">{equipment?.description}</p>

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
                <span className="text-3xl font-bold text-primary">
                  ${calculateTotal()}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  fullWidth
                  iconName="Calendar"
                  onClick={() => {
  onBookNow(equipment);
  onClose();            
}}

                >
                  Book Now
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  iconName="Phone"
                  onClick={() => window.location.href = 'tel:1-800-CARE'}
                >
                  Call for Consultation
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentModal;
