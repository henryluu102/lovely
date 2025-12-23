
import React, { useState } from 'react';
import { Kitchen, Coordinates, Order, WalletTransaction, MealPackage, MealCreditTransaction, UserProfile, CartItem } from '../types';
import KitchenCard from './KitchenCard';
import OrderTracking from './OrderTracking';
import WalletCard from './WalletCard';

const MEAL_PACKS: MealPackage[] = [
  { id: 'p1', name: 'Gói Sinh Viên', mealCount: 5, price: 185000, description: 'Lựa chọn tiết kiệm cho 1 tuần bận rộn', savingPercent: 15 },
  { id: 'p2', name: 'Gói Gia Đình', mealCount: 15, price: 525000, description: 'Trọn vị cơm nhà cả tháng cho cả nhà', savingPercent: 20 },
  { id: 'p3', name: 'Gói Công Sở', mealCount: 10, price: 360000, description: 'Tiết kiệm thời gian, cơm nóng mỗi trưa', savingPercent: 18 }
];

const RADIUS_OPTIONS = [
  { label: '1km', value: 1.0 },
  { label: '2km', value: 2.0 },
  { label: '5km', value: 5.0 }
];

interface BuyerDashboardProps {
  kitchens: Kitchen[];
  userLocation: Coordinates | null;
  orders: Order[];
  walletBalance: number;
  mealCredits: number;
  walletTransactions: WalletTransaction[];
  creditTransactions: MealCreditTransaction[];
  userProfile: UserProfile;
  activeRadius: number;
  isSearching: boolean;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onRadiusChange: (radius: number) => void;
  onAddToCart: (kitchen: Kitchen, item: CartItem) => void;
  onTopUp: (amount: number) => void;
  onBuyPackage: (pack: MealPackage) => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ 
  kitchens, userLocation, orders, walletBalance, mealCredits, walletTransactions, 
  creditTransactions, userProfile, activeRadius, isSearching, cartCount, cartTotal,
  onOpenCart, onRadiusChange, onAddToCart, onTopUp, onBuyPackage 
}) => {
  const [activeTab, setActiveTab] = useState<'EXPLORE' | 'ORDERS' | 'WALLET'>('EXPLORE');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* Floating Cart Button - Ripe Orange */}
      {cartCount > 0 && (
        <button 
          onClick={onOpenCart}
          className="fixed bottom-10 right-6 z-[140] bg-brand-orange-500 text-white px-6 py-4 rounded-[2rem] shadow-2xl flex items-center gap-4 hover:bg-brand-orange-600 hover:scale-105 transition-all animate-bounceIn"
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="absolute -top-2 -right-2 bg-brand-honey-500 text-brand-brown-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-orange-500">{cartCount}</span>
          </div>
          <div className="text-left border-l border-white/20 pl-4">
            <p className="text-[10px] font-bold uppercase opacity-80 leading-none mb-1">Giỏ hàng</p>
            <p className="font-black text-sm">{cartTotal.toLocaleString()}đ</p>
          </div>
        </button>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-brand-brown-900 tracking-tight">
            {getGreeting()}, <span className="text-brand-orange-500">{userProfile.name.split(' ').pop()}!</span>
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-brand-brown-500 font-medium flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" /></svg>
              Trong vòng {activeRadius}km
            </p>
          </div>
        </div>

        <div className="flex bg-brand-brown-100 p-1 rounded-2xl">
          {[
            { id: 'EXPLORE', label: 'Khám Phá', icon: '🍲' },
            { id: 'ORDERS', label: 'Lịch Sử', icon: '🕒' },
            { id: 'WALLET', label: 'Ví & Quà', icon: '🎁' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === tab.id ? 'bg-white text-brand-orange-600 shadow-sm' : 'text-brand-brown-500 hover:text-brand-brown-900'
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'EXPLORE' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-brand-brown-500 uppercase tracking-widest">Phạm vi:</span>
                <div className="flex bg-brand-brown-50 p-1 rounded-xl border border-brand-brown-100">
                   {RADIUS_OPTIONS.map(opt => (
                     <button
                       key={opt.value}
                       onClick={() => onRadiusChange(opt.value)}
                       className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                         activeRadius === opt.value ? 'bg-white text-brand-orange-600 shadow-sm' : 'text-brand-brown-400 hover:text-brand-brown-600'
                       }`}
                     >
                       {opt.label}
                     </button>
                   ))}
                </div>
             </div>
          </div>

          {kitchens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {kitchens.map(kitchen => (
                <KitchenCard 
                  key={kitchen.id} 
                  kitchen={kitchen} 
                  userLocation={userLocation}
                  onAddToCart={(item) => onAddToCart(kitchen, item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-brand-brown-100">
               <h3 className="text-xl font-black text-brand-brown-900 mb-2">Chưa tìm thấy bếp hàng xóm</h3>
            </div>
          )}
        </div>
      )}

      {activeTab === 'ORDERS' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-brand-brown-900">Theo dõi đơn hàng</h3>
          </div>
          {orders.map(order => <OrderTracking key={order.id} order={order} />)}
        </div>
      )}

      {activeTab === 'WALLET' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
             <WalletCard balance={walletBalance} transactions={walletTransactions} onTopUp={onTopUp} />
          </div>
          <div className="md:col-span-2 space-y-8">
             <div className="bg-white p-8 rounded-[2.5rem] border border-brand-brown-100 shadow-sm">
                <h3 className="text-xl font-black mb-6 text-brand-brown-900">Mua lượt ăn cơm 🎁</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {MEAL_PACKS.map(pack => (
                     <div key={pack.id} className="border-2 border-brand-brown-50 p-6 rounded-[2rem] hover:border-brand-orange-200 transition-all group">
                        <h4 className="font-black text-lg text-brand-brown-900">{pack.name}</h4>
                        <p className="text-xs text-brand-brown-500 mt-1">{pack.description}</p>
                        <button onClick={() => onBuyPackage(pack)} className="w-full mt-4 py-4 bg-brand-orange-500 text-white rounded-2xl font-black text-sm hover:bg-brand-orange-600 transition-colors">Đăng ký ngay</button>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
