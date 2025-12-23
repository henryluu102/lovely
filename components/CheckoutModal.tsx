
import React, { useState } from 'react';
import { Kitchen, PaymentMethod, DeliveryType, UserProfile } from '../types';

interface CheckoutModalProps {
  kitchen: Kitchen;
  items: any[];
  walletBalance: number;
  mealCredits: number;
  deliveryType: DeliveryType;
  userProfile: UserProfile;
  onClose: () => void;
  onConfirm: (kitchen: Kitchen, items: any[], method: PaymentMethod, recipient: { name: string, phone: string, address: string }) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  kitchen, 
  items, 
  walletBalance, 
  mealCredits, 
  deliveryType, 
  userProfile,
  onClose, 
  onConfirm 
}) => {
  const [method, setMethod] = useState<PaymentMethod>(
    mealCredits > 0 ? PaymentMethod.MEAL_PACK : (walletBalance >= 45000 ? PaymentMethod.WALLET : PaymentMethod.CASH)
  );

  const [recipient, setRecipient] = useState({
    name: userProfile.name,
    phone: userProfile.phone,
    address: userProfile.address
  });
  
  const total = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = deliveryType === 'EXPRESS' ? 10000 : 5000;
  const finalTotal = total + deliveryFee;

  const handleConfirm = () => {
    if (!recipient.name || !recipient.phone || !recipient.address) {
      alert("Vui lòng điền đầy đủ thông tin người nhận cơm.");
      return;
    }
    onConfirm(kitchen, items, method, recipient);
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center bg-brand-brown-900/60 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] p-8 shadow-2xl animate-slideUp border border-brand-brown-100 overflow-y-auto max-h-[90vh] scrollbar-hide relative">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center mb-8 pb-4 border-b border-brand-brown-50">
           <div>
             <h3 className="text-2xl font-title font-black text-brand-brown-900">Thanh toán</h3>
             <p className="text-[10px] font-title font-bold text-brand-brown-400 uppercase tracking-widest mt-1">Neighbors Checkout</p>
           </div>
           <button onClick={onClose} className="p-3 bg-brand-brown-50 rounded-2xl text-brand-brown-400 hover:bg-brand-brown-100 transition-all active:scale-90">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>

        <div className="space-y-8">
           {/* Section: Recipient Information */}
           <div className="space-y-4">
              <p className="text-[10px] font-title font-black text-brand-brown-400 uppercase tracking-widest px-2 flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Thông tin người nhận cơm
              </p>
              <div className="bg-brand-brown-50/30 border border-brand-brown-50 rounded-[2rem] p-6 space-y-4">
                 <div>
                    <label className="block text-[9px] font-black text-brand-brown-300 uppercase tracking-widest mb-1.5 ml-1">Họ tên người nhận</label>
                    <input 
                      type="text"
                      value={recipient.name}
                      onChange={(e) => setRecipient({...recipient, name: e.target.value})}
                      className="w-full px-5 py-3 rounded-xl bg-white border border-brand-brown-50 focus:border-brand-orange-500 outline-none font-bold text-sm text-brand-brown-900 transition-all"
                      placeholder="Nhập tên người nhận"
                    />
                 </div>
                 <div>
                    <label className="block text-[9px] font-black text-brand-brown-300 uppercase tracking-widest mb-1.5 ml-1">Số điện thoại</label>
                    <input 
                      type="tel"
                      value={recipient.phone}
                      onChange={(e) => setRecipient({...recipient, phone: e.target.value})}
                      className="w-full px-5 py-3 rounded-xl bg-white border border-brand-brown-50 focus:border-brand-orange-500 outline-none font-bold text-sm text-brand-brown-900 transition-all"
                      placeholder="09xx xxx xxx"
                    />
                 </div>
                 <div>
                    <label className="block text-[9px] font-black text-brand-brown-300 uppercase tracking-widest mb-1.5 ml-1">Địa chỉ giao cơm</label>
                    <textarea 
                      value={recipient.address}
                      onChange={(e) => setRecipient({...recipient, address: e.target.value})}
                      className="w-full px-5 py-3 rounded-xl bg-white border border-brand-brown-50 focus:border-brand-orange-500 outline-none font-bold text-sm text-brand-brown-900 transition-all resize-none h-20"
                      placeholder="Số nhà, tên đường, phường..."
                    />
                 </div>
              </div>
           </div>

           {/* Summary Section */}
           <div className="bg-brand-brown-50/40 border border-brand-brown-50 rounded-[2.5rem] p-6 shadow-inner">
              <p className="text-[10px] font-title font-black text-brand-brown-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                Chi tiết đơn từ: {kitchen.kitchenName}
              </p>
              
              <div className="space-y-2.5">
                 {items.map((item, idx) => (
                   <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                         <span className="w-6 h-6 flex items-center justify-center bg-white rounded-lg text-[10px] font-title font-black text-brand-orange-500 shadow-sm">{item.quantity}</span>
                         <span className="text-brand-brown-800 font-body font-bold">{item.name}</span>
                      </div>
                      <span className="font-title font-black text-brand-brown-900">{(item.price * item.quantity).toLocaleString()}đ</span>
                   </div>
                 ))}
                 
                 <div className="flex justify-between items-center text-xs border-t border-brand-brown-100 pt-3 mt-3">
                    <span className="text-brand-brown-400 font-body font-bold italic">Phí ship {deliveryType === 'EXPRESS' ? 'Nhanh' : 'Tiết kiệm'}</span>
                    <span className="font-title font-bold text-brand-brown-900">{deliveryFee.toLocaleString()}đ</span>
                 </div>
                 
                 <div className="flex justify-between items-center pt-4 mt-2">
                    <span className="text-[10px] font-title font-black text-brand-brown-300 uppercase tracking-widest">Tổng số tiền</span>
                    <span className="text-3xl font-title font-black text-brand-orange-500 drop-shadow-sm">{finalTotal.toLocaleString()}đ</span>
                 </div>
              </div>
           </div>

           {/* Payment Methods Section */}
           <div className="space-y-4">
              <p className="text-[10px] font-title font-black text-brand-brown-400 uppercase tracking-widest px-2">Phương thức thanh toán</p>
              
              <div className="space-y-3">
                {mealCredits > 0 && (
                  <label className={`flex items-center justify-between p-5 rounded-[2rem] border-2 transition-all cursor-pointer relative ${method === PaymentMethod.MEAL_PACK ? 'border-brand-orange-500 bg-brand-orange-50 shadow-md' : 'border-brand-brown-50 hover:border-brand-orange-200'}`}>
                     <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-colors ${method === PaymentMethod.MEAL_PACK ? 'bg-brand-orange-500 text-white' : 'bg-brand-orange-100 text-brand-orange-600'}`}>🍱</div>
                        <div>
                           <p className="font-title font-black text-sm text-brand-brown-900">Gói Cơm Tháng</p>
                           <p className="text-[10px] text-brand-orange-600 font-title font-black uppercase tracking-tight">Còn {mealCredits} lượt ăn</p>
                        </div>
                     </div>
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${method === PaymentMethod.MEAL_PACK ? 'border-brand-orange-500 bg-brand-orange-500' : 'border-brand-brown-100'}`}>
                        {method === PaymentMethod.MEAL_PACK && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                     </div>
                     <input type="radio" name="pay" checked={method === PaymentMethod.MEAL_PACK} onChange={() => setMethod(PaymentMethod.MEAL_PACK)} className="hidden" />
                  </label>
                )}

                <label className={`flex items-center justify-between p-5 rounded-[2rem] border-2 transition-all cursor-pointer relative ${method === PaymentMethod.WALLET ? 'border-brand-orange-500 bg-brand-orange-50 shadow-md' : 'border-brand-brown-50 hover:border-brand-orange-200'}`}>
                   <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-colors ${method === PaymentMethod.WALLET ? 'bg-brand-orange-500 text-white' : 'bg-brand-honey-100 text-brand-honey-600'}`}>📱</div>
                      <div>
                         <p className="font-title font-black text-sm text-brand-brown-900">Ví Cơm Nhà (E-wallet)</p>
                         <p className="text-[10px] text-brand-honey-600 font-title font-black uppercase tracking-tight">Số dư: {walletBalance.toLocaleString()}đ</p>
                      </div>
                   </div>
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${method === PaymentMethod.WALLET ? 'border-brand-orange-500 bg-brand-orange-500' : 'border-brand-brown-100'}`}>
                      {method === PaymentMethod.WALLET && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                   </div>
                   <input type="radio" name="pay" checked={method === PaymentMethod.WALLET} onChange={() => setMethod(PaymentMethod.WALLET)} className="hidden" />
                </label>

                <label className={`flex items-center justify-between p-5 rounded-[2rem] border-2 transition-all cursor-pointer relative ${method === PaymentMethod.CASH ? 'border-brand-orange-500 bg-brand-orange-50 shadow-md' : 'border-brand-brown-50 hover:border-brand-orange-200'}`}>
                   <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-colors ${method === PaymentMethod.CASH ? 'bg-brand-orange-500 text-white' : 'bg-brand-brown-100 text-brand-brown-600'}`}>💵</div>
                      <div>
                         <p className="font-title font-black text-sm text-brand-brown-900">Tiền mặt khi nhận cơm</p>
                         <p className="text-[10px] text-brand-brown-400 font-body font-bold uppercase tracking-tight">Thanh toán cho Shipper</p>
                      </div>
                   </div>
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${method === PaymentMethod.CASH ? 'border-brand-orange-500 bg-brand-orange-500' : 'border-brand-brown-100'}`}>
                      {method === PaymentMethod.CASH && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                   </div>
                   <input type="radio" name="pay" checked={method === PaymentMethod.CASH} onChange={() => setMethod(PaymentMethod.CASH)} className="hidden" />
                </label>
              </div>
           </div>

           <div className="pt-6 pb-12">
              <button 
                onClick={handleConfirm}
                className="w-full py-6 bg-brand-orange-500 text-white rounded-[2.5rem] font-title font-black text-xl hover:bg-brand-orange-600 shadow-2xl shadow-brand-orange-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <span>Xác nhận đặt đơn</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
              
              <div className="flex flex-col items-center gap-3 mt-10">
                 <div className="flex -space-x-3">
                    <img className="w-8 h-8 rounded-full border-2 border-white bg-gray-100" src="https://i.pravatar.cc/100?u=1" alt="avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-white bg-gray-100" src="https://i.pravatar.cc/100?u=2" alt="avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-white bg-gray-100" src="https://i.pravatar.cc/100?u=3" alt="avatar" />
                 </div>
                 <p className="text-[10px] text-brand-brown-400 font-body font-bold text-center leading-relaxed max-w-[280px]">
                    Hơn 2,000 Neighbors đã tin dùng Cơm Nhà. Cảm ơn bạn đã ủng hộ cơm nhà làm!
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
