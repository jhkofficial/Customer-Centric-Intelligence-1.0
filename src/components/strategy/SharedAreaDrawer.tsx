import React from 'react';
import {
  X,
  ExternalLink,
  ShieldAlert,
  Shield,
  Target,
  Sparkles,
  CheckCircle2,
  Clock,
  UserCheck,
  Building2,
  ArrowRight,
  Database,
  BarChart2,
  AlertTriangle
} from 'lucide-react';
import { ScreenId, StrategyType } from '../../types';

export interface AreaDetailData {
  name: string;
  kabupaten: string;
  strategy: StrategyType;
  strategicScore: number;
  priorityLevel: 'Kritis' | 'Tinggi' | 'Sedang';
  totalCustomers: number;
  activeRate: number;
  outlets: number;
  opportunityValue: string;
  confidence: number;
  dataFreshness: string;
  dataQualityScore: string;
  topDrivers: Array<{ factor: string; contribution: string; impact: 'positive' | 'negative' }>;
  recommendedAction: {
    title: string;
    description: string;
    targetAudience: string;
    preferredChannels: string;
    timing: string;
    owner: string;
    approver: string;
    approvalStatus: 'Draft' | 'Menunggu Review' | 'Menunggu Persetujuan' | 'Disetujui' | 'Dalam Pelaksanaan';
  };
}

interface SharedAreaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: AreaDetailData | null;
  onNavigateToScreen: (screen: ScreenId) => void;
  onOpenAgentModal: (prompt?: string) => void;
  onOpenApprovalModal?: (data: AreaDetailData) => void;
  onOpenExplainability?: () => void;
}

export const SharedAreaDrawer: React.FC<SharedAreaDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onNavigateToScreen,
  onOpenAgentModal,
  onOpenApprovalModal,
  onOpenExplainability
}) => {
  if (!isOpen || !data) return null;

  const getStrategyStyle = (strategy: StrategyType) => {
    switch (strategy) {
      case 'RETAIN':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-800',
          border: 'border-amber-200',
          badge: 'bg-[#D97706] text-white',
          icon: ShieldAlert
        };
      case 'DEFEND':
        return {
          bg: 'bg-red-50',
          text: 'text-red-800',
          border: 'border-red-200',
          badge: 'bg-[#C73E3A] text-white',
          icon: Shield
        };
      case 'ACQUIRE':
        return {
          bg: 'bg-teal-50',
          text: 'text-teal-800',
          border: 'border-teal-200',
          badge: 'bg-[#0F7C7B] text-white',
          icon: Target
        };
    }
  };

  const style = getStrategyStyle(data.strategy);
  const StratIcon = style.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-[#DDE3EA] animate-in slide-in-from-right duration-250">
        {/* Section 1: Area & Strategy Header */}
        <div className="p-5 border-b border-[#DDE3EA] flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style.badge}`}>
              <StratIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${style.badge}`}>
                  {data.strategy}
                </span>
                <span className="text-xs text-[#607080] font-medium">
                  {data.kabupaten} · Jawa Tengah
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#17212B]">{data.name}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-[#17212B]">
          {/* Section 2: Strategic Score & Priority */}
          <div className="p-4 rounded-xl border border-[#DDE3EA] bg-white flex items-center justify-between shadow-2xs">
            <div>
              <div className="text-[11px] font-semibold text-[#607080] uppercase tracking-wider">
                Skor Strategis (MCDM)
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-[#17212B] tabular-nums">
                  {data.strategicScore}
                </span>
                <span className="text-xs text-[#607080]">/ 100</span>
                <span
                  className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded ${
                    data.priorityLevel === 'Kritis'
                      ? 'bg-red-100 text-red-800'
                      : data.priorityLevel === 'Tinggi'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  Prioritas {data.priorityLevel}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-[#607080]">Tingkat Keyakinan</div>
              <div className="text-sm font-bold text-emerald-700 mt-0.5">
                {data.confidence}% (Tinggi)
              </div>
            </div>
          </div>

          {/* Section 3: KPI Summary */}
          <div>
            <div className="text-[11px] font-semibold text-[#607080] mb-2 uppercase tracking-wider">
              Ringkasan Metrik Kunci
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
                <div className="text-[11px] text-[#607080]">Total Pelanggan Terdaftar</div>
                <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                  {data.totalCustomers.toLocaleString('id-ID')}
                </div>
              </div>
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
                <div className="text-[11px] text-[#607080]">Rasio Pelanggan Aktif</div>
                <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                  {data.activeRate}%
                </div>
              </div>
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
                <div className="text-[11px] text-[#607080]">Titik Layanan (Outlet)</div>
                <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                  {data.outlets} Outlet Aktif
                </div>
              </div>
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
                <div className="text-[11px] text-[#607080]">Estimasi Nilai Peluang</div>
                <div className="text-base font-bold text-emerald-700 mt-0.5 tabular-nums">
                  {data.opportunityValue}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Top Drivers / Faktor Pendorong */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#607080] uppercase tracking-wider">
                Faktor Pendorong Utama (Top Drivers)
              </span>
              <button
                onClick={onOpenExplainability}
                className="text-[11px] text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Lihat SHAP Waterfall</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {data.topDrivers.map((driver, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-[#DDE3EA] bg-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-medium text-[#17212B]">{driver.factor}</span>
                  </div>
                  <span
                    className={`font-mono font-bold text-xs ${
                      driver.impact === 'negative' ? 'text-red-600' : 'text-emerald-700'
                    }`}
                  >
                    {driver.contribution}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Data Freshness & Quality */}
          <div className="p-3 rounded-xl border border-[#DDE3EA] bg-slate-50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#0F7C7B]" />
              <div>
                <div className="text-[11px] text-[#607080]">Kesegaran &amp; Integritas Data</div>
                <div className="font-semibold text-[#17212B]">{data.dataFreshness}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-[#607080]">Kualitas Data</div>
              <div className="font-bold text-emerald-700">{data.dataQualityScore} — Teruji</div>
            </div>
          </div>

          {/* Section 6 & 7: Recommended Action, Owner & Approval Status */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                Tindakan Strategis yang Disarankan
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  data.recommendedAction.approvalStatus === 'Disetujui'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : data.recommendedAction.approvalStatus === 'Menunggu Review'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-blue-100 text-blue-800 border-blue-300'
                }`}
              >
                {data.recommendedAction.approvalStatus}
              </span>
            </div>

            <h4 className="font-bold text-sm text-[#17212B]">
              {data.recommendedAction.title}
            </h4>

            <p className="text-xs text-slate-700 leading-relaxed">
              {data.recommendedAction.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-blue-100">
              <div>
                <span className="text-[#607080]">Sasaran:</span>{' '}
                <strong className="text-[#17212B]">{data.recommendedAction.targetAudience}</strong>
              </div>
              <div>
                <span className="text-[#607080]">Kanal Otorisasi:</span>{' '}
                <strong className="text-[#17212B]">{data.recommendedAction.preferredChannels}</strong>
              </div>
              <div>
                <span className="text-[#607080]">PIC Pemilik:</span>{' '}
                <strong className="text-[#17212B]">{data.recommendedAction.owner}</strong>
              </div>
              <div>
                <span className="text-[#607080]">Penyetujui Wajib:</span>{' '}
                <strong className="text-[#17212B]">{data.recommendedAction.approver}</strong>
              </div>
            </div>

            {onOpenApprovalModal && (
              <button
                onClick={() => onOpenApprovalModal(data)}
                className="w-full mt-2 py-1.5 px-3 rounded-lg border border-blue-300 bg-white hover:bg-blue-50 text-[#2563EB] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Buka Detail Tata Kelola &amp; Persetujuan</span>
              </button>
            )}
          </div>

          {/* Section 8: Quick Action Links */}
          <div className="space-y-2 pt-2 border-t border-[#DDE3EA]">
            <button
              onClick={() => {
                onClose();
                onNavigateToScreen(
                  data.strategy === 'RETAIN'
                    ? 'retensi'
                    : data.strategy === 'DEFEND'
                    ? 'pertahanan-pasar'
                    : 'akuisisi'
                );
              }}
              className="w-full py-2 px-3 rounded-lg border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] text-xs font-semibold flex items-center justify-between transition-colors"
            >
              <span>Buka Ruang Strategi Lengkap ({data.strategy})</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateToScreen('explainability');
              }}
              className="w-full py-2 px-3 rounded-lg border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] text-xs font-semibold flex items-center justify-between transition-colors"
            >
              <span>Lihat Explainability &amp; SHAP Decomposition</span>
              <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenAgentModal(
                  `Berikan telaah komprehensif untuk wilayah ${data.name} (${data.strategy}, Skor ${data.strategicScore}) termasuk proyeksi dampak dan mitigasi risiko.`
                );
              }}
              className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#15324B] to-[#1E4464] hover:from-[#1E4464] hover:to-[#2563EB] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Tanya SERVEON Agent tentang Wilayah Ini</span>
            </button>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="p-3 border-t border-[#DDE3EA] bg-slate-50 text-[10px] text-[#607080] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Data demonstrasi — bukan data operasional resmi.</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 border border-[#DDE3EA] bg-white rounded font-medium text-slate-700 hover:bg-slate-50"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
