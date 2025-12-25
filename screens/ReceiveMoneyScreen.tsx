
import React, { useState } from 'react';

interface ReceiveMoneyScreenProps {
  phoneNumber: string;
  onBack: () => void;
  onSimulate: (amount: number) => void;
}

const ReceiveMoneyScreen: React.FC<ReceiveMoneyScreenProps> = ({ phoneNumber, onBack, onSimulate }) => {
  const [simulateAmount, setSimulateAmount] = useState('500');

  return (
    <div className="bg-white min-h-full flex flex-col">
      <div className="bg-jc-red pt-8 pb-4 px-6 flex items-center space-x-4">
        <button onClick={onBack} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-white font-bold text-lg">Receive Money</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="bg-gray-50 p-8 rounded-[40px] shadow-sm border border-gray-100 mb-8 w-full max-w-[300px] flex flex-col items-center">
          <p className="text-gray-800 font-bold mb-6">Scan my QR Code</p>
          <div className="w-48 h-48 bg-white p-2 rounded-xl shadow-inner mb-6 flex items-center justify-center border-2 border-jc-red">
            {/* Fake QR code using symbols */}
            <div className="grid grid-cols-4 gap-2 opacity-80">
                {[...Array(16)].map((_, i) => (
                    <div key={i} className={`w-6 h-6 rounded ${Math.random() > 0.5 ? 'bg-black' : 'bg-gray-100'}`}></div>
                ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-1">Mobile Number</p>
          <p className="text-lg font-bold text-jc-red">{phoneNumber}</p>
        </div>

        <div className="w-full space-y-4">
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                <p className="text-yellow-800 text-xs text-center font-medium">Share this QR code with others to receive money directly into your JazzCash account.</p>
            </div>

            <div className="pt-8 border-t border-gray-100">
                <p className="text-sm font-bold text-gray-700 mb-4 text-center">Simulate Receiving (Demo Mode)</p>
                <div className="flex space-x-2">
                    <input 
                        type="number"
                        value={simulateAmount}
                        onChange={(e) => setSimulateAmount(e.target.value)}
                        className="flex-1 p-3 bg-gray-50 border rounded-xl outline-none"
                        placeholder="Amount"
                    />
                    <button 
                        onClick={() => onSimulate(Number(simulateAmount))}
                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl"
                    >
                        SIMULATE
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveMoneyScreen;
