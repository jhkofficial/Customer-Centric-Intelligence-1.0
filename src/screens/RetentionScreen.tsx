import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Send,
  HelpCircle,
  Clock,
  Layers,
  PhoneCall,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Calendar,
  Lock,
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

interface RetentionScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onOpenAgentModal: (prompt?: string) => void;
  onShowToast: (msg: string) => void;
  currentUserRole?: UserRole;
}

export const RetentionScreen: React.FC<RetentionScreenProps> = ({
  onNavigateToScreen,
  onOpenAgentModal,
  onShowToast,
  currentUserRole = 'Administrator'
}) => {
  // Selected area for deep dive
  const [selectedArea, setSelectedArea] = useState('Surakarta Utara');

  // View modes: "Jumlah" | "Rasio Risiko" | "Nilai Pelanggan"
  const [viewMode, setViewMode] = useState<'Jumlah' | 'Rasio Risiko' | 'Nilai Pelanggan'>('Rasio Risiko');

  // Modals & Drawers
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedDrawerData, setSelectedDrawerData] = useState<AreaDetailData | null>(null);

  // Table filters
  const [tableFilterRisk, setTableFilterRisk] = useState('Semua');
  const [tableFilterChannel, setTableFilterChannel] = useState('Semua');
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');

  // Role permissions check
  const isExportPermitted = currentUserRole === 'Administrator' || currentUserRole === 'Security / Data Governance' || currentUserRole === 'Business / Marketing';
  const isCustomerTableAuthorized = currentUserRole !== 'Executive / Management';

  // Area data lookup for Surakarta Utara & others
  const areaProfiles: Record<string, AreaDetailData> = {
    'Surakarta Utara': {
      name: 'Surakarta Utara',
      kabupaten: 'Kota Surakarta',
      strategy: 'RETAIN',
      strategicScore: 87,
      priorityLevel: 'Kritis',
      totalCustomers: 118400,
      activeRate: 74.2,
      outlets: 7,
      opportunityValue: 'Rp8,1 miliar',
      confidence: 92,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '97,1%',
      topDrivers: [
        { factor: 'Frekuensi layanan menurun (-18% dalam 60 hari)', contribution: '+24 kontribusi', impact: 'negative' },
        { factor: 'Waktu sejak interaksi terakhir meningkat (>45 hari)', contribution: '+19 kontribusi', impact: 'negative' },
        { factor: 'Keluhan belum terselesaikan (SLA melampaui 72 jam)', contribution: '+14 kontribusi', impact: 'negative' },
        { factor: 'Jarak ke titik layanan terdekat rata-rata 5,8 km', contribution: '+11 kontribusi', impact: 'negative' },
        { factor: 'Tekanan penawaran promosi kompetitor lokal Solo', contribution: '+8 kontribusi', impact: 'negative' }
      ],
      recommendedAction: {
        title: 'Program Retensi Personal VIP (High Value At Risk)',
        description: 'Luncurkan intervensi proaktif via WhatsApp & personal call oleh Relationship Officer dengan paket kompensasi loyalitas.',
        targetAudience: '5.680 nasabah High Value - High Risk',
        preferredChannels: 'WhatsApp Bisnis & Telepon Personal',
        timing: 'Kamis, 10.00–12.00 WIB',
        owner: 'Marketing Retention & RO Solo',
        approver: 'Head of Customer Value Management',
        approvalStatus: 'Menunggu Persetujuan'
      }
    },
    'Magelang Tengah': {
      name: 'Magelang Tengah',
      kabupaten: 'Magelang',
      strategy: 'RETAIN',
      strategicScore: 76,
      priorityLevel: 'Tinggi',
      totalCustomers: 63100,
      activeRate: 72.9,
      outlets: 4,
      opportunityValue: 'Rp4,8 miliar',
      confidence: 86,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '95,4%',
      topDrivers: [
        { factor: 'Penurunan indeks kepuasan pasca migrasi kanal digital', contribution: '+21 kontribusi', impact: 'negative' },
        { factor: 'Pelanggan tier Gold belum bertransaksi 45 hari', contribution: '+17 kontribusi', impact: 'negative' },
        { factor: 'Keterbatasan pendampingan cabang lokal', contribution: '+12 kontribusi', impact: 'negative' }
      ],
      recommendedAction: {
        title: 'Pendampingan Personal & Edukasi Layanan Digital',
        description: 'Pemberian sesi konsultasi privat oleh petugas cabang dan voucher insentif reaktivasi transaksi.',
        targetAudience: '3.400 pelanggan tier Gold',
        preferredChannels: 'Telepon Pribadi & Undangan Cabang',
        timing: 'Rabu & Jumat, 09.00–11.00 WIB',
        owner: 'Branch Operations Magelang',
        approver: 'Branch Manager Magelang',
        approvalStatus: 'Menunggu Review'
      }
    },
    'Pekalongan Barat': {
      name: 'Pekalongan Barat',
      kabupaten: 'Kota Pekalongan',
      strategy: 'RETAIN',
      strategicScore: 73,
      priorityLevel: 'Tinggi',
      totalCustomers: 54200,
      activeRate: 75.8,
      outlets: 3,
      opportunityValue: 'Rp3,6 miliar',
      confidence: 85,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '94,8%',
      topDrivers: [
        { factor: 'Jarak ke outlet melebihi standar kenyamanan (>6,2 km)', contribution: '+18 kontribusi', impact: 'negative' },
        { factor: 'Penetrasi promosi kompetitor di sentra batik', contribution: '+15 kontribusi', impact: 'negative' }
      ],
      recommendedAction: {
        title: 'Penawaran Retensi Khusus Pelaku Usaha Batik',
        description: 'Paket bundling transaksi digital bebas biaya admin dengan pendampingan relationship officer.',
        targetAudience: '2.850 nasabah produktif',
        preferredChannels: 'WhatsApp & SMS Direct',
        timing: 'Selasa, 13.00–15.00 WIB',
        owner: 'Commercial Marketing Pekalongan',
        approver: 'Regional Manager Pantura',
        approvalStatus: 'Draft'
      }
    },
    'Semarang Selatan': {
      name: 'Semarang Selatan',
      kabupaten: 'Kota Semarang',
      strategy: 'RETAIN',
      strategicScore: 69,
      priorityLevel: 'Sedang',
      totalCustomers: 88400,
      activeRate: 77.2,
      outlets: 5,
      opportunityValue: 'Rp3,2 miliar',
      confidence: 88,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '96,0%',
      topDrivers: [
        { factor: 'Perubahan frekuensi belanja bulanan (-12%)', contribution: '+14 kontribusi', impact: 'negative' },
        { factor: 'Keterbatasan preferensi kanal komunikasi', contribution: '+10 kontribusi', impact: 'negative' }
      ],
      recommendedAction: {
        title: 'Automated App Push Engagement & Reward Booster',
        description: 'Kirim notifikasi in-app terpersonalisasi dengan penawaran cashback transaksi akhir pekan.',
        targetAudience: '4.200 nasabah aktif',
        preferredChannels: 'Mobile App Push',
        timing: 'Sabtu, 08.00–10.00 WIB',
        owner: 'Digital Growth Specialist',
        approver: 'Head of Marketing',
        approvalStatus: 'Dalam Pelaksanaan'
      }
    }
  };

  const currentAreaDetail = areaProfiles[selectedArea] || areaProfiles['Surakarta Utara'];

  const handleOpenDetailDrawer = (areaName: string) => {
    const data = areaProfiles[areaName] || {
      name: areaName,
      kabupaten: 'Jawa Tengah',
      strategy: 'RETAIN',
      strategicScore: 75,
      priorityLevel: 'Tinggi',
      totalCustomers: 65000,
      activeRate: 75.0,
      outlets: 4,
      opportunityValue: 'Rp4,5 miliar',
      confidence: 88,
      dataFreshness: '22 Sep 2026, 23.45 WIB',
      dataQualityScore: '96,2%',
      topDrivers: [
        { factor: 'Penurunan volume transaksi bulanan', contribution: '+20 kontribusi', impact: 'negative' },
        { factor: 'Waktu sejak kontak terakhir', contribution: '+15 kontribusi', impact: 'negative' }
      ],
      recommendedAction: {
        title: `Aktivasi Retensi Wilayah ${areaName}`,
        description: 'Tindakan proaktif retensi nasabah bernilai tinggi.',
        targetAudience: '3.200 pelanggan prioritas',
        preferredChannels: 'WhatsApp & Telepon',
        timing: 'Hari kerja 10.00-14.00 WIB',
        owner: 'Regional Team',
        approver: 'Regional Manager',
        approvalStatus: 'Draft'
      }
    };
    setSelectedDrawerData(data);
  };

  // Masked customer records
  const demoCustomers = [
    {
      priority: 1,
      maskedId: 'CUST-JTG-008421',
      name: 'R*** S******',
      area: 'Surakarta Utara',
      segment: 'High Value At Risk',
      valueScore: 88,
      riskScore: 81,
      dominantDriver: 'Penurunan frekuensi (-35%)',
      allowedChannel: 'WhatsApp',
      status: 'Menunggu Persetujuan'
    },
    {
      priority: 2,
      maskedId: 'CUST-JTG-005193',
      name: 'B*** P******',
      area: 'Magelang Tengah',
      segment: 'High Value At Risk',
      valueScore: 84,
      riskScore: 78,
      dominantDriver: 'Keluhan tertunda > 7 hari',
      allowedChannel: 'Telepon Pribadi',
      status: 'Menunggu Review'
    },
    {
      priority: 3,
      maskedId: 'CUST-JTG-002419',
      name: 'H*** K******',
      area: 'Pekalongan Barat',
      segment: 'High Value At Risk',
      valueScore: 82,
      riskScore: 75,
      dominantDriver: 'Jarak ke outlet > 6 km',
      allowedChannel: 'WhatsApp',
      status: 'Draft'
    },
    {
      priority: 4,
      maskedId: 'CUST-JTG-009184',
      name: 'M*** A******',
      area: 'Semarang Selatan',
      segment: 'High Value At Risk',
      valueScore: 79,
      riskScore: 71,
      dominantDriver: 'Inaktif 45 hari',
      allowedChannel: 'Mobile Push',
      status: 'Dalam Pelaksanaan'
    },
    {
      priority: 5,
      maskedId: 'CUST-JTG-006732',
      name: 'S*** W******',
      area: 'Surakarta Utara',
      segment: 'High Value At Risk',
      valueScore: 86,
      riskScore: 79,
      dominantDriver: 'Promo kompetitor',
      allowedChannel: 'WhatsApp',
      status: 'Menunggu Persetujuan'
    }
  ];

  const filteredCustomers = demoCustomers.filter((c) => {
    if (tableFilterRisk === 'Tinggi (>80)' && c.riskScore < 80) return false;
    if (tableFilterRisk === 'Sedang (70-79)' && (c.riskScore < 70 || c.riskScore >= 80)) return false;
    if (tableFilterChannel !== 'Semua' && c.allowedChannel !== tableFilterChannel) return false;
    if (customerSearchQuery && !c.maskedId.toLowerCase().includes(customerSearchQuery.toLowerCase()) && !c.area.toLowerCase().includes(customerSearchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Shared Strategy Switcher & Global Header Actions */}
      <StrategySwitcher
        currentStrategy="RETAIN"
        onNavigateToScreen={onNavigateToScreen}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onOpenAgentModal={onOpenAgentModal}
        onSaveAnalysis={() => onShowToast('Snapshot analisis RETAIN telah berhasil disimpan ke sesi kerja.')}
        onExportReport={() => onShowToast('Laporan Retensi Pelanggan (PDF & XLS) sedang diunduh...')}
        userRole={currentUserRole}
        isExportPermitted={isExportPermitted}
      />

      {/* Page Title & Mission Statement */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE3EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
            <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
              RETAIN — Retensi Pelanggan
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase tracking-wider">
              PILAR RETENSI
            </span>
          </div>
          <p className="text-xs text-[#607080]">
            Identifikasi pelanggan bernilai tinggi yang berisiko dan prioritaskan tindakan retensi.
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
            <span>Siapkan Aktivitas Retensi</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards Row (6 Compact Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1 */}
        <KpiCard
          title="Pelanggan Risiko Tinggi"
          value={GLOBAL_METRICS.highRiskCustomers}
          change="+4,1% vs lalu"
          changeType="warning"
          subtitle="11,4% dari total pelanggan"
          sparklineData={[132000, 134500, 137000, 139800, 142380]}
        />
        {/* KPI 2 */}
        <KpiCard
          title="High Value — High Risk"
          value="34.760"
          change="Prioritas Terbesar"
          changeType="warning"
          subtitle="Nilai: Rp18,6 miliar"
          sparklineData={[31000, 32200, 33100, 34000, 34760]}
        />
        {/* KPI 3 */}
        <KpiCard
          title="Area Retensi Prioritas"
          value="9 Area"
          change="3 Kritis"
          changeType="warning"
          subtitle="Solo Raya & Magelang"
          sparklineData={[7, 8, 8, 9, 9]}
        />
        {/* KPI 4 */}
        <KpiCard
          title="Aktivitas Retensi Aktif"
          value="12 Aksi"
          change="8 Berjalan · 4 Review"
          changeType="positive"
          subtitle="Omnichannel Guard"
          sparklineData={[8, 9, 10, 11, 12]}
        />
        {/* KPI 5 */}
        <KpiCard
          title="Tingkat Respons"
          value="18,7%"
          change="+2,4% poin"
          changeType="positive"
          subtitle="Respons kontak personal"
          sparklineData={[14.5, 15.2, 16.8, 17.5, 18.7]}
        />
        {/* KPI 6 - Measured Outcome */}
        <KpiCard
          title="Pelanggan Dipertahankan"
          value="6.840"
          change="Hasil Terukur"
          changeType="positive"
          subtitle="Hasil historis terverifikasi"
          sparklineData={[4200, 4850, 5400, 6100, 6840]}
        />
      </div>

      {/* 3. Main Analytical Layout (12-Column Grid: Map 8 cols + Priority List 4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Retention Risk Map (8 columns) */}
        <div className="xl:col-span-8 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#17212B]">
                  Peta Risiko Retensi &amp; Nilai Pelanggan (Jawa Tengah)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  Agregasi Wilayah
                </span>
              </div>
              <p className="text-[11px] text-[#607080]">
                Menampilkan sebaran densitas pelanggan berisiko tinggi tanpa mengekspos koordinat level rumah tangga (Sesuai UU PDP).
              </p>
            </div>

            {/* View Mode Selector: "Jumlah", "Rasio Risiko", "Nilai Pelanggan" */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              {(['Jumlah', 'Rasio Risiko', 'Nilai Pelanggan'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
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
            activeStrategyFilter="RETAIN"
            selectedAreaId={selectedArea}
            onSelectArea={(name) => {
              setSelectedArea(name);
              handleOpenDetailDrawer(name);
            }}
          />

          {/* Map Footer Context */}
          <div className="mt-3 pt-3 border-t border-[#DDE3EA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#607080]">
            <div className="flex items-center gap-3">
              <span>Mode Tampilan Aktif: <strong className="text-[#17212B]">{viewMode}</strong></span>
              <span>·</span>
              <span>Terpilih: <strong className="text-amber-700">{selectedArea}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleOpenDetailDrawer(selectedArea)}
                className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Buka Detail Drawer Wilayah Ini</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Retention Priority List (4 columns) */}
        <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between shadow-2xs space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#DDE3EA]">
              <div>
                <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">
                  DAFTAR AREA PRIORITAS RETENSI
                </span>
                <h3 className="font-bold text-sm text-[#17212B]">
                  Peringkat Risiko Intervensi
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Top 4 Area
              </span>
            </div>

            {/* Ranked Priority Cards */}
            <div className="space-y-2.5 mt-3">
              {[
                {
                  name: 'Surakarta Utara',
                  score: 87,
                  level: 'Kritis',
                  levelColor: 'bg-red-100 text-red-800 border-red-200',
                  customers: '5.680 High-Value',
                  valueAtRisk: 'Rp4,8 miliar',
                  drivers: ['Frekuensi layanan turun', 'Interaksi terakhir >45 hari'],
                  status: 'Menunggu Persetujuan'
                },
                {
                  name: 'Magelang Tengah',
                  score: 76,
                  level: 'Tinggi',
                  levelColor: 'bg-amber-100 text-amber-800 border-amber-200',
                  customers: '3.400 High-Value',
                  valueAtRisk: 'Rp2,9 miliar',
                  drivers: ['Keluhan tertunda >7 hari', 'Kepuasan migrasi digital'],
                  status: 'Menunggu Review'
                },
                {
                  name: 'Pekalongan Barat',
                  score: 73,
                  level: 'Tinggi',
                  levelColor: 'bg-amber-100 text-amber-800 border-amber-200',
                  customers: '2.850 High-Value',
                  valueAtRisk: 'Rp2,4 miliar',
                  drivers: ['Jarak outlet >6 km', 'Tekanan promo kompetitor'],
                  status: 'Draft'
                },
                {
                  name: 'Semarang Selatan',
                  score: 69,
                  level: 'Sedang',
                  levelColor: 'bg-blue-100 text-blue-800 border-blue-200',
                  customers: '2.120 High-Value',
                  valueAtRisk: 'Rp1,8 miliar',
                  drivers: ['Penurunan volume belanja', 'Preferensi kanal kontak'],
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
                        ? 'border-amber-400 bg-amber-50/50 shadow-xs ring-1 ring-amber-300'
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
                        <span className="font-mono font-bold text-xs text-[#D97706]">
                          Skor {item.score}
                        </span>
                        <span className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded border ${item.levelColor}`}>
                          {item.level}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] mb-2 bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-[#607080]">Sasaran:</span>{' '}
                        <strong className="text-[#17212B]">{item.customers}</strong>
                      </div>
                      <div>
                        <span className="text-[#607080]">Nilai Risiko:</span>{' '}
                        <strong className="text-red-700">{item.valueAtRisk}</strong>
                      </div>
                    </div>

                    <div className="text-[10px] text-[#607080] space-y-0.5 mb-2">
                      {item.drivers.map((d, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-amber-500" />
                          <span>{d}</span>
                        </div>
                      ))}
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
            <span>Model versi: <strong>v1.3 (AUROC 0,86)</strong></span>
            <button
              onClick={() => onNavigateToScreen('explainability')}
              className="text-[#2563EB] font-bold hover:underline"
            >
              Lihat Explainability →
            </button>
          </div>
        </div>
      </div>

      {/* 4. Selected-Area Detail Section: Surakarta Utara Deep Dive */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#DDE3EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">
                ANALISIS MENDALAM WILAYAH TERPILIH
              </span>
              <span className="text-xs text-[#607080]">· Kota Surakarta</span>
            </div>
            <h2 className="text-base font-bold text-[#17212B] mt-0.5">
              {currentAreaDetail.name} (Skor Strategis {currentAreaDetail.strategicScore})
            </h2>
          </div>

          {/* Key Indicators */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">Retention Risk Index:</span>{' '}
              <strong className="text-red-700 font-mono">82 / 100</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">High-Risk:</span>{' '}
              <strong className="text-[#17212B]">18.420</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">High Value - High Risk:</span>{' '}
              <strong className="text-amber-800">5.680</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <span className="text-[#607080]">Nilai Terancam:</span>{' '}
              <strong className="text-red-700 font-semibold">Rp4,8 miliar</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              Data Quality: 97,1% (Baik)
            </div>
          </div>
        </div>

        {/* Breakdown: Top 5 Drivers Waterfall Contribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#17212B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Dekomposisi Kontribusi Faktor Pendorong (SHAP Values)</span>
              </span>
              <button
                onClick={() => onNavigateToScreen('explainability')}
                className="text-[11px] text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Buka Explainability Lengkap</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Drivers Horizontal Bars */}
            <div className="space-y-2.5">
              {[
                { label: '1. Frekuensi layanan menurun (-18% dlm 60 hari)', val: 24, text: '+24 kontribusi risiko' },
                { label: '2. Waktu sejak interaksi terakhir meningkat (>45 hari)', val: 19, text: '+19 kontribusi risiko' },
                { label: '3. Keluhan belum terselesaikan (melewati SLA)', val: 14, text: '+14 kontribusi risiko' },
                { label: '4. Jarak rata-rata ke titik layanan (5,8 km)', val: 11, text: '+11 kontribusi risiko' },
                { label: '5. Tekanan promo penawaran kompetitor lokal', val: 8, text: '+8 kontribusi risiko' }
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-[#DDE3EA] bg-white text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#17212B]">{item.label}</span>
                    <span className="font-mono font-bold text-red-600 text-[11px]">{item.text}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-red-600 rounded-full"
                      style={{ width: `${(item.val / 25) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Segment-Risk Matrix Quadrant */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl border border-[#DDE3EA] bg-[#F5F7FA]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#17212B]">Matriks Segmen vs. Risiko Retensi</span>
                <span className="text-[10px] text-[#607080]">Ukuran Bubble = Jumlah Nasabah</span>
              </div>

              {/* 4 Quadrants Box */}
              <div className="grid grid-cols-2 grid-rows-2 gap-2 h-44 bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] relative">
                {/* Top-Left: High Risk, Low Value -> Monitor */}
                <div className="border border-slate-200 rounded p-2 bg-slate-50 flex flex-col justify-between">
                  <span className="font-bold text-slate-700">MONITOR</span>
                  <div className="text-[10px] text-slate-500">Risiko Tinggi, Nilai Rendah</div>
                  <span className="text-xs font-bold text-slate-700">42.100 nasabah</span>
                </div>

                {/* Top-Right: High Risk, High Value -> HIGH VALUE AT RISK (Highlighted) */}
                <div className="border-2 border-red-400 rounded p-2 bg-red-50/80 flex flex-col justify-between ring-2 ring-red-300/40">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-red-800">HIGH VALUE — HIGH RISK</span>
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  </div>
                  <div className="text-[10px] text-red-700 font-medium">Prioritas Intervensi Utama</div>
                  <span className="text-sm font-black text-red-800">34.760 nasabah (Rp18,6M)</span>
                </div>

                {/* Bottom-Left: Low Risk, Low Value -> Low Priority */}
                <div className="border border-slate-200 rounded p-2 bg-slate-50 flex flex-col justify-between">
                  <span className="font-bold text-slate-500">LOW PRIORITY</span>
                  <span className="text-xs font-medium text-slate-600">388.000 nasabah</span>
                </div>

                {/* Bottom-Right: Low Risk, High Value -> Maintain */}
                <div className="border border-emerald-200 rounded p-2 bg-emerald-50/70 flex flex-col justify-between">
                  <span className="font-bold text-emerald-800">MAINTAIN</span>
                  <span className="text-xs font-bold text-emerald-800">516.560 nasabah</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-[10px] text-[#607080] flex justify-between">
              <span>← Nilai Pelanggan Rendah</span>
              <span>Nilai Pelanggan Tinggi →</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. 6-Month Risk Trend with Annotated Spike */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-sm text-[#17212B]">
              Tren Risiko Retensi 6 Bulan Terakhir (April – September 2026)
            </h3>
            <p className="text-xs text-[#607080]">
              Perbandingan rasio risiko keseluruhan vs. segmen bernilai tinggi beserta aksi retensi yang telah dieksekusi.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-amber-500 rounded-full" />
              <span className="text-[#607080]">Rasio Risiko Keseluruhan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-red-600 rounded-full" />
              <span className="text-[#607080]">High Value High Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-blue-600 rounded-full" />
              <span className="text-[#607080]">Aksi Retensi</span>
            </div>
          </div>
        </div>

        {/* Visual Trend Bars / Stepper with Visible Annotation */}
        <div className="grid grid-cols-6 gap-3 pt-2 pb-6 border-b border-slate-100 text-xs">
          {[
            { month: 'Apr 2026', totalRisk: '8,4%', hvRisk: '2,1%', actions: 5 },
            { month: 'Mei 2026', totalRisk: '8,9%', hvRisk: '2,3%', actions: 6 },
            { month: 'Jun 2026', totalRisk: '9,5%', hvRisk: '2,8%', actions: 8 },
            {
              month: 'Jul 2026',
              totalRisk: '10,8%',
              hvRisk: '3,6%',
              actions: 9,
              isSpike: true,
              spikeLabel: 'Lonjakan migrasi paket kompetitor di Solo Raya'
            },
            { month: 'Agu 2026', totalRisk: '11,1%', hvRisk: '3,9%', actions: 10 },
            { month: 'Sep 2026', totalRisk: '11,4%', hvRisk: '4,1%', actions: 12 }
          ].map((col) => (
            <div
              key={col.month}
              className={`p-3 rounded-xl border flex flex-col justify-between relative ${
                col.isSpike
                  ? 'border-red-400 bg-red-50/50 shadow-xs ring-1 ring-red-300'
                  : 'border-[#DDE3EA] bg-white'
              }`}
            >
              {col.isSpike && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                  ⚠️ SPIKE TERDETEKSI
                </div>
              )}
              <div className="font-bold text-[#17212B] text-center mb-2">{col.month}</div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#607080]">Risiko Total:</span>
                  <span className="font-mono font-bold text-amber-700">{col.totalRisk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607080]">High-Value:</span>
                  <span className="font-mono font-bold text-red-700">{col.hvRisk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607080]">Aksi Retensi:</span>
                  <span className="font-mono font-bold text-blue-700">{col.actions} aksi</span>
                </div>
              </div>

              {col.isSpike && (
                <div className="mt-2 pt-1.5 border-t border-red-200 text-[10px] text-red-800 font-medium leading-tight">
                  {col.spikeLabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 6. Priority Masked Customer Table (Role-gated) */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DDE3EA]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#17212B]">
                Daftar Pelanggan Prioritas Retensi (Masked Data)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Kepatuhan UU PDP Terlindungi
              </span>
            </div>
            <p className="text-xs text-[#607080]">
              Identitas personal disamarkan secara otomatis sesuai prinsip data privacy SERVEON.
            </p>
          </div>

          {/* Table Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari ID / Wilayah..."
                value={customerSearchQuery}
                onChange={(e) => setCustomerSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#DDE3EA] bg-white w-40 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <select
              value={tableFilterRisk}
              onChange={(e) => setTableFilterRisk(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-[#DDE3EA] bg-white text-[#17212B]"
            >
              <option value="Semua">Semua Tingkat Risiko</option>
              <option value="Tinggi (>80)">Risiko Tinggi (&gt;80)</option>
              <option value="Sedang (70-79)">Risiko Sedang (70–79)</option>
            </select>

            <select
              value={tableFilterChannel}
              onChange={(e) => setTableFilterChannel(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-[#DDE3EA] bg-white text-[#17212B]"
            >
              <option value="Semua">Semua Kanal Kontak</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Telepon Pribadi">Telepon Pribadi</option>
              <option value="Mobile Push">Mobile Push</option>
            </select>
          </div>
        </div>

        {isCustomerTableAuthorized ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-[#607080] border-b border-[#DDE3EA] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Prioritas</th>
                  <th className="py-2.5 px-3">Masked ID &amp; Nama</th>
                  <th className="py-2.5 px-3">Wilayah</th>
                  <th className="py-2.5 px-3">Segmen</th>
                  <th className="py-2.5 px-3">Skor Nilai</th>
                  <th className="py-2.5 px-3">Risiko Churn</th>
                  <th className="py-2.5 px-3">Faktor Pendorong Utama</th>
                  <th className="py-2.5 px-3">Kanal Diizinkan</th>
                  <th className="py-2.5 px-3">Status Aksi</th>
                  <th className="py-2.5 px-3 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((c) => (
                  <tr key={c.maskedId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-bold text-[#17212B]">#{c.priority}</td>
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-[#2563EB]">{c.maskedId}</div>
                      <div className="text-[11px] text-slate-500">{c.name}</div>
                    </td>
                    <td className="py-3 px-3 font-medium text-[#17212B]">{c.area}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-semibold">
                        {c.segment}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800 tabular-nums">
                      {c.valueScore}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-red-600 tabular-nums">
                      {c.riskScore}%
                    </td>
                    <td className="py-3 px-3 text-slate-600 max-w-xs truncate">
                      {c.dominantDriver}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] text-[10px] font-medium">
                        {c.allowedChannel}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onNavigateToScreen('pelanggan-360')}
                        className="text-[#2563EB] hover:underline font-bold text-[11px]"
                      >
                        Buka 360 →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-2">
            <Lock className="w-6 h-6 text-slate-400 mx-auto" />
            <h4 className="font-bold text-xs text-[#17212B]">Tampilan Ringkasan Eksekutif Aktif</h4>
            <p className="text-[11px] text-slate-600 max-w-md mx-auto">
              Sesuai otorisasi role <strong>{currentUserRole}</strong>, data detail tingkat pelanggan individu diagregasi ke level wilayah Surakarta Utara (5.680 nasabah prioritas).
            </p>
          </div>
        )}
      </div>

      {/* 7. Recommended Action Panel & 8. Retention Outcome Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recommended Action Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
              <div>
                <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">
                  PAKET TINDAKAN DIREKOMENDASIKAN
                </span>
                <h3 className="font-bold text-sm text-[#17212B]">
                  Aksi Retensi Terkoordinasi: {currentAreaDetail.name}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                Persetujuan Wajib
              </span>
            </div>

            {/* 3 Coordinated Actions */}
            <div className="space-y-3 mt-4 text-xs">
              {/* Primary Action */}
              <div className="p-3.5 rounded-xl border-2 border-amber-400 bg-amber-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-amber-700" />
                    <span>1. Personalized VIP Service Reminder &amp; Loyalty Compensation</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 uppercase">
                    UTAMA
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Target: <strong>5.680 nasabah High Value - High Risk</strong> di Surakarta Utara. Saluran terpilih: WhatsApp Bisnis Terverifikasi dan Telepon Pribadi oleh RO. Waktu eksekusi optimal: <strong>Kamis, 10.00–12.00 WIB</strong>. Estimasi dapat dihubungi: <strong>4.920 nasabah</strong>.
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>SLA Respons Target: &lt; 24 jam · Memerlukan verifikasi PDP opt-in</span>
                </div>
              </div>

              {/* Action 2 */}
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-white flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#17212B]">2. Prioritas Penyelesaian Keluhan Pelanggan Tertunda</div>
                  <p className="text-[11px] text-slate-600">
                    Eskalasi 140 tiket keluhan layanan Solo ke Branch Operation Manager untuk diselesaikan &lt; 48 jam.
                  </p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-slate-100 font-semibold text-slate-700 shrink-0 ml-2">
                  Ops Branch
                </span>
              </div>

              {/* Action 3 */}
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-white flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#17212B]">3. High-Value Customer Personal Courtesy Call</div>
                  <p className="text-[11px] text-slate-600">
                    Kunjungan atau panggilan personal untuk 280 nasabah tier Platinum dengan saldo penurunan signifikan.
                  </p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-slate-100 font-semibold text-slate-700 shrink-0 ml-2">
                  RO VIP
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons (Strictly no immediate mass send) */}
          <div className="pt-3 border-t border-[#DDE3EA] flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => setIsMethodModalOpen(true)}
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              Lihat Dasar Rekomendasi
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onShowToast('Daftar prioritas 5.680 nasabah telah dikonstruksi ke dalam segment builder.')}
                className="px-3.5 py-2 border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold"
              >
                Buat Daftar Prioritas
              </button>
              <button
                onClick={() => onNavigateToScreen('campaign-omnichannel')}
                className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Siapkan Aktivitas Retensi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Retention Outcome Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#DDE3EA] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  HASIL &amp; PENGUKURAN OUTCOME
                </span>
                <h3 className="font-bold text-sm text-[#17212B]">
                  Corong Eksekusi Retensi Terukur
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Observasi Historis
              </span>
            </div>

            {/* Funnel Steps */}
            <div className="space-y-2 mt-4 text-xs">
              {[
                { label: 'Rekomendasi Diterbitkan', val: '36 Rekomendasi', pct: '100%', color: 'bg-blue-500' },
                { label: 'Disetujui Manajerial', val: '29 Disetujui', pct: '80,5%', color: 'bg-blue-600' },
                { label: 'Dieksekusi ke Lapangan', val: '24 Kampanye', pct: '66,7%', color: 'bg-indigo-600' },
                { label: 'Audiens Berhasil Dihubungi', val: '19.800 Nasabah', pct: '55,0%', color: 'bg-violet-600' },
                { label: 'Merespons Positif', val: '3.700 Nasabah (18,7%)', pct: '18,7%', color: 'bg-amber-600' },
                { label: 'Pelanggan Berhasil Dipertahankan', val: '6.840 Akun Terlindungi', pct: 'Hasil Nyata', color: 'bg-emerald-600' }
              ].map((step, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
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

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="flex justify-between font-bold">
              <span>Estimasi Nilai Terlindungi:</span>
              <span className="font-mono text-emerald-800 font-black">Rp6,4 miliar</span>
            </div>
            <p className="text-[10px] text-emerald-800/80 leading-relaxed">
              *Dihitung dari 6.840 akun yang tetap aktif bertransaksi dalam 90 hari pasca intervensi personal.
            </p>
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
        strategyName="RETAIN — Retensi Pelanggan"
      />

      {/* Approval Governance Modal */}
      <ApprovalWorkflowModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        data={selectedDrawerData || currentAreaDetail}
        currentUserRole={currentUserRole}
        onStatusChange={(status) => {
          onShowToast(`Status persetujuan diperbarui menjadi: ${status}`);
        }}
      />
    </div>
  );
};
