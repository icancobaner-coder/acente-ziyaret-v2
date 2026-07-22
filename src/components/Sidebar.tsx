import React from 'react';
import { PageType } from '../types';
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Building2,
  Bot,
  BarChart3,
  Settings,
  ChevronRight,
  X,
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  pendingNewVisitCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const menuItems: { id: PageType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Genel Bakış', icon: LayoutDashboard },
    { id: 'calendar', label: 'Takvim', icon: Calendar },
    { id: 'visits', label: 'Ziyaretler', icon: ClipboardList },
    { id: 'agencies', label: 'Acenteler', icon: Building2 },
    { id: 'ai-assistant', label: 'AI Asistan', icon: Bot },
    { id: 'reports', label: 'Raporlar', icon: BarChart3 },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  const handleNavClick = (pageId: PageType) => {
    onPageChange(pageId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Component */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between select-none shadow-xl lg:shadow-2xs shrink-0 transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Anadolu Sigorta Brand Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-[#0057B8] text-white">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-sm shrink-0">
                {/* Anadolu Sigorta Emblem / Logo */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#0057B8] fill-current">
                  <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="#0057B8" />
                  <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" fill="#FFFFFF" />
                  <path d="M50 32 L63 40 L63 60 L50 68 L37 60 L37 40 Z" fill="#0057B8" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm sm:text-base tracking-wide text-white leading-tight font-sans truncate">
                  ANADOLU SİGORTA
                </span>
                <span className="text-[11px] font-medium text-blue-100 tracking-wider truncate">
                  Acente Ziyaret Yönetimi
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white lg:hidden cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Region & Rep Status Badge */}
          <div className="px-4 py-3 bg-blue-50/60 border-b border-blue-100 flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="text-xs font-semibold text-slate-700 truncate">İç Anadolu Bölge Müd.</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white shrink-0">
              Saha CRM
            </span>
          </div>

          {/* Sidebar Navigation Menu */}
          <nav className="p-3 space-y-1 mt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || (currentPage === 'agency-profile' && item.id === 'agencies');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 min-h-[44px] cursor-pointer ${
                    isActive
                      ? 'bg-[#0057B8] text-white shadow-md shadow-blue-600/20 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    {item.id === 'ai-assistant' && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-white text-[#0057B8]' : 'bg-blue-100 text-[#0057B8]'
                        }`}
                      >
                        AI 2.0
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-4 h-4 opacity-80" />}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70">
          <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0057B8] flex items-center justify-center font-bold text-xs shrink-0">
              AS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">Saha Portal v4.8</p>
              <p className="text-[11px] text-slate-500 truncate">Sistem Aktif • Online</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

