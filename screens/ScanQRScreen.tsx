
import React from 'react';

interface ScanQRScreenProps {
  onBack: () => void;
}

const ScanQRScreen: React.FC<ScanQRScreenProps> = ({ onBack }) => {
  return (
    <div className="bg-black min-h-full flex flex-col relative text-white">
      {/* Viewfinder simulation */}
      <div className="absolute inset-0 z-0 bg-gray-900 opacity-60">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-jc-red rounded-3xl animate-pulse">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-jc-red -translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-jc-red translate-x-1 -translate-y-1"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-jc-red -translate-x-1 translate-y-1"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-jc-red translate-x-1 translate-y-1"></div>
          </div>
      </div>

      <div className="relative z-10 p-6 flex-1 flex flex-col justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="p-2 bg-white/10 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <h2 className="font-bold text-lg">Scan any QR Code</h2>
          </div>

          <div className="text-center space-y-4 mb-32">
              <p className="text-sm font-medium opacity-80">Align QR code within the frame to scan</p>
              <div className="flex justify-center space-x-8">
                  <button className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zm2-14h6v2H9V7zm0 4h6v2H9v-2zm0 4h6v2H9v-2z"/></svg>
                      </div>
                      <span className="text-[10px] font-bold">Upload Gallery</span>
                  </button>
                  <button className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                      </div>
                      <span className="text-[10px] font-bold">Flashlight</span>
                  </button>
              </div>
          </div>

          <button 
            onClick={onBack}
            className="w-full py-4 bg-jc-red text-white font-bold rounded-2xl shadow-xl active:scale-95 transition"
          >
            CANCEL SCAN
          </button>
      </div>
    </div>
  );
};

export default ScanQRScreen;
