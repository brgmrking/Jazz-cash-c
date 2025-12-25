
import React from 'react';
import { Transaction } from '../types';

interface HistoryScreenProps {
  transactions: Transaction[];
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ transactions, onBack }) => {
  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-jc-red pt-8 pb-4 px-6 sticky top-0 z-10">
        <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <h2 className="text-white font-bold text-lg">Transaction History</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {transactions.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No transactions found</div>
        ) : (
            transactions.map((txn) => (
                <div key={txn.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg ${
                            txn.type === 'RECEIVED' ? 'bg-green-500' :
                            txn.type === 'BILL' ? 'bg-blue-500' :
                            txn.type === 'LOAD' ? 'bg-orange-500' : 'bg-jc-red'
                        }`}>
                            {txn.icon}
                        </div>
                        <div>
                            <p className="text-gray-800 font-bold leading-tight">{txn.title}</p>
                            <p className="text-gray-400 text-xs">{txn.subtitle}</p>
                            <p className="text-gray-300 text-[10px] mt-1">{txn.time}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`font-bold ${txn.type === 'RECEIVED' ? 'text-green-600' : 'text-gray-800'}`}>
                            {txn.type === 'RECEIVED' ? '+' : '-'} Rs. {txn.amount.toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-xs">{txn.date}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded">Completed</span>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
