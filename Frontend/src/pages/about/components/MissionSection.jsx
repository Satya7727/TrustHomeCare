import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Icon name="Target" size={24} color="#FFFFFF" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            To provide the best care to every patient through a strong focus on service excellence and simplified processes guided by evidence-based medical care and technology.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span className="text-gray-700">Preventive Care</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span className="text-gray-700">Pre/Post Natal Care</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span className="text-gray-700">Post-operative Care</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span className="text-gray-700">Critical Care</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span className="text-gray-700">Chronic Disease Management</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span className="text-gray-700">Elder Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
