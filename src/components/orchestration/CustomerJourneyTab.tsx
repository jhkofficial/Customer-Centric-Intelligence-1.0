import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play,
  RotateCcw,
  MessageSquare,
  Globe,
  Instagram,
  QrCode,
  Phone,
  Building2,
  Layers,
  ShieldCheck,
  UserCheck,
  Award
} from 'lucide-react';
import { BUDI_JOURNEY_NODES } from '../../data/orchestrationData';
import { JourneyTimelineNode } from '../../types/orchestration';

interface CustomerJourneyTabProps {
  onShowToast: (msg: string) => void;
  onNavigateSubmenu: (sub: any) => void;
}

export const CustomerJourneyTab: React.FC<CustomerJourneyTabProps> = ({
  onShowToast,
  onNavigateSubmenu
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(7); // At step 7 (Financing Barrier)
  const [selectedNode, setSelectedNode] = useState<JourneyTimelineNode>(BUDI_JOURNEY_NODES[6]);

  const activeNodes = BUDI_JOURNEY_NODES.slice(0, activeStepIndex + 1);
  const isCompletedDeal = activeStepIndex === BUDI_JOURNEY_NODES.length - 1;

  const handleAdvanceStep = () => {
    if (activeStepIndex < BUDI_JOURNEY_NODES.length - 1) {
      const nextIdx = activeStepIndex + 1;
      setActiveStepIndex(nextIdx);
      setSelectedNode(BUDI_JOURNEY_NODES[nextIdx]);
      onShowToast(`Simulasi Alur: Melangkah ke tahap "${BUDI_JOURNEY_NODES[nextIdx].interaction}"`);
    }
  };

  const handleReset = () => {
    setActiveStepIndex(6); // Step 7 (Financing Barrier)
    setSelectedNode(BUDI_JOURNEY_NODES[6]);
    onShowToast('Simulasi perjalanan Budi Santoso diatur ulang ke tahap Hambatan Finansial.');
  };

  const getNodeColorClass = (state: JourneyTimelineNode['visualState']) => {
    switch (state) {
      case 'blue':
        return 'bg-blue-600 text-white border-blue-400';
      case 'orange':
        return 'bg-amber-600 text-white border-amber-400';
      case 'yellow':
        return 'bg-yellow-500 text-slate-900 border-yellow-300';
      case 'green':
        return 'bg-emerald-600 text-white border-emerald-400';
      case 'red':
        return 'bg-rose-600 text-white border-rose-400';
      case 'purple':
        return 'bg-purple-600 text-white border-purple-300';
      default:
        return 'bg-slate-700 text-white border-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Customer Header Showcase (Section 30) */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DDE3EA]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
              BS
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-slate-900">Budi Santoso</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  Intent: HIGH
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Lead Score: 82/100
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Produk Minat: <strong className="text-slate-900">Honda CB150R Streetfire</strong> · Kota Semarang · Saluran Awal: <strong>Instagram Feed Ad</strong>
              </p>
            </div>
          </div>

          {/* Interactive Simulation Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Alur</span>
            </button>
            <button
              onClick={handleAdvanceStep}
              disabled={isCompletedDeal}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isCompletedDeal ? 'Journey Selesai (Deal Closed)' : 'Simulasikan Langkah Selanjutnya →'}</span>
            </button>
          </div>
        </div>

        {/* Visual State Legend (Section 3) */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#F5F7FA] p-3 rounded-xl border border-[#DDE3EA]">
          <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">Status Visual Tahapan:</span>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <span>Blue = Prospect</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-600" />
              <span>Orange = Needs Attention</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Yellow = Nurture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-purple-600" />
              <span>Purple = AI Recommendation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span>Green = Converted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Celebration Banner if Deal Closed (Section 7) */}
      {isCompletedDeal && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl animate-in zoom-in-95 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-emerald-100">
                Pencapaian Berhasil
              </div>
              <h3 className="text-lg font-black">CONVERSION COMPLETED · DEAL CLOSED</h3>
              <p className="text-xs text-emerald-100 opacity-90 mt-0.5">
                Prospek Budi Santoso resmi menjadi nasabah Honda CB150R Streetfire! Kampanye akuisisi dihentikan otomatis dan Post-Purchase Journey (Delivery &amp; KPB 1) telah dimulai.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateSubmenu('journey-analytics')}
            className="px-4 py-2 bg-white text-emerald-800 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors shrink-0 shadow-sm"
          >
            Lihat Dampak Pendapatan di Analytics →
          </button>
        </div>
      )}

      {/* Main Visual Journey Interactive Track & Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Horizontal / Vertical Flow Timeline Nodes (7 cols) */}
        <div className="xl:col-span-7 bg-white border border-[#DDE3EA] rounded-2xl p-5 space-y-4 shadow-2xs">
          <div className="pb-3 border-b border-[#DDE3EA] flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              Rantai Interaksi Kronologis ({activeNodes.length} dari {BUDI_JOURNEY_NODES.length} Tahap)
            </h3>
            <span className="text-[11px] text-slate-500">Klik node untuk memeriksa inspeksi audit</span>
          </div>

          <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 before:z-0">
            {activeNodes.map((node, idx) => {
              const isSelected = selectedNode.id === node.id;
              const colorClass = getNodeColorClass(node.visualState);

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`relative z-10 flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-400'
                      : 'bg-white border-[#DDE3EA] hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 border-2 shadow-xs ${colorClass}`}
                  >
                    {idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-xs text-slate-900 truncate">{node.interaction}</span>
                      <span className="text-[10px] font-mono text-slate-500">{node.date} · {node.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10.5px]">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {node.channel}
                      </span>
                      <span className="text-slate-600 truncate">{node.status}</span>
                    </div>

                    {node.customerResponse && (
                      <p className="mt-1.5 text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                        “{node.customerResponse}”
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Node Inspector (5 cols) */}
        <div className="xl:col-span-5 bg-white border border-[#DDE3EA] rounded-2xl p-5 space-y-4 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#DDE3EA] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  INSPEKSI TAHAPAN PERJALANAN
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedNode.interaction}
                </h4>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getNodeColorClass(selectedNode.visualState)}`}>
                {selectedNode.visualState.toUpperCase()}
              </span>
            </div>

            {/* Audit Details */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Waktu &amp; Tanggal:</span>
                  <strong className="text-slate-900 font-mono">{selectedNode.date}, {selectedNode.time}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kanal Komunikasi:</span>
                  <strong className="text-blue-700">{selectedNode.channel}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Tahapan:</span>
                  <span className="font-bold text-slate-900">{selectedNode.status}</span>
                </div>
              </div>

              {selectedNode.customerResponse && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                  <div className="font-bold text-amber-900 text-[11px] uppercase tracking-wide">
                    Respons / Keberatan Konsumen
                  </div>
                  <p className="text-slate-800 leading-relaxed text-xs italic">
                    {selectedNode.customerResponse}
                  </p>
                </div>
              )}

              {selectedNode.salesAction && (
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs space-y-1">
                  <div className="font-bold text-blue-900 text-[11px] uppercase tracking-wide">
                    Tindakan Tim Sales
                  </div>
                  <p className="text-slate-800 leading-relaxed text-xs">
                    {selectedNode.salesAction}
                  </p>
                </div>
              )}

              {selectedNode.systemAction && (
                <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-1">
                  <div className="font-bold text-purple-900 text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Tindakan Otomatis Sistem (SERVEON AI)</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed text-xs">
                    {selectedNode.systemAction}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDE3EA]">
            <button
              onClick={() => onNavigateSubmenu('next-best-action')}
              className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Buka Next Best Action untuk Prospek Ini →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
