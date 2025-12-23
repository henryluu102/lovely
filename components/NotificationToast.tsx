
import React, { useEffect } from 'react';
import { AppNotification } from '../types';

interface NotificationToastProps {
  notifications: AppNotification[];
  onDismiss: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 w-full max-w-xs pointer-events-none">
      {notifications.map((notif) => (
        <ToastItem key={notif.id} notification={notif} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ notification: AppNotification, onDismiss: (id: string) => void }> = ({ notification, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(notification.id), 5000);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div className="bg-brand-orange-500/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideDown pointer-events-auto border border-white/20">
      <div className="bg-white/20 p-2 rounded-xl">
        {notification.type === 'ORDER' ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        )}
      </div>
      <div className="flex-grow">
        <p className="text-xs font-black tracking-tight">{notification.message}</p>
        <p className="text-[10px] opacity-70 font-medium tracking-tight">Vừa mới đây</p>
      </div>
      <button 
        onClick={() => onDismiss(notification.id)}
        className="opacity-50 hover:opacity-100 transition-opacity"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};

export default NotificationToast;
