
import React from 'react';
import { User, Transaction, AppScreen } from '../types';
import { SERVICE_ICONS } from '../constants';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
  onNavigate: (screen: AppScreen) => void;
  onToggleBalance: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions, onNavigate, onToggleBalance }) => {
  const services = [
    { id: AppScreen.SEND_MONEY, label: 'Money Transfer', icon: SERVICE_ICONS.SEND_MONEY, color: 'bg-orange-50 text-orange-600' },
    { id: AppScreen.MOBILE_LOAD, label: 'Mobile Load', icon: SERVICE_ICONS.MOBILE_LOAD, color: 'bg-green-50 text-green-600' },
    { id: AppScreen.BILL_PAYMENT, label: 'Bill Payment', icon: SERVICE_ICONS.BILL_PAYMENT, color: 'bg-blue-50 text-blue-600' },
    { id: AppScreen.RECEIVE_MONEY, label: 'Receive Money', icon: SERVICE_ICONS.RAAST, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="bg-gray-50 pb-6 min-h-full">
      {/* Top Header */}
      <div className="bg-jc-red pt-8 pb-16 px-6 rounded-b-[40px] relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 overflow-hidden shadow-lg">
               <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="avatar" />
            </div>
            <div onClick={() => user.isAdmin && onNavigate(AppScreen.ADMIN_PANEL)} className="cursor-pointer">
                <p className="text-white/70 text-xs">Assalam-o-Alaikum</p>
                <p className="text-white font-bold flex items-center">
                    {user.name} 
                    {user.isAdmin && <span className="ml-2 text-[8px] bg-yellow-400 text-gray-900 px-1 rounded font-black">ADMIN</span>}
                </p>
            </div>
          </div>
          <div className="flex space-x-3">
             <button onClick={() => alert('Demo Notifications')} className="p-2 bg-white/10 rounded-full"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg></button>
             <button onClick={() => alert('Search feature coming soon')} className="p-2 bg-white/10 rounded-full"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="absolute left-6 right-6 top-[110px] bg-white rounded-3xl p-6 shadow-xl flex flex-col items-center">
            <p className="text-gray-400 text-sm font-medium mb-1">Current Balance</p>
            <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-extrabold text-gray-800">
                  {user.isBalanceVisible ? `Rs. ${user.balance.toLocaleString()}` : 'Rs. •••••••'}
                </h2>
                <button onClick={onToggleBalance} className="text-gray-400">
                    {user.isBalanceVisible ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L4.573 4.574m14.854 14.854l-5.808-5.808m3.047-7.224A9.953 9.953 0 0121.542 12c-1.274 4.057-5.064 7-9.542 7-1.274 0-2.483-.244-3.587-.688M12 5c4.478 0 8.268 2.943 9.542 7a9.97 9.97 0 01-1.563 3.029"/></svg>
                    )}
                </button>
            </div>
            <div className="flex space-x-4 mt-4">
                <button onClick={() => alert('Demo Cash In')} className="px-6 py-2 bg-jc-red text-white rounded-full text-xs font-bold shadow-md active:scale-95 transition">
                    Add Cash
                </button>
                <button onClick={() => onNavigate(AppScreen.REWARDS)} className="px-6 py-2 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center shadow-sm active:scale-95 transition">
                    <span className="mr-1">⭐</span> {user.points} Points
                </button>
            </div>
        </div>
      </div>

      <div className="mt-20 px-6">
        {/* Services Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
            {services.map((service) => (
                <button
                    key={service.label}
                    onClick={() => onNavigate(service.id)}
                    className="flex flex-col items-center group"
                >
                    <div className={`${service.color} p-4 rounded-2xl mb-2 transition-transform group-active:scale-90 shadow-sm`}>
                        {service.icon}
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">
                        {service.label}
                    </span>
                </button>
            ))}
        </div>

        {/* Promotions Ads Section */}
        <div className="space-y-4 mb-8">
            <div 
              onClick={() => onNavigate(AppScreen.REWARDS)}
              className="overflow-hidden rounded-2xl h-40 bg-gray-900 relative shadow-xl cursor-pointer group"
            >
                <img 
                    src="https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                    alt="Promotion"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jc-red via-transparent to-transparent flex flex-col justify-end p-5">
                    <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Exclusive Rewards</p>
                    <h3 className="text-white text-lg font-black leading-tight">Earn 2X Reward Points on every Bill Payment!</h3>
                    <p className="text-white/60 text-[10px] mt-2">Limited time offer valid till Oct 31st.</p>
                </div>
            </div>
            
            <div 
              onClick={() => alert('Demo Coupon Code: JAZZCASH30')}
              className="overflow-hidden rounded-3xl h-24 bg-jc-dark relative shadow-lg cursor-pointer flex items-center p-4 border border-white/5"
            >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">🍕</div>
                <div className="ml-4 flex-1">
                    <p className="text-white font-black text-sm uppercase tracking-tighter">Foodpanda Promo</p>
                    <p className="text-white/60 text-[10px] font-medium">Get flat 30% discount today</p>
                </div>
                <button className="bg-jc-red text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg active:scale-95 transition">ORDER</button>
            </div>
        </div>

        {/* Recent Transactions Header */}
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-black text-sm uppercase tracking-wider">Recent Activity</h3>
            <button 
                onClick={() => onNavigate(AppScreen.HISTORY)}
                className="text-jc-red text-xs font-bold hover:underline"
            >
                View All
            </button>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
            {transactions.length > 0 ? transactions.map((txn) => (
                <div key={txn.id} className="bg-white p-4 rounded-[24px] flex items-center justify-between shadow-sm border border-gray-100 hover:border-jc-red/20 transition-colors">
                    <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-inner ${
                            txn.type === 'RECEIVED' ? 'bg-green-500' :
                            txn.type === 'BILL' ? 'bg-blue-500' :
                            txn.type === 'LOAD' ? 'bg-orange-500' : 'bg-jc-red'
                        }`}>
                            {txn.icon}
                        </div>
                        <div>
                            <p className="text-gray-800 font-black text-sm leading-tight">{txn.title}</p>
                            <p className="text-gray-400 text-[10px] font-bold mt-0.5">{txn.subtitle}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`font-black text-sm ${txn.type === 'RECEIVED' ? 'text-green-600' : 'text-gray-800'}`}>
                            {txn.type === 'RECEIVED' ? '+' : '-'} Rs. {txn.amount.toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-[9px] font-bold uppercase">{txn.date}</p>
                    </div>
                </div>
            )) : (
              <div className="text-center py-10 opacity-30 font-bold">No transactions yet</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
