
import React, { useState, useEffect } from 'react';
import { User, Transaction, TransactionStatus } from '../types';

interface AdminPanelScreenProps {
  user: User;
  transactions: Transaction[];
  onBack: () => void;
}

type AdminTab = 'OVERVIEW' | 'USERS' | 'TRANSACTIONS' | 'SERVICES' | 'ANALYTICS' | 'LOGS';

const AdminPanelScreen: React.FC<AdminPanelScreenProps> = ({ user, transactions, onBack }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('OVERVIEW');
  const [mockUsers, setMockUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('admin_mock_users');
    if (storedUsers) {
      setMockUsers(JSON.parse(storedUsers));
    } else {
      const initialUsers: User[] = [
        { phoneNumber: '0300 1111111', name: 'Zaid Ali', balance: 5000, points: 100, isAdmin: false, isBalanceVisible: true, status: 'ACTIVE' },
        { phoneNumber: '0300 2222222', name: 'Sara Khan', balance: 12500, points: 250, isAdmin: false, isBalanceVisible: true, status: 'ACTIVE' },
        { phoneNumber: '0300 3333333', name: 'Umer Farooq', balance: 250, points: 10, isAdmin: false, isBalanceVisible: true, status: 'FROZEN' },
        { phoneNumber: '0300 4444444', name: 'Hania Amir', balance: 45000, points: 900, isAdmin: false, isBalanceVisible: true, status: 'ACTIVE' },
      ];
      setMockUsers(initialUsers);
      localStorage.setItem('admin_mock_users', JSON.stringify(initialUsers));
    }
  }, []);

  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);
  const activeUsersCount = mockUsers.filter(u => u.status === 'ACTIVE').length;

  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Total Volume</p>
          <p className="text-xl font-black text-green-400">Rs. {totalVolume.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Active Users</p>
          <p className="text-xl font-black text-blue-400">{activeUsersCount + 1}</p>
        </div>
        <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Transactions</p>
          <p className="text-xl font-black text-purple-400">{transactions.length}</p>
        </div>
        <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Revenue (Est.)</p>
          <p className="text-xl font-black text-yellow-400">Rs. {(totalVolume * 0.01).toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-black/20 p-6 rounded-[32px] border border-white/5">
        <h3 className="text-sm font-bold mb-4">System Pulse</h3>
        <div className="flex items-end space-x-2 h-32">
          {[40, 70, 45, 90, 65, 80, 55, 30, 85, 50, 60, 75].map((h, i) => (
            <div key={i} className="flex-1 bg-jc-red/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[8px] text-white/20 font-bold uppercase tracking-widest">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:59</span>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-2xl">
          <h3 className="text-xs font-bold text-white/40 mb-3 uppercase tracking-widest">Recent Activity</h3>
          <div className="space-y-2">
              <p className="text-[10px] text-green-400 font-mono">[09:15:22] ADMIN: Manual balance update (+Rs.500) user Sara Khan</p>
              <p className="text-[10px] text-white/60 font-mono">[08:42:10] SYSTEM: 12 transactions synced to local DB</p>
              <p className="text-[10px] text-yellow-400 font-mono">[07:15:01] SECURITY: User 0300 3333333 flagged for unusual activity</p>
          </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold">Mock User Database</h3>
          <button onClick={() => alert('New user placeholder')} className="text-[10px] bg-jc-red px-3 py-1 rounded-full font-bold">ADD USER</button>
      </div>
      <div className="space-y-3">
        {mockUsers.map(u => (
          <div key={u.phoneNumber} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                {u.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-bold text-sm">{u.name}</p>
                <p className="text-[10px] text-white/40">{u.phoneNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-xs">Rs. {u.balance.toLocaleString()}</p>
              <span className={`text-[8px] font-black px-1.5 rounded ${u.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {u.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-white/5">
          <button className="w-full py-3 bg-white/5 text-xs font-bold rounded-xl border border-white/10">LOAD MORE USERS</button>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold">Global Ledger</h3>
        <select className="bg-white/10 text-[10px] rounded px-2 py-1 outline-none border border-white/5">
          <option>All Status</option>
          <option>Success</option>
          <option>Failed</option>
          <option>Pending</option>
        </select>
      </div>
      <div className="space-y-2">
        {transactions.map(t => (
          <div key={t.id} className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold">{t.title}</p>
              <p className="text-[9px] text-white/40">{t.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-black">Rs. {t.amount}</p>
              <span className={`text-[8px] font-bold ${t.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}`}>{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h3 className="text-sm font-bold">Service Configuration</h3>
      <div className="space-y-4">
        {[
          { label: 'Money Transfer', key: 'transfer', status: true },
          { label: 'Bill Payments', key: 'bills', status: true },
          { label: 'Mobile Load', key: 'load', status: true },
          { label: 'Reward Redemptions', key: 'rewards', status: false },
        ].map(s => (
          <div key={s.key} className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
            <div>
                <p className="font-bold text-sm">{s.label}</p>
                <p className="text-[10px] text-white/40">Enable/Disable user access</p>
            </div>
            <button className={`w-12 h-6 rounded-full relative transition-colors ${s.status ? 'bg-green-500' : 'bg-white/10'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.status ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <label className="block text-[10px] font-bold text-white/40 uppercase mb-2">Global Transfer Limit (Daily)</label>
          <input type="number" defaultValue={50000} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-bold outline-none" />
      </div>
    </div>
  );

  return (
    <div className="bg-jc-dark min-h-full flex flex-col text-white">
      {/* Admin Top Header */}
      <div className="bg-jc-red pt-8 pb-4 px-6 flex items-center justify-between shadow-xl sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-white hover:scale-110 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h2 className="text-white font-black text-lg tracking-tight">ADMIN COMMAND</h2>
            <p className="text-[8px] text-white/60 font-bold uppercase tracking-widest">Level 4 Access • Secure</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-bold opacity-60">LIVE</span>
        </div>
      </div>

      {/* Admin Secondary Nav */}
      <div className="bg-black/40 p-2 overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-white/10">
          <div className="flex space-x-1">
              {(['OVERVIEW', 'USERS', 'TRANSACTIONS', 'SERVICES', 'ANALYTICS', 'LOGS'] as AdminTab[]).map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${activeTab === tab ? 'bg-jc-red text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    {tab}
                  </button>
              ))}
          </div>
      </div>

      {/* Main Admin Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'OVERVIEW' && renderOverview()}
        {activeTab === 'USERS' && renderUsers()}
        {activeTab === 'TRANSACTIONS' && renderTransactions()}
        {activeTab === 'SERVICES' && renderServices()}
        {activeTab === 'ANALYTICS' && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                <div className="text-6xl">📊</div>
                <h3 className="font-bold">Real-time Analytics</h3>
                <p className="text-xs px-10">Historical data charts and predictive growth metrics are processed every 24 hours.</p>
            </div>
        )}
        {activeTab === 'LOGS' && (
            <div className="space-y-2">
                <div className="bg-black/60 font-mono text-[9px] p-4 rounded-xl border border-white/10 text-green-400 space-y-1">
                    <p>[INFO] Server init v3.1.2 SUCCESS</p>
                    <p>[AUTH] Admin Session Started {new Date().toLocaleTimeString()}</p>
                    <p>[DATABASE] LOCAL_STORAGE: Integrity check PASSED</p>
                    <p>[LOG] System uptime: 12 days, 4 hours</p>
                    <p>[NETWORK] Mock API latency: 42ms</p>
                    <p className="text-yellow-400">[WARN] Debug mode active. Sandbox restrictions apply.</p>
                    <p className="animate-pulse">_</p>
                </div>
                <button 
                  onClick={() => { localStorage.clear(); window.location.reload(); }}
                  className="w-full mt-4 py-3 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-bold uppercase"
                >
                  NUKE ALL LOCAL DATA
                </button>
            </div>
        )}
      </div>

      {/* Admin Footer Status */}
      <div className="bg-black p-3 text-center border-t border-white/5">
          <p className="text-[8px] text-white/30 font-bold uppercase tracking-[0.3em]">JazzCash Demo • Superuser Control Panel</p>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AdminPanelScreen;
