import React, { useState } from 'react';
import { Visit } from '../types';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Plus } from 'lucide-react';

interface CalendarPageProps {
  visits: Visit[];
  onOpenNewVisitModal: () => void;
  onSelectVisit: (visit: Visit) => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({
  visits,
  onOpenNewVisitModal,
  onSelectVisit,
}) => {
  const [currentMonth, setCurrentMonth] = useState('Temmuz 2026');

  // Days of July 2026
  const daysInJuly = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-4 sm:space-y-6 pb-12">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Saha Ziyaret Takvimi</h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Planlanan ve gerçekleşen saha randevuları takvimi
          </p>
        </div>

        <button
          onClick={onOpenNewVisitModal}
          className="flex items-center space-x-2 bg-[#0057B8] text-white text-xs font-bold px-3.5 sm:px-4 py-2.5 rounded-xl hover:bg-[#004290] transition-all cursor-pointer shadow-sm min-h-[44px]"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>+ Yeni Ziyaret Kaydı</span>
        </button>
      </div>

      {/* Calendar Header */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <CalendarIcon className="w-5 h-5 text-[#0057B8] shrink-0" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900">{currentMonth}</h3>
        </div>

        <div className="flex items-center space-x-1.5">
          <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200 text-center py-2.5 text-[11px] sm:text-xs font-bold text-slate-500">
            <div>Pzt</div>
            <div>Sal</div>
            <div>Çar</div>
            <div>Per</div>
            <div>Cum</div>
            <div>Cmt</div>
            <div>Paz</div>
          </div>

          <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 min-h-[420px] sm:min-h-[480px]">
            {daysInJuly.map((day) => {
              const dayStr = day < 10 ? `0${day}` : `${day}`;
              const dateStr = `2026-07-${dayStr}`;
              const dayVisits = visits.filter((v) => v.tarih === dateStr);

              return (
                <div key={day} className="p-1.5 sm:p-2 min-h-[75px] sm:min-h-[90px] bg-white hover:bg-slate-50/80 transition-colors">
                  <span className={`text-[11px] sm:text-xs font-bold block mb-1 ${day === 22 ? 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0057B8] text-white flex items-center justify-center' : 'text-slate-700'}`}>
                    {day}
                  </span>

                  <div className="space-y-1">
                    {dayVisits.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => onSelectVisit(v)}
                        className="p-1 sm:p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[9px] sm:text-[10px] font-bold text-[#0057B8] truncate cursor-pointer hover:bg-blue-100 transition-colors"
                        title={`${v.saat} - ${v.acenteAdi}`}
                      >
                        {v.saat} {v.acenteAdi}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
