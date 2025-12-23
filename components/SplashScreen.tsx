
import React, { useEffect, useState } from 'react';
import Logo from './Logo';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onFinished, 500); // Wait for fade out animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-milk transition-opacity duration-500 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{backgroundImage: "radial-gradient(#5C3D2E 2px, transparent 0)", backgroundSize: "30px 30px"}}></div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-orange-100 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-honey-100 rounded-full blur-[100px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative flex flex-col items-center">
        <div className="animate-bounceIn">
          <div className="animate-float">
            <Logo size="xl" withText={false} />
          </div>
        </div>
        
        <div className="mt-12 text-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <h1 className="font-title font-black text-5xl text-brand-brown-900 tracking-tight mb-2">Cơm Nhà</h1>
          <p className="font-body font-bold text-brand-brown-400 uppercase tracking-[0.2em] text-xs">Bếp Ấm • Vị Nhà</p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-orange-500 animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-brand-orange-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 rounded-full bg-brand-orange-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
          <p className="text-brand-brown-300 font-body font-bold text-[10px] uppercase tracking-widest italic">
            Đang hâm nóng cơm nhà...
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 text-brand-brown-200 text-[10px] font-black tracking-[0.3em] uppercase opacity-50">
        Neighbors Feeding Neighbors
      </div>
    </div>
  );
};

export default SplashScreen;
