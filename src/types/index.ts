export type UserRole =
  | 'Executive / Management'
  | 'Business / Marketing'
  | 'Network Development'
  | 'Regional / Branch Operations'
  | 'Data Analyst / Data Scientist'
  | 'Administrator'
  | 'Security / Data Governance';

export type StrategyType = 'RETAIN' | 'DEFEND' | 'ACQUIRE';

export type ScreenId =
  | 'login'
  | 'ringkasan-eksekutif'
  | 'pelanggan-360'
  | 'segmentasi-pelanggan'
  | 'distribusi-pelanggan'
  | 'peta-kepadatan'
  | 'jaringan-cakupan'
  | 'pasar-poi-demografi'
  | 'retensi'
  | 'pertahanan-pasar'
  | 'akuisisi'
  | 'kandidat-lokasi'
  | 'peringkat-strategis'
  | 'explainability'
  | 'campaign-omnichannel'
  | 'aktivitas-hasil'
  | 'serveon-agent'
  | 'monitoring-data-model'
  | 'audit-governance'
  | 'administrasi';

export interface StrategicPriority {
  id: string;
  name: string;
  kabupaten: string;
  strategy: StrategyType;
  score: number;
  reason: string;
  confidence: number;
  customerValue: 'Tinggi' | 'Sedang' | 'Rendah';
  competitorPressure: 'Tinggi' | 'Sedang' | 'Rendah';
  coverageGap: 'Kritis' | 'Moderat' | 'Optimal';
  totalCustomers: number;
  activeRate: number;
  opportunityValue: string;
  recommendedAction: string;
  coordinates: { x: number; y: number }; // SVG Map coordinates
}

export interface RegencyData {
  id: string;
  name: string;
  category: 'Kota' | 'Kabupaten';
  totalCustomers: number;
  activeCustomers: number;
  activeRate: number;
  highRiskCustomers: number;
  outlets: number;
  coverageRate: number;
  opportunityValue: string;
  strategy: StrategyType;
  strategicScore: number;
  population: number;
  productiveAgeRate: number;
  avgMonthlyExpenditure: string;
  commercialPoiCount: number;
  educationPoiCount: number;
  transportHubs: number;
  competitorCount: number;
  coordinates: { x: number; y: number };
  svgPath: string;
}

export interface HondaVehicle {
  model: string;
  plateNumberMasked: string;
  year: number;
  vinMasked: string;
  odometerKm: number;
  engineCapacity: string;
  color: string;
  purchaseType: 'Cash' | 'Kredit (FIFGROUP)' | 'Kredit (OTO)' | 'Kredit (Adira)';
  dealerPurchase: string;
  purchaseDate: string;
  kpbStatus: string;
  warrantyStatus: string;
}

export interface HondaTransaction {
  id: string;
  date: string;
  type: 'Unit Sales' | 'Servis Dealer' | 'Spare Part HGP' | 'Aksesoris HGA' | 'Apparel & Helm';
  description: string;
  outlet: string;
  amount: string;
  status: 'Lunas' | 'Selesai' | 'Kredit Aktif';
}

export interface HondaServiceRecord {
  id: string;
  date: string;
  serviceType: string;
  ahassName: string;
  mechanicName: string;
  odometerKm: number;
  cost: string;
  notes: string;
  kpbStatus: 'Gratis Jasa & Oli' | 'Gratis Jasa' | 'Reguler Berbayar';
}

export interface HondaInteraction {
  id: string;
  date: string;
  channel: 'WhatsApp Mobile Apps' | 'Telepon Follow Up' | 'Kunjungan Dealer' | 'Aplikasi Mobile Apps' | 'SMS Blast';
  subject: string;
  sentiment: 'Positif' | 'Netral' | 'Negatif';
  agent: string;
  outcome: string;
}

export interface HondaCampaignRecord {
  id: string;
  campaignName: string;
  channel: 'WhatsApp' | 'Push Mobile Apps' | 'SMS' | 'Email';
  sentDate: string;
  status: 'Dikonversi' | 'Dibuka & Klik' | 'Terkirim' | 'Diabaikan';
  incentive: string;
}

export interface HondaComplaint {
  id: string;
  ticketNo: string;
  date: string;
  category: 'Waktu Tunggu Dealer' | 'Ketersediaan Spare Part' | 'Kualitas Servis (Tarikan/Gredek)' | 'Fasilitas Ruang Tunggu' | 'Pelayanan Front Desk' | 'Dokumen STNK/Plat';
  status: 'Selesai' | 'Dalam Penanganan' | 'Eskalasi Regional';
  description: string;
  resolution: string;
}

export interface HondaLocationAccess {
  addressMasked: string;
  district: string;
  regency: string;
  nearestAhass: string;
  distanceKm: number;
  travelTimeMin: number;
  alternateAhass: string;
  alternateDistanceKm: number;
}

export interface CustomerProfile {
  id: string;
  maskedId: string;
  maskedName: string;
  segment: string;
  area: string;
  kabupaten: string;
  customerValueScore: number;
  retentionRiskScore: number;
  riskCategory: 'Tinggi' | 'Sedang' | 'Rendah';
  preferredChannel: 'WhatsApp' | 'Telepon Pribadi' | 'Mobile Push' | 'Cabang';
  consentStatus: 'Diizinkan' | 'Dibatasi' | 'Ditolak';
  nearestServicePointKm: number;
  tenureMonths: number;
  monthlySpendAvg: string;
  lastTransactionDate: string;
  lastInteractionDate: string;
  complaintStatus: 'Tidak Ada' | 'Dalam Proses' | 'Selesai';
  nextBestAction: {
    title: string;
    reason: string;
    recommendedChannel: string;
    recommendedTiming: string;
    approvalStatus: 'Perlu persetujuan' | 'Disetujui' | 'Draft';
    expectedConversionRate: string;
  };
  // Honda Automotive & After-Sales 360 Attributes
  vehicle?: HondaVehicle;
  transactions?: HondaTransaction[];
  serviceHistory?: HondaServiceRecord[];
  interactions?: HondaInteraction[];
  campaigns?: HondaCampaignRecord[];
  complaints?: HondaComplaint[];
  locationAccess?: HondaLocationAccess;
  behavioralAlert?: string;
}

export interface CandidateLocation {
  id: string;
  name: string;
  code: string;
  area: string;
  kabupaten: string;
  overallScore: number;
  customerDensityScore: number;
  marketPotentialScore: number;
  accessibilityScore: number;
  competitionPressureScore: number;
  serviceGapScore: number;
  investmentFeasibilityScore: number;
  catchmentCustomers: number;
  overlapPercentage: number;
  competitorsNearby: number;
  avgTravelTimeMin: number;
  estimatedCapex: string;
  status: 'Rekomendasi Utama' | 'Kandidat Sekunder' | 'Dalam Pertimbangan';
}

export interface CampaignData {
  id: string;
  name: string;
  objective: string;
  targetAudienceCount: number;
  reachableCount: number;
  suppressedCount: number;
  suppressionReasons: { reason: string; count: number }[];
  channelDistribution: { channel: string; percentage: number; costPerReach: string }[];
  recommendedSendTime: string;
  approvalStatus: 'Menunggu Persetujuan' | 'Disetujui' | 'Dalam Peninjauan' | 'Draft';
  expectedConversionRange: string;
  estimatedIncrementalRevenue: string;
  createdAt: string;
  approverRequired: string;
  strategy: StrategyType;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  userName: string;
  role: string;
  action: string;
  objectType: string;
  objectId: string;
  result: 'Berhasil' | 'Peringatan' | 'Ditolak';
  region: string;
  correlationId: string;
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi';
}
