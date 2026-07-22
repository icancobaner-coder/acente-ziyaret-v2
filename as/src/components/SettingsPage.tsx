import React from 'react';
import { Settings, Shield, User, Bell, Database, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ayarlar & Profil</h2>
        <p className="text-xs text-slate-500 mt-0.5">Saha temsilcisi profil tercihleri ve AI hafıza yapılandırması</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100">
        {/* User Profile Info */}
        <div className="p-6 flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0057B8] text-white flex items-center justify-center font-bold text-xl">
            AY
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Ahmet Yılmaz</h3>
            <p className="text-xs text-slate-500">Kıdemli Saha Temsilcisi • İç Anadolu Bölge Müdürlüğü</p>
            <p className="text-xs text-slate-400 mt-0.5">ahmet.yilmaz@anadolusigorta.com.tr</p>
          </div>
        </div>

        {/* AI Memory Settings */}
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-[#0057B8]" />
            <h3 className="text-sm font-bold text-slate-900">AI Acente Hafıza Ayarları</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="font-bold text-slate-900">Otomatik Hafıza Çıkarımı (Gemini 3.6)</p>
                <p className="text-slate-500 text-[11px]">Eklenen ziyaret notlarını anında analiz ederek acente profiline işler.</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Aktif</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="font-bold text-slate-900">Ziyaret Öncesi Akıllı Bildirimler</p>
                <p className="text-slate-500 text-[11px]">Yaklaşan ziyaretlerden 1 saat önce karar verici ve dikkat edilecekler özeti iletir.</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
