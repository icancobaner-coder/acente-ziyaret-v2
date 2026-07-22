import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { Bot, Send, Sparkles, User, RefreshCw, HelpCircle, Loader2 } from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Merhaba! Ben Anadolu Sigorta AI Saha Asistanıyım. Bütün acente ziyaret notları ve kalıcı hafıza verileriyle hizmetinizdeyim. Hangi acente veya randevu hakkında bilgi almak istersiniz?',
      timestamp: 'Şimdi',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'Web Sigorta\'ya gitmeden önce bilmem gerekenler neler?',
    'Son 10 ziyareti özetle.',
    'Karar verici kim?',
    'Hangi fırsatlar henüz değerlendirilmedi?',
    'Yarınki görüşmeye nasıl hazırlanmalıyım?',
  ];

  const handleSendMessage = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, agencyName: 'WEB Sigorta' }),
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: 'a-' + Date.now(),
        sender: 'assistant',
        text: data.answer || 'Üzgünüm, şu an yanıt oluşturulamadı.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error('Chat error:', e);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: 'Bağlantı sırasında bir hata oluştu. Lütfen tekrar deneyin.',
          timestamp: 'Şimdi',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] sm:h-[calc(100vh-140px)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-3 sm:p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-900 to-[#0057B8] text-white flex items-center justify-center font-bold shadow-2xs shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">Anadolu Sigorta AI Saha Asistanı</h2>
            <p className="text-[10px] sm:text-[11px] text-slate-500">Tüm acente ziyaret hafızasını sorgulayın</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            ● Canlı Gemini 3.6
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 bg-slate-50/30">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] sm:max-w-2xl rounded-2xl p-3 sm:p-4 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#0057B8] text-white rounded-br-none shadow-sm'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-2xs rounded-bl-none'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1 opacity-80 text-[10px]">
                {m.sender === 'assistant' ? (
                  <span className="font-bold text-[#0057B8]">🤖 AI Saha Asistanı</span>
                ) : (
                  <span className="font-bold text-blue-100">Siz (Ahmet Yılmaz)</span>
                )}
                <span>•</span>
                <span>{m.timestamp}</span>
              </div>

              <div className="whitespace-pre-line font-sans">{m.text}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-2 text-xs text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin text-[#0057B8]" />
              <span>Acente hafızası sorgulanıyor ve yanıt hazırlanıyor...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-2.5 sm:p-3 bg-slate-50 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 shrink-0 pl-1">Öneriler:</span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-[10px] sm:text-[11px] font-medium bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0057B8] border border-slate-200 px-2.5 sm:px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer shadow-2xs min-h-[36px] flex items-center"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center space-x-2 sm:space-x-3">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Acenteler veya ziyaret notları hakkında soru sorun..."
          className="flex-1 bg-slate-100 hover:bg-slate-100/80 text-slate-900 text-xs rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#0057B8] focus:bg-white border border-transparent transition-all font-sans min-h-[44px]"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isLoading}
          className="bg-[#0057B8] hover:bg-[#004290] disabled:opacity-50 text-white font-bold p-2.5 sm:p-3 rounded-xl shadow-sm transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
