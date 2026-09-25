import React, { useState } from 'react';
import { X, ArrowLeftRight, CheckCircle2, AlertTriangle, ShieldAlert, Shield, Target, ExternalLink } from 'lucide-react';
import { ScreenId, StrategyType } from '../../types';

interface CrossStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultArea?: string;
  onNavigateToScreen: (screen: ScreenId) => void;
}

interface AreaStrategyProfile {
  name: string;
  kabupaten: string;
  retentionRisk: number; // 0-100
  customerValue: number; // 0-100
  competitionPressure: number; // 0-100
  marketPotential: number; // 0-100
  accessibility: number; // 0-100
  serviceCoverage: number; // 0-100
  retainScore: number;
  defendScore: number;
  acquireScore: number;
  primaryStrategy: StrategyType;
  secondaryStrategy: StrategyType;
  explanation: string;
}

const COMPARISON_DATA: Record<string, AreaStrategyProfile> = {
  'Semarang Timur': {
    name: 'Semarang Timur',
    kabupaten: 'Kota Semarang',
    retentionRisk: 78,
    customerValue: 89,
    competitionPressure: 86,
    marketPotential: 62,
    accessibility: 58,
    serviceCoverage: 81,
    retainScore: 78,
    defendScore: 91,
    acquireScore: 54,
    primaryStrategy: 'DEFEND',
    secondaryStrategy: 'RETAIN',
    explanation: 'DEFEND menjadi strategi utama karena nilai basis pelanggan dan tekanan kompetitor lebih dominan daripada potensi akuisisi baru.'
  },
  'Surakarta Utara': {
    name: 'Surakarta Utara',
    kabupaten: 'Kota Surakarta',
    retentionRisk: 87,
    customerValue: 84,
    competitionPressure: 64,
    marketPotential: 58,
    accessibility: 79,
    serviceCoverage: 87,
    retainScore: 87,
    defendScore: 68,
    acquireScore: 49,
    primaryStrategy: 'RETAIN',
    secondaryStrategy: 'DEFEND',
    explanation: 'RETAIN menjadi strategi prioritas mutlak karena penurunan frekuensi transaksi (-18%) pada basis pelanggan tier Gold/Platinum memerlukan intervensi cepat sebelum churn.'
  },
  'Purwokerto Utara': {
    name: 'Purwokerto Utara',
    kabupaten: 'Banyumas',
    retentionRisk: 34,
    customerValue: 66,
    competitionPressure: 45,
    marketPotential: 88,
    accessibility: 81,
    serviceCoverage: 78,
    retainScore: 42,
    defendScore: 48,
    acquireScore: 83,
    primaryStrategy: 'ACQUIRE',
    secondaryStrategy: 'DEFEND',
    explanation: 'ACQUIRE adalah strategi utama didukung oleh demografi usia produktif tinggi (68,4%) dan penetrasi eksisting yang masih rendah (18,4%), memberikan ruang pertumbuhan pelanggan baru terbesar.'
  },
  'Kudus Selatan': {
    name: 'Kudus Selatan',
    kabupaten: 'Kudus',
    retentionRisk: 68,
    customerValue: 82,
    competitionPressure: 81,
    marketPotential: 55,
    accessibility: 74,
    serviceCoverage: 84,
    retainScore: 71,
    defendScore: 79,
    acquireScore: 51,
    primaryStrategy: 'DEFEND',
    secondaryStrategy: 'RETAIN',
    explanation: 'DEFEND mendesak akibat ekspansi 2 kompetitor baru pada segmen UMKM/B2B dalam 90 hari terakhir yang berisiko mengikis pangsa pasar stabil.'
  },
  'Magelang Tengah': {
    name: 'Magelang Tengah',
    kabupaten: 'Magelang',
    retentionRisk: 81,
    customerValue: 72,
    competitionPressure: 38,
    marketPotential: 48,
    accessibility: 83,
    serviceCoverage: 89,
    retainScore: 76,
    defendScore: 52,
    acquireScore: 46,
    primaryStrategy: 'RETAIN',
    secondaryStrategy: 'ACQUIRE',
    explanation: 'RETAIN diutamakan karena penurunan kepuasan pasca migrasi digital; 3.400 pelanggan belum bertransaksi selama 45 hari.'
  },
  'Tegal Selatan': {
    name: 'Tegal Selatan',
    kabupaten: 'Kota Tegal',
    retentionRisk: 42,
    customerValue: 68,
    competitionPressure: 56,
    marketPotential: 82,
    accessibility: 76,
    serviceCoverage: 77,
    retainScore: 49,
    defendScore: 59,
    acquireScore: 74,
    primaryStrategy: 'ACQUIRE',
    secondaryStrategy: 'DEFEND',
    explanation: 'ACQUIRE menjadi strategi primer untuk mengkapitalisasi koridor niaga Pantura Barat yang sedang tumbuh pesat.'
  }
};

export const CrossStrategyModal: React.FC<CrossStrategyModalProps> = ({
  isOpen,
  onClose,
  defaultArea = 'Semarang Timur',
  onNavigateToScreen
}) => {
  const [selectedAreaName, setSelectedAreaName] = useState(
    COMPARISON_DATA[defaultArea] ? defaultArea : 'Semarang Timur'
  );

  if (!isOpen) return null;

  const currentProfile = COMPARISON_DATA[selectedAreaName] || COMPARISON_DATA['Semarang Timur'];

  const getStrategyColor = (strat: StrategyType) => {
    if (strat === 'RETAIN') return 'text-[#D97706] bg-amber-50 border-amber-200';
    if (strat === 'DEFEND') return 'text-[#C73E3A] bg-red-50 border-red-200';
    return 'text-[#0F7C7B] bg-teal-50 border-teal-200';
  };

  const getScreenForStrategy = (strat: StrategyType): ScreenId => {
    if (strat === 'RETAIN') return 'retensi';
    if (strat === 'DEFEND') return 'pertahanan-pasar';
    return 'akuisisi';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#DDE3EA] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#DDE3EA] flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#15324B] text-white flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#17212B]">
                Komparasi Lintas Strategi (Cross-Strategy Assessment)
              </h2>
              <p className="text-xs text-[#607080]">
                Evaluasi multi-kriteria untuk menentukan strategi primer dan sekunder berdasarkan parameter objektif.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-[#17212B]">
          {/* Area Selector Pills */}
          <div>
            <div className="text-[11px] font-semibold text-[#607080] mb-2 uppercase tracking-wider">
              Pilih Wilayah Evaluasi:
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(COMPARISON_DATA).map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedAreaName(area)}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs border transition-all ${
                    selectedAreaName === area
                      ? 'bg-[#15324B] text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-[#DDE3EA] hover:bg-slate-50'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Strategic Score Trio Cards */}
          <div className="grid grid-cols-3 gap-3">
            {/* RETAIN */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                currentProfile.primaryStrategy === 'RETAIN'
                  ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/40'
                  : 'bg-white border-[#DDE3EA]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-700">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>RETAIN</span>
                </div>
                {currentProfile.primaryStrategy === 'RETAIN' && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                    PRIMER
                  </span>
                )}
                {currentProfile.secondaryStrategy === 'RETAIN' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    SEKUNDER
                  </span>
                )}
              </div>
              <div className="text-2xl font-black text-[#17212B] tabular-nums">
                {currentProfile.retainScore}
              </div>
              <div className="text-[11px] text-[#607080] mt-1">
                Risiko Retensi &amp; Churn Churn
              </div>
            </div>

            {/* DEFEND */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                currentProfile.primaryStrategy === 'DEFEND'
                  ? 'bg-red-50/70 border-red-300 ring-2 ring-red-400/40'
                  : 'bg-white border-[#DDE3EA]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-bold text-red-700">
                  <Shield className="w-3.5 h-3.5" />
                  <span>DEFEND</span>
                </div>
                {currentProfile.primaryStrategy === 'DEFEND' && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-200 text-red-900">
                    PRIMER
                  </span>
                )}
                {currentProfile.secondaryStrategy === 'DEFEND' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    SEKUNDER
                  </span>
                )}
              </div>
              <div className="text-2xl font-black text-[#17212B] tabular-nums">
                {currentProfile.defendScore}
              </div>
              <div className="text-[11px] text-[#607080] mt-1">
                Tekanan Kompetitor &amp; Celah
              </div>
            </div>

            {/* ACQUIRE */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                currentProfile.primaryStrategy === 'ACQUIRE'
                  ? 'bg-teal-50/70 border-teal-300 ring-2 ring-teal-400/40'
                  : 'bg-white border-[#DDE3EA]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-bold text-teal-700">
                  <Target className="w-3.5 h-3.5" />
                  <span>ACQUIRE</span>
                </div>
                {currentProfile.primaryStrategy === 'ACQUIRE' && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-200 text-teal-900">
                    PRIMER
                  </span>
                )}
                {currentProfile.secondaryStrategy === 'ACQUIRE' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    SEKUNDER
                  </span>
                )}
              </div>
              <div className="text-2xl font-black text-[#17212B] tabular-nums">
                {currentProfile.acquireScore}
              </div>
              <div className="text-[11px] text-[#607080] mt-1">
                White Space &amp; Potensi Baru
              </div>
            </div>
          </div>

          {/* Criteria Breakdown Comparison Table */}
          <div className="border border-[#DDE3EA] rounded-xl overflow-hidden">
            <div className="bg-[#F5F7FA] px-4 py-2.5 border-b border-[#DDE3EA] font-semibold text-[11px] text-[#607080] uppercase tracking-wider flex justify-between">
              <span>Dimensi Indikator Lintas Strategi</span>
              <span>Skor Relatif (0–100)</span>
            </div>
            <div className="divide-y divide-slate-100 bg-white p-3 space-y-2.5">
              {[
                { label: 'Risiko Retensi (Retention Risk)', val: currentProfile.retentionRisk, color: 'bg-amber-500' },
                { label: 'Nilai Basis Pelanggan (Customer Value)', val: currentProfile.customerValue, color: 'bg-blue-600' },
                { label: 'Tekanan Kompetitor (Competition Pressure)', val: currentProfile.competitionPressure, color: 'bg-red-500' },
                { label: 'Potensi Pasar Baru (Market Potential)', val: currentProfile.marketPotential, color: 'bg-teal-500' },
                { label: 'Aksesibilitas Wilayah (Accessibility)', val: currentProfile.accessibility, color: 'bg-indigo-500' },
                { label: 'Cakupan Layanan Eksisting (Service Coverage)', val: currentProfile.serviceCoverage, color: 'bg-emerald-500' }
              ].map((dim, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 text-xs pt-1">
                  <span className="font-medium text-[#17212B] w-64 truncate">{dim.label}</span>
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${dim.color}`}
                      style={{ width: `${dim.val}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-slate-700 w-10 text-right tabular-nums">
                    {dim.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Rationale Callout */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="flex items-center gap-2 font-bold text-xs text-[#2563EB] mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Rasional Penentuan Strategi: {currentProfile.name}</span>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              “{currentProfile.explanation}”
            </p>
            <div className="mt-2.5 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] text-[#607080]">
              <span>Rekomendasi Utama: <strong className="text-[#17212B]">{currentProfile.primaryStrategy} ({currentProfile.primaryStrategy === 'DEFEND' ? currentProfile.defendScore : currentProfile.primaryStrategy === 'RETAIN' ? currentProfile.retainScore : currentProfile.acquireScore})</strong></span>
              <span>Rekomendasi Sekunder: <strong className="text-[#17212B]">{currentProfile.secondaryStrategy} ({currentProfile.secondaryStrategy === 'DEFEND' ? currentProfile.defendScore : currentProfile.secondaryStrategy === 'RETAIN' ? currentProfile.retainScore : currentProfile.acquireScore})</strong></span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#DDE3EA] bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-[#607080] flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Analisis mendukung keputusan dan tidak menggantikan pertimbangan bisnis.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 border border-[#DDE3EA] bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigateToScreen(getScreenForStrategy(currentProfile.primaryStrategy));
              }}
              className="px-4 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Buka Layar {currentProfile.primaryStrategy}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
