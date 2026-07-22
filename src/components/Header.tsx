import React, { useState } from 'react';
import { Search, Bell, PlusCircle, CheckCircle2, AlertCircle, Calendar, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenNewVisitModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  title?: string;
  subtitle?: string;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewVisitModal,
  searchQuery,
  onSearchChange,
  title = 'Genel Gösterge Paneli',
  subtitle = 'Anadolu Sigorta Saha Temsilcisi Yönetim Portalı',
  onToggleMobileMenu,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      title: 'WEB Sigorta AI Analizi Hazır',
      desc: 'Son ziyaret notu analiz edilerek acente hafızası güncellendi.',
      time: '10 dk önce',
      icon: CheckCircle2,
      color: 'text-emerald-600',
    },
    {
      id: 2,
      title: 'Yaklaşan Ziyaret Hatırlatması',
      desc: 'Saat 14:30 - Anadolu Güvence Sigorta online görüşmesi.',
      time: '45 dk önce',
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      id: 3,
      title: 'Poliçe İptal Uyarısı',
      desc: 'Başkent Sigorta için 2 adet kasko iptal talebi alındı.',
      time: '2 saat önce',
      icon: AlertCircle,
      color: 'text-amber-600',
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-2xs z-10 gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
      {/* Left Area: Hamburger button + Title */}
      <div className="flex items-center space-x-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="p-2.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 lg:hidden cursor-pointer shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Menüyü Aç"
          aria-label="Menüyü Aç"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight font-sans truncate">
            {title}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate hidden xs:block">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls: Search, Notifications, New Visit, User Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3 ml-auto shrink-0">
        {/* Search Bar - Responsive width */}
        <div className="relative w-36 xs:w-44 sm:w-56 md:w-64">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Arayın..."
            className="w-full bg-slate-100/90 hover:bg-slate-100 text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-8 sm:pl-9 pr-3 py-2 sm:py-2.5 outline-none border border-transparent focus:border-[#0057B8] focus:bg-white transition-all duration-150 min-h-[40px] sm:min-h-[44px]"
          />
        </div>

        {/* Quick New Visit Action Button */}
        <button
          onClick={onOpenNewVisitModal}
          className="flex items-center space-x-1.5 bg-[#0057B8] hover:bg-[#004290] text-white text-xs font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md shadow-blue-600/20 active:scale-98 transition-all duration-150 cursor-pointer min-h-[40px] sm:min-h-[44px]"
        >
          <PlusCircle className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">+ Yeni Ziyaret</span>
          <span className="sm:hidden font-semibold">+ Ziyaret</span>
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (showNotifications) setUnreadCount(0);
            }}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 transition-colors relative cursor-pointer min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center"
            title="Bildirimler"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Bildirimler</span>
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] font-semibold text-[#0057B8] hover:underline cursor-pointer"
                >
                  Tümünü Okundu İşaretle
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex space-x-3">
                        <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${item.color}`} />
                        <div>
                          <p className="text-xs font-bold text-slate-800">{item.title}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{item.desc}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Component */}
        <div className="flex items-center space-x-2.5 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-blue-100 shadow-2xs shrink-0">
            AY
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">Ahmet Yılmaz</span>
            <span className="text-[11px] text-slate-500 font-medium">Kıdemli Saha Temsilcisi</span>
          </div>
        </div>
      </div>
    </header>
  );
};

