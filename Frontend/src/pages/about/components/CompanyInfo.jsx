import React from 'react';
import Icon from '../../../components/AppIcon';

const CompanyInfo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <img 
              src="/assets/images/aboutimage.jpg" 
              alt="About TrustHomeCare - Medical Equipment" 
              className="rounded-lg shadow-lg object-contain w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About TrustHomeCare</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Trust Home Care (THC) is India's most trusted home healthcare equipment provider, delivering compassionate, affordable, and reliable medical support right at people's doorsteps.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Born from deeply personal caregiving journeys, THC has emerged as a movement for dignity in aging, recovery, and home-based care.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              We stand apart with our pioneering rental-first technology, and purpose-driven leadership. We offer over 30-40 product variations per category,  with premium partnerships and in-house innovations designed for india's diverse patient needs.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What Sets Us Apart</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <Icon name="CheckCircle" size={20} color="#0066CC" />
                  <span>Premium partnerships & in-house innovations</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Icon name="CheckCircle" size={20} color="#0066CC" />
                  <span>Diverse product range for all patient needs</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Icon name="CheckCircle" size={20} color="#0066CC" />
                  <span>Patient-centric, technology-enabled care</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Icon name="CheckCircle" size={20} color="#0066CC" />
                  <span>Empathy-led healthcare delivery at home</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
