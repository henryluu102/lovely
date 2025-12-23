
import React, { useState } from 'react';
import { Kitchen, Coordinates, Order, WalletTransaction, MealPackage, MealCreditTransaction, UserProfile, CartItem } from '../types';
import KitchenCard from './KitchenCard';
import OrderTracking from './OrderTracking';
import WalletCard from './WalletCard';
import { suggestMealBasedOnMood } from '../services/geminiService';

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
  const [aiMood, setAiMood] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const handleAiAsk = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiMood.trim()) return;

    setIsAiLoading(true);
    const availableData = kitchens.map(k => `${k.kitchenName} có ${k.meals.map(m => m.name).join(', ')}`).join('; ');
    const suggestion = await suggestMealBasedOnMood(aiMood, availableData);
    setAiResponse(suggestion || '');
    setIsAiLoading(false);
  };

  const quickMoods = ["Thanh đạm", "Đậm đà", "Món nước", "Món miền Tây", "Ăn kiêng"];

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
              <svg className="w-4 h-4 text-brand-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 