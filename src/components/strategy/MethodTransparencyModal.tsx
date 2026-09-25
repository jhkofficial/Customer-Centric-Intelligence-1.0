import React from 'react';
import { X, BookOpen, CheckCircle2, AlertTriangle, Cpu, Scale } from 'lucide-react';

interface MethodTransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategyName: string;
}

export const MethodTransparencyModal: React.FC<MethodTransparencyModalProps> = ({
  isOpen,
  onClose,
  strategyName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#DDE3EA] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#DDE3EA] flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#17212B]">
                Transparansi Metodologi &amp; Dasar Analisis ({strategyName})
              </h3>
              <p className="text-[11px] text-[#607080]">
                Spesifikasi algoritma prediktif, pembobotan multi-kriteria (MCDM), dan batas sensitivitas.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs text-[#17212B]">
          {/* Predictive Model Details */}
          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs text-[#2563EB]">
              <Cpu className="w-3.5 h-3.5" />
              <span>Model Prediksi Probabilitas Churn &amp; Pertumbuhan</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
              <div>Versi Model: <strong>SERVEON LightGBM Ensemble v1.3</strong></div>
              <div>Tanggal Kalibrasi: <strong>22 September 2026, 23.45 WIB</strong></div>
              <div>Metrik Validasi: <strong>AUROC 0,86 · Recall 0,81 · Brier Score 0,084</strong></div>
              <div>Populasi Pelatihan: <strong>1.248.560 rekam jejak wilayah Jawa Tengah</strong></div>
            </div>
          </div>

          {/* Strategic Score Criteria & Weights */}
          <div>
            <div className="flex items-center gap-1.5 font-bold text-xs text-[#17212B] mb-2">
              <Scale className="w-3.5 h-3.5 text-[#0F7C7B]" />
              <span>Formula Multi-Criteria Decision Making (MCDM)</span>
            </div>
            <p className="text-[11px] text-[#607080] mb-2 leading-relaxed">
              Skor Strategis (0–100) menggabungkan output probabilitas Machine Learning dengan indikator spasial geografis dan kriteria bisnis:
            </p>

            <div className="border border-[#DDE3EA] rounded-lg overflow-hidden divide-y divide-slate-100 text-[11px]">
              <div className="bg-slate-50 px-3 py-1.5 font-semibold text-[#607080] flex justify-between">
                <span>Dimensi Penilaian</span>
                <span>Bobot &amp; Normalisasi</span>
              </div>
              <div className="px-3 py-2 flex justify-between bg-white">
                <span>1. Customer Density &amp; Portfolio Value</span>
                <span className="font-mono font-bold text-slate-800">25% (Min-Max Scaled)</span>
              </div>
              <div className="px-3 py-2 flex justify-between bg-white">
                <span>2. Market Potential &amp; Demographics</span>
                <span className="font-mono font-bold text-slate-800">20% (Z-Score)</span>
              </div>
              <div className="px-3 py-2 flex justify-between bg-white">
                <span>3. Road Accessibility &amp; Travel Time Isochrone</span>
                <span className="font-mono font-bold text-slate-800">15% (15-min Catchment)</span>
              </div>
              <div className="px-3 py-2 flex justify-between bg-white">
                <span>4. Competition Pressure (Distance &amp; Density)</span>
                <span className="font-mono font-bold text-slate-800">15% (Spatial Kernel)</span>
              </div>
              <div className="px-3 py-2 flex justify-between bg-white">
                <span>5. Service Coverage Gap (Underserved Pockets)</span>
                <span className="font-mono font-bold text-slate-800">15% (Voronoi Buffer)</span>
              </div>
              <div className="px-3 py-2 flex justify-between bg-white">
                <span>6. Investment Feasibility &amp; Operational Return</span>
                <span className="font-mono font-bold text-slate-800">10% (Capex/Opex Ratio)</span>
              </div>
            </div>
          </div>

          {/* Governance & Limitation Disclaimer */}
          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Batasan &amp; Prinsip Tata Kelola</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Skor prediktif ini bukan kebenaran mutlak dan dipengaruhi oleh ketersediaan data eksternal (misal: data pemetaan kompetitor diperbarui berkala via survei lapangan, bukan real-time feed).
            </p>
            <p className="text-[11px] font-semibold mt-1">
              “Analisis mendukung keputusan dan tidak menggantikan pertimbangan bisnis manusia.”
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#DDE3EA] bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
          >
            Mengerti &amp; Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
