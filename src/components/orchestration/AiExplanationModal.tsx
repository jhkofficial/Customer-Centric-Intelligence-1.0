import React from 'react';
import { X, Sparkles, CheckCircle2, TrendingUp, ShieldCheck, HelpCircle } from 'lucide-react';

import { ProspectProfile } from '../../types/orchestration';

interface AiExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospect?: ProspectProfile;
  question?: string;
  customerName?: string;
  recommendedAction?: string;
  confidenceScore?: number;
  rationaleList?: string[];
  onShowToast?: (msg: string) => void;
}

export const AiExplanationModal: React.FC<AiExplanationModalProps> = ({
  isOpen,
  onClose,
  prospect,
  question,
  customerName,
  recommendedAction,
  confidenceScore = 88,
  rationaleList
}) => {
  if (!isOpen) return null;

  const activeCustomerName = customerName || prospect?.name || 'Budi Santoso';
  const activeAction =
    recommendedAction ||
    (prospect?.status === 'Financing Barrier'
      ? 'Kirimkan Penawaran Alternatif Skema DP 15% & Tenor 35 Bulan (Angsuran Ringan)'
      : prospect?.status === 'Hot Prospect'
      ? 'Reservasi Unit Ready Stock & Jadwalkan Penandatanganan SPK Hari Ini'
      : 'Kirimkan Penawaran Edukasi Nilai Produk & Fasilitas Test Drive');
  const activeQuestion =
    question || `Mengapa SERVEON merekomendasikan tindakan ini untuk ${activeCustomerName}?`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl border border-[#DDE3EA] shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in zoom-in-95 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Transparansi &amp; Penjelasan Keputusan AI
              </h3>
              <p className="text-xs text-slate-500">
                Explainable Decision Engine · Prospek: <strong>{activeCustomerName}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Callout */}
        <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wide">
              Tindakan Yang Direkomendasikan
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-900 font-bold text-[10.5px]">
              Tingkat Keyakinan: {confidenceScore}%
            </span>
          </div>
          <div className="font-extrabold text-slate-900 text-sm">{activeAction}</div>
        </div>

        {/* Rationale Breakdown (Section 26) */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">
            Mengapa SERVEON Merekomendasikan Langkah Ini?
          </div>
          <div className="space-y-2">
            {(rationaleList || [
              'Lead Score 82 dengan intensitas interaksi kalkulator kredit 2 kali dalam 48 jam.',
              'Pemeriksaan riwayat follow-up mencatat keberatan spesifik pada angsuran bulanan, bukan ketidaktertarikan pada unit.',
              'Analisis daya beli regional Semarang menunjukkan skema cicilan di bawah Rp1.100.000 meningkatkan rasio konversi hingga 74%.',
              'Program subsidi dealer aktif untuk Honda CB150R Streetfire dapat dialokasikan untuk subsidi DP Rp800.000.',
              'Konsumen memiliki rencana pembelian dalam 30 hari ke depan (Purchase Timing: Next Month).'
            ]).map((rat, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-800 leading-relaxed text-[11.5px]">{rat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ethics & Closed-Loop Note */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Model AI dilatih menggunakan data historis 14.800 interaksi prospek di Jawa Tengah dan mematuhi etika anti-bias.</span>
        </div>

        {/* Action */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            Mengerti &amp; Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};
