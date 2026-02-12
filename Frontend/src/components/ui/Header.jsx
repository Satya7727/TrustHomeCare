import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const services = [
    { id: 1, name: 'Physiotherapy', icon: 'Activity' },
    { id: 2, name: 'Nursing', icon: 'Heart' },
    { id: 3, name: 'Medical Equipment', icon: 'Zap' },
    { id: 4, name: 'Trained Attendants', icon: 'Users' },
    { id: 5, name: 'Lab Tests', icon: 'Microscope' },
    { id: 6, name: 'Elder Care', icon: 'User' },
    { id: 7, name: 'Doctor Consultation', icon: 'Stethoscope' },
    { id: 8, name: 'Mother & Baby Care', icon: 'Baby' },
    { id: 9, name: 'Diabetes Care', icon: 'Droplet' },
    { id: 10, name: 'Critical Care', icon: 'AlertCircle' },
    { id: 11, name: 'Covid Care', icon: 'Shield' },
    { id: 12, name: 'Vaccination', icon: 'Syringe' },
    { id: 13, name: 'Counselling', icon: 'MessageCircle' },
    { id: 14, name: 'Nutrition & Diet Consultation', icon: 'Apple' }
  ];

  const navigationItems = [
    { path: '/homepage', label: 'Home', icon: 'Home' },
    { path: '/about', label: 'About', icon: 'Info' },
    { path: '/services-booking', label: 'Services', icon: 'Calendar', hasDropdown: true },
    { path: '/equipment-marketplace', label: 'Equipment', icon: 'ShoppingCart' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('/homepage')}>
              <img src="/assets/images/logo.jpg" alt="TrustHomeCare Logo" className="h-12 w-auto object-contain" />
              <span className="text-3xl font-bold text-blue-900">TrustHomeCare</span>
            </div>

            <nav className="hidden md:flex gap-8 relative">
              {navigationItems?.map((item) => (
                <div key={item?.path} className="relative group">
                  <button
                    onClick={() => {
                      if (item?.hasDropdown) {
                        setIsServicesDropdownOpen(!isServicesDropdownOpen);
                      } else {
                        handleNavigation(item?.path);
                      }
                    }}
                    className={`text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                      isActivePath(item?.path)
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item?.label}
                    {item?.hasDropdown && <Icon name="ChevronDown" size={16} />}
                  </button>

                  {/* Services Dropdown */}
                  {item?.hasDropdown && (
                    <div className="absolute left-0 mt-2 w-auto min-w-max bg-white border-2 border-blue-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6 backdrop-blur-sm">
                      <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-t-2 border-l-2 border-blue-100 transform rotate-45"></div>
                      <div className="grid grid-cols-2 gap-4">
                        {services?.map((service) => (
                          <button
                            key={service?.id}
                            onClick={() => {
                              navigate('/services-booking');
                              setIsServicesDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200 text-left group/item hover:shadow-md"
                          >
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover/item:bg-blue-600 transition-all duration-200">
                              <Icon name={service?.icon} size={18} className="text-blue-600 group-hover/item:text-white transition-all duration-200" />
                            </div>
                            <span className="text-sm font-medium text-gray-800 group-hover/item:text-blue-700 transition-all duration-200 whitespace-nowrap">{service?.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex gap-3">
              <Button
                variant="default"
                size="sm"
                iconName="UserPlus"
                iconPosition="left"
                onClick={() => navigate('/services-booking')}
              >
                Book Care
              </Button>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-4">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <div key={item?.path}>
                  <button
                    onClick={() => {
                      if (item?.hasDropdown) {
                        setIsServicesDropdownOpen(!isServicesDropdownOpen);
                      } else {
                        handleNavigation(item?.path);
                      }
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      isActivePath(item?.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={item?.icon} size={20} />
                      <span className="font-medium">{item?.label}</span>
                    </div>
                    {item?.hasDropdown && (
                      <Icon 
                        name={isServicesDropdownOpen ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    )}
                  </button>

                  {/* Mobile Services Dropdown */}
                  {item?.hasDropdown && isServicesDropdownOpen && (
                    <div className="pl-4 mt-3 space-y-2 bg-gradient-to-b from-blue-50 to-blue-100/50 rounded-lg p-4 border border-blue-200">
                      {services?.map((service) => (
                        <button
                          key={service?.id}
                          onClick={() => {
                            navigate('/services-booking');
                            setIsServicesDropdownOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-blue-200 hover:shadow-md transition-all duration-200 text-left group/item"
                        >
                          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center group-hover/item:bg-blue-600 transition-all duration-200">
                            <Icon name={service?.icon} size={16} className="text-blue-600 group-hover/item:text-white transition-all duration-200" />
                          </div>
                          <span className="text-sm font-medium text-gray-800 group-hover/item:text-blue-700 transition-all duration-200">{service?.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="border-t pt-4 space-y-3">
              <Button
                variant="default"
                fullWidth
                iconName="UserPlus"
                iconPosition="left"
                onClick={() => {
                  handleNavigation('/services-booking');
                  setIsServicesDropdownOpen(false);
                }}
              >
                Book Care Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;