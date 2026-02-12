import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '100,000+', label: 'Families Served', icon: '👨‍👩‍👧‍👦' },
    { number: 'All', label: 'Over India', icon: '🏙️' },
    { number: '4.9/5', label: 'Patient Rating', icon: '⭐' },
    { number: '35%', label: 'Referral Rate', icon: '📈' }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 md:p-8 text-center border border-white/20">
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/90 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
