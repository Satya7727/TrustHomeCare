import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const quickLinks = [
    { path: '/homepage', label: 'Home' },
    { path: '/services-booking', label: 'Services' },
    { path: '/equipment-marketplace', label: 'Equipment' }
  ];

  const supportLinks = [
    { label: 'Help Center', action: () => console.log('Help Center') },
    { label: 'Contact Us', action: () => console.log('Contact Us') },
    { label: 'FAQs', action: () => console.log('FAQs') }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', action: () => console.log('Privacy Policy') },
    { label: 'Terms of Service', action: () => console.log('Terms of Service') },
    { label: 'HIPAA Compliance', action: () => console.log('HIPAA Compliance') }
  ];

  const socialLinks = [
    { icon: 'Facebook', label: 'Facebook', url: '#' },
    { icon: 'Twitter', label: 'Twitter', url: '#' },
    { icon: 'Linkedin', label: 'LinkedIn', url: '#' },
    { icon: 'Instagram', label: 'Instagram', url: '#' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/images/logo.jpg" alt="TrustHomeCare Logo" className="h-14 w-auto object-contain" />
              <span className="text-3xl font-semibold text-gray-900 font-headline">TrustHomeCare</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Providing compassionate healthcare services and quality medical equipment for your home care needs.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  aria-label={social?.label}
                  className="w-9 h-9 rounded-md bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors text-gray-700"
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 font-cta">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks?.map((link) => (
                <li key={link?.path}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 font-cta">Support</h3>
            <ul className="space-y-2">
              {supportLinks?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={link?.action}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 font-cta">Legal</h3>
            <ul className="space-y-2">
              {legalLinks?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={link?.action}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} TrustHomeCare. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="Shield" size={16} color="#10B981" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="Award" size={16} color="#0066CC" />
                <span>Certified Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-600 py-3">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-sm text-white">
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={16} />
              <span>official@trusthomescare.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;