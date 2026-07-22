import React, { useState } from 'react';
import { Agency } from '../types';
import { Building2, Search, MapPin, Users, ChevronRight, Plus } from 'lucide-react';

interface AgenciesListPageProps {
  agencies: Agency[];
  onSelectAgency: (agency: Agency) => void;
  onOpenNewVisitModal: () => void;
}

export const AgenciesListPage: React.FC<AgenciesListPageProps> = ({
  agencies,
  onSelectAgency,
  onOpenNewVisitModal,
}) => {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('Tümü');

  const filtered = agencies.filter((a) => {
    if (cityFilter !== 'Tümü' && a.il !== cityFilter) return false;
    if (search && !a.adi.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4 sm:space-y-6 pb-12">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Acenteler</h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Saha bölgenizdeki tüm partner acentelerin performans ve hafıza profilleri
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

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between flex-wrap gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Acente adı ile ara..."
            className="w-full bg-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 text-slate-800 outline-none border border-transparent focus:border-[#0057B8] min-h-[40px]"
          />
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <label className="text-xs font-semibold text-slate-500 shrink-0">İl Filtresi:</label>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full sm:w-auto bg-slate-100 text-xs font-semibold rounded-xl px-3 py-2.5 text-slate-800 outline-none border border-slate-200 min-h-[40px]"
          >
            <option value="Tümü">Tüm İller</option>
            <option value="Ankara">Ankara</option>
            <option value="İstanbul">İstanbul</option>
            <option value="İzmir">İzmir</option>
          </select>
        </div>
      </div>

      {/* Agency Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((agency) => (
          <div
            key={agency.id}
            onClick={() => onSelectAgency(agency)}
            className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group active:scale-98"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 p-1.5 border border-slate-200 overflow-hidden shrink-0">
                  <img src={agency.logo} alt={agency.adi} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold block">İlişki Skoru</span>
                  <span className="text-base sm:text-lg font-black text-[#0057B8]">{agency.iliskiSkoru} / 100</span>
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-3 sm:mt-4 group-hover:text-[#0057B8] transition-colors">
                {agency.adi}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{agency.il}, {agency.ilce} • {agency.subeSayisi} Şube</span>
              </p>

              <div className="grid grid-cols-2 gap-2 mt-3 sm:mt-4 text-xs">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 min-w-0">
                  <span className="text-[10px] text-slate-400 block">Karar Verici</span>
                  <span className="font-bold text-slate-800 truncate block">{agency.memory.kararVerici}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 min-w-0">
                  <span className="text-[10px] text-slate-400 block">Yıllık Üretim</span>
                  <span className="font-bold text-slate-800 truncate block">{agency.uretimPerformansi}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0057B8]">
              <span>Detaylı Profili Aç</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
