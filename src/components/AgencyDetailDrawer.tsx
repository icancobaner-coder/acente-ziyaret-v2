import React, { useState } from 'react';
import { Agency, Visit } from '../types';
import {
  X,
  MapPin,
  Building,
  Users,
  Calendar,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Clock,
  ChevronRight,
  Phone,
  Mail,
  Building2,
  FileText,
  CheckCircle2,
} from 'lucide-react';

interface AgencyDetailDrawerProps {
  agency: Agency | null;
  visit: Visit | null;
  onClose: () => void;
  onViewFullProfile?: (agencyId: string) => void;
}

export const AgencyDetailDrawer: React.FC<AgencyDetailDrawerProps> = ({
  agency,
  visit,
  onClose,
  onViewFullProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'ai-summary' | 'visits' | 'notes' | 'details'>('ai-summary');

  if (!agency) return null;

  const memory = agency.memory;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full sm:max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/50 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
            title="Kapat"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-200 p-1.5 sm:p-2 shadow-sm flex items-center justify-center shrink-0">
              <img
                src={agency.logo}
                alt={agency.adi}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 pr-8 min-w-0">
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-xl font-bold text-slate-900 font-sans truncate">{agency.adi}</h2>
              </div>

              {/* Relationship Score Badge */}
              <div className="mt-1.5 flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center space-x-1.5 bg-blue-50 border border-blue-200 text-[#0057B8] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-2xs">
                  <span>İlişki Skoru</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8]"></span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0057B8]">{agency.iliskiSkoru}</span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">/ 100</span>
              </div>
            </div>
          </div>

          {/* Quick Information Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 sm:mt-5">
            <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200 text-center shadow-2xs">
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Konum</p>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900 mt-0.5 truncate">📍 {agency.il}</p>
            </div>
            <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200 text-center shadow-2xs">
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Şube</p>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900 mt-0.5 truncate">🏢 {agency.subeSayisi} Şube</p>
            </div>
            <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200 text-center shadow-2xs">
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Personel</p>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900 mt-0.5 truncate">👥 {agency.personelSayisi} Personel</p>
            </div>
            <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200 text-center shadow-2xs">
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Kıdem</p>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900 mt-0.5 truncate">📅 {agency.katilimYili}'ten beri</p>
            </div>
          </div>

          {/* Drawer Navigation Tabs */}
          <div className="flex border-b border-slate-200 mt-4 sm:mt-6 -mb-4 sm:-mb-6 space-x-4 sm:space-x-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('ai-summary')}
              className={`pb-2.5 sm:pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center ${
                activeTab === 'ai-summary'
                  ? 'border-[#0057B8] text-[#0057B8]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              🤖 AI Özeti
            </button>
            <button
              onClick={() => setActiveTab('visits')}
              className={`pb-2.5 sm:pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center ${
                activeTab === 'visits'
                  ? 'border-[#0057B8] text-[#0057B8]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Ziyaretler
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`pb-2.5 sm:pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center ${
                activeTab === 'notes'
                  ? 'border-[#0057B8] text-[#0057B8]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Notlar
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2.5 sm:pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center ${
                activeTab === 'details'
                  ? 'border-[#0057B8] text-[#0057B8]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Detaylar
            </button>
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-6 bg-slate-50/40">
          {/* TAB 1: AI ÖZETİ */}
          {activeTab === 'ai-summary' && (
            <div className="space-y-6">
              {/* AI Memory Header Banner */}
              <div className="bg-gradient-to-br from-blue-900 to-[#0057B8] text-white p-5 rounded-2xl shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <h3 className="text-base font-bold text-white">AI Hafızası</h3>
                  </div>
                  <span className="text-[10px] font-semibold bg-white/20 px-2.5 py-0.5 rounded-full text-blue-50">
                    Oto-Güncel
                  </span>
                </div>
                <p className="text-xs text-blue-100 font-medium">
                  Son 17 ziyaret analiz edilerek oluşturuldu.
                </p>
              </div>

              {/* AI Structured Memory Highlights */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hafıza Analizi</h4>
                <ul className="space-y-2.5 text-xs text-slate-800">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#0057B8] font-bold">•</span>
                    <span><strong>Harun Bey</strong> acentenin ana karar vericisidir.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#0057B8] font-bold">•</span>
                    <span>İletişim genellikle Harun Bey üzerinden ilerler.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#0057B8] font-bold">•</span>
                    <span>Sağlık departmanı oldukça hızlı dönüş yapmaktadır.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#0057B8] font-bold">•</span>
                    <span>Trafik tarafında fiyat hassasiyeti yüksektir.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#0057B8] font-bold">•</span>
                    <span>WhatsApp iletişimi tercih edilmektedir.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#0057B8] font-bold">•</span>
                    <span>Yaz aylarında üretim artmaktadır.</span>
                  </li>
                </ul>
              </div>

              {/* DİKKAT EDİLECEKLER */}
              <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-center space-x-2 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">DİKKAT EDİLECEKLER</h4>
                </div>
                <ul className="space-y-2 text-xs text-amber-900 font-medium">
                  {memory.dikkatEdilecekler.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI TAVSİYESİ */}
              <div className="bg-blue-50/70 border border-blue-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-center space-x-2 text-[#0057B8]">
                  <Lightbulb className="w-4 h-4 text-[#0057B8]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">AI TAVSİYESİ</h4>
                </div>
                <ul className="space-y-2 text-xs text-slate-800 font-medium">
                  {memory.aiTavsiyeleri.map((t, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SON ZİYARET */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-800">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">SON ZİYARET</h4>
                  </div>
                  <span className="text-xs font-bold text-[#0057B8]">{memory.sonZiyaretOzet.tarih}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 pl-2 border-l-2 border-[#0057B8]">
                  {memory.sonZiyaretOzet.notlar.map((n, idx) => (
                    <p key={idx}>{n}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ZİYARETLER */}
          {activeTab === 'visits' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Acente Ziyaret Geçmişi
              </h4>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">12 Haziran 2026</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                    Gerçekleşti
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  TSS kampanyası anlatıldı. Yeni sağlık personeli göreve başladı. Temmuz ayında tekrar ziyaret planlandı.
                </p>
                <div className="text-[11px] text-slate-400">Temsilci: Ahmet Yılmaz • Süre: 60 dk</div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">28 Temmuz 2026</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-[11px]">
                    Planlandı
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Batıkent yeni şube ziyareti ve TSS hedef gerçekleşme kontrolü.
                </p>
                <div className="text-[11px] text-slate-400">Temsilci: Ahmet Yılmaz • Saat: 11:00</div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTLAR */}
          {activeTab === 'notes' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Saha Temsilcisi Notları
              </h4>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <p className="font-bold text-slate-800">Harun Bey ile Görüşme Notu</p>
                <p className="text-slate-600 leading-relaxed">
                  "Harun Bey oldukça samimi. Kararlar genellikle onun üzerinden ilerliyor. Sağlık departmanı yeni personel aldı. WhatsApp üzerinden iletişim kurmayı tercih ediyorlar. Temmuz ayında tekrar görüşülecek."
                </p>
                <span className="text-[10px] text-slate-400 block pt-1">Ekleyen: Ahmet Yılmaz (12.06.2026)</span>
              </div>
            </div>
          )}

          {/* TAB 4: DETAYLAR */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">İletişim Kişileri</h4>
              <div className="space-y-2">
                {agency.contacts.map((c) => (
                  <div key={c.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{c.adSoyad} {c.kararVericiMi && <span className="text-[#0057B8] font-normal">(Karar Verici)</span>}</p>
                      <p className="text-slate-500 text-[11px]">{c.unvan}</p>
                    </div>
                    <div className="text-right text-[11px] text-slate-600">
                      <p>📞 {c.telefon}</p>
                      <p>✉️ {c.ePosta}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">Şubeler</h4>
              <div className="space-y-2">
                {agency.branches.map((b) => (
                  <div key={b.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                    <p className="font-bold text-slate-900">{b.ad}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{b.adres}</p>
                    <p className="text-[11px] text-slate-600 mt-1">Sorumlu: {b.mudur} • {b.personelSayisi} Personel</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Action Button */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <button
            onClick={() => {
              if (onViewFullProfile) onViewFullProfile(agency.id);
            }}
            className="w-full bg-[#0057B8] hover:bg-[#004290] text-white text-xs font-bold py-3 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Acente Profilini Detaylı İncele</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
