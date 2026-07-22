import React, { useState } from 'react';
import { Agency, Visit } from '../types';
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  Award,
  Sparkles,
  Phone,
  Mail,
  Building,
  AlertCircle,
  TrendingUp,
  Clock,
  ArrowLeft,
  Plus,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';

interface AgencyProfilePageProps {
  agency: Agency;
  visits: Visit[];
  onBack: () => void;
  onOpenNewVisitModal: () => void;
}

export const AgencyProfilePage: React.FC<AgencyProfilePageProps> = ({
  agency,
  visits,
  onBack,
  onOpenNewVisitModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'performance'>('overview');

  const agencyVisits = visits.filter((v) => v.acenteId === agency.id);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Acentelere Dön</span>
        </button>

        <button
          onClick={onOpenNewVisitModal}
          className="flex items-center space-x-2 bg-[#0057B8] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#004290] transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Bu Acente İçin Yeni Ziyaret</span>
        </button>
      </div>

      {/* Profile Header (Header as specified) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 p-2 border border-slate-200 overflow-hidden shrink-0 shadow-xs">
              <img src={agency.logo} alt={agency.adi} className="w-full h-full object-cover rounded-xl" />
            </div>

            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-extrabold text-slate-900 font-sans">{agency.adi}</h2>
                <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-[#0057B8] rounded-full border border-blue-200">
                  Acente ID: {agency.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center space-x-2">
                <span>📍 {agency.il}, {agency.ilce}</span>
                <span>•</span>
                <span>🏢 {agency.subeSayisi} Şube</span>
                <span>•</span>
                <span>👥 {agency.personelSayisi} Personel</span>
                <span>•</span>
                <span>📅 {agency.katilimYili}'ten beri partner</span>
              </p>
            </div>
          </div>
        </div>

        {/* Header Metric Badges Grid (İlişki Skoru, Sağlık Potansiyeli, Üretim Performansı, Son Ziyaret, Sonraki Ziyaret) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4 border-t border-slate-100">
          <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-100">
            <span className="text-[11px] font-semibold text-slate-500 block">İlişki Skoru</span>
            <span className="text-xl font-extrabold text-[#0057B8]">{agency.iliskiSkoru} / 100</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block">Sağlık Potansiyeli</span>
            <span className="text-sm font-bold text-slate-900 truncate block mt-1">{agency.saglikPotansiyeli}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block">Üretim Performansı</span>
            <span className="text-sm font-bold text-slate-900 truncate block mt-1">{agency.uretimPerformansi}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block">Son Ziyaret</span>
            <span className="text-xs font-bold text-slate-900 truncate block mt-1">{agency.sonZiyaretTarihi}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block">Sonraki Planlanan</span>
            <span className="text-xs font-bold text-[#0057B8] truncate block mt-1">{agency.sonrakiZiyaretTarihi}</span>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-slate-200 pt-2 space-x-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview' ? 'border-[#0057B8] text-[#0057B8]' : 'border-transparent text-slate-500'
            }`}
          >
            Acente Genel Bakış & AI Hafızası
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'timeline' ? 'border-[#0057B8] text-[#0057B8]' : 'border-transparent text-slate-500'
            }`}
          >
            Kronolojik Ziyaret Zaman Çizelgesi
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'performance' ? 'border-[#0057B8] text-[#0057B8]' : 'border-transparent text-slate-500'
            }`}
          >
            Üretim & Performans Grafikleri
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: OVERVIEW & CARDS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Hafızası Card */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-[#0057B8]" />
              <div>
                <h3 className="text-base font-bold text-slate-900">AI Hafızası & Kalıcı Bilgiler</h3>
                <p className="text-xs text-slate-500">Tüm ziyaretlerden derlenen yaşayan acente profili</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Karar Verici</span>
                <span className="text-xs font-bold text-slate-900">{agency.memory.kararVerici}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">İletişim Tercihi</span>
                <span className="text-xs font-bold text-slate-900">{agency.memory.iletisimTercihi}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">İlişki Seviyesi</span>
                <span className="text-xs font-bold text-emerald-700">{agency.memory.iliskiSeviyesi}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">İlgili Departman</span>
                <span className="text-xs font-bold text-slate-900">{agency.memory.ilgiliDepartman}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Risk Düzeyi</span>
                <span className="text-xs font-bold text-emerald-600">{agency.memory.risk}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Potansiyel</span>
                <span className="text-xs font-bold text-[#0057B8]">{agency.memory.potansiyel}</span>
              </div>
            </div>

            {/* Departmanlar */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-700 mb-2">Departmanlar & Branşlar</h4>
              <div className="flex flex-wrap gap-2">
                {agency.departments.map((dept, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-800 font-semibold px-3 py-1 rounded-lg border border-slate-200">
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            {/* Hatırlatmalar */}
            <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-amber-900 flex items-center">
                <AlertCircle className="w-4 h-4 text-amber-600 mr-1.5" /> Hatırlatmalar & Özel Notlar
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-900">
                {agency.reminders.map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Cards Column (Önemli Kişiler & Şubeler) */}
          <div className="space-y-6">
            {/* Önemli Kişiler */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Önemli Kişiler</h3>
              <div className="space-y-2.5">
                {agency.contacts.map((c) => (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <p className="font-bold text-slate-900">{c.adSoyad}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{c.unvan}</p>
                    <p className="text-[11px] text-slate-600 mt-1">📞 {c.telefon}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Şubeler */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Şubeler ({agency.branches.length})</h3>
              <div className="space-y-2">
                {agency.branches.map((b) => (
                  <div key={b.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <p className="font-bold text-slate-900">{b.ad}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{b.adres}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <h3 className="text-base font-bold text-slate-900">Ziyaret Geçmişi Kronolojik Zaman Çizelgesi</h3>
          <div className="relative border-l-2 border-blue-200 ml-4 pl-6 space-y-6">
            {agencyVisits.map((v) => (
              <div key={v.id} className="relative">
                <div className="absolute -left-9 top-1.5 w-5 h-5 rounded-full bg-[#0057B8] border-4 border-white shadow-xs"></div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{v.tarih} - {v.saat}</span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0057B8]">
                      {v.durum}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 font-semibold">{v.ziyaretAmaci}</p>
                  <p className="text-xs text-slate-600">{v.not}</p>
                  <div className="text-[11px] text-slate-400">Temsilci: {v.temsilci} • Süre: {v.sure}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: PERFORMANCE CHARTS */}
      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Üretim Grafiği */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Aylık Üretim Grafiği (M ₺)</h3>
            <p className="text-xs text-slate-500 mb-4">Gerçekleşen vs Hedef üretim</p>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agency.monthlyProduction}>
                  <XAxis dataKey="ay" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="uretim" name="Üretim" fill="#0057B8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hedef" name="Hedef" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ziyaret Grafiği */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Ziyaret Sıklığı Grafiği</h3>
            <p className="text-xs text-slate-500 mb-4">Aylık ziyaret sayıları</p>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agency.visitHistoryCount}>
                  <XAxis dataKey="ay" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="ziyaret" name="Ziyaret" fill="#0080FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* İlişki Gelişimi Grafiği */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">İlişki Gelişim Grafiği</h3>
            <p className="text-xs text-slate-500 mb-4">Aylık ilişki skoru trendi</p>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={agency.relationshipTrend}>
                  <XAxis dataKey="ay" tick={{ fontSize: 11 }} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="skor" name="İlişki Skoru" stroke="#0057B8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
