import React from 'react';
import { Settings, Shield, User, Bell, Database, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6 pb-12 max-w-4xl">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Ayarlar & Profil</h2>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Saha temsilcisi profil tercihleri ve AI hafıza yapılandırması</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100">
        {/* User Profile Info */}
        <div className="p-4 sm:p-6 flex items-center space-x-3.5 sm:space-x-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#0057B8] text-white flex items-center justify-center font-bold text-base sm:text-xl shrink-0">
            AY
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">Ahmet Yılmaz</h3>
            <p className="text-[11px] sm:text-xs text-slate-500 truncate">Kıdemli Saha Temsilcisi • İç Anadolu Bölge Müdürlüğü</p>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">ahmet.yilmaz@anadolusigorta.com.tr</p>
          </div>
        </div>

        {/* AI Memory Settings */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-[#0057B8] shrink-0" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">AI Acente Hafıza Ayarları</h3>
          </div>

          <div className="space-y-2.5 sm:space-y-3 text-xs text-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 rounded-xl gap-2">
              <div>
                <p className="font-bold text-slate-900">Otomatik Hafıza Çıkarımı (Gemini 3.6)</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Eklenen ziyaret notlarını anında analiz ederek acente profiline işler.</p>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full self-start sm:self-auto shrink-0">Aktif</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 rounded-xl gap-2">
              <div>
                <p className="font-bold text-slate-900">Ziyaret Öncesi Akıllı Bildirimler</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Yaklaşan ziyaretlerden 1 saat önce karar verici ve dikkat edilecekler özeti iletir.</p>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full self-start sm:self-auto shrink-0">Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
