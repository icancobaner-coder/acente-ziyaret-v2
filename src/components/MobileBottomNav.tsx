import React from 'react';
import { PageType } from '../types';
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Building2,
  Bot,
} from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onPageChange,
}) => {
  const navItems: { id: PageType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Genel Bakış', icon: LayoutDashboard },
    { id: 'calendar', label: 'Takvim', icon: Calendar },
    { id: 'visits', label: 'Ziyaretler', icon: ClipboardList },
    { id: 'agencies', label: 'Acenteler', icon: Building2 },
    { id: 'ai-assistant', label: 'AI Asistan', icon: Bot },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 px-2 py-1.5 shadow-lg flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentPage === item.id ||
          (currentPage === 'agency-profile' && item.id === 'agencies');

        return (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] ${
              isActive
                ? 'text-[#0057B8] font-bold scale-105'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#0057B8]' : 'text-slate-500'}`} />
              {item.id === 'ai-assistant' && (
                <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">
              {item.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 bg-[#0057B8] rounded-full mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
