import React, { useState } from 'react';
import { Agency, Visit, AgencyMemory } from '../types';
import { X, Bot, Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface NewVisitModalProps {
  agencies: Agency[];
  onClose: () => void;
  onSave: (visit: Visit, memoryUpdate?: Partial<AgencyMemory>) => void;
}

export const NewVisitModal: React.FC<NewVisitModalProps> = ({
  agencies,
  onClose,
  onSave,
}) => {
  const [acenteId, setAcenteId] = useState<string>(agencies[0]?.id || '');
  const [temsilci, setTemsilci] = useState<string>('Ahmet Yılmaz');
  const [tarih, setTarih] = useState<string>('2026-07-22');
  const [saat, setSaat] = useState<string>('10:30');
  const [il, setIl] = useState<string>('Ankara');
  const [ilce, setIlce] = useState<string>('Çankaya');
  const [ziyaretTuru, setZiyaretTuru] = useState<any>('Fiziki Ziyaret');
  const [ziyaretAmaci, setZiyaretAmaci] = useState<string>('Rutin Acente Ziyareti & Kampanya Sunumu');
  const [gorusulenKisiler, setGorusulenKisiler] = useState<string>('Harun Bey, Selin Hanım');
  const [iletisimKanali, setIletisimKanali] = useState<string>('Yüz Yüze');
  const [sure, setSure] = useState<string>('45 dk');
  const [sonuc, setSonuc] = useState<string>('Anlaşma sağlandı.');
  const [sonrakiAksion, setSonrakiAksion] = useState<string>('Temmuz ayında takip ziyareti.');
  const [sonrakiZiyaretTarihi, setSonrakiZiyaretTarihi] = useState<string>('2026-08-15');

  // Large Textarea Note
  const [notText, setNotText] = useState<string>(
    'Harun Bey oldukça samimi. Kararlar genellikle onun üzerinden ilerliyor. Sağlık departmanı yeni personel aldı. WhatsApp üzerinden iletişim kurmayı tercih ediyorlar. Temmuz ayında tekrar görüşülecek.'
  );

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzedMemory, setAnalyzedMemory] = useState<any>(null);

  // When user selects an agency, pre-fill province
  const handleAgencyChange = (selectedId: string) => {
    setAcenteId(selectedId);
    const agency = agencies.find((a) => a.id === selectedId);
    if (agency) {
      setIl(agency.il);
      setIlce(agency.ilce || 'Merkez');
    }
  };

  // Live AI Analysis Trigger
  const handleAnalyzeWithAI = async () => {
    if (!notText.trim()) return;
    setIsAnalyzing(true);
    try {
      const currentAgency = agencies.find((a) => a.id === acenteId);
      const res = await fetch('/api/ai/analyze-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteText: notText, agencyName: currentAgency?.adi }),
      });
      const data = await res.json();
      if (data.success && data.memory) {
        setAnalyzedMemory(data.memory);
      }
    } catch (e) {
      console.error('AI analyze error:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAgency = agencies.find((a) => a.id === acenteId);

    const newVisit: Visit = {
      id: 'v-' + Date.now(),
      tarih,
      saat,
      acenteId,
      acenteAdi: selectedAgency?.adi || 'Bilinmeyen Acente',
      acenteLogo: selectedAgency?.logo,
      temsilci,
      il,
      ilce,
      ziyaretTuru,
      sure,
      durum: 'Gerçekleşti',
      not: notText,
      gorusulenKisiler: gorusulenKisiler.split(',').map((s) => s.trim()),
      ziyaretAmaci,
      iletisimKanali,
      sonuc,
      sonrakiAksion,
      sonrakiZiyaretTarihi,
    };

    onSave(newVisit, analyzedMemory);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0057B8] text-white flex items-center justify-center font-bold shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Yeni Ziyaret Kaydı</h2>
              <p className="text-xs text-slate-500">Saha veya online acente görüşmesini kaydedin</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Grid Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Acente */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Acente *</label>
              <select
                value={acenteId}
                onChange={(e) => handleAgencyChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              >
                {agencies.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.adi} ({a.il})
                  </option>
                ))}
              </select>
            </div>

            {/* Temsilci */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Temsilci *</label>
              <input
                type="text"
                value={temsilci}
                onChange={(e) => setTemsilci(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              />
            </div>

            {/* Tarih */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Tarih *</label>
              <input
                type="date"
                value={tarih}
                onChange={(e) => setTarih(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              />
            </div>

            {/* Saat */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Saat *</label>
              <input
                type="text"
                value={saat}
                onChange={(e) => setSaat(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              />
            </div>

            {/* İl */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">İl *</label>
              <input
                type="text"
                value={il}
                onChange={(e) => setIl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              />
            </div>

            {/* İlçe */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">İlçe</label>
              <input
                type="text"
                value={ilce}
                onChange={(e) => setIlce(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              />
            </div>

            {/* Ziyaret Türü */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Ziyaret Türü</label>
              <select
                value={ziyaretTuru}
                onChange={(e) => setZiyaretTuru(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              >
                <option value="Fiziki Ziyaret">Fiziki Ziyaret</option>
                <option value="Online Görüşme">Online Görüşme</option>
                <option value="Telefon Görüşmesi">Telefon Görüşmesi</option>
                <option value="Saha Etkinliği">Saha Etkinliği</option>
              </select>
            </div>

            {/* Ziyaret Amacı */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Ziyaret Amacı</label>
              <input
                type="text"
                value={ziyaretAmaci}
                onChange={(e) => setZiyaretAmaci(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              />
            </div>

            {/* Görüşülen Kişiler */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Görüşülen Kişiler</label>
              <input
                type="text"
                value={gorusulenKisiler}
                onChange={(e) => setGorusulenKisiler(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              />
            </div>

            {/* İletişim Kanalı */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">İletişim Kanalı</label>
              <input
                type="text"
                value={iletisimKanali}
                onChange={(e) => setIletisimKanali(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              />
            </div>

            {/* Ziyaret Süresi */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Ziyaret Süresi</label>
              <input
                type="text"
                value={sure}
                onChange={(e) => setSure(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              />
            </div>

            {/* Sonraki Ziyaret Tarihi */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Sonraki Ziyaret Tarihi</label>
              <input
                type="date"
                value={sonrakiZiyaretTarihi}
                onChange={(e) => setSonrakiZiyaretTarihi(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 font-medium text-slate-900 outline-none focus:border-[#0057B8]"
              />
            </div>
          </div>

          {/* Large Textarea for Ziyaret Notu with detailed Turkish placeholder */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-900">Ziyaret Notu *</label>
              <button
                type="button"
                onClick={handleAnalyzeWithAI}
                disabled={isAnalyzing}
                className="text-xs font-bold text-[#0057B8] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bot className="w-3.5 h-3.5" />}
                <span>Yapay Zeka ile Analiz Et</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={notText}
              onChange={(e) => setNotText(e.target.value)}
              placeholder={`Bu görüşmede konuşulan tüm önemli detayları yazın.\nKimlerle görüşüldü?\nHangi konularda anlaşmaya varıldı?\nRiskler nelerdir?\nFırsatlar nelerdir?\nBir sonraki aksiyon nedir?`}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3.5 text-slate-900 outline-none focus:border-[#0057B8] font-sans leading-relaxed"
            />
          </div>

          {/* Blue AI Card (as requested) */}
          <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#0057B8] text-white flex items-center justify-center shrink-0 mt-0.5">
              🤖
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0057B8]">AI Asistan</h4>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                Bu kayıt kaydedildiğinde yapay zeka notları analiz ederek acentenin kalıcı hafızasını otomatik güncelleyecektir.
              </p>
            </div>
          </div>

          {/* Live AI Memory Preview Box if analyzed */}
          {analyzedMemory && (
            <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="font-bold text-amber-300 flex items-center">
                  <Sparkles className="w-4 h-4 mr-1" /> Oluşturulan Otomatik Hafıza
                </span>
                <span className="text-[10px] text-slate-400">Canlı Önizleme</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="bg-slate-800 p-2 rounded-lg">
                  <span className="text-slate-400 block">Karar Verici:</span>
                  <span className="font-bold text-white">{analyzedMemory.kararVerici}</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg">
                  <span className="text-slate-400 block">İletişim Tercihi:</span>
                  <span className="font-bold text-white">{analyzedMemory.iletisimTercihi}</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg">
                  <span className="text-slate-400 block">İlişki Seviyesi:</span>
                  <span className="font-bold text-emerald-400">{analyzedMemory.iliskiSeviyesi}</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg">
                  <span className="text-slate-400 block">İlgili Departman:</span>
                  <span className="font-bold text-white">{analyzedMemory.ilgiliDepartman}</span>
                </div>
              </div>
            </div>
          )}

          {/* Buttons: İptal & Kaydet */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0057B8] hover:bg-[#004290] shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center space-x-2"
            >
              <span>Kaydet & AI Hafızaya Ekle</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
