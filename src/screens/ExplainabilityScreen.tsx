import React, { useState } from 'react';
import {
  FileText,
  Sliders,
  Sparkles,
  Info,
  CheckCircle2,
  RefreshCw,
  TrendingDown,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { SHAP_WATERFALL_DATA } from '../data/mockData';
import { ScreenId } from '../types';

interface ExplainabilityScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ExplainabilityScreen: React.FC<ExplainabilityScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  // What-If Simulator state
  const [complaintResolved, setComplaintResolved] = useState(false);
  const [frequencyAdjust, setFrequencyAdjust] = useState(0); // -50% to +50%
  const [personalContactScheduled, setPersonalContactScheduled] = useState(false);

  // Compute dynamic simulated risk score
  const baseRisk = 81;
  const complaintDelta = complaintResolved ? -12 : 0;
  const frequencyDelta = Math.round(frequencyAdjust * -0.2);
  const contactDelta = personalContactScheduled ? -10 : 0;
  const simulatedRisk = Math.max(10, Math.min(99, baseRisk + complaintDelta + frequencyDelta + contactDelta));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
              Explainability &amp; SHAP Feature Attribution
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] font-bold border border-blue-200">
              Model: Retensi v1.3
            </span>
          </div>
          <p className="text-xs text-[#607080]">
            Dekomposisi transparan kontribusi setiap fitur terhadap skor prediksi Machine Learning untuk kepatuhan tata kelola AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToScreen('pelanggan-360')}
            className="px-3.5 py-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>Kembali ke Pelanggan 360</span>
          </button>
        </div>
      </div>

      {/* Target Output Header Banner */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#C73E3A] font-bold text-lg tabular-nums">
            81
          </div>
          <div>
            <div className="text-[11px] text-[#607080]">Target Prediksi Model (Baseline: 0,38)</div>
            <div className="text-base font-bold text-[#17212B]">
              Risiko Churn: Tinggi (0,81) · CUST-JTG-008421
            </div>
            <div className="text-[11px] text-slate-500">Nasabah: R*** S****** · Semarang Timur</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="text-right">
            <div className="text-[10px] text-[#607080]">Metrik Model</div>
            <div className="font-semibold text-[#17212B]">AUROC: 0,86 · Precision: 0,74</div>
          </div>
          <span className="w-px h-8 bg-[#DDE3EA]" />
          <div className="text-right">
            <div className="text-[10px] text-[#607080]">Tingkat Kepercayaan</div>
            <div className="font-bold text-emerald-700">92,4% (Tinggi)</div>
          </div>
        </div>
      </div>

      {/* Main Grid: SHAP Waterfall (7 cols) + What-if Simulator (5 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: SHAP Waterfall Visualization */}
        <div className="xl:col-span-7 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
            <div>
              <h3 className="font-bold text-xs text-[#17212B] uppercase tracking-wider">
                Waterfall Kontribusi Fitur (SHAP Values)
              </h3>
              <p className="text-[11px] text-[#607080]">
                Nilai dasar model adalah 0,38. Faktor positif meningkatkan risiko, faktor negatif menurunkan risiko.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#607080]">Base Value: 0,38</span>
          </div>

          <div className="space-y-3 pt-1">
            {SHAP_WATERFALL_DATA.map((item, idx) => {
              const isIncrease = item.impact === 'increases_risk';
              return (
                <div key={idx} className="p-3 rounded-lg border border-[#DDE3EA] bg-white space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#17212B]">{item.feature}</span>
                    <span
                      className={`font-mono font-bold tabular-nums ${
                        isIncrease ? 'text-[#C73E3A]' : 'text-[#14804A]'
                      }`}
                    >
                      {item.contribution}
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isIncrease ? 'bg-[#C73E3A]' : 'bg-[#14804A]'
                      }`}
                      style={{ width: `${Math.abs(parseFloat(item.contribution)) * 250}%` }}
                    />
                  </div>

                  <div className="text-[10px] text-[#607080] flex justify-between">
                    <span>{item.impact === 'increases_risk' ? 'Menaikkan Probabilitas Churn' : 'Menurunkan Probabilitas Churn'}</span>
                    <span className="font-medium text-slate-500">{isIncrease ? '+Risiko' : '-Risiko'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA] text-xs flex justify-between items-center">
            <span className="font-semibold text-[#17212B]">Hasil Akhir Probabilitas Prediksi:</span>
            <span className="font-mono font-bold text-base text-[#C73E3A] tabular-nums">0,81 (81%)</span>
          </div>
        </div>

        {/* Right: What-If Scenario Simulator & Governance Note */}
        <div className="xl:col-span-5 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#DDE3EA] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#2563EB] font-bold">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>SIMULATOR INTERVENSI &ldquo;WHAT-IF&rdquo;</span>
                </div>
                <h3 className="font-bold text-sm text-[#17212B] mt-0.5">
                  Uji Dampak Tindakan Mitigasi
                </h3>
              </div>
              <button
                onClick={() => {
                  setComplaintResolved(false);
                  setFrequencyAdjust(0);
                  setPersonalContactScheduled(false);
                  onShowToast('Simulator direset ke baseline awal.');
                }}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                title="Reset Skenario"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Simulated Score Comparison */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/50 border border-[#DDE3EA] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#607080]">Skor Prediksi Asli</div>
                <div className="text-xl font-bold text-slate-400 tabular-nums">81</div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-[11px] text-[#2563EB] font-bold">Prediksi Setelah Intervensi</div>
                <div
                  className={`text-2xl font-bold tabular-nums ${
                    simulatedRisk < 60 ? 'text-[#14804A]' : 'text-[#D97706]'
                  }`}
                >
                  {simulatedRisk}
                </div>
              </div>
            </div>

            {/* Interactive What-If Controls */}
            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-lg border border-[#DDE3EA] bg-white cursor-pointer hover:bg-slate-50">
                <span className="font-medium text-[#17212B]">Tuntaskan Tiket Keluhan #TKT-8842</span>
                <input
                  type="checkbox"
                  checked={complaintResolved}
                  onChange={(e) => setComplaintResolved(e.target.checked)}
                  className="rounded text-[#2563EB] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-[#DDE3EA] bg-white cursor-pointer hover:bg-slate-50">
                <span className="font-medium text-[#17212B]">Jadwalkan Konsultasi VIP via WhatsApp</span>
                <input
                  type="checkbox"
                  checked={personalContactScheduled}
                  onChange={(e) => setPersonalContactScheduled(e.target.checked)}
                  className="rounded text-[#2563EB] w-4 h-4 cursor-pointer"
                />
              </label>

              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-white space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-[#17212B]">Simulasi Perubahan Frekuensi Transaksi</span>
                  <span className="font-mono font-bold text-[#2563EB] tabular-nums">
                    {frequencyAdjust > 0 ? `+${frequencyAdjust}%` : `${frequencyAdjust}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={frequencyAdjust}
                  onChange={(e) => setFrequencyAdjust(Number(e.target.value))}
                  className="w-full accent-[#2563EB] cursor-pointer"
                />
              </div>
            </div>

            {/* AI Governance Note */}
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>Catatan Tata Kelola AI:</strong> Nilai SHAP adalah metrik atribusi matematis terhadap model prediktif, bukan jaminan kausalitas mutlak di dunia nyata. Keputusan eksekusi tetap berada di bawah diskresi dan otorisasi tim bisnis.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDE3EA]">
            <button
              onClick={() => onNavigateToScreen('campaign-omnichannel')}
              className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Jadikan Tindakan Nyata di Campaign</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
