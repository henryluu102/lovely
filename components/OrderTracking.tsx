
import React from 'react';
import { Order, OrderStatus } from '../types';

interface OrderTrackingProps {
  order: Order;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  const steps = [
    { status: OrderStatus.PENDING, label: 'Chờ nhận', icon: '📝' },
    { status: OrderStatus.PREPARING, label: 'Đang nấu', icon: '🍳' },
    { status: OrderStatus.READY, label: 'Sẵn sàng', icon: '🥡' },
    { status: OrderStatus.COMPLETED, label: 'Đã nhận', icon: '🏠' },
  ];

  const getCurrentStepIndex = (status: OrderStatus) => {
    const index = steps.findIndex(s => s.status === status);
    return index !== -1 ? index : 0;
  };

  const currentStepIndex = getCurrentStepIndex(order.status);

  return (
    <div className="bg-white rounded-[2.5rem] border border-brand-brown-50 p-8 shadow-xl shadow-brand-brown-50/50 hover:shadow-2xl transition-all animate-fadeIn group">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-title font-black text-xl text-brand-brown-900 group-hover:text-brand-orange-600 transition-colors">
              {order.kitchenName}
            </h4>
            <span className="bg-brand-orange-50 text-brand-orange-600 text-[10px] font-title font-black px-2 py-0.5 rounded-lg uppercase">
              #{order.id.slice(-4)}
            </span>
          </div>
          <div className="flex items-center gap-2">
             <p className="text-xs font-body font-bold text-brand-brown-300">
               Đặt lúc {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
             </p>
             <span className="text-brand-brown-100">•</span>
             <span className={`text-[10px] font-title font-black px-2 py-0.5 rounded-md ${order.isPaid ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-brown-50 text-brand-brown-400'}`}>
               {order.isPaid ? 'ĐÃ THANH TOÁN' : 'TIỀN MẶT'}
             </span>
          </div>
        </div>
        
        <div className="text-right">
           <p className="text-[10px] font-title font-black text-brand-brown-300 uppercase tracking-widest mb-1">Tổng cộng</p>
           <p className="text-xl font-body font-black text-brand-orange-500">{order.totalAmount.toLocaleString()}đ</p>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="relative mb-10 px-2">
        {/* Progress Line Background */}
        <div className="absolute top-5 left-8 right-8 h-1 bg-brand-brown-50 rounded-full"></div>
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-5 left-8 h-1 bg-brand-orange-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * (100 - (16 / 350 * 100))}%` }}
        ></div>

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            const isPending = index > currentStepIndex;

            return (
              <div key={step.status} className="flex flex-col items-center z-10">
                <div 
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-all duration-500 ${
                    isActive 
                      ? 'bg-brand-orange-500 text-white shadow-lg shadow-brand-orange-200 scale-110 ring-4 ring-brand-orange-50' 
                      : isCompleted 
                        ? 'bg-brand-honey-500 text-white shadow-md' 
                        : 'bg-white border-2 border-brand-brown-50 text-brand-brown-200'
                  }`}
                >
                  {isActive && order.status !== OrderStatus.COMPLETED ? (
                    <span className="animate-pulse">{step.icon}</span>
                  ) : (
                    <span>{isCompleted ? '✓' : step.icon}</span>
                  )}
                </div>
                <p className={`mt-3 text-[10px] font-title font-black uppercase tracking-tighter ${
                  isActive ? 'text-brand-orange-600' : 'text-brand-brown-300'
                }`}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Items Summary */}
      <div className="bg-brand-brown-50/50 rounded-2xl p-4 mb-6">
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center bg-white rounded-lg text-[10px] font-title font-black text-brand-brown-400">
                  {item.quantity}
                </span>
                <span className="text-sm font-body font-bold text-brand-brown-700">{item.name}</span>
              </div>
              <span className="text-xs font-body font-bold text-brand-brown-400">{(item.price * item.quantity).toLocaleString()}đ</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-brand-honey-50 flex items-center justify-center text-brand-honey-600 border border-brand-honey-100">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <div>
             <p className="text-[9px] font-title font-black text-brand-brown-300 uppercase tracking-widest">Giờ nhận cơm</p>
             <p className="text-sm font-title font-black text-brand-brown-900">{order.pickupTime}</p>
           </div>
        </div>
        
        <div className="flex gap-2">
          <button className="p-3 bg-brand-brown-50 text-brand-brown-500 rounded-xl hover:bg-brand-brown-100 transition-colors shadow-sm active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
          <button className="px-6 py-3 bg-white border-2 border-brand-brown-100 text-brand-brown-700 rounded-xl text-xs font-title font-black hover:border-brand-orange-200 hover:text-brand-orange-600 transition-all shadow-sm active:scale-95">
            CHAT VỚI BẾP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
