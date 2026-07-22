export type PageType =
  | 'dashboard'
  | 'calendar'
  | 'visits'
  | 'agencies'
  | 'agency-profile'
  | 'ai-assistant'
  | 'reports'
  | 'settings';

export type VisitStatus = 'Gerçekleşti' | 'Planlandı' | 'İptal';

export type VisitType = 'Fiziki Ziyaret' | 'Online Görüşme' | 'Telefon Görüşmesi' | 'Saha Etkinliği';

export interface Visit {
  id: string;
  tarih: string; // YYYY-MM-DD
  saat: string;
  acenteId: string;
  acenteAdi: string;
  acenteLogo?: string;
  temsilci: string;
  il: string;
  ilce?: string;
  ziyaretTuru: VisitType;
  sure: string; // e.g. "45 dk"
  durum: VisitStatus;
  not: string;
  gorusulenKisiler?: string[];
  ziyaretAmaci?: string;
  iletisimKanali?: string;
  sonuc?: string;
  sonrakiAksion?: string;
  sonrakiZiyaretTarihi?: string;
}

export interface AgencyMemory {
  kararVerici: string;
  iletisimTercihi: string;
  iliskiSeviyesi: string;
  ilgiliDepartman: string;
  risk: string;
  potansiyel: string;
  sonrakiAksiyon: string;
  dikkatEdilecekler: string[];
  aiTavsiyeleri: string[];
  sonZiyaretOzet: {
    tarih: string;
    notlar: string[];
  };
}

export interface PersonContact {
  id: string;
  adSoyad: string;
  unvan: string;
  telefon: string;
  ePosta: string;
  kararVericiMi: boolean;
}

export interface Branch {
  id: string;
  ad: string;
  adres: string;
  personelSayisi: number;
  mudur: string;
}

export interface Agency {
  id: string;
  adi: string;
  logo: string;
  iliskiSkoru: number; // e.g. 92
  il: string;
  ilce: string;
  subeSayisi: number;
  personelSayisi: number;
  katilimYili: number; // e.g. 2015
  saglikPotansiyeli: string; // e.g. 'Çok Yüksek'
  uretimPerformansi: string; // e.g. '12.4 M ₺ / Yıl'
  sonZiyaretTarihi: string;
  sonrakiZiyaretTarihi: string;
  memory: AgencyMemory;
  contacts: PersonContact[];
  branches: Branch[];
  departments: string[];
  reminders: string[];
  monthlyProduction: { ay: string; uretim: number; hedef: number }[];
  visitHistoryCount: { ay: string; ziyaret: number }[];
  relationshipTrend: { ay: string; skor: number }[];
}

export interface DashboardStats {
  toplamZiyaret: number;
  gerçeklesen: number;
  planlanan: number;
  iptalEdilen: number;
  ortalamaSure: string;
  aiOzetSayisi: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
