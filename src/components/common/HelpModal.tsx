import React from 'react';
import { X, BookOpen, Layers, CheckCircle, ShieldCheck } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const frameworkSteps = [
    { step: '1', question: 'WHO IS THE CUSTOMER?', title: 'Intelijen Pelanggan', desc: 'Identifikasi identitas pelanggan, profil nilai transaksi (Customer Value), dan riwayat hubungan secara terlindungi (data masking).' },
    { step: '2', question: 'WHERE ARE THEY?', title: 'Intelijen Lokasi', desc: 'Pemetaan kluster spasial, jangkauan titik layanan (outlet), aksesibilitas geografis, dan kedekatan dengan kompetitor di Jawa Tengah.' },
    { step: '3', question: 'WHAT IS HAPPENING?', title: 'Intelijen Prediktif', desc: 'Model machine learning mendeteksi penurunan frekuensi layanan, risiko churn, dan perubahan perilaku bertransaksi.' },
    { step: '4', question: 'WHY DOES IT MATTER?', title: 'Intelijen Keputusan', desc: 'Klasifikasi prioritas aksi strategis ke dalam 3 pilar: RETAIN (Pertahankan Loyalitas), DEFEND (Tangkis Kompetitor), atau ACQUIRE (Rebut Pasar Baru).' },
    { step: '5', question: 'WHAT SHOULD WE DO?', title: 'Intelijen Tindakan (Engagement)', desc: 'Rekomendasi Next Best Action dengan kanal omnichannel optimal (WhatsApp, Telepon, Push, Cabang) sesuai kepatuhan kontak & izin pelanggan.' },
    { step: '6', question: 'WHAT WAS THE RESULT?', title: 'Intelijen Hasil Bisnis', desc: 'Pengukuran konversi nyata, nilai pendapatan terselamatkan (preventable value), dan tingkat adopsi rekomendasi.' },
    { step: '7', question: 'LEARN', title: 'Pembelajaran Berkelanjutan', desc: 'Evaluasi akurasi model (AUROC, F1), pemantauan data drift, dan kalibrasi bobot multi-kriteria untuk perbaikan berkelanjutan.' }
  ];

  const glossary = [
    { term: 'RETAIN', desc: 'Strategi retensi untuk pelanggan bernilai tinggi yang menunjukkan sinyal risiko churn.' },
    { term: 'DEFEND', desc: 'Strategi pertahanan wilayah bernilai tinggi yang menghadapi tekanan penetrasi agresif kompetitor.' },
    { term: 'ACQUIRE', desc: 'Strategi akuisisi wilayah dengan potensi demografi tinggi namun penetrasi saat ini masih rendah (white space).' },
    { term: 'SHAP', desc: 'SHapley Additive exPlanations — kontribusi fitur terukur yang menjelaskan bobot pendorong prediksi model AI.' },
    { term: 'AUROC', desc: 'Area Under Receiver Operating Characteristic — metrik kualitas daya pisah model klasifikasi (skor Jawa Tengah: 0,86).' },
    { term: 'MCDM', desc: 'Multi-Criteria Decision Making (AHP/TOPSIS) — metodologi pembobotan kriteria terstruktur untuk pemilihan kandidat lokasi.' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DDE3EA] flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-[#DDE3EA] bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#2563EB]" />
            <div>
              <h3 className="font-bold text-sm text-[#17212B]">Panduan Metodologi &amp; Arsitektur SERVEON</h3>
              <p className="text-[11px] text-[#607080]">Kerangka Kerja Keputusan Tertutup (Closed-Loop Decision Framework)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#17212B]">
          {/* Framework Steps */}
          <div>
            <h4 className="font-bold text-xs text-[#17212B] uppercase tracking-wider mb-3">
              Alur Perjalanan Keputusan Bisnis (The 7-Stage Intelligence Loop)
            </h4>
            <div className="space-y-2.5">
              {frameworkSteps.map((s) => (
                <div key={s.step} className="p-3 rounded-xl border border-[#DDE3EA] bg-[#F5F7FA] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#15324B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-bold text-[#17212B]">
                      <span>{s.question}</span>
                      <span className="text-[11px] text-[#2563EB] font-semibold">({s.title})</span>
                    </div>
                    <p className="text-[11px] text-[#607080] mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Glossary */}
          <div>
            <h4 className="font-bold text-xs text-[#17212B] uppercase tracking-wider mb-3">
              Glosarium Istilah &amp; Metodologi
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {glossary.map((g) => (
                <div key={g.term} className="p-2.5 rounded-lg border border-[#DDE3EA] bg-white">
                  <div className="font-bold text-xs text-[#17212B]">{g.term}</div>
                  <div className="text-[11px] text-[#607080] mt-0.5 leading-snug">{g.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Notice */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-emerald-900 leading-relaxed">
              <strong>Prinsip Tata Kelola Data &amp; Etika AI:</strong> SERVEON menerapkan penyamaran data pribadi (masking) secara otomatis, pembatasan hak akses berbasis peran (RBAC), serta mewajibkan persetujuan manusia (human-in-the-loop) untuk setiap rekomendasi tindakan kampanye bermaterial tinggi.
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#DDE3EA] bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
          >
            Mengerti &amp; Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};
