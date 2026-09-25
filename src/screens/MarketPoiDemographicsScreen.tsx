import React, { useState, useMemo } from 'react';
import {
  Building2,
  Users,
  GraduationCap,
  Bus,
  MapPin,
  Clock,
  Layers,
  BarChart3,
  Network,
  Shield,
  Send,
  Download,
  Upload,
  FileSpreadsheet,
  FileText,
  Search,
  Plus,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Info,
  Wrench,
  Fuel,
  Compass
} from 'lucide-react';
import { JawaTengahMap } from '../components/map/JawaTengahMap';
import { REGENCIES_DATA } from '../data/mockData';
import {
  INITIAL_POI_DATA,
  INITIAL_MARKET_DATA,
  INITIAL_DEMOGRAPHY_DATA,
  INITIAL_NETWORK_DATA,
  INITIAL_SPATIAL_CAMPAIGNS,
  PoiRecord,
  MarketRecord,
  DemographyRecord,
  NetworkRecord,
  SpatialCampaignRecord
} from '../data/locationIntelligenceData';
import { ScreenId } from '../types';
import { exportToExcel, exportToCsv, TEMPLATES } from '../utils/exportImportUtils';
import { DataImportModal } from '../components/common/DataImportModal';

interface MarketPoiDemographicsScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

type LocationCategory = 'poi' | 'pasar' | 'demografi' | 'jaringan' | 'campaign';

export const MarketPoiDemographicsScreen: React.FC<MarketPoiDemographicsScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [selectedRegencyName, setSelectedRegencyName] = useState('Kota Semarang');
  const [activeCategory, setActiveCategory] = useState<LocationCategory>('poi');
  const [searchQuery, setSearchQuery] = useState('');

  // Datasets states for each category
  const [poiList, setPoiList] = useState<PoiRecord[]>(INITIAL_POI_DATA);
  const [marketList, setMarketList] = useState<MarketRecord[]>(INITIAL_MARKET_DATA);
  const [demographyList, setDemographyList] = useState<DemographyRecord[]>(INITIAL_DEMOGRAPHY_DATA);
  const [networkList, setNetworkList] = useState<NetworkRecord[]>(INITIAL_NETWORK_DATA);
  const [campaignList, setCampaignList] = useState<SpatialCampaignRecord[]>(INITIAL_SPATIAL_CAMPAIGNS);

  // Import modal & download dropdown states
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);

  const selectedReg = REGENCIES_DATA.find((r) => r.name === selectedRegencyName) || REGENCIES_DATA[0];

  // Filtered lists based on search query
  const filteredPois = useMemo(() => {
    return poiList.filter(
      (p) =>
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.regency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [poiList, searchQuery]);

  const filteredMarkets = useMemo(() => {
    return marketList.filter(
      (m) =>
        !searchQuery ||
        m.regency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.strategicDefense.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [marketList, searchQuery]);

  const filteredDemographies = useMemo(() => {
    return demographyList.filter(
      (d) =>
        !searchQuery ||
        d.regency.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [demographyList, searchQuery]);

  const filteredNetworks = useMemo(() => {
    return networkList.filter(
      (n) =>
        !searchQuery ||
        n.outletName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.regency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.networkType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.district.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [networkList, searchQuery]);

  const filteredCampaigns = useMemo(() => {
    return campaignList.filter(
      (c) =>
        !searchQuery ||
        c.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.targetRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.activityType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [campaignList, searchQuery]);

  // Export handlers
  const handleExportData = (format: 'xlsx' | 'csv') => {
    setIsDownloadDropdownOpen(false);
    let dataToExport: any[] = [];
    let fileName = `Data_Intelijen_${activeCategory.toUpperCase()}_Jateng`;

    if (activeCategory === 'poi') {
      dataToExport = poiList.map((p) => ({
        'Kode POI': p.id,
        'Nama Titik': p.name,
        'Kategori': p.category,
        'Kabupaten / Kota': p.regency,
        'Kecamatan': p.district,
        'Latitude': p.latitude,
        'Longitude': p.longitude,
        'Skor Keramaian (1-10)': p.crowdLevel,
        'Lalu Lintas Harian': p.dailyTraffic,
        'Dealer Terdekat': p.nearestAhass,
        'Catatan': p.notes
      }));
    } else if (activeCategory === 'pasar') {
      dataToExport = marketList.map((m) => ({
        'Kode Pasar': m.id,
        'Kabupaten / Kota': m.regency,
        'Kategori': m.category,
        'Potensi Pasar (Unit)': m.marketPotentialUnits,
        'Pangsa Pasar Honda (%)': m.hondaMarketShare,
        'Pangsa Pasar Kompetitor (%)': m.competitorShare,
        'Target Tahunan (Unit)': m.annualTargetUnits,
        'Kategori Pertumbuhan': m.growthCategory,
        'Strategi Pertahanan': m.strategicDefense,
        'Nilai Peluang': m.opportunityValue
      }));
    } else if (activeCategory === 'demografi') {
      dataToExport = demographyList.map((d) => ({
        'Kode Demografi': d.id,
        'Kabupaten / Kota': d.regency,
        'Populasi': d.population,
        'Usia Produktif 15-64 (%)': d.productiveAgeRate,
        'Pengeluaran Rata-rata Bulanan': d.avgMonthlyExpenditure,
        'Tingkat Urbanisasi (%)': d.urbanizationRate,
        'Jumlah Kepala Keluarga': d.householdsCount,
        'Motor per KK': d.motorcyclesPerHousehold,
        'Kepadatan / km2': d.populationDensityKm2
      }));
    } else if (activeCategory === 'jaringan') {
      dataToExport = networkList.map((n) => ({
        'Kode Jaringan': n.id,
        'Nama Outlet / Bengkel': n.outletName,
        'Tipe Jaringan': n.networkType,
        'Kabupaten / Kota': n.regency,
        'Kecamatan': n.district,
        'Alamat Lengkap': n.address,
        'Jumlah Pit Servis': n.serviceBays,
        'Kapasitas Harian (Unit)': n.dailyCapacity,
        'Layanan Pit Express': n.hasPitExpress ? 'Ya' : 'Tidak',
        'Fasilitas Service Kunjung': n.hasHomeService ? 'Ya' : 'Tidak',
        'Status Operasional': n.status,
        'Kontak': n.phone
      }));
    } else if (activeCategory === 'campaign') {
      dataToExport = campaignList.map((c) => ({
        'Kode Campaign': c.id,
        'Nama Kampanye Spasial': c.campaignName,
        'Wilayah Target': c.targetRegion,
        'Aktivitas / Promo': c.activityType,
        'Kanal Distribusi': c.channels,
        'Target Audiens (Unit/Orang)': c.targetAudience,
        'Estimasi Respon': c.expectedResponseRate,
        'Periode': c.period,
        'Status Persetujuan': c.approvalStatus,
        'Estimasi Nilai Tambahan': c.incrementalRevenue
      }));
    }

    try {
      if (format === 'xlsx') {
        exportToExcel(dataToExport, fileName, activeCategory.toUpperCase());
      } else {
        exportToCsv(dataToExport, fileName);
      }
      onShowToast(`Data ${activeCategory.toUpperCase()} (${dataToExport.length} baris) berhasil diunduh dalam format .${format}!`);
    } catch (err) {
      onShowToast('Gagal mengunduh file.');
    }
  };

  const handleDownloadTemplate = (format: 'xlsx' | 'csv') => {
    setIsDownloadDropdownOpen(false);
    const templateData = TEMPLATES[activeCategory] || [];
    const filename = `Template_Impor_${activeCategory.toUpperCase()}`;
    if (format === 'xlsx') {
      exportToExcel(templateData, filename, activeCategory.toUpperCase());
    } else {
      exportToCsv(templateData, filename);
    }
    onShowToast(`Template format impor ${activeCategory.toUpperCase()} (.${format}) berhasil diunduh.`);
  };

  // Import handler for active category
  const handleDataImported = (importedRows: any[], mode: 'append' | 'replace') => {
    const getVal = (row: any, ...keys: string[]) => {
      for (const k of keys) {
        if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') {
          return String(row[k]).trim();
        }
      }
      return '';
    };

    try {
      if (activeCategory === 'poi') {
        const newRecords: PoiRecord[] = importedRows.map((r, i) => ({
          id: getVal(r, 'Kode POI', 'id') || `POI-IMP-${String(i + 1).padStart(3, '0')}`,
          name: getVal(r, 'Nama Titik / Lokasi', 'Nama Titik', 'name') || 'Titik Minat Baru',
          category: (getVal(r, 'Kategori', 'category') || 'Komersial & Retail') as any,
          regency: getVal(r, 'Kabupaten / Kota', 'regency') || 'Kota Semarang',
          district: getVal(r, 'Kecamatan', 'district') || 'Pusat Kota',
          latitude: Number(getVal(r, 'Latitude', 'lat')) || -6.99,
          longitude: Number(getVal(r, 'Longitude', 'lng')) || 110.42,
          crowdLevel: Number(getVal(r, 'Tingkat Keramaian (1-10)', 'crowdLevel')) || 8.5,
          dailyTraffic: getVal(r, 'Potensi Pelanggan Harian', 'dailyTraffic') || '10.000 / Hari',
          nearestAhass: getVal(r, 'Dekat Outlet Dealer', 'nearestAhass') || 'Dealer Terdekat (1.0 km)',
          notes: getVal(r, 'Keterangan', 'Catatan', 'notes') || 'Data POI diimpor pengguna.'
        }));

        if (mode === 'replace') {
          setPoiList(newRecords);
          onShowToast(`Berhasil mengganti data POI dengan ${newRecords.length} data baru.`);
        } else {
          setPoiList((prev) => [...prev, ...newRecords]);
          onShowToast(`Berhasil menambahkan ${newRecords.length} titik POI baru (Total: ${poiList.length + newRecords.length}).`);
        }
      } else if (activeCategory === 'pasar') {
        const newRecords: MarketRecord[] = importedRows.map((r, i) => ({
          id: getVal(r, 'Kode Wilayah', 'Kode Pasar', 'id') || `MKT-IMP-${String(i + 1).padStart(3, '0')}`,
          regency: getVal(r, 'Kabupaten / Kota', 'regency') || 'Wilayah Baru',
          category: (getVal(r, 'Kategori Wilayah', 'category') || 'Kabupaten') as any,
          marketPotentialUnits: Number(getVal(r, 'Total Potensi Pasar (Unit)', 'marketPotentialUnits')) || 150000,
          hondaMarketShare: Number(getVal(r, 'Pangsa Pasar Honda (%)', 'hondaMarketShare')) || 75.0,
          competitorShare: Number(getVal(r, 'Pangsa Pasar Kompetitor (%)', 'competitorShare')) || 25.0,
          annualTargetUnits: Number(getVal(r, 'Target Penjualan Tahunan', 'annualTargetUnits')) || 18000,
          growthCategory: (getVal(r, 'Kategori Pertumbuhan', 'growthCategory') || 'Moderat') as any,
          strategicDefense: getVal(r, 'Strategi Utama', 'strategicDefense') || 'Program Peningkatan Penetrasi Dealer',
          opportunityValue: getVal(r, 'Nilai Peluang', 'opportunityValue') || 'Rp5 Miliar'
        }));

        if (mode === 'replace') {
          setMarketList(newRecords);
          onShowToast(`Berhasil mengganti data Pasar dengan ${newRecords.length} data baru.`);
        } else {
          setMarketList((prev) => [...prev, ...newRecords]);
          onShowToast(`Berhasil menambahkan ${newRecords.length} data pasar baru.`);
        }
      } else if (activeCategory === 'demografi') {
        const newRecords: DemographyRecord[] = importedRows.map((r, i) => ({
          id: getVal(r, 'Kode Wilayah', 'Kode Demografi', 'id') || `DEM-IMP-${String(i + 1).padStart(3, '0')}`,
          regency: getVal(r, 'Kabupaten / Kota', 'regency') || 'Wilayah Baru',
          population: Number(getVal(r, 'Total Populasi', 'population')) || 800000,
          productiveAgeRate: Number(getVal(r, 'Usia Produktif 15-64 (%)', 'productiveAgeRate')) || 70.0,
          avgMonthlyExpenditure: getVal(r, 'Rata-rata Pengeluaran Bulanan', 'avgMonthlyExpenditure') || 'Rp3.500.000',
          urbanizationRate: Number(getVal(r, 'Tingkat Urbanisasi (%)', 'urbanizationRate')) || 75.0,
          householdsCount: Number(getVal(r, 'Jumlah Kepala Keluarga', 'householdsCount')) || 250000,
          motorcyclesPerHousehold: Number(getVal(r, 'Rasio Kepemilikan Motor / KK', 'motorcyclesPerHousehold')) || 1.5,
          populationDensityKm2: Number(getVal(r, 'Kepadatan Penduduk / km2', 'populationDensityKm2')) || 1500
        }));

        if (mode === 'replace') {
          setDemographyList(newRecords);
          onShowToast(`Berhasil mengganti data Demografi dengan ${newRecords.length} data baru.`);
        } else {
          setDemographyList((prev) => [...prev, ...newRecords]);
          onShowToast(`Berhasil menambahkan ${newRecords.length} data demografi baru.`);
        }
      } else if (activeCategory === 'jaringan') {
        const newRecords: NetworkRecord[] = importedRows.map((r, i) => ({
          id: getVal(r, 'Kode Jaringan', 'id') || `NET-IMP-${String(i + 1).padStart(3, '0')}`,
          outletName: getVal(r, 'Nama Outlet / Bengkel', 'outletName') || 'Dealer Mitra Baru',
          networkType: (getVal(r, 'Tipe Jaringan', 'networkType') || 'Bengkel Resmi Dealer (H23)') as any,
          regency: getVal(r, 'Kabupaten / Kota', 'regency') || 'Kota Semarang',
          district: getVal(r, 'Kecamatan', 'district') || 'Semarang Selatan',
          address: getVal(r, 'Alamat Lengkap', 'address') || 'Jl. Raya Utama No. 88',
          serviceBays: Number(getVal(r, 'Jumlah Pit Servis', 'serviceBays')) || 6,
          dailyCapacity: Number(getVal(r, 'Kapasitas Servis Harian (Unit)', 'dailyCapacity')) || 40,
          hasPitExpress: getVal(r, 'Layanan Pit Express', 'hasPitExpress').toLowerCase().includes('ya') || getVal(r, 'hasPitExpress').toLowerCase().includes('tersedia'),
          hasHomeService: getVal(r, 'Fasilitas Service Kunjung', 'hasHomeService').toLowerCase().includes('ya') || getVal(r, 'hasHomeService').toLowerCase().includes('aktif'),
          status: (getVal(r, 'Status Operasional', 'status') || 'Optimal') as any,
          phone: getVal(r, 'Nomor Kontak Telepon', 'Kontak', 'phone') || '024-8888xxx'
        }));

        if (mode === 'replace') {
          setNetworkList(newRecords);
          onShowToast(`Berhasil mengganti data Jaringan Dealer dengan ${newRecords.length} data baru.`);
        } else {
          setNetworkList((prev) => [...prev, ...newRecords]);
          onShowToast(`Berhasil menambahkan ${newRecords.length} jaringan outlet Dealer baru.`);
        }
      } else if (activeCategory === 'campaign') {
        const newRecords: SpatialCampaignRecord[] = importedRows.map((r, i) => ({
          id: getVal(r, 'Kode Campaign', 'id') || `CMP-IMP-${String(i + 1).padStart(3, '0')}`,
          campaignName: getVal(r, 'Nama Kampanye Spasial', 'campaignName') || 'Kampanye Spasial Baru',
          targetRegion: getVal(r, 'Wilayah Target', 'targetRegion') || 'Semarang & Sekitarnya',
          activityType: getVal(r, 'Tipe Kegiatan', 'activityType') || 'Voucher Servis & Oli',
          channels: getVal(r, 'Kanal Distribusi', 'channels') || 'WhatsApp Mobile Apps',
          targetAudience: Number(getVal(r, 'Target Audiens (Pelanggan)', 'targetAudience')) || 10000,
          expectedResponseRate: getVal(r, 'Estimasi Respon (%)', 'expectedResponseRate') || '35%',
          period: getVal(r, 'Periode Pelaksanaan', 'period') || 'Bulan Ini',
          approvalStatus: (getVal(r, 'Status Persetujuan', 'approvalStatus') || 'Disetujui') as any,
          incrementalRevenue: getVal(r, 'Estimasi Pendapatan Tambahan', 'incrementalRevenue') || 'Rp250.000.000'
        }));

        if (mode === 'replace') {
          setCampaignList(newRecords);
          onShowToast(`Berhasil mengganti data Campaign Spasial dengan ${newRecords.length} data baru.`);
        } else {
          setCampaignList((prev) => [...prev, ...newRecords]);
          onShowToast(`Berhasil menambahkan ${newRecords.length} kampanye spasial baru.`);
        }
      }
    } catch (err) {
      console.error(err);
      onShowToast('Gagal memetakan data hasil impor.');
    }
  };

  const getCategoryCount = (cat: LocationCategory) => {
    switch (cat) {
      case 'poi':
        return poiList.length;
      case 'pasar':
        return marketList.length;
      case 'demografi':
        return demographyList.length;
      case 'jaringan':
        return networkList.length;
      case 'campaign':
        return campaignList.length;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header with Title & Global Export/Import toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
              Intelijen Lokasi · Pasar, POI, Demografi, Jaringan &amp; Campaign
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-200">
              Jawa Tengah Multi-Layer Spatial
            </span>
          </div>
          <p className="text-xs text-[#607080]">
            Pusat analitik spasial untuk titik keramaian (POI), potensi pasar motor Honda, demografi BPS, jaringan bengkel Dealer, dan kampanye wilayah.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Upload Button */}
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3 py-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>Upload Data {activeCategory.toUpperCase()} (CSV/Excel)</span>
          </button>

          {/* Download Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDownloadDropdownOpen((prev) => !prev)}
              className="px-3 py-2 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Download {activeCategory.toUpperCase()} ({getCategoryCount(activeCategory)})</span>
              <ChevronDown className="w-3 h-3 text-emerald-700" />
            </button>

            {isDownloadDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsDownloadDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Ekspor Data {activeCategory.toUpperCase()}
                  </div>
                  <button
                    onClick={() => handleExportData('xlsx')}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">Unduh Format Excel (.xlsx)</div>
                      <div className="text-[10px] text-slate-500">File spreadsheet Microsoft Excel</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleExportData('csv')}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">Unduh Format CSV (.csv)</div>
                      <div className="text-[10px] text-slate-500">Universal UTF-8 terenkripsi</div>
                    </div>
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Template Format Tambah Data
                  </div>
                  <button
                    onClick={() => handleDownloadTemplate('xlsx')}
                    className="w-full px-3 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-600 text-[11px] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Template Excel {activeCategory.toUpperCase()} (.xlsx)</span>
                  </button>
                  <button
                    onClick={() => handleDownloadTemplate('csv')}
                    className="w-full px-3 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-600 text-[11px] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Template CSV {activeCategory.toUpperCase()} (.csv)</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 5 Dimensional Tabs: POI, Pasar, Demografi, Jaringan, Campaign */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white border border-[#DDE3EA] rounded-xl text-xs overflow-x-auto scrollbar-none shadow-2xs">
        {[
          { id: 'poi', label: '1. Titik Keramaian (POI)', icon: Building2, count: poiList.length },
          { id: 'pasar', label: '2. Potensi Pasar & Penetrasi', icon: BarChart3, count: marketList.length },
          { id: 'demografi', label: '3. Demografi Wilayah', icon: Users, count: demographyList.length },
          { id: 'jaringan', label: '4. Jaringan Dealer', icon: Network, count: networkList.length },
          { id: 'campaign', label: '5. Campaign Spasial Wilayah', icon: Send, count: campaignList.length }
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as LocationCategory);
                setSearchQuery('');
              }}
              className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Spatial Map & Summary Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Map of Central Java */}
        <div className="xl:col-span-8 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-[#17212B] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" />
              Peta Geospasial Layer: {activeCategory.toUpperCase()} Jawa Tengah
            </span>
            <span className="text-[#607080]">
              Area Aktif: <strong className="text-slate-900">{selectedReg.name}</strong>
            </span>
          </div>

          <JawaTengahMap
            selectedAreaId={selectedRegencyName}
            onSelectArea={(name) => setSelectedRegencyName(name)}
          />

          <div className="mt-3 pt-3 border-t border-[#DDE3EA] flex items-center justify-between text-[11px] text-[#607080]">
            <span>Sumber Data: BPS Jateng, Dealer Honda Motor &amp; Geocoding Open Data</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Layer Aktif: {getCategoryCount(activeCategory)} Titik/Entitas</span>
            </span>
          </div>
        </div>

        {/* Right: Selected Area Profile Card */}
        <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-5 flex flex-col justify-between shadow-2xs">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#DDE3EA]">
              <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                Profil Wilayah Terpilih
              </span>
              <h2 className="text-base font-bold text-[#17212B]">{selectedReg.name}</h2>
              <div className="text-[11px] text-[#607080]">{selectedReg.category} · Jawa Tengah</div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                <div className="text-[11px] text-[#607080]">Populasi Penduduk</div>
                <div className="text-sm font-bold text-[#17212B] mt-0.5 tabular-nums">
                  {selectedReg.population.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                <div className="text-[11px] text-[#607080]">Usia Produktif</div>
                <div className="text-sm font-bold text-emerald-700 mt-0.5 tabular-nums">
                  {selectedReg.productiveAgeRate}%
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA] col-span-2">
                <div className="text-[11px] text-[#607080]">Rata-rata Pengeluaran Bulanan</div>
                <div className="text-base font-bold text-[#2563EB] mt-0.5 tabular-nums">
                  {selectedReg.avgMonthlyExpenditure}
                </div>
              </div>
            </div>

            {/* Category Snapshot */}
            <div>
              <div className="text-[11px] font-bold text-[#17212B] uppercase tracking-wider mb-2">
                Komposisi POI &amp; Jaringan Dealer di {selectedReg.name}
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-[#DDE3EA]">
                  <span className="flex items-center gap-1.5 text-[#17212B]">
                    <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
                    POI Komersial &amp; Retail
                  </span>
                  <span className="font-bold tabular-nums">{selectedReg.commercialPoiCount} Titik</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-[#DDE3EA]">
                  <span className="flex items-center gap-1.5 text-[#17212B]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#0F7C7B]" />
                    Pendidikan &amp; Kampus
                  </span>
                  <span className="font-bold tabular-nums">{selectedReg.educationPoiCount} Titik</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-[#DDE3EA]">
                  <span className="flex items-center gap-1.5 text-[#17212B]">
                    <Bus className="w-3.5 h-3.5 text-[#D97706]" />
                    Hub Transportasi / Stasiun
                  </span>
                  <span className="font-bold tabular-nums">{selectedReg.transportHubs} Titik</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-[#DDE3EA]">
                  <span className="flex items-center gap-1.5 text-[#17212B]">
                    <Wrench className="w-3.5 h-3.5 text-red-600" />
                    Jaringan Outlet Dealer Aktif
                  </span>
                  <span className="font-bold tabular-nums text-red-700">{selectedReg.outlets} Bengkel Resmi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDE3EA] space-y-2">
            <button
              onClick={() => onNavigateToScreen('akuisisi')}
              className="w-full py-2.5 px-3 bg-[#0F7C7B] hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Lihat Potensi Akuisisi &amp; Pangsa Pasar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Data Table for Active Category */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>
                Tabel Data: {activeCategory.toUpperCase()} (
                {activeCategory === 'poi'
                  ? `${filteredPois.length} Titik`
                  : activeCategory === 'pasar'
                  ? `${filteredMarkets.length} Wilayah`
                  : activeCategory === 'demografi'
                  ? `${filteredDemographies.length} Wilayah`
                  : activeCategory === 'jaringan'
                  ? `${filteredNetworks.length} Outlet Dealer`
                  : `${filteredCampaigns.length} Kampanye Spasial`}
                )
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Gunakan fitur Upload atau Download untuk memperbarui data spasial secara massal.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#607080] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kata kunci..."
                className="bg-[#F5F7FA] border border-[#DDE3EA] text-xs text-[#17212B] rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-blue-500 w-48 placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-2.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload {activeCategory.toUpperCase()}</span>
            </button>

            <button
              onClick={() => handleExportData('xlsx')}
              className="px-2.5 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Excel</span>
            </button>
          </div>
        </div>

        {/* Dynamic Table based on Active Category */}
        <div className="border border-slate-200 rounded-xl overflow-x-auto max-h-[420px] scrollbar-thin">
          {/* 1. POI Table */}
          {activeCategory === 'poi' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-slate-700 font-bold border-b border-slate-200 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Nama Titik Minat (POI)</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Kabupaten / Kota</th>
                  <th className="p-3">Kecamatan</th>
                  <th className="p-3 text-center">Keramaian (1-10)</th>
                  <th className="p-3">Lalu Lintas Harian</th>
                  <th className="p-3">Bengkel Dealer Terdekat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredPois.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-600">{p.id}</td>
                    <td className="p-3 font-semibold text-slate-900">{p.name}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-medium border border-blue-100">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-800 font-medium">{p.regency}</td>
                    <td className="p-3 text-slate-600">{p.district}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded font-bold font-mono bg-amber-50 text-amber-800 border border-amber-200 text-[10px]">
                        {p.crowdLevel}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">{p.dailyTraffic}</td>
                    <td className="p-3 text-red-700 font-medium">{p.nearestAhass}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 2. Pasar Table */}
          {activeCategory === 'pasar' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-slate-700 font-bold border-b border-slate-200 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Kabupaten / Kota</th>
                  <th className="p-3 text-right">Potensi Pasar</th>
                  <th className="p-3 text-center">Pangsa Honda</th>
                  <th className="p-3 text-center">Kompetitor</th>
                  <th className="p-3 text-right">Target Tahunan</th>
                  <th className="p-3">Strategi Pertahanan</th>
                  <th className="p-3 text-right">Nilai Peluang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredMarkets.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-600">{m.id}</td>
                    <td className="p-3 font-bold text-slate-900">{m.regency}</td>
                    <td className="p-3 text-right font-mono text-slate-800">
                      {m.marketPotentialUnits.toLocaleString('id-ID')} Unit
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px]">
                        {m.hondaMarketShare}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded font-bold font-mono bg-rose-50 text-rose-800 border border-rose-200 text-[10px]">
                        {m.competitorShare}%
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-slate-700">
                      {m.annualTargetUnits.toLocaleString('id-ID')} Unit
                    </td>
                    <td className="p-3 text-slate-700 max-w-xs truncate">{m.strategicDefense}</td>
                    <td className="p-3 text-right font-bold font-mono text-blue-700">{m.opportunityValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 3. Demografi Table */}
          {activeCategory === 'demografi' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-slate-700 font-bold border-b border-slate-200 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Kabupaten / Kota</th>
                  <th className="p-3 text-right">Total Populasi</th>
                  <th className="p-3 text-center">Usia Produktif</th>
                  <th className="p-3 text-right">Rata-rata Pengeluaran</th>
                  <th className="p-3 text-center">Urbanisasi</th>
                  <th className="p-3 text-center">Motor / KK</th>
                  <th className="p-3 text-right">Kepadatan / km²</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredDemographies.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-600">{d.id}</td>
                    <td className="p-3 font-bold text-slate-900">{d.regency}</td>
                    <td className="p-3 text-right font-mono text-slate-800">{d.population.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-center font-bold font-mono text-emerald-700">{d.productiveAgeRate}%</td>
                    <td className="p-3 text-right font-mono text-blue-700 font-semibold">{d.avgMonthlyExpenditure}</td>
                    <td className="p-3 text-center font-mono text-slate-600">{d.urbanizationRate}%</td>
                    <td className="p-3 text-center font-bold font-mono text-amber-700">{d.motorcyclesPerHousehold}</td>
                    <td className="p-3 text-right font-mono text-slate-700">{d.populationDensityKm2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 4. Jaringan Table */}
          {activeCategory === 'jaringan' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-slate-700 font-bold border-b border-slate-200 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Nama Outlet / Bengkel Dealer</th>
                  <th className="p-3">Tipe Jaringan</th>
                  <th className="p-3">Kabupaten / Kota</th>
                  <th className="p-3 text-center">Pit Servis</th>
                  <th className="p-3 text-right">Kapasitas Harian</th>
                  <th className="p-3 text-center">Pit Express</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredNetworks.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-600">{n.id}</td>
                    <td className="p-3 font-bold text-slate-900">{n.outletName}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-medium text-[10px] border border-red-100">
                        {n.networkType}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">{n.regency}</td>
                    <td className="p-3 text-center font-mono font-bold text-slate-800">{n.serviceBays} Pit</td>
                    <td className="p-3 text-right font-mono text-slate-800">{n.dailyCapacity} Unit / Hari</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          n.hasPitExpress
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {n.hasPitExpress ? 'Tersedia' : 'Tidak'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">
                        {n.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 5. Campaign Table */}
          {activeCategory === 'campaign' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-slate-700 font-bold border-b border-slate-200 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Nama Kampanye Spasial</th>
                  <th className="p-3">Wilayah Target</th>
                  <th className="p-3">Aktivitas / Promo</th>
                  <th className="p-3 text-right">Target Audiens</th>
                  <th className="p-3 text-center">Estimasi Respon</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-right">Pendapatan Tambahan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-600">{c.id}</td>
                    <td className="p-3 font-bold text-slate-900">{c.campaignName}</td>
                    <td className="p-3 text-slate-700">{c.targetRegion}</td>
                    <td className="p-3 text-slate-700 max-w-xs truncate">{c.activityType}</td>
                    <td className="p-3 text-right font-mono font-semibold text-slate-800">
                      {c.targetAudience.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3 text-center font-bold font-mono text-emerald-700">{c.expectedResponseRate}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                        {c.approvalStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold font-mono text-blue-700">{c.incrementalRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Data Import Modal for Active Category */}
      <DataImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title={`Unggah Data ${activeCategory.toUpperCase()} (Excel / CSV)`}
        subtitle={`Tambahkan atau perbarui dataset ${activeCategory.toUpperCase()} geospasial Jawa Tengah`}
        templateType={activeCategory}
        onDataImported={handleDataImported}
        onShowToast={onShowToast}
      />
    </div>
  );
};
