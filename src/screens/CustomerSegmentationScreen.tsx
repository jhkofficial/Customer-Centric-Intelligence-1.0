import React, { useState } from 'react';
import {
  PieChart,
  Users,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  MapPin,
  Sparkles,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { ScreenId } from '../types';

interface CustomerSegmentationScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const CustomerSegmentationScreen: React.FC<CustomerSegmentationScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [segmentationType, setSegmentationType] = useState<'business' | 'exploratory'>('business');
  const [selectedSegmentId, setSelectedSegmentId] = useState('seg-2');

  const BUSINESS_SEGMENTS = [
    {
      id: 'seg-1',
      name: 'High Value Loyal',
      count: '312.400',
      pct: '25,0%',
      avgSpend: 'Rp5.200.000',
      riskScore: 18,
      riskLevel: 'Rendah',
      preferredChannel: 'WhatsApp & Relasional',
      dominantArea: 'Kota Semarang & Surakarta',
      strategyObjective: 'Reward, eksklusivitas, dan program VIP advisory.'
    },
    {
      id: 'seg-2',
      name: 'High Value At Risk',
      count: '142.380',
      pct: '11,4%',
      avgSpend: 'Rp4.450.000',
      riskScore: 81,
      riskLevel: 'Tinggi',
      preferredChannel: 'WhatsApp Bisnis & Telepon',
      dominantArea: 'Semarang Timur & Surakarta Utara',
      strategyObjective: 'Intervensi retensi proaktif dan perbaikan SLA keluhan.'
    },
    {
      id: 'seg-3',
      name: 'Growing Customer',
      count: '286.100',
      pct: '22,9%',
      avgSpend: 'Rp2.850.000',
      riskScore: 32,
      riskLevel: 'Moderat',
      preferredChannel: 'Mobile App Push & Digital',
      dominantArea: 'Banyumas & Magelang',
      strategyObjective: 'Cross-selling produk produktif dan insentif volume.'
    },
    {
      id: 'seg-4',
      name: 'Price Sensitive',
      count: '241.500',
      pct: '19,3%',
      avgSpend: 'Rp1.650.000',
      riskScore: 54,
      riskLevel: 'Sedang',
      preferredChannel: 'SMS & WhatsApp Broadcast',
      dominantArea: 'Cilacap & Demak',
      strategyObjective: 'Promosi musiman bernilai tambah dan efisiensi biaya kanal.'
    },
    {
      id: 'seg-5',
      name: 'Dormant / Tidak Aktif',
      count: '168.200',
      pct: '13,5%',
      avgSpend: 'Rp420.000',
      riskScore: 89,
      riskLevel: 'Kritis',
      preferredChannel: 'Omnichannel Re-activation',
      dominantArea: 'Tegal & Pekalongan',
      strategyObjective: 'Survei re-aktivasi berinsentif atau seleksi pembersihan basis.'
    },
    {
      id: 'seg-6',
      name: 'New Customer (<90 hari)',
      count: '97.980',
      pct: '7,9%',
      avgSpend: 'Rp1.950.000',
      riskScore: 28,
      riskLevel: 'Rendah',
      preferredChannel: 'WhatsApp Onboarding Guide',
      dominantArea: 'Purwokerto Utara & Jepara',
      strategyObjective: 'Edukasi fitur lengkap dan aktivasi transaksi pertama.'
    }
  ];

  const selectedSegment = BUSINESS_SEGMENTS.find((s) => s.id === selectedSegmentId) || BUSINESS_SEGMENTS[1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Segmentasi Pelanggan
          </h1>
          <p className="text-xs text-[#607080]">
            Analisis segmentasi berbasis aturan bisnis (RFM) versus kluster eksploratif Machine Learning.
          </p>
        </div>

        {/* Segmentation Toggle */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#DDE3EA] rounded-xl text-xs">
          <button
            onClick={() => setSegmentationType('business')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              segmentationType === 'business'
                ? 'bg-[#2563EB] text-white shadow-2xs'
                : 'text-[#607080] hover:text-[#17212B]'
            }`}
          >
            Segment Bisnis (Resmi)
          </button>
          <button
            onClick={() => setSegmentationType('exploratory')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              segmentationType === 'exploratory'
                ? 'bg-[#0F7C7B] text-white shadow-2xs'
                : 'text-[#607080] hover:text-[#17212B]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cluster Eksploratif ML</span>
          </button>
        </div>
      </div>

      {/* Methodology Notice Banner */}
      <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60 flex items-start justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <FileCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-[#17212B]">
              {segmentationType === 'business'
                ? 'Segment Bisnis Terverifikasi (Rule-based RFM + Lifetime Value)'
                : 'Cluster Eksploratif K-Means Unsupervised (Pola Perilaku Baru)'}
            </span>
            <p className="text-[11px] text-[#607080]">
              {segmentationType === 'business'
                ? 'Segmen ini telah disetujui komite bisnis & tata kelola untuk operasional kampanye omnichannel resmi.'
                : 'Kluster pola analitis eksperimental untuk menemukan anomali migrasi kanal sebelum disetujui sebagai segmen bisnis.'}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-blue-200 text-[#2563EB] shrink-0">
          Versi Model: 2.1
        </span>
      </div>

      {/* Segment Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {BUSINESS_SEGMENTS.map((seg) => {
          const isSelected = seg.id === selectedSegmentId;
          return (
            <div
              key={seg.id}
              onClick={() => setSelectedSegmentId(seg.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#2563EB] bg-blue-50/40 ring-1 ring-blue-500/30 shadow-2xs'
                  : 'border-[#DDE3EA] bg-white hover:border-slate-300'
              }`}
            >
              <div className="text-[11px] font-semibold text-[#607080] truncate">{seg.name}</div>
              <div className="text-lg font-bold text-[#17212B] mt-1 tabular-nums">{seg.count}</div>
              <div className="mt-1 flex items-center justify-between text-[10px]">
                <span className="text-[#607080]">{seg.pct} total</span>
                <span
                  className={`font-semibold ${
                    seg.riskScore > 70
                      ? 'text-[#C73E3A]'
                      : seg.riskScore > 40
                      ? 'text-[#D97706]'
                      : 'text-[#14804A]'
                  }`}
                >
                  Risiko: {seg.riskScore}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Analysis Grid: Selected Segment Overview + RFM Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Selected Segment Profile (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
            <div>
              <div className="text-[11px] font-semibold text-[#607080]">PROFIL SEGMEN TERPILIH</div>
              <h2 className="text-base font-bold text-[#17212B]">{selectedSegment.name}</h2>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                selectedSegment.riskScore > 70
                  ? 'bg-rose-50 text-[#C73E3A] border border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              Risiko Churn: {selectedSegment.riskLevel} ({selectedSegment.riskScore}/100)
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <div className="text-[11px] text-[#607080]">Ukuran Basis</div>
              <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                {selectedSegment.count}
              </div>
              <div className="text-[10px] text-[#607080] mt-0.5">{selectedSegment.pct} dari total nasabah</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <div className="text-[11px] text-[#607080]">Rata-rata Nilai Belanja</div>
              <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                {selectedSegment.avgSpend}
              </div>
              <div className="text-[10px] text-[#607080] mt-0.5">per bulan per akun</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <div className="text-[11px] text-[#607080]">Kanal Paling Efektif</div>
              <div className="text-sm font-bold text-[#2563EB] mt-0.5 truncate">
                {selectedSegment.preferredChannel}
              </div>
              <div className="text-[10px] text-[#607080] mt-0.5">Tingkat respons 38%</div>
            </div>
          </div>

          {/* Strategic Objective */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-[#DDE3EA] space-y-1.5">
            <div className="text-[11px] font-bold text-[#17212B] uppercase tracking-wider">
              Tujuan Strategis &amp; Next Action Rekomendasi
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedSegment.strategyObjective}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-[#607080]">Wilayah Dominan: <strong>{selectedSegment.dominantArea}</strong></span>
            <button
              onClick={() => onNavigateToScreen('campaign-omnichannel')}
              className="text-[#2563EB] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Siapkan Campaign untuk Segmen Ini</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: RFM Behavioral Matrix Simulation (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-xs text-[#17212B]">Matriks Perilaku RFM</h3>
              <span className="text-[10px] text-[#607080]">Recency vs Monetary</span>
            </div>
            <p className="text-[11px] text-[#607080] mb-3">
              Distribusi 6 segmen utama berdasarkan kebaruan transaksi dan nilai finansial.
            </p>

            {/* Matrix Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="text-[10px] text-emerald-800 font-semibold">High Value &amp; Recent</div>
                <div className="font-bold text-[#14804A] mt-1">High Value Loyal (25%)</div>
                <div className="text-[10px] text-slate-500 mt-1">Frekuensi tinggi, risiko rendah</div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <div className="text-[10px] text-amber-800 font-semibold">High Value &amp; Lapsing</div>
                <div className="font-bold text-[#D97706] mt-1">High Value At Risk (11,4%)</div>
                <div className="text-[10px] text-slate-500 mt-1">Penurunan frekuensi &gt; 30 hari</div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-[10px] text-blue-800 font-semibold">Growing &amp; Moderate</div>
                <div className="font-bold text-[#2563EB] mt-1">Growing Customer (22,9%)</div>
                <div className="text-[10px] text-slate-500 mt-1">Potensi upsell kuat</div>
              </div>

              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                <div className="text-[10px] text-rose-800 font-semibold">Low Value &amp; Dormant</div>
                <div className="font-bold text-[#C73E3A] mt-1">Dormant (13,5%)</div>
                <div className="text-[10px] text-slate-500 mt-1">Tidak ada transaksi &gt; 90 hari</div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#DDE3EA] flex items-center justify-between text-[11px] text-[#607080]">
            <span>Diperbarui mingguan dengan agregasi transaksi batch</span>
            <button
              onClick={() => onShowToast('Hasil segmentasi diekspor ke format CSV.')}
              className="font-semibold text-[#2563EB] hover:underline"
            >
              Ekspor Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
