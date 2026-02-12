import React from 'react';
import Icon from '../../../components/AppIcon';

const FounderSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Leadership</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <div className="text-center">
            <div className="mb-6">
              <img 
                src="/assets/images/salimsir.jpeg" 
                alt="Mohd Shaalim Khan" 
                className="rounded-full w-48 h-48 object-cover mx-auto shadow-lg"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2"></h3>
            <p className="text-xl text-blue-600 font-semibold mb-4">Founder & CEO</p>
            <p className="text-gray-700 text-center max-w-sm mx-auto">
              With a vision to transform home healthcare in India, Founder and CEO founded TrustHomeCare to make quality medical care accessible and affordable for every family at doorsteps.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={24} color="#0066CC" />
                <div>
                  <p className="font-semibold text-gray-900">Service Areas</p>
                  <p className="text-gray-700">All over India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Phone" size={24} color="#0066CC" />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-700">
                    <a href="tel:+919118899850" className="text-blue-600 hover:underline">
                      +91 9118899850
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Mail" size={24} color="#0066CC" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-700">
                    <a href="mailto:TrustHomeCare129@gmail.com" className="text-blue-600 hover:underline">
                      official@trusthomescare.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-6">Contact us today to learn more about our services and how we can help you</p>
          <a 
            href="tel:+919118899850"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
