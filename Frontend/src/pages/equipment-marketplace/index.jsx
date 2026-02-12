import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import CategoryFilter from './components/CategoryFilter';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import EquipmentCard from './components/EquipmentCard';
import EquipmentModal from './components/EquipmentModal';
import TrustBanner from './components/TrustBanner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EquipmentMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    availability: 'all',
    condition: 'all',
    delivery: 'all',
    insuranceAccepted: false,
    setupIncluded: false,
    support247: false,
    trialAvailable: false
  });

  const categories = [
    { id: 'all', name: 'All Equipment', icon: 'Grid3x3', count: 48 },
    { id: 'mobility', name: 'Mobility Aids', icon: 'Accessibility', count: 12 },
    { id: 'respiratory', name: 'Respiratory', icon: 'Wind', count: 8 },
    { id: 'monitoring', name: 'Monitoring', icon: 'Activity', count: 10 },
    { id: 'therapy', name: 'Therapy Equipment', icon: 'Heart', count: 7 },
    { id: 'daily-living', name: 'Daily Living', icon: 'Home', count: 11 }
  ];

  const equipmentData = [
    {
      id: 1,
      name: 'Premium Electric Wheelchair',
      description: 'Advanced mobility solution with joystick control, adjustable seating, and long-lasting battery for indoor and outdoor use.',
      category: 'mobility',
      image: 'https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg',
      imageAlt: 'Modern electric wheelchair with black cushioned seat and joystick control in bright medical facility',
      gallery: [
        'https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg',
        'https://images.unsplash.com/photo-1581594549595-35f6edc7b762',
        'https://images.pixabay.com/photo/2017/08/06/12/52/wheelchair-2592993_1280.jpg',
        'https://images.pexels.com/photos/7551663/pexels-photo-7551663.jpeg'
      ],
      rentalPrice: 299,
      purchasePrice: 3499,
      rating: 4.8,
      reviews: 127,
      availability: 'available',
      availabilityText: 'Available Now',
      condition: 'New',
      delivery: 'Same Day',
      isNew: true,
      features: [
        'Joystick Control',
        '20 Mile Range',
        'Adjustable Seating',
        'USB Charging Port',
        'LED Headlights',
        'Anti-Tip Wheels'
      ],
      specifications: [
        { label: 'Weight Capacity', value: '300 lbs' },
        { label: 'Battery Life', value: '20 miles' },
        { label: 'Charge Time', value: '6-8 hours' },
        { label: 'Seat Width', value: '18-22 inches' },
        { label: 'Weight', value: '85 lbs' }
      ],
      included: [
        { title: 'Free Delivery', description: 'Same-day delivery available' },
        { title: 'Professional Setup', description: 'Expert installation included' },
        { title: 'Training Session', description: '1-hour usage training' },
        { title: '24/7 Support', description: 'Round-the-clock assistance' },
        { title: 'Maintenance Kit', description: 'Basic maintenance supplies' },
        { title: 'Insurance Billing', description: 'We handle insurance claims' }
      ]
    },
    {
      id: 2,
      name: 'Portable Oxygen Concentrator',
      description: 'Lightweight and quiet oxygen therapy device with continuous and pulse flow modes, perfect for active lifestyles.',
      category: 'respiratory',
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926',
      imageAlt: 'Compact white portable oxygen concentrator with digital display and carrying handle on medical table',
      gallery: [
        'https://images.unsplash.com/photo-1631549916768-4119b2e5f926',
        'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg',
        'https://images.pixabay.com/photo/2020/04/18/08/33/oxygen-5058706_1280.jpg',
        'https://images.unsplash.com/photo-1584515933487-779824d29309'
      ],
      rentalPrice: 189,
      purchasePrice: 2299,
      rating: 4.9,
      reviews: 203,
      availability: 'available',
      availabilityText: 'Available Now',
      condition: 'Excellent',
      delivery: 'Next Day',
      isNew: false,
      features: [
        'Pulse & Continuous Flow',
        'Ultra Quiet Operation',
        'Lightweight Design',
        'Long Battery Life',
        'FAA Approved',
        'Easy Controls'
      ],
      specifications: [
        { label: 'Weight', value: '4.8 lbs' },
        { label: 'Flow Rate', value: '0.5-3 LPM' },
        { label: 'Battery Life', value: 'Up to 8 hours' },
        { label: 'Noise Level', value: '38 dB' },
        { label: 'Oxygen Purity', value: '90% ± 3%' }
      ],
      included: [
        { title: 'Carrying Case', description: 'Durable travel bag included' },
        { title: 'Extra Battery', description: 'Backup battery pack' },
        { title: 'AC/DC Adapters', description: 'Home and car charging' },
        { title: 'Cannula Set', description: 'Multiple sizes included' },
        { title: 'User Manual', description: 'Comprehensive guide' },
        { title: 'Warranty', description: '2-year manufacturer warranty' }
      ]
    },
    {
      id: 3,
      name: 'Hospital Bed with Adjustable Features',
      description: 'Full-electric hospital bed with head and foot adjustment, side rails, and comfortable medical-grade mattress.',
      category: 'daily-living',
      image: 'https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg',
      imageAlt: 'Modern adjustable hospital bed with white linens and metal side rails in clean medical room',
      gallery: [
        'https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg',
        'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb',
        'https://images.pixabay.com/photo/2017/10/04/09/56/hospital-2815439_1280.jpg',
        'https://images.pexels.com/photos/7659568/pexels-photo-7659568.jpeg'
      ],
      rentalPrice: 249,
      purchasePrice: 2899,
      rating: 4.7,
      reviews: 156,
      availability: 'limited',
      availabilityText: 'Limited Stock',
      condition: 'New',
      delivery: 'Standard',
      isNew: true,
      features: [
        'Full Electric Control',
        'Adjustable Height',
        'Side Rails Included',
        'Medical Mattress',
        'Lockable Wheels',
        'Remote Control'
      ],
      specifications: [
        { label: 'Weight Capacity', value: '450 lbs' },
        { label: 'Bed Length', value: '80 inches' },
        { label: 'Bed Width', value: '36 inches' },
        { label: 'Height Range', value: '16-24 inches' },
        { label: 'Mattress Type', value: 'Pressure relief foam' }
      ],
      included: [
        { title: 'Medical Mattress', description: 'Pressure-relief foam mattress' },
        { title: 'Side Rails', description: 'Full-length safety rails' },
        { title: 'Remote Control', description: 'Easy adjustment control' },
        { title: 'Assembly Service', description: 'Professional setup included' },
        { title: 'Bedding Set', description: 'Hospital-grade linens' },
        { title: 'Maintenance', description: 'Monthly check-ups included' }
      ]
    },
    {
      id: 4,
      name: 'Blood Pressure Monitor System',
      description: 'Professional-grade automatic blood pressure monitor with large display, memory storage, and irregular heartbeat detection.',
      category: 'monitoring',
      image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0',
      imageAlt: 'Digital blood pressure monitor with white cuff and LCD display showing readings on wooden surface',
      gallery: [
        'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0',
        'https://images.pexels.com/photos/7659571/pexels-photo-7659571.jpeg',
        'https://images.pixabay.com/photo/2017/08/25/00/24/blood-pressure-2679754_1280.jpg',
        'https://images.unsplash.com/photo-1584515933487-779824d29309'
      ],
      rentalPrice: 45,
      purchasePrice: 129,
      rating: 4.6,
      reviews: 342,
      availability: 'available',
      availabilityText: 'Available Now',
      condition: 'New',
      delivery: 'Same Day',
      isNew: false,
      features: [
        'Large LCD Display',
        '120 Memory Storage',
        'Irregular Heartbeat Detection',
        'WHO Indicator',
        'Automatic Inflation',
        'Carrying Case'
      ],
      specifications: [
        { label: 'Measurement Range', value: '0-299 mmHg' },
        { label: 'Accuracy', value: '±3 mmHg' },
        { label: 'Cuff Size', value: '8.7-16.5 inches' },
        { label: 'Memory', value: '120 readings' },
        { label: 'Power', value: 'AC adapter or batteries' }
      ],
      included: [
        { title: 'Universal Cuff', description: 'Fits most arm sizes' },
        { title: 'AC Adapter', description: 'Wall power included' },
        { title: 'Batteries', description: '4 AA batteries' },
        { title: 'Carrying Case', description: 'Protective storage case' },
        { title: 'User Guide', description: 'Detailed instructions' },
        { title: 'Warranty', description: '3-year warranty' }
      ]
    },
    {
      id: 5,
      name: 'Rollator Walker with Seat',
      description: 'Durable four-wheel walker with padded seat, storage basket, and hand brakes for safe and comfortable mobility.',
      category: 'mobility',
      image: 'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg',
      imageAlt: 'Red four-wheel rollator walker with padded seat and storage basket in hospital corridor',
      gallery: [
        'https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg',
        'https://images.unsplash.com/photo-1581594549595-35f6edc7b762',
        'https://images.pixabay.com/photo/2017/08/06/12/52/walker-2592994_1280.jpg',
        'https://images.pexels.com/photos/7551660/pexels-photo-7551660.jpeg'
      ],
      rentalPrice: 79,
      purchasePrice: 189,
      rating: 4.5,
      reviews: 289,
      availability: 'available',
      availabilityText: 'Available Now',
      condition: 'Excellent',
      delivery: 'Next Day',
      isNew: false,
      features: [
        'Padded Seat & Backrest',
        'Storage Basket',
        'Hand Brakes',
        'Adjustable Height',
        'Foldable Design',
        '8-inch Wheels'
      ],
      specifications: [
        { label: 'Weight Capacity', value: '300 lbs' },
        { label: 'Seat Height', value: '21 inches' },
        { label: 'Handle Height', value: '31-37 inches' },
        { label: 'Weight', value: '15.5 lbs' },
        { label: 'Folded Width', value: '9.5 inches' }
      ],
      included: [
        { title: 'Storage Basket', description: 'Removable under-seat basket' },
        { title: 'Padded Seat', description: 'Comfortable rest seat' },
        { title: 'Hand Brakes', description: 'Easy-lock braking system' },
        { title: 'Reflectors', description: 'Safety reflectors included' },
        { title: 'Assembly Tools', description: 'Easy setup tools' },
        { title: 'User Manual', description: 'Setup and safety guide' }
      ]
    },
    {
      id: 6,
      name: 'TENS Unit Pain Relief Device',
      description: 'Dual-channel TENS unit for drug-free pain management with multiple therapy modes and adjustable intensity levels.',
      category: 'therapy',
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb',
      imageAlt: 'Compact TENS unit device with digital display and electrode pads on white medical surface',
      gallery: [
        'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb',
        'https://images.pexels.com/photos/7659572/pexels-photo-7659572.jpeg',
        'https://images.pixabay.com/photo/2017/08/25/00/24/tens-2679755_1280.jpg',
        'https://images.unsplash.com/photo-1584515933487-779824d29309'
      ],
      rentalPrice: 59,
      purchasePrice: 149,
      rating: 4.4,
      reviews: 198,
      availability: 'available',
      availabilityText: 'Available Now',
      condition: 'New',
      delivery: 'Same Day',
      isNew: false,
      features: [
        'Dual Channel',
        '12 Therapy Modes',
        'Adjustable Intensity',
        'Timer Function',
        'Rechargeable Battery',
        'Portable Design'
      ],
      specifications: [
        { label: 'Channels', value: '2 independent channels' },
        { label: 'Modes', value: '12 pre-set programs' },
        { label: 'Intensity Levels', value: '20 levels' },
        { label: 'Timer', value: '5-60 minutes' },
        { label: 'Battery Life', value: 'Up to 10 hours' }
      ],
      included: [
        { title: 'Electrode Pads', description: '4 reusable pads included' },
        { title: 'Lead Wires', description: '2 dual-lead wires' },
        { title: 'USB Charger', description: 'Rechargeable battery' },
        { title: 'Carrying Pouch', description: 'Travel case included' },
        { title: 'User Manual', description: 'Therapy guide included' },
        { title: 'Warranty', description: '1-year warranty' }
      ]
    },
    {
      id: 7,
      name: 'Nebulizer Compressor System',
      description: 'Compact and efficient nebulizer for respiratory treatments with fast medication delivery and quiet operation.',
      category: 'respiratory',
      image: 'https://images.pexels.com/photos/7659573/pexels-photo-7659573.jpeg',
      imageAlt: 'White compact nebulizer machine with mask and tubing on medical examination table',
      gallery: [
        'https://images.pexels.com/photos/7659573/pexels-photo-7659573.jpeg',
        'https://images.unsplash.com/photo-1631549916768-4119b2e5f926',
        'https://images.pixabay.com/photo/2020/04/18/08/33/nebulizer-5058707_1280.jpg',
        'https://images.pexels.com/photos/7659574/pexels-photo-7659574.jpeg'
      ],
      rentalPrice: 69,
      purchasePrice: 179,
      rating: 4.7,
      reviews: 267,
      availability: 'available',
      availabilityText: 'Available Now',
      condition: 'New',
      delivery: 'Next Day',
      isNew: false,
      features: [
        'Fast Treatment Time',
        'Quiet Operation',
        'Compact Design',
        'Easy to Clean',
        'Adult & Child Masks',
        'Carrying Case'
      ],
      specifications: [
        { label: 'Particle Size', value: '0.5-10 μm' },
        { label: 'Nebulization Rate', value: '0.3 ml/min' },
        { label: 'Noise Level', value: '< 60 dB' },
        { label: 'Weight', value: '3.3 lbs' },
        { label: 'Power', value: '110V AC' }
      ],
      included: [
        { title: 'Adult Mask', description: 'Standard adult mask' },
        { title: 'Child Mask', description: 'Pediatric mask included' },
        { title: 'Mouthpiece', description: 'Alternative delivery method' },
        { title: 'Tubing', description: '6-foot air tubing' },
        { title: 'Carrying Case', description: 'Storage and travel case' },
        { title: 'Filters', description: '5 replacement filters' }
      ]
    },
    {
      id: 8,
      name: 'Shower Chair with Back Support',
      description: 'Sturdy shower chair with padded seat, backrest, and non-slip rubber tips for safe and comfortable bathing.',
      category: 'daily-living',
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309',
      imageAlt: 'White shower chair with padded seat and backrest featuring non-slip rubber feet in bathroom',
      gallery: [
        'https://images.unsplash.com/photo-1584515933487-779824d29309',
        'https://images.pexels.com/photos/7659575/pexels-photo-7659575.jpeg',
        'https://images.pixabay.com/photo/2017/08/06/12/52/shower-chair-2592995_1280.jpg',
        'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb'
      ],
      rentalPrice: 49,
      purchasePrice: 119,
      rating: 4.6,
      reviews: 312,
      availability: 'available',
      availabilityText: 'Available Now',
      condition: 'Excellent',
      delivery: 'Same Day',
      isNew: false,
      features: [
        'Padded Seat',
        'Backrest Support',
        'Non-Slip Rubber Tips',
        'Adjustable Height',
        'Drainage Holes',
        'Tool-Free Assembly'
      ],
      specifications: [
        { label: 'Weight Capacity', value: '300 lbs' },
        { label: 'Seat Height', value: '14-19 inches' },
        { label: 'Seat Width', value: '16 inches' },
        { label: 'Weight', value: '8 lbs' },
        { label: 'Material', value: 'Aluminum frame' }
      ],
      included: [
        { title: 'Padded Seat', description: 'Comfortable cushioned seat' },
        { title: 'Backrest', description: 'Supportive back panel' },
        { title: 'Rubber Tips', description: 'Non-slip feet included' },
        { title: 'Assembly Guide', description: 'Easy setup instructions' },
        { title: 'Warranty', description: '1-year warranty' },
        { title: 'Cleaning Kit', description: 'Maintenance supplies' }
      ]
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      availability: 'all',
      condition: 'all',
      delivery: 'all',
      insuranceAccepted: false,
      setupIncluded: false,
      support247: false,
      trialAvailable: false
    });
  };

  const handleAddToCart = (equipment) => {
    setCartItems(prev => [...prev, equipment]);
    alert(`${equipment?.name} added to cart!`);
  };

  const filteredEquipment = useMemo(() => {
    let filtered = equipmentData;

    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(item => item?.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered?.filter(item =>
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (filters?.priceMin) {
      filtered = filtered?.filter(item => item?.rentalPrice >= parseFloat(filters?.priceMin));
    }

    if (filters?.priceMax) {
      filtered = filtered?.filter(item => item?.rentalPrice <= parseFloat(filters?.priceMax));
    }

    if (filters?.availability !== 'all') {
      filtered = filtered?.filter(item => item?.availability === filters?.availability);
    }

    if (filters?.condition !== 'all') {
      filtered = filtered?.filter(item => item?.condition?.toLowerCase() === filters?.condition);
    }

    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.rentalPrice - b?.rentalPrice);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.rentalPrice - a?.rentalPrice);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <div className="bg-gradient-to-r from-primary to-secondary py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-headline">
                Medical Equipment Marketplace
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Browse our comprehensive selection of certified medical equipment for rent or purchase with flexible delivery options
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <TrustBanner />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredEquipment?.length}</span> results
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              iconName="SlidersHorizontal"
              iconPosition="left"
              className="lg:hidden"
            >
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className={`lg:col-span-1 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
              />
            </div>

            <div className="lg:col-span-3">
              {filteredEquipment?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {filteredEquipment?.map((equipment) => (
                    <EquipmentCard
                      key={equipment?.id}
                      equipment={equipment}
                      onViewDetails={setSelectedEquipment}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-lg p-12 text-center shadow-soft">
                  <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-headline">
                    No Equipment Found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms to find what you need
                  </p>
                  <Button
                    variant="default"
                    onClick={() => {
                      setSearchQuery('');
                      handleResetFilters();
                      setSelectedCategory('all');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 bg-card rounded-lg p-6 md:p-8 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={32} color="var(--color-primary)" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-cta">
                  Need Help Choosing?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our equipment specialists are available 24/7 to help you find the right solution
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = 'tel:1-800-CARE'}
                >
                  Call 1-800-CARE-NOW
                </Button>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} color="var(--color-success)" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-cta">
                  Insurance Coverage
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We work with most insurance providers and handle all billing paperwork
                </p>
                <Button variant="outline" size="sm">
                  Check Coverage
                </Button>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-trust/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={32} color="var(--color-trust)" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-cta">
                  Fast Delivery
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Same-day and next-day delivery available with professional setup included
                </p>
                <Button variant="outline" size="sm">
                  Delivery Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {selectedEquipment && (
        <EquipmentModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default EquipmentMarketplace;