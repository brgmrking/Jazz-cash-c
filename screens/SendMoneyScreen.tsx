
import React, { useState } from 'react';

interface SendMoneyScreenProps {
  onBack: () => void;
  onComplete: (amount: number, name: string, phone: string) => void;
}

const SendMoneyScreen: React.FC<SendMoneyScreenProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [mpin, setMpin] = useState('');

  const handleNext = () => {
    if (step === 1 && phone.length >= 10) setStep(2);
    else if (step === 2 && name.trim().length > 0) setStep(3);
    else if (step === 3 && Number(amount) > 0) setStep(4);
  };

  const handleConfirm = () => {
    setStep(5); // Enter MPIN step
  };

  const handleMpinSubmit = () => {
    if (mpin.length === 4) {
      onComplete(Number(amount), name, phone);
    } else {
      alert('Please enter a 4-digit MPIN');
    }
  };

  return (
    <div className="bg-white min-h-full flex flex-col">
      <div className="bg-jc-red pt-8 pb-4 px-6 flex items-center space-x-4">
        <button onClick={onBack} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-white font-bold text-lg">Send Money</h2>
      </div>

      <div className="flex-1 p-6">
        {step === 1 && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-gray-700 font-bold">Enter Recipient's Mobile Number</h3>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03xx xxxxxxx"
              className="w-full p-4 bg-gray-50 border rounded-xl text-xl focus:ring-2 focus:ring-jc-red outline-none"
            />
            <p className="text-xs text-gray-400">Search from contacts or enter a new number manually</p>
            <button
              onClick={handleNext}
              disabled={phone.length < 10}
              className="w-full py-4 bg-jc-red text-white font-bold rounded-xl disabled:opacity-50"
            >
              NEXT
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-gray-700 font-bold">Recipient's Full Name</h3>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-jc-red/10 text-jc-red rounded-full flex items-center justify-center font-bold text-lg">
                    {phone.slice(-2)}
                </div>
                <div>
                    <p className="text-xs text-gray-400">To Number</p>
                    <p className="font-bold">{phone}</p>
                </div>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-4 bg-gray-50 border rounded-xl text-xl focus:ring-2 focus:ring-jc-red outline-none"
            />
            <button
              onClick={handleNext}
              disabled={!name.trim()}
              className="w-full py-4 bg-jc-red text-white font-bold rounded-xl"
            >
              NEXT
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
             <div className="bg-gray-50 p-4 rounded-xl flex items-center space-x-4">
                <div className="w-12 h-12 bg-jc-red rounded-full flex items-center justify-center text-white font-bold">
                    {name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-xs text-gray-500">{phone}</p>
                </div>
            </div>
            <h3 className="text-gray-700 font-bold">How much do you want to send?</h3>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rs.</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full pl-12 p-4 bg-gray-50 border rounded-xl text-2xl font-bold focus:ring-2 focus:ring-jc-red outline-none"
              />
            </div>
            <button
              onClick={handleNext}
              disabled={!amount}
              className="w-full py-4 bg-jc-red text-white font-bold rounded-xl"
            >
              NEXT
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-gray-50 p-6 rounded-2xl border-dashed border-2 border-gray-200">
                <p className="text-center text-gray-400 text-sm mb-2">Review Transfer</p>
                <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">To</span>
                    <span className="font-bold">{name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Number</span>
                    <span className="font-bold">{phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-bold">Rs. {Number(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-500">Fee</span>
                    <span className="font-bold text-green-600">Rs. 0</span>
                </div>
            </div>
            
            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-jc-red text-white font-bold rounded-xl shadow-lg"
            >
              CONFIRM TRANSFER
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-gray-700 font-bold text-center">Verify Identity</h3>
            <p className="text-center text-sm text-gray-400">Enter your 4-digit JazzCash MPIN to authorize this transaction to <span className="text-gray-800 font-bold">{name}</span></p>
            <input
              type="password"
              maxLength={4}
              value={mpin}
              onChange={(e) => setMpin(e.target.value)}
              placeholder="****"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-jc-red focus:border-transparent transition tracking-widest text-center text-3xl font-bold"
            />
            <button
              onClick={handleMpinSubmit}
              disabled={mpin.length < 4}
              className="w-full py-4 bg-jc-red text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
            >
              AUTHORIZE
            </button>
            <button onClick={() => setStep(4)} className="w-full py-2 text-jc-red text-sm font-bold">Cancel</button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default SendMoneyScreen;
