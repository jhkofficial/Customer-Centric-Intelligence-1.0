import * as XLSX from 'xlsx';
import { CustomerProfile } from '../types';

/**
 * Trigger download of data as an Excel (.xlsx) file
 */
export function exportToExcel(data: any[], fileName: string, sheetName: string = 'Data'): void {
  try {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  } catch (err) {
    console.error('Failed to export to Excel:', err);
    throw err;
  }
}

/**
 * Trigger download of data as a CSV file with UTF-8 BOM
 */
export function exportToCsv(data: any[], fileName: string): void {
  try {
    const ws = XLSX.utils.json_to_sheet(data);
    const csvContent = XLSX.utils.sheet_to_csv(ws);
    // Add UTF-8 BOM so Microsoft Excel opens it correctly with accents/ID formatting
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to export to CSV:', err);
    throw err;
  }
}

/**
 * Parse an uploaded file (.xlsx, .xls, .csv) into JSON records
 */
export function parseSpreadsheetFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(buffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          throw new Error('File spreadsheet tidak memiliki lembar kerja (sheet).');
        }
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        resolve(jsonData);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => {
      reject(new Error('Gagal membaca file dari disk.'));
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Format CustomerProfile array for flat export (Excel / CSV)
 */
export function formatCustomersForExport(customers: CustomerProfile[]) {
  return customers.map((c) => ({
    'ID Pelanggan': c.maskedId,
    'Nama Pelanggan': c.maskedName,
    'Segmen': c.segment,
    'Kecamatan / Area': c.area,
    'Kabupaten / Kota': c.kabupaten,
    'Model Motor Honda': c.vehicle?.model || '-',
    'Nomor Plat': c.vehicle?.plateNumberMasked || '-',
    'Tahun Perakitan': c.vehicle?.year || '-',
    'Odometer (KM)': c.vehicle?.odometerKm || 0,
    'Status KPB': c.vehicle?.kpbStatus || '-',
    'Metode Pembelian': c.vehicle?.purchaseType || '-',
    'Dealer Pembelian': c.vehicle?.dealerPurchase || '-',
    'Garansi Rangka/Mesin': c.vehicle?.warrantyStatus || '-',
    'Skor Nilai Pelanggan (0-100)': c.customerValueScore,
    'Skor Risiko Churn (0-100)': c.retentionRiskScore,
    'Kategori Risiko': c.riskCategory,
    'Kanal Kontak': c.preferredChannel,
    'Status Izin Kontak': c.consentStatus,
    'Jarak Dealer Terdekat (KM)': c.nearestServicePointKm,
    'Tenur Pelanggan (Bulan)': c.tenureMonths,
    'Rata-rata Pengeluaran': c.monthlySpendAvg,
    'Transaksi Terakhir': c.lastTransactionDate,
    'Interaksi Terakhir': c.lastInteractionDate,
    'Status Keluhan': c.complaintStatus,
    'Sinyal Perilaku': c.behavioralAlert || '-',
    'Rekomendasi AI (Next Best Action)': c.nextBestAction.title,
    'Alasan Rekomendasi': c.nextBestAction.reason,
    'Kanal Rekomendasi': c.nextBestAction.recommendedChannel,
    'Waktu Rekomendasi': c.nextBestAction.recommendedTiming,
    'Estimasi Konversi': c.nextBestAction.expectedConversionRate
  }));
}

/**
 * Convert imported flat rows back into CustomerProfile objects
 */
export function mapImportedRowToCustomer(row: any, index: number): CustomerProfile {
  const getVal = (...keys: string[]) => {
    for (const k of keys) {
      if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') {
        return String(row[k]).trim();
      }
    }
    return '';
  };

  const idNum = String(index + 1).padStart(3, '0');
  const maskedId = getVal('ID Pelanggan', 'maskedId', 'id', 'ID') || `CUST-IMP-${idNum}`;
  const maskedName = getVal('Nama Pelanggan', 'maskedName', 'name', 'Nama') || `Pelanggan Baru #${idNum}`;
  const segment = getVal('Segmen', 'segment') || 'Growing Customer';
  const area = getVal('Kecamatan / Area', 'area', 'Kecamatan') || 'Semarang Selatan';
  const kabupaten = getVal('Kabupaten / Kota', 'kabupaten', 'Kota') || 'Kota Semarang';
  const customerValueScore = Number(getVal('Skor Nilai Pelanggan (0-100)', 'customerValueScore', 'Nilai')) || 75;
  const retentionRiskScore = Number(getVal('Skor Risiko Churn (0-100)', 'retentionRiskScore', 'Risiko')) || 45;
  const riskCategory = (retentionRiskScore > 70 ? 'Tinggi' : retentionRiskScore < 30 ? 'Rendah' : 'Sedang') as 'Tinggi' | 'Sedang' | 'Rendah';
  const preferredChannel = (getVal('Kanal Kontak', 'preferredChannel') || 'WhatsApp') as any;
  const consentStatus = (getVal('Status Izin Kontak', 'consentStatus') || 'Diizinkan') as any;
  const nearestServicePointKm = Number(getVal('Jarak Dealer Terdekat (KM)', 'nearestServicePointKm', 'Jarak')) || 3.5;
  const tenureMonths = Number(getVal('Tenur Pelanggan (Bulan)', 'tenureMonths', 'Tenur')) || 18;
  const monthlySpendAvg = getVal('Rata-rata Pengeluaran', 'monthlySpendAvg') || 'Rp350.000';
  const lastTransactionDate = getVal('Transaksi Terakhir', 'lastTransactionDate') || '20 Agustus 2026';
  const lastInteractionDate = getVal('Interaksi Terakhir', 'lastInteractionDate') || '22 Agustus 2026';
  const complaintStatus = (getVal('Status Keluhan', 'complaintStatus') || 'Tidak Ada') as any;
  const behavioralAlert = getVal('Sinyal Perilaku', 'behavioralAlert') || 'Data pelanggan diimpor melalui file spreadsheet.';

  const model = getVal('Model Motor Honda', 'model', 'Motor') || 'Honda Vario 160 CBS';
  const plateNumberMasked = getVal('Nomor Plat', 'plateNumberMasked', 'Plat') || 'H 3*** AK';
  const year = Number(getVal('Tahun Perakitan', 'year', 'Tahun')) || 2024;
  const odometerKm = Number(getVal('Odometer (KM)', 'odometerKm', 'Odometer')) || 8500;
  const kpbStatus = getVal('Status KPB', 'kpbStatus') || 'KPB Selesai';
  const purchaseType = (getVal('Metode Pembelian', 'purchaseType') || 'Kredit (FIFGROUP)') as any;
  const dealerPurchase = getVal('Dealer Pembelian', 'dealerPurchase') || 'Dealer Semarang';
  const warrantyStatus = getVal('Garansi Rangka/Mesin', 'warrantyStatus') || 'Garansi Rangka 5 Th Aktif';

  const nbaTitle = getVal('Rekomendasi AI (Next Best Action)', 'nbaTitle') || `Tawarkan Promo Perawatan Berkala ${model}`;
  const nbaReason = getVal('Alasan Rekomendasi', 'nbaReason') || 'Pelanggan aktif berpotensi meningkatkan loyalitas layanan Dealer.';
  const nbaChannel = getVal('Kanal Rekomendasi', 'nbaChannel') || preferredChannel || 'WhatsApp';
  const nbaTiming = getVal('Waktu Rekomendasi', 'nbaTiming') || 'Selasa, 10.00 WIB';
  const nbaConversion = getVal('Estimasi Konversi', 'nbaConversion') || '42,0%';

  return {
    id: `cust-imported-${idNum}`,
    maskedId,
    maskedName,
    segment,
    area,
    kabupaten,
    customerValueScore,
    retentionRiskScore,
    riskCategory,
    preferredChannel,
    consentStatus,
    nearestServicePointKm,
    tenureMonths,
    monthlySpendAvg,
    lastTransactionDate,
    lastInteractionDate,
    complaintStatus,
    behavioralAlert,
    vehicle: {
      model,
      plateNumberMasked,
      year,
      vinMasked: `MH1KF111*RK${idNum}***`,
      odometerKm,
      engineCapacity: '160 cc eSP+',
      color: 'Matte Black',
      purchaseType,
      dealerPurchase,
      purchaseDate: `12 Mei ${year}`,
      kpbStatus,
      warrantyStatus
    },
    transactions: [
      {
        id: `TRX-IMP-${idNum}`,
        date: lastTransactionDate,
        type: 'Servis Dealer',
        description: `Servis Berkala & Ganti Oli di ${dealerPurchase}`,
        outlet: `Dealer ${dealerPurchase}`,
        amount: monthlySpendAvg,
        status: 'Selesai'
      }
    ],
    serviceHistory: [
      {
        id: `SRV-IMP-${idNum}`,
        date: lastTransactionDate,
        serviceType: 'Servis Berkala Dealer',
        ahassName: `Dealer ${dealerPurchase}`,
        mechanicName: 'Mekanik Dealer Bersertifikat',
        odometerKm,
        cost: monthlySpendAvg,
        notes: `Pemeriksaan rutin dan penggantian suku cadang asli Honda (HGP).`,
        kpbStatus: 'Reguler Berbayar'
      }
    ],
    interactions: [
      {
        id: `INT-IMP-${idNum}`,
        date: lastInteractionDate,
        channel: 'WhatsApp Mobile Apps',
        subject: 'Reminder Servis & Promo',
        sentiment: 'Positif',
        agent: 'Customer Care Dealer',
        outcome: 'Pesan berhasil diterima pelanggan.'
      }
    ],
    campaigns: [
      {
        id: `CMP-IMP-${idNum}`,
        campaignName: 'Satu Hati Service Fest Jawa Tengah',
        channel: 'WhatsApp',
        sentDate: '01 Agu 2026',
        status: 'Terkirim',
        incentive: 'Voucher Diskon Jasa 20%'
      }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: `Jl. Raya ${area} No. ***`,
      district: area,
      regency: kabupaten,
      nearestAhass: `Dealer ${dealerPurchase} (${nearestServicePointKm} km)`,
      distanceKm: nearestServicePointKm,
      travelTimeMin: Math.round(nearestServicePointKm * 2.5),
      alternateAhass: `Dealer Alternatif ${kabupaten} (5,0 km)`,
      alternateDistanceKm: 5.0
    },
    nextBestAction: {
      title: nbaTitle,
      reason: nbaReason,
      recommendedChannel: nbaChannel,
      recommendedTiming: nbaTiming,
      approvalStatus: 'Perlu persetujuan',
      expectedConversionRate: nbaConversion
    }
  };
}

// Sample templates for easy download
export const TEMPLATES = {
  customer: [
    {
      'ID Pelanggan': 'CUST-JTG-009901',
      'Nama Pelanggan': 'A*** S******',
      'Segmen': 'High Value — At Risk',
      'Kecamatan / Area': 'Semarang Timur',
      'Kabupaten / Kota': 'Kota Semarang',
      'Model Motor Honda': 'Honda Stylo 160 ABS',
      'Nomor Plat': 'H 4*** LK',
      'Tahun Perakitan': 2024,
      'Odometer (KM)': 9200,
      'Status KPB': 'KPB 2 Selesai',
      'Metode Pembelian': 'Kredit (FIFGROUP)',
      'Dealer Pembelian': 'Dealer Semarang Center',
      'Garansi Rangka/Mesin': 'Garansi Rangka 5 Th Aktif',
      'Skor Nilai Pelanggan (0-100)': 85,
      'Skor Risiko Churn (0-100)': 76,
      'Kategori Risiko': 'Tinggi',
      'Kanal Kontak': 'WhatsApp',
      'Status Izin Kontak': 'Diizinkan',
      'Jarak Dealer Terdekat (KM)': 4.2,
      'Tenur Pelanggan (Bulan)': 18,
      'Rata-rata Pengeluaran': 'Rp450.000',
      'Transaksi Terakhir': '12 Agustus 2026',
      'Interaksi Terakhir': '15 Agustus 2026',
      'Status Keluhan': 'Tidak Ada',
      'Sinyal Perilaku': 'Jatuh tempo servis berkala terlewat 35 hari.',
      'Rekomendasi AI (Next Best Action)': 'Hubungi via WhatsApp dengan Voucher Servis & Gratis Antrean Pit Express',
      'Alasan Rekomendasi': 'Nilai pelanggan tinggi namun frekuensi servis menurun drastis.',
      'Kanal Rekomendasi': 'WhatsApp',
      'Waktu Rekomendasi': 'Kamis, 10.00 WIB',
      'Estimasi Konversi': '45%'
    }
  ],
  poi: [
    {
      'Kode POI': 'POI-JTG-001',
      'Nama Titik / Lokasi': 'Simpang Lima Mall & Business District',
      'Kategori': 'Komersial & Retail',
      'Kabupaten / Kota': 'Kota Semarang',
      'Kecamatan': 'Semarang Tengah',
      'Latitude': -6.9904,
      'Longitude': 110.4229,
      'Tingkat Keramaian (1-10)': 9.8,
      'Potensi Pelanggan Harian': '12.500',
      'Dekat Outlet Dealer': 'Dealer Gajah Mada (0.8 km)',
      'Keterangan': 'Pusat aktivitas bisnis dan mobilitas motor komuter'
    },
    {
      'Kode POI': 'POI-JTG-002',
      'Nama Titik / Lokasi': 'Universitas Diponegoro (UNDIP) Tembalang',
      'Kategori': 'Pendidikan & Kampus',
      'Kabupaten / Kota': 'Kota Semarang',
      'Kecamatan': 'Tembalang',
      'Latitude': -7.0493,
      'Longitude': 110.4398,
      'Tingkat Keramaian (1-10)': 9.5,
      'Potensi Pelanggan Harian': '35.000',
      'Dekat Outlet Dealer': 'Dealer Tembalang Motor (1.2 km)',
      'Keterangan': 'Basis pengguna Honda BeAT, Scoopy & Vario segmen Gen-Z'
    }
  ],
  pasar: [
    {
      'Kode Wilayah': 'MKT-SMG',
      'Kabupaten / Kota': 'Kota Semarang',
      'Kategori Wilayah': 'Kota',
      'Total Potensi Pasar (Unit)': 380000,
      'Pangsa Pasar Honda (%)': 78.4,
      'Pangsa Pasar Kompetitor (%)': 21.6,
      'Target Penjualan Tahunan': 42000,
      'Kategori Pertumbuhan': 'Tinggi',
      'Strategi Utama': 'Pertahanan & Layanan Servis Cepat Pit Express',
      'Nilai Peluang': 'Rp14.2 Miliar'
    },
    {
      'Kode Wilayah': 'MKT-SLO',
      'Kabupaten / Kota': 'Kota Surakarta',
      'Kategori Wilayah': 'Kota',
      'Total Potensi Pasar (Unit)': 220000,
      'Pangsa Pasar Honda (%)': 81.2,
      'Pangsa Pasar Kompetitor (%)': 18.8,
      'Target Penjualan Tahunan': 28000,
      'Kategori Pertumbuhan': 'Stabil',
      'Strategi Utama': 'Program Loyalitas & Tukar Tambah Stylo/PCX',
      'Nilai Peluang': 'Rp9.8 Miliar'
    }
  ],
  demografi: [
    {
      'Kode Wilayah': 'DEM-SMG',
      'Kabupaten / Kota': 'Kota Semarang',
      'Total Populasi': 1653524,
      'Usia Produktif 15-64 (%)': 72.8,
      'Rata-rata Pengeluaran Bulanan': 'Rp4.850.000',
      'Tingkat Urbanisasi (%)': 98.2,
      'Jumlah Kepala Keluarga': 498200,
      'Rasio Kepemilikan Motor / KK': 1.65,
      'Kepadatan Penduduk / km2': 4425
    },
    {
      'Kode Wilayah': 'DEM-BYM',
      'Kabupaten / Kota': 'Banyumas',
      'Total Populasi': 1776918,
      'Usia Produktif 15-64 (%)': 68.4,
      'Rata-rata Pengeluaran Bulanan': 'Rp2.950.000',
      'Tingkat Urbanisasi (%)': 64.5,
      'Jumlah Kepala Keluarga': 542100,
      'Rasio Kepemilikan Motor / KK': 1.42,
      'Kepadatan Penduduk / km2': 1340
    }
  ],
  jaringan: [
    {
      'Kode Jaringan': 'NET-DLR-001',
      'Nama Outlet / Bengkel': 'Dealer Center Gajah Mada',
      'Tipe Jaringan': 'Dealer 3S & Big Wing Dealer',
      'Kabupaten / Kota': 'Kota Semarang',
      'Kecamatan': 'Semarang Tengah',
      'Alamat Lengkap': 'Jl. Gajahmada No. 88, Semarang',
      'Jumlah Pit Servis': 12,
      'Kapasitas Servis Harian (Unit)': 80,
      'Layanan Pit Express': 'Tersedia',
      'Fasilitas Service Kunjung': 'Aktif (3 Armada)',
      'Status Operasional': 'Optimal',
      'Nomor Kontak Telepon': '024-8413xxx'
    },
    {
      'Kode Jaringan': 'NET-DLR-002',
      'Nama Outlet / Bengkel': 'Dealer Pratama Motor Ungaran',
      'Tipe Jaringan': 'Bengkel Resmi Dealer H23',
      'Kabupaten / Kota': 'Semarang',
      'Kecamatan': 'Ungaran Barat',
      'Alamat Lengkap': 'Jl. Diponegoro No. 142, Ungaran',
      'Jumlah Pit Servis': 6,
      'Kapasitas Servis Harian (Unit)': 40,
      'Layanan Pit Express': 'Tersedia',
      'Fasilitas Service Kunjung': 'Tidak Tersedia',
      'Status Operasional': 'Optimal',
      'Nomor Kontak Telepon': '024-6921xxx'
    }
  ],
  campaign: [
    {
      'Kode Campaign': 'CMP-SPATIAL-01',
      'Nama Kampanye Spasial': 'Satu Hati Service Fest Pantura',
      'Wilayah Target': 'Semarang, Kendal, Demak',
      'Tipe Kegiatan': 'Diskon Jasa Servis & Oli SPX',
      'Kanal Distribusi': 'WhatsApp Blast & Mobile Apps',
      'Target Audiens (Pelanggan)': 15000,
      'Estimasi Respon (%)': 38.5,
      'Periode Pelaksanaan': '1-30 September 2026',
      'Status Persetujuan': 'Disetujui',
      'Estimasi Pendapatan Tambahan': 'Rp485.000.000'
    },
    {
      'Kode Campaign': 'CMP-SPATIAL-02',
      'Nama Kampanye Spasial': 'Roadshow Trade-In Stylo 160 Solo Raya',
      'Wilayah Target': 'Surakarta, Sukoharjo, Klaten',
      'Tipe Kegiatan': 'Pameran Mall & Tukar Tambah FIFGROUP',
      'Kanal Distribusi': 'Pop-up Booth & Push Notification',
      'Target Audiens (Pelanggan)': 8500,
      'Estimasi Respon (%)': 24.2,
      'Periode Pelaksanaan': '15-22 Oktober 2026',
      'Status Persetujuan': 'Menunggu Persetujuan',
      'Estimasi Pendapatan Tambahan': 'Rp1.250.000.000'
    }
  ]
};
