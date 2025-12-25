
import React, { useState } from 'react';

interface MobileLoadScreenProps {
  onBack: () => void;
  onComplete: (amount: number, operator: string, phone: string) => void;
}

const MobileLoadScreen: React.FC<MobileLoadScreenProps> = ({ onBack, onComplete }) => {
  const operators = [
    { name: 'Jazz', color: 'bg-red-600' },
    { name: 'Telenor', color: 'bg-blue-500' },
    { name: 'Zong', color: 'bg-green-500' },
    { name: 'Ufone', color: 'bg-orange-500' }
  ];

  const [selectedOp, setSelectedOp] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [showMpin, setShowMpin] = useState(false);
  const [mpin, setMpin] = useState('');

  const handleMpinSubmit = () => {
    if (mpin.length === 4) {
      onComplete(Number(amount), selectedOp!, phone);
    }
  };

  return (
    <div className="bg-white min-h-full flex flex-col">
      <div className="bg-jc-red pt-8 pb-4 px-6 flex items-center space-x-4">
        <button onClick={onBack} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-white font-bold text-lg">Mobile Load</h2>
      </div>

      <div className="flex-1 p-6">
        {!showMpin ? (
          <div className="space-y-8">
              <div>
                  <h3 className="text-gray-700 font-bold mb-4">Select Network</h3>
                  <div className="flex justify-between">
                      {operators.map(op => (
                          <button 
                              key={op.name}
                              onClick={() => setSelectedOp(op.name)}
                              className="flex flex-col items-center space-y-2"
                          >
                              <div className={`${op.color} w-14 h-14 rounded-full border-4 ${selectedOp === op.name ? 'border-gray-800 scale-110' : 'border-transparent'} transition flex items-center justify-center text-white font-bold text-[10px]`}>
                                  {op.name}
                              </div>
                              <span className={`text-xs ${selectedOp === op.name ? 'font-bold text-gray-800' : 'text-gray-400'}`}>{op.name}</span>
                          </button>
                      ))}
                  </div>
              </div>

              <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                      <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="03xx xxxxxxx"
                          className="w-full p-4 bg-gray-50 border rounded-xl outline-none"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Min. Rs. 50"
                          className="w-full p-4 bg-gray-50 border rounded-xl outline-none font-bold text-xl"
                      />
                  </div>
              </div>

              <button
                  disabled={!selectedOp || phone.length < 10 || Number(amount) < 50}
                  onClick={() => setShowMpin(true)}
                  className="w-full py-4 bg-jc-red text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
              >
                  PROCEED
              </button>
          </div>
        ) : (
          <div className="space-y-6">
             <h3 className="text-gray-700 font-bold text-center">Enter MPIN</h3>
             <p className="text-center text-sm text-gray-400">Security check for Rs. {amount}</p>
             <input
              type="password"
              maxLength={4}
              value={mpin}
              onChange={(e) => setMpin(e.target.value)}
              placeholder="****"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center text-3xl font-bold tracking-widest outline-none"
            />
            <button
              onClick={handleMpinSubmit}
              disabled={mpin.length < 4}
              className="w-full py-4 bg-jc-red text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
            >
              CONFIRM
            </button>
            <button onClick={() => setShowMpin(false)} className="w-full py-2 text-jc-red text-sm font-bold">Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileLoadScreen;
