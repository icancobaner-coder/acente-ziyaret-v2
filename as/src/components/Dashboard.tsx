import React from 'react';
import { PageType, Visit, Agency, DashboardStats } from '../types';
import {
  Users,
  CheckCircle2,
  CalendarClock,
  XCircle,
  Clock,
  Sparkles,
  Plus,
  Building2,
  FileText,
  Bot,
  ArrowUpRight,
  ChevronRight,
  MapPin,
  Calendar as CalendarIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { MONTHLY_VISIT_CHART_DATA, PROVINCE_DISTRIBUTION_DATA } from '../data/mockData';

interface DashboardProps {
  stats: DashboardStats;
  visits: Visit[];
  agencies: Agency[];
  onNavigate: (page: PageType) => void;
  onOpenNewVisitModal: () => void;
  onSelectVisit: (visit: Visit) => void;
  onSelectAgency: (agency: Agency) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  visits,
  agencies,
  onNavigate,
  onOpenNewVisitModal,
  onSelectVisit,
  onSelectAgency,
}) => {
  // Today's schedule
  const todayVisits = visits.slice(0, 3);
  // Upcoming visits
  const upcomingVisits = visits.filter((v) => v.durum === 'Planlandı').slice(0, 3);

  return (
    <div className="space-y-6 pb-12">
      {/* Quick Action Bar (Hızlı Aksiyonlar) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057B8] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Hızlı İşlem Paneli</h2>
            <p className="text-xs text-slate-500">Saha temsilcisi hızlı aksiyon kısayolları</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-wrap gap-[#8px]">
          <button
            onClick={onOpenNewVisitModal}
            className="flex items-center space-x-2 bg-[#0057B8] hover:bg-[#004290] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Yeni Ziyaret</span>
          </button>

          <button
            onClick={() => onNavigate('agencies')}
            className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-[#0057B8]" />
            <span>Acenteleri Gör</span>
          </button>

          <button
            onClick={() => onNavigate('reports')}
            className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#0057B8]" />
            <span>Rapor Oluştur</span>
          </button>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-[#0057B8] text-xs font-bold px-4 py-2.5 rounded-xl border border-blue-200 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>AI Asistanı Aç</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards Grid (6 Metric Cards as specified) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. Toplam Ziyaret */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">Toplam Ziyaret</span>
            <Users className="w-4 h-4 text-[#0057B8]" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-sans">{stats.toplamZiyaret}</p>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +%14 geçen aya göre
          </span>
        </div>

        {/* 2. Gerçekleşen */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">Gerçekleşen</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-sans">{stats.gerçeklesen}</p>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
            %75 tamamlanma oranı
          </span>
        </div>

        {/* 3. Planlanan */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">Planlanan</span>
            <CalendarClock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-sans">{stats.planlanan}</p>
          <span className="text-[11px] font-semibold text-blue-600 mt-1 block">
            Gelecek 14 gün içinde
          </span>
        </div>

        {/* 4. İptal Edilen */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">İptal Edilen</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-sans">{stats.iptalEdilen}</p>
          <span className="text-[11px] font-medium text-slate-400 mt-1 block">
            Düşük iptal oranı (%5.4)
          </span>
        </div>

        {/* 5. Ortalama Görüşme Süresi */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">Ortalama Süre</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-sans">{stats.ortalamaSure}</p>
          <span className="text-[11px] font-medium text-slate-500 mt-1 block">
            Verimli saha periyodu
          </span>
        </div>

        {/* 6. AI Tarafından Oluşturulan Özetler */}
        <div className="bg-gradient-to-br from-blue-900 to-[#0057B8] text-white p-4 rounded-2xl shadow-md transition-all">
          <div className="flex items-center justify-between text-blue-100 mb-2">
            <span className="text-xs font-semibold text-blue-100">AI Hafıza Özetleri</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <p className="text-2xl font-bold text-white font-sans">{stats.aiOzetSayisi}</p>
          <span className="text-[11px] font-medium text-blue-100 mt-1 block">
            Otomatik hafıza kaydı
          </span>
        </div>
      </div>

      {/* Charts Section (Aylık Ziyaret Grafiği & İllere Göre Ziyaret Dağılımı) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aylık Ziyaret Grafiği */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Aylık Ziyaret Grafiği</h3>
              <p className="text-xs text-slate-500">2026 yılı saha ziyaretlerinin aylık kırılımı</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-[#0057B8] rounded-full border border-blue-100">
              Yıllık Trend
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_VISIT_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="ay" tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="gerçekleşen" name="Gerçekleşen" fill="#0057B8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="planlanan" name="Planlanan" fill="#0080FF" radius={[6, 6, 0, 0]} />
                <Bar dataKey="iptal" name="İptal Edilen" fill="#F43F5E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* İllere Göre Ziyaret Dağılımı */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900">İllere Göre Ziyaret Dağılımı</h3>
              <MapPin className="w-4 h-4 text-[#0057B8]" />
            </div>
            <p className="text-xs text-slate-500 mb-4">Saha bölgesindeki acente yoğunluğu</p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PROVINCE_DISTRIBUTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {PROVINCE_DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-2 pt-2 border-t border-slate-100">
            {PROVINCE_DISTRIBUTION_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="font-semibold text-slate-700">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">%{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedules Section: Bugünkü Program & Yaklaşan Ziyaretler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bugünkü Program */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-[#0057B8]" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Bugünkü Program</h3>
                <p className="text-xs text-slate-500">Planlanan saha ve online randevular</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('visits')}
              className="text-xs font-bold text-[#0057B8] hover:underline flex items-center"
            >
              Tümünü Gör <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {todayVisits.map((v) => (
              <div
                key={v.id}
                onClick={() => onSelectVisit(v)}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 p-1 flex items-center justify-center shrink-0 border border-slate-200">
                    {v.acenteLogo ? (
                      <img src={v.acenteLogo} alt={v.acenteAdi} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Building2 className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{v.acenteAdi}</h4>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                      <span>🕒 {v.saat}</span>
                      <span>•</span>
                      <span>📍 {v.il}</span>
                      <span>•</span>
                      <span className="font-semibold text-blue-700">{v.ziyaretTuru}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    v.durum === 'Gerçekleşti'
                      ? 'bg-emerald-100 text-emerald-800'
                      : v.durum === 'Planlandı'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {v.durum}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Yaklaşan Ziyaretler */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <CalendarClock className="w-5 h-5 text-[#0057B8]" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Yaklaşan Ziyaretler</h3>
                <p className="text-xs text-slate-500">Önümüzdeki günlerde takvimdeki ziyaretler</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('calendar')}
              className="text-xs font-bold text-[#0057B8] hover:underline flex items-center"
            >
              Takvimi Aç <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingVisits.length > 0 ? (
              upcomingVisits.map((v) => (
                <div
                  key={v.id}
                  onClick={() => onSelectVisit(v)}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057B8] font-bold text-xs flex flex-col items-center justify-center shrink-0">
                      <span>{v.tarih.split('-')[2]}</span>
                      <span className="text-[9px] uppercase">Tem</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{v.acenteAdi}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {v.temsilci} • {v.ziyaretAmaci || 'Rutin Ziyaret'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                    {v.saat}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic py-4 text-center">Yaklaşan ziyaret bulunmuyor.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
