
import React from 'react';

interface MoreServicesScreenProps {
  onBack: () => void;
}

const MoreServicesScreen: React.FC<MoreServicesScreenProps> = ({ onBack }) => {
  const serviceCategories = [
    {
      title: 'Banking',
      items: [
        { label: 'Raast', icon: '🏦', color: 'bg-green-100 text-green-600' },
        { label: 'Bank Transfer', icon: '🏛️', color: 'bg-blue-100 text-blue-600' },
        { label: 'Debit Card', icon: '💳', color: 'bg-purple-100 text-purple-600' },
        { label: 'Loans', icon: '💰', color: 'bg-yellow-100 text-yellow-600' },
      ]
    },
    {
      title: 'Utilities & Lifestyle',
      items: [
        { label: 'Education', icon: '🎓', color: 'bg-orange-100 text-orange-600' },
        { label: 'Donations', icon: '🤝', color: 'bg-red-100 text-red-600' },
        { label: 'Insurance', icon: '🛡️', color: 'bg-indigo-100 text-indigo-600' },
        { label: 'Tickets', icon: '🎟️', color: 'bg-pink-100 text-pink-600' },
      ]
    },
    {
      title: 'Travel',
      items: [
        { label: 'Bus', icon: '🚌', color: 'bg-teal-100 text-teal-600' },
        { label: 'Flights', icon: '✈️', color: 'bg-cyan-100 text-cyan-600' },
        { label: 'Ride', icon: '🚗', color: 'bg-gray-100 text-gray-600' },
        { label: 'Hotel', icon: '🏨', color: 'bg-amber-100 text-amber-600' },
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-jc-red pt-8 pb-4 px-6 flex items-center space-x-4 sticky top-0 z-10">
        <button onClick={onBack} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-white font-bold text-lg">All Services</h2>
      </div>

      <div className="p-6 space-y-8">
          {serviceCategories.map((cat) => (
              <div key={cat.title}>
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">{cat.title}</h3>
                  <div className="grid grid-cols-4 gap-4">
                      {cat.items.map((item) => (
                          <button key={item.label} className="flex flex-col items-center group">
                              <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-2 group-active:scale-90 transition`}>
                                  {item.icon}
                              </div>
                              <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">{item.label}</span>
                          </button>
                      ))}
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default MoreServicesScreen;
