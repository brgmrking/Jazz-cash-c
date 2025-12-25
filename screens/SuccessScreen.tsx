
import React, { useEffect, useState } from 'react';
import { Transaction } from '../types';

interface SuccessScreenProps {
  receipt: Transaction;
  onDone: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ receipt, onDone }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    alert('Receipt saved to Gallery!');
  };

  return (
    <div className="h-full bg-jc-red flex flex-col items-center justify-center p-6 text-white overflow-y-auto">
      {!showDetails ? (
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 mb-6 relative">
            <svg className="w-full h-full text-white animate-[bounce_1s_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <div className="absolute inset-0 rounded-full border-4 border-white/20 scale-150 animate-ping"></div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-white/70">Processing your request...</p>
        </div>
      ) : (
        <div className="w-full max-w-sm animate-[fadeIn_0.5s_ease-out]">
          <div className="bg-white rounded-[32px] p-6 text-gray-800 shadow-2xl relative overflow-hidden">
            {/* Top Zig Zag Decoration Placeholder */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-jc-red/10"></div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Transaction Successful</h3>
              <p className="text-3xl font-black text-gray-800 mt-2">Rs. {receipt.amount.toLocaleString()}</p>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 text-xs font-medium">Recipient</span>
                <div className="text-right">
                    <p className="font-bold text-sm">{receipt.subtitle.replace('to ', '')}</p>
                    {receipt.recipientNumber && <p className="text-gray-400 text-[10px]">{receipt.recipientNumber}</p>}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs font-medium">Type</span>
                <span className="font-bold text-sm">{receipt.title}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs font-medium">Date & Time</span>
                <span className="font-bold text-sm text-right">{receipt.date} {receipt.time}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs font-medium">Transaction ID</span>
                <span className="font-mono text-[10px] font-bold bg-gray-50 px-2 py-1 rounded">{receipt.id}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs font-medium">Fee</span>
                <span className="font-bold text-sm text-green-600">Rs. 0.00</span>
              </div>
            </div>

            <div className="mt-8 border-t border-dashed border-gray-200 pt-6 flex flex-col space-y-3">
               <button 
                onClick={handleSave}
                className="w-full py-3 bg-gray-800 text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                 <span>Save as Screenshot</span>
               </button>
               <button className="w-full py-3 bg-jc-red/10 text-jc-red rounded-xl font-bold text-sm">Share Receipt</button>
            </div>
          </div>

          <button 
            onClick={onDone}
            className="w-full mt-6 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-2xl transition"
          >
            BACK TO HOME
          </button>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SuccessScreen;
