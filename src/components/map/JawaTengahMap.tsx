import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  Layers,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Building2,
  Compass,
  AlertTriangle,
  MapPin,
  Shield,
  Target,
  Sparkles,
  Info,
  Map as MapIcon,
  Globe,
  Search,
  ChevronRight,
  CircleDot,
  Radio,
  X,
  Check
} from 'lucide-react';
import { StrategyType } from '../../types';
import { REGENCIES_DATA, STRATEGIC_PRIORITIES, CANDIDATE_LOCATIONS } from '../../data/mockData';
import {
  JAWA_TENGAH_REGENCIES,
  GeoLevel,
  GeoItem,
  KecamatanItem,
  RegencyGeoItem,
  CustomerCluster,
  CandidateLocationItem,
  searchGeoIndex
} from '../../data/geographicDrilldownData';

export type MapTileProvider = 'openstreetmap' | 'google-roadmap' | 'google-satellite' | 'carto-light' | 'carto-dark';

export interface MapLayerState {
  customerDensity: boolean;
  customerDistribution: boolean;
  retentionRisk: boolean;
  dormantCustomer: boolean;
  highValueCustomer: boolean;
  prospectPotential: boolean;
  marketPotential: boolean;
  competitorDensity: boolean;
  existingOutlet: boolean;
  dealer: boolean;
  servicePoint: boolean;
  poi: boolean;
  accessibility: boolean;
  populationDensity: boolean;
  opportunityZone: boolean;
  candidateLocation: boolean;
  administrativeBoundary: boolean;
  // Backward compatibility keys
  customerValue?: boolean;
  outlets?: boolean;
  competitors?: boolean;
  catchments?: boolean;
  [key: string]: boolean | undefined;
}

export const DEFAULT_MAP_LAYERS: MapLayerState = {
  customerDensity: true,
  customerDistribution: true,
  retentionRisk: true,
  dormantCustomer: false,
  highValueCustomer: true,
  prospectPotential: true,
  marketPotential: true,
  competitorDensity: true,
  existingOutlet: true,
  dealer: true,
  servicePoint: true,
  poi: true,
  accessibility: false,
  populationDensity: false,
  opportunityZone: true,
  candidateLocation: true,
  administrativeBoundary: true
};

interface MapProps {
  selectedAreaId?: string;
  onSelectArea?: (areaName: string) => void;
  activeStrategyFilter?: StrategyType | 'ALL';
  showCandidatePins?: boolean;
  activeLayers?: Partial<MapLayerState>;
  onToggleLayer?: (layerKey: string) => void;
  isSplitCompareMode?: boolean;
  onToggleSplitMode?: () => void;
  // Hierarchical Drill-down extensions
  currentGeoLevel?: GeoLevel;
  selectedRegencyName?: string;
  selectedDistrictName?: string;
  selectedSubdistrictName?: string;
  onDrillDownChange?: (regency?: string, district?: string, subdistrict?: string) => void;
  activeRadiusKm?: number | null;
  onSelectRadius?: (km: number | null) => void;
  onSelectCandidate?: (candidate: CandidateLocationItem) => void;
  onCompareLocations?: (item: string) => void;
  onAskAIWhy?: (question: string) => void;
}

// 48 Simulated Company Outlets across Jawa Tengah
const COMPANY_OUTLETS: Array<{ id: string; name: string; type: 'Dealer 3S' | 'Bengkel H23' | 'Satelit'; lat: number; lng: number }> = [
  { id: 'out-1', name: 'Dealer Pandanaran Semarang', type: 'Dealer 3S', lat: -6.9892, lng: 110.4140 },
  { id: 'out-2', name: 'Dealer Pemuda Semarang', type: 'Dealer 3S', lat: -6.9780, lng: 110.4180 },
  { id: 'out-3', name: 'Dealer Majapahit Semarang Timur', type: 'Dealer 3S', lat: -7.0010, lng: 110.4520 },
  { id: 'out-4', name: 'Dealer Tembalang Motor', type: 'Bengkel H23', lat: -7.0495, lng: 110.4410 },
  { id: 'out-5', name: 'Dealer Setiabudi Banyumanik', type: 'Dealer 3S', lat: -7.0680, lng: 110.4150 },
  { id: 'out-6', name: 'Dealer Slamet Riyadi Solo', type: 'Dealer 3S', lat: -7.5680, lng: 110.8190 },
  { id: 'out-7', name: 'Dealer Urip Sumoharjo Solo', type: 'Bengkel H23', lat: -7.5610, lng: 110.8350 },
  { id: 'out-8', name: 'Dealer HR Soebrantas Purwokerto', type: 'Dealer 3S', lat: -7.4200, lng: 109.2380 },
  { id: 'out-9', name: 'Dealer Kampus Unsoed Purwokerto', type: 'Satelit', lat: -7.4040, lng: 109.2480 },
  { id: 'out-10', name: 'Dealer Ahmad Yani Kudus', type: 'Dealer 3S', lat: -6.8080, lng: 110.8420 },
  { id: 'out-11', name: 'Dealer Diponegoro Salatiga', type: 'Dealer 3S', lat: -7.3290, lng: 110.5050 },
  { id: 'out-12', name: 'Dealer Pahlawan Magelang', type: 'Dealer 3S', lat: -7.4720, lng: 110.2190 },
  { id: 'out-13', name: 'Dealer Gajah Mada Tegal', type: 'Dealer 3S', lat: -6.8710, lng: 109.1310 },
  { id: 'out-14', name: 'Dealer Gatot Subroto Cilacap', type: 'Dealer 3S', lat: -7.7120, lng: 109.0210 },
  { id: 'out-15', name: 'Dealer Hayam Wuruk Pekalongan', type: 'Dealer 3S', lat: -6.8890, lng: 109.6710 }
];

// 38 Simulated Competitor Locations
const COMPETITOR_OUTLETS: Array<{ id: string; name: string; lat: number; lng: number }> = [
  { id: 'comp-1', name: 'Kompetitor Alpha Semarang Timur', lat: -6.9810, lng: 110.4590 },
  { id: 'comp-2', name: 'Kompetitor Sigar Bencah Meteseh', lat: -7.0548, lng: 110.4645 },
  { id: 'comp-3', name: 'Kompetitor Dinar Mas Rowosari', lat: -7.0620, lng: 110.4710 },
  { id: 'comp-4', name: 'Kompetitor Klipang Sendangmulyo', lat: -7.0380, lng: 110.4670 },
  { id: 'comp-5', name: 'Kompetitor Kudus Sentra', lat: -6.8150, lng: 110.8390 },
  { id: 'comp-6', name: 'Kompetitor Solo Baru', lat: -7.6020, lng: 110.8140 },
  { id: 'comp-7', name: 'Kompetitor Purwokerto Barat', lat: -7.4110, lng: 109.2290 },
  { id: 'comp-8', name: 'Kompetitor Cilacap Pelabuhan', lat: -7.6950, lng: 109.0320 }
];

// Key POIs
const STRATEGIC_POIS: Array<{ id: string; name: string; category: string; lat: number; lng: number }> = [
  { id: 'poi-1', name: 'Simpang Lima Commercial Hub', category: 'Komersial', lat: -6.9904, lng: 110.4229 },
  { id: 'poi-2', name: 'Universitas Diponegoro (UNDIP)', category: 'Pendidikan', lat: -7.0493, lng: 110.4398 },
  { id: 'poi-3', name: 'Pasar Meteseh & Sentra Bisnis Lokal', category: 'Perdagangan', lat: -7.0530, lng: 110.4615 },
  { id: 'poi-4', name: 'RSUD KRMT Wongsonegoro Ketileng', category: 'Fasilitas Publik', lat: -7.0260, lng: 110.4610 },
  { id: 'poi-5', name: 'Stasiun Solo Balapan', category: 'Transportasi', lat: -7.5583, lng: 110.8214 },
  { id: 'poi-6', name: 'Universitas Jenderal Soedirman', category: 'Pendidikan', lat: -7.4048, lng: 109.2483 }
];

export const JawaTengahMap: React.FC<MapProps> = ({
  selectedAreaId = 'Kota Semarang',
  onSelectArea,
  activeStrategyFilter = 'ALL',
  showCandidatePins = true,
  activeLayers: propActiveLayers,
  onToggleLayer,
  isSplitCompareMode = false,
  onToggleSplitMode,
  selectedRegencyName = 'Kota Semarang',
  selectedDistrictName,
  selectedSubdistrictName,
  onDrillDownChange,
  activeRadiusKm,
  onSelectRadius,
  onSelectCandidate,
  onCompareLocations,
  onAskAIWhy
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerGroupRef = useRef<L.LayerGroup | null>(null);
  const polygonGroupRef = useRef<L.LayerGroup | null>(null);
  const radiusGroupRef = useRef<L.LayerGroup | null>(null);

  const [tileProvider, setTileProvider] = useState<MapTileProvider>('openstreetmap');
  const [showLayerDrawer, setShowLayerDrawer] = useState(false);
  const [showRadiusMenu, setShowRadiusMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchGeoIndex>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Local copy of layers
  const mergedLayers: MapLayerState = {
    ...DEFAULT_MAP_LAYERS,
    ...(propActiveLayers as any)
  };

  // Determine current active geographic level
  const currentLevel: GeoLevel = selectedSubdistrictName
    ? 'subdistrict'
    : selectedDistrictName
    ? 'district'
    : selectedRegencyName && selectedRegencyName !== 'Semua Kabupaten/Kota'
    ? 'regency'
    : 'province';

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [-7.150975, 110.140259],
        zoom: 8.4,
        zoomControl: false,
        attributionControl: true
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      map.attributionControl.setPrefix(
        '<span class="text-[9px] text-slate-500 font-medium">SERVEON Intelijen Spasial Jawa Tengah</span>'
      );

      polygonGroupRef.current = L.layerGroup().addTo(map);
      markerGroupRef.current = L.layerGroup().addTo(map);
      radiusGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '&copy; OpenStreetMap kontributor';

    switch (tileProvider) {
      case 'google-roadmap':
        tileUrl = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
        attribution = '&copy; Google Maps';
        break;
      case 'google-satellite':
        tileUrl = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
        attribution = '&copy; Google Maps Satelit & Hybrid';
        break;
      case 'carto-light':
        tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
        attribution = '&copy; OpenStreetMap contributors &copy; CARTO';
        break;
      case 'carto-dark':
        tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        attribution = '&copy; OpenStreetMap contributors &copy; CARTO';
        break;
      case 'openstreetmap':
      default:
        break;
    }

    const newTileLayer = L.tileLayer(tileUrl, { maxZoom: 19, attribution, subdomains: 'abcd' });
    newTileLayer.addTo(map);
    tileLayerRef.current = newTileLayer;
  }, [tileProvider]);

  // Handle Smooth Zoom Transitions based on Geographic Level
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (currentLevel === 'province') {
      map.flyTo([-7.150975, 110.140259], 8.4, { duration: 0.8 });
    } else if (currentLevel === 'regency') {
      const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
      if (reg) {
        map.flyTo(reg.center, reg.zoom, { duration: 0.8 });
      }
    } else if (currentLevel === 'district') {
      const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
      const dist = reg?.districts.find((d) => d.name === selectedDistrictName);
      if (dist) {
        map.flyTo(dist.center, dist.zoom, { duration: 0.8 });
      }
    } else if (currentLevel === 'subdistrict') {
      const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
      const dist = reg?.districts.find((d) => d.name === selectedDistrictName);
      const sub = dist?.subdistricts.find((s) => s.name === selectedSubdistrictName);
      if (sub) {
        map.flyTo(sub.center, sub.zoom, { duration: 0.8 });
      }
    }
  }, [currentLevel, selectedRegencyName, selectedDistrictName, selectedSubdistrictName]);

  // Render Polygons and Boundaries (Drill-down Hierarchy)
  useEffect(() => {
    const polyGroup = polygonGroupRef.current;
    if (!polyGroup) return;
    polyGroup.clearLayers();

    if (!mergedLayers.administrativeBoundary) return;

    // Helper for strategy colors
    const getStrategyColor = (strategy: 'RETAIN' | 'DEFEND' | 'ACQUIRE') => {
      if (strategy === 'DEFEND') return '#C73E3A';
      if (strategy === 'RETAIN') return '#D97706';
      return '#0F7C7B';
    };

    // LEVEL 1: PROVINCE LEVEL (Show Regencies / Kab-Kota boundaries)
    if (currentLevel === 'province') {
      JAWA_TENGAH_REGENCIES.forEach((reg) => {
        const isMatchStrategy = activeStrategyFilter === 'ALL' || reg.strategy === activeStrategyFilter;
        const color = getStrategyColor(reg.strategy);
        const opacity = isMatchStrategy ? 0.18 : 0.05;

        const polygon = L.polygon(reg.polygon, {
          color: isMatchStrategy ? color : '#94A3B8',
          weight: isMatchStrategy ? 2 : 1,
          fillColor: color,
          fillOpacity: opacity
        });

        polygon.bindTooltip(
          `<strong>${reg.name}</strong><br/>Pelanggan: ${reg.totalCustomers.toLocaleString('id-ID')}<br/>Strategi: ${reg.strategy}`,
          { className: 'serveon-leaflet-tooltip' }
        );

        polygon.on('click', () => {
          if (onDrillDownChange) {
            onDrillDownChange(reg.name, undefined, undefined);
          }
          if (onSelectArea) onSelectArea(reg.name);
        });

        polygon.addTo(polyGroup);
      });
    }

    // LEVEL 2: REGENCY LEVEL (Show Kecamatan boundaries)
    if (currentLevel === 'regency') {
      const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
      if (reg && reg.districts.length > 0) {
        reg.districts.forEach((dist) => {
          const isMatchStrategy = activeStrategyFilter === 'ALL' || dist.strategy === activeStrategyFilter;
          const color = getStrategyColor(dist.strategy);

          const polygon = L.polygon(dist.polygon, {
            color: isMatchStrategy ? color : '#94A3B8',
            weight: 2,
            dashArray: '3, 3',
            fillColor: color,
            fillOpacity: isMatchStrategy ? 0.22 : 0.06
          });

          polygon.bindTooltip(
            `<strong>Kecamatan ${dist.name}</strong><br/>Pelanggan: ${dist.totalCustomers.toLocaleString('id-ID')}<br/>Peluang: ${dist.potentialCustomers.toLocaleString('id-ID')}<br/>Strategi: ${dist.strategy} (Skor ${dist.score})<br/><em class="text-[10px] text-blue-600">Klik untuk jelajahi Kelurahan</em>`,
            { className: 'serveon-leaflet-tooltip' }
          );

          polygon.on('click', () => {
            if (onDrillDownChange) {
              onDrillDownChange(selectedRegencyName, dist.name, undefined);
            }
          });

          polygon.addTo(polyGroup);
        });
      }
    }

    // LEVEL 3 & 4: KECAMATAN / KELURAHAN LEVEL (Show Kelurahan boundaries with deep micro market tooltip)
    if (currentLevel === 'district' || currentLevel === 'subdistrict') {
      const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
      const dist = reg?.districts.find((d) => d.name === selectedDistrictName);

      if (dist && dist.subdistricts.length > 0) {
        dist.subdistricts.forEach((sub) => {
          const isSelected = selectedSubdistrictName === sub.name;
          const isMatchStrategy = activeStrategyFilter === 'ALL' || sub.strategy === activeStrategyFilter;
          const color = getStrategyColor(sub.strategy);

          const polygon = L.polygon(sub.polygon, {
            color: isSelected ? '#2563EB' : color,
            weight: isSelected ? 3.5 : 2,
            fillColor: color,
            fillOpacity: isSelected ? 0.35 : isMatchStrategy ? 0.2 : 0.08
          });

          // ENHANCEMENT 7: Kelurahan Hover Tooltip matching user example
          const tooltipHtml = `
            <div class="serveon-kelurahan-tooltip">
              <div class="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 mb-1.5">
                <span class="font-bold text-xs text-slate-900">Kelurahan ${sub.name}</span>
                <span style="background-color: ${color}; color: white;" class="px-1.5 py-0.5 rounded text-[9.5px] font-black">
                  ${sub.metrics.strategyPriorityLabel}
                </span>
              </div>
              <div class="space-y-1 text-[11px]">
                <div class="flex justify-between text-slate-600">
                  <span>Existing Customers:</span>
                  <strong class="text-slate-900 font-mono">${sub.metrics.existingCustomers.toLocaleString('id-ID')}</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>At Risk:</span>
                  <strong class="text-rose-600 font-mono">${sub.metrics.atRiskCustomers.toLocaleString('id-ID')}</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Potential Customers:</span>
                  <strong class="text-teal-700 font-mono">${sub.metrics.potentialCustomers.toLocaleString('id-ID')}</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Competitors:</span>
                  <strong class="text-amber-700 font-mono">${sub.metrics.competitorsCount} Titik</strong>
                </div>
                <div class="grid grid-cols-3 gap-1 pt-1.5 mt-1 border-t border-slate-100 text-[10px] text-center font-semibold">
                  <div class="bg-slate-50 p-1 rounded border border-slate-100">Densitas: <span class="text-blue-700 font-bold">${sub.metrics.customerDensityScore}</span></div>
                  <div class="bg-slate-50 p-1 rounded border border-slate-100">Potensi: <span class="text-teal-700 font-bold">${sub.metrics.marketPotentialScore}</span></div>
                  <div class="bg-slate-50 p-1 rounded border border-slate-100">Skor: <span class="text-slate-900 font-bold">${sub.metrics.strategicLocationScore}</span></div>
                </div>
              </div>
            </div>
          `;

          polygon.bindTooltip(tooltipHtml, {
            sticky: true,
            direction: 'auto',
            className: 'serveon-leaflet-tooltip'
          });

          polygon.on('click', () => {
            if (onDrillDownChange) {
              onDrillDownChange(selectedRegencyName, selectedDistrictName, sub.name);
            }
          });

          polygon.addTo(polyGroup);
        });
      }
    }
  }, [
    currentLevel,
    selectedRegencyName,
    selectedDistrictName,
    selectedSubdistrictName,
    activeStrategyFilter,
    mergedLayers.administrativeBoundary,
    onDrillDownChange,
    onSelectArea
  ]);

  // Render Markers (Clusters, Candidate Locations, Outlets, POIs, Competitors)
  useEffect(() => {
    const markerGroup = markerGroupRef.current;
    if (!markerGroup) return;
    markerGroup.clearLayers();

    // 1. Strategic Priority Badges (Province & Regency Level)
    if (currentLevel === 'province' || currentLevel === 'regency') {
      const visiblePriorities = activeStrategyFilter === 'ALL'
        ? STRATEGIC_PRIORITIES
        : STRATEGIC_PRIORITIES.filter((p) => p.strategy === activeStrategyFilter);

      visiblePriorities.forEach((prio) => {
        const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === prio.name || r.name === prio.kabupaten);
        if (!reg) return;

        const strategyColor =
          prio.strategy === 'DEFEND'
            ? '#C73E3A'
            : prio.strategy === 'RETAIN'
            ? '#D97706'
            : '#0F7C7B';

        const isSelected = selectedRegencyName === prio.name;
        const shadowClass = isSelected ? 'ring-4 ring-blue-500/80 scale-110' : 'shadow-md';

        const html = `
          <div class="flex flex-col items-center cursor-pointer transition-transform hover:scale-110 ${shadowClass}">
            <div style="background-color: ${strategyColor}; border: 2px solid white;" class="px-2 py-0.5 rounded-full text-white text-[10px] font-black flex items-center gap-1 shadow-sm whitespace-nowrap">
              <span>${prio.strategy}</span>
              <span class="bg-black/30 px-1 py-0.2 rounded font-mono">${prio.score}</span>
            </div>
            <div style="background-color: ${strategyColor}; border: 1.5px solid white;" class="w-2.5 h-2.5 rotate-45 -mt-1.5 shadow-xs"></div>
            <div class="bg-slate-900/90 text-white font-bold text-[9.5px] px-1.5 py-0.5 rounded shadow-sm mt-0.5 whitespace-nowrap border border-slate-700">
              ${prio.name}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          html,
          className: 'serveon-custom-pin',
          iconSize: [80, 40],
          iconAnchor: [40, 36]
        });

        const marker = L.marker(reg.center, { icon: customIcon });

        marker.on('click', () => {
          if (onDrillDownChange) {
            onDrillDownChange(prio.name, undefined, undefined);
          }
          if (onSelectArea) onSelectArea(prio.name);
        });

        marker.addTo(markerGroup);
      });
    }

    // 2. ENHANCEMENT 8: Customer Clusters (at District & Subdistrict Zoom Levels)
    if ((currentLevel === 'district' || currentLevel === 'subdistrict') && mergedLayers.customerDensity) {
      const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
      const dist = reg?.districts.find((d) => d.name === selectedDistrictName);

      dist?.subdistricts.forEach((sub) => {
        sub.clusters?.forEach((cluster) => {
          const clusterColor = cluster.retentionRisk === 'High' ? '#DC2626' : cluster.retentionRisk === 'Medium' ? '#D97706' : '#2563EB';

          const html = `
            <div class="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
              <div style="background-color: ${clusterColor};" class="w-9 h-9 rounded-full text-white border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs">
                ${cluster.customers > 1000 ? `${(cluster.customers / 1000).toFixed(1)}k` : cluster.customers}
              </div>
              <div class="bg-white/95 text-slate-900 text-[9.5px] font-bold px-1.5 py-0.5 rounded border border-slate-200 shadow-xs -mt-1 whitespace-nowrap max-w-[120px] truncate">
                ${cluster.name.split(' ')[1] || cluster.name}
              </div>
            </div>
          `;

          const clusterIcon = L.divIcon({
            html,
            className: 'serveon-cluster-pin',
            iconSize: [36, 46],
            iconAnchor: [18, 23]
          });

          const marker = L.marker([cluster.lat, cluster.lng], { icon: clusterIcon });

          const clusterPopup = `
            <div class="p-3 font-['Plus_Jakarta_Sans',sans-serif] text-xs max-w-xs space-y-2">
              <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span class="font-bold text-slate-900">${cluster.name}</span>
                <span class="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">Kluster Pelanggan</span>
              </div>
              <div class="space-y-1 text-[11px] text-slate-600">
                <div class="flex justify-between"><span>Total Pelanggan:</span> <strong class="text-slate-900">${cluster.customers.toLocaleString('id-ID')}</strong></div>
                <div class="flex justify-between"><span>Segmen Dominan:</span> <strong class="text-slate-900">${cluster.dominantSegment}</strong></div>
                <div class="flex justify-between"><span>Risiko Retensi:</span> <strong class="${cluster.retentionRisk === 'High' ? 'text-red-600' : 'text-slate-800'}">${cluster.retentionRisk} (${cluster.riskPercent}%)</strong></div>
                <div class="flex justify-between"><span>Jarak Rata-rata ke Outlet:</span> <strong class="text-slate-900">${cluster.avgDistanceToOutletKm} KM</strong></div>
              </div>
              <div class="p-2 rounded bg-amber-50 border border-amber-200 text-[10.5px] text-amber-900">
                <strong>Rekomendasi:</strong> ${cluster.recommendation}
              </div>
            </div>
          `;

          marker.bindPopup(clusterPopup);
          marker.addTo(markerGroup);
        });
      });
    }

    // 3. ENHANCEMENT 12: Candidate Locations (CL-017, CL-018, etc.)
    if (mergedLayers.candidateLocation) {
      const allCandidates: CandidateLocationItem[] = [];
      JAWA_TENGAH_REGENCIES.forEach((r) => {
        r.districts.forEach((d) => {
          d.subdistricts.forEach((s) => {
            if (s.candidates) allCandidates.push(...s.candidates);
          });
        });
      });

      allCandidates.forEach((cand) => {
        const html = `
          <div class="flex flex-col items-center cursor-pointer hover:scale-125 transition-transform">
            <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center border-2 border-white shadow-xl animate-pulse">
              ${cand.code}
            </div>
            <div class="bg-emerald-950 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow -mt-1 whitespace-nowrap border border-emerald-700">
              Skor ${cand.strategicLocationScore}
            </div>
          </div>
        `;

        const candIcon = L.divIcon({
          html,
          className: 'serveon-candidate-pin',
          iconSize: [32, 42],
          iconAnchor: [16, 42]
        });

        const marker = L.marker([cand.lat, cand.lng], { icon: candIcon });

        const popupHtml = `
          <div class="p-3 font-['Plus_Jakarta_Sans',sans-serif] text-xs max-w-sm space-y-2.5">
            <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <div>
                <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Kandidat Titik Baru</span>
                <h4 class="font-bold text-sm text-slate-900">${cand.code} — ${cand.name}</h4>
                <div class="text-[10.5px] text-slate-500">${cand.kelurahan}, ${cand.kecamatan}, ${cand.kabupaten}</div>
              </div>
              <div class="text-right">
                <span class="text-lg font-black text-emerald-700">${cand.strategicLocationScore}</span>
                <div class="text-[9px] text-slate-500 font-semibold">SKOR STRATEGIS</div>
              </div>
            </div>

            <!-- Scores Grid -->
            <div class="grid grid-cols-2 gap-1.5 text-[10.5px] bg-slate-50 p-2 rounded-lg border border-slate-200">
              <div class="flex justify-between"><span>Customer Density:</span> <strong>${cand.customerDensityScore}/100</strong></div>
              <div class="flex justify-between"><span>Market Potential:</span> <strong class="text-teal-700">${cand.marketPotential}/100</strong></div>
              <div class="flex justify-between"><span>Aksesibilitas:</span> <strong>${cand.accessibility}/100</strong></div>
              <div class="flex justify-between"><span>Potensi Akuisisi:</span> <strong class="text-blue-700">${cand.acquisitionPotential}/100</strong></div>
              <div class="flex justify-between"><span>Tekanan Kompetisi:</span> <strong class="text-amber-700">${cand.competitionPressure}/100</strong></div>
              <div class="flex justify-between"><span>Risiko Kanibalisasi:</span> <strong>${cand.cannibalizationRisk}</strong></div>
            </div>

            <!-- Action Buttons: Analyze, Compare, Why This Location? -->
            <div class="grid grid-cols-3 gap-1.5 pt-1">
              <button id="btn-analyze-${cand.code}" class="py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10.5px] font-bold text-center transition-colors">
                Analyze (Radius)
              </button>
              <button id="btn-compare-${cand.code}" class="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[10.5px] font-semibold text-center border border-slate-300 transition-colors">
                Compare
              </button>
              <button id="btn-why-${cand.code}" class="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded text-[10.5px] font-semibold text-center border border-emerald-300 transition-colors">
                Why This Location?
              </button>
            </div>
          </div>
        `;

        marker.bindPopup(popupHtml, { maxWidth: 320 });

        marker.on('popupopen', () => {
          const btnAnalyze = document.getElementById(`btn-analyze-${cand.code}`);
          const btnCompare = document.getElementById(`btn-compare-${cand.code}`);
          const btnWhy = document.getElementById(`btn-why-${cand.code}`);

          if (btnAnalyze) {
            btnAnalyze.onclick = () => {
              if (onSelectRadius) onSelectRadius(3);
              if (onSelectCandidate) onSelectCandidate(cand);
              marker.closePopup();
            };
          }
          if (btnCompare) {
            btnCompare.onclick = () => {
              if (onCompareLocations) onCompareLocations(cand.name);
              marker.closePopup();
            };
          }
          if (btnWhy) {
            btnWhy.onclick = () => {
              if (onAskAIWhy) onAskAIWhy(`Jelaskan mengapa kandidat ${cand.code} di ${cand.kelurahan} memiliki skor strategis ${cand.strategicLocationScore}?`);
              marker.closePopup();
            };
          }
        });

        marker.addTo(markerGroup);
      });
    }

    // 4. Outlets & Service Points
    if (mergedLayers.existingOutlet || mergedLayers.dealer) {
      COMPANY_OUTLETS.forEach((outlet) => {
        const outletIcon = L.divIcon({
          html: `
            <div class="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center border-2 border-white shadow-md hover:scale-125 transition-transform" title="${outlet.name}">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
            </div>
          `,
          className: 'serveon-outlet-pin',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([outlet.lat, outlet.lng], { icon: outletIcon });
        marker.bindPopup(`<strong>Outlet Resmi SERVEON (${outlet.type})</strong><br/>${outlet.name}`);
        marker.addTo(markerGroup);
      });
    }

    // 5. Competitor Density Points
    if (mergedLayers.competitorDensity) {
      COMPETITOR_OUTLETS.forEach((comp) => {
        const compIcon = L.divIcon({
          html: `
            <div class="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center border-2 border-white shadow-md hover:scale-125 transition-transform" title="${comp.name}">
              <span class="text-[9px] font-black">▲</span>
            </div>
          `,
          className: 'serveon-comp-pin',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = L.marker([comp.lat, comp.lng], { icon: compIcon });
        marker.bindPopup(`<strong>Titik Tekanan Kompetitor</strong><br/>${comp.name}`);
        marker.addTo(markerGroup);
      });
    }

    // 6. POIs
    if (mergedLayers.poi) {
      STRATEGIC_POIS.forEach((poi) => {
        const poiIcon = L.divIcon({
          html: `
            <div class="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center border border-white shadow-sm hover:scale-125 transition-transform" title="${poi.name}">
              <span class="text-[8px] font-bold">POI</span>
            </div>
          `,
          className: 'serveon-poi-pin',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon });
        marker.bindPopup(`<strong>Pusat Keramaian (POI):</strong><br/>${poi.name}<br/><span class="text-[10.5px] text-purple-700">${poi.category}</span>`);
        marker.addTo(markerGroup);
      });
    }
  }, [
    currentLevel,
    selectedRegencyName,
    selectedDistrictName,
    selectedSubdistrictName,
    activeStrategyFilter,
    mergedLayers,
    onDrillDownChange,
    onSelectArea,
    onSelectRadius,
    onSelectCandidate,
    onCompareLocations,
    onAskAIWhy
  ]);

  // ENHANCEMENT 11: Render Radius Analysis Circle
  useEffect(() => {
    const radGroup = radiusGroupRef.current;
    if (!radGroup) return;
    radGroup.clearLayers();

    if (!activeRadiusKm) return;

    // Use current subdistrict or district center
    let center: [number, number] = [-7.0542, 110.4632]; // Default Meteseh
    if (selectedSubdistrictName) {
      const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
      const dist = reg?.districts.find((d) => d.name === selectedDistrictName);
      const sub = dist?.subdistricts.find((s) => s.name === selectedSubdistrictName);
      if (sub) center = sub.center;
    }

    const radiusMeters = activeRadiusKm * 1000;

    const circle = L.circle(center, {
      radius: radiusMeters,
      color: '#2563EB',
      weight: 2,
      dashArray: '6, 6',
      fillColor: '#3B82F6',
      fillOpacity: 0.1
    });

    circle.bindTooltip(`Radius Analisis: ${activeRadiusKm} KM (${(activeRadiusKm * 10).toFixed(0)} Menit Perjalanan)`, {
      direction: 'top',
      permanent: true,
      className: 'serveon-leaflet-tooltip'
    });

    circle.addTo(radGroup);
  }, [activeRadiusKm, selectedRegencyName, selectedDistrictName, selectedSubdistrictName]);

  // Search Query Handler
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length >= 2) {
      const res = searchGeoIndex(q);
      setSearchResults(res);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSelectSearchResult = (item: ReturnType<typeof searchGeoIndex>[0]) => {
    setSearchQuery(item.name);
    setShowSearchResults(false);

    if (item.type === 'Province') {
      if (onDrillDownChange) onDrillDownChange(undefined, undefined, undefined);
    } else if (item.type === 'Kabupaten/Kota') {
      if (onDrillDownChange) onDrillDownChange(item.name, undefined, undefined);
    } else if (item.type === 'Kecamatan') {
      if (onDrillDownChange) onDrillDownChange(item.regencyName, item.name, undefined);
    } else if (item.type === 'Kelurahan/Desa') {
      if (onDrillDownChange) onDrillDownChange(item.regencyName, item.districtName, item.name);
    } else if (item.type === 'Kandidat') {
      if (onDrillDownChange) onDrillDownChange(item.regencyName, item.districtName, item.subdistrictName);
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(item.center, item.zoom, { duration: 0.8 });
    }
  };

  const handleResetZoom = () => {
    if (onDrillDownChange) onDrillDownChange(undefined, undefined, undefined);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([-7.150975, 110.140259], 8.4, { animate: true });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden border border-[#DDE3EA] shadow-2xs select-none transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 h-[calc(100vh-2rem)] bg-white shadow-2xl' : 'h-[540px] bg-slate-100'
      }`}
    >
      {/* ENHANCEMENT 2: Breadcrumb Navigation (Subtle, Clean, Clickable) */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-2">
        <div className="bg-white/95 backdrop-blur-md border border-[#DDE3EA] rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-xs text-xs">
          <button
            onClick={() => onDrillDownChange && onDrillDownChange(undefined, undefined, undefined)}
            className="text-slate-500 hover:text-blue-600 transition-colors font-medium"
          >
            Indonesia
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />

          <button
            onClick={() => onDrillDownChange && onDrillDownChange(undefined, undefined, undefined)}
            className={`transition-colors ${
              currentLevel === 'province' ? 'font-bold text-slate-900' : 'text-slate-500 hover:text-blue-600 font-medium'
            }`}
          >
            Jawa Tengah
          </button>

          {selectedRegencyName && selectedRegencyName !== 'Semua Kabupaten/Kota' && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => onDrillDownChange && onDrillDownChange(selectedRegencyName, undefined, undefined)}
                className={`transition-colors ${
                  currentLevel === 'regency' ? 'font-bold text-blue-600' : 'text-slate-500 hover:text-blue-600 font-medium'
                }`}
              >
                {selectedRegencyName}
              </button>
            </>
          )}

          {selectedDistrictName && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => onDrillDownChange && onDrillDownChange(selectedRegencyName, selectedDistrictName, undefined)}
                className={`transition-colors ${
                  currentLevel === 'district' ? 'font-bold text-blue-600' : 'text-slate-500 hover:text-blue-600 font-medium'
                }`}
              >
                Kec. {selectedDistrictName}
              </button>
            </>
          )}

          {selectedSubdistrictName && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                Kel. {selectedSubdistrictName}
              </span>
            </>
          )}
        </div>

        {/* ENHANCEMENT 9: Location Search Autocomplete Bar */}
        <div className="relative">
          <div className="bg-white/95 backdrop-blur-md border border-[#DDE3EA] rounded-lg px-2.5 py-1.5 flex items-center gap-2 shadow-xs text-xs">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari Kelurahan, Kec, Outlet..."
              className="w-36 sm:w-48 bg-transparent text-xs text-slate-900 outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-10 left-0 w-64 bg-white border border-[#DDE3EA] rounded-xl shadow-xl overflow-hidden z-[1010] text-xs">
              <div className="p-1.5 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                Hasil Pencarian Spasial
              </div>
              <div className="max-h-56 overflow-y-auto divide-y divide-slate-100">
                {searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSearchResult(item)}
                    className="w-full text-left p-2.5 hover:bg-blue-50/80 transition-colors flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{item.name}</span>
                      <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                        {item.type}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 truncate">{item.hierarchy}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ENHANCEMENT 11: Radius Analysis Tool Button */}
        <div className="relative">
          <button
            onClick={() => setShowRadiusMenu(!showRadiusMenu)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 shadow-xs transition-colors ${
              activeRadiusKm
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white/95 text-[#17212B] border-[#DDE3EA] hover:bg-slate-50'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{activeRadiusKm ? `Radius ${activeRadiusKm} KM` : 'Analisis Radius'}</span>
          </button>

          {showRadiusMenu && (
            <div className="absolute top-10 left-0 w-44 bg-white border border-[#DDE3EA] rounded-xl shadow-xl p-2 z-[1010] space-y-1 text-xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase px-2 py-1">Pilih Jangkauan:</div>
              {[1, 3, 5, 10].map((km) => (
                <button
                  key={km}
                  onClick={() => {
                    if (onSelectRadius) onSelectRadius(km);
                    setShowRadiusMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between transition-colors ${
                    activeRadiusKm === km ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>Radius {km} KM</span>
                  {activeRadiusKm === km && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
              {activeRadiusKm && (
                <button
                  onClick={() => {
                    if (onSelectRadius) onSelectRadius(null);
                    setShowRadiusMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded text-[11px] font-semibold border-t border-slate-100 mt-1"
                >
                  Matikan Radius
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Top-Right Controls: Basemap, Layer Drawer, Zoom, Fullscreen */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5">
        {/* ENHANCEMENT 5: Map Layer Drawer Button */}
        <button
          onClick={() => setShowLayerDrawer(!showLayerDrawer)}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 shadow-xs transition-colors ${
            showLayerDrawer ? 'bg-[#2563EB] text-white border-blue-600' : 'bg-white/95 text-[#17212B] border-[#DDE3EA] hover:bg-slate-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Layer ({Object.values(mergedLayers).filter(Boolean).length})</span>
        </button>

        {/* Zoom Controls */}
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg bg-white/95 hover:bg-white text-[#17212B] border border-[#DDE3EA] shadow-xs transition-colors"
          title="Perbesar (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg bg-white/95 hover:bg-white text-[#17212B] border border-[#DDE3EA] shadow-xs transition-colors"
          title="Perkecil (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={handleResetZoom}
          className="p-2 rounded-lg bg-white/95 hover:bg-white text-[#17212B] border border-[#DDE3EA] shadow-xs transition-colors"
          title="Reset ke Jawa Tengah"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 rounded-lg bg-white/95 hover:bg-white text-[#17212B] border border-[#DDE3EA] shadow-xs transition-colors"
          title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 text-blue-600" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* ENHANCEMENT 5: 17 Extended Selectable Map Layers Drawer */}
      {showLayerDrawer && (
        <div className="absolute top-14 right-3 z-[1000] w-72 bg-white/98 backdrop-blur-md border border-[#DDE3EA] rounded-xl shadow-2xl p-3.5 space-y-2.5 text-xs animate-in fade-in duration-150 max-h-[460px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-[#DDE3EA]">
            <div>
              <span className="font-bold text-[#17212B] text-xs">Pilihan Layer Spasial</span>
              <div className="text-[10px] text-slate-500">17 Layer Intelijen Terintegrasi</div>
            </div>
            <button
              onClick={() => setShowLayerDrawer(false)}
              className="text-[#607080] hover:text-[#17212B] font-bold text-xs p-1"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1">
            {[
              { key: 'customerDensity', label: 'Customer Density (Densitas)' },
              { key: 'customerDistribution', label: 'Customer Distribution (Sebaran)' },
              { key: 'retentionRisk', label: 'Retention Risk (Risiko Churn)' },
              { key: 'dormantCustomer', label: 'Dormant Customer (Pasif)' },
              { key: 'highValueCustomer', label: 'High Value Customer (Prioritas)' },
              { key: 'prospectPotential', label: 'Prospect Potential (Peluang)' },
              { key: 'marketPotential', label: 'Market Potential (Pasar)' },
              { key: 'competitorDensity', label: 'Competitor Density (Tekanan Bengkel)' },
              { key: 'existingOutlet', label: 'Existing Outlet (Jaringan Resmi)' },
              { key: 'dealer', label: 'Dealer 3S & Pos Layanan' },
              { key: 'servicePoint', label: 'Service Point (Titik Servis Cepat)' },
              { key: 'poi', label: 'Point of Interest (POI & Hub)' },
              { key: 'accessibility', label: 'Aksesibilitas & Jalan Utama' },
              { key: 'populationDensity', label: 'Kepadatan Populasi BPS' },
              { key: 'opportunityZone', label: 'Opportunity Zone (Zona Putih)' },
              { key: 'candidateLocation', label: 'Candidate Location (CL-017, dll)' },
              { key: 'administrativeBoundary', label: 'Batas Administratif Poligon' }
            ].map((layer) => {
              const isActive = (mergedLayers as any)[layer.key];
              return (
                <label
                  key={layer.key}
                  className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <span className={`text-[11px] ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>
                    {layer.label}
                  </span>
                  <input
                    type="checkbox"
                    checked={Boolean(isActive)}
                    onChange={() => onToggleLayer && onToggleLayer(layer.key)}
                    className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 focus:ring-0 cursor-pointer"
                  />
                </label>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#DDE3EA] flex justify-between text-[10px] text-[#607080]">
            <span>Provider: <strong>{tileProvider}</strong></span>
            <span>Jawa Tengah</span>
          </div>
        </div>
      )}

      {/* ENHANCEMENT 6: Bottom Strategy Legend & Summary Indicator */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-md border border-[#DDE3EA] rounded-lg px-3 py-1.5 flex flex-wrap items-center gap-3 text-[11px] shadow-xs text-slate-800">
        <div className="flex items-center gap-1 font-bold text-slate-900">
          <span>Strategi:</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
          <span>RETAIN</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C73E3A]" />
          <span>DEFEND</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0F7C7B]" />
          <span>ACQUIRE</span>
        </div>
        <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
          <span>Outlet Resmi</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-red-600 font-bold">▲</span>
          <span>Kompetitor</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          <span>Kandidat (CL)</span>
        </div>
      </div>

      {/* The Actual Leaflet Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  );
};
