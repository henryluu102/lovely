
import React, { useState, useMemo } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const filteredKitchens = useMemo(() => {
    if (!searchQuery.trim()) return kitchens;
    
    const query = searchQuery.toLowerCase().trim();
    return kitchens.filter(kitchen => {
      const kitchenMatch = kitchen.kitchenName.toLowerCase().includes(query);
      const dishMatch = kitchen.meals.some(meal => meal.name.toLowerCase().includes(query));
      return kitchenMatch || dishMatch;
    });
  }, [kitchens, searchQuery]);

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* Floating Cart Button */}
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
              <svg className="w-4 h-4 text-brand-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
              {userProfile.address}
            </p>
            <div className="flex bg-brand-brown-50 p-1 rounded-xl">
              {RADIUS_OPTIONS.map(opt => (
                <button 
                  key={opt.value}
                  onClick={() => onRadiusChange(opt.value)}
                  className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${activeRadius === opt.value ? 'bg-white text-brand-orange-500 shadow-sm' : 'text-brand-brown-300'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex bg-brand-brown-50 p-1.5 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('EXPLORE')}
            className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all ${activeTab === 'EXPLORE' ? 'bg-white text-brand-orange-600 shadow-sm' : 'text-brand-brown-500'}`}
          >
            KHÁM PHÁ
          </button>
          <button 
            onClick={() => setActiveTab('ORDERS')}
            className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all ${activeTab === 'ORDERS' ? 'bg-white text-brand-orange-600 shadow-sm' : 'text-brand-brown-500'}`}
          >
            ĐƠN CỦA TÔI
          </button>
          <button 
            onClick={() => setActiveTab('WALLET')}
            className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all ${activeTab === 'WALLET' ? 'bg-white text-brand-orange-600 shadow-sm' : 'text-brand-brown-500'}`}
          >
            VÍ & ƯU ĐÃI
          </button>
        </div>
      </div>

      {activeTab === 'EXPLORE' && (
        <div className="space-y-8">
          {/* Search Bar Section */}
          <section className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-brand-brown-300 group-focus-within:text-brand-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên món ăn hoặc tên bếp hàng xóm..."
              className="w-full bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 focus:bg-white rounded-3xl py-5 pl-14 pr-6 outline-none transition-all font-bold text-brand-brown-900 shadow-sm placeholder:text-brand-brown-300 placeholder:font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-6 flex items-center text-brand-brown-200 hover:text-brand-brown-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </section>

          {/* Kitchen List */}
          <section className="space-y-6">
             <div className="flex items-center justify-between px-2">
               <h3 className="font-black text-xl text-brand-brown-900">
                {searchQuery ? `Kết quả tìm kiếm (${filteredKitchens.length})` : `Bếp quanh bạn (${activeRadius}km)`}
               </h3>
               {isSearching && <span className="text-[10px] font-black text-brand-orange-500 uppercase animate-pulse">Đang tìm bếp mới...</span>}
             </div>
             
             {filteredKitchens.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {filteredKitchens.map(kitchen => (
                   <KitchenCard 
                     key={kitchen.id} 
                     kitchen={kitchen} 
                     userLocation={userLocation} 
                     onAddToCart={(item) => onAddToCart(kitchen, item)}
                   />
                 ))}
               </div>
             ) : (
               <div className="bg-brand-brown-50 rounded-[3rem] py-20 px-8 text-center">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <svg className="w-10 h-10 text-brand-brown-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 </div>
                 <h4 className="font-black text-brand-brown-900 text-lg mb-2">
                  {searchQuery ? 'Không tìm thấy kết quả phù hợp' : 'Chưa tìm thấy bếp nào'}
                 </h4>
                 <p className="text-brand-brown-400 text-sm max-w-[280px] mx-auto mb-8 font-medium">
                  {searchQuery 
                    ? 'Thử tìm với từ khóa khác hoặc xóa bộ lọc tìm kiếm nhé!' 
                    : 'Bạn có thể thử mở rộng bán kính tìm kiếm để khám phá thêm các bếp nhà hàng xóm khác!'}
                 </p>
                 {!searchQuery && (
                   <div className="flex justify-center gap-3">
                      {RADIUS_OPTIONS.map(opt => (
                        <button 
                          key={opt.value}
                          onClick={() => onRadiusChange(opt.value)}
                          className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all ${activeRadius === opt.value ? 'bg-brand-orange-500 text-white shadow-lg' : 'bg-white text-brand-brown-500 border border-brand-brown-100'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                   </div>
                 )}
                 {searchQuery && (
                   <button 
                    onClick={() => setSearchQuery('')}
                    className="px-8 py-3 bg-brand-orange-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange-600 transition-all shadow-lg shadow-brand-orange-100"
                   >
                     Xóa tìm kiếm
                   </button>
                 )}
               </div>
             )}
          </section>
        </div>
      )}

      {activeTab === 'ORDERS' && (
        <div className="space-y-8">
          <h3 className="font-black text-2xl text-brand-brown-900 px-2">Theo dõi đơn hàng</h3>
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map(order => (
                <OrderTracking key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] py-24 text-center border-2 border-dashed border-brand-brown-50">
               <p className="text-brand-brown-300 font-bold italic">Chưa có đơn hàng nào. Hãy khám phá món ngon ngay!</p>
               <button onClick={() => setActiveTab('EXPLORE')} className="mt-6 bg-brand-orange-50 text-brand-orange-600 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange-100 transition-all">Khám phá ngay</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'WALLET' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <WalletCard balance={walletBalance} transactions={walletTransactions} onTopUp={onTopUp} />
             
             <div className="bg-white rounded-[2.5rem] p-8 border border-brand-brown-100 shadow-xl shadow-brand-brown-50/30">
                <div className="flex justify-between items-center mb-8">
                  <p className="text-[10px] font-title font-black text-brand-brown-300 uppercase tracking-widest">Thẻ lượt ăn (Meal Credits)</p>
                  <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black">ACTIVE</div>
                </div>
                <div className="flex items-end gap-3 mb-8">
                  <h4 className="text-6xl font-black text-brand-brown-900 tracking-tighter">{mealCredits}</h4>
                  <p className="text-brand-brown-400 font-bold mb-2 uppercase text-[10px] tracking-widest">Suất cơm còn lại</p>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-brand-brown-300 uppercase tracking-widest border-b border-brand-brown-50 pb-2">Lịch sử dùng thẻ</p>
                  {creditTransactions.length > 0 ? (
                    creditTransactions.map(tx => (
                      <div key={tx.id} className="flex justify-between items-center text-xs">
                         <span className="text-brand-brown-600 font-bold">{tx.description}</span>
                         <span className={tx.change > 0 ? 'text-emerald-500 font-black' : 'text-brand-orange-500 font-black'}>
                           {tx.change > 0 ? '+' : ''}{tx.change}
                         </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-brand-brown-300 italic">Chưa có giao dịch thẻ lượt ăn.</p>
                  )}
                </div>
             </div>
          </div>

          <section className="space-y-6">
            <h3 className="font-black text-2xl text-brand-brown-900 px-2">Đăng ký gói cơm tháng (Tiết kiệm tới 20%)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MEAL_PACKS.map(pack => (
                <div key={pack.id} className="bg-white p-8 rounded-[2.5rem] border border-brand-brown-50 shadow-sm hover:shadow-2xl hover:border-brand-orange-100 transition-all flex flex-col group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-brand-orange-50 text-brand-orange-500 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-brand-orange-500 group-hover:text-white transition-all">🍱</div>
                      <div className="bg-brand-honey-500 text-brand-brown-900 px-3 py-1 rounded-full text-[10px] font-black">-{pack.savingPercent}%</div>
                   </div>
                   <h4 className="text-xl font-black text-brand-brown-900 mb-2">{pack.name}</h4>
                   <p className="text-xs text-brand-brown-400 font-medium leading-relaxed mb-6 flex-grow">{pack.description}</p>
                   <div className="pt-6 border-t border-brand-brown-50">
                      <div className="flex items-end justify-between mb-6">
                         <div>
                            <p className="text-[10px] font-black text-brand-orange-500 uppercase tracking-widest">{pack.mealCount} suất cơm</p>
                            <p className="text-xl font-black text-brand-brown-900">{pack.price.toLocaleString()}đ</p>
                         </div>
                         <p className="text-[10px] text-brand-brown-300 line-through">{(pack.price / (1 - pack.savingPercent/100)).toLocaleString()}đ</p>
                      </div>
                      <button 
                        onClick={() => onBuyPackage(pack)}
                        className="w-full py-4 bg-brand-brown-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange-500 transition-all shadow-xl shadow-brand-brown-100 group-hover:shadow-brand-orange-100"
                      >
                        Đăng ký ngay
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
