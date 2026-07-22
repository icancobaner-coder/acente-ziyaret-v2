import React, { useState } from 'react';
import { Visit, Agency } from '../types';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  Building2,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronDown,
  Plus,
} from 'lucide-react';

interface VisitsPageProps {
  visits: Visit[];
  agencies: Agency[];
  onSelectVisit: (visit: Visit) => void;
  onOpenNewVisitModal: () => void;
}

export const VisitsPage: React.FC<VisitsPageProps> = ({
  visits,
  agencies,
  onSelectVisit,
  onOpenNewVisitModal,
}) => {
  // Filter states
  const [selectedProvince, setSelectedProvince] = useState<string>('Tümü');
  const [selectedRep, setSelectedRep] = useState<string>('Tümü');
  const [selectedAgency, setSelectedAgency] = useState<string>('Tümü');
  const [selectedStatus, setSelectedStatus] = useState<string>('Tümü');
  const [selectedType, setSelectedType] = useState<string>('Tümü');
  const [dateRange, setDateRange] = useState<string>('Tüm Zamanlar');

  // Filtered visits logic
  const filteredVisits = visits.filter((v) => {
    if (selectedProvince !== 'Tümü' && v.il !== selectedProvince) return false;
    if (selectedRep !== 'Tümü' && v.temsilci !== selectedRep) return false;
    if (selectedAgency !== 'Tümü' && v.acenteAdi !== selectedAgency) return false;
    if (selectedStatus !== 'Tümü' && v.durum !== selectedStatus) return false;
    if (selectedType !== 'Tümü' && v.ziyaretTuru !== selectedType) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title & Action Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ziyaretler</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tüm saha ve online acente ziyaret kayıtları, filtreler ve detaylar
          </p>
        </div>

        <button
          onClick={onOpenNewVisitModal}
          className="flex items-center space-x-2 bg-[#0057B8] hover:bg-[#004290] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Yeni Ziyaret Kaydı</span>
        </button>
      </div>

      {/* Filter Bar (Filters as specified) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 pb-2 border-b border-slate-100">
          <Filter className="w-4 h-4 text-[#0057B8]" />
          <span>Detaylı Ziyaret Filtreleri</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Tarih Aralığı */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Tarih Aralığı</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-[#0057B8]"
            >
              <option value="Tüm Zamanlar">Tüm Zamanlar</option>
              <option value="Bugün">Bugün</option>
              <option value="Bu Hafta">Bu Hafta</option>
              <option value="Bu Ay">Bu Ay</option>
            </select>
          </div>

          {/* 2. İl */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">İl</label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-[#0057B8]"
            >
              <option value="Tümü">Tüm İller</option>
              <option value="Ankara">Ankara</option>
              <option value="İstanbul">İstanbul</option>
              <option value="İzmir">İzmir</option>
            </select>
          </div>

          {/* 3. Temsilci */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Temsilci</label>
            <select
              value={selectedRep}
              onChange={(e) => setSelectedRep(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-[#0057B8]"
            >
              <option value="Tümü">Tüm Temsilciler</option>
              <option value="Ahmet Yılmaz">Ahmet Yılmaz</option>
              <option value="Mehmet Demir">Mehmet Demir</option>
              <option value="Elif Şahin">Elif Şahin</option>
            </select>
          </div>

          {/* 4. Acente */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Acente</label>
            <select
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-[#0057B8]"
            >
              <option value="Tümü">Tüm Acenteler</option>
              {agencies.map((a) => (
                <option key={a.id} value={a.adi}>
                  {a.adi}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Durum */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Durum</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-[#0057B8]"
            >
              <option value="Tümü">Tüm Durumlar</option>
              <option value="Gerçekleşti">Gerçekleşti</option>
              <option value="Planlandı">Planlandı</option>
              <option value="İptal">İptal</option>
            </select>
          </div>

          {/* 6. Ziyaret Türü */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Ziyaret Türü</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-[#0057B8]"
            >
              <option value="Tümü">Tüm Türler</option>
              <option value="Fiziki Ziyaret">Fiziki Ziyaret</option>
              <option value="Online Görüşme">Online Görüşme</option>
              <option value="Telefon Görüşmesi">Telefon Görüşmesi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modern Table Component */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Tarih</th>
                <th className="py-3.5 px-3">Saat</th>
                <th className="py-3.5 px-4">Acente</th>
                <th className="py-3.5 px-4">Temsilci</th>
                <th className="py-3.5 px-3">İl</th>
                <th className="py-3.5 px-4">Ziyaret Türü</th>
                <th className="py-3.5 px-3">Süre</th>
                <th className="py-3.5 px-3">Durum</th>
                <th className="py-3.5 px-4">Not</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {filteredVisits.map((visit) => (
                <tr
                  key={visit.id}
                  onClick={() => onSelectVisit(visit)}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                >
                  {/* Tarih */}
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {visit.tarih}
                  </td>

                  {/* Saat */}
                  <td className="py-3.5 px-3 font-semibold text-slate-600 whitespace-nowrap">
                    {visit.saat}
                  </td>

                  {/* Acente Name + Logo */}
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 p-0.5 border border-slate-200 overflow-hidden shrink-0">
                        {visit.acenteLogo ? (
                          <img src={visit.acenteLogo} alt={visit.acenteAdi} className="w-full h-full object-cover rounded-md" />
                        ) : (
                          <Building2 className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className="group-hover:text-[#0057B8] transition-colors">{visit.acenteAdi}</span>
                    </div>
                  </td>

                  {/* Temsilci */}
                  <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                    {visit.temsilci}
                  </td>

                  {/* İl */}
                  <td className="py-3.5 px-3 font-medium text-slate-600 whitespace-nowrap">
                    📍 {visit.il}
                  </td>

                  {/* Ziyaret Türü */}
                  <td className="py-3.5 px-4 font-medium whitespace-nowrap">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                      {visit.ziyaretTuru}
                    </span>
                  </td>

                  {/* Süre */}
                  <td className="py-3.5 px-3 font-semibold text-slate-600 whitespace-nowrap">
                    {visit.sure}
                  </td>

                  {/* Durum Badge */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        visit.durum === 'Gerçekleşti'
                          ? 'bg-emerald-100 text-emerald-800'
                          : visit.durum === 'Planlandı'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {visit.durum}
                    </span>
                  </td>

                  {/* Not Preview */}
                  <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                    {visit.not}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVisits.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            Seçilen filtrelere uygun ziyaret kaydı bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};
