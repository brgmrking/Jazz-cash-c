
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (phone: string, mpin: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [mpin, setMpin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10 && mpin.length === 4) {
      onLogin(phone, mpin);
    } else {
      alert('Please enter valid credentials (any 11-digit phone and 4-digit PIN)');
    }
  };

  return (
    <div className="h-full bg-white p-6 flex flex-col justify-between">
      <div className="mt-12">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-jc-red rounded-full flex items-center justify-center text-white text-3xl font-bold italic">
            JC
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8">Enter your mobile number and MPIN</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0300 1234567"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-jc-red focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">MPIN</label>
            <input
              type="password"
              maxLength={4}
              value={mpin}
              onChange={(e) => setMpin(e.target.value)}
              placeholder="****"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-jc-red focus:border-transparent transition tracking-widest text-center text-2xl"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-jc-red text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition active:scale-95"
          >
            LOGIN
          </button>
        </form>
      </div>

      <div className="text-center">
        <button className="text-jc-red text-sm font-semibold">Forgot MPIN?</button>
        <div className="mt-4 flex justify-center space-x-2">
            <span className="text-gray-400 text-xs">Don't have an account?</span>
            <button className="text-jc-red text-xs font-bold">Register Now</button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
