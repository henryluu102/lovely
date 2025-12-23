
import React, { useState } from 'react';
import { Kitchen, Coordinates, Meal, CartItem } from '../types';
import { calculateDistance, formatDistance } from '../utils/geo';

interface KitchenCardProps {
  kitchen: Kitchen;
  userLocation: Coordinates | null;
  onAddToCart: (item: CartItem) => void;
}

const KitchenCard: React.FC<KitchenCardProps> = ({ kitchen, userLocation, onAddToCart }) => {
  const [showMeals, setShowMeals] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const distance = userLocation ? calculateDistance(userLocation, kitchen.location) : 0;

  const handleAddClick = (e: React.MouseEvent, meal: Meal) => {
    e.stopPropagation();
    if (meal.currentQuantity === 0) return;
    
    onAddToCart({
      mealId: meal.id,
      name: meal.name,
      price: meal.price,
      quantity: 1,
      image: meal.image
    });
  };

  const getTagIcon = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('chính') || t.includes('cơm')) return '🍱';
    if (t.includes('canh')) return '🥣';
    if (t.includes('khô') || t.includes('mặn')) return '🥓';
    if (t.includes('trưa')) return '☀️';
    return '✨';
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-brand-brown-50 border border-brand-brown-50 hover:border-brand-orange-200 transition-all group">
      {/* Kitchen Banner Area */}
      <div className="relative h-44 bg-brand-brown-50 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{backgroundImage: "radial-gradient(#FF7A00 1.5px, transparent 0)", backgroundSize: "15px 15px"}}></div>
        <img src={kitchen.avatar} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000" alt="background" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
        
        <div className="absolute -bottom-8 left-8 p-1.5 bg-white rounded-3xl shadow-xl border-4 border-white">
          <img src={kitchen.avatar} alt={kitchen.kitchenName} className="w-20 h-20 rounded-[1.5rem] object-cover" />
        </div>
        
        <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-title font-black text-brand-orange-600 flex items-center gap-1.5 shadow-lg border border-brand-orange-50">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" /></svg>
            {formatDistance(distance)}
          </div>
          <div className="bg-brand-honey-500 px-3 py-1.5 rounded-xl text-[10px] font-title font-black text-brand-brown-900 shadow-md">
            ⭐ {kitchen.rating}
          </div>
        </div>
      </div>

      <div className="px-8 pt-12 pb-8">
        <div className="mb-6">
          <h3 className="text-2xl font-title font-black text-brand-brown-900 tracking-tight leading-tight">{kitchen.kitchenName}</h3>
          <p className="text-brand-brown-400 text-xs font-body font-bold mt-1.5 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-brand-brown-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {kitchen.address}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-brand-brown-50 pb-4">
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-brand-orange-500 rounded-full animate-pulse"></span>
               <span className="text-xs font-title font-black text-brand-brown-600 uppercase tracking-widest">Thực đơn hôm nay</span>
            </div>
            <button onClick={() => setShowMeals(!showMeals)} className="text-xs font-body font-bold text-brand-orange-600 hover:text-brand-orange-500 flex items-center gap-1 transition-colors px-3 py-1 bg-brand-orange-50 rounded-full">
              {showMeals ? 'Thu gọn' : `Xem ${kitchen.meals.length} món`}
              <svg className={`w-4 h-4 transition-transform ${showMeals ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>

          {showMeals && (
            <div className="space-y-4 pt-2 animate-fadeIn">
              {kitchen.meals.map(meal => {
                const isSoldOut = meal.currentQuantity === 0;
                return (
                  <div 
                    key={meal.id} 
                    onClick={() => setSelectedMeal(meal)} 
                    className={`flex gap-4 p-3 rounded-[2rem] border transition-all cursor-pointer relative ${
                      isSoldOut 
                      ? 'bg-gray-100 border-gray-200 opacity-70 cursor-not-allowed' 
                      : 'bg-white hover:bg-brand-orange-50/30 hover:shadow-lg border-brand-brown-50 hover:border-brand-orange-100 group/meal'
                    }`}
                  >
                    <div className="relative shrink-0 w-20 h-20">
                      <img 
                        src={meal.image} 
                        alt={meal.name} 
                        className={`w-full h-full rounded-2xl object-cover shadow-sm transition-all ${isSoldOut ? 'grayscale contrast-75' : 'group-hover/meal:scale-105'}`} 
                      />
                      {isSoldOut && (
                        <div className="absolute inset-0 bg-brand-brown-900/40 rounded-2xl flex items-center justify-center">
                           <span className="text-[8px] font-title font-black text-white uppercase tracking-tighter bg-red-600 px-2 py-0.5 rounded-full">Hết</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0 flex flex-col justify-center">
                      <h4 className={`text-sm font-title font-bold mb-1 truncate ${isSoldOut ? 'text-brand-brown-300' : 'text-brand-brown-900'}`}>
                        {meal.name}
                      </h4>
                      
                      {/* Tags Row */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {meal.tags.map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-lg bg-brand-brown-50 text-[9px] font-body font-bold text-brand-brown-400 group-hover/meal:bg-white transition-colors">
                            {getTagIcon(tag)} {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-body font-bold ${isSoldOut ? 'text-brand-brown-200' : 'text-brand-orange-500'}`}>
                          {meal.price.toLocaleString()}đ
                        </span>
                        
                        <button 
                          disabled={isSoldOut}
                          onClick={(e) => handleAddClick(e, meal)}
                          className={`px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 ${
                            isSoldOut 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                            : 'bg-brand-orange-500 text-white hover:bg-brand-orange-600 shadow-brand-orange-100 hover:-translate-y-0.5'
                          }`}
                        >
                          <span className="text-[10px] font-title font-black uppercase">
                            {isSoldOut ? 'Hết suất' : 'Thêm'}
                          </span>
                          {!isSoldOut && (
                            <div className="bg-white/20 p-0.5 rounded-md">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" /></svg>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Selected Meal Detail Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-brand-brown-900/60 backdrop-blur-md p-0 sm:p-4 animate-fadeIn" onClick={() => setSelectedMeal(null)}>
          <div className="bg-white w-full max-w-2xl sm:rounded-[3rem] rounded-t-[3rem] overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedMeal(null)} className="absolute top-6 right-6 z-10 p-3 bg-white/20 backdrop-blur-xl rounded-2xl text-white hover:bg-white/40 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <img 
                  src={selectedMeal.image} 
                  className={`w-full h-full object-cover transition-all ${selectedMeal.currentQuantity === 0 ? 'grayscale brightness-75' : ''}`} 
                  alt={selectedMeal.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                {selectedMeal.currentQuantity === 0 && (
                  <div className="absolute inset-0 bg-brand-brown-900/40 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-md px-8 py-3 rounded-2xl shadow-2xl transform -rotate-3">
                      <span className="text-brand-brown-900 font-title font-black text-lg uppercase tracking-widest">Hết suất rồi</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={`md:w-1/2 p-8 md:p-10 flex flex-col ${selectedMeal.currentQuantity === 0 ? 'bg-gray-100 opacity-70' : 'bg-white'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedMeal.currentQuantity === 0 ? (
                    <span className="text-[10px] font-title font-black text-red-500 bg-red-50 px-2.5 py-1 rounded-lg uppercase tracking-widest border border-red-100">Hết suất</span>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-brand-honey-50 px-2.5 py-1 rounded-lg border border-brand-honey-100">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-honey-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-honey-500"></span>
                      </span>
                      <span className="text-[10px] font-title font-black text-brand-honey-600 uppercase tracking-widest">
                        Còn {selectedMeal.currentQuantity} suất
                      </span>
                    </div>
                  )}
                  {selectedMeal.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-body font-bold bg-brand-brown-50 px-2 py-1 rounded-lg text-brand-brown-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className={`text-3xl font-title font-black mb-4 leading-tight ${selectedMeal.currentQuantity === 0 ? 'text-brand-brown-300' : 'text-brand-brown-900'}`}>
                  {selectedMeal.name}
                </h3>
                <p className={`text-2xl font-body font-bold mb-6 ${selectedMeal.currentQuantity === 0 ? 'text-brand-brown-200' : 'text-brand-orange-500'}`}>
                  {selectedMeal.price.toLocaleString()}đ
                </p>
                <p className="text-sm font-body font-bold text-brand-brown-500 leading-relaxed mb-10 flex-grow">{selectedMeal.description}</p>
                
                <button 
                  disabled={selectedMeal.currentQuantity === 0}
                  onClick={() => {
                    onAddToCart({ mealId: selectedMeal.id, name: selectedMeal.name, price: selectedMeal.price, quantity: 1, image: selectedMeal.image });
                    setSelectedMeal(null);
                  }}
                  className={`w-full py-5 rounded-[1.5rem] font-title font-black text-lg transition-all active:scale-[0.98] ${
                    selectedMeal.currentQuantity === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-300' 
                    : 'bg-brand-orange-500 text-white hover:bg-brand-orange-600 shadow-xl shadow-brand-orange-100'
                  }`}
                >
                  {selectedMeal.currentQuantity === 0 ? 'Hết suất' : 'Thêm vào giỏ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenCard;
