
import React, { useState } from 'react';
import { WalletTransaction } from '../types';

interface WalletCardProps {
  balance: number;
  transactions: WalletTransaction[];
  onTopUp: (amount: number) => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ balance, transactions, onTopUp }) => {
  const [showTopUpOptions, setShowTopUpOptions] = useState(false);
  const [activeStep, setActiveStep] = useState<'SELECT' | 'QR'>('SELECT');
  const [selectedAmount, setSelectedAmount] = useState(0);
  
  const presets = [50000, 100000, 200000, 500000];

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setActiveStep('QR');
  };

  const confirmTopUp = () => {
    onTopUp(selectedAmount);
    setShowTopUpOptions(false);
    setActiveStep('SELECT');
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-brand-orange-600 to-brand-orange-500 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <div className="w-64 h-64 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
             <div className="bg-brand-honey-500 px-3 py-1 rounded-lg text-[10px] font-black text-brand-brown-900 uppercase tracking-tighter">Verified Wallet</div>
             <img src="https://cdn-icons-png.flaticon.com/512/10433/10433048.png" className="w-8 h-8 invert opacity-50" />
          </div>
          <p className="text-brand-orange-100 text-xs font-bold uppercase tracking-widest mb-1">Số dư khả dụng</p>
          <h3 className="text-4xl font-black mb-10 tracking-tight">{balance.toLocaleString()}<span className="text-xl ml-1 text-brand-orange-100">đ</span></h3>
          
          <button 
            onClick={() => setShowTopUpOptions(true)}
            className="w-full bg-white text-brand-orange-600 py-4 rounded-2xl font-black text-sm hover:bg-brand-honey-500 hover:text-brand-brown-900 transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            Nạp tiền VietQR
          </button>
        </div>
      </div>

      {showTopUpOptions && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-brown-900/60 backdrop-blur-md p-4">
           <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 animate-slideUp border border-brand-brown-100 shadow-2xl">
              {activeStep === 'SELECT' ? (
                <>
                  <h4 className="text-xl font-black text-brand-brown-900 mb-6 text-center">Nạp tiền vào Ví</h4>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {presets.map(amount => (
                      <button 
                        key={amount}
                        onClick={() => handleSelectAmount(amount)}
                        className="py-4 px-2 border-2 border-brand-brown-50 rounded-2xl font-bold hover:border-brand-orange-500 hover:text-brand-orange-600 transition-all text-sm text-brand-brown-600"
                      >
                        {amount.toLocaleString()}đ
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setShowTopUpOptions(false)} className="w-full text-brand-brown-400 font-bold text-sm hover:text-brand-orange-500 transition-colors">Để sau</button>
                </>
              ) : (
                <div className="text-center space-y-6">
                   <div className="bg-brand-orange-50 py-2 px-4 rounded-full text-brand-orange-700 text-[10px] font-black inline-block uppercase tracking-wider">Chuyển khoản VietQR</div>
                   <h4 className="font-black text-brand-brown-900 text-lg">Quét mã để nạp {selectedAmount.toLocaleString()}đ</h4>
                   <div className="bg-white p-4 border border-brand-brown-100 rounded-3xl inline-block shadow-sm">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=COMNHA_TOPUP_${selectedAmount}`} 
                        className="w-40 h-40" 
                        alt="VietQR Mock"
                      />
                   </div>
                   <button 
                     onClick={confirmTopUp}
                     className="w-full py-4 bg-brand-orange-500 text-white rounded-2xl font-black hover:bg-brand-orange-600 transition-colors shadow-lg shadow-brand-orange-100"
                   >
                     Tôi đã chuyển khoản xong
                   </button>
                   <button onClick={() => setActiveStep('SELECT')} className="w-full text-brand-brown-400 font-bold text-sm hover:text-brand-brown-600">Quay lại</button>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default WalletCard;
