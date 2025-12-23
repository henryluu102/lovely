
import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import Logo from './Logo';

interface NavbarProps {
  role: UserRole;
  onToggleRole: () => void;
  orderCount: number;
  profile: UserProfile;
  onOpenProfile: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, onToggleRole, orderCount, profile, onOpenProfile, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-brand-brown-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <div className="hidden sm:block">
            <h1 className="font-title font-black text-brand-brown-900 leading-tight">Cơm Nhà</h1>
            <p className="text-[10px] font-body font-bold text-brand-orange-600 uppercase tracking-widest">Radius 2KM</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleRole}
            className={`px-4 py-1.5 rounded-full text-sm font-title font-black transition-all ${
              role === UserRole.MERCHANT 
                ? 'bg-brand-orange-50 text-brand-orange-600' 
                : 'bg-brand-honey-50 text-brand-honey-600'
            }`}
          >
            {role === UserRole.BUYER ? '🛒 Sang Bếp' : '🍽️ Sang Mua'}
          </button>
          
          <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-brown-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {orderCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-title font-black">
                {orderCount}
              </span>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 group transition-all"
            >
              <div className="hidden md:block text-right">
                <p className="text-xs font-title font-black text-brand-brown-900 leading-none mb-1">{profile.name}</p>
                <p className="text-[10px] font-body font-bold text-brand-brown-500 uppercase">Tài khoản</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-brand-brown-50 overflow-hidden border-2 border-transparent group-hover:border-brand-orange-500 transition-all">
                 <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-0" onClick={() => setShowDropdown(false)}></div>
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-brand-brown-100 py-2 z-10 animate-fadeIn">
                  <button 
                    onClick={() => { onOpenProfile(); setShowDropdown(false); }}
                    className="w-full text-left px-4 py-3 text-xs font-title font-bold text-brand-brown-600 hover:bg-brand-orange-50 hover:text-brand-orange-600 transition-colors flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Sửa trang cá nhân
                  </button>
                  <button 
                    onClick={() => { onLogout(); setShowDropdown(false); }}
                    className="w-full text-left px-4 py-3 text-xs font-title font-bold text-red-500 hover:bg-red-50 transition-colors border-t border-brand-brown-50 flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Đăng xuất
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
