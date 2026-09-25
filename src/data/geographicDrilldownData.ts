// Geographic Drill-down Intelligence Dataset for Central Java (Jawa Tengah)
// Hierarchy: Indonesia (Level 0) -> Jawa Tengah (Level 1) -> Kabupaten/Kota (Level 2) -> Kecamatan (Level 3) -> Kelurahan/Desa (Level 4)

export type GeoLevel = 'country' | 'province' | 'regency' | 'district' | 'subdistrict' | 'local';

export type CustomerSegmentFilter =
  | 'ALL'
  | 'Active Customer'
  | 'High Value Customer'
  | 'Medium Value Customer'
  | 'Low Value Customer'
  | 'At Risk Customer'
  | 'Dormant Customer'
  | 'Churn Customer'
  | 'Prospect'
  | 'New Customer'
  | 'Loyal Customer';

export type CustomerProductFilter = 'ALL' | 'BeAT' | 'Scoopy' | 'Vario' | 'PCX' | 'ADV' | 'CB150R' | 'Other';

export type CustomerStatusFilter = 'ALL' | 'Active' | 'At Risk' | 'Dormant' | 'Churn' | 'Prospect';

export interface MicroMarketData {
  population: number;
  existingCustomers: number;
  activeCustomers: number;
  atRiskCustomers: number;
  dormantCustomers: number;
  potentialCustomers: number;
  highValueCustomers: number;
  customerDensityScore: number;
  competitorDensityScore: number;
  competitorsCount: number;
  existingOutletCoverage: string;
  avgDistanceToOutletKm: number;
  marketPotentialScore: number;
  retentionOpportunityScore: number;
  acquisitionPotentialScore: number;
  strategicLocationScore: number;
  customerConcentrationScore: number; // 0-100 scale
  dominantSegment: string;
  avgMonthlyExpenditure: string;
  recommendedStrategy: 'RETAIN' | 'DEFEND' | 'ACQUIRE';
  strategyPriorityLabel: string;
  keyObservation: string;
  topProduct: string;
  customersOutsideCoverageCount: number;
}

export interface IndividualCustomerPoint {
  id: string; // e.g. CUS-028912
  maskedName: string;
  lat: number;
  lng: number;
  segment: 'High Value' | 'Medium Value' | 'Low Value' | 'At Risk' | 'Dormant' | 'New Customer' | 'Loyal Customer';
  status: 'Active' | 'At Risk' | 'Dormant' | 'Churn' | 'Prospect';
  sinceYear: number;
  lastTransactionDaysAgo: number;
  nearestOutlet: string;
  distanceToOutletKm: number;
  customerValue: 'High' | 'Medium' | 'Low';
  retentionRisk: 'Low' | 'Medium' | 'High';
  product: 'BeAT' | 'Scoopy' | 'Vario' | 'PCX' | 'ADV' | 'CB150R' | 'Other';
  nextBestAction: string;
  monthlySpend: string;
}

export interface CustomerCluster {
  id: string;
  name: string;
  lat: number;
  lng: number;
  customers: number;
  dominantSegment: string;
  retentionRisk: 'Low' | 'Medium' | 'High';
  riskPercent: number;
  avgDistanceToOutletKm: number;
  opportunity: 'Low' | 'Medium' | 'High';
  recommendation: string;
  subClusters?: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    customers: number;
  }>;
}

export interface CandidateLocationItem {
  id: string;
  code: string;
  name: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  lat: number;
  lng: number;
  customerDensityScore: number;
  marketPotential: number;
  accessibility: number;
  acquisitionPotential: number;
  competitionPressure: number;
  strategicLocationScore: number;
  estimatedCapex: string;
  projectedAnnualRevenue: string;
  cannibalizationRisk: 'Rendah (4%)' | 'Sedang (12%)' | 'Tinggi (24%)';
  address: string;
  whyThisLocation: string;
  recommendedFormat: string;
}

export interface GeoItem {
  id: string;
  name: string;
  level: GeoLevel;
  parentName?: string;
  grandParentName?: string;
  center: [number, number];
  zoom: number;
  polygon: [number, number][];
  strategy: 'RETAIN' | 'DEFEND' | 'ACQUIRE';
  score: number;
  customerConcentrationScore: number;
  metrics: MicroMarketData;
  clusters?: CustomerCluster[];
  candidates?: CandidateLocationItem[];
  customers?: IndividualCustomerPoint[];
}

export interface KecamatanItem {
  id: string;
  name: string;
  regencyName: string;
  center: [number, number];
  zoom: number;
  polygon: [number, number][];
  strategy: 'RETAIN' | 'DEFEND' | 'ACQUIRE';
  score: number;
  totalCustomers: number;
  potentialCustomers: number;
  customerConcentrationScore: number;
  subdistricts: GeoItem[];
}

export interface RegencyGeoItem {
  id: string;
  name: string;
  category: 'Kota' | 'Kabupaten';
  center: [number, number];
  zoom: number;
  polygon: [number, number][];
  strategy: 'RETAIN' | 'DEFEND' | 'ACQUIRE';
  score: number;
  totalCustomers: number;
  activeRate: number;
  customerConcentrationScore: number;
  districts: KecamatanItem[];
}

// -------------------------------------------------------------
// Top Customer Areas (Compact Ranking Panel)
// -------------------------------------------------------------
export const TOP_CUSTOMER_AREAS = [
  { rank: 1, name: 'Tembalang', level: 'Kelurahan', parent: 'Tembalang, Kota Semarang', customers: 4820, concentrationScore: 92, strategy: 'ACQUIRE', density: 'Very High', potential: 'High' },
  { rank: 2, name: 'Meteseh', level: 'Kelurahan', parent: 'Tembalang, Kota Semarang', customers: 3250, concentrationScore: 84, strategy: 'ACQUIRE', density: 'High', potential: 'Very High' },
  { rank: 3, name: 'Sendangmulyo', level: 'Kelurahan', parent: 'Tembalang, Kota Semarang', customers: 2940, concentrationScore: 88, strategy: 'DEFEND', density: 'High', potential: 'Medium' },
  { rank: 4, name: 'Bulusan', level: 'Kelurahan', parent: 'Tembalang, Kota Semarang', customers: 2310, concentrationScore: 71, strategy: 'ACQUIRE', density: 'Medium', potential: 'High' },
  { rank: 5, name: 'Sambiroto', level: 'Kelurahan', parent: 'Tembalang, Kota Semarang', customers: 2120, concentrationScore: 79, strategy: 'DEFEND', density: 'Medium', potential: 'Medium' }
];

// -------------------------------------------------------------
// Anonymized Individual Customer Points (Sample in Meteseh & Tembalang)
// -------------------------------------------------------------
export const ANONYMIZED_CUSTOMERS_METESEH: IndividualCustomerPoint[] = [
  {
    id: 'CUS-028912',
    maskedName: 'A*** P******',
    lat: -7.0542,
    lng: 110.4632,
    segment: 'High Value',
    status: 'Active',
    sinceYear: 2023,
    lastTransactionDaysAgo: 18,
    nearestOutlet: 'Dealer Tembalang Motor',
    distanceToOutletKm: 3.2,
    customerValue: 'High',
    retentionRisk: 'Low',
    product: 'PCX',
    nextBestAction: 'Maintain Engagement & Undangan Uji Emisi Gratis',
    monthlySpend: 'Rp480.000'
  },
  {
    id: 'CUS-029415',
    maskedName: 'B*** S******',
    lat: -7.0520,
    lng: 110.4580,
    segment: 'High Value',
    status: 'Active',
    sinceYear: 2022,
    lastTransactionDaysAgo: 45,
    nearestOutlet: 'Dealer Tembalang Motor',
    distanceToOutletKm: 3.8,
    customerValue: 'High',
    retentionRisk: 'Low',
    product: 'Vario',
    nextBestAction: 'Reminder Booking Servis Berkala 12.000 KM via Mobile Apps',
    monthlySpend: 'Rp410.000'
  },
  {
    id: 'CUS-030118',
    maskedName: 'D*** K******',
    lat: -7.0585,
    lng: 110.4670,
    segment: 'At Risk',
    status: 'At Risk',
    sinceYear: 2021,
    lastTransactionDaysAgo: 140,
    nearestOutlet: 'Dealer Tembalang Motor',
    distanceToOutletKm: 7.2,
    customerValue: 'Medium',
    retentionRisk: 'High',
    product: 'BeAT',
    nextBestAction: 'Kirim Voucher Diskon Jasa Servis 25% + Penjemputan Unit',
    monthlySpend: 'Rp190.000'
  },
  {
    id: 'CUS-031204',
    maskedName: 'E*** R******',
    lat: -7.0610,
    lng: 110.4710,
    segment: 'At Risk',
    status: 'At Risk',
    sinceYear: 2020,
    lastTransactionDaysAgo: 180,
    nearestOutlet: 'Dealer Tembalang Motor',
    distanceToOutletKm: 8.4,
    customerValue: 'High',
    retentionRisk: 'High',
    product: 'ADV',
    nextBestAction: 'Eskalasi Layanan Servis Kunjung Wilayah Meteseh Timur',
    monthlySpend: 'Rp520.000'
  },
  {
    id: 'CUS-032890',
    maskedName: 'F*** H******',
    lat: -7.0490,
    lng: 110.4615,
    segment: 'Medium Value',
    status: 'Active',
    sinceYear: 2024,
    lastTransactionDaysAgo: 22,
    nearestOutlet: 'Dealer Tembalang Motor',
    distanceToOutletKm: 2.9,
    customerValue: 'Medium',
    retentionRisk: 'Low',
    product: 'Scoopy',
    nextBestAction: 'Tawarkan Aksesoris Resmi Honda & Apparel',
    monthlySpend: 'Rp280.000'
  },
  {
    id: 'CUS-033140',
    maskedName: 'G*** W******',
    lat: -7.0560,
    lng: 110.4690,
    segment: 'Dormant',
    status: 'Dormant',
    sinceYear: 2019,
    lastTransactionDaysAgo: 260,
    nearestOutlet: 'Dealer Tembalang Motor',
    distanceToOutletKm: 7.8,
    customerValue: 'Low',
    retentionRisk: 'High',
    product: 'BeAT',
    nextBestAction: 'Reaktivasi via WhatsApp Blast Promo Oli MPX2',
    monthlySpend: 'Rp95.000'
  },
  {
    id: 'CUS-034502',
    maskedName: 'H*** M******',
    lat: -7.0515,
    lng: 110.4655,
    segment: 'New Customer',
    status: 'Active',
    sinceYear: 2026,
    lastTransactionDaysAgo: 8,
    nearestOutlet: 'Dealer Tembalang Motor',
    distanceToOutletKm: 3.5,
    customerValue: 'High',
    retentionRisk: 'Low',
    product: 'PCX',
    nextBestAction: 'Edukasi KPB 1 Gratis & Panduan Mobile Apps',
    monthlySpend: 'Rp350.000'
  },
  {
    id: 'CUS-035981',
    maskedName: 'I*** N******',
    lat: -7.0575,
    lng: 110.4600,
    segment: 'High Value',
    status: 'Active',
    sinceYear: 2022,
    lastTransactionDaysAgo: 30,
    nearestOutlet: 'Dealer Tembalang Motor',
    distanceToOutletKm: 3.1,
    customerValue: 'High',
    retentionRisk: 'Low',
    product: 'CB150R',
    nextBestAction: 'Program Servis Prioritas Fast Pit Motor Sport',
    monthlySpend: 'Rp490.000'
  }
];

// -------------------------------------------------------------
// Detailed Kelurahan Dataset for Tembalang, Semarang
// -------------------------------------------------------------
export const TEMBALANG_SUBDISTRICTS: GeoItem[] = [
  {
    id: 'kel-meteseh',
    name: 'Meteseh',
    level: 'subdistrict',
    parentName: 'Tembalang',
    grandParentName: 'Kota Semarang',
    center: [-7.0542, 110.4632],
    zoom: 14.5,
    polygon: [
      [-7.0420, 110.4520],
      [-7.0410, 110.4720],
      [-7.0620, 110.4780],
      [-7.0680, 110.4610],
      [-7.0560, 110.4490]
    ],
    strategy: 'ACQUIRE',
    score: 88,
    customerConcentrationScore: 84,
    metrics: {
      population: 28450,
      existingCustomers: 3250,
      activeCustomers: 2180,
      atRiskCustomers: 620,
      dormantCustomers: 310,
      potentialCustomers: 1480,
      highValueCustomers: 480,
      customerDensityScore: 84,
      competitorDensityScore: 68,
      competitorsCount: 7,
      existingOutletCoverage: 'Terbatas (Radius Terdekat 4,6 km)',
      avgDistanceToOutletKm: 4.6,
      marketPotentialScore: 91,
      retentionOpportunityScore: 78,
      acquisitionPotentialScore: 94,
      strategicLocationScore: 90,
      customerConcentrationScore: 84,
      dominantSegment: 'Emerging Affluent & Mahasiswa',
      avgMonthlyExpenditure: 'Rp3,65 Juta',
      recommendedStrategy: 'ACQUIRE',
      strategyPriorityLabel: 'ACQUIRE PRIORITY',
      keyObservation: 'Pertumbuhan perumahan baru & kavling padat dengan penetrasi jaringan layanan resmi yang masih minim.',
      topProduct: 'Honda BeAT (44%) & PCX 160 (28%)',
      customersOutsideCoverageCount: 1240
    },
    clusters: [
      {
        id: 'clu-meteseh-01',
        name: 'Kluster 01 — Dinar Mas & Bukit Kencana',
        lat: -7.0512,
        lng: 110.4610,
        customers: 820,
        dominantSegment: 'Active High Value',
        retentionRisk: 'Low',
        riskPercent: 11,
        avgDistanceToOutletKm: 4.2,
        opportunity: 'Medium',
        recommendation: 'Layanan Service Kunjung & Booking Mobile Apps Fast Track'
      },
      {
        id: 'clu-meteseh-02',
        name: 'Kluster 02 — Koridor Sigar Bencah',
        lat: -7.0560,
        lng: 110.4640,
        customers: 640,
        dominantSegment: 'Komuter Produktif',
        retentionRisk: 'Medium',
        riskPercent: 28,
        avgDistanceToOutletKm: 5.1,
        opportunity: 'High',
        recommendation: 'Kandidat Outlet Satelit Baru CL-017'
      },
      {
        id: 'clu-meteseh-03',
        name: 'Kluster 03 — Perbatasan Rowosari Timur',
        lat: -7.0630,
        lng: 110.4710,
        customers: 420,
        dominantSegment: 'At-Risk Komuter',
        retentionRisk: 'High',
        riskPercent: 44,
        avgDistanceToOutletKm: 7.8,
        opportunity: 'High',
        recommendation: 'Coverage Gap! 420 pelanggan berjarak > 7 km dari outlet terdekat'
      }
    ],
    candidates: [
      {
        id: 'cand-cl017',
        code: 'CL-017',
        name: 'Kandidat Outlet Sigar Bencah Meteseh',
        kelurahan: 'Meteseh',
        kecamatan: 'Tembalang',
        kabupaten: 'Kota Semarang',
        lat: -7.0535,
        lng: 110.4625,
        customerDensityScore: 89,
        marketPotential: 92,
        accessibility: 87,
        acquisitionPotential: 94,
        competitionPressure: 63,
        strategicLocationScore: 90,
        estimatedCapex: 'Rp850 Juta',
        projectedAnnualRevenue: 'Rp3,4 Miliar',
        cannibalizationRisk: 'Rendah (4%)',
        address: 'Jl. Sigar Bencah Raya No. 45, Meteseh, Tembalang',
        whyThisLocation: 'Titik temu arteri komuter Tembalang timur dengan 1.240 pelanggan di luar cakupan servis optimal.',
        recommendedFormat: 'Dealer 3S Compact / Satelit Express Pit'
      }
    ],
    customers: ANONYMIZED_CUSTOMERS_METESEH
  },
  {
    id: 'kel-sendangmulyo',
    name: 'Sendangmulyo',
    level: 'subdistrict',
    parentName: 'Tembalang',
    grandParentName: 'Kota Semarang',
    center: [-7.0392, 110.4665],
    zoom: 14.5,
    polygon: [
      [-7.0280, 110.4580],
      [-7.0270, 110.4760],
      [-7.0490, 110.4790],
      [-7.0510, 110.4570]
    ],
    strategy: 'DEFEND',
    score: 86,
    customerConcentrationScore: 88,
    metrics: {
      population: 34200,
      existingCustomers: 2940,
      activeCustomers: 2340,
      atRiskCustomers: 480,
      dormantCustomers: 320,
      potentialCustomers: 1250,
      highValueCustomers: 520,
      customerDensityScore: 88,
      competitorDensityScore: 74,
      competitorsCount: 9,
      existingOutletCoverage: 'Sedang (3,8 km)',
      avgDistanceToOutletKm: 3.8,
      marketPotentialScore: 86,
      retentionOpportunityScore: 84,
      acquisitionPotentialScore: 82,
      strategicLocationScore: 87,
      customerConcentrationScore: 88,
      dominantSegment: 'Family Households & Komuter Industri',
      avgMonthlyExpenditure: 'Rp3,40 Juta',
      recommendedStrategy: 'DEFEND',
      strategyPriorityLabel: 'DEFEND PRIORITY',
      keyObservation: 'Basis pelanggan loyal tinggi yang mulai dipenetrasi oleh 9 bengkel non-resmi & kompetitor.',
      topProduct: 'Honda Vario 160 (38%) & BeAT (36%)',
      customersOutsideCoverageCount: 680
    }
  },
  {
    id: 'kel-tembalang-core',
    name: 'Tembalang',
    level: 'subdistrict',
    parentName: 'Tembalang',
    grandParentName: 'Kota Semarang',
    center: [-7.0488, 110.4412],
    zoom: 14.5,
    polygon: [
      [-7.0390, 110.4320],
      [-7.0380, 110.4510],
      [-7.0590, 110.4530],
      [-7.0600, 110.4310]
    ],
    strategy: 'ACQUIRE',
    score: 93,
    customerConcentrationScore: 92,
    metrics: {
      population: 31800,
      existingCustomers: 4820,
      activeCustomers: 4120,
      atRiskCustomers: 390,
      dormantCustomers: 180,
      potentialCustomers: 2100,
      highValueCustomers: 890,
      customerDensityScore: 92,
      competitorDensityScore: 78,
      competitorsCount: 11,
      existingOutletCoverage: 'Tinggi (1,2 km)',
      avgDistanceToOutletKm: 1.2,
      marketPotentialScore: 94,
      retentionOpportunityScore: 86,
      acquisitionPotentialScore: 96,
      strategicLocationScore: 94,
      customerConcentrationScore: 92,
      dominantSegment: 'Mahasiswa, Dosen & Komersial Kampus',
      avgMonthlyExpenditure: 'Rp3,95 Juta',
      recommendedStrategy: 'ACQUIRE',
      strategyPriorityLabel: 'ACQUIRE PRIORITY',
      keyObservation: 'Siklus pergantian unit motor tinggi tiap tahun ajaran baru; volume servis rutin harian sangat padat.',
      topProduct: 'Honda Scoopy (42%) & Vario (31%)',
      customersOutsideCoverageCount: 180
    }
  },
  {
    id: 'kel-bulusan',
    name: 'Bulusan',
    level: 'subdistrict',
    parentName: 'Tembalang',
    grandParentName: 'Kota Semarang',
    center: [-7.0570, 110.4480],
    zoom: 14.5,
    polygon: [
      [-7.0510, 110.4430],
      [-7.0500, 110.4570],
      [-7.0660, 110.4590],
      [-7.0670, 110.4420]
    ],
    strategy: 'ACQUIRE',
    score: 80,
    customerConcentrationScore: 71,
    metrics: {
      population: 17800,
      existingCustomers: 2310,
      activeCustomers: 1860,
      atRiskCustomers: 290,
      dormantCustomers: 160,
      potentialCustomers: 950,
      highValueCustomers: 310,
      customerDensityScore: 79,
      competitorDensityScore: 52,
      competitorsCount: 4,
      existingOutletCoverage: 'Sedang (3,1 km)',
      avgDistanceToOutletKm: 3.1,
      marketPotentialScore: 80,
      retentionOpportunityScore: 79,
      acquisitionPotentialScore: 84,
      strategicLocationScore: 81,
      customerConcentrationScore: 71,
      dominantSegment: 'Residensial Menengah & Kost Eksekutif',
      avgMonthlyExpenditure: 'Rp3,35 Juta',
      recommendedStrategy: 'ACQUIRE',
      strategyPriorityLabel: 'ACQUIRE OPPORTUNITY',
      keyObservation: 'Area perluasan hunian dengan kepemilikan rata-rata 1,8 unit motor per keluarga.',
      topProduct: 'Honda BeAT (40%) & Scoopy (35%)',
      customersOutsideCoverageCount: 390
    }
  },
  {
    id: 'kel-sambiroto',
    name: 'Sambiroto',
    level: 'subdistrict',
    parentName: 'Tembalang',
    grandParentName: 'Kota Semarang',
    center: [-7.0340, 110.4520],
    zoom: 14.5,
    polygon: [
      [-7.0260, 110.4450],
      [-7.0250, 110.4600],
      [-7.0420, 110.4620],
      [-7.0430, 110.4440]
    ],
    strategy: 'DEFEND',
    score: 86,
    customerConcentrationScore: 79,
    metrics: {
      population: 26500,
      existingCustomers: 2120,
      activeCustomers: 1730,
      atRiskCustomers: 270,
      dormantCustomers: 120,
      potentialCustomers: 1320,
      highValueCustomers: 290,
      customerDensityScore: 85,
      competitorDensityScore: 65,
      competitorsCount: 6,
      existingOutletCoverage: 'Tinggi (2,3 km)',
      avgDistanceToOutletKm: 2.3,
      marketPotentialScore: 87,
      retentionOpportunityScore: 85,
      acquisitionPotentialScore: 86,
      strategicLocationScore: 86,
      customerConcentrationScore: 79,
      dominantSegment: 'Keluarga Muda & Sentra Niaga',
      avgMonthlyExpenditure: 'Rp3,50 Juta',
      recommendedStrategy: 'DEFEND',
      strategyPriorityLabel: 'DEFEND PRIORITY',
      keyObservation: 'Koridor arteri penghubung Tembalang - Pedurungan dengan arus mobilitas padat.',
      topProduct: 'Honda Vario (46%)',
      customersOutsideCoverageCount: 210
    }
  }
];

// -------------------------------------------------------------
// Detailed Kecamatan Dataset for Kota Semarang
// -------------------------------------------------------------
export const SEMARANG_KECAMATAN: KecamatanItem[] = [
  {
    id: 'kec-tembalang',
    name: 'Tembalang',
    regencyName: 'Kota Semarang',
    center: [-7.0510, 110.4520],
    zoom: 13,
    polygon: [
      [-7.0150, 110.4300],
      [-7.0140, 110.4850],
      [-7.0750, 110.4880],
      [-7.0760, 110.4280]
    ],
    strategy: 'ACQUIRE',
    score: 89,
    customerConcentrationScore: 91,
    totalCustomers: 21320,
    potentialCustomers: 9020,
    subdistricts: TEMBALANG_SUBDISTRICTS
  },
  {
    id: 'kec-banyumanik',
    name: 'Banyumanik',
    regencyName: 'Kota Semarang',
    center: [-7.0750, 110.4180],
    zoom: 13,
    polygon: [
      [-7.0520, 110.3950],
      [-7.0500, 110.4350],
      [-7.1050, 110.4400],
      [-7.1080, 110.3920]
    ],
    strategy: 'DEFEND',
    score: 88,
    customerConcentrationScore: 87,
    totalCustomers: 24500,
    potentialCustomers: 8100,
    subdistricts: []
  },
  {
    id: 'kec-pedurungan',
    name: 'Pedurungan',
    regencyName: 'Kota Semarang',
    center: [-6.9980, 110.4680],
    zoom: 13,
    polygon: [
      [-6.9750, 110.4500],
      [-6.9740, 110.4900],
      [-7.0250, 110.4920],
      [-7.0260, 110.4480]
    ],
    strategy: 'DEFEND',
    score: 91,
    customerConcentrationScore: 93,
    totalCustomers: 28900,
    potentialCustomers: 7400,
    subdistricts: []
  },
  {
    id: 'kec-semarang-tengah',
    name: 'Semarang Tengah',
    regencyName: 'Kota Semarang',
    center: [-6.9850, 110.4200],
    zoom: 13.5,
    polygon: [
      [-6.9680, 110.4050],
      [-6.9670, 110.4350],
      [-7.0020, 110.4360],
      [-7.0030, 110.4040]
    ],
    strategy: 'RETAIN',
    score: 87,
    customerConcentrationScore: 85,
    totalCustomers: 18400,
    potentialCustomers: 3200,
    subdistricts: []
  }
];

// -------------------------------------------------------------
// 35 Kabupaten/Kota in Jawa Tengah (Province Level Hierarchy)
// -------------------------------------------------------------
export const JAWA_TENGAH_REGENCIES: RegencyGeoItem[] = [
  {
    id: 'reg-kota-semarang',
    name: 'Kota Semarang',
    category: 'Kota',
    center: [-6.9932, 110.4203],
    zoom: 11.5,
    polygon: [
      [-6.9200, 110.3000],
      [-6.9150, 110.5100],
      [-7.1100, 110.4900],
      [-7.1050, 110.3100]
    ],
    strategy: 'DEFEND',
    score: 92,
    customerConcentrationScore: 95,
    totalCustomers: 124800,
    activeRate: 82.4,
    districts: SEMARANG_KECAMATAN
  },
  {
    id: 'reg-kota-surakarta',
    name: 'Kota Surakarta',
    category: 'Kota',
    center: [-7.5562, 110.8317],
    zoom: 12,
    polygon: [
      [-7.5200, 110.7900],
      [-7.5180, 110.8700],
      [-7.5950, 110.8650],
      [-7.5920, 110.7850]
    ],
    strategy: 'DEFEND',
    score: 88,
    customerConcentrationScore: 89,
    totalCustomers: 68400,
    activeRate: 79.5,
    districts: []
  },
  {
    id: 'reg-banyumas',
    name: 'Banyumas',
    category: 'Kabupaten',
    center: [-7.4243, 109.2302],
    zoom: 11,
    polygon: [
      [-7.2900, 108.9900],
      [-7.2800, 109.3800],
      [-7.5800, 109.3500],
      [-7.5900, 108.9800]
    ],
    strategy: 'ACQUIRE',
    score: 86,
    customerConcentrationScore: 86,
    totalCustomers: 74200,
    activeRate: 81.2,
    districts: []
  },
  {
    id: 'reg-kudus',
    name: 'Kudus',
    category: 'Kabupaten',
    center: [-6.8048, 110.8405],
    zoom: 11.5,
    polygon: [
      [-6.7200, 110.7500],
      [-6.7100, 110.9500],
      [-6.9100, 110.9300],
      [-6.9150, 110.7400]
    ],
    strategy: 'RETAIN',
    score: 84,
    customerConcentrationScore: 82,
    totalCustomers: 59300,
    activeRate: 76.8,
    districts: []
  },
  {
    id: 'reg-kota-magelang',
    name: 'Kota Magelang',
    category: 'Kota',
    center: [-7.4705, 110.2178],
    zoom: 12.5,
    polygon: [
      [-7.4400, 110.1900],
      [-7.4380, 110.2400],
      [-7.5020, 110.2380],
      [-7.5050, 110.1880]
    ],
    strategy: 'RETAIN',
    score: 83,
    customerConcentrationScore: 80,
    totalCustomers: 38200,
    activeRate: 77.2,
    districts: []
  },
  {
    id: 'reg-kota-tegal',
    name: 'Kota Tegal',
    category: 'Kota',
    center: [-6.8694, 109.1256],
    zoom: 12,
    polygon: [
      [-6.8400, 109.1000],
      [-6.8380, 109.1600],
      [-6.9020, 109.1550],
      [-6.9050, 109.0950]
    ],
    strategy: 'DEFEND',
    score: 85,
    customerConcentrationScore: 83,
    totalCustomers: 44500,
    activeRate: 78.4,
    districts: []
  },
  {
    id: 'reg-demak',
    name: 'Demak',
    category: 'Kabupaten',
    center: [-6.8943, 110.6385],
    zoom: 11.5,
    polygon: [
      [-6.8000, 110.5000],
      [-6.7900, 110.7800],
      [-7.0100, 110.7600],
      [-7.0150, 110.4900]
    ],
    strategy: 'ACQUIRE',
    score: 84,
    customerConcentrationScore: 81,
    totalCustomers: 49800,
    activeRate: 80.1,
    districts: []
  },
  {
    id: 'reg-cilacap',
    name: 'Cilacap',
    category: 'Kabupaten',
    center: [-7.7180, 109.0159],
    zoom: 10.5,
    polygon: [
      [-7.4000, 108.7500],
      [-7.3800, 109.3000],
      [-7.8200, 109.2800],
      [-7.8300, 108.7400]
    ],
    strategy: 'ACQUIRE',
    score: 83,
    customerConcentrationScore: 82,
    totalCustomers: 78900,
    activeRate: 78.9,
    districts: []
  },
  {
    id: 'reg-kota-pekalongan',
    name: 'Kota Pekalongan',
    category: 'Kota',
    center: [-6.8886, 109.6753],
    zoom: 12.5,
    polygon: [
      [-6.8600, 109.6500],
      [-6.8580, 109.7050],
      [-6.9150, 109.7020],
      [-6.9180, 109.6480]
    ],
    strategy: 'DEFEND',
    score: 86,
    customerConcentrationScore: 84,
    totalCustomers: 41200,
    activeRate: 80.5,
    districts: []
  },
  {
    id: 'reg-sukoharjo',
    name: 'Sukoharjo',
    category: 'Kabupaten',
    center: [-7.6830, 110.8350],
    zoom: 11.5,
    polygon: [
      [-7.5800, 110.7500],
      [-7.5750, 110.9200],
      [-7.7850, 110.9100],
      [-7.7900, 110.7450]
    ],
    strategy: 'DEFEND',
    score: 87,
    customerConcentrationScore: 86,
    totalCustomers: 61200,
    activeRate: 81.0,
    districts: []
  },
  {
    id: 'reg-klaten',
    name: 'Klaten',
    category: 'Kabupaten',
    center: [-7.7056, 110.6015],
    zoom: 11.5,
    polygon: [
      [-7.6000, 110.5000],
      [-7.5950, 110.7200],
      [-7.8100, 110.7100],
      [-7.8150, 110.4950]
    ],
    strategy: 'RETAIN',
    score: 81,
    customerConcentrationScore: 78,
    totalCustomers: 58400,
    activeRate: 77.8,
    districts: []
  }
];

// Helper to look up any geographic item by query
export function searchGeoIndex(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: Array<{
    type: 'Province' | 'Kabupaten/Kota' | 'Kecamatan' | 'Kelurahan/Desa' | 'Outlet' | 'Kandidat';
    name: string;
    hierarchy: string;
    center: [number, number];
    zoom: number;
    regencyName?: string;
    districtName?: string;
    subdistrictName?: string;
    segmentFilter?: CustomerSegmentFilter;
  }> = [];

  // Match Province
  if ('jawa tengah'.includes(q)) {
    results.push({
      type: 'Province',
      name: 'Jawa Tengah',
      hierarchy: 'Indonesia > Jawa Tengah',
      center: [-7.150975, 110.140259],
      zoom: 8.4
    });
  }

  // Handle Intent Search e.g. "high value" or "at risk"
  const isHighValueIntent = q.includes('high') || q.includes('value');
  const isAtRiskIntent = q.includes('risk') || q.includes('risiko');

  // Match Regencies
  JAWA_TENGAH_REGENCIES.forEach((reg) => {
    if (reg.name.toLowerCase().includes(q) || (isHighValueIntent && reg.name.toLowerCase().includes('semarang'))) {
      results.push({
        type: 'Kabupaten/Kota',
        name: reg.name,
        hierarchy: `Jawa Tengah > ${reg.name}`,
        center: reg.center,
        zoom: reg.zoom,
        regencyName: reg.name,
        segmentFilter: isHighValueIntent ? 'High Value Customer' : isAtRiskIntent ? 'At Risk Customer' : undefined
      });
    }

    // Match Districts
    reg.districts.forEach((dist) => {
      if (dist.name.toLowerCase().includes(q) || (isHighValueIntent && dist.name.toLowerCase().includes('tembalang'))) {
        results.push({
          type: 'Kecamatan',
          name: dist.name,
          hierarchy: `Jawa Tengah > ${reg.name} > ${dist.name}`,
          center: dist.center,
          zoom: dist.zoom,
          regencyName: reg.name,
          districtName: dist.name,
          segmentFilter: isHighValueIntent ? 'High Value Customer' : isAtRiskIntent ? 'At Risk Customer' : undefined
        });
      }

      // Match Subdistricts
      dist.subdistricts.forEach((sub) => {
        if (sub.name.toLowerCase().includes(q)) {
          results.push({
            type: 'Kelurahan/Desa',
            name: sub.name,
            hierarchy: `Jawa Tengah > ${reg.name} > ${dist.name} > ${sub.name}`,
            center: sub.center,
            zoom: sub.zoom,
            regencyName: reg.name,
            districtName: dist.name,
            subdistrictName: sub.name
          });
        }

        // Match Candidates
        if (sub.candidates) {
          sub.candidates.forEach((cand) => {
            if (cand.code.toLowerCase().includes(q) || cand.name.toLowerCase().includes(q)) {
              results.push({
                type: 'Kandidat',
                name: `${cand.code}: ${cand.name}`,
                hierarchy: `${cand.kelurahan}, ${cand.kecamatan}, ${cand.kabupaten}`,
                center: [cand.lat, cand.lng],
                zoom: 15.5,
                regencyName: cand.kabupaten,
                districtName: cand.kecamatan,
                subdistrictName: cand.kelurahan
              });
            }
          });
        }
      });
    });
  });

  return results.slice(0, 8);
}

// Generate contextual AI Map insight
export function generateAIMapInsight(
  level: GeoLevel,
  name: string,
  parentName?: string,
  grandParentName?: string,
  metrics?: MicroMarketData
) {
  if (level === 'subdistrict' && metrics) {
    return {
      title: `Analisis Sebaran Pelanggan: Kelurahan ${name}`,
      headline: `${name} memiliki ${metrics.existingCustomers.toLocaleString('id-ID')} pelanggan terdaftar dengan konsentrasi tinggi (${metrics.customerConcentrationScore}/100) dan ${metrics.customersOutsideCoverageCount} pelanggan di luar jangkauan servis optimal.`,
      bullets: [
        `Distribusi Segmen: ${metrics.highValueCustomers.toLocaleString('id-ID')} pelanggan High-Value (${Math.round((metrics.highValueCustomers / metrics.existingCustomers) * 100)}%), ${metrics.activeCustomers.toLocaleString('id-ID')} Aktif, dan ${metrics.atRiskCustomers.toLocaleString('id-ID')} Berisiko Churn.`,
        `Hubungan Outlet & Coverage: Jarak rata-rata menuju outlet resmi terdekat adalah ${metrics.avgDistanceToOutletKm} km dengan 7 bengkel kompetitor di koridor utama.`,
        `Produk Terpopuler: ${metrics.topProduct}. Model matic 160cc mendominasi area hunian Dinar Elok & Sigar Bencah.`,
        `Coverage Gap: 1.240 pelanggan terdeteksi berjarak > 5 KM dari outlet resmi.`
      ],
      aiRecommendation:
        metrics.recommendedStrategy === 'ACQUIRE'
          ? `Konsentrasi pelanggan baru tinggi (1.480 prospek) namun cakupan servis rendah. SERVEON merekomendasikan ekspansi titik Satelit / Mobile Service Kunjung di Meteseh Timur.`
          : metrics.recommendedStrategy === 'DEFEND'
          ? `Perkuat retensi 520 pelanggan High-Value melalui booking prioritas Mobile Apps untuk membendung ekspansi 9 kompetitor di sekitar Klipang Sendangmulyo.`
          : `Gencarkan program reaktivasi pelanggan dormant dengan voucher oli MPX2 dan notifikasi pengingat servis otomatis via WhatsApp Mobile Apps.`
    };
  }

  if (level === 'district') {
    return {
      title: `Analisis Konsentrasi Pelanggan: Kecamatan ${name}`,
      headline: `Konsentrasi pelanggan tertinggi terkonsentrasi di Tembalang (4.820) dan Meteseh (3.250). Sekitar 42% pelanggan High-Value berada di tiga Kelurahan utama.`,
      bullets: [
        `Disparitas Aksesibilitas: Wilayah barat memiliki waktu tempuh < 8 menit ke outlet, sedangkan wilayah timur (Meteseh & Rowosari) > 18 menit.`,
        `Pola Produk: Honda Vario & PCX mendominasi pemukiman keluarga, sedangkan Honda Scoopy & BeAT dominan di sentra kampus UNDIP.`
      ],
      aiRecommendation: `Prioritaskan alokasi armada servis kunjung dan pertimbangkan penambahan titik layanan mandiri di kelurahan dengan jarak ke outlet > 4,0 km.`
    };
  }

  if (level === 'regency') {
    return {
      title: `Ringkasan Sebaran Pelanggan: ${name}`,
      headline: `${name} memiliki total 124.800 pelanggan terdaftar dengan tingkat keaktifan 82,4%. Koridor timur dan selatan merupakan pusat pertumbuhan terkuat.`,
      bullets: [
        `Tingkat konsentrasi pelanggan regional: Skor 95/100 dengan kepadatan tertinggi di Semarang Timur, Pedurungan, dan Tembalang.`,
        `Gunakan filter Customer Segment untuk melihat sebaran spesifik High-Value vs At-Risk.`
      ],
      aiRecommendation: `Pilih salah satu Kecamatan di atas peta untuk membuka detail analitik mikro hingga tingkat Kelurahan dan kluster pelanggan.`
    };
  }

  return {
    title: 'SERVEON Intelijen Sebaran Pelanggan Jawa Tengah',
    headline: 'Eksplorasi hierarkis 35 Kabupaten/Kota: dari konsentrasi makro regional hingga kluster pelanggan dan titik individual teranonimkan.',
    bullets: [
      'Gunakan mode Customer Distribution Heatmap untuk melihat densitas secara instan.',
      'Filter berdasarkan Segmen Pelanggan, Status, atau Model Unit Motor Honda.'
    ],
    aiRecommendation: 'Klik langsung pada batas poligon wilayah di peta untuk melakukan zoom in otomatis.'
  };
}
