import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import { ScreenId } from '../../types';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onNavigateToScreen?: (screen: ScreenId) => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
  onNavigateToScreen
}) => {
  const [inputMessage, setInputMessage] = useState(initialPrompt);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; details?: any }>>([
    {
      sender: 'agent',
      text: 'Halo Johanes. Saya SERVEON Agent (Governed Level 1). Saya siap membantu Anda menganalisis data spasial, pelanggan, dan rekomendasi keputusan untuk wilayah Jawa Tengah. Apa yang ingin Anda evaluasi?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      // Governed structured response answering the query with Jawa Tengah pilot data
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: `Berdasarkan analisis terkini periode September 2026 untuk Jawa Tengah:`,
          details: {
            topPriorities: [
              { area: 'Semarang Timur', strategy: 'DEFEND', score: 91, note: 'Nilai pelanggan tinggi, tekanan kompetitor meningkat, celah cakupan layanan.' },
              { area: 'Surakarta Utara', strategy: 'RETAIN', score: 87, note: 'Pelanggan bernilai tinggi, frekuensi layanan menurun (-18%), risiko retensi tinggi.' },
              { area: 'Purwokerto Utara', strategy: 'ACQUIRE', score: 83, note: 'Potensi demografi usia produktif kuat, penetrasi saat ini rendah (19,2%).' }
            ],
            confidence: '94,2%',
            source: 'Model Retensi v1.3 & Spatial MCDM Engine',
            recommendation: 'Disarankan segera mengotorisasi draf campaign retensi Semarang Timur dan meninjau kandidat outlet baru.'
          }
        }
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DDE3EA] flex flex-col h-[620px] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DDE3EA] bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F7C7B] to-[#2563EB] flex items-center justify-center text-white shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[#17212B]">SERVEON Intelligence Agent</h3>
                <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  Level 1 — Recommend Only
                </span>
              </div>
              <p className="text-[11px] text-[#607080]">Kecerdasan Keputusan &amp; Rekomendasi Terotentikasi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#2563EB] text-white rounded-br-none'
                    : 'bg-[#F5F7FA] text-[#17212B] border border-[#DDE3EA] rounded-bl-none space-y-3'
                }`}
              >
                <p>{msg.text}</p>

                {msg.details && (
                  <div className="space-y-3 mt-3 pt-3 border-t border-[#DDE3EA]">
                    <div className="space-y-2">
                      {msg.details.topPriorities.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-white border border-[#DDE3EA] flex items-start justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2 font-semibold text-[#17212B]">
                              <span>{idx + 1}. {item.area}</span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                                  item.strategy === 'DEFEND'
                                    ? 'bg-red-50 text-red-600'
                                    : item.strategy === 'RETAIN'
                                    ? 'bg-amber-50 text-amber-600'
                                    : 'bg-teal-50 text-teal-600'
                                }`}
                              >
                                {item.strategy}
                              </span>
                              <span className="text-[#607080] text-[11px]">Skor: {item.score}</span>
                            </div>
                            <p className="text-[11px] text-[#607080] mt-1">{item.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 rounded bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900">
                      <strong>Rekomendasi Tindakan:</strong> {msg.details.recommendation}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#607080] pt-1">
                      <span>Sumber: {msg.details.source}</span>
                      <span>Keyakinan: {msg.details.confidence}</span>
                    </div>

                    {onNavigateToScreen && (
                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => {
                            onNavigateToScreen('pertahanan-pasar');
                            onClose();
                          }}
                          className="flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] hover:underline"
                        >
                          <span>Buka Pertahanan Pasar</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#F5F7FA] border border-[#DDE3EA] rounded-2xl rounded-bl-none p-3 flex items-center gap-1.5 text-xs text-[#607080]">
                <Sparkles className="w-3.5 h-3.5 text-[#0F7C7B] animate-spin" />
                <span>Menganalisis matriks strategi spasial...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#DDE3EA] bg-white">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanyakan analisis wilayah, prioritas pelanggan, atau aksi kanal..."
              className="w-full bg-[#F5F7FA] border border-[#DDE3EA] focus:border-[#2563EB] focus:bg-white text-xs text-[#17212B] rounded-xl pl-4 pr-12 py-3 outline-none transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              className="absolute right-2 p-2 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[#607080]">
            <span>Pertanyaan saran: &ldquo;Wilayah mana di Jawa Tengah yang paling perlu perhatian?&rdquo;</span>
            <span className="text-[10px] text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Tindakan material memerlukan persetujuan manusia
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
