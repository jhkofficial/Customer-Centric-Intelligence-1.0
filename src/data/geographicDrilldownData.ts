// Geographic Drill-down Intelligence Dataset for Central Java (Jawa Tengah)
// Hierarchy: Indonesia (Level 0) -> Jawa Tengah (Level 1) -> Kabupaten/Kota (Level 2) -> Kecamatan (Level 3) -> Kelurahan/Desa (Level 4)

export type GeoLevel = 'country' | 'province' | 'regency' | 'district' | 'subdistrict';

export interface MicroMarketData {
  population: number;
  existingCustomers: number;
  activeCustomers: number;
  atRiskCustomers: number;
  dormantCustomers: number;
  potentialCustomers: number;
  customerDensityScore: number;
  competitorDensityScore: number;
  competitorsCount: number;
  existingOutletCoverage: string;
  avgDistanceToOutletKm: number;
  marketPotentialScore: number;
  retentionOpportunityScore: number;
  acquisitionPotentialScore: number;
  strategicLocationScore: number;
  dominantSegment: string;
  avgMonthlyExpenditure: string;
  recommendedStrategy: 'RETAIN' | 'DEFEND' | 'ACQUIRE';
  strategyPriorityLabel: string;
  keyObservation: string;
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
  metrics: MicroMarketData;
  clusters?: CustomerCluster[];
  candidates?: CandidateLocationItem[];
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
  districts: KecamatanItem[];
}

// -------------------------------------------------------------
// Detailed Kelurahan Dataset for Tembalang, Semarang
// -------------------------------------------------------------
const TEMBALANG_SUBDISTRICTS: GeoItem[] = [
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
    metrics: {
      population: 28450,
      existingCustomers: 3250,
      activeCustomers: 2630,
      atRiskCustomers: 620,
      dormantCustomers: 310,
      potentialCustomers: 1480,
      customerDensityScore: 84,
      competitorDensityScore: 68,
      competitorsCount: 7,
      existingOutletCoverage: 'Terbatas (Radius Terdekat 4,6 km)',
      avgDistanceToOutletKm: 4.6,
      marketPotentialScore: 91,
      retentionOpportunityScore: 78,
      acquisitionPotentialScore: 94,
      strategicLocationScore: 90,
      dominantSegment: 'Emerging Affluent & Mahasiswa',
      avgMonthlyExpenditure: 'Rp3,65 Juta',
      recommendedStrategy: 'ACQUIRE',
      strategyPriorityLabel: 'ACQUIRE PRIORITY',
      keyObservation: 'Pertumbuhan perumahan baru & kavling padat dengan penetrasi jaringan layanan resmi yang masih minim.'
    },
    clusters: [
      {
        id: 'clu-meteseh-a',
        name: 'Kluster Perumahan Dinar Elok & Bukit Kencana',
        lat: -7.0512,
        lng: 110.4610,
        customers: 1420,
        dominantSegment: 'Active High Value',
        retentionRisk: 'Low',
        riskPercent: 12,
        avgDistanceToOutletKm: 4.8,
        opportunity: 'Medium',
        recommendation: 'Layanan Service Kunjung & Booking Mobile Apps Fast Track'
      },
      {
        id: 'clu-meteseh-b',
        name: 'Kluster Koridor Sigar Bencah - Rowosari',
        lat: -7.0610,
        lng: 110.4695,
        customers: 980,
        dominantSegment: 'Komuter Produktif',
        retentionRisk: 'High',
        riskPercent: 42,
        avgDistanceToOutletKm: 8.3,
        opportunity: 'High',
        recommendation: 'Retention Campaign & Pos Satelit Servis Cepat'
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
        whyThisLocation: 'Titik temu arteri komuter Tembalang timur dengan populasi perumahan berkembang pesat, bebas kanibalisasi outlet existing.',
        recommendedFormat: 'Dealer 3S Compact / Satelit Express Pit'
      }
    ]
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
    metrics: {
      population: 34200,
      existingCustomers: 4120,
      activeCustomers: 3340,
      atRiskCustomers: 780,
      dormantCustomers: 420,
      potentialCustomers: 1250,
      customerDensityScore: 88,
      competitorDensityScore: 74,
      competitorsCount: 9,
      existingOutletCoverage: 'Sedang (3,8 km)',
      avgDistanceToOutletKm: 3.8,
      marketPotentialScore: 86,
      retentionOpportunityScore: 84,
      acquisitionPotentialScore: 82,
      strategicLocationScore: 87,
      dominantSegment: 'Family Households & Komuter Industri',
      avgMonthlyExpenditure: 'Rp3,40 Juta',
      recommendedStrategy: 'DEFEND',
      strategyPriorityLabel: 'DEFEND PRIORITY',
      keyObservation: 'Basis pelanggan loyal tinggi yang mulai dipenetrasi oleh 9 bengkel non-resmi & kompetitor.'
    },
    clusters: [
      {
        id: 'clu-sendangmulyo-a',
        name: 'Kluster Klipang Raya & Perumnas Sendangmulyo',
        lat: -7.0360,
        lng: 110.4680,
        customers: 2150,
        dominantSegment: 'Family Households',
        retentionRisk: 'Medium',
        riskPercent: 24,
        avgDistanceToOutletKm: 3.5,
        opportunity: 'Medium',
        recommendation: 'Program Loyalitas Poin & Promo Servis Berkala Akhir Pekan'
      }
    ],
    candidates: [
      {
        id: 'cand-cl018',
        code: 'CL-018',
        name: 'Kandidat Point Klipang Boulevard',
        kelurahan: 'Sendangmulyo',
        kecamatan: 'Tembalang',
        kabupaten: 'Kota Semarang',
        lat: -7.0375,
        lng: 110.4650,
        customerDensityScore: 88,
        marketPotential: 86,
        accessibility: 90,
        acquisitionPotential: 84,
        competitionPressure: 72,
        strategicLocationScore: 88,
        estimatedCapex: 'Rp720 Juta',
        projectedAnnualRevenue: 'Rp2,9 Miliar',
        cannibalizationRisk: 'Sedang (12%)',
        address: 'Jl. Klipang Raya No. 12, Sendangmulyo',
        whyThisLocation: 'Kepadatan populasi perumahan tertinggi di Tembalang utara dengan akses jalan lebar.',
        recommendedFormat: 'Bengkel Resmi Dealer (H23) & Spare Part Center'
      }
    ]
  },
  {
    id: 'kel-kedungmundu',
    name: 'Kedungmundu',
    level: 'subdistrict',
    parentName: 'Tembalang',
    grandParentName: 'Kota Semarang',
    center: [-7.0242, 110.4552],
    zoom: 14.5,
    polygon: [
      [-7.0150, 110.4460],
      [-7.0140, 110.4630],
      [-7.0340, 110.4650],
      [-7.0350, 110.4480]
    ],
    strategy: 'RETAIN',
    score: 82,
    metrics: {
      population: 22100,
      existingCustomers: 2890,
      activeCustomers: 2480,
      atRiskCustomers: 410,
      dormantCustomers: 260,
      potentialCustomers: 1100,
      customerDensityScore: 81,
      competitorDensityScore: 60,
      competitorsCount: 5,
      existingOutletCoverage: 'Optimal (2,1 km)',
      avgDistanceToOutletKm: 2.1,
      marketPotentialScore: 83,
      retentionOpportunityScore: 88,
      acquisitionPotentialScore: 78,
      strategicLocationScore: 83,
      dominantSegment: 'Pegawai & Sentra Pendidikan Swasta',
      avgMonthlyExpenditure: 'Rp3,80 Juta',
      recommendedStrategy: 'RETAIN',
      strategyPriorityLabel: 'RETAIN FOCUS',
      keyObservation: 'Pelanggan memiliki kedekatan jarak yang baik dengan outlet, butuh retensi berkala garansi oli.'
    }
  },
  {
    id: 'kel-tembalang-core',
    name: 'Tembalang (Pusat Kampus)',
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
    metrics: {
      population: 31800,
      existingCustomers: 3840,
      activeCustomers: 3450,
      atRiskCustomers: 390,
      dormantCustomers: 180,
      potentialCustomers: 2100,
      customerDensityScore: 92,
      competitorDensityScore: 78,
      competitorsCount: 11,
      existingOutletCoverage: 'Tinggi (1,2 km)',
      avgDistanceToOutletKm: 1.2,
      marketPotentialScore: 94,
      retentionOpportunityScore: 86,
      acquisitionPotentialScore: 96,
      strategicLocationScore: 94,
      dominantSegment: 'Mahasiswa, Dosen & Komersial Kampus',
      avgMonthlyExpenditure: 'Rp3,95 Juta',
      recommendedStrategy: 'ACQUIRE',
      strategyPriorityLabel: 'ACQUIRE PRIORITY',
      keyObservation: 'Siklus pergantian unit motor tinggi tiap tahun ajaran baru; volume servis rutin harian sangat padat.'
    },
    clusters: [
      {
        id: 'clu-undip-hub',
        name: 'Kluster Sentra Kos Prof Soedarto',
        lat: -7.0465,
        lng: 110.4420,
        customers: 2400,
        dominantSegment: 'Gen-Z Mahasiswa',
        retentionRisk: 'Low',
        riskPercent: 9,
        avgDistanceToOutletKm: 1.1,
        opportunity: 'High',
        recommendation: 'Aktivasi Booth Kampus & Paket Servis Mahasiswa'
      }
    ]
  },
  {
    id: 'kel-kramas',
    name: 'Kramas',
    level: 'subdistrict',
    parentName: 'Tembalang',
    grandParentName: 'Kota Semarang',
    center: [-7.0620, 110.4370],
    zoom: 14.5,
    polygon: [
      [-7.0560, 110.4280],
      [-7.0550, 110.4440],
      [-7.0720, 110.4460],
      [-7.0730, 110.4290]
    ],
    strategy: 'RETAIN',
    score: 76,
    metrics: {
      population: 14200,
      existingCustomers: 1650,
      activeCustomers: 1440,
      atRiskCustomers: 210,
      dormantCustomers: 130,
      potentialCustomers: 820,
      customerDensityScore: 75,
      competitorDensityScore: 45,
      competitorsCount: 3,
      existingOutletCoverage: 'Cukup (2,8 km)',
      avgDistanceToOutletKm: 2.8,
      marketPotentialScore: 78,
      retentionOpportunityScore: 82,
      acquisitionPotentialScore: 74,
      strategicLocationScore: 77,
      dominantSegment: 'Residensial Sub-urban',
      avgMonthlyExpenditure: 'Rp3,10 Juta',
      recommendedStrategy: 'RETAIN',
      strategyPriorityLabel: 'RETAIN FOCUS',
      keyObservation: 'Zona pemukiman tenang di jalur lingkar Tembalang, loyalitas stabil.'
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
    metrics: {
      population: 17800,
      existingCustomers: 2100,
      activeCustomers: 1760,
      atRiskCustomers: 340,
      dormantCustomers: 190,
      potentialCustomers: 950,
      customerDensityScore: 79,
      competitorDensityScore: 52,
      competitorsCount: 4,
      existingOutletCoverage: 'Sedang (3,1 km)',
      avgDistanceToOutletKm: 3.1,
      marketPotentialScore: 80,
      retentionOpportunityScore: 79,
      acquisitionPotentialScore: 84,
      strategicLocationScore: 81,
      dominantSegment: 'Residensial Menengah & Kost Eksekutif',
      avgMonthlyExpenditure: 'Rp3,35 Juta',
      recommendedStrategy: 'ACQUIRE',
      strategyPriorityLabel: 'ACQUIRE OPPORTUNITY',
      keyObservation: 'Area perluasan hunian dengan kepemilikan rata-rata 1,8 unit motor per keluarga.'
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
    metrics: {
      population: 26500,
      existingCustomers: 3420,
      activeCustomers: 2830,
      atRiskCustomers: 590,
      dormantCustomers: 310,
      potentialCustomers: 1320,
      customerDensityScore: 85,
      competitorDensityScore: 65,
      competitorsCount: 6,
      existingOutletCoverage: 'Tinggi (2,3 km)',
      avgDistanceToOutletKm: 2.3,
      marketPotentialScore: 87,
      retentionOpportunityScore: 85,
      acquisitionPotentialScore: 86,
      strategicLocationScore: 86,
      dominantSegment: 'Keluarga Muda & Sentra Niaga Jalan Sambiroto',
      avgMonthlyExpenditure: 'Rp3,50 Juta',
      recommendedStrategy: 'DEFEND',
      strategyPriorityLabel: 'DEFEND PRIORITY',
      keyObservation: 'Koridor arteri penghubung Tembalang - Pedurungan dengan arus mobilitas padat.'
    }
  }
];

// -------------------------------------------------------------
// Detailed Kecamatan Dataset for Kota Semarang
// -------------------------------------------------------------
const SEMARANG_KECAMATAN: KecamatanItem[] = [
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
    totalCustomers: 24500,
    potentialCustomers: 8100,
    subdistricts: [
      {
        id: 'kel-srondol-wetan',
        name: 'Srondol Wetan',
        level: 'subdistrict',
        parentName: 'Banyumanik',
        grandParentName: 'Kota Semarang',
        center: [-7.0650, 110.4180],
        zoom: 14.5,
        polygon: [
          [-7.0550, 110.4080],
          [-7.0540, 110.4280],
          [-7.0740, 110.4300],
          [-7.0750, 110.4070]
        ],
        strategy: 'DEFEND',
        score: 87,
        metrics: {
          population: 24100,
          existingCustomers: 3120,
          activeCustomers: 2600,
          atRiskCustomers: 520,
          dormantCustomers: 270,
          potentialCustomers: 1150,
          customerDensityScore: 86,
          competitorDensityScore: 68,
          competitorsCount: 6,
          existingOutletCoverage: 'Optimal (1,8 km)',
          avgDistanceToOutletKm: 1.8,
          marketPotentialScore: 87,
          retentionOpportunityScore: 85,
          acquisitionPotentialScore: 84,
          strategicLocationScore: 86,
          dominantSegment: 'High Value Family',
          avgMonthlyExpenditure: 'Rp4,10 Juta',
          recommendedStrategy: 'DEFEND',
          strategyPriorityLabel: 'DEFEND PRIORITY',
          keyObservation: 'Basis konsumen mapan di koridor Jl. Setiabudi dengan rata-rata belanja tinggi.'
        }
      },
      {
        id: 'kel-pudakpayung',
        name: 'Pudakpayung',
        level: 'subdistrict',
        parentName: 'Banyumanik',
        grandParentName: 'Kota Semarang',
        center: [-7.0980, 110.4150],
        zoom: 14.5,
        polygon: [
          [-7.0850, 110.4020],
          [-7.0840, 110.4280],
          [-7.1120, 110.4300],
          [-7.1130, 110.4000]
        ],
        strategy: 'ACQUIRE',
        score: 84,
        metrics: {
          population: 29800,
          existingCustomers: 2950,
          activeCustomers: 2380,
          atRiskCustomers: 570,
          dormantCustomers: 310,
          potentialCustomers: 1650,
          customerDensityScore: 81,
          competitorDensityScore: 55,
          competitorsCount: 5,
          existingOutletCoverage: 'Celah Jarak (5,2 km)',
          avgDistanceToOutletKm: 5.2,
          marketPotentialScore: 86,
          retentionOpportunityScore: 80,
          acquisitionPotentialScore: 89,
          strategicLocationScore: 85,
          dominantSegment: 'Komuter Perbatasan Ungaran',
          avgMonthlyExpenditure: 'Rp3,30 Juta',
          recommendedStrategy: 'ACQUIRE',
          strategyPriorityLabel: 'ACQUIRE OPPORTUNITY',
          keyObservation: 'Gerbang selatan kota Semarang dengan arus komuter padat menuju kawasan industri Ungaran.'
        }
      }
    ]
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
    totalCustomers: 28900,
    potentialCustomers: 7400,
    subdistricts: [
      {
        id: 'kel-tlogosari-kulon',
        name: 'Tlogosari Kulon',
        level: 'subdistrict',
        parentName: 'Pedurungan',
        grandParentName: 'Kota Semarang',
        center: [-6.9850, 110.4650],
        zoom: 14.5,
        polygon: [
          [-6.9760, 110.4550],
          [-6.9750, 110.4750],
          [-6.9940, 110.4760],
          [-6.9950, 110.4540]
        ],
        strategy: 'DEFEND',
        score: 92,
        metrics: {
          population: 36500,
          existingCustomers: 4850,
          activeCustomers: 4020,
          atRiskCustomers: 830,
          dormantCustomers: 410,
          potentialCustomers: 1380,
          customerDensityScore: 94,
          competitorDensityScore: 82,
          competitorsCount: 12,
          existingOutletCoverage: 'Tinggi (1,5 km)',
          avgDistanceToOutletKm: 1.5,
          marketPotentialScore: 92,
          retentionOpportunityScore: 88,
          acquisitionPotentialScore: 85,
          strategicLocationScore: 91,
          dominantSegment: 'Urban Commercial & High Density Housing',
          avgMonthlyExpenditure: 'Rp3,75 Juta',
          recommendedStrategy: 'DEFEND',
          strategyPriorityLabel: 'DEFEND CORE',
          keyObservation: 'Kawasan pemukiman terbesar dengan konsentrasi motor matic tertinggi di Semarang Timur.'
        }
      }
    ]
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
    totalCustomers: 18400,
    potentialCustomers: 3200,
    subdistricts: [
      {
        id: 'kel-pekuanden',
        name: 'Pekunden (Simpang Lima)',
        level: 'subdistrict',
        parentName: 'Semarang Tengah',
        grandParentName: 'Kota Semarang',
        center: [-6.9904, 110.4229],
        zoom: 14.5,
        polygon: [
          [-6.9820, 110.4150],
          [-6.9810, 110.4300],
          [-6.9980, 110.4320],
          [-6.9990, 110.4140]
        ],
        strategy: 'RETAIN',
        score: 88,
        metrics: {
          population: 15400,
          existingCustomers: 2600,
          activeCustomers: 2150,
          atRiskCustomers: 450,
          dormantCustomers: 280,
          potentialCustomers: 650,
          customerDensityScore: 86,
          competitorDensityScore: 75,
          competitorsCount: 8,
          existingOutletCoverage: 'Optimal (<1 km)',
          avgDistanceToOutletKm: 0.8,
          marketPotentialScore: 82,
          retentionOpportunityScore: 92,
          acquisitionPotentialScore: 71,
          strategicLocationScore: 85,
          dominantSegment: 'Pekerja Kantor & Bisnis Komersial',
          avgMonthlyExpenditure: 'Rp4,80 Juta',
          recommendedStrategy: 'RETAIN',
          strategyPriorityLabel: 'RETAIN FOCUS',
          keyObservation: 'Penetrasi pasar telah jenuh; fokus utama adalah retensi pelanggan premium korporat & fast pit service.'
        }
      }
    ]
  },
  {
    id: 'kec-ngaliyan',
    name: 'Ngaliyan',
    regencyName: 'Kota Semarang',
    center: [-7.0050, 110.3550],
    zoom: 13,
    polygon: [
      [-6.9750, 110.3250],
      [-6.9720, 110.3800],
      [-7.0420, 110.3820],
      [-7.0450, 110.3220]
    ],
    strategy: 'ACQUIRE',
    score: 87,
    totalCustomers: 22100,
    potentialCustomers: 7800,
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
    totalCustomers: 68400,
    activeRate: 79.5,
    districts: [
      {
        id: 'kec-banjarsari',
        name: 'Banjarsari',
        regencyName: 'Kota Surakarta',
        center: [-7.5400, 110.8250],
        zoom: 13.5,
        polygon: [
          [-7.5200, 110.8100],
          [-7.5180, 110.8450],
          [-7.5550, 110.8420],
          [-7.5560, 110.8080]
        ],
        strategy: 'DEFEND',
        score: 89,
        totalCustomers: 26500,
        potentialCustomers: 6200,
        subdistricts: [
          {
            id: 'kel-manahan',
            name: 'Manahan',
            level: 'subdistrict',
            parentName: 'Banjarsari',
            grandParentName: 'Kota Surakarta',
            center: [-7.5520, 110.8080],
            zoom: 14.5,
            polygon: [
              [-7.5450, 110.8000],
              [-7.5440, 110.8160],
              [-7.5600, 110.8170],
              [-7.5610, 110.7990]
            ],
            strategy: 'DEFEND',
            score: 88,
            metrics: {
              population: 18900,
              existingCustomers: 2800,
              activeCustomers: 2320,
              atRiskCustomers: 480,
              dormantCustomers: 290,
              potentialCustomers: 920,
              customerDensityScore: 87,
              competitorDensityScore: 71,
              competitorsCount: 7,
              existingOutletCoverage: 'Optimal (1,4 km)',
              avgDistanceToOutletKm: 1.4,
              marketPotentialScore: 88,
              retentionOpportunityScore: 86,
              acquisitionPotentialScore: 82,
              strategicLocationScore: 87,
              dominantSegment: 'Urban Sports & Lifestyle',
              avgMonthlyExpenditure: 'Rp3,90 Juta',
              recommendedStrategy: 'DEFEND',
              strategyPriorityLabel: 'DEFEND PRIORITY',
              keyObservation: 'Sentra kegiatan olahraga & komersial kota Solo dengan lalu lintas harian tinggi.'
            }
          }
        ]
      }
    ]
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
    totalCustomers: 74200,
    activeRate: 81.2,
    districts: [
      {
        id: 'kec-purwokerto-utara',
        name: 'Purwokerto Utara',
        regencyName: 'Banyumas',
        center: [-7.4025, 109.2458],
        zoom: 13.5,
        polygon: [
          [-7.3850, 109.2300],
          [-7.3820, 109.2650],
          [-7.4220, 109.2620],
          [-7.4250, 109.2280]
        ],
        strategy: 'ACQUIRE',
        score: 89,
        totalCustomers: 18400,
        potentialCustomers: 7200,
        subdistricts: [
          {
            id: 'kel-grendeng',
            name: 'Grendeng (Kampus UNSOED)',
            level: 'subdistrict',
            parentName: 'Purwokerto Utara',
            grandParentName: 'Banyumas',
            center: [-7.4060, 109.2490],
            zoom: 14.5,
            polygon: [
              [-7.3980, 109.2400],
              [-7.3970, 109.2580],
              [-7.4140, 109.2590],
              [-7.4150, 109.2390]
            ],
            strategy: 'ACQUIRE',
            score: 91,
            metrics: {
              population: 21500,
              existingCustomers: 2750,
              activeCustomers: 2390,
              atRiskCustomers: 360,
              dormantCustomers: 190,
              potentialCustomers: 1540,
              customerDensityScore: 88,
              competitorDensityScore: 58,
              competitorsCount: 5,
              existingOutletCoverage: 'Sedang (2,8 km)',
              avgDistanceToOutletKm: 2.8,
              marketPotentialScore: 92,
              retentionOpportunityScore: 82,
              acquisitionPotentialScore: 93,
              strategicLocationScore: 90,
              dominantSegment: 'Mahasiswa Unsoed & Pegawai Kampus',
              avgMonthlyExpenditure: 'Rp3,25 Juta',
              recommendedStrategy: 'ACQUIRE',
              strategyPriorityLabel: 'ACQUIRE PRIORITY',
              keyObservation: 'Pusat pertumbuhan pendidikan tinggi Banyumas dengan kebutuhan mobilitas roda dua yang sangat dominan.'
            }
          }
        ]
      }
    ]
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
    totalCustomers: 59300,
    activeRate: 76.8,
    districts: [
      {
        id: 'kec-kudus-kota',
        name: 'Kudus Kota',
        regencyName: 'Kudus',
        center: [-6.8080, 110.8420],
        zoom: 13.5,
        polygon: [
          [-6.7900, 110.8250],
          [-6.7880, 110.8600],
          [-6.8250, 110.8580],
          [-6.8260, 110.8230]
        ],
        strategy: 'RETAIN',
        score: 86,
        totalCustomers: 19200,
        potentialCustomers: 4100,
        subdistricts: [
          {
            id: 'kel-demaan',
            name: 'Demaan',
            level: 'subdistrict',
            parentName: 'Kudus Kota',
            grandParentName: 'Kudus',
            center: [-6.8060, 110.8380],
            zoom: 14.5,
            polygon: [
              [-6.7980, 110.8300],
              [-6.7970, 110.8460],
              [-6.8140, 110.8470],
              [-6.8150, 110.8290]
            ],
            strategy: 'RETAIN',
            score: 85,
            metrics: {
              population: 16800,
              existingCustomers: 2450,
              activeCustomers: 1890,
              atRiskCustomers: 560,
              dormantCustomers: 340,
              potentialCustomers: 680,
              customerDensityScore: 82,
              competitorDensityScore: 66,
              competitorsCount: 6,
              existingOutletCoverage: 'Optimal (1,1 km)',
              avgDistanceToOutletKm: 1.1,
              marketPotentialScore: 81,
              retentionOpportunityScore: 89,
              acquisitionPotentialScore: 73,
              strategicLocationScore: 83,
              dominantSegment: 'Sentra Niaga & Industri Rokok',
              avgMonthlyExpenditure: 'Rp3,60 Juta',
              recommendedStrategy: 'RETAIN',
              strategyPriorityLabel: 'RETAIN FOCUS',
              keyObservation: 'Penurunan keaktifan berkala pasca 24 bulan; membutuhkan insentif oli dan servis loyalitas.'
            }
          }
        ]
      }
    ]
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

  // Match Regencies
  JAWA_TENGAH_REGENCIES.forEach((reg) => {
    if (reg.name.toLowerCase().includes(q)) {
      results.push({
        type: 'Kabupaten/Kota',
        name: reg.name,
        hierarchy: `Jawa Tengah > ${reg.name}`,
        center: reg.center,
        zoom: reg.zoom,
        regencyName: reg.name
      });
    }

    // Match Districts
    reg.districts.forEach((dist) => {
      if (dist.name.toLowerCase().includes(q)) {
        results.push({
          type: 'Kecamatan',
          name: dist.name,
          hierarchy: `Jawa Tengah > ${reg.name} > ${dist.name}`,
          center: dist.center,
          zoom: dist.zoom,
          regencyName: reg.name,
          districtName: dist.name
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
      title: `Analisis Spasial Mikro: Kelurahan ${name}`,
      headline: `${name} memiliki potensi ${metrics.potentialCustomers.toLocaleString('id-ID')} pelanggan baru dengan penetrasi layanan ${metrics.existingOutletCoverage.toLowerCase()}.`,
      bullets: [
        `Rasio Pelanggan Aktif: ${Math.round((metrics.activeCustomers / metrics.existingCustomers) * 100)}% dari total ${metrics.existingCustomers.toLocaleString('id-ID')} pelanggan terdaftar.`,
        `Tekanan Kompetitor: ${metrics.competitorsCount} titik bengkel/jaringan kompetitor aktif dalam radius operasional.`,
        `Jarak Rata-rata ke Outlet: ${metrics.avgDistanceToOutletKm} km (Ambang batas ideal servis cepat: < 3,0 km).`,
        `Rekomendasi Strategi: SERVEON mengidentifikasi wilayah ini sebagai prioritas ${metrics.strategyPriorityLabel}.`
      ],
      aiRecommendation:
        metrics.recommendedStrategy === 'ACQUIRE'
          ? `Lakukan penetrasi agresif melalui ekspansi format Satelit Service / Fast Pit atau kemitraan mobile service untuk mengonversi 1.480 prospek sebelum diambil alih kompetitor.`
          : metrics.recommendedStrategy === 'DEFEND'
          ? `Perkuat retensi loyalitas pelanggan lama melalui program gratis general check-up dan booking prioritas via Mobile Apps guna membendung 9 titik bengkel kompetitor di sekitar perumahan.`
          : `Gencarkan program reaktivasi pelanggan dormant dengan voucher oli MPX2 dan notifikasi pengingat servis otomatis via WhatsApp Mobile Apps.`
    };
  }

  if (level === 'district') {
    return {
      title: `Analisis Tingkat Kecamatan: ${name}`,
      headline: `Kecamatan ${name} merepresentasikan koridor pertumbuhan utama dengan konsentrasi mobilitas komuter dan sentra pendidikan/pemukiman.`,
      bullets: [
        `Terdapat kelurahan dengan disparitas penetrasi outlet signifikan antara area barat dan timur.`,
        `Rekomendasi drill-down: Klik pada kelurahan spesifik (seperti Meteseh atau Sendangmulyo) untuk memeriksa data mikro pasar dan titik kandidat.`
      ],
      aiRecommendation: `Prioritaskan alokasi armada servis kunjung dan pertimbangkan penambahan titik layanan mandiri di kelurahan dengan jarak ke outlet > 4,0 km.`
    };
  }

  if (level === 'regency') {
    return {
      title: `Ringkasan Spasial: ${name}`,
      headline: `${name} memiliki pangsa pasar stabil namun membutuhkan optimalisasi jaringan di sub-urban berkembang.`,
      bullets: [
        `Tingkat keaktifan rata-rata kabupaten/kota: ${metrics ? metrics.activeCustomers : '80,4'}%.`,
        `Gunakan filter strategi untuk membedakan antara kluster pertahanan pasar vs. peluang akuisisi putih.`
      ],
      aiRecommendation: `Pilih salah satu Kecamatan di atas peta untuk membuka detail analitik mikro hingga tingkat Kelurahan/Desa.`
    };
  }

  return {
    title: 'SERVEON Intelijen Spasial Jawa Tengah',
    headline: 'Eksplorasi hierarkis 35 Kabupaten/Kota: dari peta makro regional hingga intelijen mikro tingkat Kelurahan dan titik kandidat.',
    bullets: [
      'Pilih salah satu Kabupaten/Kota atau cari nama lokasi untuk memulai penelusuran.',
      'Aktifkan layer spasial untuk melihat densitas, kompetitor, dan zonasi prioritas.'
    ],
    aiRecommendation: 'Klik langsung pada batas poligon wilayah di peta untuk melakukan zoom in otomatis.'
  };
}
