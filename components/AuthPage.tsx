
import React, { useState } from 'react';
import Logo from './Logo';

interface AuthPageProps {
  onLogin: (userData: { name: string; phone: string }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'REGISTER' && !formData.name) {
      alert("Vui lòng nhập họ tên");
      return;
    }
    if (!formData.phone || !formData.password) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    onLogin({
      name: formData.name || 'Người Hàng Xóm',
      phone: formData.phone
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-milk p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{backgroundImage: "radial-gradient(#5C3D2E 2px, transparent 0)", backgroundSize: "30px 30px"}}></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-orange-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-honey-100 rounded-full blur-3xl opacity-30"></div>

      <div className="w-full max-w-md z-10 animate-fadeIn">
        <div className="text-center mb-10">
          <Logo size="xl" withText className="mb-2" />
        </div>

        <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-brand-brown-50 border border-brand-brown-50">
          <div className="flex bg-brand-brown-50 p-1.5 rounded-2xl mb-8 border border-brand-brown-100">
            <button 
              onClick={() => setMode('LOGIN')}
              className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${mode === 'LOGIN' ? 'bg-white text-brand-orange-600 shadow-sm' : 'text-brand-brown-400'}`}
            >
              ĐĂNG NHẬP
            </button>
            <button 
              onClick={() => setMode('REGISTER')}
              className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${mode === 'REGISTER' ? 'bg-white text-brand-orange-600 shadow-sm' : 'text-brand-brown-400'}`}
            >
              ĐĂNG KÝ
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'REGISTER' && (
              <div className="animate-slideUp">
                <label className="block text-[10px] font-black text-brand-brown-400 uppercase tracking-widest mb-1.5 ml-1">Họ và tên</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 focus:bg-white outline-none transition-all font-bold text-brand-brown-900"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-brand-brown-400 uppercase tracking-widest mb-1.5 ml-1">Số điện thoại / Email</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 focus:bg-white outline-none transition-all font-bold text-brand-brown-900"
                placeholder="09xx xxx xxx"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="block text-[10px] font-black text-brand-brown-400 uppercase tracking-widest">Mật khẩu</label>
                {mode === 'LOGIN' && <button type="button" className="text-[10px] font-black text-brand-orange-500 hover:underline">Quên?</button>}
              </div>
              <input 
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-brand-brown-50 border-2 border-transparent focus:border-brand-orange-500 focus:bg-white outline-none transition-all font-bold text-brand-brown-900"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-brand-orange-500 text-white rounded-[1.5rem] font-black text-sm hover:bg-brand-orange-600 shadow-xl shadow-brand-orange-50 transition-all active:scale-95 mt-4"
            >
              {mode === 'LOGIN' ? 'Bắt đầu ngay' : 'Tạo tài khoản'}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-brown-50"></div></div>
            <span className="relative px-4 bg-white text-[10px] font-black text-brand-brown-200 uppercase tracking-widest">Hoặc qua</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center gap-3 py-4 border-2 border-brand-brown-50 rounded-2xl hover:bg-brand-brown-50 transition-all">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                <span className="text-[10px] font-black text-brand-brown-500 uppercase tracking-widest">Google</span>
             </button>
             <button className="flex items-center justify-center gap-3 py-4 border-2 border-brand-brown-50 rounded-2xl hover:bg-brand-brown-50 transition-all">
                <img src="https://www.svgrepo.com/show/303114/facebook-3.svg" className="w-5 h-5" alt="Facebook" />
                <span className="text-[10px] font-black text-brand-brown-500 uppercase tracking-widest">Facebook</span>
             </button>
          </div>
        </div>

        <p className="text-center mt-10 text-brand-brown-300 text-xs font-medium px-10">
          Tham gia cộng đồng "Cơm Nhà" để thưởng thức hương vị gia đình ngay tại khu phố của bạn.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;