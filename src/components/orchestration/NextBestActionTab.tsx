import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  Phone,
  Building2,
  Layers,
  ShieldCheck,
  Zap,
  TrendingUp,
  Percent,
  Check,
  ChevronRight,
  Filter,
  UserCheck
} from 'lucide-react';
import { NextBestActionItem, ProspectProfile } from '../../types/orchestration';
import { INITIAL_NEXT_BEST_ACTIONS, INITIAL_PROSPECTS } from '../../data/orchestrationData';

interface NextBestActionTabProps {
  onShowToast: (msg: string) => void;
  onOpenAiExplanation: (prospect: ProspectProfile) => void;
  onOpenCustomerDrawer: (prospect: ProspectProfile) => void;
}

export const NextBestActionTab: React.FC<NextBestActionTabProps> = ({
  onShowToast,
  onOpenAiExplanation,
  onOpenCustomerDrawer
}) => {
  const [actions, setActions] = useState<NextBestActionItem[]>(INITIAL_NEXT_BEST_ACTIONS);
  const [executedIds, setExecutedIds] = useState<string[]>([]);
  const [selectedChannelFilter, setSelectedChannelFilter] = useState<string>('all');

  const lifecycleStages = [
    { key: 'identify', label: 'IDENTIFY', count: '12.480', desc: 'Identifikasi Lead & Niat Beli' },
    { key: 'engage', label: 'ENGAGE', count: '8.920', desc: 'Kontak Awal Multi-Kanal' },
    { key: 'listen', label: 'LISTEN', count: '5.140', desc: 'Deteksi Alasan & Hambatan' },
    { key: 'decide', label: 'DECIDE', count: '4.820', desc: 'Kalkulasi Next Best Action' },
    { key: 'followup', label: 'FOLLOW-UP', count: '2.840', desc: 'Eksekusi Solusi Terarah' },
    { key: 'nurture', label: 'NURTURE', count: '3.420', desc: 'Edukasi Prospek Tertunda' },
    { key: 'reengage', label: 'RE-ENGAGE', count: '312', desc: 'Aktivasi Ulang Sinyal Baru' },
    { key: 'convert', label: 'CONVERT', count: '824', desc: 'Deal Closed & SPK Resmi' }
  ];

  const handleExecute = (actionItem: NextBestActionItem) => {
    if (executedIds.includes(actionItem.id)) return;

    setExecutedIds((prev) => [...prev, actionItem.id]);
    onShowToast(`Rekomendasi untuk ${actionItem.customerName} telah dieksekusi via ${actionItem.recommendedChannel}.`);
  };

  const filteredActions = actions.filter((act) => {
    if (selectedChannelFilter === 'all') return true;
    return act.recommendedChannel.toLowerCase().includes(selectedChannelFilter.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header & Concept Banner */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DDE3EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                <span>AI DECISION ENGINE</span>
              </span>
              <span className="text-xs text-slate-500">Model Pembelajaran Mesin Astra Motor v3.2</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Next Best Action (NBA) — Mesin Rekomendasi Preskriptif
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Setiap interaksi prospek menghasilkan tindakan terbaik berikutnya (Next Best Action) yang jelas, dapat dilacak, dan berbasis data kebutuhan spesifik konsumen.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-xl bg-purple-50 border border-purple-200 text-center">
              <div className="text-[10px] text-purple-700 font-bold uppercase">Tingkat Adopsi NBA</div>
              <div className="text-base font-extrabold text-purple-900 tabular-nums">84,2%</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-[10px] text-emerald-700 font-bold uppercase">Akurasi Konversi</div>
              <div className="text-base font-extrabold text-emerald-800 tabular-nums">+31,5%</div>
            </div>
          </div>
        </div>

        {/* 8-Stage Closed Loop Lifecycle Concept Bar */}
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Siklus Eksekusi Orkestrasi:</span>
            <span className="text-slate-400 font-normal">IDENTIFY → ENGAGE → LISTEN → DECIDE → FOLLOW-UP → NURTURE → RE-ENGAGE → CONVERT</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
            {lifecycleStages.map((st, idx) => (
              <div
                key={st.key}
                className="p-2.5 rounded-xl border border-[#DDE3EA] bg-slate-50/60 hover:bg-blue-50/40 transition-colors"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                  <span>{st.label}</span>
                  <span className="text-[#2563EB]">{st.count}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-1 leading-tight">
                  {st.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Queue Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Daftar Tindakan Terjadwal Hari Ini ({filteredActions.length} Tindakan)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Filter Kanal:</span>
          <select
            value={selectedChannelFilter}
            onChange={(e) => setSelectedChannelFilter(e.target.value)}
            className="bg-white border border-[#DDE3EA] rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none"
          >
            <option value="all">Semua Kanal</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Phone">Telepon</option>
            <option value="Dealer">Dealer / Showroom</option>
          </select>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActions.map((item) => {
          const isDone = executedIds.includes(item.id);
          const prospect = INITIAL_PROSPECTS.find((p) => p.id === item.prospectId) || INITIAL_PROSPECTS[0];

          return (
            <div
              key={item.id}
              className={`bg-white border rounded-2xl p-5 transition-all shadow-2xs flex flex-col justify-between ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-[#DDE3EA] hover:border-purple-300 hover:shadow-xs'
              }`}
            >
              <div>
                {/* Top Badge Strip */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#DDE3EA]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.customerName}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        Skor: {item.leadScore}
                      </span>
                      <span
                        className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                          item.priority === 'CRITICAL'
                            ? 'bg-rose-100 text-rose-800'
                            : item.priority === 'HIGH'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                      <span>Status: {item.currentState}</span>
                      <span>•</span>
                      <span>PIC: {item.assignedSales}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{item.confidenceScore}% Akurasi</span>
                    </span>
                  </div>
                </div>

                {/* Customer Barrier */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-700 block text-[10.5px]">
                    Hambatan Terdeteksi:
                  </span>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    {item.customerBarrier}
                  </p>
                </div>

                {/* Next Best Action Prescription */}
                <div className="mt-3 space-y-1.5">
                  <div className="text-[10px] font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>Tindakan Terbaik yang Direkomendasikan:</span>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-200 text-slate-900 font-bold text-xs leading-relaxed">
                    {item.recommendedAction}
                  </div>
                </div>

                {/* Execution Details & Timing */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-[#DDE3EA]">
                    <span className="text-[10px] text-slate-400 block">Kanal Rekomendasi</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      {item.recommendedChannel}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-[#DDE3EA]">
                    <span className="text-[10px] text-slate-400 block">Jendela Waktu Efektif</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {item.recommendedTime}
                    </span>
                  </div>
                </div>

                {/* AI Rationale Bullets */}
                <div className="mt-3 pt-3 border-t border-[#DDE3EA] space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Alasan Logika AI:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {item.aiRationale.slice(0, 2).map((rat, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-1.5">
                        <span className="text-purple-600 font-bold shrink-0">•</span>
                        <span>{rat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-[#DDE3EA] flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenAiExplanation(prospect)}
                  className="text-xs font-semibold text-purple-700 hover:text-purple-800 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Jelaskan Logika AI</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCustomerDrawer(prospect)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Profil 360
                  </button>

                  <button
                    onClick={() => handleExecute(item)}
                    disabled={isDone}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
                      isDone
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-[#2563EB] hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Telah Dieksekusi</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{item.ctaLabel}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
