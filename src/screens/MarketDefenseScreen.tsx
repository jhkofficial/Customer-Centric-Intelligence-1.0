import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  Building2,
  TrendingUp,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Send,
  Compass,
  Clock,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Layers,
  Car,
  BarChart2,
  Zap,
  Users,
  Search
} from 'lucide-react';
import { KpiCard } from '../components/common/KpiCard';
import { StrategyBadge } from '../components/common/StrategyBadge';
import { JawaTengahMap } from '../components/map/JawaTengahMap';
import { StrategySwitcher } from '../components/strategy/StrategySwitcher';
import { CrossStrategyModal } from '../components/strategy/CrossStrategyModal';
import { MethodTransparencyModal } from '../components/strategy/MethodTransparencyModal';
import { ApprovalWorkflowModal } from '../components/strategy/ApprovalWorkflowModal';
import { SharedAreaDrawer, AreaDetailData } from '../components/strategy/SharedAreaDrawer';
import { GLOBAL_METRICS } from '../data/mockData';
import { ScreenId, UserRole } from '../types';

interface MarketDefenseScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onOpenAgentModal: (prompt?: string) => void;
  onShowToast: (msg: string) => void;
  currentUserRole?: UserRole;
}

export const MarketDefenseScreen: React.FC<MarketDefenseScreenProps> = ({
  onNavigateToScreen,
  onOpenAgentModal,
  onShowToast,
  currentUserRole = 'Administrator'
}) => {
  const [selectedArea, setSelectedArea] = useState('Semarang Timur');
  const [viewMode, setViewMode] = useState<'Tekanan Kompetitor' | 'Nilai Terekspos' | 'Celah Akses' | 'Overlapping'>('Tekanan Kompetitor');

  // Modals & Drawers
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedDrawerData, setSelectedDrawerData] = useState<AreaDetailData | null>(null);

  const isExportPermitted = currentUserRole === 'Administrator' || currentUserRole === 'Security / Data Governance' || currentUserRole === 'Business / Marketing';

  // Area Profiles
  const defenseProfiles: Record<string, AreaDetailData> = {
    'Semarang Timur': {
      name: 'Semarang Timur',
      kabupaten: 'Kota Semarang',
      strategy: 'DEFEND',
      strategicScore: 91,
      priorityLevel: 'Kritis',
      totalCustomers: 142800,
      activeRate: 79.4,
      outlets: 10,
      opportunityValue: 'Rp9,4 miliar',
      confidence: 94,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '96,8%',
      topDrivers: [
        { factor: 'Konsentrasi basis nasabah bernilai tinggi (Rp9,4M peluang)', contribution: '+28 kontribusi', impact: 'negative' },
        { factor: 'Peningkatan proksimitas kompetitor (2 outlet baru <3 km dlm 90 hari)', contribution: '+25 kontribusi', impact: 'negative' },
        { factor: 'Celah aksesibilitas layanan (jarak 7,8 km ke Pandanaran, tempuh 28 mnt)', contribution: '+19 kontribusi', impact: 'negative' },
        { factor: 'Kantong pemukiman komuter mengalami penurunan keaktifan (-11%)', contribution: '+14 kontribusi', impact: 'negative' }
      ],
      recommendedAction: {
        title: 'Penguatan Retensi High-Value & Penambahan Satellite Service Point',
        description: 'Perkuat keterikatan nasabah Platinum serta evaluasi pembukaan satellite point di Kandidat A Semarang Timur untuk menutup celah akses.',
        targetAudience: '12.400 nasabah High-Value terekspos',
        preferredChannels: 'WhatsApp VIP & RO Call & Branch Visit',
        timing: 'Horizon evaluasi: 30 hari',
        owner: 'Marketing + Network Development',
        approver: 'Head of Regional Strategy & Network Dev',
        approvalStatus: 'Menunggu Review'
      }
    },
    'Kudus Selatan': {
      name: 'Kudus Selatan',
      kabupaten: 'Kudus',
      strategy: 'DEFEND',
      strategicScore: 79,
      priorityLevel: 'Tinggi',
      totalCustomers: 74200,
      activeRate: 76.8,
      outlets: 4,
      opportunityValue: 'Rp5,6 miliar',
      confidence: 88,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '95,2%',
      topDrivers: [
        { factor: 'Kluster UMKM mengalami penetrasi agresif kompetitor', contribution: '+22 kontribusi', impact: 'negative' },
        { factor: 'Diskon tarif layanan agresif dari provider pesaing', contribution: '+18 kontribusi', impact: 'negative' },
        { factor: 'Celah respon keluhan cabang lokal', contribution: '+12 kontribusi', impact: 'negative' }
      ],
      recommendedAction: {
        title: 'Program Bundling Eksklusif B2B & UMKM Sentra Kudus',
        description: 'Paket bundling transaksi khusus sentra industri rokok & bordir dengan insentif transaksi berkala.',
        targetAudience: '8.200 akun bisnis terekspos',
        preferredChannels: 'Kunjungan B2B & WhatsApp Bisnis',
        timing: 'Horizon evaluasi: 45 hari',
        owner: 'Commercial SME Team',
        approver: 'Regional Business Head',
        approvalStatus: 'Menunggu Persetujuan'
      }
    },
    'Demak Barat': {
      name: 'Demak Barat',
      kabupaten: 'Demak',
      strategy: 'DEFEND',
      strategicScore: 72,
      priorityLevel: 'Tinggi',
      totalCustomers: 52400,
      activeRate: 77.5,
      outlets: 3,
      opportunityValue: 'Rp4,1 miliar',
      confidence: 85,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '94,6%',
      topDrivers: [
        { factor: 'Koridor komuter Pantura menghadapi kampanye diskon masif', contribution: '+20 kontribusi', impact: 'negative' },
        { factor: 'Kepadatan sinyal pada jam sibuk komuter', contribution: '+14 kontribusi', impact: 'negative' }
      ],
      recommendedAction: {
        title: 'Penguatan Kapasitas Jalur Komuter & Program Loyalitas Express',
        description: 'Optimasi kapasitas layanan pada titik komuter dan penawaran poin reward komuter.',
        targetAudience: '5.100 nasabah komuter',
        preferredChannels: 'Mobile App Push & SMS',
        timing: 'Horizon evaluasi: 60 hari',
        owner: 'Network Operations Demak',
        approver: 'Branch Manager Demak',
        approvalStatus: 'Draft'
      }
    },
    'Jepara Kota': {
      name: 'Jepara Kota',
      kabupaten: 'Jepara',
      strategy: 'DEFEND',
      strategicScore: 68,
      priorityLevel: 'Sedang',
      totalCustomers: 48900,
      activeRate: 78.0,
      outlets: 3,
      opportunityValue: 'Rp3,4 miliar',
      confidence: 84,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '94,0%',
      topDrivers: [
        { factor: 'Penetrasi kompetitor di sentra ukir pesisir', contribution: '+16 kontribusi', impact: 'negative' },
        { factor: 'Jarak outlet di sub-urban pesisir', contribution: '+11 kontribusi', impact: 'negative' }
      ],
      recommendedAction: {
        title: 'Kemitraan Paguyuban Ukir & Retensi Pelanggan Ekspor',
        description: 'Edukasi solusi transaksi valuta asing dan kemitraan komunitas perajin.',
        targetAudience: '3.800 pelaku usaha',
        preferredChannels: 'Relationship Officer & Event Komunitas',
        timing: 'Horizon evaluasi: 30 hari',
        owner: 'Branch Ops Jepara',
        approver: 'Branch Manager Jepara',
        approvalStatus: 'Dalam Pelaksanaan'
      }
    }
  };

  const currentAreaDetail = defenseProfiles[selectedArea] || defenseProfiles['Semarang Timur'];

  const handleOpenDetailDrawer = (areaName: string) => {
    const data = defenseProfiles[areaName] || {
      name: areaName,
      kabupaten: 'Jawa Tengah',
      strategy: 'DEFEND',
      strategicScore: 78,
      priorityLevel: 'Tinggi',
      totalCustomers: 70000,
      activeRate: 78.0,
      outlets: 5,
      opportunityValue: 'Rp5,2 miliar',
      confidence: 88,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '95,5%',
      topDrivers: [
        { factor: 'Tekanan ekspansi kompetitor regional', contribution: '+22 kontribusi', impact: 'negative' },
        { factor: 'Celah aksesibilitas layanan outlet', contribution: '+15 kontribusi', impact: 'negative' }
      ],
      recommendedAction: {
        title: `Paket Mitigasi Kompetisi ${areaName}`,
        description: 'Tindakan defensif untuk mengamankan portofolio nasabah inti.',
        targetAudience: '4.500 nasabah prioritas',
        preferredChannels: 'WhatsApp & Telepon',
        timing: '30 hari',
        owner: 'Regional Marketing',
        approver: 'Head of Strategy',
        approvalStatus: 'Menunggu Review'
      }
    };
    setSelectedDrawerData(data);
  };

  return (
    <div className="space-y-6">
      {/* 1. Shared Strategy Switcher & Global Header Actions */}
      <StrategySwitcher
        currentStrategy="DEFEND"
        onNavigateToScreen={onNavigateToScreen}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onOpenAgentModal={onOpenAgentModal}
        onSaveAnalysis={() => onShowToast('Snapshot analisis DEFEND telah berhasil disimpan ke sesi kerja.')}
        onExportReport={() => onShowToast('Laporan Pertahanan Pasar (PDF & XLS) sedang diunduh...')}
        userRole={currentUserRole}
        isExportPermitted={isExportPermitted}
      />

      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE3EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C73E3A]" />
            <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
              DEFEND — Pertahanan Pasar
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 uppercase tracking-wider">
              PILAR PERTAHANAN
            </span>
          </div>
          <p className="text-xs text-[#607080]">
            Lindungi wilayah bernilai tinggi yang menghadapi peningkatan tekanan kompetitor dan celah layanan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMethodModalOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-[#DDE3EA] bg-white hover:bg-slate-50 text-[#17212B] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Lihat Dasar Analisis</span>
          </button>

          <button
            onClick={() => onNavigateToScreen('kandidat-lokasi')}
            className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Analisis Kandidat Lokasi</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards Row (6 Compact Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1 */}
        <KpiCard
          title="Area Tekanan Tinggi"
          value="12 Area"
          change="5 Kritis"
          changeType="warning"
          subtitle="Skor DEFEND > 70"
          sparklineData={[9, 10, 11, 11, 12]}
        />
        {/* KPI 2 */}
        <KpiCard
          title="Pelanggan Terekspos"
          value={GLOBAL_METRICS.defenseExposedCustomers}
          change="+6,2% vs lalu"
          changeType="warning"
          subtitle="Dalam catchment kompetitor"
          sparklineData={[168000, 172000, 178000, 182000, 186400]}
        />
        {/* KPI 3 */}
        <KpiCard
          title="High-Value Terekspos"
          value={GLOBAL_METRICS.defenseHighValueExposed}
          change="Nilai: Rp21,4M"
          changeType="warning"
          subtitle="Tier Platinum & Gold"
          sparklineData={[42000, 43500, 45000, 46800, 47900]}
        />
        {/* KPI 4 */}
        <KpiCard
          title="Celah Cakupan Prioritas"
          value="8 Area"
          change="Gap Akses >6 km"
          changeType="warning"
          subtitle="Titik layanan terbatas"
          sparklineData={[11, 10, 9, 8, 8]}
        />
        {/* KPI 5 */}
        <KpiCard
          title="Aktivitas Defense Aktif"
          value="9 Aksi"
          change="6 Aktif · 3 Review"
          changeType="positive"
          subtitle="Bundling & Service Point"
          sparklineData={[5, 6, 7, 8, 9]}
        />
        {/* KPI 6 - Measured Outcome */}
        <KpiCard
          title="Defense Outcome"
          value="4 Area"
          change="Stabil Terukur"
          changeType="positive"
          subtitle="Pangsa pasar dipertahankan"
          sparklineData={[1, 2, 3, 3, 4]}
        />
      </div>

      {/* 3. Main Analytical Layout (12-Column Grid) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Market Defense Map (8 columns) */}
        <div className="xl:col-span-8 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#17212B]">
                  Peta Tekanan Kompetitor vs. Nilai Portofolio (Jawa Tengah)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                  Overlay 38 Titik Kompetitor
                </span>
              </div>
              <p className="text-[11px] text-[#607080]">
                Intensitas warna menunjukkan nilai pelanggan; garis batas merah &amp; simbol segitiga menandakan ekspansi kompetitor agresif.
              </p>
            </div>

            {/* View Mode Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              {(['Tekanan Kompetitor', 'Nilai Terekspos', 'Celah Akses', 'Overlapping'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-2 py-1 text-[10.5px] font-semibold rounded transition-colors ${
                    viewMode === mode
                      ? 'bg-white text-[#17212B] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Jawa Tengah SVG Map with Competitor Markers */}
          <JawaTengahMap
            activeStrategyFilter="DEFEND"
            selectedAreaId={selectedArea}
            onSelectArea={(name) => {
              setSelectedArea(name);
              handleOpenDetailDrawer(name);
            }}
          />

          {/* Map Tooltip & Context Bar */}
          <div className="mt-3 pt-3 border-t border-[#DDE3EA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#607080]">
            <div className="flex items-center gap-3">
              <span>Mode Layer: <strong className="text-[#17212B]">{viewMode}</strong></span>
              <span>·</span>
              <span>Prioritas Terpilih: <strong className="text-red-700">{selectedArea}</strong> (Skor 91)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-700 font-semibold">Tingkat Keyakinan Spasial: 94%</span>
              <button
                onClick={() => handleOpenDetailDrawer(selectedArea)}
                className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Buka Detail Drawer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Defense Priority List (4 columns) */}
        <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between shadow-2xs space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#DDE3EA]">
              <div>
                <span className="text-[10px] font-bold text-[#C73E3A] uppercase tracking-wider">
                  DAFTAR AREA PRIORITAS DEFEND
                </span>
                <h3 className="font-bold text-sm text-[#17212B]">
                  Peringkat Tekanan Pasar
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Top 4 Area
              </span>
            </div>

            {/* Priority Cards */}
            <div className="space-y-2.5 mt-3">
              {[
                {
                  name: 'Semarang Timur',
                  score: 91,
                  level: 'Kritis',
                  levelColor: 'bg-red-100 text-red-800 border-red-200',
                  exposed: '42.600 nasabah',
                  highValue: '12.400 High-Value',
                  compTrend: '+14% ekspansi kompetitor',
                  coverage: 'Celah akses 18,6%',
                  status: 'Business Review'
                },
                {
                  name: 'Kudus Selatan',
                  score: 79,
                  level: 'Tinggi',
                  levelColor: 'bg-amber-100 text-amber-800 border-amber-200',
                  exposed: '24.800 nasabah',
                  highValue: '8.200 High-Value',
                  compTrend: '2 outlet pesaing baru',
                  coverage: 'Celah akses 12,4%',
                  status: 'Menunggu Persetujuan'
                },
                {
                  name: 'Demak Barat',
                  score: 72,
                  level: 'Tinggi',
                  levelColor: 'bg-amber-100 text-amber-800 border-amber-200',
                  exposed: '19.400 nasabah',
                  highValue: '5.100 High-Value',
                  compTrend: 'Promo diskon komuter agresif',
                  coverage: 'Celah akses 10,2%',
                  status: 'Draft'
                },
                {
                  name: 'Jepara Kota',
                  score: 68,
                  level: 'Sedang',
                  levelColor: 'bg-blue-100 text-blue-800 border-blue-200',
                  exposed: '14.200 nasabah',
                  highValue: '3.800 High-Value',
                  compTrend: 'Pesaing sentra ukir',
                  coverage: 'Celah akses 8,5%',
                  status: 'Dalam Pelaksanaan'
                }
              ].map((item, idx) => {
                const isSelected = selectedArea === item.name;
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      setSelectedArea(item.name);
                      handleOpenDetailDrawer(item.name);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-red-400 bg-red-50/50 shadow-xs ring-1 ring-red-300'
                        : 'border-[#DDE3EA] bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-xs text-[#17212B]">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-xs text-[#C73E3A]">
                          Skor {item.score}
                        </span>
                        <span className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded border ${item.levelColor}`}>
                          {item.level}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] mb-2 bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-[#607080]">Terekspos:</span>{' '}
                        <strong className="text-[#17212B]">{item.exposed}</strong>
                      </div>
                      <div>
                        <span className="text-[#607080]">High-Value:</span>{' '}
                        <strong className="text-red-700">{item.highValue}</strong>
                      </div>
                    </div>

                    <div className="text-[10px] text-[#607080] space-y-0.5 mb-2">
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500" />
                        <span>{item.compTrend}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-amber-500" />
                        <span>{item.coverage}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[10px]">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        Status: {item.status}
                      </span>
                      <button className="text-[#2563EB] hover:underline font-bold flex items-center gap-0.5">
                        <span>Lihat detail</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-[#607080] flex items-center justify-between">
            <span>Metode: <strong>Voronoi &amp; Spatial Kernel</strong></span>
            <button
              onClick={() => onNavigateToScreen('kandidat-lokasi')}
              className="text-[#2563EB] font-bold hover:underline"
            >
              Evaluasi Lokasi Defend →
            </button>
          </div>
        </div>
      </div>

      {/* 4. Selected-Area Detail Section: Semarang Timur Deep Dive */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#DDE3EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#C73E3A] uppercase tracking-wider">
                STUDI KASUS PRIORITAS PERTAHANAN PASAR
              </span>
              <span className="text-xs text-[#607080]">· Kota Semarang</span>
            </div>
            <h2 className="text-base font-bold text-[#17212B] mt-0.5">
              {currentAreaDetail.name} (Defense Strategic Score 91)
            </h2>
          </div>

          {/* Metric Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">Customer Value Index:</span>{' '}
              <strong className="text-blue-700 font-mono">89 / 100</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">Competition Pressure:</span>{' '}
              <strong className="text-red-700 font-mono">86 / 100</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">Accessibility Score:</span>{' '}
              <strong className="text-amber-700 font-mono">58 / 100 (Rendah)</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">Coverage Gap:</span>{' '}
              <strong className="text-red-700 font-semibold">18,6%</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              Keyakinan: 94% (Tinggi)
            </div>
          </div>
        </div>

        {/* Plain Language Strategic Statement Callout */}
        <div className="my-4 p-3.5 rounded-xl bg-red-50/70 border border-red-200 text-xs">
          <div className="flex items-center gap-2 font-bold text-red-900 mb-1">
            <Shield className="w-4 h-4 text-red-700" />
            <span>Rasional Keputusan Utama:</span>
          </div>
          <p className="text-slate-800 font-medium leading-relaxed">
            “Semarang Timur menjadi prioritas DEFEND karena memiliki basis pelanggan bernilai tinggi, tetapi tekanan kompetitor meningkat dan sebagian area belum terlayani secara optimal.”
          </p>
        </div>

        {/* Detail Grid: Top Drivers + Defense Priority Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold text-[#17212B]">
              4 Alasan Utama Semarang Timur Memerlukan Intervensi DEFEND:
            </span>
            <div className="space-y-2.5">
              {[
                { title: '1. Konsentrasi & Nilai Pelanggan Sangat Tinggi', desc: 'Menyumbang Rp9,4 miliar peluang nilai. Basis 42.600 nasabah (12.400 High Value) merupakan kontributor profit utama kawasan Semarang.' },
                { title: '2. Peningkatan Agresif Proksimitas Kompetitor', desc: '2 kompetitor membuka outlet baru dalam radius 3 km dari pusat bisnis Semarang Timur pada 90 hari terakhir dengan promo switching insentif.' },
                { title: '3. Celah Aksesibilitas Layanan di Bawah Benchmark', desc: 'Outlet eksisting terdekat berada di Pandanaran (jarak 7,8 km, waktu tempuh padat mencapai 28 menit), jauh melampaui standar kenyamanan 15 menit.' },
                { title: '4. Kantong Pemukiman Mengalami Penurunan Engagement', desc: 'Terjadi penurunan frekuensi transaksi sebesar -11% pada kluster perumahan suburban Semarang Timur dalam 60 hari terakhir.' }
              ].map((r, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-[#DDE3EA] bg-white text-xs">
                  <div className="font-bold text-[#C73E3A]">{r.title}</div>
                  <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Defense Priority Matrix (Quadrant) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl border border-[#DDE3EA] bg-[#F5F7FA]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#17212B]">Matriks Prioritas Pertahanan (Quadrant)</span>
                <span className="text-[10px] text-[#607080]">Bubble = Nasabah Terpapar</span>
              </div>

              <div className="grid grid-cols-2 grid-rows-2 gap-2 h-48 bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] relative">
                {/* Top-Left: Low Pressure, High Value -> STRENGTHEN */}
                <div className="border border-slate-200 rounded p-2 bg-slate-50 flex flex-col justify-between">
                  <span className="font-bold text-slate-700">STRENGTHEN</span>
                  <div className="text-[10px] text-slate-500">Nilai Tinggi, Tekanan Rendah</div>
                  <span className="text-xs font-bold text-slate-700">58.200 nasabah</span>
                </div>

                {/* Top-Right: High Pressure, High Value -> PROTECT NOW (Highlighted) */}
                <div className="border-2 border-red-500 rounded p-2 bg-red-50/80 flex flex-col justify-between ring-2 ring-red-300/40">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-red-800">PROTECT NOW</span>
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  </div>
                  <div className="text-[10px] text-red-700 font-semibold">Semarang Timur (Skor 91)</div>
                  <span className="text-sm font-black text-red-800">42.600 nasabah terpapar</span>
                </div>

                {/* Bottom-Left: Low Pressure, Low Value -> Low Priority */}
                <div className="border border-slate-200 rounded p-2 bg-slate-50 flex flex-col justify-between">
                  <span className="font-bold text-slate-500">LOW PRIORITY</span>
                  <span className="text-xs font-medium text-slate-600">312.000 nasabah</span>
                </div>

                {/* Bottom-Right: High Pressure, Low Value -> MONITOR */}
                <div className="border border-amber-200 rounded p-2 bg-amber-50/70 flex flex-col justify-between">
                  <span className="font-bold text-amber-800">MONITOR</span>
                  <span className="text-xs font-bold text-amber-800">85.600 nasabah</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-[10px] text-[#607080] flex justify-between">
              <span>← Tekanan Kompetitor Rendah</span>
              <span>Tekanan Kompetitor Tinggi →</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Competition Signals (6-Month Indexed Trend with Source & Observation Date) */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm text-[#17212B]">
              Sinyal Dinamika Kompetisi &amp; Aktivitas Layanan (6 Bulan)
            </h3>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#607080]">
              <span>Sumber Data: <strong>Survei Riset Lapangan Q3-2026 &amp; Pemetaan Geospasial</strong></span>
              <span>·</span>
              <span>Tanggal Observasi: <strong>15 September 2026</strong></span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold">Tingkat Keyakinan: 88%</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-red-600 rounded-full" />
              <span className="text-[#607080]">Ekspansi Kompetitor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-blue-600 rounded-full" />
              <span className="text-[#607080]">Keterlibatan Nasabah</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-amber-500 rounded-full" />
              <span className="text-[#607080]">Aktivitas Layanan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-emerald-600 rounded-full" />
              <span className="text-[#607080]">Cakupan Perusahaan</span>
            </div>
          </div>
        </div>

        {/* 6 Month Stepper Grid */}
        <div className="grid grid-cols-6 gap-3 text-xs">
          {[
            { month: 'Apr 2026', comp: '64 idx', eng: '88 idx', act: '82 idx', cov: '89%' },
            { month: 'Mei 2026', comp: '67 idx', eng: '86 idx', act: '81 idx', cov: '89%' },
            { month: 'Jun 2026', comp: '72 idx', eng: '84 idx', act: '80 idx', cov: '89%' },
            { month: 'Jul 2026', comp: '79 idx', eng: '80 idx', act: '78 idx', cov: '89%' },
            { month: 'Agu 2026', comp: '83 idx', eng: '77 idx', act: '76 idx', cov: '89%' },
            { month: 'Sep 2026', comp: '86 idx', eng: '74 idx', act: '75 idx', cov: '89%', isAlert: true }
          ].map((item) => (
            <div
              key={item.month}
              className={`p-3 rounded-xl border flex flex-col justify-between ${
                item.isAlert
                  ? 'border-red-400 bg-red-50/40 ring-1 ring-red-300'
                  : 'border-[#DDE3EA] bg-white'
              }`}
            >
              <div className="font-bold text-[#17212B] text-center mb-2">{item.month}</div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#607080]">Kompetitor:</span>
                  <span className="font-mono font-bold text-red-600">{item.comp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607080]">Engagement:</span>
                  <span className="font-mono font-bold text-blue-700">{item.eng}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607080]">Aktivitas:</span>
                  <span className="font-mono font-bold text-amber-700">{item.act}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607080]">Cakupan:</span>
                  <span className="font-mono font-bold text-emerald-700">{item.cov}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Coverage & Accessibility Panel (Travel-time Catchment vs Straight-line) */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DDE3EA]">
          <div>
            <h3 className="font-bold text-sm text-[#17212B]">
              Analisis Cakupan &amp; Aksesibilitas Spasial: Semarang Timur
            </h3>
            <p className="text-xs text-[#607080]">
              Membedakan radius waktu tempuh nyata (isochrone 15 menit) vs. jarak garis lurus teoritis.
            </p>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-100 text-[#17212B] text-xs font-semibold">
            Metodologi: 15-Minute Isochrone (OSRM Network Model)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl border border-[#DDE3EA] bg-[#F5F7FA] space-y-1">
            <div className="text-[11px] text-[#607080] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Titik Layanan Eksisting</span>
            </div>
            <div className="text-base font-bold text-[#17212B]">1 Outlet (Pandanaran)</div>
            <div className="text-[11px] text-slate-500">Jarak tempuh rata-rata: 7,8 km (28 menit)</div>
          </div>

          <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/50 space-y-1">
            <div className="text-[11px] text-red-800 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-red-600" />
              <span>Underserved Customer Pockets</span>
            </div>
            <div className="text-base font-bold text-red-700">18.600 Nasabah</div>
            <div className="text-[11px] text-red-800/80">Di luar jangkauan 15 menit ke outlet</div>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
            <div className="text-[11px] text-amber-800 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Utilisasi Kapasitas Cabang</span>
            </div>
            <div className="text-base font-bold text-amber-800">92% (Overcrowded)</div>
            <div className="text-[11px] text-amber-800/80">Waktu tunggu antrean rata-rata 34 menit</div>
          </div>

          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1">
            <div className="text-[11px] text-blue-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Overlapping Titik Layanan</span>
            </div>
            <div className="text-base font-bold text-blue-800">14,2% Overlap</div>
            <div className="text-[11px] text-blue-800/80">Kandidalisasi rendah jika buka titik baru</div>
          </div>
        </div>
      </div>

      {/* 7. Recommended Defense Actions & 8. Defense Execution Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recommended Defense Actions (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
              <div>
                <span className="text-[10px] font-bold text-[#C73E3A] uppercase tracking-wider">
                  PAKET TINDAKAN PERTAHANAN TERKOORDINASI
                </span>
                <h3 className="font-bold text-sm text-[#17212B]">
                  Defense Plan: Semarang Timur
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-900 border border-red-200">
                Prioritas Kritis
              </span>
            </div>

            {/* 3 Coordinated Action Types */}
            <div className="space-y-3 mt-4 text-xs">
              {/* Primary Action */}
              <div className="p-3.5 rounded-xl border-2 border-red-400 bg-red-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-red-900 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-red-700" />
                    <span>Perkuat Engagement Pelanggan High-Value &amp; Evaluasi Titik Satelit</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-200 text-red-900 uppercase">
                    UTAMA
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Lakukan intervensi loyalitas khusus untuk <strong>12.400 nasabah High-Value terpapar</strong> serta ajukan evaluasi studi kelayakan pembukaan <em>satellite service point</em> di lokasi Kandidat A Semarang Timur.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-red-200/60">
                  <div>PIC: <strong>Marketing + Network Development</strong></div>
                  <div>Horizon Review: <strong>30 Hari</strong></div>
                  <div>Status Persetujuan: <strong className="text-amber-700">Menunggu Review</strong></div>
                  <div>Dampak Diharapkan: <strong className="text-emerald-700">Pangsa pasar stabil &gt;80%</strong></div>
                </div>
              </div>

              {/* Action 2: Customer Action */}
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-white flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#17212B]">1. Customer Action: VIP Retensi &amp; Service Guarantee</div>
                  <p className="text-[11px] text-slate-600">
                    Jaminan kompensasi SLA layanan &lt;24 jam dan cashback transaksi untuk nasabah Platinum Semarang Timur.
                  </p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-slate-100 font-semibold text-slate-700 shrink-0 ml-2">
                  Marketing
                </span>
              </div>

              {/* Action 3: Network Action */}
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-white flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#17212B]">2. Network Action: Simulasi Titik Layanan Baru (Kandidat A)</div>
                  <p className="text-[11px] text-slate-600">
                    Menyerap 24.800 nasabah potensial dengan waktu tempuh berkurang menjadi 12 menit.
                  </p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-slate-100 font-semibold text-slate-700 shrink-0 ml-2">
                  Network Dev
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#DDE3EA] flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => setIsMethodModalOpen(true)}
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              Lihat Explainability Lengkap
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onShowToast('Defense Plan Semarang Timur telah disimpan ke antrean koordinasi tim.')}
                className="px-3.5 py-2 border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold"
              >
                Siapkan Defense Plan
              </button>
              <button
                onClick={() => onNavigateToScreen('kandidat-lokasi')}
                className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Analisis Kandidat Lokasi A</span>
              </button>
            </div>
          </div>
        </div>

        {/* Defense Execution Workflow & Status (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
              <div>
                <span className="text-[10px] font-bold text-[#607080] uppercase tracking-wider">
                  ALUR TATA KELOLA EKSEKUSI
                </span>
                <h3 className="font-bold text-sm text-[#17212B]">
                  Status Siklus Defense: Semarang Timur
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Tahap 2: Business Review
              </span>
            </div>

            {/* Horizontal Workflow Stepper */}
            <div className="space-y-2 mt-4 text-xs">
              {[
                { stage: '1. Recommendation', status: 'Selesai (22 Sep)', desc: 'Rekomendasi di-generate sistem AI berbasis skor 91.', isPassed: true },
                { stage: '2. Business Review', status: 'Sedang Berjalan', desc: 'Rapat koordinasi Marketing & Network Development.', isCurrent: true },
                { stage: '3. Approved', status: 'Menunggu', desc: 'Persetujuan Direksi / Head of Strategy.', isPending: true },
                { stage: '4. In Execution', status: 'Menunggu', desc: 'Peluncuran paket promosi & penyiapan sewa lokasi.', isPending: true },
                { stage: '5. Outcome Review', status: 'Menunggu', desc: 'Evaluasi stabilisasi pangsa pasar pasca 60 hari.', isPending: true }
              ].map((s, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    s.isCurrent
                      ? 'border-amber-400 bg-amber-50/70 ring-1 ring-amber-300'
                      : s.isPassed
                      ? 'border-emerald-200 bg-emerald-50/50'
                      : 'border-slate-100 bg-slate-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full font-bold text-[10px] flex items-center justify-center ${
                        s.isCurrent
                          ? 'bg-amber-600 text-white'
                          : s.isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      {s.isPassed ? '✓' : idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-[#17212B]">{s.stage}</div>
                      <div className="text-[10px] text-slate-500">{s.desc}</div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      s.isCurrent
                        ? 'bg-amber-200 text-amber-900'
                        : s.isPassed
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-[#DDE3EA] flex items-center justify-between text-xs">
            <div>
              <div className="text-[11px] text-[#607080]">Penyetujui Wajib:</div>
              <div className="font-bold text-[#17212B]">Head of Regional Strategy &amp; Network Dev</div>
            </div>
            <button
              onClick={() => {
                setSelectedDrawerData(currentAreaDetail);
                setIsApprovalModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-semibold text-xs hover:bg-blue-700 shadow-2xs"
            >
              Buka Form Review
            </button>
          </div>
        </div>
      </div>

      {/* Shared Area Detail Drawer */}
      <SharedAreaDrawer
        isOpen={Boolean(selectedDrawerData)}
        onClose={() => setSelectedDrawerData(null)}
        data={selectedDrawerData}
        onNavigateToScreen={onNavigateToScreen}
        onOpenAgentModal={onOpenAgentModal}
        onOpenApprovalModal={(data) => {
          setSelectedDrawerData(data);
          setIsApprovalModalOpen(true);
        }}
        onOpenExplainability={() => onNavigateToScreen('explainability')}
      />

      {/* Cross-Strategy Modal */}
      <CrossStrategyModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        defaultArea={selectedArea}
        onNavigateToScreen={onNavigateToScreen}
      />

      {/* Method Transparency Modal */}
      <MethodTransparencyModal
        isOpen={isMethodModalOpen}
        onClose={() => setIsMethodModalOpen(false)}
        strategyName="DEFEND — Pertahanan Pasar"
      />

      {/* Approval Governance Modal */}
      <ApprovalWorkflowModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        data={selectedDrawerData || currentAreaDetail}
        currentUserRole={currentUserRole}
        onStatusChange={(status) => {
          onShowToast(`Status pertahanan Semarang Timur diperbarui menjadi: ${status}`);
        }}
      />
    </div>
  );
};
