import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <img 
              src="/assets/images/aboutimage.jpg" 
              alt="Book Your Service" 
              className="rounded-lg shadow-lg object-contain w-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Experience Quality Care?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Join thousands of families who trust TrustHomeCare for compassionate, affordable, and reliable home healthcare services. Start your journey to better health today.
            </p>
            <Link 
              to="/services-booking"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-fit"
            >
              Book Your Service Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
