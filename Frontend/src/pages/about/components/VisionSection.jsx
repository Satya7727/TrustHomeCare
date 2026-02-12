import React from 'react';
import Icon from '../../../components/AppIcon';

const VisionSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
              <Icon name="Eye" size={24} color="#FFFFFF" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Vision</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            TrustHomeCare aims to deliver quality 'out-of-hospital' medical care, which is affordable and easily accessible to patients, thus improving the quality of life of patients and families.
          </p>
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-800 font-semibold mb-3">We believe in:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-amber-500">✓</span> Dignity in aging and recovery
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-amber-500">✓</span> Home-based compassionate care
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-amber-500">✓</span> Affordable and accessible healthcare
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-amber-500">✓</span> Technology-enabled solutions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
