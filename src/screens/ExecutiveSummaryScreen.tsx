import React, { useState } from 'react';
import {
  Download,
  Bot,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Shield,
  Target,
  CheckCircle2,
  ChevronRight,
  Layers
} from 'lucide-react';
import { KpiCard } from '../components/common/KpiCard';
import { StrategyBadge } from '../components/common/StrategyBadge';
import { JawaTengahMap } from '../components/map/JawaTengahMap';
import { DetailDrawer } from '../components/common/DetailDrawer';
import { GLOBAL_METRICS, STRATEGIC_PRIORITIES, REGENCIES_DATA } from '../data/mockData';
import { ScreenId, StrategicPriority } from '../types';

interface ExecutiveSummaryScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onOpenAgentModal: (prompt?: string) => void;
  onShowToast: (msg: string) => void;
}

export const ExecutiveSummaryScreen: React.FC<ExecutiveSummaryScreenProps> = ({
  onNavigateToScreen,
  onOpenAgentModal,
  onShowToast
}) => {
  const [selectedPriority, setSelectedPriority] = useState<StrategicPriority | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeStrategyTab, setActiveStrategyTab] = useState<'ALL' | 'DEFEND' | 'RETAIN' | 'ACQUIRE'>('ALL');

  const handleSelectArea = (areaName: string) => {
    const prio = STRATEGIC_PRIORITIES.find(
      (p) => p.name.toLowerCase() === areaName.toLowerCase() || p.kabupaten.toLowerCase() === areaName.toLowerCase()
    );
    if (prio) {
      setSelectedPriority(prio);
      setIsDrawerOpen(true);
    } else {
      const reg = REGENCIES_DATA.find((r) => r.name.toLowerCase() === areaName.toLowerCase());
      if (reg) {
        setSelectedPriority({
          id: reg.id,
          name: reg.name,
          kabupaten: reg.category,
          strategy: reg.strategy,
          score: reg.strategicScore,
          reason: `Wilayah ${reg.name} memiliki ${reg.totalCustomers.toLocaleString('id-ID')} pelanggan dengan cakupan ${reg.coverageRate}%.`,
          confidence: 90,
          customerValue: 'Sedang',
          competitorPressure: 'Sedang',
          coverageGap: 'Moderat',
          totalCustomers: reg.totalCustomers,
          activeRate: reg.activeRate,
          opportunityValue: reg.opportunityValue,
          recommendedAction: `Optimalisasi penetrasi dan penguatan titik layanan cabang di ${reg.name}.`,
          coordinates: reg.coordinates
        });
        setIsDrawerOpen(true);
      }
    }
  };

  const handleExport = () => {
    onShowToast('Laporan Ringkasan Eksekutif Jawa Tengah (PDF/Excel) sedang diunduh...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
              Ringkasan Eksekutif
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Kualitas Data: {GLOBAL_METRICS.dataQualityScore} (Baik)
            </span>
          </div>
          <p className="text-xs text-[#607080]">
            Prioritas pelanggan dan wilayah Jawa Tengah · Periode September 2026
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="px-3 py-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#607080]" />
            <span>Ekspor Laporan</span>
          </button>

          <button
            onClick={() =>
              onOpenAgentModal(
                'Ringkaskan risiko dan peluang terbesar bulan ini di Jawa Tengah serta tindakan prioritasnya.'
              )
            }
            className="px-3.5 py-2 bg-gradient-to-r from-[#0F7C7B] to-[#2563EB] hover:opacity-95 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Tanya SERVEON Agent</span>
          </button>
        </div>
      </div>

      {/* 6 KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard
          title="Total Pelanggan"
          value={GLOBAL_METRICS.totalCustomers}
          change="+2,8%"
          changeType="positive"
          subtitle="vs bulan lalu"
          sparklineData={[1200000, 1215000, 1228000, 1235000, 1248560]}
          tooltip="Total basis data pelanggan terdaftar di seluruh wilayah Jawa Tengah"
        />

        <KpiCard
          title="Pelanggan Aktif"
          value={GLOBAL_METRICS.activeRate}
          change="Stabil"
          changeType="neutral"
          subtitle="981.420 pelanggan"
          sparklineData={[77.8, 78.1, 78.4, 78.5, 78.6]}
          tooltip="Persentase pelanggan yang bertransaksi minimal 1 kali dalam 30 hari terakhir"
        />

        <KpiCard
          title="Risiko Retensi Tinggi"
          value={GLOBAL_METRICS.highRiskCustomers}
          change="+4,1%"
          changeType="warning"
          subtitle="11,4% total basis"
          sparklineData={[132000, 134500, 137000, 139800, 142380]}
          tooltip="Pelanggan yang terdeteksi model AI memiliki probabilitas churn > 70%"
          onClick={() => onNavigateToScreen('retensi')}
        />

        <KpiCard
          title="Cakupan Layanan"
          value={GLOBAL_METRICS.serviceCoverage}
          change="+1,6 poin"
          changeType="positive"
          subtitle="48 titik layanan"
          sparklineData={[79.5, 80.2, 81.1, 81.6, 82.4]}
          tooltip="Area populasi dalam jangkauan 15 menit berkendara ke outlet resmi"
          onClick={() => onNavigateToScreen('jaringan-cakupan')}
        />

        <KpiCard
          title="Area Prioritas"
          value={GLOBAL_METRICS.priorityAreas}
          change="5 Kritis"
          changeType="warning"
          subtitle="Skor di atas 75"
          sparklineData={[14, 15, 15, 16, 17]}
          tooltip="Wilayah strategis yang membutuhkan keputusan RETAIN, DEFEND, atau ACQUIRE"
          onClick={() => onNavigateToScreen('peringkat-strategis')}
        />

        <KpiCard
          title="Nilai Peluang"
          value="Rp42,8 M"
          change="+8,3%"
          changeType="positive"
          subtitle="Estimasi gabungan"
          sparklineData={[36.5, 38.2, 39.8, 41.0, 42.8]}
          tooltip="Potensi nilai bisnis dari retensi, pertahanan pangsa pasar, dan akuisisi baru"
        />
      </div>

      {/* AI Executive Insight Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-teal-50/40 to-white border border-blue-200/80 rounded-xl p-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#2563EB] text-white shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#2563EB] tracking-wide uppercase">
                Ringkasan Berbasis Data AI
              </span>
              <span className="text-[10px] text-[#607080]">· Diperbarui 22 Sep 2026, 23.45 WIB</span>
            </div>
            <p className="text-xs text-[#17212B] leading-relaxed">
              <strong>Semarang Timur</strong> menjadi prioritas tertinggi (skor 91, DEFEND) karena kombinasi nilai pelanggan yang sangat tinggi, peningkatan tekanan kompetitor baru, dan celah cakupan layanan di radius 7 km. Tindakan yang disarankan adalah memperkuat engagement pelanggan tier Platinum serta mengevaluasi penambahan satellite service point.
            </p>
          </div>
          <button
            onClick={() => onNavigateToScreen('explainability')}
            className="text-xs text-[#2563EB] hover:text-blue-800 font-semibold whitespace-nowrap self-center shrink-0 flex items-center gap-1 hover:underline"
          >
            <span>Lihat dasar analisis</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content: Strategy Map & Prioritas Utama List */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Jawa Tengah Map (7 cols) */}
        <div className="xl:col-span-7 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">Peta Strategi Jawa Tengah</h2>
              <p className="text-[11px] text-[#607080]">Sebaran wilayah RETAIN, DEFEND, dan ACQUIRE</p>
            </div>

            {/* Strategy Filter Tabs */}
            <div className="flex items-center gap-1 p-0.5 bg-[#F5F7FA] rounded-lg border border-[#DDE3EA] text-xs">
              {(['ALL', 'DEFEND', 'RETAIN', 'ACQUIRE'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveStrategyTab(tab)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    activeStrategyTab === tab
                      ? 'bg-white text-[#17212B] shadow-2xs font-semibold'
                      : 'text-[#607080] hover:text-[#17212B]'
                  }`}
                >
                  {tab === 'ALL' ? 'Semua' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Component */}
          <JawaTengahMap
            activeStrategyFilter={activeStrategyTab}
            selectedAreaId={selectedPriority?.name}
            onSelectArea={handleSelectArea}
          />
        </div>

        {/* Right: Prioritas Utama Ranked List (5 cols) */}
        <div className="xl:col-span-5 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#DDE3EA]">
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">Prioritas Utama</h2>
              <p className="text-[11px] text-[#607080]">5 Wilayah berbobot keputusan tertinggi</p>
            </div>
            <button
              onClick={() => onNavigateToScreen('peringkat-strategis')}
              className="text-xs text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Semua Area</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
            {STRATEGIC_PRIORITIES.map((prio, idx) => (
              <div
                key={prio.id}
                onClick={() => {
                  setSelectedPriority(prio);
                  setIsDrawerOpen(true);
                }}
                className={`p-3 rounded-lg border transition-all cursor-pointer hover:border-[#2563EB] hover:shadow-2xs ${
                  selectedPriority?.id === prio.id
                    ? 'border-[#2563EB] bg-blue-50/40 ring-1 ring-blue-500/30'
                    : 'border-[#DDE3EA] bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-[#17212B] font-bold text-xs flex items-center justify-center tabular-nums">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-[#17212B]">{prio.name}</span>
                    <span className="text-[11px] text-[#607080]">({prio.kabupaten})</span>
                  </div>

                  <StrategyBadge strategy={prio.strategy} score={prio.score} size="sm" />
                </div>

                <p className="text-[11px] text-[#607080] leading-snug line-clamp-2 mb-2">
                  {prio.reason}
                </p>

                <div className="flex items-center justify-between text-[10px] text-[#607080] pt-1.5 border-t border-slate-100">
                  <span>Peluang: <strong className="text-emerald-700">{prio.opportunityValue}</strong></span>
                  <span className="text-[#2563EB] font-semibold flex items-center gap-0.5">
                    Lihat detail <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-[#DDE3EA] flex items-center justify-between text-[11px] text-[#607080]">
            <span>Metode: Pembobotan Multi-Kriteria (AHP + TOPSIS)</span>
            <button
              onClick={() => onNavigateToScreen('kandidat-lokasi')}
              className="text-[#2563EB] font-semibold hover:underline"
            >
              Simulasi Lokasi →
            </button>
          </div>
        </div>
      </div>

      {/* Supporting Analytics Grid (4 cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Trend 6 Bulan */}
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#17212B]">Tren Strategi 6 Bulan</h3>
            <span className="text-[10px] text-[#607080]">Apr – Sep 2026</span>
          </div>

          {/* Stacked visualization simulation */}
          <div className="space-y-2 pt-1 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#C73E3A] font-semibold">Tekanan Kompetisi (DEFEND)</span>
                <span className="font-bold tabular-nums">41%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#C73E3A] h-full rounded-full" style={{ width: '41%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#D97706] font-semibold">Risiko Retensi (RETAIN)</span>
                <span className="font-bold tabular-nums">34%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#D97706] h-full rounded-full" style={{ width: '34%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#0F7C7B] font-semibold">Potensi Akuisisi (ACQUIRE)</span>
                <span className="font-bold tabular-nums">25%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#0F7C7B] h-full rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
          <p className="text-[11px] text-[#607080]">
            Tekanan kompetitor di Semarang &amp; Kudus meningkat tajam pada kuartal 3.
          </p>
        </div>

        {/* Top 5 Kabupaten/Kota Peluang */}
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#17212B]">Peluang Tertinggi per Area</h3>
            <span className="text-[10px] text-emerald-700 font-semibold">Total Rp42,8 M</span>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            {[
              { name: 'Kota Semarang', val: 'Rp12,4 M', pct: 90 },
              { name: 'Kota Surakarta', val: 'Rp9,2 M', pct: 74 },
              { name: 'Banyumas', val: 'Rp7,8 M', pct: 62 },
              { name: 'Kudus', val: 'Rp6,1 M', pct: 49 },
              { name: 'Magelang', val: 'Rp5,2 M', pct: 41 }
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-2 text-[11px]">
                <span className="font-medium text-[#17212B] w-24 truncate">{item.name}</span>
                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${item.pct}%` }} />
                </div>
                <span className="font-bold text-[#17212B] tabular-nums text-right w-16">
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rekomendasi Tindakan Card */}
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#17212B]">Rekomendasi Tindakan</h3>
            <span className="text-[10px] font-semibold text-[#2563EB]">36 Aktif</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-lg bg-red-50/70 border border-red-100">
              <div className="font-semibold text-xs text-[#C73E3A]">1. Pertahanan Semarang Timur</div>
              <p className="text-[11px] text-[#607080] mt-0.5">Penawaran retensi Platinum &amp; percepatan respon cabang.</p>
            </div>

            <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100">
              <div className="font-semibold text-xs text-[#D97706]">2. Reaktivasi Surakarta Utara</div>
              <p className="text-[11px] text-[#607080] mt-0.5">Kampanye proactive WhatsApp untuk 21.200 nasabah berisiko.</p>
            </div>

            <div className="p-2 rounded-lg bg-teal-50/70 border border-teal-100">
              <div className="font-semibold text-xs text-[#0F7C7B]">3. Ekspansi Purwokerto Utara</div>
              <p className="text-[11px] text-[#607080] mt-0.5">Penetapan satellite service point pada kuartal 4.</p>
            </div>
          </div>
        </div>

        {/* Hasil Bulan Ini Card */}
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#17212B]">Hasil Eksekusi Bulan Ini</h3>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Konversi 8,7%
            </span>
          </div>

          <div className="space-y-2.5 pt-1 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-100 text-[11px]">
              <span className="text-[#607080]">Tindakan Dieksekusi:</span>
              <span className="font-bold text-[#17212B] tabular-nums">24 dari 36 aksi</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100 text-[11px]">
              <span className="text-[#607080]">Pelanggan Terjangkau:</span>
              <span className="font-bold text-[#17212B] tabular-nums">82.600 pelanggan</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100 text-[11px]">
              <span className="text-[#607080]">Pelanggan Terselamatkan:</span>
              <span className="font-bold text-emerald-700 tabular-nums">7.186 pelanggan</span>
            </div>

            <div className="flex justify-between items-center py-1 text-[11px]">
              <span className="text-[#607080]">Nilai Terrealisasi:</span>
              <span className="font-bold text-[#14804A] tabular-nums">Rp6,4 miliar</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateToScreen('aktivitas-hasil')}
            className="w-full py-1.5 text-center text-xs font-semibold text-[#2563EB] hover:bg-blue-50 rounded-md transition-colors"
          >
            Buka Analisis Hasil Lengkap →
          </button>
        </div>
      </div>

      {/* Detail Drawer */}
      <DetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={selectedPriority}
        onNavigateToStrategy={(strat) => {
          setIsDrawerOpen(false);
          if (strat === 'DEFEND') onNavigateToScreen('pertahanan-pasar');
          else if (strat === 'RETAIN') onNavigateToScreen('retensi');
          else onNavigateToScreen('akuisisi');
        }}
        onAskAgent={(prompt) => {
          setIsDrawerOpen(false);
          onOpenAgentModal(prompt);
        }}
      />
    </div>
  );
};
