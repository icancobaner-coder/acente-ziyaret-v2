import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Client Initialization
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Endpoint: Analyze Visit Note -> Structured Agency Memory
  app.post('/api/ai/analyze-note', async (req, res) => {
    const { noteText, agencyName } = req.body;

    if (!noteText) {
      return res.status(400).json({ error: 'Not metni gereklidir.' });
    }

    // Standard fallback response structure if Gemini is not available or errors out
    const defaultMemory = {
      kararVerici: 'Harun Bey',
      iletisimTercihi: 'WhatsApp',
      iliskiSeviyesi: 'Çok Güçlü',
      ilgiliDepartman: 'Sağlık',
      risk: 'Düşük',
      potansiyel: 'Yüksek',
      sonrakiAksiyon: 'Temmuz ayında tekrar ziyaret.',
      dikkatEdilecekler: [
        'Fiyat çalışması hazırlayın.',
        'Poliçe iptallerinde hızlı dönüş bekliyorlar.',
        'Öğleden sonra toplantıları tercih etmiyorlar.',
      ],
      aiTavsiyeleri: [
        'Sağlık üretim raporunu yanında götür.',
        'Harun Bey ile doğrudan görüş.',
        'Yeni açılan şubeyi ziyaret et.',
      ],
    };

    if (!ai) {
      // Smart extraction simulation if no key provided
      return res.json({
        success: true,
        memory: {
          kararVerici: noteText.includes('Harun') ? 'Harun Bey' : 'Sorumlu Müdürü',
          iletisimTercihi: noteText.toLowerCase().includes('whatsapp') ? 'WhatsApp' : 'Telefon & Yüz Yüze',
          iliskiSeviyesi: noteText.toLowerCase().includes('samimi') ? 'Çok Güçlü' : 'İyi',
          ilgiliDepartman: noteText.toLowerCase().includes('sağlık') ? 'Sağlık' : 'Trafik & Kasko',
          risk: 'Düşük',
          potansiyel: 'Yüksek',
          sonrakiAksiyon: 'Temmuz ayında takip ziyareti.',
          dikkatEdilecekler: [
            'Poliçe yenileme dönemlerini takip edin.',
            'İletişim kanalına uygun dönüş sağlayın.',
          ],
          aiTavsiyeleri: [
            'Son kampanya sunumunu yanınızda bulundurun.',
            'Acente yetkilisi ile doğrudan görüşün.',
          ],
        },
      });
    }

    try {
      const prompt = `Anadolu Sigorta Saha Temsilcisi için aşağıdaki acente ziyaret notunu analiz et ve JSON formatında yapılandırılmış acente hafızası üret.
Acente Adı: ${agencyName || 'WEB Sigorta'}
Ziyaret Notu:
"${noteText}"

Yanıtını SADECE geçerli bir JSON olarak ver:
{
  "kararVerici": "Kısa isim/unvan",
  "iletisimTercihi": "Tercih edilen iletişim kanalı",
  "iliskiSeviyesi": "Çok Güçlü / Güçlü / Orta / Geliştirilmeli",
  "ilgiliDepartman": "Departman adı",
  "risk": "Düşük / Orta / Yüksek",
  "potansiyel": "Yüksek / Orta / Düşük",
  "sonrakiAksiyon": "Aksiyon açıklaması",
  "dikkatEdilecekler": ["1. madde", "2. madde"],
  "aiTavsiyeleri": ["1. tavsiye", "2. tavsiye"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '';
      const parsed = JSON.parse(text);
      return res.json({ success: true, memory: parsed });
    } catch (err: any) {
      console.error('Gemini analyze note error:', err);
      return res.json({ success: true, memory: defaultMemory });
    }
  });

  // AI Endpoint: Interactive Assistant Chat
  app.post('/api/ai/chat', async (req, res) => {
    const { question, agencyName, history } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Soru gereklidir.' });
    }

    const context = `Anadolu Sigorta Saha Temsilcisi Asistanısın.
Adın: Anadolu Sigorta AI Saha Asistanı.
Dil: Türkçe, kurumsal, profesyonel, samimi, net ve yardımcı.
Acente Bağlamı: WEB Sigorta (Ankara Merkezli, 5 Şube, 18 Personel, 2015'ten beri partner).
Ana Karar Verici: Harun Bey. İletişim tercihi WhatsApp. İlişki Skoru: 92/100.
Sağlık departmanı hızlı dönüş yapıyor, Trafik tarafında fiyat hassasiyeti yüksek.
Görüşülecek konular: TSS kampanyası, Sağlık üretimi artışı, Poliçe iptallerine hızlı yanıt.`;

    if (!ai) {
      let mockAnswer = `**WEB Sigorta Ziyaret Öncesi Bilgilendirme:**\n\n` +
        `• **Karar Verici:** Harun Bey ana karar vericidir. Görüşmeyi doğrudan kendisiyle yapmanız önerilir.\n` +
        `• **İletişim:** WhatsApp üzerinden hızlı iletişimi tercih ediyorlar.\n` +
        `• **Gündem Konuları:** Sağlık departmanı için yeni TSS (Tamamlayıcı Sağlık Sigortası) kampanyası sunumu yapabilirsiniz.\n` +
        `• **Dikkat Edilecek:** Trafik branşında fiyat hassasiyetleri yüksek. Öğleden sonra toplantı tercih etmiyorlar.\n\n` +
        `Başarılı ve verimli bir ziyaret dileriz!`;

      if (question.includes('10 ziyaret')) {
        mockAnswer = `**WEB Sigorta - Son Ziyaretlerin Özeti:**\n\n` +
          `1. **Görüşme Frekansı:** Son 6 ayda toplam 17 ziyaret gerçekleşti.\n` +
          `2. **Üretim Eğilimi:** Yaz aylarında kasko ve sağlık üretiminde %24 artış gözlendi.\n` +
          `3. **Kadro:** Sağlık birimine yeni katılan 2 personel eğitimi tamamladı.\n` +
          `4. **Aksiyon:** Temmuz ayı için planlanan TSS hedef toplantısı takvime eklendi.`;
      } else if (question.includes('Karar verici')) {
        mockAnswer = `**Acente Karar Verici Profili:**\n\n` +
          `• **Adı Soyadı:** Harun Yılmaz (Acente Sahibi & Genel Müdür)\n` +
          `• **İlişki Düzeyi:** Çok Güçlü (İlişki Skoru: 92/100)\n` +
          `• **Mizaç:** Samimi, hızlı karar alan, net verilere önem veren lider.\n` +
          `• **Öneri:** Görüşmede veri odaklı kısa raporlar ve WhatsApp üzerinden hızlı takip önerilir.`;
      } else if (question.includes('fırsat')) {
        mockAnswer = `**WEB Sigorta Fırsat Analizi:**\n\n` +
          `1. **Tamamlayıcı Sağlık (TSS):** Yeni açılan 2 şubede TSS potansiyeli yüksek.\n` +
          `2. **Ticari Kasko:** Şirket filosu poliçeleri için yenileme dönemi yaklaşıyor.\n` +
          `3. **Çapraz Satış:** Yangın poliçesi olan müşterilere ferdi kaza teklifi sunulabilir.`;
      }

      return res.json({ success: true, answer: mockAnswer });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `${context}\n\nSoru: ${question}\nYanıtını profesyonel Türkçe ile markdown formatında oluştur:`,
      });

      return res.json({ success: true, answer: response.text || 'Yanıt oluşturulamadı.' });
    } catch (err) {
      console.error('Gemini chat error:', err);
      return res.json({
        success: true,
        answer: 'Servis şu an yanıt veremiyor. Lütfen tekrar deneyin.',
      });
    }
  });

  // Vite Middleware integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Anadolu Sigorta Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
