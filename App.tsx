
import React, { useState, useEffect } from 'react';
import { AppScreen, Transaction, User } from './types';
import { INITIAL_BALANCE } from './constants';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import SendMoneyScreen from './screens/SendMoneyScreen';
import ReceiveMoneyScreen from './screens/ReceiveMoneyScreen';
import BillPaymentScreen from './screens/BillPaymentScreen';
import MobileLoadScreen from './screens/MobileLoadScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import SuccessScreen from './screens/SuccessScreen';
import ScanQRScreen from './screens/ScanQRScreen';
import MoreServicesScreen from './screens/MoreServicesScreen';
import RewardsScreen from './screens/RewardsScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.LOGIN);
  const [user, setUser] = useState<User>({
    phoneNumber: '0300 1234567',
    name: 'M. Ahmed',
    balance: INITIAL_BALANCE,
    isBalanceVisible: true,
    points: 450,
    isAdmin: false,
    status: 'ACTIVE',
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<Transaction | null>(null);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('jc_transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      const initial: Transaction[] = [
        {
          id: 'JC123456789',
          type: 'SENT',
          title: 'Money Transfer',
          subtitle: 'to Zeeshan Khan',
          amount: 1500,
          date: 'Oct 24, 2023',
          time: '10:30 AM',
          icon: 'S',
          recipientNumber: '0312 9876543',
          status: 'SUCCESS'
        }
      ];
      setTransactions(initial);
      localStorage.setItem('jc_transactions', JSON.stringify(initial));
    }

    const savedBalance = localStorage.getItem('jc_balance');
    const savedPoints = localStorage.getItem('jc_points');
    if (savedBalance) {
      setUser(prev => ({ ...prev, balance: Number(savedBalance), points: Number(savedPoints || 450) }));
    }
  }, []);

  const updateBalance = (amount: number, type: 'ADD' | 'SUBTRACT') => {
    const newBalance = type === 'ADD' ? user.balance + amount : user.balance - amount;
    const newPoints = user.points + Math.floor(amount / 100);
    setUser(prev => ({ ...prev, balance: newBalance, points: newPoints }));
    localStorage.setItem('jc_balance', String(newBalance));
    localStorage.setItem('jc_points', String(newPoints));
  };

  const addTransaction = (txn: Omit<Transaction, 'id' | 'date' | 'time' | 'status'>): Transaction => {
    const now = new Date();
    const newTxn: Transaction = {
      ...txn,
      id: 'JC' + Math.floor(Math.random() * 1000000000).toString(),
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'SUCCESS'
    };
    const updated = [newTxn, ...transactions];
    setTransactions(updated);
    localStorage.setItem('jc_transactions', JSON.stringify(updated));
    return newTxn;
  };

  const toggleBalance = () => {
    setUser(prev => ({ ...prev, isBalanceVisible: !prev.isBalanceVisible }));
  };

  const handleLogin = (phone: string, mpin: string) => {
    const isAdmin = phone === '03226670776' && mpin === '0000';
    setUser(prev => ({ 
      ...prev, 
      phoneNumber: phone, 
      isAdmin, 
      name: isAdmin ? 'System Admin' : prev.name,
      balance: isAdmin ? 999999 : prev.balance
    }));
    setIsLoggedIn(true);
    setCurrentScreen(AppScreen.HOME);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen(AppScreen.LOGIN);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.LOGIN:
        return <LoginScreen onLogin={handleLogin} />;
      case AppScreen.HOME:
        return <Dashboard user={user} transactions={transactions.slice(0, 3)} onNavigate={setCurrentScreen} onToggleBalance={toggleBalance} />;
      case AppScreen.SEND_MONEY:
        return <SendMoneyScreen onBack={() => setCurrentScreen(AppScreen.HOME)} onComplete={(amount, name, phone) => {
          updateBalance(amount, 'SUBTRACT');
          const txn = addTransaction({ type: 'SENT', title: 'Money Transfer', subtitle: `to ${name}`, amount, icon: 'S', recipientNumber: phone });
          setLastReceipt(txn);
          setCurrentScreen(AppScreen.SUCCESS);
        }} />;
      case AppScreen.RECEIVE_MONEY:
        return <ReceiveMoneyScreen phoneNumber={user.phoneNumber} onBack={() => setCurrentScreen(AppScreen.HOME)} onSimulate={(amount) => {
          updateBalance(amount, 'ADD');
          const txn = addTransaction({ type: 'RECEIVED', title: 'Payment Received', subtitle: 'via QR Scan', amount, icon: 'R' });
          setLastReceipt(txn);
          setCurrentScreen(AppScreen.SUCCESS);
        }} />;
      case AppScreen.BILL_PAYMENT:
        return <BillPaymentScreen onBack={() => setCurrentScreen(AppScreen.HOME)} onComplete={(amount, provider) => {
          updateBalance(amount, 'SUBTRACT');
          const txn = addTransaction({ type: 'BILL', title: `${provider} Bill`, subtitle: 'Payment Success', amount, icon: 'B' });
          setLastReceipt(txn);
          setCurrentScreen(AppScreen.SUCCESS);
        }} />;
      case AppScreen.MOBILE_LOAD:
        return <MobileLoadScreen onBack={() => setCurrentScreen(AppScreen.HOME)} onComplete={(amount, operator, phone) => {
          updateBalance(amount, 'SUBTRACT');
          const txn = addTransaction({ type: 'LOAD', title: `${operator} Load`, subtitle: 'Prepaid Topup', amount, icon: 'L', recipientNumber: phone });
          setLastReceipt(txn);
          setCurrentScreen(AppScreen.SUCCESS);
        }} />;
      case AppScreen.HISTORY:
        return <HistoryScreen transactions={transactions} onBack={() => setCurrentScreen(AppScreen.HOME)} />;
      case AppScreen.PROFILE:
        return <ProfileScreen user={user} onLogout={handleLogout} onBack={() => setCurrentScreen(AppScreen.HOME)} onNavigate={setCurrentScreen} />;
      case AppScreen.SUCCESS:
        return <SuccessScreen receipt={lastReceipt!} onDone={() => setCurrentScreen(AppScreen.HOME)} />;
      case AppScreen.SCAN_QR:
        return <ScanQRScreen onBack={() => setCurrentScreen(AppScreen.HOME)} />;
      case AppScreen.MORE_SERVICES:
        return <MoreServicesScreen onBack={() => setCurrentScreen(AppScreen.HOME)} />;
      case AppScreen.REWARDS:
        return <RewardsScreen user={user} onBack={() => setCurrentScreen(AppScreen.HOME)} />;
      case AppScreen.ADMIN_PANEL:
        return <AdminPanelScreen user={user} transactions={transactions} onBack={() => setCurrentScreen(AppScreen.HOME)} />;
      default:
        return <Dashboard user={user} transactions={transactions} onNavigate={setCurrentScreen} onToggleBalance={toggleBalance} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50 overflow-hidden shadow-2xl relative">
      <div className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </div>
      {isLoggedIn && currentScreen !== AppScreen.LOGIN && currentScreen !== AppScreen.SUCCESS && (
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  );
};

export default App;
