
import React from 'react';
import { User } from '../types';

interface RewardsScreenProps {
  user: User;
  onBack: () => void;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ user, onBack }) => {
  const vouchers = [
    { title: 'Free Mobile Load', cost: 1000, desc: 'Rs. 100 free load voucher', icon: '📱' },
    { title: 'Bill Rebate', cost: 2500, desc: 'Get Rs. 250 off on next bill', icon: '🧾' },
    { title: 'Movie Ticket', cost: 5000, desc: 'Buy 1 Get 1 free at Cinema', icon: '🎬' },
  ];

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-jc-red pt-8 pb-4 px-6 flex items-center space-x-4">
        <button onClick={onBack} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-white font-bold text-lg">JazzCash Rewards</h2>
      </div>

      <div className="p-6">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[32px] p-8 text-white shadow-xl mb-8 flex flex-col items-center">
              <span className="text-4xl mb-2">🏆</span>
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-80">Available Points</h3>
              <p className="text-5xl font-black mt-2">{user.points}</p>
              <p className="text-[10px] mt-4 font-bold bg-white/20 px-3 py-1 rounded-full uppercase">Elite Member</p>
          </div>

          <h3 className="font-bold text-gray-800 mb-4">Redeem Vouchers</h3>
          <div className="space-y-4">
              {vouchers.map(v => (
                  <div key={v.title} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100">
                      <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">{v.icon}</div>
                          <div>
                              <p className="font-bold text-sm text-gray-800">{v.title}</p>
                              <p className="text-gray-400 text-[10px]">{v.desc}</p>
                          </div>
                      </div>
                      <button 
                        onClick={() => alert('Demo: Insufficient points or Reward System simulation active.')}
                        className="px-3 py-1.5 bg-yellow-500 text-white text-[10px] font-bold rounded-lg shadow-sm"
                      >
                        {v.cost} PTS
                      </button>
                  </div>
              ))}
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-[32px] border border-blue-100">
              <h4 className="font-bold text-blue-800 text-sm mb-2">How to earn points?</h4>
              <ul className="text-[11px] text-blue-600 space-y-2 list-disc pl-4">
                  <li>Earn 1 point for every Rs. 100 spent.</li>
                  <li>Bonus 50 points on every Bill Payment.</li>
                  <li>Double points on Mobile Loads over Rs. 200.</li>
              </ul>
          </div>
      </div>
    </div>
  );
};

export default RewardsScreen;
