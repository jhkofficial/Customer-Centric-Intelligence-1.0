// Initial datasets for Intelijen Lokasi: POI, Pasar, Demografi, Jaringan, and Campaign Spasial

export interface PoiRecord {
  id: string;
  name: string;
  category: 'Komersial & Retail' | 'Pendidikan & Kampus' | 'Transportasi & Hub' | 'Fasilitas Publik' | 'Pusat Industri';
  regency: string;
  district: string;
  latitude: number;
  longitude: number;
  crowdLevel: number;
  dailyTraffic: string;
  nearestAhass: string;
  notes: string;
}

export interface MarketRecord {
  id: string;
  regency: string;
  category: 'Kota' | 'Kabupaten';
  marketPotentialUnits: number;
  hondaMarketShare: number;
  competitorShare: number;
  annualTargetUnits: number;
  growthCategory: 'Tinggi' | 'Moderat' | 'Stabil';
  strategicDefense: string;
  opportunityValue: string;
}

export interface DemographyRecord {
  id: string;
  regency: string;
  population: number;
  productiveAgeRate: number;
  avgMonthlyExpenditure: string;
  urbanizationRate: number;
  householdsCount: number;
  motorcyclesPerHousehold: number;
  populationDensityKm2: number;
}

export interface NetworkRecord {
  id: string;
  outletName: string;
  networkType: 'Dealer 3S' | 'Bengkel Resmi Dealer (H23)' | 'Big Wing' | 'Pos Servis Satelit';
  regency: string;
  district: string;
  address: string;
  serviceBays: number;
  dailyCapacity: number;
  hasPitExpress: boolean;
  hasHomeService: boolean;
  status: 'Optimal' | 'Tinggi' | 'Perluasan';
  phone: string;
}

export interface SpatialCampaignRecord {
  id: string;
  campaignName: string;
  targetRegion: string;
  activityType: string;
  channels: string;
  targetAudience: number;
  expectedResponseRate: string;
  period: string;
  approvalStatus: 'Disetujui' | 'Menunggu Persetujuan' | 'Dalam Review';
  incrementalRevenue: string;
}

export const INITIAL_POI_DATA: PoiRecord[] = [
  {
    id: 'POI-001',
    name: 'Simpang Lima Business & Commercial Hub',
    category: 'Komersial & Retail',
    regency: 'Kota Semarang',
    district: 'Semarang Tengah',
    latitude: -6.9904,
    longitude: 110.4229,
    crowdLevel: 9.8,
    dailyTraffic: '18.500 Kendaraan/Hari',
    nearestAhass: 'Dealer Gajah Mada (0.8 km)',
    notes: 'Kawasan pusat mobilitas komuter dan sentra perdagangan kota Semarang.'
  },
  {
    id: 'POI-002',
    name: 'Universitas Diponegoro (UNDIP) Tembalang',
    category: 'Pendidikan & Kampus',
    regency: 'Kota Semarang',
    district: 'Tembalang',
    latitude: -7.0493,
    longitude: 110.4398,
    crowdLevel: 9.6,
    dailyTraffic: '32.000 Mahasiswa & Staf',
    nearestAhass: 'Dealer Tembalang Motor (1.2 km)',
    notes: 'Konsentrasi populasi generasi muda, pengguna dominan Honda BeAT, Scoopy & Vario.'
  },
  {
    id: 'POI-003',
    name: 'Stasiun Solo Balapan & Terminal Tirtonadi',
    category: 'Transportasi & Hub',
    regency: 'Kota Surakarta',
    district: 'Banjarsari',
    latitude: -7.5583,
    longitude: 110.8219,
    crowdLevel: 9.2,
    dailyTraffic: '15.000 Penumpang/Hari',
    nearestAhass: 'Dealer Solo Balapan Prima (0.6 km)',
    notes: 'Pintu gerbang komuter Solo-Jogja-Semarang dengan mobilitas ojek online tinggi.'
  },
  {
    id: 'POI-004',
    name: 'Kawasan Industri Wijayakusuma (KIW)',
    category: 'Pusat Industri',
    regency: 'Kota Semarang',
    district: 'Tugu',
    latitude: -6.9754,
    longitude: 110.3341,
    crowdLevel: 8.9,
    dailyTraffic: '24.000 Tenaga Kerja',
    nearestAhass: 'Dealer Tugu Wijaya (1.4 km)',
    notes: 'Pusat buruh dan karyawan pabrik dengan kebutuhan servis berkala akhir pekan.'
  },
  {
    id: 'POI-005',
    name: 'Pasar Kliwon & Pusat Batik Klewer',
    category: 'Komersial & Retail',
    regency: 'Kota Surakarta',
    district: 'Pasar Kliwon',
    latitude: -7.5752,
    longitude: 110.8285,
    crowdLevel: 9.1,
    dailyTraffic: '20.000 Pengunjung/Hari',
    nearestAhass: 'Dealer Klewer Jaya (0.9 km)',
    notes: 'Sentra ekonomi UMKM tekstil dan logistik perdagangan lokal.'
  },
  {
    id: 'POI-006',
    name: 'Alun-alun & Pusat Niaga Purwokerto',
    category: 'Fasilitas Publik',
    regency: 'Banyumas',
    district: 'Purwokerto Timur',
    latitude: -7.4243,
    longitude: 109.2304,
    crowdLevel: 8.7,
    dailyTraffic: '14.000 Kendaraan/Hari',
    nearestAhass: 'Dealer Purwokerto (0.7 km)',
    notes: 'Pusat pertemuan masyarakat Banyumas raya dengan pergerakan motor harian padat.'
  },
  {
    id: 'POI-007',
    name: 'Kawasan Industri Terpadu Batang (KITB)',
    category: 'Pusat Industri',
    regency: 'Batang',
    district: 'Gringsing',
    latitude: -6.9532,
    longitude: 109.9678,
    crowdLevel: 8.5,
    dailyTraffic: '16.000 Pekerja & Logistik',
    nearestAhass: 'Dealer Batang Pantura Mandiri (2.1 km)',
    notes: 'Kawasan ekonomi khusus yang berkembang pesat; peluang penambahan pos Dealer baru.'
  },
  {
    id: 'POI-008',
    name: 'Kawasan Sentra Rokok & Industri Kudus',
    category: 'Pusat Industri',
    regency: 'Kudus',
    district: 'Kudus Kota',
    latitude: -6.8048,
    longitude: 110.8405,
    crowdLevel: 9.0,
    dailyTraffic: '28.000 Pekerja',
    nearestAhass: 'Dealer Kudus Sudirman (0.5 km)',
    notes: 'Daya beli tinggi karyawan industri rokok dengan loyalitas brand Honda yang kuat.'
  }
];

export const INITIAL_MARKET_DATA: MarketRecord[] = [
  {
    id: 'MKT-001',
    regency: 'Kota Semarang',
    category: 'Kota',
    marketPotentialUnits: 380000,
    hondaMarketShare: 78.4,
    competitorShare: 21.6,
    annualTargetUnits: 42000,
    growthCategory: 'Tinggi',
    strategicDefense: 'Pit Express & Fasilitas Booking Mobile Apps Fast Track',
    opportunityValue: 'Rp14,2 Miliar'
  },
  {
    id: 'MKT-002',
    regency: 'Kota Surakarta',
    category: 'Kota',
    marketPotentialUnits: 220000,
    hondaMarketShare: 81.2,
    competitorShare: 18.8,
    annualTargetUnits: 28000,
    growthCategory: 'Stabil',
    strategicDefense: 'Program Tukar Tambah Stylo/PCX & Komunitas Motor',
    opportunityValue: 'Rp9,8 Miliar'
  },
  {
    id: 'MKT-003',
    regency: 'Banyumas',
    category: 'Kabupaten',
    marketPotentialUnits: 295000,
    hondaMarketShare: 76.5,
    competitorShare: 23.5,
    annualTargetUnits: 34000,
    growthCategory: 'Tinggi',
    strategicDefense: 'Ekspansi Service Kunjung ke Wilayah Ajibarang & Wangon',
    opportunityValue: 'Rp8,4 Miliar'
  },
  {
    id: 'MKT-004',
    regency: 'Kudus',
    category: 'Kabupaten',
    marketPotentialUnits: 175000,
    hondaMarketShare: 82.6,
    competitorShare: 17.4,
    annualTargetUnits: 24000,
    growthCategory: 'Stabil',
    strategicDefense: 'Peningkatan Ketersediaan Spare Part HGP & Servis Korporasi',
    opportunityValue: 'Rp7,1 Miliar'
  },
  {
    id: 'MKT-005',
    regency: 'Tegal',
    category: 'Kabupaten',
    marketPotentialUnits: 240000,
    hondaMarketShare: 74.8,
    competitorShare: 25.2,
    annualTargetUnits: 29000,
    growthCategory: 'Moderat',
    strategicDefense: 'Paket Promo Musim Panen & Diskon Servis Transmisi CVT',
    opportunityValue: 'Rp6,9 Miliar'
  },
  {
    id: 'MKT-006',
    regency: 'Pekalongan',
    category: 'Kabupaten',
    marketPotentialUnits: 190000,
    hondaMarketShare: 77.2,
    competitorShare: 22.8,
    annualTargetUnits: 22500,
    growthCategory: 'Moderat',
    strategicDefense: 'Penetrasi Segmen Matic Fashion Scoopy & BeAT Street',
    opportunityValue: 'Rp5,6 Miliar'
  }
];

export const INITIAL_DEMOGRAPHY_DATA: DemographyRecord[] = [
  {
    id: 'DEM-001',
    regency: 'Kota Semarang',
    population: 1653524,
    productiveAgeRate: 72.8,
    avgMonthlyExpenditure: 'Rp4.850.000',
    urbanizationRate: 98.5,
    householdsCount: 498200,
    motorcyclesPerHousehold: 1.68,
    populationDensityKm2: 4425
  },
  {
    id: 'DEM-002',
    regency: 'Kota Surakarta',
    population: 522364,
    productiveAgeRate: 71.4,
    avgMonthlyExpenditure: 'Rp4.210.000',
    urbanizationRate: 99.1,
    householdsCount: 165800,
    motorcyclesPerHousehold: 1.72,
    populationDensityKm2: 11840
  },
  {
    id: 'DEM-003',
    regency: 'Banyumas',
    population: 1776918,
    productiveAgeRate: 68.4,
    avgMonthlyExpenditure: 'Rp2.950.000',
    urbanizationRate: 64.2,
    householdsCount: 542100,
    motorcyclesPerHousehold: 1.42,
    populationDensityKm2: 1340
  },
  {
    id: 'DEM-004',
    regency: 'Kudus',
    population: 849184,
    productiveAgeRate: 70.2,
    avgMonthlyExpenditure: 'Rp3.840.000',
    urbanizationRate: 78.6,
    householdsCount: 268400,
    motorcyclesPerHousehold: 1.84,
    populationDensityKm2: 2010
  },
  {
    id: 'DEM-005',
    regency: 'Cilacap',
    population: 1944857,
    productiveAgeRate: 67.9,
    avgMonthlyExpenditure: 'Rp2.780.000',
    urbanizationRate: 58.4,
    householdsCount: 589200,
    motorcyclesPerHousehold: 1.35,
    populationDensityKm2: 910
  },
  {
    id: 'DEM-006',
    regency: 'Magelang',
    population: 1299859,
    productiveAgeRate: 69.1,
    avgMonthlyExpenditure: 'Rp3.150.000',
    urbanizationRate: 61.2,
    householdsCount: 395100,
    motorcyclesPerHousehold: 1.48,
    populationDensityKm2: 1195
  }
];

export const INITIAL_NETWORK_DATA: NetworkRecord[] = [
  {
    id: 'NET-001',
    outletName: 'Dealer Center Semarang',
    networkType: 'Big Wing',
    regency: 'Kota Semarang',
    district: 'Semarang Tengah',
    address: 'Jl. Gajahmada No. 88, Semarang',
    serviceBays: 16,
    dailyCapacity: 95,
    hasPitExpress: true,
    hasHomeService: true,
    status: 'Optimal',
    phone: '024-8413344'
  },
  {
    id: 'NET-002',
    outletName: 'Dealer Pratama Motor Majapahit',
    networkType: 'Dealer 3S',
    regency: 'Kota Semarang',
    district: 'Pedurungan',
    address: 'Jl. Brigjen Sudiarto No. 245, Semarang Timur',
    serviceBays: 10,
    dailyCapacity: 65,
    hasPitExpress: true,
    hasHomeService: false,
    status: 'Tinggi',
    phone: '024-6721900'
  },
  {
    id: 'NET-003',
    outletName: 'Dealer Solo Slamet Riyadi',
    networkType: 'Dealer 3S',
    regency: 'Kota Surakarta',
    district: 'Laweyan',
    address: 'Jl. Slamet Riyadi No. 340, Surakarta',
    serviceBays: 12,
    dailyCapacity: 80,
    hasPitExpress: true,
    hasHomeService: true,
    status: 'Optimal',
    phone: '0271-714500'
  },
  {
    id: 'NET-004',
    outletName: 'Dealer Banyumas Mandiri Purwokerto',
    networkType: 'Bengkel Resmi Dealer (H23)',
    regency: 'Banyumas',
    district: 'Purwokerto Selatan',
    address: 'Jl. Gerilya No. 78, Purwokerto',
    serviceBays: 8,
    dailyCapacity: 45,
    hasPitExpress: true,
    hasHomeService: true,
    status: 'Tinggi',
    phone: '0281-638200'
  },
  {
    id: 'NET-005',
    outletName: 'Dealer Tunas Baru Kudus',
    networkType: 'Dealer 3S',
    regency: 'Kudus',
    district: 'Kudus Kota',
    address: 'Jl. Jend. Sudirman No. 112, Kudus',
    serviceBays: 10,
    dailyCapacity: 60,
    hasPitExpress: true,
    hasHomeService: false,
    status: 'Optimal',
    phone: '0291-432800'
  },
  {
    id: 'NET-006',
    outletName: 'Pos Dealer Satelit Ajibarang',
    networkType: 'Pos Servis Satelit',
    regency: 'Banyumas',
    district: 'Ajibarang',
    address: 'Jl. Raya Ajibarang No. 15, Banyumas',
    serviceBays: 4,
    dailyCapacity: 25,
    hasPitExpress: false,
    hasHomeService: false,
    status: 'Perluasan',
    phone: '0281-657100'
  }
];

export const INITIAL_SPATIAL_CAMPAIGNS: SpatialCampaignRecord[] = [
  {
    id: 'CMP-001',
    campaignName: 'Satu Hati Service Fest Pantura',
    targetRegion: 'Semarang, Demak, Kendal, Batang',
    activityType: 'Voucher Servis & Diskon Oli SPX2 20%',
    channels: 'WhatsApp Mobile Apps & SMS',
    targetAudience: 18500,
    expectedResponseRate: '36,4%',
    period: '01–30 September 2026',
    approvalStatus: 'Disetujui',
    incrementalRevenue: 'Rp620.000.000'
  },
  {
    id: 'CMP-002',
    campaignName: 'Roadshow Trade-In Stylo 160 Solo Raya',
    targetRegion: 'Surakarta, Sukoharjo, Klaten, Karanganyar',
    activityType: 'Pameran Mall & Subsidi Uang Muka FIFGROUP',
    channels: 'Push App Mobile Apps & Booth Mall',
    targetAudience: 12000,
    expectedResponseRate: '28,5%',
    period: '15–28 Oktober 2026',
    approvalStatus: 'Disetujui',
    incrementalRevenue: 'Rp1.450.000.000'
  },
  {
    id: 'CMP-003',
    campaignName: 'Servis Siaga Panen Tani Banyumas & Cilacap',
    targetRegion: 'Banyumas, Cilacap, Purbalingga',
    activityType: 'Service Kunjung Dealer ke Desa & Gratis Busi',
    channels: 'WhatsApp & Radio Lokal',
    targetAudience: 9500,
    expectedResponseRate: '41,2%',
    period: '05–20 November 2026',
    approvalStatus: 'Menunggu Persetujuan',
    incrementalRevenue: 'Rp380.000.000'
  },
  {
    id: 'CMP-004',
    campaignName: 'Pit Express Weekend Rush Kudus & Jepara',
    targetRegion: 'Kudus, Jepara, Pati',
    activityType: 'Ganti Oli 10 Menit Bebas Antre + Merchandise',
    channels: 'WhatsApp & Instagram Geotarget',
    targetAudience: 14200,
    expectedResponseRate: '33,8%',
    period: 'Setiap Sabtu & Minggu September 2026',
    approvalStatus: 'Disetujui',
    incrementalRevenue: 'Rp510.000.000'
  }
];
