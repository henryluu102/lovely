
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onSave, onClose }) => {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Tên không được để trống");
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-slideUp">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-gray-900">Trang cá nhân</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-sage-50 shadow-inner bg-gray-100">
                <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-sage-500 text-white p-2 rounded-xl shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Họ và tên</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-sage-500 focus:bg-white outline-none transition-all font-bold text-gray-800"
                placeholder="Nhập tên của bạn"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Số điện thoại</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-sage-500 focus:bg-white outline-none transition-all font-bold text-gray-800"
                placeholder="09xx xxx xxx"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Địa chỉ mặc định</label>
              <textarea 
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-sage-500 focus:bg-white outline-none transition-all font-medium text-gray-700 h-24 resize-none"
                placeholder="Địa chỉ giao hàng/nhận hàng"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">URL Ảnh đại diện</label>
              <input 
                type="text" 
                value={formData.avatar}
                onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-sage-500 focus:bg-white outline-none transition-all font-mono text-xs text-gray-500"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all"
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 bg-tomato-500 text-white rounded-2xl font-black text-sm hover:bg-tomato-600 shadow-xl shadow-tomato-50 transition-all active:scale-[0.98]"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;