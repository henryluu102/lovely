
import React, { useState } from 'react';
import { Kitchen, Order, OrderStatus, UserProfile, Meal } from '../types';

interface MerchantDashboardProps {
  kitchen: Kitchen;
  orders: Order[];
  userProfile: UserProfile;
  onUpdateKitchen: (updated: Partial<Kitchen>) => void;
  onAddMeal: (meal: Meal) => void;
}

const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ kitchen, orders, userProfile, onUpdateKitchen, onAddMeal }) => {
  const [activeTab, setActiveTab] = useState<'ORDERS' | 'MENU'>('ORDERS');
  const [isEditingKitchen, setIsEditingKitchen] = useState(false);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  
  // Kitchen edit state
  const [editKitchenData, setEditKitchenData] = useState({
    name: kitchen.kitchenName,
    avatar: kitchen.avatar
  });

  // New meal form state
  const [newMeal, setNewMeal] = useState({
    name: '',
    price: 35000,
    description: '',
    image: 'https://picsum.photos/seed/food/400/300',
    maxQuantity: 20
  });

  const pendingCount = orders.filter(o => o.status === OrderStatus.PENDING).length;

  const handleUpdateKitchenInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateKitchen({
      kitchenName: editKitchenData.name,
      avatar: editKitchenData.avatar
    });
    setIsEditingKitchen(false);
  };

  const handleAddNewMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeal.name || !newMeal.price) return;
    
    const meal: Meal = {
      id: `m-${Date.now()}`,
      name: newMeal.name,
      price: newMeal.price,
      description: newMeal.description,
      image: newMeal.image,
      maxQuantity: newMeal.maxQuantity,
      currentQuantity: 0,
      availableDate: new Date().toISOString(),
      tags: ['Món mới']
    };
    
    onAddMeal(meal);
    setIsAddingMeal(false);
    setNewMeal({
      name: '',
      price: 35000,
      description: '',
      image: 'https://picsum.photos/seed/food/400/300',
      maxQuantity: 20
    });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-honey-50 text-brand-honey-600 text-[10px] font-black uppercase tracking-wider border border-brand-honey-100">
            <span className="w-2 h-2 rounded-full bg-brand-honey-500 animate-pulse"></span>
            Mới
          </span>
        );
      case OrderStatus.PREPARING:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-orange-50 text-brand-orange-600 text-[10px] font-black uppercase tracking-wider border border-brand-orange-100">
            <span className="text-xs">🍳</span> Đang nấu
          </span>
        );
      case OrderStatus.READY:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider border border-emerald-100">
            <span className="text-xs">🥡</span> Sẵn sàng
          </span>
        );
      case OrderStatus.COMPLETED:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-brown-50 text-brand-brown-400 text-[10px] font-black uppercase tracking-wider border border-brand-brown-100">
            <span className="text-xs">✅</span> Hoàn tất
          </span>
        );
      case OrderStatus.CANCELLED:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-wider border border-red-100">
            <span className="text-xs">✕</span> Đã hủy
          </span>
        );
      default:
        return <span className="text-xs font-bold text-gray-500">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Kitchen Info */}
      <div className="bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <img src={kitchen.avatar} alt={kitchen.kitchenName} className="w-24 h-24 rounded-[2rem] border-4 border-white/20 shadow-lg object-cover" />
            <button 
              onClick={() => setIsEditingKitchen(true)}
              className="absolute -bottom-2 -right-2 p-2 bg-brand-brown-900 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          </div>
          <div className="flex-grow text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h2 className="text-3xl font-black">{kitchen.kitchenName}</h2>
              <button onClick={() => setIsEditingKitchen(true)} className="text-white/60 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
            </div>
            <p className="opacity-90 font-medium italic">Bếp của {userProfile.name}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">📍 Phạm vi: 2KM</span>
              <span className="bg-brand-honey-500 text-brand-brown-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">⭐ {kitchen.rating} ({kitchen.reviewCount})</span>
              <span className="bg-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">✅ Đã xác minh</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      </div>

      {/* Tabs */}
      <div className="flex bg-brand-brown-50 p-1.5 rounded-2xl w-fit border border-brand-brown-100">
        <button 
          onClick={() => setActiveTab('ORDERS')}
          className={`px-8 py-2.5 text-xs font-black rounded-xl transition-all relative ${
            activeTab === 'ORDERS' ? 'bg-white text-brand-orange-600 shadow-sm' : 'text-brand-brown-500'
          }`}
        >
          QUẢN LÝ ĐƠN
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-orange-500 rounded-full border-2 border-brand-brown-50 animate-pulse"></span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('MENU')}
          className={`px-8 py-2.5 text-xs font-black rounded-xl transition-all ${
            activeTab === 'MENU' ? 'bg-white text-brand-orange-600 shadow-sm' : 'text-brand-brown-500'
          }`}
        >
          THỰC ĐƠN
        </button>
      </div>

      {activeTab === 'ORDERS' ? (
        <div className="bg-white rounded-[2.5rem] border border-brand-brown-100 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-brown-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-brand-brown-400 uppercase tracking-widest">Mã đơn</th>
                <th className="px-8 py-5 text-[10px] font-black text-brand-brown-400 uppercase tracking-widest">Khách hàng</th>
                <th className="px-8 py-5 text-[10px] font-black text-brand-brown-400 uppercase tracking-widest">Món ăn</th>
                <th className="px-8 py-5 text-[10px] font-black text-brand-brown-400 uppercase tracking-widest">Trạng thái</th>
                <th className="px-8 py-5 text-[10px] font-black text-brand-brown-400 uppercase tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-brown-50">
              {orders.length > 0 ? (
                orders.map(order => (
                  <tr key={order.id} className="hover:bg-brand-orange-50/30 transition-all group">
                    <td className="px-8 py-6 font-mono text-xs font-bold text-brand-brown-300">#{order.id.slice(-6)}</td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand-brown-50 border border-brand-brown-100 overflow-hidden flex items-center justify-center">
                             <img src={`https://i.pravatar.cc/100?u=${order.buyerId}`} className="w-full h-full object-cover" alt="Customer" />
                          </div>
                          <p className="text-sm font-bold text-brand-brown-900">Neighbor</p>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        {order.items.map(item => (
                          <div key={item.mealId} className="text-sm font-medium text-brand-brown-600">
                            <span className="font-black text-brand-orange-500 mr-1.5">{item.quantity}x</span>
                            {item.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="px-4 py-2 bg-white border border-brand-brown-100 text-xs font-black text-brand-orange-500 hover:border-brand-orange-200 rounded-xl uppercase tracking-wider transition-all shadow-sm active:scale-95">Cập nhật</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center text-brand-brown-300 italic">
                    Chưa có đơn hàng nào hôm nay. Hãy sẵn sàng!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-2xl text-brand-brown-900">Danh sách món đang bán</h3>
            <button 
              onClick={() => setIsAddingMeal(true)}
              className="bg-brand-orange-500 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-brand-orange-600 shadow-lg shadow-brand-orange-100 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
              Thêm món mới
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {kitchen.meals.map(meal => (
               <div key={meal.id} className="bg-white p-5 rounded-[2.5rem] border border-brand-brown-50 shadow-sm group hover:shadow-xl transition-all">
                  <div className="relative h-48 mb-5 overflow-hidden rounded-[2rem]">
                    <img src={meal.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={meal.name} />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-brand-orange-50">
                       <p className="font-black text-brand-orange-500 text-sm">{meal.price.toLocaleString()}đ</p>
                    </div>
                  </div>
                  <div className="px-2">
                    <h4 className="font-black text-brand-brown-900 text-xl mb-2">{meal.name}</h4>
                    <p className="text-xs text-brand-brown-500 line-clamp-2 mb-4 leading-relaxed">{meal.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-brand-brown-50">
                       <p className="text-[10px] font-bold text-brand-brown-400 uppercase">Đã bán: <span className="text-brand-orange-500">{meal.currentQuantity}/{meal.maxQuantity}</span></p>
                       <button className="text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest">Tạm ẩn</button>
                    </div>
                  </div>
               </div>
             ))}
             
             <button 
               onClick={() => setIsAddingMeal(true)}
               className="h-full min-h-[300px] border-4 border-dashed border-brand-brown-50 rounded-[2.5rem] flex flex-col items-center justify-center text-brand-brown-200 hover:border-brand-orange-200 hover:text-brand-orange-300 transition-all group"
             >
                <div className="w-16 h-16 bg-brand-brown-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-orange-50 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="font-black uppercase tracking-widest text-xs">Thêm món mới</span>
             </button>
          </div>
        </div>
      )}

      {/* EDIT KITCHEN MODAL */}
      {isEditingKitchen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-brown-900/60 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-slideUp border border-brand-brown-100">
            <h3 className="text-2xl font-black text-brand-brown-900 mb-8">Thông tin bếp của bạn</h3>
            <form onSubmit={handleUpdateKitchenInfo} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-brand-brown-400 uppercase tracking-widest mb-2 ml-1">Tên bếp</label>
                <input 
                  type="text" 
                  value={editKitchenData.name}
                  onChange={e => setEditKitchenData({...editKitchenData, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 focus:bg-white outline-none transition-all font-bold text-brand-brown-900"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-brand-brown-400 uppercase tracking-widest mb-2 ml-1">Ảnh đại diện bếp (URL)</label>
                <input 
                  type="text" 
                  value={editKitchenData.avatar}
                  onChange={e => setEditKitchenData({...editKitchenData, avatar: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 focus:bg-white outline-none transition-all font-mono text-xs text-brand-brown-500"
                />
                <div className="mt-4 flex justify-center">
                   <img src={editKitchenData.avatar} className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-brown-50" alt="Preview" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsEditingKitchen(false)} className="flex-1 py-4 text-brand-brown-400 font-bold">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-brand-orange-500 text-white rounded-2xl font-black shadow-lg shadow-brand-orange-100">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MEAL MODAL */}
      {isAddingMeal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-brown-900/60 backdrop-blur-md p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl animate-slideUp border border-brand-brown-100 my-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-brand-brown-900">Thêm món mới</h3>
              <button onClick={() => setIsAddingMeal(false)} className="p-2 text-brand-brown-400 hover:text-brand-brown-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleAddNewMeal} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-brand-brown-400 uppercase tracking-widest mb-2 ml-1">Tên món ăn</label>
                  <input 
                    type="text" 
                    value={newMeal.name}
                    onChange={e => setNewMeal({...newMeal, name: e.target.value})}
                    placeholder="VD: Cá kho tộ, Gà chiên..."
                    className="w-full px-5 py-3 rounded-xl bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 outline-none font-bold text-brand-brown-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-brand-brown-400 uppercase tracking-widest mb-2 ml-1">Giá bán (đ)</label>
                  <input 
                    type="number" 
                    value={newMeal.price}
                    onChange={e => setNewMeal({...newMeal, price: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 rounded-xl bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 outline-none font-bold text-brand-brown-900"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-black text-brand-brown-400 uppercase tracking-widest ml-1">Mô tả món ăn</label>
                </div>
                <textarea 
                  value={newMeal.description}
                  onChange={e => setNewMeal({...newMeal, description: e.target.value})}
                  rows={3}
                  className="w-full px-5 py-3 rounded-xl bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 outline-none font-medium text-brand-brown-700 text-sm resize-none"
                  placeholder="Hương vị món ăn như thế nào?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-brand-brown-400 uppercase tracking-widest mb-2 ml-1">Số lượng tối đa</label>
                  <input 
                    type="number" 
                    value={newMeal.maxQuantity}
                    onChange={e => setNewMeal({...newMeal, maxQuantity: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 rounded-xl bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 outline-none font-bold text-brand-brown-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-brand-brown-400 uppercase tracking-widest mb-2 ml-1">Ảnh món ăn (URL)</label>
                  <input 
                    type="text" 
                    value={newMeal.image}
                    onChange={e => setNewMeal({...newMeal, image: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 outline-none font-mono text-xs text-brand-brown-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full py-5 bg-brand-orange-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-orange-50 hover:bg-brand-orange-600 transition-all active:scale-[0.98]"
                >
                  Xác nhận thêm món
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantDashboard;
