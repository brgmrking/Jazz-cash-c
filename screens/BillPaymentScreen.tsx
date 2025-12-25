
import React, { useState } from 'react';

interface BillPaymentScreenProps {
  onBack: () => void;
  onComplete: (amount: number, provider: string) => void;
}

const BillPaymentScreen: React.FC<BillPaymentScreenProps> = ({ onBack, onComplete }) => {
  const providers = [
    { name: 'K-Electric', icon: '⚡' },
    { name: 'Sui Northern Gas', icon: '🔥' },
    { name: 'PTCL Landline', icon: '📞' },
    { name: 'Water Board', icon: '💧' }
  ];

  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [consumerNo, setConsumerNo] = useState('');
  const [billAmount] = useState(2450); // Mocked bill amount

  return (
    <div className="bg-white min-h-full flex flex-col">
      <div className="bg-jc-red pt-8 pb-4 px-6 flex items-center space-x-4">
        <button onClick={onBack} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-white font-bold text-lg">Bill Payment</h2>
      </div>

      <div className="flex-1 p-6">
        {!selectedProvider ? (
            <div className="space-y-4">
                <h3 className="text-gray-700 font-bold mb-4">Select Company</h3>
                <div className="grid grid-cols-2 gap-4">
                    {providers.map(p => (
                        <button 
                            key={p.name}
                            onClick={() => setSelectedProvider(p.name)}
                            className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center space-y-2 hover:bg-gray-100 active:scale-95 transition"
                        >
                            <span className="text-3xl">{p.icon}</span>
                            <span className="text-xs font-bold text-gray-700">{p.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        ) : (
            <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                        {providers.find(p => p.name === selectedProvider)?.icon}
                    </div>
                    <div>
                        <p className="font-bold">{selectedProvider}</p>
                        <button onClick={() => setSelectedProvider(null)} className="text-jc-red text-xs font-bold">Change</button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consumer Number</label>
                    <input
                        type="text"
                        value={consumerNo}
                        onChange={(e) => setConsumerNo(e.target.value)}
                        placeholder="e.g. 1002345678"
                        className="w-full p-4 bg-gray-50 border rounded-xl outline-none"
                    />
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-blue-800 text-sm font-bold">Outstanding Bill</span>
                        <span className="text-blue-800 font-bold">Rs. {billAmount.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-blue-600">Due date: 28 Oct 2023</p>
                </div>

                <button
                    onClick={() => onComplete(billAmount, selectedProvider)}
                    className="w-full py-4 bg-jc-red text-white font-bold rounded-xl shadow-lg"
                >
                    PAY BILL
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default BillPaymentScreen;
