import React from 'react';
import { BarChart3, Download, FileText, Share2, CheckCircle, TrendingUp, Award } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const ReportsPage: React.FC = () => {
  const performanceData = [
    { ay: 'Ocak', tss: 12, kasko: 24, trafik: 35 },
    { ay: 'Şubat', tss: 15, kasko: 28, trafik: 40 },
    { ay: 'Mart', tss: 18, kasko: 32, trafik: 42 },
    { ay: 'Nisan', tss: 16, kasko: 30, trafik: 38 },
    { ay: 'Mayıs', tss: 22, kasko: 36, trafik: 45 },
    { ay: 'Haziran', tss: 28, kasko: 42, trafik: 52 },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Performans & Saha Raporları</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Anadolu Sigorta bölge müdürlüğü için hazırlanmış yönetimsel analitik raporlar
          </p>
        </div>

        <button className="flex items-center space-x-2 bg-[#0057B8] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#004290] transition-all cursor-pointer shadow-sm">
          <Download className="w-4 h-4" />
          <span>PDF Rapor İndir</span>
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 block">Ziyaret Dönüşüm Oranı</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">%84.2</p>
          <p className="text-[11px] text-emerald-600 mt-1 font-semibold">Hedeflenen %80 üzeri</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 block">Acente Memnuniyet Skoru</span>
          <p className="text-2xl font-extrabold text-[#0057B8] mt-1">91.4 / 100</p>
          <p className="text-[11px] text-slate-500 mt-1 font-semibold">İç Anadolu Bölgesi Lideri</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 block">Aktif AI Hafıza Analizi</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">342 Not</p>
          <p className="text-[11px] text-blue-600 mt-1 font-semibold">Tüm notlar kalıcı hafızaya işlendi</p>
        </div>
      </div>

      {/* Production Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <h3 className="text-base font-bold text-slate-900 mb-2">Branş Bazlı Saha Üretim Analizi</h3>
        <p className="text-xs text-slate-500 mb-6">Ziyaretler sonrası gerçekleşen poliçe üretim adetleri</p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <XAxis dataKey="ay" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tss" name="Tamamlayıcı Sağlık (TSS)" fill="#0057B8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="kasko" name="Kasko" fill="#0080FF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="trafik" name="Trafik" fill="#64748B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
