import React, { useState } from 'react';
import {
  MessageSquare,
  Phone,
  Send,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  UserCheck,
  ShieldCheck,
  AlertCircle,
  Paperclip,
  Smile,
  Search,
  Filter,
  Layers,
  PhoneCall,
  Bell,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { OmnichannelMessage, ProspectProfile } from '../../types/orchestration';
import {
  BUDI_OMNICHANNEL_CONVERSATIONS,
  INITIAL_PROSPECTS
} from '../../data/orchestrationData';

interface OmnichannelCommunicationTabProps {
  onShowToast: (msg: string) => void;
  onOpenFollowUpModal: (prospect: ProspectProfile) => void;
  onOpenCustomerDrawer: (prospect: ProspectProfile) => void;
}

export const OmnichannelCommunicationTab: React.FC<OmnichannelCommunicationTabProps> = ({
  onShowToast,
  onOpenFollowUpModal,
  onOpenCustomerDrawer
}) => {
  const [messages, setMessages] = useState<OmnichannelMessage[]>(BUDI_OMNICHANNEL_CONVERSATIONS);
  const [activeProspectId, setActiveProspectId] = useState<string>('prospect-001');
  const [replyText, setReplyText] = useState('');
  const [activeSendChannel, setActiveSendChannel] = useState<'WhatsApp' | 'Phone' | 'SMS'>('WhatsApp');

  const activeProspect = INITIAL_PROSPECTS.find((p) => p.id === activeProspectId) || INITIAL_PROSPECTS[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: OmnichannelMessage = {
      id: `msg-${Date.now()}`,
      prospectId: activeProspect.id,
      customerName: activeProspect.name,
      timestamp: 'Baru saja',
      channel: activeSendChannel === 'WhatsApp' ? 'WhatsApp' : activeSendChannel === 'Phone' ? 'Phone' : 'SMS',
      direction: 'outbound',
      senderName: 'Andi Pratama (Sales Advisor)',
      content: replyText,
      status: 'Delivered'
    };

    setMessages([...messages, newMsg]);
    setReplyText('');
    onShowToast(`Pesan berhasil dikirim via ${activeSendChannel} ke ${activeProspect.name}.`);
  };

  const handleQuickTemplate = (text: string) => {
    setReplyText(text);
  };

  return (
    <div className="space-y-6">
      {/* Channel Infrastructure Status Bar */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#DDE3EA]">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#2563EB]" />
              <span>Omnichannel Communication Hub &amp; Gateway Multi-Kanal</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola percakapan terpadu WhatsApp, panggilan telepon, notifikasi push aplikasi, dan kunjungan dealer dalam satu timeline real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Gateway Aktif &amp; Terhubung (99,9% SLA)</span>
            </span>
          </div>
        </div>

        {/* 4 Gateway Channels Status Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 text-xs">
          <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-emerald-900 truncate">WhatsApp Cloud API</div>
              <div className="text-[10px] text-emerald-700">Akun Centang Hijau Resmi</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/40 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-blue-900 truncate">Telepon &amp; CTI Dialer</div>
              <div className="text-[10px] text-blue-700">12 Agen Sales Online</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/40 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-purple-900 truncate">Push Mobile Apps</div>
              <div className="text-[10px] text-purple-700">Aplikasi Mobile Apps Terintegrasi</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-amber-900 truncate">Showroom DMS Astra</div>
              <div className="text-[10px] text-amber-700">Sinkronisasi SPK Otomatis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Omnichannel Messaging Workspace (3 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[620px]">
        {/* Left: Contacts / Prospects Queue (3.5 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#DDE3EA] rounded-2xl shadow-2xs flex flex-col overflow-hidden">
          <div className="p-3.5 border-b border-[#DDE3EA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Antrean Percakapan Prospek</span>
              <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                {INITIAL_PROSPECTS.length} Kontak
              </span>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama atau nomor..."
                className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#DDE3EA]/60">
            {INITIAL_PROSPECTS.map((p) => {
              const isSelected = p.id === activeProspectId;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setActiveProspectId(p.id);
                    onShowToast(`Membuka percakapan ${p.name}`);
                  }}
                  className={`p-3 cursor-pointer transition-all ${
                    isSelected ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="font-bold text-xs text-slate-900 truncate">{p.name}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{p.lastInteractionTime}</span>
                  </div>

                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {p.productInterest} · <span className="font-mono">{p.phone}</span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      Skor {p.leadScore}
                    </span>
                    <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 truncate max-w-[150px]">
                      {p.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Live Unified Conversation Stream (5.5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#DDE3EA] rounded-2xl shadow-2xs flex flex-col overflow-hidden">
          {/* Active Contact Header */}
          <div className="p-3.5 border-b border-[#DDE3EA] flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                {activeProspect.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                  <span>{activeProspect.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[10px] text-slate-500">
                  {activeProspect.phone} · Minat: {activeProspect.productInterest}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenFollowUpModal(activeProspect)}
                className="px-2.5 py-1 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition-colors"
              >
                Catat Hasil
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/30">
            {messages.map((msg) => {
              const isOut = msg.direction === 'outbound';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isOut ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                    <span>{msg.senderName}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-600 flex items-center gap-0.5">
                      {msg.channel === 'WhatsApp' ? (
                        <MessageSquare className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Phone className="w-3 h-3 text-blue-600" />
                      )}
                      <span>{msg.channel}</span>
                    </span>
                  </div>

                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      isOut
                        ? 'bg-blue-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-[#DDE3EA] rounded-bl-xs'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {isOut && msg.status && (
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 px-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>{msg.status}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Reply Template Pills */}
          <div className="px-3 py-2 bg-slate-100/70 border-t border-[#DDE3EA] overflow-x-auto flex items-center gap-1.5 text-xs scrollbar-none">
            <span className="text-[10px] font-bold text-slate-500 shrink-0">Balas Cepat:</span>
            <button
              onClick={() => handleQuickTemplate('Halo Mas Budi! Kami ada kabar baik, ada program subsidi DP Rp800.000 dari FIFGROUP untuk CB150R.')}
              className="px-2 py-0.5 rounded-full bg-white border border-slate-300 text-[10.5px] text-slate-700 hover:border-blue-500 hover:text-blue-600 shrink-0 whitespace-nowrap transition-colors"
            >
              Subsidi DP FIFGROUP
            </button>
            <button
              onClick={() => handleQuickTemplate('Apakah berkenan kami jadwalkan test drive akhir pekan ini di Dealer Pandanaran? Unit CB150R siap digunakan.')}
              className="px-2 py-0.5 rounded-full bg-white border border-slate-300 text-[10.5px] text-slate-700 hover:border-blue-500 hover:text-blue-600 shrink-0 whitespace-nowrap transition-colors"
            >
              Undangan Test Drive
            </button>
            <button
              onClick={() => handleQuickTemplate('Baik Mas, kami catat untuk menghubungi kembali tanggal 1 bulan depan sesuai rencana pencairan dana.')}
              className="px-2 py-0.5 rounded-full bg-white border border-slate-300 text-[10.5px] text-slate-700 hover:border-blue-500 hover:text-blue-600 shrink-0 whitespace-nowrap transition-colors"
            >
              Konfirmasi Tunda Beli
            </button>
          </div>

          {/* Send Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#DDE3EA] flex items-center gap-2">
            <select
              value={activeSendChannel}
              onChange={(e) => setActiveSendChannel(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-700 focus:outline-none shrink-0"
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone">Catatan Telepon</option>
              <option value="SMS">SMS Fallback</option>
            </select>

            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Tulis pesan balasan ke ${activeProspect.name}...`}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
            />

            <button
              type="submit"
              className="p-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg transition-colors shadow-2xs shrink-0"
              title="Kirim Pesan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right: Contact Policy & Profile Snapshot (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-[#DDE3EA] rounded-2xl shadow-2xs p-4 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDE3EA]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                KEPATUHAN KONTAK (PDP)
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>

            {/* Fatigue Rules Check */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-[10.5px] font-bold text-emerald-900">Batas Frekuensi Mingguan</div>
                <div className="text-base font-extrabold text-emerald-700 mt-0.5">1 / 2 Kontak</div>
                <div className="text-[10px] text-emerald-600">Sisa Kuota: 1 pesan diperbolehkan</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10.5px] font-bold text-slate-700">Jam Operasional Kontak</div>
                <div className="text-[11px] font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Di Dalam Jam Kontak (08.30–18.00 WIB)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10.5px] font-bold text-slate-700">Persetujuan Konsumen (Consent)</div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Opt-in WhatsApp aktif via QR Code Mal Ciputra (14 Sep 2026).
                </div>
              </div>
            </div>

            {/* Profile Quick Details */}
            <div className="pt-2 border-t border-[#DDE3EA] space-y-2 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                RINGKASAN PROFIL KONSUMEN
              </span>

              <div className="text-[11px] text-slate-700 space-y-1">
                <div>
                  <span className="text-slate-400">Unit Favorit:</span>{' '}
                  <span className="font-bold">{activeProspect.productInterest}</span>
                </div>
                <div>
                  <span className="text-slate-400">Pengeluaran:</span>{' '}
                  <span className="font-semibold">{activeProspect.monthlyExpenditure || 'Rp4.800.000'}</span>
                </div>
                <div>
                  <span className="text-slate-400">Cabang Penugasan:</span>{' '}
                  <span className="font-semibold">{activeProspect.branch}</span>
                </div>
                <div>
                  <span className="text-slate-400">Sales Advisor:</span>{' '}
                  <span className="font-semibold">{activeProspect.assignedSales}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenCustomerDrawer(activeProspect)}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Buka Profil Lengkap 360</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
