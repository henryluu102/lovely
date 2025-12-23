
import React from 'react';
import { Kitchen, CartItem, DeliveryType } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  kitchen: Kitchen | null;
  items: CartItem[];
  onUpdateQuantity: (mealId: string, delta: number) => void;
  onRemoveItem: (mealId: string) => void;
  deliveryType: DeliveryType;
  setDeliveryType: (type: DeliveryType) => void;
  scheduledTime: string;
  setScheduledTime: (time: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, onClose, kitchen, items, onUpdateQuantity, onRemoveItem, 
  deliveryType, setDeliveryType, scheduledTime, setScheduledTime,
  notes, setNotes, onCheckout 
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = deliveryType === 'EXPRESS' ? 10000 : 5000;

  return (
    <div className="fixed inset-0 z-[150] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-brown-900/40 backdrop-blur-sm animate-fadeIn" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideLeft border-l border-brand-brown-100">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 p-6 border-b border-brand-brown-50 flex items-center justify-between bg-white/80 backdrop-blur-md">
          <div>
            <h3 className="text-xl font-title font-black text-brand-brown-900">Giỏ cơm nhà</h3>
            {kitchen && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-brand-orange-500 rounded-full"></span>
                <p className="text-[10px] font-title font-bold text-brand-orange-600 uppercase tracking-widest">Bếp: {kitchen.kitchenName}</p>
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-brand-brown-50 rounded-2xl transition-all text-brand-brown-400 active:scale-90">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-10 scrollbar-hide pb-32">
          {items.length > 0 ? (
            <>
              {/* Section 1: Meals & Quantity */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-title font-black text-brand-brown-400 uppercase tracking-widest">Món ăn đã chọn</p>
                  <span className="text-[10px] font-title font-black text-brand-orange-500 bg-brand-orange-50 px-2 py-0.5 rounded-md">
                    {items.length} món
                  </span>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.mealId} className="flex gap-4 items-center bg-white p-2 pr-4 rounded-[2rem] border border-brand-brown-50 shadow-sm hover:border-brand-orange-100 transition-all group">
                      <div className="relative shrink-0">
                        <img src={item.image} className="w-20 h-20 rounded-[1.5rem] object-cover shadow-sm" alt={item.name} />
                        <button 
                          onClick={() => onRemoveItem(item.mealId)} 
                          className="absolute -top-1 -left-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-brand-brown-300 hover:text-red-500 hover:scale-110 transition-all border border-brand-brown-50"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="text-sm font-title font-black text-brand-brown-900 mb-1 truncate">{item.name}</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-body font-black text-brand-orange-500">{item.price.toLocaleString()}đ</p>
                          <div className="flex items-center gap-2.5 bg-brand-brown-50 p-1 rounded-2xl">
                            <button 
                              onClick={() => onUpdateQuantity(item.mealId, -1)} 
                              className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-brand-brown-500 hover:text-brand-orange-500 font-black transition-all shadow-sm active:scale-90"
                            >
                              -
                            </button>
                            <span className="text-xs font-title font-black w-6 text-center text-brand-brown-900">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.mealId, 1)} 
                              className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-brand-brown-500 hover:text-brand-orange-500 font-black transition-all shadow-sm active:scale-90"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Delivery Methods */}
              <div className="space-y-4">
                <p className="text-[10px] font-title font-black text-brand-brown-400 uppercase tracking-widest">Phương thức giao hàng</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setDeliveryType('EXPRESS')}
                    className={`p-5 rounded-[2.5rem] border-2 flex flex-col gap-3 items-start transition-all text-left relative ${
                      deliveryType === 'EXPRESS' 
                      ? 'border-brand-orange-500 bg-brand-orange-50 shadow-lg shadow-brand-orange-50/50' 
                      : 'border-brand-brown-50 bg-brand-brown-50/20 hover:border-brand-orange-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-colors ${deliveryType === 'EXPRESS' ? 'bg-brand-orange-500 text-white' : 'bg-brand-orange-100 text-brand-orange-600'}`}>⚡</div>
                    <div>
                      <p className="text-sm font-title font-black text-brand-brown-900">Giao nhanh</p>
                      <p className="text-[10px] font-body font-bold text-brand-orange-600">15-20 phút</p>
                    </div>
                    {deliveryType === 'EXPRESS' && (
                      <div className="absolute top-4 right-4 text-brand-orange-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                  </button>
                  <button 
                    onClick={() => setDeliveryType('SAVER')}
                    className={`p-5 rounded-[2.5rem] border-2 flex flex-col gap-3 items-start transition-all text-left relative ${
                      deliveryType === 'SAVER' 
                      ? 'border-brand-orange-500 bg-brand-orange-50 shadow-lg shadow-brand-orange-50/50' 
                      : 'border-brand-brown-50 bg-brand-brown-50/20 hover:border-brand-orange-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-colors ${deliveryType === 'SAVER' ? 'bg-brand-orange-500 text-white' : 'bg-brand-honey-100 text-brand-honey-600'}`}>🕒</div>
                    <div>
                      <p className="text-sm font-title font-black text-brand-brown-900">Tiết kiệm</p>
                      <p className="text-[10px] font-body font-bold text-brand-brown-400">30-40 phút</p>
                    </div>
                    {deliveryType === 'SAVER' && (
                      <div className="absolute top-4 right-4 text-brand-orange-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Section 3: Schedule */}
              <div className="space-y-4">
                <p className="text-[10px] font-title font-black text-brand-brown-400 uppercase tracking-widest">Hẹn giờ nhận cơm</p>
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
                  {['Giao ngay', '11:30', '12:00', '12:30', '13:00'].map(time => (
                    <button 
                      key={time}
                      onClick={() => setScheduledTime(time)}
                      className={`shrink-0 px-6 py-3 rounded-2xl text-[11px] font-title font-black transition-all border-2 ${
                        scheduledTime === time 
                        ? 'bg-brand-orange-500 text-white border-brand-orange-500 shadow-md shadow-brand-orange-100 scale-105' 
                        : 'bg-white border-brand-brown-50 text-brand-brown-500 hover:border-brand-orange-200 hover:text-brand-orange-500'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 4: Notes */}
              <div className="space-y-4">
                <p className="text-[10px] font-title font-black text-brand-brown-400 uppercase tracking-widest">Ghi chú cho bếp</p>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-5 bg-brand-brown-50/50 rounded-[2.5rem] text-xs font-body font-bold border-2 border-transparent focus:border-brand-orange-200 focus:bg-white outline-none resize-none min-h-[120px] transition-all shadow-inner"
                  placeholder="Vd: Ít cơm, không lấy ớt, lấy thêm muỗng..."
                />
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-32 h-32 bg-brand-orange-50 rounded-full flex items-center justify-center mb-8 animate-bounceIn">
                <svg className="w-16 h-16 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <h4 className="font-title font-black text-2xl text-brand-brown-900 mb-2">Bếp đang đợi bạn!</h4>
              <p className="font-body font-bold text-brand-brown-400 max-w-[200px] mx-auto mb-8">Bạn vẫn chưa chọn món nào vào giỏ cơm hôm nay.</p>
              <button onClick={onClose} className="bg-brand-orange-500 text-white px-10 py-4 rounded-2xl font-title font-black text-sm hover:bg-brand-orange-600 shadow-xl shadow-brand-orange-100 transition-all active:scale-95">Chọn món ngay</button>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        {items.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-brand-brown-100 p-8 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.08)]">
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-2xl text-[10px] font-title font-black uppercase tracking-widest mb-6 flex items-center gap-2 justify-center border border-emerald-100 animate-pulse">
              <span className="text-lg">🥥</span> Miễn phí dừa tắc giải nhiệt cho Neighbors
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center text-xs font-body font-bold text-brand-brown-400">
                <span>Tạm tính món ăn</span>
                <span>{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between items-center text-xs font-body font-bold text-brand-brown-400">
                <span>Phí ship {deliveryType === 'EXPRESS' ? 'Nhanh' : 'Tiết kiệm'}</span>
                <span>{deliveryFee.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-brand-brown-50 border-dashed">
                <span className="text-xs font-title font-black text-brand-brown-900 uppercase tracking-widest">Tổng thanh toán</span>
                <span className="text-3xl font-title font-black text-brand-orange-500">{(subtotal + deliveryFee).toLocaleString()}đ</span>
              </div>
            </div>
            
            <button 
              onClick={onCheckout}
              className="w-full py-5 bg-brand-orange-500 text-white rounded-[2rem] font-title font-black text-lg hover:bg-brand-orange-600 shadow-2xl shadow-brand-orange-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              <span>Tiếp tục đặt đơn</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
