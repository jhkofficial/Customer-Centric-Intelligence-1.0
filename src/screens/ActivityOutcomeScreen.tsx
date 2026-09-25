import React, { useState } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Users,
  Target,
  Shield,
  ArrowRight,
  Download,
  Filter,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { KpiCard } from '../components/common/KpiCard';
import { ScreenId } from '../types';

interface ActivityOutcomeScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ActivityOutcomeScreen: React.FC<ActivityOutcomeScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [selectedFunnelStep, setSelectedFunnelStep] = useState<string | null>(null);

  const funnelSteps = [
    { label: 'Rekomendasi Dihasilkan', count: '36 Rekomendasi', pct: '100%', color: 'bg-blue-600' },
    { label: 'Otorisasi & Disetujui', count: '29 Disetujui', pct: '80,5%', color: 'bg-blue-500' },
    { label: 'Telah Dieksekusi', count: '24 Kampanye', pct: '66,7%', color: 'bg-teal-600' },
    { label: 'Pelanggan Terjangkau', count: '82.600 Nasabah', pct: '66,1%', color: 'bg-teal-500' },
    { label: 'Respon Positif', count: '28.910 Respon', pct: '35,0%', color: 'bg-emerald-600' },
    { label: 'Konversi / Terselamatkan', count: '7.186 Pelanggan', pct: '8,7%', color: 'bg-emerald-700' }
  ];

  const activityRows = [
    {
      id: 'ACT-001',
      name: 'Retensi High Value Semarang Timur',
      strategy: 'RETAIN',
      channel: 'WhatsApp Bisnis',
      reached: '10.920',
      converted: '1.201 (11,0%)',
      impact: 'Rp1,42 M',
      status: 'Selesai'
    },
    {
      id: 'ACT-002',
      name: 'Pertahanan Pangsa Solo Baru',
      strategy: 'DEFEND',
      channel: 'Telepon & Relasional',
      reached: '8.450',
      converted: '845 (10,0%)',
      impact: 'Rp1,18 M',
      status: 'Selesai'
    },
    {
      id: 'ACT-003',
      name: 'Aktivasi Akuisisi Purwokerto Kampus',
      strategy: 'ACQUIRE',
      channel: 'Mobile App Push & Merchant',
      reached: '18.400',
      converted: '1.472 (8,0%)',
      impact: 'Rp980 Juta',
      status: 'Berjalan'
    },
    {
      id: 'ACT-004',
      name: 'Re-aktivasi Kudus & Demak Dormant',
      strategy: 'RETAIN',
      channel: 'Omnichannel Re-activation',
      reached: '14.200',
      converted: '994 (7,0%)',
      impact: 'Rp640 Juta',
      status: 'Selesai'
    }
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Aktivitas &amp; Hasil Bisnis (Closed-Loop Outcome)
          </h1>
          <p className="text-xs text-[#607080]">
            Pengukuran nilai nyata dari setiap rekomendasi intelijen AI: dari rekomendasi sistem, persetujuan pengguna, hingga realisasi pendapatan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast('Laporan dampak bisnis (Business Outcome Report) diunduh.')}
            className="px-3.5 py-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#607080]" />
            <span>Unduh Laporan Dampak</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          title="Nilai Pendapatan Terselamatkan"
          value="Rp6,4 Miliar"
          change="+18,2%"
          changeType="positive"
          subtitle="Realisasi Bulan Ini"
          sparklineData={[4.2, 4.8, 5.3, 5.9, 6.4]}
        />
        <KpiCard
          title="Tingkat Konversi Agregat"
          value="8,7%"
          change="+1,2 poin"
          changeType="positive"
          subtitle="7.186 pelanggan"
          sparklineData={[6.8, 7.1, 7.5, 8.2, 8.7]}
        />
        <KpiCard
          title="Tingkat Adopsi Rekomendasi"
          value="80,5%"
          change="Tinggi"
          changeType="positive"
          subtitle="29 dari 36 aksi disetujui"
          sparklineData={[72, 75, 78, 79, 80.5]}
        />
        <KpiCard
          title="ROI Kampanye Tertarget"
          value="4,8x"
          change="+0,6x"
          changeType="positive"
          subtitle="vs biaya kanal komunikasi"
          sparklineData={[3.8, 4.0, 4.2, 4.5, 4.8]}
        />
      </div>

      {/* Decision Funnel Horizontal Stages */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#DDE3EA]">
          <h2 className="text-xs font-bold text-[#17212B] uppercase tracking-wider">
            Corong Keputusan Tertutup (Closed-Loop Decision Funnel)
          </h2>
          <span className="text-[11px] text-[#607080]">Periode Pilot September 2026</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {funnelSteps.map((step, idx) => (
            <div
              key={step.label}
              className="p-3 rounded-lg border border-[#DDE3EA] bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] text-[#607080] font-semibold">Langkah {idx + 1}</div>
                <div className="text-xs font-bold text-[#17212B] mt-1 leading-snug">{step.label}</div>
              </div>
              <div className="mt-3">
                <div className="text-sm font-bold text-[#2563EB] tabular-nums">{step.count}</div>
                <div className="text-[10px] text-[#607080] mt-0.5">{step.pct} efisiensi</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results by Strategy & Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Outcome by Strategy */}
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-[#17212B] uppercase tracking-wider">
            Realisasi Nilai Berdasarkan Pilar Strategi
          </h3>

          <div className="space-y-3 text-xs pt-1">
            <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 flex justify-between items-center">
              <div>
                <div className="font-bold text-[#D97706]">RETAIN (Retensi Pelanggan)</div>
                <div className="text-[11px] text-slate-600">3.410 pelanggan terselamatkan dari churn</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-base text-[#17212B] tabular-nums">Rp3,12 M</div>
                <div className="text-[10px] text-emerald-700 font-semibold">Konversi 10,8%</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-red-50/60 border border-red-200 flex justify-between items-center">
              <div>
                <div className="font-bold text-[#C73E3A]">DEFEND (Pertahanan Pasar)</div>
                <div className="text-[11px] text-slate-600">2.180 pelanggan dipertahankan dari kompetitor</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-base text-[#17212B] tabular-nums">Rp2,15 M</div>
                <div className="text-[10px] text-emerald-700 font-semibold">Konversi 9,4%</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-teal-50/60 border border-teal-200 flex justify-between items-center">
              <div>
                <div className="font-bold text-[#0F7C7B]">ACQUIRE (Akuisisi Pasar Baru)</div>
                <div className="text-[11px] text-slate-600">1.596 nasabah baru terakuisisi</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-base text-[#17212B] tabular-nums">Rp1,13 M</div>
                <div className="text-[10px] text-emerald-700 font-semibold">Konversi 7,2%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Baseline vs Intervention Comparison */}
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-[#17212B] uppercase tracking-wider">
            Evaluasi Efektivitas (Intervensi AI vs Baseline Kontrol)
          </h3>

          <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-200 text-xs space-y-2">
            <div className="font-bold text-[#2563EB]">Peningkatan Konversi Sebesar +3,4 Poin Persen</div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Kelompok eksperimen yang menerima rekomendasi personal Next Best Action SERVEON mencatat tingkat konversi 8,7%, dibandingkan kelompok kontrol (tanpa intervensi spesifik) yang mencatat konversi alami 5,3%.
            </p>
          </div>

          <div className="space-y-2 text-xs pt-1">
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-[#DDE3EA]">
              <span className="text-[#607080]">Waktu Respon Rata-rata Nasabah:</span>
              <span className="font-bold text-[#17212B] tabular-nums">4,2 Jam (Lebih Cepat 62%)</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-[#DDE3EA]">
              <span className="text-[#607080]">Biaya Per Pelanggan Terselamatkan:</span>
              <span className="font-bold text-emerald-700 tabular-nums">Rp48.500 (Efisiensi 35%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-[#17212B]">Log Riwayat Eksekusi Kampanye</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F7FA] text-[#607080] font-semibold border-y border-[#DDE3EA]">
              <tr>
                <th className="py-2.5 px-3">Kode Aksi</th>
                <th className="py-2.5 px-3">Nama Kampanye</th>
                <th className="py-2.5 px-3">Strategi</th>
                <th className="py-2.5 px-3">Kanal Utama</th>
                <th className="py-2.5 px-3 text-right">Terjangkau</th>
                <th className="py-2.5 px-3 text-right">Konversi</th>
                <th className="py-2.5 px-3 text-right">Dampak Nilai</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE3EA]">
              {activityRows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-mono text-[#607080]">{r.id}</td>
                  <td className="py-2 px-3 font-semibold text-[#17212B]">{r.name}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        r.strategy === 'DEFEND'
                          ? 'bg-rose-50 text-[#C73E3A]'
                          : r.strategy === 'RETAIN'
                          ? 'bg-amber-50 text-[#D97706]'
                          : 'bg-teal-50 text-[#0F7C7B]'
                      }`}
                    >
                      {r.strategy}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-[#17212B]">{r.channel}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{r.reached}</td>
                  <td className="py-2 px-3 text-right font-medium tabular-nums">{r.converted}</td>
                  <td className="py-2 px-3 text-right font-bold text-emerald-700 tabular-nums">
                    {r.impact}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
