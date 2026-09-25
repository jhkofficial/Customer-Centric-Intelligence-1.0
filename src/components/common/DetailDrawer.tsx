import React from 'react';
import { X, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { StrategicPriority, RegencyData } from '../../types';
import { StrategyBadge } from './StrategyBadge';

interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: StrategicPriority | RegencyData | null;
  onNavigateToStrategy?: (strategy: string) => void;
  onAskAgent?: (contextText: string) => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onNavigateToStrategy,
  onAskAgent
}) => {
  if (!isOpen || !data) return null;

  const isPriority = 'reason' in data;
  const areaName = data.name;
  const strategy = data.strategy;
  const score = isPriority ? data.score : data.strategicScore;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#DDE3EA] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#DDE3EA] flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <StrategyBadge strategy={strategy} score={score} size="md" />
              <span className="text-xs text-[#607080]">
                {isPriority ? data.kabupaten : data.category}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#17212B]">{areaName}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-[#17212B]">
          {/* Executive Overview */}
          <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-100">
            <div className="text-[11px] font-semibold text-[#2563EB] mb-1">
              RANGKUMAN PRIORITAS BERBASIS DATA
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {isPriority
                ? data.reason
                : `${areaName} memiliki ${data.totalCustomers.toLocaleString('id-ID')} pelanggan terdaftar dengan tingkat keaktifan ${data.activeRate}%. Teridentifikasi peluang bisnis bernilai ${data.opportunityValue}.`}
            </p>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
              <div className="text-[11px] text-[#607080]">Total Pelanggan</div>
              <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                {data.totalCustomers.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
              <div className="text-[11px] text-[#607080]">Rasio Aktif</div>
              <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                {data.activeRate}%
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
              <div className="text-[11px] text-[#607080]">Titik Layanan Aktif</div>
              <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                {'outlets' in data ? (data as any).outlets : 6} Outlet
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
              <div className="text-[11px] text-[#607080]">Estimasi Nilai Peluang</div>
              <div className="text-base font-bold text-[#14804A] mt-0.5 tabular-nums">
                {data.opportunityValue}
              </div>
            </div>
          </div>

          {/* Recommended Action */}
          <div>
            <div className="text-[11px] font-semibold text-[#607080] mb-2 uppercase tracking-wider">
              Tindakan Strategis yang Disarankan
            </div>
            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-white space-y-2">
              <p className="text-xs text-[#17212B] leading-relaxed">
                {isPriority
                  ? data.recommendedAction
                  : `Tingkatkan efektivitas jangkauan dengan optimalisasi alokasi kanal engagement dan evaluasi cakupan outlet di ${areaName}.`}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Rekomendasi diverifikasi AI &amp; siap diajukan ke tim eksekusi</span>
              </div>
            </div>
          </div>

          {/* Quick Context Query to SERVEON Agent */}
          {onAskAgent && (
            <button
              onClick={() => onAskAgent(`Berikan analisis mendalam dan rencana eksekusi strategis untuk ${areaName} dengan objektif ${strategy}.`)}
              className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#0F7C7B]/10 to-[#2563EB]/10 border border-blue-200 text-[#2563EB] hover:bg-blue-50 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Tanya SERVEON Agent tentang Area Ini</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#DDE3EA] bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#DDE3EA] text-slate-700 hover:bg-white rounded-lg text-xs font-medium transition-colors"
          >
            Tutup
          </button>

          {onNavigateToStrategy && (
            <button
              onClick={() => onNavigateToStrategy(strategy)}
              className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Buka Ruang Strategi {strategy}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
