import React, { useState, useMemo } from 'react';
import {
  Layers,
  Eye,
  Sliders,
  Maximize2,
  Info,
  Building2,
  Sparkles,
  MapPin,
  TrendingUp,
  Download,
  Search,
  ChevronRight,
  ChevronDown,
  Shield,
  ShieldAlert,
  Target,
  Radio,
  BarChart3,
  Bot,
  Send,
  HelpCircle,
  Scale,
  X,
  CheckCircle2,
  Compass,
  Flame,
  Users,
  Grid,
  Filter,
  Calendar,
  Bike,
  Activity,
  AlertOctagon
} from 'lucide-react';
import {
  JawaTengahMap,
  MapLayerState,
  DEFAULT_MAP_LAYERS,
  CustomerVisualizationMode
} from '../components/map/JawaTengahMap';
import { ScreenId, StrategyType } from '../types';
import {
  JAWA_TENGAH_REGENCIES,
  GeoLevel,
  GeoItem,
  KecamatanItem,
  CandidateLocationItem,
  IndividualCustomerPoint,
  CustomerSegmentFilter,
  CustomerProductFilter,
  CustomerStatusFilter,
  TOP_CUSTOMER_AREAS,
  generateAIMapInsight
} from '../data/geographicDrilldownData';

interface MapDensityScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const MapDensityScreen: React.FC<MapDensityScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  // Navigation & Drilldown State
  const [selectedRegencyName, setSelectedRegencyName] = useState<string>('Kota Semarang');
  const [selectedDistrictName, setSelectedDistrictName] = useState<string | undefined>('Tembalang');
  const [selectedSubdistrictName, setSelectedSubdistrictName] = useState<string | undefined>('Meteseh');

  // Customer Distribution Mode State
  const [visualizationMode, setVisualizationMode] = useState<CustomerVisualizationMode>('density-heatmap');
  const [selectedSegmentFilter, setSelectedSegmentFilter] = useState<CustomerSegmentFilter>('ALL');
  const [selectedProductFilter, setSelectedProductFilter] = useState<CustomerProductFilter>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<CustomerStatusFilter>('ALL');
  const [timePeriodFilter, setTimePeriodFilter] = useState<string>('Semua Waktu');

  // Strategy Mode State (ALL | RETAIN | DEFEND | ACQUIRE)
  const [activeStrategyFilter, setActiveStrategyFilter] = useState<StrategyType | 'ALL'>('ALL');

  // Map Controls State
  const [layers, setLayers] = useState<MapLayerState>(DEFAULT_MAP_LAYERS);
  const [opacity, setOpacity] = useState(85);
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [showInsightDrawer, setShowInsightDrawer] = useState(true);

  // Radius Analysis State
  const [activeRadiusKm, setActiveRadiusKm] = useState<number | null>(null);

  // Selected Candidate Site / Customer Point State
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateLocationItem | null>(null);
  const [selectedCustomerPoint, setSelectedCustomerPoint] = useState<IndividualCustomerPoint | null>(null);

  // Comparison State (2-5 areas)
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [comparisonAreas, setComparisonAreas] = useState<string[]>(['Meteseh', 'Sendangmulyo', 'Tembalang']);

  // AI Map Insight Interactive Q&A
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Current Hierarchy Entities
  const currentRegency = useMemo(() => {
    return JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
  }, [selectedRegencyName]);

  const currentDistrict = useMemo(() => {
    return currentRegency?.districts.find((d) => d.name === selectedDistrictName);
  }, [currentRegency, selectedDistrictName]);

  const currentSubdistrict = useMemo(() => {
    return currentDistrict?.subdistricts.find((s) => s.name === selectedSubdistrictName);
  }, [currentDistrict, selectedSubdistrictName]);

  // Current Level
  const currentLevel: GeoLevel = selectedSubdistrictName
    ? 'subdistrict'
    : selectedDistrictName
    ? 'district'
    : selectedRegencyName && selectedRegencyName !== 'Semua Kabupaten/Kota'
    ? 'regency'
    : 'province';

  // Toggle Layer
  const toggleLayer = (key: string) => {
    setLayers((prev) => ({
      ...prev,
      [key]: !prev[key as keyof MapLayerState]
    }));
  };

  // Handle Drill-down Changes
  const handleDrillDownChange = (regency?: string, district?: string, subdistrict?: string) => {
    setSelectedRegencyName(regency || 'Semua Kabupaten/Kota');
    setSelectedDistrictName(district);
    setSelectedSubdistrictName(subdistrict);
    setAiAnswer(null);

    // Toast feedback
    if (subdistrict) {
      onShowToast(`Sebaran Pelanggan: Kelurahan ${subdistrict}, ${district}`);
    } else if (district) {
      onShowToast(`Kepadatan Pelanggan: Kecamatan ${district}`);
    } else if (regency) {
      onShowToast(`Konsentrasi Pelanggan: ${regency}`);
    }
  };

  // Dynamic Customer Distribution Summary (Item 19)
  const distributionSummary = useMemo(() => {
    if (currentSubdistrict) {
      const m = currentSubdistrict.metrics;
      return {
        total: m.existingCustomers.toLocaleString('id-ID'),
        detail: `68% terkonsentrasi di Dinar Mas & Sigar Bencah · ${m.highValueCustomers} High Value · ${m.atRiskCustomers} At-Risk · ${m.customersOutsideCoverageCount} pelanggan di luar jangkauan servis optimal (>5 KM)`
      };
    }
    if (currentDistrict) {
      return {
        total: currentDistrict.totalCustomers.toLocaleString('id-ID'),
        detail: `62% terkonsentrasi di 4 Kelurahan utama · 2.180 High Value · 1.430 At-Risk · 3 area dengan densitas tinggi namun jangkauan servis minim`
      };
    }
    return {
      total: (124800).toLocaleString('id-ID'),
      detail: `Konsentrasi tertinggi di Kota Semarang & Surakarta · 78,6% Aktif · 11,4% At-Risk · Skor Konsentrasi 95/100`
    };
  }, [currentSubdistrict, currentDistrict]);

  // Density vs Market Potential 4-Quadrant Matrix (Item 14)
  const densityPotentialQuadrant = useMemo(() => {
    const density = currentSubdistrict?.metrics.customerDensityScore || 84;
    const potential = currentSubdistrict?.metrics.marketPotentialScore || 91;

    if (density >= 85 && potential >= 85) {
      return {
        title: 'High Customer Density + High Market Potential',
        badge: 'DEFEND & EXPAND',
        desc: 'Basis pelanggan sangat besar dengan potensi pasar tinggi. Prioritas ekspansi kapasitas outlet.',
        color: 'text-purple-700 bg-purple-50 border-purple-200'
      };
    }
    if (density < 85 && potential >= 85) {
      return {
        title: 'Low Customer Density + High Market Potential',
        badge: 'ACQUISITION OPPORTUNITY',
        desc: 'Penetrasi pelanggan eksisting masih rendah namun potensi pasar sangat tinggi (White Space).',
        color: 'text-teal-700 bg-teal-50 border-teal-200'
      };
    }
    if (density >= 85 && potential < 85) {
      return {
        title: 'High Customer Density + Low Market Potential',
        badge: 'RETENTION FOCUS',
        desc: 'Penetrasi sudah jenuh. Fokus utama menjaga loyalitas dan mencegah churning.',
        color: 'text-amber-700 bg-amber-50 border-amber-200'
      };
    }
    return {
      title: 'Low Customer Density + Low Market Potential',
      badge: 'MONITORING ZONE',
      desc: 'Wilayah sub-urban dengan aktivitas komersial moderat.',
      color: 'text-slate-700 bg-slate-50 border-slate-200'
    };
  }, [currentSubdistrict]);

  // AI Map Insight generator based on current selection
  const aiInsightData = useMemo(() => {
    const name = selectedSubdistrictName || selectedDistrictName || selectedRegencyName || 'Jawa Tengah';
    return generateAIMapInsight(
      currentLevel,
      name,
      selectedDistrictName,
      selectedRegencyName,
      currentSubdistrict?.metrics
    );
  }, [currentLevel, selectedSubdistrictName, selectedDistrictName, selectedRegencyName, currentSubdistrict]);

  // Handle Ask AI
  const handleAskAI = (questionToAsk?: string) => {
    const q = (questionToAsk || aiQuestion).trim();
    if (!q) return;

    setIsAiLoading(true);
    setAiQuestion(q);

    setTimeout(() => {
      setIsAiLoading(false);
      const lower = q.toLowerCase();

      if (lower.includes('di mana') || lower.includes('konsentrasi') || lower.includes('terbanyak')) {
        setAiAnswer(
          `Pelanggan paling terkonsentrasi di Kelurahan Tembalang (4.820 pelanggan) dan Kelurahan Meteseh (3.250 pelanggan). Lebih dari 62% pelanggan di Kecamatan ini terpusat di kawasan koridor perumahan dan kampus UNDIP.`
        );
      } else if (lower.includes('high value') || lower.includes('nilai')) {
        setAiAnswer(
          `Sekitar 42% pelanggan bernilai tinggi (High Value) terkonsentrasi di tiga titik: Tembalang (890 pelanggan), Sendangmulyo (520 pelanggan), dan Bukit Kencana Meteseh (480 pelanggan). Model unit favorit segmen ini adalah PCX 160 dan Vario 160.`
        );
      } else if (lower.includes('jauh') || lower.includes('coverage') || lower.includes('gap')) {
        setAiAnswer(
          `Terdapat 1.240 pelanggan di Meteseh timur dan koridor Rowosari yang berada lebih dari 5 km (jarak tempuh > 18 menit) dari outlet resmi terdekat. Ini merupakan Coverage Gap prioritas untuk satelit service atau mobile service kunjung.`
        );
      } else if (lower.includes('at risk') || lower.includes('risiko')) {
        setAiAnswer(
          `Kelurahan Meteseh memiliki 620 pelanggan berisiko tinggi (19,1%) dan Sendangmulyo memiliki 480 pelanggan berisiko, terutama pelanggan tahun ke-2 yang belum melakukan servis berkala dalam 120 hari terakhir.`
        );
      } else {
        setAiAnswer(
          `Berdasarkan data spasial SERVEON, wilayah ${selectedSubdistrictName || selectedDistrictName || 'terpilih'} memiliki Skor Konsentrasi Pelanggan ${currentSubdistrict?.customerConcentrationScore || 88}/100. Disarankan mengintensifkan kanal WhatsApp Mobile Apps dan program jemput servis kunjung.`
        );
      }
    }, 450);
  };

  // Pre-configured comparison items
  const allSubdistrictsForComparison = useMemo(() => {
    const items: GeoItem[] = [];
    JAWA_TENGAH_REGENCIES.forEach((r) => {
      r.districts.forEach((d) => {
        d.subdistricts.forEach((s) => {
          items.push(s);
        });
      });
    });
    return items;
  }, []);

  const comparedItems = useMemo(() => {
    return allSubdistrictsForComparison.filter((item) => comparisonAreas.includes(item.name));
  }, [allSubdistrictsForComparison, comparisonAreas]);

  return (
    <div className="space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header (Preserved) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Peta &amp; Kepadatan Spasial
          </h1>
          <p className="text-xs text-[#607080]">
            Analisis multi-layer spasial: konsentrasi densitas pelanggan, nilai ekonomi, dan sebaran jaringan kompetitor.
          </p>
        </div>

        {/* Top Controls: Strategy Switcher & Split Mode */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Strategy Mode Buttons (RETAIN, DEFEND, ACQUIRE, ALL) */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#DDE3EA] rounded-lg text-xs shadow-2xs">
            <span className="text-[11px] font-bold text-slate-500 px-1.5 hidden sm:inline">Strategi:</span>
            {(['ALL', 'RETAIN', 'DEFEND', 'ACQUIRE'] as const).map((mode) => {
              const isActive = activeStrategyFilter === mode;
              const colorClasses =
                mode === 'DEFEND'
                  ? isActive ? 'bg-[#C73E3A] text-white font-bold' : 'text-[#C73E3A] hover:bg-rose-50'
                  : mode === 'RETAIN'
                  ? isActive ? 'bg-[#D97706] text-white font-bold' : 'text-[#D97706] hover:bg-amber-50'
                  : mode === 'ACQUIRE'
                  ? isActive ? 'bg-[#0F7C7B] text-white font-bold' : 'text-[#0F7C7B] hover:bg-teal-50'
                  : isActive ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100';

              return (
                <button
                  key={mode}
                  onClick={() => {
                    setActiveStrategyFilter(mode);
                    onShowToast(mode === 'ALL' ? 'Menampilkan semua zona' : `Mode Strategi: ${mode}`);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${colorClasses}`}
                >
                  {mode === 'ALL' ? 'SEMUA' : mode}
                </button>
              );
            })}
          </div>

          {/* Location Comparison Trigger */}
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Bandingkan ({comparisonAreas.length})</span>
          </button>

          {/* Split Mode Button */}
          <button
            onClick={() => setIsSplitMode(!isSplitMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border shadow-2xs ${
              isSplitMode
                ? 'bg-[#0F7C7B] text-white border-teal-600'
                : 'bg-white border-[#DDE3EA] hover:bg-slate-50 text-[#17212B]'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{isSplitMode ? 'Tutup Bandingkan' : 'Bandingkan Dua Layer'}</span>
          </button>
        </div>
      </div>

      {/* ENHANCEMENT 19: Dynamic Customer Distribution Summary Banner */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Ringkasan Sebaran Pelanggan ({selectedSubdistrictName ? `Kel. ${selectedSubdistrictName}` : selectedDistrictName ? `Kec. ${selectedDistrictName}` : selectedRegencyName})
              </span>
              <span className="text-xs font-black text-blue-700 font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {distributionSummary.total} Pelanggan
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {distributionSummary.detail}
            </p>
          </div>
        </div>

        {/* 4-Quadrant Matrix Badge (Item 14) */}
        <div className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-2 shrink-0 ${densityPotentialQuadrant.color}`}>
          <Target className="w-3.5 h-3.5 shrink-0" />
          <div>
            <div className="font-bold text-[10.5px] uppercase">{densityPotentialQuadrant.badge}</div>
            <div className="text-[9.5px] opacity-90 truncate max-w-[200px]">{densityPotentialQuadrant.title}</div>
          </div>
        </div>
      </div>

      {/* ENHANCEMENT 1 & 5: Customer Distribution Specialized Controls Bar */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-3 flex flex-wrap items-center justify-between gap-2.5 text-xs shadow-2xs">
        {/* Mode Toggles */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-700 text-[11px] flex items-center gap-1 mr-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Mode Sebaran:
          </span>

          {[
            { id: 'density-heatmap', label: 'Heatmap Densitas', icon: Flame },
            { id: 'clusters', label: 'Kluster Pelanggan', icon: Users },
            { id: 'value', label: 'Nilai Pelanggan', icon: Sparkles },
            { id: 'status', label: 'Status & Churn', icon: ShieldAlert },
            { id: 'coverage-gap', label: 'Coverage Gap (vs Outlet)', icon: AlertOctagon }
          ].map((mode) => {
            const isActive = visualizationMode === mode.id;
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setVisualizationMode(mode.id as any);
                  onShowToast(`Mode Visualisasi: ${mode.label}`);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-[#F5F7FA] text-slate-700 border-[#DDE3EA] hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filters: Segmen, Produk, Periode */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Segmen Pelanggan */}
          <div className="relative">
            <select
              value={selectedSegmentFilter}
              onChange={(e) => {
                setSelectedSegmentFilter(e.target.value as any);
                onShowToast(`Filter Segmen: ${e.target.value}`);
              }}
              className="appearance-none bg-[#F5F7FA] border border-[#DDE3EA] hover:border-slate-400 focus:border-[#2563EB] text-[#17212B] font-medium rounded px-2.5 py-1 pr-6 outline-none transition-colors cursor-pointer text-xs"
            >
              <option value="ALL">Semua Segmen</option>
              <option value="High Value Customer">High Value Customer</option>
              <option value="At Risk Customer">At Risk Customer</option>
              <option value="Active Customer">Active Customer</option>
              <option value="Dormant Customer">Dormant Customer</option>
              <option value="Prospect">Prospect</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#607080] absolute right-2 top-2 pointer-events-none" />
          </div>

          {/* Model Unit Motor Honda (Item 15) */}
          <div className="relative">
            <select
              value={selectedProductFilter}
              onChange={(e) => {
                setSelectedProductFilter(e.target.value as any);
                onShowToast(`Filter Produk: ${e.target.value}`);
              }}
              className="appearance-none bg-[#F5F7FA] border border-[#DDE3EA] hover:border-slate-400 focus:border-[#2563EB] text-[#17212B] font-medium rounded px-2.5 py-1 pr-6 outline-none transition-colors cursor-pointer text-xs"
            >
              <option value="ALL">Semua Unit Honda</option>
              <option value="PCX">Honda PCX 160</option>
              <option value="Vario">Honda Vario 160/125</option>
              <option value="BeAT">Honda BeAT</option>
              <option value="Scoopy">Honda Scoopy</option>
              <option value="ADV">Honda ADV 160</option>
              <option value="CB150R">Honda CB150R</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#607080] absolute right-2 top-2 pointer-events-none" />
          </div>

          {/* Time Distribution Filter (Item 17) */}
          <div className="relative">
            <select
              value={timePeriodFilter}
              onChange={(e) => {
                setTimePeriodFilter(e.target.value);
                onShowToast(`Periode: ${e.target.value}`);
              }}
              className="appearance-none bg-[#F5F7FA] border border-[#DDE3EA] hover:border-slate-400 focus:border-[#2563EB] text-[#17212B] font-medium rounded px-2.5 py-1 pr-6 outline-none transition-colors cursor-pointer text-xs"
            >
              <option value="Semua Waktu">Semua Waktu</option>
              <option value="Bulan Ini">Bulan Ini</option>
              <option value="3 Bulan Terakhir">3 Bulan Terakhir</option>
              <option value="12 Bulan Terakhir">12 Bulan Terakhir</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#607080] absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Map Workspace with Overlay Controls */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Map Viewport (8 cols) */}
        <div className={`transition-all duration-300 ${showInsightDrawer ? 'xl:col-span-8' : 'xl:col-span-12'}`}>
          <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-3 shadow-2xs">
            {/* Top Hierarchical Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pb-3 border-b border-[#DDE3EA]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-[#17212B] text-xs flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  Hierarki Wilayah:
                </span>

                {/* Level 1: Province */}
                <div className="px-2.5 py-1 rounded bg-[#F5F7FA] border border-[#DDE3EA] font-semibold text-slate-700 text-xs">
                  Jawa Tengah
                </div>

                {/* Level 2: Kabupaten / Kota */}
                <div className="relative">
                  <select
                    value={selectedRegencyName}
                    onChange={(e) => handleDrillDownChange(e.target.value, undefined, undefined)}
                    className="appearance-none bg-[#F5F7FA] border border-[#DDE3EA] hover:border-slate-400 focus:border-[#2563EB] text-[#17212B] font-medium rounded px-2.5 py-1 pr-6 outline-none transition-colors cursor-pointer text-xs"
                  >
                    <option value="Semua Kabupaten/Kota">Semua Kab/Kota (35 Area)</option>
                    {JAWA_TENGAH_REGENCIES.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-[#607080] absolute right-2 top-2 pointer-events-none" />
                </div>

                {/* Level 3: Kecamatan */}
                {currentRegency && currentRegency.districts.length > 0 && (
                  <div className="relative">
                    <select
                      value={selectedDistrictName || ''}
                      onChange={(e) => handleDrillDownChange(selectedRegencyName, e.target.value || undefined, undefined)}
                      className="appearance-none bg-[#F5F7FA] border border-[#DDE3EA] hover:border-slate-400 focus:border-[#2563EB] text-[#17212B] font-medium rounded px-2.5 py-1 pr-6 outline-none transition-colors cursor-pointer text-xs"
                    >
                      <option value="">Pilih Kecamatan...</option>
                      {currentRegency.districts.map((d) => (
                        <option key={d.id} value={d.name}>
                          Kec. {d.name} ({d.strategy})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 text-[#607080] absolute right-2 top-2 pointer-events-none" />
                  </div>
                )}

                {/* Level 4: Kelurahan / Desa */}
                {currentDistrict && currentDistrict.subdistricts.length > 0 && (
                  <div className="relative">
                    <select
                      value={selectedSubdistrictName || ''}
                      onChange={(e) => handleDrillDownChange(selectedRegencyName, selectedDistrictName, e.target.value || undefined)}
                      className="appearance-none bg-blue-50/80 border border-blue-200 text-blue-900 font-bold rounded px-2.5 py-1 pr-6 outline-none transition-colors cursor-pointer text-xs"
                    >
                      <option value="">Pilih Kelurahan...</option>
                      {currentDistrict.subdistricts.map((s) => (
                        <option key={s.id} value={s.name}>
                          Kel. {s.name} ({s.metrics.strategyPriorityLabel})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 text-blue-600 absolute right-2 top-2 pointer-events-none" />
                  </div>
                )}
              </div>

              {/* Opacity & Insight Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 hidden md:flex">
                  <span className="text-[11px] text-[#607080]">Opasitas:</span>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-20 accent-[#2563EB] cursor-pointer"
                  />
                  <span className="font-mono text-[#607080] text-[11px]">{opacity}%</span>
                </div>

                <button
                  onClick={() => setShowInsightDrawer(!showInsightDrawer)}
                  className="text-xs text-[#2563EB] font-semibold hover:underline"
                >
                  {showInsightDrawer ? 'Tutup Panel' : 'Buka Panel Insight'}
                </button>
              </div>
            </div>

            {/* Main Interactive Leaflet Map */}
            <JawaTengahMap
              selectedRegencyName={selectedRegencyName}
              selectedDistrictName={selectedDistrictName}
              selectedSubdistrictName={selectedSubdistrictName}
              onDrillDownChange={handleDrillDownChange}
              activeStrategyFilter={activeStrategyFilter}
              activeLayers={layers}
              onToggleLayer={toggleLayer}
              isSplitCompareMode={isSplitMode}
              onToggleSplitMode={() => setIsSplitMode(!isSplitMode)}
              activeRadiusKm={activeRadiusKm}
              onSelectRadius={setActiveRadiusKm}
              onSelectCandidate={(cand) => setSelectedCandidate(cand)}
              onCompareLocations={(area) => {
                if (!comparisonAreas.includes(area)) {
                  setComparisonAreas((prev) => [...prev.slice(-4), area]);
                }
                setIsCompareModalOpen(true);
              }}
              onAskAIWhy={(q) => handleAskAI(q)}
              visualizationMode={visualizationMode}
              selectedSegmentFilter={selectedSegmentFilter}
              selectedProductFilter={selectedProductFilter}
              selectedStatusFilter={selectedStatusFilter}
              onSelectCustomerPoint={(cust) => setSelectedCustomerPoint(cust)}
              onViewCustomerInsight={(id) => {
                onShowToast(`Membuka profil analitik ${id}...`);
                onNavigateToScreen('pelanggan-360');
              }}
            />

            {/* ENHANCEMENT 13: Top Customer Areas Quick Jump Strip */}
            <div className="pt-2.5 border-t border-[#DDE3EA] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px]">
                <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                <span>Top Area Pelanggan:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {TOP_CUSTOMER_AREAS.map((item) => (
                  <button
                    key={item.rank}
                    onClick={() => {
                      handleDrillDownChange('Kota Semarang', 'Tembalang', item.name);
                      onShowToast(`Zoom ke ${item.name} (${item.customers.toLocaleString('id-ID')} Pelanggan)`);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 text-[10.5px] transition-colors flex items-center gap-1"
                  >
                    <span className="font-bold text-blue-600">{item.rank}.</span>
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span className="text-slate-400 font-mono text-[9.5px]">({item.customers.toLocaleString('id-ID')})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Analytical Panel: Micro Market & Customer Intelligence (4 cols) */}
        {showInsightDrawer && (
          <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4 flex flex-col justify-between shadow-2xs">
            <div className="space-y-4">
              {/* Header Title */}
              <div className="pb-3 border-b border-[#DDE3EA]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#0F7C7B]" />
                    <h3 className="font-bold text-xs text-[#17212B] uppercase tracking-wider">
                      Intelijen Sebaran Pelanggan
                    </h3>
                  </div>
                  {currentSubdistrict && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      Skor Konsentrasi: {currentSubdistrict.customerConcentrationScore}/100
                    </span>
                  )}
                </div>
                <div className="text-sm font-extrabold text-[#17212B]">
                  {selectedSubdistrictName ? `Kelurahan ${selectedSubdistrictName}` : selectedDistrictName ? `Kecamatan ${selectedDistrictName}` : selectedRegencyName}
                </div>
                <div className="text-[11px] text-[#607080]">
                  {selectedDistrictName ? `Kec. ${selectedDistrictName}, ` : ''}{selectedRegencyName} · Jawa Tengah
                </div>
              </div>

              {/* Micro Market / Customer KPI Cards */}
              {currentSubdistrict ? (
                <div className="space-y-3 animate-in fade-in duration-200">
                  {/* Primary 4 Micro KPI Cards */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                      <div className="text-[10.5px] text-[#607080]">Total Pelanggan</div>
                      <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                        {currentSubdistrict.metrics.existingCustomers.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-emerald-600 mt-0.5 font-medium">
                        Aktif: {currentSubdistrict.metrics.activeCustomers.toLocaleString('id-ID')}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                      <div className="text-[10.5px] text-[#607080]">High Value Customers</div>
                      <div className="text-base font-bold text-purple-700 mt-0.5 tabular-nums">
                        {currentSubdistrict.metrics.highValueCustomers.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-purple-600 mt-0.5">
                        {Math.round((currentSubdistrict.metrics.highValueCustomers / currentSubdistrict.metrics.existingCustomers) * 100)}% dari total
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                      <div className="text-[10.5px] text-[#607080]">Pelanggan Berisiko (At-Risk)</div>
                      <div className="text-base font-bold text-rose-600 mt-0.5 tabular-nums">
                        {currentSubdistrict.metrics.atRiskCustomers.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Dormant: {currentSubdistrict.metrics.dormantCustomers}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                      <div className="text-[10.5px] text-[#607080]">Di Luar Jangkauan Servis</div>
                      <div className="text-base font-bold text-amber-700 mt-0.5 tabular-nums">
                        {currentSubdistrict.metrics.customersOutsideCoverageCount.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-rose-600 mt-0.5 font-medium">Coverage Gap &gt;5 KM</div>
                    </div>
                  </div>

                  {/* Micro Density & Competitive Benchmark Card */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                    <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                      Matriks Sebaran &amp; Produk Unggulan
                    </div>
                    <div className="grid grid-cols-2 gap-y-1.5 text-[11px]">
                      <div className="text-slate-600">Skor Konsentrasi Pelanggan:</div>
                      <div className="font-bold text-slate-900 text-right">{currentSubdistrict.customerConcentrationScore}/100</div>

                      <div className="text-slate-600">Unit Terpopuler:</div>
                      <div className="font-bold text-blue-700 text-right truncate text-[10.5px]">
                        {currentSubdistrict.metrics.topProduct}
                      </div>

                      <div className="text-slate-600">Tekanan Kompetitor:</div>
                      <div className="font-bold text-amber-700 text-right">{currentSubdistrict.metrics.competitorsCount} Titik Bengkel</div>

                      <div className="text-slate-600">Jarak Rata-rata ke Outlet:</div>
                      <div className="font-bold text-slate-900 text-right">{currentSubdistrict.metrics.avgDistanceToOutletKm} KM</div>

                      <div className="text-slate-600">Potensi Pelanggan Baru:</div>
                      <div className="font-bold text-teal-700 text-right">{currentSubdistrict.metrics.potentialCustomers.toLocaleString('id-ID')} Prospek</div>
                    </div>
                  </div>

                  {/* Coverage Gap Warning Card */}
                  {currentSubdistrict.metrics.customersOutsideCoverageCount > 500 && (
                    <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-rose-900 font-bold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                          Deteksi Celah Cakupan (Coverage Gap)
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-rose-700 text-white font-bold text-[10px]">
                          Prioritas Tinggi
                        </span>
                      </div>
                      <p className="text-[11px] text-rose-800 leading-relaxed">
                        {currentSubdistrict.metrics.customersOutsideCoverageCount.toLocaleString('id-ID')} pelanggan berjarak &gt; 5 KM dari outlet resmi terdekat. Risiko migrasi ke {currentSubdistrict.metrics.competitorsCount} bengkel kompetitor di koridor Sigar Bencah tinggi.
                      </p>
                      <div className="pt-1 flex gap-2">
                        <button
                          onClick={() => {
                            setVisualizationMode('coverage-gap');
                            onShowToast('Mode Coverage Gap aktif');
                          }}
                          className="px-2.5 py-1 bg-rose-700 text-white rounded text-[10.5px] font-semibold hover:bg-rose-800 transition-colors"
                        >
                          Sorot Area Gap di Peta
                        </button>
                        <button
                          onClick={() => handleAskAI('Bagaimana mengatasi coverage gap di wilayah ini?')}
                          className="px-2.5 py-1 bg-white border border-rose-300 text-rose-800 rounded text-[10.5px] font-semibold hover:bg-rose-100 transition-colors"
                        >
                          Saran SERVEON AI
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Progressive Disclosure for Regency / District Level */
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs space-y-2">
                    <div className="font-bold text-[#2563EB] flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>{aiInsightData.headline}</span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-700 list-disc pl-4">
                      {aiInsightData.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Kecamatan quick selector */}
                  {currentRegency && currentRegency.districts.length > 0 && (
                    <div>
                      <div className="text-[11px] font-bold text-[#17212B] uppercase tracking-wider mb-2">
                        Pilih Kecamatan untuk Drill-Down:
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {currentRegency.districts.map((d) => (
                          <button
                            key={d.id}
                            onClick={() => handleDrillDownChange(selectedRegencyName, d.name, undefined)}
                            className="p-2 text-left rounded-lg border border-[#DDE3EA] hover:border-blue-400 hover:bg-blue-50/50 transition-colors flex flex-col justify-between"
                          >
                            <span className="font-bold text-slate-900">{d.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {d.totalCustomers.toLocaleString('id-ID')} Cust
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ENHANCEMENT 20: AI-Generated Geographic Insight & Ask SERVEON AI */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                    Ask SERVEON AI (Sebaran Pelanggan)
                  </span>
                </div>

                {/* Suggested Questions Chips */}
                <div className="flex flex-wrap gap-1">
                  {[
                    'Di mana pelanggan paling terkonsentrasi?',
                    'Di mana pelanggan High Value berada?',
                    'Pelanggan mana yang jauh dari outlet?',
                    'Area mana yang memiliki risiko retensi?'
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleAskAI(chip)}
                      className="px-2 py-0.5 rounded-full bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 text-[10px] transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Question Input */}
                <div className="flex items-center gap-1.5 pt-1">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                    placeholder="Tanyakan pola sebaran pelanggan..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-blue-600 placeholder:text-slate-400"
                  />
                  <button
                    onClick={() => handleAskAI()}
                    disabled={isAiLoading || !aiQuestion.trim()}
                    className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* AI Answer Box */}
                {(isAiLoading || aiAnswer) && (
                  <div className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-200 text-xs space-y-1 animate-in fade-in">
                    <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[10.5px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Jawaban SERVEON AI:</span>
                    </div>
                    {isAiLoading ? (
                      <div className="text-slate-500 text-[11px] animate-pulse">
                        Menganalisis data spasial sebaran pelanggan...
                      </div>
                    ) : (
                      <p className="text-slate-800 text-[11px] leading-relaxed">{aiAnswer}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Screen Navigation Button (Preserved) */}
            <div className="pt-3 border-t border-[#DDE3EA] space-y-2">
              <button
                onClick={() => onNavigateToScreen('pelanggan-360')}
                className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Lihat Profil Pelanggan 360 Terkait →</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Location Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-[#DDE3EA] shadow-2xl max-w-4xl w-full p-6 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
              <div>
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    Bandingkan Sebaran Pelanggan Wilayah (2–5 Kelurahan)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Komparasi mendalam konsentrasi pelanggan, nilai, risiko churn, dan celah outlet antar wilayah.
                </p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto border border-[#DDE3EA] rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F5F7FA] text-slate-700 border-b border-[#DDE3EA] text-[11px] font-bold">
                  <tr>
                    <th className="p-3">Parameter Analisis</th>
                    {comparedItems.map((area) => (
                      <th key={area.id} className="p-3 text-center border-l border-[#DDE3EA]">
                        <div className="font-extrabold text-slate-900 text-xs">{area.name}</div>
                        <div className="text-[10px] text-slate-500">{area.parentName}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE3EA] text-[11px]">
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Skor Konsentrasi Pelanggan</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold font-mono text-blue-700 border-l border-[#DDE3EA]">
                        {area.customerConcentrationScore}/100
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Total Pelanggan</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold font-mono border-l border-[#DDE3EA]">
                        {area.metrics.existingCustomers.toLocaleString('id-ID')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">High Value Customers</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold font-mono text-purple-700 border-l border-[#DDE3EA]">
                        {area.metrics.highValueCustomers.toLocaleString('id-ID')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">At-Risk Customers</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold font-mono text-rose-600 border-l border-[#DDE3EA]">
                        {area.metrics.atRiskCustomers.toLocaleString('id-ID')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Pelanggan di Luar Coverage (&gt;5 KM)</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold font-mono text-amber-700 border-l border-[#DDE3EA]">
                        {area.metrics.customersOutsideCoverageCount.toLocaleString('id-ID')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Tekanan Kompetitor</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold text-amber-700 border-l border-[#DDE3EA]">
                        {area.metrics.competitorsCount} Titik Bengkel
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Jarak Rata-rata ke Outlet</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold border-l border-[#DDE3EA]">
                        {area.metrics.avgDistanceToOutletKm} KM
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-blue-50/40">
                    <td className="p-3 font-bold text-blue-900">Skor Lokasi Strategis</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-black text-sm text-blue-700 border-l border-[#DDE3EA]">
                        {area.metrics.strategicLocationScore}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-500">
                Pilih wilayah untuk komparasi langsung di antarmuka peta.
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Tutup Komparasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
