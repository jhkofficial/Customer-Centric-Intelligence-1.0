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
  Compass
} from 'lucide-react';
import { JawaTengahMap, MapLayerState, DEFAULT_MAP_LAYERS } from '../components/map/JawaTengahMap';
import { ScreenId, StrategyType } from '../types';
import {
  JAWA_TENGAH_REGENCIES,
  GeoLevel,
  GeoItem,
  KecamatanItem,
  CandidateLocationItem,
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

  // Strategy Mode State (ALL | RETAIN | DEFEND | ACQUIRE)
  const [activeStrategyFilter, setActiveStrategyFilter] = useState<StrategyType | 'ALL'>('ALL');

  // Map Controls State
  const [layers, setLayers] = useState<MapLayerState>(DEFAULT_MAP_LAYERS);
  const [opacity, setOpacity] = useState(85);
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [showInsightDrawer, setShowInsightDrawer] = useState(true);

  // Radius Analysis State
  const [activeRadiusKm, setActiveRadiusKm] = useState<number | null>(null);

  // Selected Candidate Site State
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateLocationItem | null>(null);

  // Comparison State (2-5 areas)
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [comparisonAreas, setComparisonAreas] = useState<string[]>(['Meteseh', 'Sendangmulyo', 'Tembalang (Pusat Kampus)']);

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
      onShowToast(`Drill-down ke Kelurahan ${subdistrict}, ${district}`);
    } else if (district) {
      onShowToast(`Menampilkan Kecamatan ${district}`);
    } else if (regency) {
      onShowToast(`Wilayah: ${regency}`);
    }
  };

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

      if (lower.includes('potensi') || lower.includes('high potential') || lower.includes('mengapa')) {
        setAiAnswer(
          `Wilayah ${selectedSubdistrictName || selectedDistrictName || 'ini'} memiliki skor potensi pasar 91/100 karena pertumbuhan pemukiman baru (+14,2% YoY) dengan 1.480 prospek belum tergarap dan rata-rata kepemilikan motor 1,8 unit/KK.`
        );
      } else if (lower.includes('retention') || lower.includes('risiko') || lower.includes('churn')) {
        setAiAnswer(
          `Kelurahan Meteseh memiliki 620 pelanggan berisiko (19,1%) akibat jarak tempuh ke bengkel resmi terdekat mencapai 4,6 km, sehingga rentan beralih ke 7 bengkel kompetitor di sekitar Sigar Bencah.`
        );
      } else if (lower.includes('coverage') || lower.includes('cakupan') || lower.includes('layanan')) {
        setAiAnswer(
          `Zona timur Tembalang (Meteseh & Rowosari) membutuhkan ekspansi titik satelit servis cepat karena waktu tempuh saat ini melebihi 15 menit pada jam sibuk komuter.`
        );
      } else if (lower.includes('compare') || lower.includes('banding')) {
        setAiAnswer(
          `Perbandingan: Meteseh unggul pada potensi akuisisi baru (94 vs 86), sedangkan Sendangmulyo memiliki basis pelanggan aktif yang lebih besar (3.340 vs 2.630) namun tekanan kompetitor lebih tinggi.`
        );
      } else {
        setAiAnswer(
          `Berdasarkan data spasial SERVEON, wilayah ${selectedSubdistrictName || selectedDistrictName || 'terpilih'} direkomendasikan untuk strategi ${currentSubdistrict?.metrics.strategyPriorityLabel || 'OPTIMALISASI JARINGAN'}. Prioritaskan fasilitas booking Mobile Apps Fast Track dan layanan servis kunjung.`
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
    <div className="space-y-5 font-['Plus_Jakarta_Sans',sans-serif]">
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
          {/* ENHANCEMENT 6: RETAIN / DEFEND / ACQUIRE Map Strategy Mode Buttons */}
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
            <span>Bandingkan Wilayah ({comparisonAreas.length})</span>
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

      {/* Main Map Workspace with Overlay Controls */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Map Viewport (8 or 9 cols) */}
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

            {/* Split Mode or Primary Map */}
            {isSplitMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-[#17212B] bg-slate-100 px-2.5 py-1 rounded">
                    Layer A: Kepadatan Pelanggan &amp; Jaringan
                  </div>
                  <JawaTengahMap
                    selectedRegencyName={selectedRegencyName}
                    selectedDistrictName={selectedDistrictName}
                    selectedSubdistrictName={selectedSubdistrictName}
                    onDrillDownChange={handleDrillDownChange}
                    activeStrategyFilter={activeStrategyFilter}
                    activeLayers={{
                      ...layers,
                      customerDensity: true,
                      competitorDensity: false
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-[#17212B] bg-slate-100 px-2.5 py-1 rounded">
                    Layer B: Tekanan Kompetitor &amp; Peluang Akuisisi
                  </div>
                  <JawaTengahMap
                    selectedRegencyName={selectedRegencyName}
                    selectedDistrictName={selectedDistrictName}
                    selectedSubdistrictName={selectedSubdistrictName}
                    onDrillDownChange={handleDrillDownChange}
                    activeStrategyFilter={activeStrategyFilter}
                    activeLayers={{
                      ...layers,
                      customerDensity: false,
                      competitorDensity: true
                    }}
                  />
                </div>
              </div>
            ) : (
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
              />
            )}

            {/* Bottom Status Indicator */}
            <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-[#607080] border-t border-[#DDE3EA]">
              <div className="flex items-center gap-2">
                <span>Tingkat Aktif:</span>
                <span className="font-bold text-slate-800 uppercase">
                  {currentLevel === 'subdistrict'
                    ? `Kelurahan ${selectedSubdistrictName} (${currentSubdistrict?.metrics.strategyPriorityLabel})`
                    : currentLevel === 'district'
                    ? `Kecamatan ${selectedDistrictName}`
                    : selectedRegencyName}
                </span>
              </div>
              <div className="text-[10.5px]">
                Navigasi hierarki: klik batas poligon di peta untuk zoom in / klik breadcrumbs untuk kembali.
              </div>
            </div>
          </div>
        </div>

        {/* Right Analytical Panel: ENHANCEMENT 4 — Micro Market Intelligence (4 cols) */}
        {showInsightDrawer && (
          <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4 flex flex-col justify-between shadow-2xs">
            <div className="space-y-4">
              {/* Header Title depending on Drilldown Level */}
              <div className="pb-3 border-b border-[#DDE3EA]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#0F7C7B]" />
                    <h3 className="font-bold text-xs text-[#17212B] uppercase tracking-wider">
                      {currentLevel === 'subdistrict'
                        ? 'Micro Market Intelligence'
                        : currentLevel === 'district'
                        ? 'Intelijen Spasial Kecamatan'
                        : 'Intelijen Spasial Wilayah'}
                    </h3>
                  </div>
                  {currentSubdistrict && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        currentSubdistrict.strategy === 'DEFEND'
                          ? 'bg-rose-50 text-[#C73E3A] border border-rose-200'
                          : currentSubdistrict.strategy === 'RETAIN'
                          ? 'bg-amber-50 text-[#D97706] border border-amber-200'
                          : 'bg-teal-50 text-[#0F7C7B] border border-teal-200'
                      }`}
                    >
                      {currentSubdistrict.metrics.strategyPriorityLabel}
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

              {/* ENHANCEMENT 4: Micro Market Intelligence KPI Cards (At Kelurahan Level) */}
              {currentSubdistrict ? (
                <div className="space-y-3 animate-in fade-in duration-200">
                  {/* Primary 4 Micro KPI Cards */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                      <div className="text-[10.5px] text-[#607080]">Total Populasi</div>
                      <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                        {currentSubdistrict.metrics.population.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Penduduk Terdaftar</div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                      <div className="text-[10.5px] text-[#607080]">Pelanggan Eksisting</div>
                      <div className="text-base font-bold text-[#2563EB] mt-0.5 tabular-nums">
                        {currentSubdistrict.metrics.existingCustomers.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Aktif: {currentSubdistrict.metrics.activeCustomers.toLocaleString('id-ID')}
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
                      <div className="text-[10.5px] text-[#607080]">Potensi Pelanggan Baru</div>
                      <div className="text-base font-bold text-teal-700 mt-0.5 tabular-nums">
                        {currentSubdistrict.metrics.potentialCustomers.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-teal-600 mt-0.5 font-medium">White Space</div>
                    </div>
                  </div>

                  {/* Micro Density & Competitive Benchmark Card */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                    <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                      Matriks Tekanan Pasar &amp; Aksesibilitas
                    </div>
                    <div className="grid grid-cols-2 gap-y-1.5 text-[11px]">
                      <div className="text-slate-600">Customer Density:</div>
                      <div className="font-bold text-slate-900 text-right">{currentSubdistrict.metrics.customerDensityScore}/100</div>

                      <div className="text-slate-600">Tekanan Kompetitor:</div>
                      <div className="font-bold text-amber-700 text-right">{currentSubdistrict.metrics.competitorsCount} Bengkel</div>

                      <div className="text-slate-600">Cakupan Jaringan Resmi:</div>
                      <div className="font-bold text-slate-900 text-right truncate text-[10.5px]">
                        {currentSubdistrict.metrics.existingOutletCoverage}
                      </div>

                      <div className="text-slate-600">Jarak Rata-rata ke Outlet:</div>
                      <div className="font-bold text-blue-700 text-right">{currentSubdistrict.metrics.avgDistanceToOutletKm} KM</div>

                      <div className="text-slate-600">Skor Potensi Pasar:</div>
                      <div className="font-bold text-teal-700 text-right">{currentSubdistrict.metrics.marketPotentialScore}/100</div>

                      <div className="text-slate-600">Skor Lokasi Strategis:</div>
                      <div className="font-bold text-slate-900 text-right">{currentSubdistrict.metrics.strategicLocationScore}/100</div>
                    </div>
                  </div>

                  {/* Candidate Pin Callout if exists in this subdistrict */}
                  {currentSubdistrict.candidates && currentSubdistrict.candidates.length > 0 && (
                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-900 text-[11px] flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          Kandidat Lokasi: {currentSubdistrict.candidates[0].code}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white font-bold text-[10px]">
                          Skor {currentSubdistrict.candidates[0].strategicLocationScore}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-800 leading-relaxed">
                        {currentSubdistrict.candidates[0].name} — {currentSubdistrict.candidates[0].whyThisLocation}
                      </p>
                      <div className="pt-1 flex gap-2">
                        <button
                          onClick={() => {
                            setActiveRadiusKm(3);
                            onShowToast(`Radius 3 KM diaktifkan di ${currentSubdistrict.candidates![0].code}`);
                          }}
                          className="px-2.5 py-1 bg-emerald-700 text-white rounded text-[10.5px] font-semibold hover:bg-emerald-800 transition-colors"
                        >
                          Analisis Radius 3 KM
                        </button>
                        <button
                          onClick={() => handleAskAI(`Jelaskan analisis kandidat ${currentSubdistrict.candidates![0].code}`)}
                          className="px-2.5 py-1 bg-white border border-emerald-300 text-emerald-800 rounded text-[10.5px] font-semibold hover:bg-emerald-100 transition-colors"
                        >
                          Why This Location?
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

              {/* ENHANCEMENT 10: SERVEON AI Map Insight Q&A Panel */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                    Ask SERVEON AI (Spasial)
                  </span>
                </div>

                {/* Suggested Questions Chips */}
                <div className="flex flex-wrap gap-1">
                  {[
                    'Mengapa area ini berpotensi tinggi?',
                    'Kelurahan dengan risiko retensi tertinggi?',
                    'Area yang membutuhkan penambahan cakupan?',
                    'Bandingkan Meteseh dan Tembalang'
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
                    placeholder="Tanyakan analisis wilayah ini..."
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
                        Menganalisis data spasial mikro...
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
                onClick={() => onNavigateToScreen('jaringan-cakupan')}
                className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Evaluasi Jaringan &amp; Cakupan Lengkap →</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ENHANCEMENT 13: Location Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-[#DDE3EA] shadow-2xl max-w-4xl w-full p-6 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
              <div>
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    Bandingkan Intelijen Wilayah Mikro (2–5 Kelurahan)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Komparasi mendalam potensi pasar, tekanan kompetisi, dan peluang strategis antar wilayah.
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
                    <td className="p-3 font-semibold text-slate-700">Strategi Prioritas</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center border-l border-[#DDE3EA]">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-blue-50 text-blue-700">
                          {area.metrics.strategyPriorityLabel}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Existing Customers</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold font-mono border-l border-[#DDE3EA]">
                        {area.metrics.existingCustomers.toLocaleString('id-ID')}
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
                    <td className="p-3 font-semibold text-slate-700">Potential Customers</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold font-mono text-teal-700 border-l border-[#DDE3EA]">
                        {area.metrics.potentialCustomers.toLocaleString('id-ID')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Customer Density Score</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold border-l border-[#DDE3EA]">
                        {area.metrics.customerDensityScore}/100
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Market Potential</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold text-teal-700 border-l border-[#DDE3EA]">
                        {area.metrics.marketPotentialScore}/100
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Tekanan Kompetitor</td>
                    {comparedItems.map((area) => (
                      <td key={area.id} className="p-3 text-center font-bold text-amber-700 border-l border-[#DDE3EA]">
                        {area.metrics.competitorsCount} Titik
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
