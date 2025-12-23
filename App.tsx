
import React, { useState, useEffect } from 'react';
import { UserRole, Kitchen, Coordinates, Order, OrderStatus, PaymentMethod, WalletTransaction, MealPackage, MealCreditTransaction, UserProfile, AppNotification, CartItem, Meal, DeliveryType } from './types';
import { MOCK_KITCHENS } from './constants';
import { calculateDistance } from './utils/geo';
import BuyerDashboard from './components/BuyerDashboard';
import MerchantDashboard from './components/MerchantDashboard';
import Navbar from './components/Navbar';
import CheckoutModal from './components/CheckoutModal';
import ProfileModal from './components/ProfileModal';
import AuthPage from './components/AuthPage';
import NotificationToast from './components/NotificationToast';
import CartDrawer from './components/CartDrawer';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.BUYER);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [nearbyKitchens, setNearbyKitchens] = useState<Kitchen[]>([]);
  const [activeRadius, setActiveRadius] = useState<number>(2.0); // Default 2km
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  
  // Kitchen State for Merchant
  const [myKitchen, setMyKitchen] = useState<Kitchen>(MOCK_KITCHENS[0]);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartKitchen, setCartKitchen] = useState<Kitchen | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Delivery State
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('EXPRESS');
  const [scheduledTime, setScheduledTime] = useState<string>('Giao ngay');
  const [orderNotes, setOrderNotes] = useState<string>('');

  // Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Người Hàng Xóm',
    phone: '0901234567',
    address: '123 Lê Lợi, Bến Thành, Quận 1',
    avatar: 'https://i.pravatar.cc/150?u=neighbor'
  });
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Wallet & Loyalty State
  const [walletBalance, setWalletBalance] = useState<number>(250000);
  const [mealCredits, setMealCredits] = useState<number>(0);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);
  const [creditTransactions, setCreditTransactions] = useState<MealCreditTransaction[]>([]);

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
        () => {
          setUserLocation({ lat: 10.7769, lng: 106.7009 });
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation && isLoggedIn) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        // Use updated kitchen if it's in the radius
        const allKitchens = MOCK_KITCHENS.map(k => k.id === myKitchen.id ? myKitchen : k);
        const filtered = allKitchens.filter(k => calculateDistance(userLocation, k.location) <= activeRadius);
        setNearbyKitchens(filtered);
        setIsSearching(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [userLocation, activeRadius, isLoggedIn, myKitchen]);

  const addNotification = (message: string, type: 'INFO' | 'SUCCESS' | 'ORDER' = 'INFO') => {
    const id = `notif-${Date.now()}`;
    setNotifications(prev => [{ id, message, type, timestamp: Date.now() }, ...prev]);
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAddToCart = (kitchen: Kitchen, item: CartItem) => {
    if (cartKitchen && cartKitchen.id !== kitchen.id) {
      if (!window.confirm("Giỏ hàng hiện tại đang có món từ bếp khác. Bạn muốn xóa giỏ hàng cũ và chọn bếp này chứ?")) {
        return;
      }
      setCartItems([item]);
      setCartKitchen(kitchen);
    } else {
      setCartKitchen(kitchen);
      setCartItems(prev => {
        const existing = prev.find(i => i.mealId === item.mealId);
        if (existing) {
          return prev.map(i => i.mealId === item.mealId ? { ...i, quantity: i.quantity + item.quantity } : i);
        }
        return [...prev, item];
      });
    }
    addNotification(`Đã thêm ${item.name} vào giỏ`, 'SUCCESS');
  };

  const updateCartQuantity = (mealId: string, delta: number) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.mealId === mealId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
      return updated;
    });
  };

  const removeFromCart = (mealId: string) => {
    setCartItems(prev => {
      const filtered = prev.filter(item => item.mealId !== mealId);
      if (filtered.length === 0) setCartKitchen(null);
      return filtered;
    });
  };

  const handleLogin = (userData: { name: string; phone: string }) => {
    setUserProfile(prev => ({ ...prev, name: userData.name, phone: userData.phone }));
    setIsLoggedIn(true);
    addNotification(`Chào mừng ${userData.name.split(' ').pop()} trở lại!`, 'SUCCESS');
  };

  const handleLogout = () => { setIsLoggedIn(false); };

  const toggleRole = () => setRole(prev => prev === UserRole.BUYER ? UserRole.MERCHANT : UserRole.BUYER);

  const handleTopUp = (amount: number) => {
    setWalletBalance(prev => prev + amount);
    setWalletTransactions(prev => [{
      id: `tx-${Date.now()}`,
      amount,
      type: 'TOPUP',
      description: 'Nạp tiền VietQR',
      createdAt: new Date().toISOString()
    }, ...prev]);
    addNotification(`Đã nạp thành công ${amount.toLocaleString()}đ vào ví.`, 'SUCCESS');
  };

  const buyMealPackage = (pack: MealPackage) => {
    if (walletBalance < pack.price) { alert("Số dư ví không đủ!"); return; }
    setWalletBalance(prev => prev - pack.price);
    setMealCredits(prev => prev + pack.mealCount);
    addNotification(`Đăng ký thành công ${pack.name}!`, 'SUCCESS');
  };

  const handleConfirmOrder = (
    kitchen: Kitchen, 
    items: CartItem[], 
    method: PaymentMethod, 
    recipient: { name: string, phone: string, address: string }
  ) => {
    const total = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const deliveryFee = deliveryType === 'EXPRESS' ? 10000 : 5000;
    const finalTotal = total + deliveryFee;
    
    if (method === PaymentMethod.WALLET) {
      if (walletBalance < finalTotal) { alert("Ví không đủ tiền!"); return; }
      setWalletBalance(prev => prev - finalTotal);
    } else if (method === PaymentMethod.MEAL_PACK) {
      if (mealCredits < 1) { alert("Hết lượt ăn!"); return; }
      setMealCredits(prev => prev - 1);
    }

    const orderId = `ord-${Date.now()}`;
    setMyOrders(prev => [{
      id: orderId,
      buyerId: 'user123',
      kitchenId: kitchen.id,
      kitchenName: kitchen.kitchenName,
      items,
      totalAmount: finalTotal,
      status: OrderStatus.PENDING,
      paymentMethod: method,
      deliveryType: deliveryType,
      recipientName: recipient.name,
      recipientPhone: recipient.phone,
      recipientAddress: recipient.address,
      notes: orderNotes,
      isPaid: method !== PaymentMethod.CASH,
      createdAt: new Date().toISOString(),
      pickupTime: scheduledTime
    }, ...prev]);

    setIsCheckoutOpen(false);
    setCartItems([]);
    setCartKitchen(null);
    setOrderNotes('');
    
    if (kitchen.id === myKitchen.id) {
      addNotification(`Bếp có đơn hàng mới #${orderId.slice(-4)}!`, 'ORDER');
    }
  };

  const handleUpdateKitchen = (updated: Partial<Kitchen>) => {
    setMyKitchen(prev => ({ ...prev, ...updated }));
    addNotification("Cập nhật thông tin bếp thành công!", "SUCCESS");
  };

  const handleAddMeal = (newMeal: Meal) => {
    setMyKitchen(prev => ({
      ...prev,
      meals: [...prev.meals, newMeal]
    }));
    addNotification(`Đã thêm ${newMeal.name} vào thực đơn!`, "SUCCESS");
  };

  return (
    <div className="min-h-screen flex flex-col bg-milk relative">
      {isSplashVisible && <SplashScreen onFinished={() => setIsSplashVisible(false)} />}
      
      {!isLoggedIn && !isSplashVisible ? (
        <AuthPage onLogin={handleLogin} />
      ) : !isSplashVisible ? (
        <>
          <NotificationToast notifications={notifications} onDismiss={handleDismissNotification} />

          <CartDrawer 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            kitchen={cartKitchen}
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            scheduledTime={scheduledTime}
            setScheduledTime={setScheduledTime}
            notes={orderNotes}
            setNotes={setOrderNotes}
            onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
          />

          <Navbar 
            role={role} 
            onToggleRole={toggleRole} 
            orderCount={myOrders.length} 
            profile={userProfile} 
            onOpenProfile={() => setShowProfileModal(true)} 
            onLogout={handleLogout}
          />
          
          <main className="flex-grow container mx-auto px-4 py-6 max-w-5xl">
            {role === UserRole.BUYER ? (
              <BuyerDashboard 
                kitchens={nearbyKitchens} 
                userLocation={userLocation}
                orders={myOrders}
                walletBalance={walletBalance}
                mealCredits={mealCredits}
                walletTransactions={walletTransactions}
                creditTransactions={creditTransactions}
                userProfile={userProfile}
                activeRadius={activeRadius}
                isSearching={isSearching}
                cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
                cartTotal={cartItems.reduce((a, b) => a + (b.price * b.quantity), 0)}
                onOpenCart={() => setIsCartOpen(true)}
                onRadiusChange={setActiveRadius}
                onAddToCart={handleAddToCart}
                onTopUp={handleTopUp}
                onBuyPackage={buyMealPackage}
              />
            ) : (
              <MerchantDashboard 
                kitchen={myKitchen}
                orders={myOrders.filter(o => o.kitchenId === myKitchen.id)}
                userProfile={userProfile}
                onUpdateKitchen={handleUpdateKitchen}
                onAddMeal={handleAddMeal}
              />
            )}
          </main>

          {isCheckoutOpen && cartKitchen && (
            <CheckoutModal 
              kitchen={cartKitchen}
              items={cartItems}
              walletBalance={walletBalance}
              mealCredits={mealCredits}
              deliveryType={deliveryType}
              userProfile={userProfile}
              onClose={() => setIsCheckoutOpen(false)}
              onConfirm={handleConfirmOrder}
            />
          )}

          {showProfileModal && (
            <ProfileModal 
              profile={userProfile}
              onSave={(newProfile) => { setUserProfile(newProfile); setShowProfileModal(false); }}
              onClose={() => setShowProfileModal(false)}
            />
          )}

          <footer className="bg-white border-t py-12 text-center text-gray-400 text-sm">
            <div className="flex justify-center gap-8 mb-4 font-medium">
               <span className="hover:text-brand-orange-500 cursor-pointer">Trang chủ</span>
               <span className="hover:text-brand-orange-500 cursor-pointer">Cộng đồng</span>
               <span className="hover:text-brand-orange-500 cursor-pointer">Gia nhập bếp</span>
            </div>
            <p>© 2024 Cơm Nhà - Neighbors feeding Neighbors</p>
          </footer>
        </>
      ) : null}
    </div>
  );
};

export default App;
