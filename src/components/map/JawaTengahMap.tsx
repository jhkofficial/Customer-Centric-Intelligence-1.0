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
  Check,
  Flame,
  Users,
  Eye,
  Crosshair
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
  IndividualCustomerPoint,
  CustomerSegmentFilter,
  CustomerProductFilter,
  CustomerStatusFilter,
  searchGeoIndex
} from '../../data/geographicDrilldownData';

export type MapTileProvider = 'openstreetmap' | 'google-roadmap' | 'google-satellite' | 'carto-light' | 'carto-dark';

export type CustomerVisualizationMode =
  | 'distribution'
  | 'density-heatmap'
  | 'clusters'
  | 'segments'
  | 'value'
  | 'status'
  | 'coverage-gap';

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
  // Customer Distribution Enhancements
  visualizationMode?: CustomerVisualizationMode;
  selectedSegmentFilter?: CustomerSegmentFilter;
  selectedProductFilter?: CustomerProductFilter;
  selectedStatusFilter?: CustomerStatusFilter;
  onSelectCustomerPoint?: (customer: IndividualCustomerPoint) => void;
  onViewCustomerInsight?: (customerId: string) => void;
}

// 48 Simulated Company Outlets across Jawa Tengah
const COMPANY_OUTLETS: Array<{ id: string; name: string; type: 'Dealer 3S' | 'Bengkel H23' | 'Satelit'; lat: number; lng: number; serviceRadiusKm: number }> = [
  { id: 'out-1', name: 'Dealer Pandanaran Semarang', type: 'Dealer 3S', lat: -6.9892, lng: 110.4140, serviceRadiusKm: 5.0 },
  { id: 'out-2', name: 'Dealer Pemuda Semarang', type: 'Dealer 3S', lat: -6.9780, lng: 110.4180, serviceRadiusKm: 4.5 },
  { id: 'out-3', name: 'Dealer Majapahit Semarang Timur', type: 'Dealer 3S', lat: -7.0010, lng: 110.4520, serviceRadiusKm: 5.0 },
  { id: 'out-4', name: 'Dealer Tembalang Motor', type: 'Bengkel H23', lat: -7.0495, lng: 110.4410, serviceRadiusKm: 4.0 },
  { id: 'out-5', name: 'Dealer Setiabudi Banyumanik', type: 'Dealer 3S', lat: -7.0680, lng: 110.4150, serviceRadiusKm: 4.5 },
  { id: 'out-6', name: 'Dealer Slamet Riyadi Solo', type: 'Dealer 3S', lat: -7.5680, lng: 110.8190, serviceRadiusKm: 5.0 },
  { id: 'out-7', name: 'Dealer Urip Sumoharjo Solo', type: 'Bengkel H23', lat: -7.5610, lng: 110.8350, serviceRadiusKm: 4.0 },
  { id: 'out-8', name: 'Dealer HR Soebrantas Purwokerto', type: 'Dealer 3S', lat: -7.4200, lng: 109.2380, serviceRadiusKm: 5.0 },
  { id: 'out-9', name: 'Dealer Kampus Unsoed Purwokerto', type: 'Satelit', lat: -7.4040, lng: 109.2480, serviceRadiusKm: 3.0 },
  { id: 'out-10', name: 'Dealer Ahmad Yani Kudus', type: 'Dealer 3S', lat: -6.8080, lng: 110.8420, serviceRadiusKm: 4.5 },
  { id: 'out-11', name: 'Dealer Diponegoro Salatiga', type: 'Dealer 3S', lat: -7.3290, lng: 110.5050, serviceRadiusKm: 4.5 },
  { id: 'out-12', name: 'Dealer Pahlawan Magelang', type: 'Dealer 3S', lat: -7.4720, lng: 110.2190, serviceRadiusKm: 4.5 },
  { id: 'out-13', name: 'Dealer Gajah Mada Tegal', type: 'Dealer 3S', lat: -6.8710, lng: 109.1310, serviceRadiusKm: 4.5 },
  { id: 'out-14', name: 'Dealer Gatot Subroto Cilacap', type: 'Dealer 3S', lat: -7.7120, lng: 109.0210, serviceRadiusKm: 5.0 },
  { id: 'out-15', name: 'Dealer Hayam Wuruk Pekalongan', type: 'Dealer 3S', lat: -6.8890, lng: 109.6710, serviceRadiusKm: 4.5 }
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
  { id: 'poi-3', name: 'Pasar Meteseh & Sentra Bisnis', category: 'Perdagangan', lat: -7.0530, lng: 110.4615 },
  { id: 'poi-4', name: 'RSUD KRMT Wongsonegoro', category: 'Fasilitas Publik', lat: -7.0260, lng: 110.4610 },
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
  onAskAIWhy,
  visualizationMode = 'density-heatmap',
  selectedSegmentFilter = 'ALL',
  selectedProductFilter = 'ALL',
  selectedStatusFilter = 'ALL',
  onSelectCustomerPoint,
  onViewCustomerInsight
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerGroupRef = useRef<L.LayerGroup | null>(null);
  const polygonGroupRef = useRef<L.LayerGroup | null>(null);
  const radiusGroupRef = useRef<L.LayerGroup | null>(null);
  const customerPointsGroupRef = useRef<L.LayerGroup | null>(null);
  const coverageGroupRef = useRef<L.LayerGroup | null>(null);

  const [tileProvider, setTileProvider] = useState<MapTileProvider>('openstreetmap');
  const [showLayerDrawer, setShowLayerDrawer] = useState(false);
  const [showRadiusMenu, setShowRadiusMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchGeoIndex>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentZoomLevel, setCurrentZoomLevel] = useState<number>(8.4);

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
        '<span class="text-[9px] text-slate-500 font-medium">SERVEON Intelijen Spasial &amp; Sebaran Pelanggan</span>'
      );

      // Track zoom level changes to support progressive visualization
      map.on('zoomend', () => {
        setCurrentZoomLevel(map.getZoom());
      });

      polygonGroupRef.current = L.layerGroup().addTo(map);
      coverageGroupRef.current = L.layerGroup().addTo(map);
      markerGroupRef.current = L.layerGroup().addTo(map);
      customerPointsGroupRef.current = L.layerGroup().addTo(map);
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

  // Render Polygons and Density Heatmaps
  useEffect(() => {
    const polyGroup = polygonGroupRef.current;
    if (!polyGroup) return;
    polyGroup.clearLayers();

    // Helper for density heatmap color tiers (Low -> Medium -> High -> Very High)
    const getDensityHeatmapColor = (score: number) => {
      if (score >= 90) return { color: '#7E22CE', fill: '#9333EA', label: 'Very High Density' }; // Deep Purple
      if (score >= 82) return { color: '#1D4ED8', fill: '#3B82F6', label: 'High Density' }; // Blue
      if (score >= 75) return { color: '#0F766E', fill: '#14B8A6', label: 'Medium Density' }; // Teal
      return { color: '#64748B', fill: '#94A3B8', label: 'Low Density' }; // Slate
    };

    // Helper for Value Mode colors
    const getValueColor = (score: number) => {
      if (score >= 88) return '#16A34A'; // High Value (Emerald)
      if (score >= 80) return '#2563EB'; // Medium Value (Blue)
      return '#64748B'; // Low Value
    };

    // Helper for Status Mode colors
    const getStatusColor = (strategy: string) => {
      if (strategy === 'DEFEND') return '#DC2626'; // At Risk / High Competition
      if (strategy === 'RETAIN') return '#D97706'; // Dormant / Retain
      return '#0D9488'; // Active / Prospect
    };

    // 1. PROVINCE LEVEL (Show Regencies / Kab-Kota)
    if (currentLevel === 'province') {
      JAWA_TENGAH_REGENCIES.forEach((reg) => {
        let fillColor = '#2563EB';
        let strokeColor = '#1D4ED8';
        let fillOpacity = 0.16;

        if (visualizationMode === 'density-heatmap') {
          const tier = getDensityHeatmapColor(reg.customerConcentrationScore);
          fillColor = tier.fill;
          strokeColor = tier.color;
          fillOpacity = reg.customerConcentrationScore >= 90 ? 0.35 : 0.2;
        } else if (visualizationMode === 'value') {
          fillColor = getValueColor(reg.customerConcentrationScore);
          strokeColor = fillColor;
        } else {
          fillColor = getStatusColor(reg.strategy);
          strokeColor = fillColor;
        }

        const polygon = L.polygon(reg.polygon, {
          color: strokeColor,
          weight: 2,
          fillColor: fillColor,
          fillOpacity: fillOpacity
        });

        polygon.bindTooltip(
          `<strong>${reg.name}</strong><br/>Pelanggan: ${reg.totalCustomers.toLocaleString('id-ID')}<br/>Skor Konsentrasi: <strong>${reg.customerConcentrationScore}/100</strong>`,
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

    // 2. REGENCY LEVEL (Show Kecamatan)
    if (currentLevel === 'regency') {
      const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
      if (reg && reg.districts.length > 0) {
        reg.districts.forEach((dist) => {
          let fillColor = '#2563EB';
          let strokeColor = '#1D4ED8';
          let fillOpacity = 0.22;

          if (visualizationMode === 'density-heatmap') {
            const tier = getDensityHeatmapColor(dist.customerConcentrationScore);
            fillColor = tier.fill;
            strokeColor = tier.color;
            fillOpacity = dist.customerConcentrationScore >= 90 ? 0.38 : 0.22;
          } else if (visualizationMode === 'value') {
            fillColor = getValueColor(dist.customerConcentrationScore);
            strokeColor = fillColor;
          } else {
            fillColor = getStatusColor(dist.strategy);
            strokeColor = fillColor;
          }

          const polygon = L.polygon(dist.polygon, {
            color: strokeColor,
            weight: 2.2,
            dashArray: '4, 4',
            fillColor: fillColor,
            fillOpacity: fillOpacity
          });

          // ENHANCEMENT 21: Smart map label
          polygon.bindTooltip(
            `<strong>Kecamatan ${dist.name}</strong><br/>Total Pelanggan: <strong>${dist.totalCustomers.toLocaleString('id-ID')}</strong><br/>Konsentrasi: <strong>${dist.customerConcentrationScore}/100</strong><br/><span class="text-[10px] text-blue-600 font-bold">Klik untuk jelajahi Kelurahan</span>`,
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

    // 3. KECAMATAN / KELURAHAN LEVEL (Show Kelurahan with Micro Density)
    if (currentLevel === 'district' || currentLevel === 'subdistrict') {
      const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
      const dist = reg?.districts.find((d) => d.name === selectedDistrictName);

      if (dist && dist.subdistricts.length > 0) {
        dist.subdistricts.forEach((sub) => {
          const isSelected = selectedSubdistrictName === sub.name;
          let fillColor = '#2563EB';
          let strokeColor = '#1D4ED8';
          let fillOpacity = isSelected ? 0.42 : 0.24;

          if (visualizationMode === 'density-heatmap') {
            const tier = getDensityHeatmapColor(sub.customerConcentrationScore);
            fillColor = tier.fill;
            strokeColor = tier.color;
            fillOpacity = isSelected ? 0.45 : sub.customerConcentrationScore >= 90 ? 0.35 : 0.22;
          } else if (visualizationMode === 'value') {
            fillColor = sub.metrics.highValueCustomers > 450 ? '#16A34A' : '#2563EB';
            strokeColor = fillColor;
          } else if (visualizationMode === 'status') {
            fillColor = sub.metrics.atRiskCustomers > 500 ? '#DC2626' : '#0D9488';
            strokeColor = fillColor;
          } else if (visualizationMode === 'coverage-gap') {
            fillColor = sub.metrics.customersOutsideCoverageCount > 500 ? '#EA580C' : '#2563EB';
            strokeColor = fillColor;
          }

          const polygon = L.polygon(sub.polygon, {
            color: isSelected ? '#1D4ED8' : strokeColor,
            weight: isSelected ? 3.5 : 2,
            fillColor: fillColor,
            fillOpacity: fillOpacity
          });

          // ENHANCEMENT 18: Map Hover Information
          const tooltipHtml = `
            <div class="serveon-kelurahan-tooltip">
              <div class="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 mb-1.5">
                <span class="font-bold text-xs text-slate-900">Kelurahan ${sub.name}</span>
                <span class="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-blue-50 text-blue-700">
                  Skor: ${sub.customerConcentrationScore}/100
                </span>
              </div>
              <div class="space-y-1 text-[11px]">
                <div class="flex justify-between text-slate-600">
                  <span>Total Customers:</span>
                  <strong class="text-slate-900 font-mono">${sub.metrics.existingCustomers.toLocaleString('id-ID')}</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Active:</span>
                  <strong class="text-emerald-700 font-mono">${sub.metrics.activeCustomers.toLocaleString('id-ID')}</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>At Risk:</span>
                  <strong class="text-rose-600 font-mono">${sub.metrics.atRiskCustomers.toLocaleString('id-ID')}</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Dormant:</span>
                  <strong class="text-amber-700 font-mono">${sub.metrics.dormantCustomers.toLocaleString('id-ID')}</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>High Value:</span>
                  <strong class="text-purple-700 font-mono">${sub.metrics.highValueCustomers.toLocaleString('id-ID')}</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Prospects:</span>
                  <strong class="text-teal-700 font-mono">${sub.metrics.potentialCustomers.toLocaleString('id-ID')}</strong>
                </div>
                <div class="flex justify-between text-slate-600 pt-1 border-t border-slate-100">
                  <span>Customer Density:</span>
                  <strong class="text-slate-900">${sub.customerConcentrationScore >= 85 ? 'High' : 'Medium'}</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Coverage:</span>
                  <strong class="${sub.metrics.customersOutsideCoverageCount > 500 ? 'text-rose-600' : 'text-slate-800'}">
                    ${sub.metrics.existingOutletCoverage.split(' ')[0]} (${sub.metrics.avgDistanceToOutletKm} KM)
                  </strong>
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
    visualizationMode,
    onDrillDownChange,
    onSelectArea
  ]);

  // Render Outlet Service Radius & Coverage Gaps
  useEffect(() => {
    const covGroup = coverageGroupRef.current;
    if (!covGroup) return;
    covGroup.clearLayers();

    // ENHANCEMENT 10 & 11: Outlet vs Customer Coverage & Coverage Gap
    if (mergedLayers.existingOutlet || visualizationMode === 'coverage-gap') {
      COMPANY_OUTLETS.forEach((outlet) => {
        // Primary 3.5 km optimal service circle
        const circlePrimary = L.circle([outlet.lat, outlet.lng], {
          radius: outlet.serviceRadiusKm * 1000,
          color: '#2563EB',
          weight: 1.5,
          dashArray: '4, 4',
          fillColor: '#3B82F6',
          fillOpacity: 0.08
        });

        circlePrimary.bindTooltip(`Cakupan Layanan Optimal: ${outlet.name} (${outlet.serviceRadiusKm} KM)`, {
          direction: 'top',
          className: 'serveon-leaflet-tooltip'
        });

        circlePrimary.addTo(covGroup);
      });

      // Highlight Coverage Gap in Eastern Meteseh if at Tembalang
      if (selectedDistrictName === 'Tembalang') {
        const gapCircle = L.circle([-7.0620, 110.4710], {
          radius: 1800,
          color: '#DC2626',
          weight: 2,
          dashArray: '5, 5',
          fillColor: '#EF4444',
          fillOpacity: 0.18
        });

        gapCircle.bindTooltip(
          `<strong>Zona Coverage Gap (Celah Jangkauan)</strong><br/>1.240 Pelanggan berjarak &gt; 5 KM dari outlet resmi terdekat.<br/><span class="text-rose-700 font-bold">Rekomendasi: Satelit Service / Layanan Kunjung</span>`,
          { permanent: false, className: 'serveon-leaflet-tooltip' }
        );

        gapCircle.addTo(covGroup);
      }
    }
  }, [mergedLayers.existingOutlet, visualizationMode, selectedDistrictName]);

  // Render Customer Clusters & Individual Customer Points
  useEffect(() => {
    const markerGroup = markerGroupRef.current;
    const custPointsGroup = customerPointsGroupRef.current;
    if (!markerGroup || !custPointsGroup) return;

    markerGroup.clearLayers();
    custPointsGroup.clearLayers();

    const reg = JAWA_TENGAH_REGENCIES.find((r) => r.name === selectedRegencyName);
    const dist = reg?.districts.find((d) => d.name === selectedDistrictName);

    // ENHANCEMENT 4 & 21: Customer Cluster View & Smart Map Labels
    if ((currentLevel === 'district' || currentLevel === 'subdistrict') && currentZoomLevel < 15.2) {
      dist?.subdistricts.forEach((sub) => {
        sub.clusters?.forEach((cluster) => {
          // Filter by segment if active
          if (selectedSegmentFilter === 'At Risk Customer' && cluster.retentionRisk !== 'High') return;
          if (selectedSegmentFilter === 'High Value Customer' && cluster.dominantSegment !== 'Active High Value') return;

          const clusterColor =
            cluster.retentionRisk === 'High' ? '#DC2626' : cluster.retentionRisk === 'Medium' ? '#D97706' : '#2563EB';

          const html = `
            <div class="flex flex-col items-center cursor-pointer hover:scale-115 transition-transform">
              <div style="background-color: ${clusterColor};" class="px-2.5 py-1 rounded-full text-white border-2 border-white shadow-lg flex items-center gap-1 font-bold text-xs whitespace-nowrap">
                <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>${cluster.customers.toLocaleString('id-ID')} Cust</span>
              </div>
              <div class="bg-white text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-slate-200 mt-0.5 whitespace-nowrap">
                ${cluster.name.split('—')[1] || cluster.name}
              </div>
            </div>
          `;

          const clusterIcon = L.divIcon({
            html,
            className: 'serveon-cluster-badge',
            iconSize: [110, 44],
            iconAnchor: [55, 22]
          });

          const marker = L.marker([cluster.lat, cluster.lng], { icon: clusterIcon });

          // Clicking cluster zooms in deeper and transitions to sub-clusters / individual points
          marker.on('click', () => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.flyTo([cluster.lat, cluster.lng], 15.5, { duration: 0.6 });
            }
          });

          marker.bindPopup(`
            <div class="p-2.5 text-xs font-['Plus_Jakarta_Sans',sans-serif] space-y-1.5">
              <div class="font-bold text-slate-900 border-b pb-1">${cluster.name}</div>
              <div>Pelanggan: <strong>${cluster.customers.toLocaleString('id-ID')}</strong></div>
              <div>Segmen Dominan: <strong>${cluster.dominantSegment}</strong></div>
              <div>Risiko Retensi: <strong class="${cluster.retentionRisk === 'High' ? 'text-red-600' : 'text-slate-800'}">${cluster.retentionRisk} (${cluster.riskPercent}%)</strong></div>
              <div>Jarak Rata-rata: <strong>${cluster.avgDistanceToOutletKm} KM</strong></div>
              <div class="text-[10px] text-blue-600 font-semibold pt-1">Klik cluster untuk memperbesar ke titik individual pelanggan →</div>
            </div>
          `);

          marker.addTo(markerGroup);
        });
      });
    }

    // ENHANCEMENT 2 & 8: Individual Anonymized Customer Points (at Detailed Local Zoom >= 14.8)
    if (currentLevel === 'subdistrict' || currentZoomLevel >= 14.8) {
      const activeSub = dist?.subdistricts.find((s) => s.name === selectedSubdistrictName) || dist?.subdistricts[0];
      const customers = activeSub?.customers || [];

      // Filter customers based on filters
      const filteredCustomers = customers.filter((c) => {
        if (selectedSegmentFilter !== 'ALL' && !c.segment.includes(selectedSegmentFilter.split(' ')[0])) return false;
        if (selectedProductFilter !== 'ALL' && c.product !== selectedProductFilter) return false;
        if (selectedStatusFilter !== 'ALL' && c.status !== selectedStatusFilter) return false;
        return true;
      });

      filteredCustomers.forEach((cust) => {
        const pointColor =
          cust.retentionRisk === 'High'
            ? '#DC2626'
            : cust.customerValue === 'High'
            ? '#7E22CE'
            : cust.status === 'Active'
            ? '#2563EB'
            : '#64748B';

        const html = `
          <div class="w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center cursor-pointer hover:scale-150 transition-transform" style="background-color: ${pointColor};" title="${cust.id}">
            <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
        `;

        const custIcon = L.divIcon({
          html,
          className: 'serveon-cust-point',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const marker = L.marker([cust.lat, cust.lng], { icon: custIcon });

        // ENHANCEMENT 8: Customer Pop-up Detail
        const popupContent = `
          <div class="p-3 font-['Plus_Jakarta_Sans',sans-serif] text-xs max-w-sm space-y-2">
            <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <div>
                <span class="text-[9.5px] font-bold text-slate-500 uppercase">Pelanggan Terdaftar (Anonim)</span>
                <h4 class="font-bold text-sm text-slate-900">${cust.id}</h4>
                <div class="text-[10px] text-slate-500">Unit: <strong>Honda ${cust.product}</strong> · Sejak ${cust.sinceYear}</div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                cust.customerValue === 'High' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-blue-50 text-blue-700'
              }">
                ${cust.segment}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-1.5 text-[10.5px] bg-slate-50 p-2 rounded-lg border border-slate-200">
              <div>Status: <strong>${cust.status}</strong></div>
              <div>Transaksi Terakhir: <strong>${cust.lastTransactionDaysAgo} Hari Lalu</strong></div>
              <div>Outlet Terdekat: <strong>${cust.nearestOutlet}</strong></div>
              <div>Jarak: <strong class="${cust.distanceToOutletKm > 5 ? 'text-rose-600' : 'text-slate-800'}">${cust.distanceToOutletKm} KM</strong></div>
              <div>Customer Value: <strong class="text-blue-700">${cust.customerValue}</strong></div>
              <div>Retention Risk: <strong class="${cust.retentionRisk === 'High' ? 'text-rose-600' : 'text-emerald-700'}">${cust.retentionRisk}</strong></div>
            </div>

            <div class="p-2 rounded bg-blue-50 border border-blue-200 text-[10.5px] text-blue-900">
              <strong>Next Best Action:</strong> ${cust.nextBestAction}
            </div>

            <div class="grid grid-cols-3 gap-1 pt-1">
              <button id="btn-cust-insight-${cust.id}" class="py-1 px-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-semibold text-center transition-colors">
                View Insight
              </button>
              <button id="btn-cust-analyze-${cust.id}" class="py-1 px-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[10px] font-semibold text-center border border-slate-300 transition-colors">
                Analyze Area
              </button>
              <button id="btn-cust-nearby-${cust.id}" class="py-1 px-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[10px] font-semibold text-center border border-slate-300 transition-colors">
                Nearby Cust
              </button>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 320 });

        marker.on('popupopen', () => {
          const btnInsight = document.getElementById(`btn-cust-insight-${cust.id}`);
          const btnAnalyze = document.getElementById(`btn-cust-analyze-${cust.id}`);
          const btnNearby = document.getElementById(`btn-cust-nearby-${cust.id}`);

          if (btnInsight) {
            btnInsight.onclick = () => {
              if (onViewCustomerInsight) onViewCustomerInsight(cust.id);
              marker.closePopup();
            };
          }
          if (btnAnalyze) {
            btnAnalyze.onclick = () => {
              if (onSelectRadius) onSelectRadius(3);
              marker.closePopup();
            };
          }
          if (btnNearby) {
            btnNearby.onclick = () => {
              if (onSelectCustomerPoint) onSelectCustomerPoint(cust);
              if (onSelectRadius) onSelectRadius(1);
              marker.closePopup();
            };
          }
        });

        marker.addTo(custPointsGroup);
      });
    }

    // Outlets Pins
    if (mergedLayers.existingOutlet) {
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
        marker.bindPopup(`<strong>Outlet Resmi SERVEON (${outlet.type})</strong><br/>${outlet.name}<br/>Radius Servis: ${outlet.serviceRadiusKm} KM`);
        marker.addTo(markerGroup);
      });
    }
  }, [
    currentLevel,
    currentZoomLevel,
    selectedRegencyName,
    selectedDistrictName,
    selectedSubdistrictName,
    selectedSegmentFilter,
    selectedProductFilter,
    selectedStatusFilter,
    mergedLayers.existingOutlet,
    onSelectCustomerPoint,
    onViewCustomerInsight,
    onSelectRadius
  ]);

  // Render Radius Analysis Circle
  useEffect(() => {
    const radGroup = radiusGroupRef.current;
    if (!radGroup) return;
    radGroup.clearLayers();

    if (!activeRadiusKm) return;

    let center: [number, number] = [-7.0542, 110.4632];
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
      fillOpacity: 0.12
    });

    circle.bindTooltip(`Radius Analisis Pelanggan: ${activeRadiusKm} KM`, {
      direction: 'top',
      permanent: true,
      className: 'serveon-leaflet-tooltip'
    });

    circle.addTo(radGroup);
  }, [activeRadiusKm, selectedRegencyName, selectedDistrictName, selectedSubdistrictName]);

  // Search Handler
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
      {/* Top Left: Breadcrumb Navigation & Search */}
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

        {/* Location / Customer Search Autocomplete */}
        <div className="relative">
          <div className="bg-white/95 backdrop-blur-md border border-[#DDE3EA] rounded-lg px-2.5 py-1.5 flex items-center gap-2 shadow-xs text-xs">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari Tembalang, Meteseh, PCX..."
              className="w-36 sm:w-44 bg-transparent text-xs text-slate-900 outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-10 left-0 w-64 bg-white border border-[#DDE3EA] rounded-xl shadow-xl overflow-hidden z-[1010] text-xs">
              <div className="p-1.5 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                Hasil Pencarian
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

        {/* Radius Analysis Selector */}
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
            <span>{activeRadiusKm ? `Radius ${activeRadiusKm} KM` : 'Radius Pelanggan'}</span>
          </button>

          {showRadiusMenu && (
            <div className="absolute top-10 left-0 w-44 bg-white border border-[#DDE3EA] rounded-xl shadow-xl p-2 z-[1010] space-y-1 text-xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase px-2 py-1">Pilih Radius:</div>
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

      {/* Top Right: Layer Drawer & Zoom Controls */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5">
        <button
          onClick={() => setShowLayerDrawer(!showLayerDrawer)}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 shadow-xs transition-colors ${
            showLayerDrawer ? 'bg-[#2563EB] text-white border-blue-600' : 'bg-white/95 text-[#17212B] border-[#DDE3EA] hover:bg-slate-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Layer ({Object.values(mergedLayers).filter(Boolean).length})</span>
        </button>

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

      {/* Layer Drawer */}
      {showLayerDrawer && (
        <div className="absolute top-14 right-3 z-[1000] w-72 bg-white/98 backdrop-blur-md border border-[#DDE3EA] rounded-xl shadow-2xl p-3.5 space-y-2 text-xs animate-in fade-in duration-150 max-h-[460px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-[#DDE3EA]">
            <div>
              <span className="font-bold text-[#17212B] text-xs">Layer Intelijen Spasial</span>
              <div className="text-[10px] text-slate-500">Visualisasi Sebaran &amp; Densitas</div>
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
              { key: 'competitorDensity', label: 'Competitor Density (Tekanan Kompetitor)' },
              { key: 'existingOutlet', label: 'Existing Outlet & Radius Servis' },
              { key: 'poi', label: 'Point of Interest (POI & Hub)' },
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

      {/* ENHANCEMENT 22: Dynamic Legend adapting to selected customer visualization */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-md border border-[#DDE3EA] rounded-lg px-3 py-1.5 flex flex-wrap items-center gap-3 text-[11px] shadow-xs text-slate-800">
        <div className="flex items-center gap-1 font-bold text-slate-900">
          <span>Legenda:</span>
        </div>

        {visualizationMode === 'density-heatmap' ? (
          <>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
              <span>Low Density</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]" />
              <span>Medium Density</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              <span>High Density</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9333EA]" />
              <span>Very High Density</span>
            </div>
          </>
        ) : visualizationMode === 'value' ? (
          <>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
              <span>High Value</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
              <span>Medium Value</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" />
              <span>Low Value</span>
            </div>
          </>
        ) : visualizationMode === 'coverage-gap' ? (
          <>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
              <span>Optimal Coverage (&lt;3.5 KM)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
              <span>Coverage Gap (&gt;5 KM)</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
              <span>At Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
              <span>Dormant</span>
            </div>
          </>
        )}

        <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
          <span>Outlet Resmi</span>
        </div>
      </div>

      {/* The Actual Leaflet Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  );
};
