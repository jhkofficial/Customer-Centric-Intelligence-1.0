import React, { useState } from 'react';
import {
  Target,
  Users,
  Compass,
  Building2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Store,
  Bus,
  Layers,
  Award,
  BarChart3,
  Calendar,
  AlertTriangle
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

interface AcquisitionScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onOpenAgentModal: (prompt?: string) => void;
  onShowToast: (msg: string) => void;
  currentUserRole?: UserRole;
}

export const AcquisitionScreen: React.FC<AcquisitionScreenProps> = ({
  onNavigateToScreen,
  onOpenAgentModal,
  onShowToast,
  currentUserRole = 'Administrator'
}) => {
  const [selectedArea, setSelectedArea] = useState('Purwokerto Utara');
  const [viewMode, setViewMode] = useState<'Potensi Pasar' | 'Penetrasi' | 'White Space' | 'Aksesibilitas'>('Potensi Pasar');

  // Modals & Drawers
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedDrawerData, setSelectedDrawerData] = useState<AreaDetailData | null>(null);

  const isExportPermitted = currentUserRole === 'Administrator' || currentUserRole === 'Security / Data Governance' || currentUserRole === 'Business / Marketing';

  // Area Profiles for ACQUIRE
  const acquireProfiles: Record<string, AreaDetailData> = {
    'Purwokerto Utara': {
      name: 'Purwokerto Utara',
      kabupaten: 'Banyumas',
      strategy: 'ACQUIRE',
      strategicScore: 83,
      priorityLevel: 'Tinggi',
      totalCustomers: 86500,
      activeRate: 81.5,
      outlets: 5,
      opportunityValue: 'Rp7,2 miliar',
      confidence: 89,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '96,4%',
      topDrivers: [
        { factor: 'Pertumbuhan demografi usia produktif kuat (68,4% dari 1,78 juta jiwa)', contribution: '+26 kontribusi', impact: 'positive' },
        { factor: 'Tingkat penetrasi saat ini masih rendah (18,4% vs acuan regional 28%)', contribution: '+24 kontribusi', impact: 'positive' },
        { factor: 'Aksesibilitas jalan arteri dan konektivitas antarmoda baik', contribution: '+18 kontribusi', impact: 'positive' },
        { factor: 'Konsentrasi 52 POI pendidikan tinggi & kampus (UNSOED, dll)', contribution: '+15 kontribusi', impact: 'positive' },
        { factor: 'Kepadatan kompetitor masih terfragmentasi dan moderat', contribution: '+12 kontribusi', impact: 'positive' }
      ],
      recommendedAction: {
        title: 'Omnichannel Activation & Mobile Activation Booth Kampus',
        description: 'Luncurkan campaign digital bertarget segmen mahasiswa dan wirausaha muda serta aktivasi booth layanan di koridor kampus utama.',
        targetAudience: '18.600 calon nasabah terverifikasi',
        preferredChannels: 'Digital Ads, Kemitraan Kampus & Mobile Booth',
        timing: 'Aktivasi Q4-2026',
        owner: 'Acquisition & Growth Marketing',
        approver: 'Head of Growth Marketing',
        approvalStatus: 'Draft'
      }
    },
    'Tegal Selatan': {
      name: 'Tegal Selatan',
      kabupaten: 'Kota Tegal',
      strategy: 'ACQUIRE',
      strategicScore: 74,
      priorityLevel: 'Tinggi',
      totalCustomers: 58900,
      activeRate: 80.2,
      outlets: 4,
      opportunityValue: 'Rp4,5 miliar',
      confidence: 87,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '95,1%',
      topDrivers: [
        { factor: 'Koridor ekonomi niaga Pantura Barat berkembang dinamis', contribution: '+22 kontribusi', impact: 'positive' },
        { factor: 'Penetrasi masih rendah (21,2%) di kantong perumahan baru', contribution: '+19 kontribusi', impact: 'positive' },
        { factor: 'Tingkat pengeluaran rumah tangga di atas rata-rata', contribution: '+14 kontribusi', impact: 'positive' }
      ],
      recommendedAction: {
        title: 'Kampanye Digital Geotargeting Sentra Niaga Pantura',
        description: 'Promosi geotargeting di pusat perdagangan dan insentif cashback merchant.',
        targetAudience: '14.200 pelaku usaha & warga niaga',
        preferredChannels: 'Social Ads Geotargeted & SMS Merchant',
        timing: 'Aktivasi Oktober 2026',
        owner: 'Regional Marketing Tegal',
        approver: 'Branch Manager Tegal',
        approvalStatus: 'Menunggu Review'
      }
    },
    'Cilacap Utara': {
      name: 'Cilacap Utara',
      kabupaten: 'Cilacap',
      strategy: 'ACQUIRE',
      strategicScore: 71,
      priorityLevel: 'Tinggi',
      totalCustomers: 67300,
      activeRate: 78.9,
      outlets: 4,
      opportunityValue: 'Rp4,3 miliar',
      confidence: 84,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '94,2%',
      topDrivers: [
        { factor: 'Ekspansi kawasan industri pelabuhan & kilang', contribution: '+20 kontribusi', impact: 'positive' },
        { factor: 'Penetrasi layanan baru 16,8% (white space lebar)', contribution: '+18 kontribusi', impact: 'positive' }
      ],
      recommendedAction: {
        title: 'Booth kemitraan perusahaan & Payroll Kawasan Industri',
        description: 'Kerjasama onboarding karyawan perusahaan dengan penawaran paket payroll.',
        targetAudience: '11.800 pekerja industri',
        preferredChannels: 'kemitraan perusahaan & On-site Booth',
        timing: 'November 2026',
        owner: 'Corporate Acquisition Team',
        approver: 'Head of Commercial',
        approvalStatus: 'Menunggu Persetujuan'
      }
    },
    'Sukoharjo Timur': {
      name: 'Sukoharjo Timur',
      kabupaten: 'Sukoharjo',
      strategy: 'ACQUIRE',
      strategicScore: 67,
      priorityLevel: 'Sedang',
      totalCustomers: 46200,
      activeRate: 79.5,
      outlets: 2,
      opportunityValue: 'Rp3,5 miliar',
      confidence: 86,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '94,8%',
      topDrivers: [
        { factor: 'Pertumbuhan residensial baru penyangga Solo Baru (+6,2% YoY)', contribution: '+17 kontribusi', impact: 'positive' },
        { factor: 'Daya beli kelas menengah stabil', contribution: '+13 kontribusi', impact: 'positive' }
      ],
      recommendedAction: {
        title: 'Kemitraan Pengembang Perumahan Baru Solo Baru',
        description: 'Bundling layanan internet & perbankan digital untuk penghuni kluster residensial baru.',
        targetAudience: '9.400 keluarga muda',
        preferredChannels: 'Kemitraan Developer & In-App Invite',
        timing: 'Desember 2026',
        owner: 'Retail Partnership Solo',
        approver: 'Branch Manager Solo',
        approvalStatus: 'Dalam Pelaksanaan'
      }
    }
  };

  const currentAreaDetail = acquireProfiles[selectedArea] || acquireProfiles['Purwokerto Utara'];

  const handleOpenDetailDrawer = (areaName: string) => {
    const data = acquireProfiles[areaName] || {
      name: areaName,
      kabupaten: 'Jawa Tengah',
      strategy: 'ACQUIRE',
      strategicScore: 72,
      priorityLevel: 'Tinggi',
      totalCustomers: 60000,
      activeRate: 79.0,
      outlets: 4,
      opportunityValue: 'Rp4,0 miliar',
      confidence: 86,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '95,0%',
      topDrivers: [
        { factor: 'Potensi demografi usia produktif tinggi', contribution: '+20 kontribusi', impact: 'positive' },
        { factor: 'Penetrasi saat ini di bawah standar regional', contribution: '+16 kontribusi', impact: 'positive' }
      ],
      recommendedAction: {
        title: `Program Akuisisi Pelanggan ${areaName}`,
        description: 'Kampanye pertumbuhan pelanggan baru bertarget.',
        targetAudience: '8.500 calon nasabah',
        preferredChannels: 'Digital & Event',
        timing: 'Q4-2026',
        owner: 'Growth Team',
        approver: 'Head of Growth',
        approvalStatus: 'Draft'
      }
    };
    setSelectedDrawerData(data);
  };

  return (
    <div className="space-y-6">
      {/* 1. Shared Strategy Switcher & Global Header Actions */}
      <StrategySwitcher
        currentStrategy="ACQUIRE"
        onNavigateToScreen={onNavigateToScreen}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onOpenAgentModal={onOpenAgentModal}
        onSaveAnalysis={() => onShowToast('Snapshot analisis ACQUIRE telah berhasil disimpan ke sesi kerja.')}
        onExportReport={() => onShowToast('Laporan Akuisisi Pelanggan Baru (PDF & XLS) sedang diunduh...')}
        userRole={currentUserRole}
        isExportPermitted={isExportPermitted}
      />

      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE3EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F7C7B]" />
            <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
              ACQUIRE — Akuisisi Pelanggan Baru
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 uppercase tracking-wider">
              PILAR PERTUMBUHAN
            </span>
          </div>
          <p className="text-xs text-[#607080]">
            Temukan kantong pertumbuhan bernilai tinggi dan optimalkan jangkauan pelanggan baru.
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
            onClick={() => onNavigateToScreen('campaign-omnichannel')}
            className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Siapkan Campaign Akuisisi</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards Row (6 Compact Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1: Estimated Potential (Not actual) */}
        <KpiCard
          title="Potensi Pelanggan Baru"
          value={GLOBAL_METRICS.potentialNewCustomers}
          change="Estimasi Potensi"
          changeType="positive"
          subtitle="Bukan angka aktual"
          sparklineData={[210000, 218000, 225000, 232000, 238700]}
        />
        {/* KPI 2 */}
        <KpiCard
          title="Area Peluang Tinggi"
          value="14 Area"
          change="5 Siap Aktivasi"
          changeType="positive"
          subtitle="Skor ACQUIRE > 70"
          sparklineData={[10, 11, 12, 13, 14]}
        />
        {/* KPI 3 */}
        <KpiCard
          title="Penetrasi Rata-Rata"
          value="21,8%"
          change="-6,4% vs acuan"
          changeType="warning"
          subtitle="Target regional: 28,2%"
          sparklineData={[19.8, 20.2, 20.9, 21.4, 21.8]}
        />
        {/* KPI 4 */}
        <KpiCard
          title="Peluang Dapat Diakses"
          value="72,6%"
          change="Akses Jaringan Baik"
          changeType="positive"
          subtitle="Dalam catchment outlet"
          sparklineData={[65.2, 67.4, 69.8, 71.0, 72.6]}
        />
        {/* KPI 5 */}
        <KpiCard
          title="Estimasi Nilai Peluang"
          value="Rp24,2 miliar"
          change="Nilai Portofolio"
          changeType="positive"
          subtitle="Proyeksi tahunan"
          sparklineData={[19.5, 20.8, 22.1, 23.4, 24.2]}
        />
        {/* KPI 6 */}
        <KpiCard
          title="Campaign Akuisisi Aktif"
          value="7 Campaign"
          change="3 Rencana · 4 Aktif"
          changeType="positive"
          subtitle="Geotargeted Omnichannel"
          sparklineData={[3, 4, 5, 6, 7]}
        />
      </div>

      {/* 3. Main Analytical Layout (12-Column Grid) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Acquisition Opportunity Map (8 columns) */}
        <div className="xl:col-span-8 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#17212B]">
                  Peta Peluang Akuisisi &amp; White Space Pasar (Jawa Tengah)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                  Potensi Spasial Terverifikasi
                </span>
              </div>
              <p className="text-[11px] text-[#607080]">
                Gradasi warna teal menandakan konsentrasi calon pelanggan baru; area bergaris putus-putus menunjukkan white space dengan penetrasi &lt;20%.
              </p>
            </div>

            {/* View Mode Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              {(['Potensi Pasar', 'Penetrasi', 'White Space', 'Aksesibilitas'] as const).map((mode) => (
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

          {/* Interactive Jawa Tengah SVG Map */}
          <JawaTengahMap
            activeStrategyFilter="ACQUIRE"
            selectedAreaId={selectedArea}
            onSelectArea={(name) => {
              setSelectedArea(name);
              handleOpenDetailDrawer(name);
            }}
          />

          {/* Map Footer Context */}
          <div className="mt-3 pt-3 border-t border-[#DDE3EA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#607080]">
            <div className="flex items-center gap-3">
              <span>Mode Tampilan: <strong className="text-[#17212B]">{viewMode}</strong></span>
              <span>·</span>
              <span>Kandidat Utama: <strong className="text-teal-700">{selectedArea}</strong> (Skor 83)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-700 font-semibold">Tingkat Keyakinan: 89% (Sedang-Tinggi)</span>
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

        {/* Right: Acquisition Opportunity List (4 columns) */}
        <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between shadow-2xs space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#DDE3EA]">
              <div>
                <span className="text-[10px] font-bold text-[#0F7C7B] uppercase tracking-wider">
                  DAFTAR PELUANG AKUISISI PRIORITAS
                </span>
                <h3 className="font-bold text-sm text-[#17212B]">
                  Peringkat Potensi Wilayah
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Top 4 Area
              </span>
            </div>

            {/* Opportunity Cards */}
            <div className="space-y-2.5 mt-3">
              {[
                {
                  name: 'Purwokerto Utara',
                  score: 83,
                  level: 'Tinggi',
                  levelColor: 'bg-teal-100 text-teal-800 border-teal-200',
                  potential: '31.800 calon nasabah',
                  penetration: '18,4% (Rendah)',
                  driver: '68,4% usia produktif, 52 POI kampus',
                  action: 'Omnichannel campus & merchant activation',
                  status: 'Draft'
                },
                {
                  name: 'Tegal Selatan',
                  score: 74,
                  level: 'Tinggi',
                  levelColor: 'bg-teal-100 text-teal-800 border-teal-200',
                  potential: '26.400 calon nasabah',
                  penetration: '21,2% (Sedang)',
                  driver: 'Sentra niaga Pantura & arteri ramai',
                  action: 'Digital geotargeting niaga',
                  status: 'Menunggu Review'
                },
                {
                  name: 'Cilacap Utara',
                  score: 71,
                  level: 'Tinggi',
                  levelColor: 'bg-teal-100 text-teal-800 border-teal-200',
                  potential: '22.500 calon nasabah',
                  penetration: '16,8% (Rendah)',
                  driver: 'Pusat industri & pelabuhan pesisir',
                  action: 'Booth kemitraan perusahaan & industri',
                  status: 'Menunggu Persetujuan'
                },
                {
                  name: 'Sukoharjo Timur',
                  score: 67,
                  level: 'Sedang',
                  levelColor: 'bg-blue-100 text-blue-800 border-blue-200',
                  potential: '18.200 calon nasabah',
                  penetration: '22,5% (Sedang)',
                  driver: 'Kluster pemukiman baru Solo Baru',
                  action: 'Kemitraan developer & retail',
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
                        ? 'border-teal-400 bg-teal-50/50 shadow-xs ring-1 ring-teal-300'
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
                        <span className="font-mono font-bold text-xs text-[#0F7C7B]">
                          Skor {item.score}
                        </span>
                        <span className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded border ${item.levelColor}`}>
                          {item.level}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] mb-2 bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-[#607080]">Potensi:</span>{' '}
                        <strong className="text-teal-800">{item.potential}</strong>
                      </div>
                      <div>
                        <span className="text-[#607080]">Penetrasi:</span>{' '}
                        <strong className="text-[#17212B]">{item.penetration}</strong>
                      </div>
                    </div>

                    <div className="text-[10px] text-[#607080] space-y-0.5 mb-2">
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-teal-500" />
                        <span>{item.driver}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-blue-500" />
                        <span>Aksi: {item.action}</span>
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
            <span>Model: <strong>Demographic Isochrone Growth</strong></span>
            <button
              onClick={() => onNavigateToScreen('campaign-omnichannel')}
              className="text-[#2563EB] font-bold hover:underline"
            >
              Rancang Campaign →
            </button>
          </div>
        </div>
      </div>

      {/* 4. Selected-Area Detail Section: Purwokerto Utara Deep Dive */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#DDE3EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#0F7C7B] uppercase tracking-wider">
                ANALISIS POTENSI WILAYAH TERPILIH
              </span>
              <span className="text-xs text-[#607080]">· Kabupaten Banyumas</span>
            </div>
            <h2 className="text-base font-bold text-[#17212B] mt-0.5">
              {currentAreaDetail.name} (Acquisition Strategic Score 83)
            </h2>
          </div>

          {/* Metric Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">Market Potential:</span>{' '}
              <strong className="text-teal-700 font-mono">88 / 100</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">Current Penetration:</span>{' '}
              <strong className="text-amber-700 font-mono">18,4% (White Space)</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">Accessibility:</span>{' '}
              <strong className="text-[#17212B] font-mono">81 / 100 (Baik)</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">Potensi Nasabah:</span>{' '}
              <strong className="text-teal-700 font-semibold">31.800 calon</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              Nilai Peluang: Rp5,6 miliar
            </div>
          </div>
        </div>

        {/* Detail Grid: Top Drivers + Potential vs. Penetration Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold text-[#17212B]">
              5 Faktor Utama Mendorong Skor Pertumbuhan Purwokerto Utara:
            </span>
            <div className="space-y-2.5">
              {[
                { title: '1. Pertumbuhan Demografi Usia Produktif Kuat', desc: '68,4% dari total penduduk berada di kelompok usia 18–44 tahun, didukung kehadiran institusi pendidikan tinggi terkemuka.' },
                { title: '2. Penetrasi Eksisting Rendah (Peluang White Space)', desc: 'Penetrasi saat ini baru mencapai 18,4%, menyisakan ruang pertumbuhan 9,8% poin sebelum mencapai rata-rata Jawa Tengah.' },
                { title: '3. Aksesibilitas Jalan Arteri & Mobilitas Tinggi', desc: 'Terhubung langsung dengan koridor jalan lingkar arteri Purwokerto dengan waktu tempuh rata-rata 14 menit ke sentra aktivitas.' },
                { title: '4. Konsentrasi Titik Minat (POI) Strategis', desc: 'Terdapat 195 POI komersial dan 52 institusi pendidikan/kampus dalam radius 5 km yang merupakan pengungkit akuisisi massal.' },
                { title: '5. Kepadatan Kompetitor Masih Terkendali (Moderate)', desc: 'Hanya ada 2 outlet kompetitor utama dengan sebaran layanan yang belum mengunci kluster mahasiswa dan perumahan baru.' }
              ].map((f, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-[#DDE3EA] bg-white text-xs">
                  <div className="font-bold text-[#0F7C7B]">{f.title}</div>
                  <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Potential versus Penetration Matrix (Quadrant) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl border border-[#DDE3EA] bg-[#F5F7FA]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#17212B]">Matriks Potensi vs. Penetrasi (Quadrant)</span>
                <span className="text-[10px] text-[#607080]">Bubble = Potensi Calon Nasabah</span>
              </div>

              <div className="grid grid-cols-2 grid-rows-2 gap-2 h-48 bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] relative">
                {/* Top-Left: Low Penetration, High Potential -> ACTIVATE NOW (Highlighted) */}
                <div className="border-2 border-teal-500 rounded p-2 bg-teal-50/80 flex flex-col justify-between ring-2 ring-teal-300/40">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-teal-800">ACTIVATE NOW</span>
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
                  </div>
                  <div className="text-[10px] text-teal-700 font-semibold">Purwokerto Utara (Skor 83)</div>
                  <span className="text-sm font-black text-teal-800">31.800 calon nasabah</span>
                </div>

                {/* Top-Right: High Penetration, High Potential -> EXPAND SELECTIVELY */}
                <div className="border border-blue-200 rounded p-2 bg-blue-50/60 flex flex-col justify-between">
                  <span className="font-bold text-blue-800">EXPAND SELECTIVELY</span>
                  <div className="text-[10px] text-blue-600">Pangsa Tinggi, Potensi Ada</div>
                  <span className="text-xs font-bold text-blue-800">24.500 calon</span>
                </div>

                {/* Bottom-Left: Low Penetration, Low Potential -> MONITOR */}
                <div className="border border-slate-200 rounded p-2 bg-slate-50 flex flex-col justify-between">
                  <span className="font-bold text-slate-500">MONITOR</span>
                  <span className="text-xs font-medium text-slate-600">84.000 penduduk</span>
                </div>

                {/* Bottom-Right: High Penetration, Low Potential -> DEFEND BASE */}
                <div className="border border-amber-200 rounded p-2 bg-amber-50/70 flex flex-col justify-between">
                  <span className="font-bold text-amber-800">DEFEND EXISTING BASE</span>
                  <span className="text-xs font-bold text-amber-800">Cakupan Jenuh</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-[10px] text-[#607080] flex justify-between">
              <span>← Penetrasi Rendah (White Space)</span>
              <span>Penetrasi Tinggi (Jenuh) →</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Demographic & POI Drivers + Similar High-Performing Benchmark Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Demographic & POI Drivers (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DDE3EA]">
            <div>
              <h3 className="font-bold text-sm text-[#17212B]">
                Indikator Demografi &amp; Titik Minat (POI): Banyumas
              </h3>
              <p className="text-xs text-[#607080]">
                Sumber: BPS Jawa Tengah 2025 &amp; Geolocation Registry Q2-2026.
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
              Kualitas Data: 96,4% Baik
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
              <div className="text-[11px] text-[#607080] flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Usia Produktif (18-44)</span>
              </div>
              <div className="text-base font-bold text-[#17212B] mt-1">68,4%</div>
              <div className="text-[10px] text-emerald-700 font-semibold">+3,2% di atas rata-rata</div>
            </div>

            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
              <div className="text-[11px] text-[#607080] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Pengeluaran RT Proxy</span>
              </div>
              <div className="text-base font-bold text-[#17212B] mt-1">Rp2,65 jt/bln</div>
              <div className="text-[10px] text-slate-500">Daya beli kelas menengah</div>
            </div>

            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
              <div className="text-[11px] text-[#607080] flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pertumbuhan Residensial</span>
              </div>
              <div className="text-base font-bold text-emerald-700 mt-1">+5,8% YoY</div>
              <div className="text-[10px] text-slate-500">Pengembangan kluster baru</div>
            </div>

            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
              <div className="text-[11px] text-[#607080] flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-amber-600" />
                <span>Komersial POI</span>
              </div>
              <div className="text-base font-bold text-[#17212B] mt-1">195 Unit</div>
              <div className="text-[10px] text-slate-500">Pusat pertokoan &amp; kuliner</div>
            </div>

            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
              <div className="text-[11px] text-[#607080] flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                <span>POI Pendidikan</span>
              </div>
              <div className="text-base font-bold text-teal-700 mt-1">52 Kluster</div>
              <div className="text-[10px] text-slate-500">Kampus negeri &amp; swasta</div>
            </div>

            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA]">
              <div className="text-[11px] text-[#607080] flex items-center gap-1">
                <Bus className="w-3.5 h-3.5 text-purple-600" />
                <span>Koridor Transportasi</span>
              </div>
              <div className="text-base font-bold text-[#17212B] mt-1">8 Koridor</div>
              <div className="text-[10px] text-slate-500">Jalur arteri &amp; BRT Trans</div>
            </div>
          </div>
        </div>

        {/* Similar High-Performing Benchmark Areas (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
            <div>
              <span className="text-[10px] font-bold text-[#0F7C7B] uppercase tracking-wider">
                LOOKALIKE SPATIAL BENCHMARK
              </span>
              <h3 className="font-bold text-sm text-[#17212B]">
                3 Wilayah Serupa Berkinerja Tinggi
              </h3>
            </div>
            <Award className="w-4 h-4 text-amber-500" />
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              {
                name: 'Salatiga Kota',
                similarity: '88% Kemiripan Karakteristik',
                result: '+32% akuisisi dalam 6 bulan',
                insight: 'Karakteristik kampus dan demografi terdidik serupa memicu adopsi cepat saat aktivasi digital terkoordinasi.'
              },
              {
                name: 'Magelang Utara',
                similarity: '84% Kemiripan Karakteristik',
                result: '+26% akuisisi dalam 6 bulan',
                insight: 'Pola jalan arteri dan pusat komersial suburban serupa menghasilkan konversi merchant yang efektif.'
              },
              {
                name: 'Kudus Kota',
                similarity: '79% Kemiripan Karakteristik',
                result: '+21% akuisisi dalam 6 bulan',
                insight: 'Daya beli kelas pekerja dan partisipasi UMKM produktif memberi retensi tahunan yang tinggi.'
              }
            ].map((sim, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-[#DDE3EA] bg-slate-50 space-y-1">
                <div className="flex justify-between font-bold text-[#17212B]">
                  <span>{sim.name}</span>
                  <span className="text-emerald-700 font-mono text-[11px]">{sim.similarity}</span>
                </div>
                <div className="text-[11px] font-semibold text-[#2563EB]">Hasil Historis: {sim.result}</div>
                <p className="text-[10.5px] text-slate-600 leading-relaxed">{sim.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Recommended Acquisition Actions & 7. Acquisition Outcome Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recommended Actions (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
              <div>
                <span className="text-[10px] font-bold text-[#0F7C7B] uppercase tracking-wider">
                  RENCANA TINDAKAN AKUISISI
                </span>
                <h3 className="font-bold text-sm text-[#17212B]">
                  Aksi Pertumbuhan: Purwokerto Utara
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-900 border border-teal-200">
                Peluang Siap Aktivasi
              </span>
            </div>

            {/* 3 Coordinated Actions */}
            <div className="space-y-3 mt-4 text-xs">
              {/* Primary Action */}
              <div className="p-3.5 rounded-xl border-2 border-teal-500 bg-teal-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-teal-900 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-teal-700" />
                    <span>Aktifkan Campaign Lokal &amp; Feasibility Review Titik Satelit</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-200 text-teal-900 uppercase">
                    UTAMA
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Jangkau <strong>18.600 calon pelanggan prioritas</strong> melalui kampanye omnichannel digital terkoordinasi (ads minat kampus &amp; kuliner) serta buka temporary mobile activation booth di sentra niaga Purwokerto Utara.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-teal-200/60">
                  <div>PIC: <strong>Growth Marketing &amp; Banyumas Branch</strong></div>
                  <div>Status Persetujuan: <strong className="text-blue-700">Draft Rencana</strong></div>
                  <div>Target Jangkauan: <strong>18.600 Leads</strong></div>
                  <div>Estimasi CPA: <strong>Rp42.500 / Pelanggan Baru</strong></div>
                </div>
              </div>

              {/* Action 2 */}
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-white flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#17212B]">1. Kemitraan Strategis Merchant Kampus UNSOED</div>
                  <p className="text-[11px] text-slate-600">
                    Akuisisi 80 merchant kuliner dan penyedia jasa di sekitar kampus dengan insentif QRIS bebas biaya.
                  </p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-slate-100 font-semibold text-slate-700 shrink-0 ml-2">
                  Merchant Team
                </span>
              </div>

              {/* Action 3 */}
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-white flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#17212B]">2. Evaluasi Titik Layanan Satelit Permanen</div>
                  <p className="text-[11px] text-slate-600">
                    Simulasi penambahan service point Kandidat C Purwokerto Utara untuk melayani 16.700 nasabah.
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
              onClick={() => setIsCompareModalOpen(true)}
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              Bandingkan dengan Strategi Lain
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateToScreen('kandidat-lokasi')}
                className="px-3.5 py-2 border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold"
              >
                Analisis Kandidat Lokasi C
              </button>
              <button
                onClick={() => onNavigateToScreen('campaign-omnichannel')}
                className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Siapkan Campaign Akuisisi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Acquisition Outcome Funnel (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
              <div>
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                  HASIL &amp; PENGUKURAN OUTCOME
                </span>
                <h3 className="font-bold text-sm text-[#17212B]">
                  Corong Konversi Akuisisi Terukur
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                Observasi Historis
              </span>
            </div>

            {/* Funnel Steps */}
            <div className="space-y-2 mt-4 text-xs">
              {[
                { label: 'Leads Dijangkau (Impressions)', val: '48.200 Target', pct: '100%', color: 'bg-teal-500' },
                { label: 'Ketertarikan Terverifikasi (Clicks/Visits)', val: '14.600 Prospek', pct: '30,3%', color: 'bg-teal-600' },
                { label: 'Konversi Registrasi / Onboarding', val: '8.900 Formulir', pct: '18,5%', color: 'bg-teal-700' },
                { label: 'Pelanggan Baru Aktif Bertransaksi', val: '6.420 Nasabah Baru', pct: '13,3%', color: 'bg-emerald-600' }
              ].map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-[#17212B]">{step.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-800 font-mono text-[11px]">{step.val}</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">({step.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 space-y-1.5">
            <div className="flex justify-between font-bold">
              <span>Biaya Perolehan (CPA Aktual):</span>
              <span className="font-mono text-teal-900 font-black">Rp42.500 / Nasabah</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Pendapatan Aktual Terukur:</span>
              <span className="font-mono text-emerald-800 font-black">Rp3,8 miliar</span>
            </div>
            <div className="text-[10.5px] text-teal-900/80 pt-1 border-t border-teal-200/60 flex justify-between">
              <span>Estimasi Peluang Potensi:</span>
              <span className="font-medium">Rp5,6 miliar (Pencapaian: 67,8%)</span>
            </div>
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
        strategyName="ACQUIRE — Akuisisi Pelanggan Baru"
      />

      {/* Approval Governance Modal */}
      <ApprovalWorkflowModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        data={selectedDrawerData || currentAreaDetail}
        currentUserRole={currentUserRole}
        onStatusChange={(status) => {
          onShowToast(`Status akuisisi Purwokerto Utara diperbarui menjadi: ${status}`);
        }}
      />
    </div>
  );
};
