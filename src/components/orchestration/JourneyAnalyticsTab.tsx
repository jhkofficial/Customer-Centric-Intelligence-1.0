import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  PieChart,
  Percent,
  DollarSign,
  Building2,
  Calendar,
  Filter,
  Download,
  Share2,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface JourneyAnalyticsTabProps {
  onShowToast: (msg: string) => void;
}

export const JourneyAnalyticsTab: React.FC<JourneyAnalyticsTabProps> = ({
  onShowToast
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30' | '90' | 'year'>('30');

  const reasonBreakdown = [
    { label: 'Financing Barrier (DP / Angsuran)', pct: 42, count: 1842, color: 'bg-amber-500' },
    { label: 'Purchase Timing (Menunggu Gajian / Bonus)', pct: 26, count: 1154, color: 'bg-blue-500' },
    { label: 'Competitor Comparison (Harga & Diskon)', pct: 18, count: 790, color: 'bg-purple-500' },
    { label: 'Product Mismatch (Ergonomi / Varian)', pct: 14, count: 614, color: 'bg-rose-500' }
  ];

  const channelPerformance = [
    {
      channel: 'WhatsApp Business API',
      volume: '18.420 Pesan',
      openRate: '88,4%',
      clickRate: '48,2%',
      convRate: '22,4%',
      revenue: 'Rp2,48 Miliar'
    },
    {
      channel: 'Showroom & Dealer Visit',
      volume: '2.380 Kunjungan',
      openRate: '100%',
      clickRate: '82,5%',
      convRate: '38,2%',
      revenue: 'Rp1,92 Miliar'
    },
    {
      channel: 'Telepon & Telesales',
      volume: '4.820 Panggilan',
      openRate: '68,2%',
      clickRate: '34,0%',
      convRate: '14,8%',
      revenue: 'Rp580 Juta'
    },
    {
      channel: 'Push Notification Mobile Apps',
      volume: '8.900 Notifikasi',
      openRate: '42,5%',
      clickRate: '18,4%',
      convRate: '8,6%',
      revenue: 'Rp240 Juta'
    }
  ];

  const branchLeaderboard = [
    { name: 'Dealer Astra Motor Pandanaran (Semarang)', compliance: '96,2%', avgTime: '18 Menit', deals: '214 SPK' },
    { name: 'Dealer Astra Motor Slamet Riyadi (Solo)', compliance: '94,0%', avgTime: '24 Menit', deals: '186 SPK' },
    { name: 'Dealer Astra Motor Ahmad Yani (Kudus)', compliance: '89,5%', avgTime: '38 Menit', deals: '142 SPK' },
    { name: 'Dealer Astra Motor HR Soebrantas (Purwokerto)', compliance: '86,8%', avgTime: '45 Menit', deals: '118 SPK' }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DDE3EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                JOURNEY ANALYTICS &amp; ATTRIBUTION
              </span>
              <span className="text-xs text-slate-500">Kinerja Siklus Prospek Jawa Tengah</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Analitik Perjalanan Pelanggan (Journey Analytics)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluasi kecepatan konversi (velocity), titik penyumbatan (bottlenecks), kepatuhan SLA sales cabang, dan efektivitas atribusi pendapatan multi-kanal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="30">30 Hari Terakhir</option>
              <option value="90">Kuartal Berjalan (90 Hari)</option>
              <option value="year">Tahun 2026 (YTD)</option>
            </select>

            <button
              onClick={() => onShowToast('Mengekspor laporan visual Journey Analytics ke PDF/XLSX...')}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Metrik</span>
            </button>
          </div>
        </div>

        {/* 4 Core Velocity & Operational KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-[#DDE3EA] bg-blue-50/50">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase">Kecepatan Rata-Rata (Velocity)</div>
            <div className="text-xl font-extrabold text-[#2563EB] mt-1 tabular-nums">14,2 Hari</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-0.5">
              <ArrowDownRight className="w-3 h-3" />
              <span>Lebih cepat 3,8 hari vs baseline</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#DDE3EA] bg-emerald-50/50">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase">Kepatuhan SLA Sales (&lt;4 Jam)</div>
            <div className="text-xl font-extrabold text-emerald-700 mt-1 tabular-nums">91,4%</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
              Target wilayah 90% terlampaui
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#DDE3EA] bg-purple-50/50">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase">Realisasi Pendapatan SPK</div>
            <div className="text-xl font-extrabold text-purple-700 mt-1 tabular-nums">Rp5,22 Miliar</div>
            <div className="text-[10px] text-purple-600 font-semibold mt-0.5">Dari 824 unit deal closed</div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#DDE3EA] bg-amber-50/50">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase">Win/Loss Ratio Prospek</div>
            <div className="text-xl font-extrabold text-amber-800 mt-1 tabular-nums">3,4 : 1</div>
            <div className="text-[10px] text-amber-700 font-semibold mt-0.5">+18% efisiensi reaktivasi</div>
          </div>
        </div>
      </div>

      {/* Grid: Reason Code Bottleneck Breakdown & Branch SLA Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Reason Code Bottlenecks (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#DDE3EA]">
            <h3 className="text-sm font-bold text-slate-900">
              Analisis Hambatan Utama Prospek (Drop-Off &amp; Barrier Analysis)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Distribusi alasan mengapa konsumen menunda atau membatalkan pembelian
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {reasonBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800">{item.label}</span>
                  <span className="font-bold text-slate-900">{item.pct}% ({item.count} Lead)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 leading-relaxed">
            <span className="font-bold block">Rekomendasi Strategis Wilayah:</span>
            Penyediaan opsi subsidi angsuran 2 bulan dari FIFAstra terbukti mengurangi hambatan pembiayaan sebesar 34% pada segmen komuter sport CB150R.
          </div>
        </div>

        {/* Right: Branch SLA Adherence (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#DDE3EA] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Kepatuhan SLA Follow-Up &amp; Konversi Cabang Dealer
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Peringkat kecepatan respon sales advisor terhadap lead masuk
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Target SLA: 90%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Cabang Dealer</th>
                  <th className="py-2.5 px-3 text-center">Kepatuhan SLA</th>
                  <th className="py-2.5 px-3 text-center">Waktu Respon</th>
                  <th className="py-2.5 px-3 text-right">Hasil Transaksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE3EA]">
                {branchLeaderboard.map((br, bIdx) => (
                  <tr key={bIdx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-800">{br.name}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {br.compliance}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-600 font-mono">{br.avgTime}</td>
                    <td className="py-3 px-3 text-right font-bold text-purple-700">{br.deals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Multi-Channel Performance & Revenue Attribution Table */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#DDE3EA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-slate-900">
              Efektivitas Kanal &amp; Atribusi Penjualan Multi-Touch
            </h3>
          </div>
          <span className="text-xs text-slate-500">Model Atribusi Linear &amp; Time-Decay</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#DDE3EA] text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Kanal Komunikasi</th>
                <th className="py-3 px-4">Volume Interaksi</th>
                <th className="py-3 px-4 text-center">Tingkat Dibuka (Open Rate)</th>
                <th className="py-3 px-4 text-center">Tingkat Respon / Klik</th>
                <th className="py-3 px-4 text-center">Rasio Konversi SPK</th>
                <th className="py-3 px-4 text-right">Pendapatan Teratribusi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE3EA]">
              {channelPerformance.map((ch, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{ch.channel}</td>
                  <td className="py-3.5 px-4 text-slate-600">{ch.volume}</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-800">{ch.openRate}</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-800">{ch.clickRate}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {ch.convRate}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">{ch.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
