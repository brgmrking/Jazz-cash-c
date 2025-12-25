
import React from 'react';
import { User, AppScreen } from '../types';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
  onNavigate: (screen: AppScreen) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, onBack, onNavigate }) => {
  const menuItems = [
    { label: 'Edit Profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg> },
    { label: 'Change MPIN', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> },
    { label: 'Limits & Upgrades', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> },
    { label: 'Reward Points', icon: <span className="text-sm">⭐</span>, onClick: () => onNavigate(AppScreen.REWARDS) },
  ];

  if (user.isAdmin) {
      menuItems.push({ 
          label: 'Admin Control Panel', 
          icon: <span className="text-sm">🛠️</span>, 
          onClick: () => onNavigate(AppScreen.ADMIN_PANEL) 
      });
  }

  return (
    <div className="bg-gray-50 min-h-full">
       <div className="bg-jc-red pt-8 pb-16 px-6 relative">
          <div className="flex items-center space-x-4 mb-8">
            <button onClick={onBack} className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <h2 className="text-white font-bold text-lg">My Account</h2>
          </div>

          <div className="flex flex-col items-center">
             <div className="w-24 h-24 bg-white rounded-full p-1 border-4 border-white/30 shadow-xl overflow-hidden mb-4">
                <img src={`https://picsum.photos/seed/${user.name}/200`} className="w-full h-full rounded-full object-cover" />
             </div>
             <h3 className="text-white text-xl font-bold flex items-center">
                {user.name}
                {user.isAdmin && <span className="ml-2 text-[8px] bg-yellow-400 text-gray-900 px-1 rounded font-black">ADMIN</span>}
             </h3>
             <p className="text-white/70 text-sm">{user.phoneNumber}</p>
          </div>
       </div>

       <div className="px-6 -mt-8 relative">
          <div className="bg-white rounded-3xl p-2 shadow-lg mb-6 overflow-hidden">
             {menuItems.map((item, idx) => (
                <button 
                    key={item.label} 
                    onClick={item.onClick || (() => alert('Demo Feature'))}
                    className={`w-full flex items-center justify-between p-4 ${idx !== menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                   <div className="flex items-center space-x-3 text-gray-700">
                      <span className="text-jc-red">{item.icon}</span>
                      <span className="font-semibold text-sm">{item.label}</span>
                   </div>
                   <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
             ))}
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs font-bold uppercase">App Version</span>
                  <span className="text-gray-800 text-xs font-bold">3.1.2 (STABLE DEMO)</span>
              </div>
              <p className="text-[10px] text-gray-300">This is a visual replica for demonstration purposes only. No real financial data is used.</p>
          </div>

          <button 
            onClick={onLogout}
            className="w-full py-4 bg-gray-100 text-jc-red font-bold rounded-2xl border-2 border-jc-red/10 flex items-center justify-center space-x-2 active:bg-red-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            <span>LOGOUT</span>
          </button>
       </div>
    </div>
  );
};

export default ProfileScreen;
