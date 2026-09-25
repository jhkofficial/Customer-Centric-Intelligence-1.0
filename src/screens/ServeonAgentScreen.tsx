import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Layers,
  ArrowRight,
  Database,
  Compass,
  AlertTriangle
} from 'lucide-react';
import { ScreenId } from '../types';

interface ServeonAgentScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ServeonAgentScreen: React.FC<ServeonAgentScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<'exec' | 'spatial' | 'retention' | 'omni'>('exec');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; details?: any }>>([
    {
      sender: 'agent',
      text: 'Halo Johanes. Saya SERVEON Copilot (Governed Autonomous Level 1). Saya beroperasi dalam mode rekomendasi dengan batasan audit ketat. Silakan pilih spesialisasi agent atau ajukan pertanyaan strategis Anda.',
      details: {
        activeCapabilities: [
          'Spatial multi-criteria decision making (MCDM)',
          'Analisis faktor pendorong SHAP tingkat nasabah & wilayah',
          'Rekomendasi alokasi kanal omnichannel terpatuh izin kontak'
        ],
        governance: 'Semua rekomendasi material memerlukan konfirmasi manusia sebelum eksekusi.'
      }
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const agents = [
    { id: 'exec', name: 'SERVEON Executive Copilot', role: 'Konsultasi Strategis Umum & Ringkasan Eksekutif' },
    { id: 'spatial', name: 'Location Intelligence Specialist', role: 'Analisis Spasial, Catchment & MCDM Lokasi' },
    { id: 'retention', name: 'Retention & Churn Specialist', role: 'Prediksi Churn, Segmentasi & Driver SHAP' },
    { id: 'omni', name: 'Omnichannel Orchestrator', role: 'Optimasi Jadwal, Template & Kepatuhan Kontak' }
  ];

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: `Hasil analisis mendalam terverifikasi untuk "${userText}":`,
          details: {
            summary: 'Tiga prioritas utama Jawa Tengah teridentifikasi: Semarang Timur (DEFEND 91), Surakarta Utara (RETAIN 87), dan Purwokerto Utara (ACQUIRE 83).',
            evidence: 'Data agregasi transaksi CRM per 22 Sep 2026, 38 POI kompetitor, dan indeks demografi BPS.',
            suggestedAction: 'Buka draf kampanye omnichannel untuk Semarang Timur atau simulasikan penambahan outlet satelit di Purwokerto.',
            actionScreen: 'campaign-omnichannel' as ScreenId
          }
        }
      ]);
    }, 700);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
              SERVEON Intelligence Agent Workspace
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              Governed Level 1 · Human-in-the-Loop
            </span>
          </div>
          <p className="text-xs text-[#607080]">
            Kecerdasan agentik berbasis bukti (evidence-backed) untuk mendukung keputusan pelanggan dan wilayah di Jawa Tengah.
          </p>
        </div>
      </div>

      {/* Main Workspace: Agent Selector (Left 3 cols) + Chat Interface (6 cols) + Evidence & Citations (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Agent Specialist Selector */}
        <div className="lg:col-span-3 bg-white border border-[#DDE3EA] rounded-xl p-3.5 space-y-3 flex flex-col h-[640px]">
          <div className="text-[11px] font-bold text-[#607080] uppercase tracking-wider px-1">
            PILIH SPESIALIS AGENT
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto pr-1">
            {agents.map((ag) => {
              const isSelected = ag.id === selectedAgentId;
              return (
                <div
                  key={ag.id}
                  onClick={() => setSelectedAgentId(ag.id as any)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#2563EB] bg-blue-50/50 shadow-2xs'
                      : 'border-[#DDE3EA] bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Bot className={`w-4 h-4 ${isSelected ? 'text-[#2563EB]' : 'text-[#607080]'}`} />
                    <span className="font-bold text-xs text-[#17212B]">{ag.name}</span>
                  </div>
                  <p className="text-[11px] text-[#607080] mt-1 leading-snug">{ag.role}</p>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-900 leading-relaxed">
            <div className="font-bold mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prinsip Otonomi Terkendali</span>
            </div>
            Agent dilarang mengeksekusi pesan langsung atau alokasi anggaran tanpa persetujuan manusia.
          </div>
        </div>

        {/* Center: Main Dialogue Canvas */}
        <div className="lg:col-span-6 bg-white border border-[#DDE3EA] rounded-xl flex flex-col h-[640px] overflow-hidden">
          {/* Active Agent Banner */}
          <div className="p-4 border-b border-[#DDE3EA] bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F7C7B] to-[#2563EB] flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-[#17212B]">
                  {agents.find((a) => a.id === selectedAgentId)?.name}
                </h2>
                <div className="text-[10px] text-emerald-600 font-medium">Sistem Aktif &amp; Terhubung ke Pipeline</div>
              </div>
            </div>
            <span className="text-[10px] text-[#607080]">Model: Gemini 2.5 Flash / Decision Engine</span>
          </div>

          {/* Dialogue History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
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
                    <div className="p-3 rounded-lg bg-white border border-[#DDE3EA] space-y-2 text-[11px] text-slate-700">
                      {msg.details.activeCapabilities && (
                        <div>
                          <strong className="text-[#17212B]">Kapabilitas Agent:</strong>
                          <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[#607080]">
                            {msg.details.activeCapabilities.map((cap: string, i: number) => (
                              <li key={i}>{cap}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {msg.details.summary && (
                        <div>
                          <strong className="text-[#17212B]">Rangkuman Bukti:</strong>
                          <p className="mt-0.5 text-[#607080]">{msg.details.summary}</p>
                        </div>
                      )}

                      {msg.details.suggestedAction && (
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[#17212B] font-semibold">Tindakan Lanjutan:</span>
                          <button
                            onClick={() => msg.details.actionScreen && onNavigateToScreen(msg.details.actionScreen)}
                            className="text-[#2563EB] font-bold hover:underline flex items-center gap-1"
                          >
                            <span>Buka Layar Eksekusi</span>
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
                <div className="bg-[#F5F7FA] border border-[#DDE3EA] rounded-2xl rounded-bl-none p-3 flex items-center gap-2 text-xs text-[#607080]">
                  <Sparkles className="w-3.5 h-3.5 text-[#0F7C7B] animate-spin" />
                  <span>Agent memverifikasi data dan garis keturunan bukti...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-[#DDE3EA] bg-white">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanyakan analisis wilayah Jawa Tengah, rekomendasi kampanye, atau kriteria lokasi..."
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
          </div>
        </div>

        {/* Right: Evidence & Lineage Citation Panel */}
        <div className="lg:col-span-3 bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-4 flex flex-col justify-between h-[640px]">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#DDE3EA]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-bold text-xs text-[#17212B] uppercase tracking-wider">
                  Sitasi Bukti &amp; Silsilah Data
                </h3>
              </div>
              <p className="text-[11px] text-[#607080] mt-0.5">
                Sumber terverifikasi yang mendasari setiap inferensi agen.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA] space-y-1">
                <div className="text-[11px] font-semibold text-[#17212B]">Tabel Transaksi Pelanggan (CRM)</div>
                <div className="text-[10px] text-[#607080]">Update: 22 Sep 2026, 23.45 WIB · 1.248.560 Rekord</div>
              </div>

              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA] space-y-1">
                <div className="text-[11px] font-semibold text-[#17212B]">Registri Spasial &amp; POI Kompetitor</div>
                <div className="text-[10px] text-[#607080]">Update: 15 Sep 2026 · 38 Outlet Kompetitor Jawa Tengah</div>
              </div>

              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA] space-y-1">
                <div className="text-[11px] font-semibold text-[#17212B]">Model Retensi v1.3</div>
                <div className="text-[10px] text-emerald-700 font-semibold">AUROC 0,86 · Drift Score 0,04 (Stabil)</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDE3EA] space-y-2">
            <button
              onClick={() => onNavigateToScreen('audit-governance')}
              className="w-full py-2 px-3 border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold transition-colors"
            >
              Periksa Log Audit Interaksi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
