import { CustomerProfile } from '../types';

export const HONDA_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-honda-001',
    maskedId: 'CUST-SMG-010482',
    maskedName: 'R*** S******',
    segment: 'High Value — At Risk',
    area: 'Semarang Timur',
    kabupaten: 'Kota Semarang',
    customerValueScore: 89,
    retentionRiskScore: 82,
    riskCategory: 'Tinggi',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 7.8,
    tenureMonths: 28,
    monthlySpendAvg: 'Rp385.000',
    lastTransactionDate: '12 Agustus 2026',
    lastInteractionDate: '28 Agustus 2026',
    complaintStatus: 'Dalam Proses',
    behavioralAlert: 'Jatuh tempo servis berkala 10.000 KM terlewat 38 hari. Riwayat keluhan waktu tunggu servis di Dealer Semarang Pandanaran (>40 menit).',
    vehicle: {
      model: 'Honda PCX 160 CBS',
      plateNumberMasked: 'H 4*** ZA',
      year: 2024,
      vinMasked: 'MH1KF511*PK******',
      odometerKm: 11420,
      engineCapacity: '160 cc eSP+ 4-Katup',
      color: 'Magnificent Matte Brown',
      purchaseType: 'Kredit (FIFGROUP)',
      dealerPurchase: 'Dealer Gajahmada Semarang',
      purchaseDate: '18 Mei 2024',
      kpbStatus: 'KPB 3 Terlewat · KPB 4 Aktif',
      warrantyStatus: 'Garansi Rangka 5 Th & Injeksi Aktif'
    },
    transactions: [
      { id: 'TRX-001', date: '12 Ags 2026', type: 'Servis Dealer', description: 'Ganti Oli AHM SPX2 + Kampas Rem Belakang', outlet: 'Dealer 0001 Dealer Semarang', amount: 'Rp198.000', status: 'Selesai' },
      { id: 'TRX-002', date: '20 Feb 2026', type: 'Spare Part HGP', description: 'Busi Honda NGK Laser + Saringan Udara Viscous', outlet: 'Dealer Gajahmada Semarang', amount: 'Rp115.000', status: 'Selesai' },
      { id: 'TRX-003', date: '18 Mei 2024', type: 'Unit Sales', description: 'Pembelian Honda PCX 160 CBS (DP Kredit FIF)', outlet: 'Dealer Gajahmada', amount: 'Rp32.670.000', status: 'Kredit Aktif' }
    ],
    serviceHistory: [
      { id: 'SRV-001', date: '12 Ags 2026', serviceType: 'Servis Berkala & Ganti Oli', ahassName: 'Dealer 0001 Gajahmada', mechanicName: 'Agus Riyanto', odometerKm: 9800, cost: 'Rp198.000', notes: 'Kondisi kampas rem belakang aus tipis, diganti part HGP. Oli SPX2 diisi 0.8L.', kpbStatus: 'Reguler Berbayar' },
      { id: 'SRV-002', date: '14 Jan 2025', serviceType: 'KPB 2 (4.000 km)', ahassName: 'Dealer 0001 Gajahmada', mechanicName: 'Budi Santoso', odometerKm: 3950, cost: 'Rp0', notes: 'KPB 2 selesai, servis gratis, pemeriksaan torsi baut dan tegangan aki normal.', kpbStatus: 'Gratis Jasa' },
      { id: 'SRV-003', date: '22 Jun 2024', serviceType: 'KPB 1 (1.000 km)', ahassName: 'Dealer 0001 Gajahmada', mechanicName: 'Agus Riyanto', odometerKm: 980, cost: 'Rp0', notes: 'KPB 1 servis perdana, ganti oli AHM MPX2 gratis.', kpbStatus: 'Gratis Jasa & Oli' }
    ],
    interactions: [
      { id: 'INT-001', date: '28 Ags 2026', channel: 'WhatsApp Mobile Apps', subject: 'Notifikasi Reminder Servis 10.000 KM', sentiment: 'Netral', agent: 'Sistem Otomasi Mobile Apps', outcome: 'Pesan terbaca (centang biru), belum ada konfirmasi booking jadwal.' },
      { id: 'INT-002', date: '15 Ags 2026', channel: 'Telepon Follow Up', subject: 'Customer Satisfaction Index (CSI) H+3', sentiment: 'Negatif', agent: 'Siti - Customer Care', outcome: 'Pelanggan mengeluhkan antrean Dealer padat dan waktu estimasi meleset.' }
    ],
    campaigns: [
      { id: 'CMP-001', campaignName: 'Promo Satu Hati Service Fest Dealer', channel: 'WhatsApp', sentDate: '25 Ags 2026', status: 'Dibuka & Klik', incentive: 'Diskon Jasa 20% + Voucher Part Rp25.000' },
      { id: 'CMP-002', campaignName: 'Flash Voucher Oli AHM Mobile Apps', channel: 'Push Mobile Apps', sentDate: '10 Jul 2026', status: 'Diabaikan', incentive: 'Gratis Oli Gardan Matic' }
    ],
    complaints: [
      { id: 'CMPL-001', ticketNo: 'TKT-SMG-260815', date: '15 Ags 2026', category: 'Waktu Tunggu Dealer', status: 'Dalam Penanganan', description: 'Waktu tunggu servis reguler melebihi 40 menit tanpa kepastian pit servis.', resolution: 'Dihubungi Kepala Bengkel untuk penjadwalan via Fast Track Pit Express.' }
    ],
    locationAccess: {
      addressMasked: 'Jl. Majapahit No. ***, Gayamsari',
      district: 'Semarang Timur',
      regency: 'Kota Semarang',
      nearestAhass: 'Dealer Pandanaran (7,8 km)',
      distanceKm: 7.8,
      travelTimeMin: 22,
      alternateAhass: 'Dealer Nusantara Motor Pedurungan (3,2 km)',
      alternateDistanceKm: 3.2
    },
    nextBestAction: {
      title: 'Aktivasi Booking Fast Track & Voucher Diskon CVT via WhatsApp',
      reason: 'Pelanggan High Value PCX 160 dengan risiko churn 82% akibat komplain antrean. Tawarkan booking prioritas di Dealer Pedurungan (3,2 km) dengan voucher jasa 25%.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Kamis, 10.00–12.00 WIB',
      approvalStatus: 'Perlu persetujuan',
      expectedConversionRate: '43,5%'
    }
  },
  {
    id: 'cust-honda-002',
    maskedId: 'CUST-SLO-021983',
    maskedName: 'B*** H******',
    segment: 'High Value Loyal',
    area: 'Banjarsari',
    kabupaten: 'Kota Surakarta',
    customerValueScore: 94,
    retentionRiskScore: 18,
    riskCategory: 'Rendah',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 2.1,
    tenureMonths: 42,
    monthlySpendAvg: 'Rp510.000',
    lastTransactionDate: '05 September 2026',
    lastInteractionDate: '06 September 2026',
    complaintStatus: 'Tidak Ada',
    behavioralAlert: 'Pelanggan sangat loyal, selalu tepat waktu servis berkala dan aktif menggunakan aplikasi Mobile Apps.',
    vehicle: {
      model: 'Honda ADV 160 ABS',
      plateNumberMasked: 'AD 2*** BQ',
      year: 2023,
      vinMasked: 'MH1KF611*NK******',
      odometerKm: 24800,
      engineCapacity: '160 cc eSP+ HSTC',
      color: 'Dynamic Matte Black',
      purchaseType: 'Cash',
      dealerPurchase: 'Surya Inti Motor Solo',
      purchaseDate: '10 Februari 2023',
      kpbStatus: 'KPB Selesai (Perawatan Reguler)',
      warrantyStatus: 'Garansi Rangka 5 Th Aktif'
    },
    transactions: [
      { id: 'TRX-004', date: '05 Sep 2026', type: 'Servis Dealer', description: 'Paket Servis Lengkap + Ganti V-Belt & Roller CVT', outlet: 'Dealer Surya Inti Banjarsari Solo', amount: 'Rp435.000', status: 'Selesai' },
      { id: 'TRX-005', date: '12 Mei 2026', type: 'Aksesoris HGA', description: 'Garnish Radiator & Hand Guard Resmi Honda', outlet: 'Surya Inti Solo', amount: 'Rp380.000', status: 'Selesai' },
      { id: 'TRX-006', date: '10 Feb 2023', type: 'Unit Sales', description: 'Pembelian Honda ADV 160 ABS Cash', outlet: 'Surya Inti Solo', amount: 'Rp39.250.000', status: 'Lunas' }
    ],
    serviceHistory: [
      { id: 'SRV-004', date: '05 Sep 2026', serviceType: 'Servis CVT & Drive Train', ahassName: 'Dealer Surya Inti Solo', mechanicName: 'Dwi Cahyono', odometerKm: 24500, cost: 'Rp435.000', notes: 'Ganti V-Belt kit HGP + roller set, pembersihan ruang transmisi CVT halus.', kpbStatus: 'Reguler Berbayar' },
      { id: 'SRV-005', date: '18 Apr 2026', serviceType: 'Servis Berkala & Tune Up', ahassName: 'Dealer Surya Inti Solo', mechanicName: 'Dwi Cahyono', odometerKm: 20100, cost: 'Rp210.000', notes: 'Ganti oli AHM SPX2, cek busi, reset ECM dan setel jarak renggang gas.', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-003', date: '06 Sep 2026', channel: 'WhatsApp Mobile Apps', subject: 'Konfirmasi Poin Mobile Apps', sentiment: 'Positif', agent: 'Mobile Apps Bot', outcome: 'Pelanggan menukarkan 150 poin Hepigo untuk voucher oli berikutnya.' }
    ],
    campaigns: [
      { id: 'CMP-003', campaignName: 'Invitation Community Honda Jateng Touring', channel: 'WhatsApp', sentDate: '01 Sep 2026', status: 'Dikonversi', incentive: 'Apparel Honda Riding Jacket Eksklusif' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. Monginsidi No. ***, Gilingan',
      district: 'Banjarsari',
      regency: 'Kota Surakarta',
      nearestAhass: 'Dealer Surya Inti Banjarsari (2,1 km)',
      distanceKm: 2.1,
      travelTimeMin: 7,
      alternateAhass: 'Dealer Pratama Solo Baru (5,4 km)',
      alternateDistanceKm: 5.4
    },
    nextBestAction: {
      title: 'Undangan Exclusive Honda Premium Club & Diskon Apparel Riding HGA',
      reason: 'Pelanggan loyal ADV 160 berpotensi menjadi brand advocate dan kandidat repeat order big bike / Honda Forza.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Sabtu, 09.30 WIB',
      approvalStatus: 'Disetujui',
      expectedConversionRate: '68,0%'
    }
  },
  {
    id: 'cust-honda-003',
    maskedId: 'CUST-BMS-034109',
    maskedName: 'S*** M******',
    segment: 'Potential Upgrader',
    area: 'Purwokerto Timur',
    kabupaten: 'Banyumas',
    customerValueScore: 78,
    retentionRiskScore: 35,
    riskCategory: 'Sedang',
    preferredChannel: 'Telepon Pribadi',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 3.4,
    tenureMonths: 36,
    monthlySpendAvg: 'Rp220.000',
    lastTransactionDate: '18 Juli 2026',
    lastInteractionDate: '20 Juli 2026',
    complaintStatus: 'Tidak Ada',
    behavioralAlert: 'Masa kepemilikan unit Honda BeAT sudah 3 tahun (36 bulan), cicilan lunas, indikasi kuat untuk program Trade-In ke Honda Stylo 160 / Scoopy.',
    vehicle: {
      model: 'Honda BeAT CBS ISS',
      plateNumberMasked: 'R 5*** CL',
      year: 2021,
      vinMasked: 'MH1JM311*MK******',
      odometerKm: 32400,
      engineCapacity: '110 cc eSP',
      color: 'Electro Matte Blue',
      purchaseType: 'Kredit (FIFGROUP)',
      dealerPurchase: 'Nusantara Motor Purwokerto',
      purchaseDate: '15 Juli 2021',
      kpbStatus: 'KPB Selesai',
      warrantyStatus: 'Masa Garansi Reguler'
    },
    transactions: [
      { id: 'TRX-007', date: '18 Jul 2026', type: 'Servis Dealer', description: 'Ganti Oli AHM MPX2 + Filter Udara', outlet: 'Dealer Nusantara Motor Purwokerto', amount: 'Rp118.000', status: 'Selesai' },
      { id: 'TRX-008', date: '15 Jul 2021', type: 'Unit Sales', description: 'Pembelian Honda BeAT CBS ISS', outlet: 'Nusantara Motor Purwokerto', amount: 'Rp17.800.000', status: 'Lunas' }
    ],
    serviceHistory: [
      { id: 'SRV-006', date: '18 Jul 2026', serviceType: 'Ganti Oli & Cek Kelistrikan', ahassName: 'Dealer Nusantara Motor', mechanicName: 'Tri Haryanto', odometerKm: 32000, cost: 'Rp118.000', notes: 'Servis ringan, kondisi ban depan mulai tipis disarankan ganti sebelum musim hujan.', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-004', date: '20 Jul 2026', channel: 'WhatsApp Mobile Apps', subject: 'Kuesioner Minat Kendaraan Baru', sentiment: 'Positif', agent: 'Sales Advisor Rina', outcome: 'Pelanggan menanyakan simulasi tukar tambah ke Honda Stylo 160.' }
    ],
    campaigns: [
      { id: 'CMP-004', campaignName: 'Program Trade-In BeAT ke Stylo 160 Jateng', channel: 'WhatsApp', sentDate: '22 Jul 2026', status: 'Dibuka & Klik', incentive: 'Subsidi Uang Muka Rp1.200.000 + Jaket Eksklusif' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. Jenderal Soedirman No. ***',
      district: 'Purwokerto Timur',
      regency: 'Banyumas',
      nearestAhass: 'Dealer Nusantara Motor Purwokerto (3,4 km)',
      distanceKm: 3.4,
      travelTimeMin: 10,
      alternateAhass: 'Dealer Purwokerto (4,1 km)',
      alternateDistanceKm: 4.1
    },
    nextBestAction: {
      title: 'Tindak Lanjuti Penawaran Trade-In Stylo 160 dengan Promo Subsidi FIFGROUP',
      reason: 'Pelanggan menunjukkan minat tukar tambah, unit BeAT 2021 sudah lunas, nilai taksasi bekas tinggi di pasar Jateng.',
      recommendedChannel: 'Telepon Pribadi',
      recommendedTiming: 'Rabu, 14.00 WIB',
      approvalStatus: 'Disetujui',
      expectedConversionRate: '52,4%'
    }
  },
  {
    id: 'cust-honda-004',
    maskedId: 'CUST-KDS-045211',
    maskedName: 'A*** W******',
    segment: 'High Value — At Risk',
    area: 'Jati',
    kabupaten: 'Kudus',
    customerValueScore: 86,
    retentionRiskScore: 79,
    riskCategory: 'Tinggi',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 5.6,
    tenureMonths: 20,
    monthlySpendAvg: 'Rp340.000',
    lastTransactionDate: '02 Juni 2026',
    lastInteractionDate: '15 Juli 2026',
    complaintStatus: 'Selesai',
    behavioralAlert: 'Belum servis lebih dari 90 hari, teridentifikasi tinggal di zona tekanan kompetitor bengkel non-resmi di jalur Pantura Kudus.',
    vehicle: {
      model: 'Honda Vario 160 ABS',
      plateNumberMasked: 'K 3*** TM',
      year: 2024,
      vinMasked: 'MH1KF111*PK******',
      odometerKm: 14800,
      engineCapacity: '160 cc 4-Katup eSP+',
      color: 'Grande Matte Black',
      purchaseType: 'Cash',
      dealerPurchase: 'Prima Motor Kudus',
      purchaseDate: '10 Januari 2024',
      kpbStatus: 'KPB 4 Terlewat',
      warrantyStatus: 'Garansi Rangka 5 Th Aktif'
    },
    transactions: [
      { id: 'TRX-009', date: '02 Jun 2026', type: 'Servis Dealer', description: 'Ganti Oli SPX2 + Kampas Rem Depan Cakram', outlet: 'Dealer Prima Motor Kudus', amount: 'Rp175.000', status: 'Selesai' },
      { id: 'TRX-010', date: '10 Jan 2024', type: 'Unit Sales', description: 'Pembelian Honda Vario 160 ABS', outlet: 'Prima Motor Kudus', amount: 'Rp29.800.000', status: 'Lunas' }
    ],
    serviceHistory: [
      { id: 'SRV-007', date: '02 Jun 2026', serviceType: 'Servis Berkala 12.000 km', ahassName: 'Dealer Prima Motor Kudus', mechanicName: 'Yanto', odometerKm: 12100, cost: 'Rp175.000', notes: 'Ganti oli mesin SPX2, periksa celah busi dan busa filter udara.', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-005', date: '15 Jul 2026', channel: 'SMS Blast', subject: 'Reminder Servis Berkala', sentiment: 'Netral', agent: 'Sistem', outcome: 'Terkirim tanpa respon balik.' }
    ],
    campaigns: [
      { id: 'CMP-005', campaignName: 'Service Winback Dealer Kudus', channel: 'WhatsApp', sentDate: '10 Ags 2026', status: 'Terkirim', incentive: 'Voucher Diskon Servis CVT 30%' }
    ],
    complaints: [
      { id: 'CMPL-002', ticketNo: 'TKT-KDS-260512', date: '12 Mei 2026', category: 'Kualitas Servis (Tarikan/Gredek)', status: 'Selesai', description: 'Pelanggan mengeluhkan tarikan awal sedikit bergetar pada CVT.', resolution: 'Pembersihan mangkok ganda CVT dan penggantian gemuk CVT gratis garansi pengerjaan.' }
    ],
    locationAccess: {
      addressMasked: 'Jl. AKBP Agil Kusumadya No. ***',
      district: 'Jati',
      regency: 'Kudus',
      nearestAhass: 'Dealer Prima Motor Kudus (5,6 km)',
      distanceKm: 5.6,
      travelTimeMin: 15,
      alternateAhass: 'Dealer Sukun Motor Kudus (6,8 km)',
      alternateDistanceKm: 6.8
    },
    nextBestAction: {
      title: 'Tawarkan Voucher Servis CVT Gratis & Jemput Motor (Service Kunjung)',
      reason: 'Pelanggan berisiko churn tinggi (79%), riwayat keluhan getaran CVT. Layanan jemput unit akan mengatasi friksi jarak 5,6 km.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Selasa, 11.00 WIB',
      approvalStatus: 'Perlu persetujuan',
      expectedConversionRate: '46,2%'
    }
  },
  {
    id: 'cust-honda-005',
    maskedId: 'CUST-MGL-058912',
    maskedName: 'E*** K******',
    segment: 'New Active Customer',
    area: 'Mertoyudan',
    kabupaten: 'Magelang',
    customerValueScore: 82,
    retentionRiskScore: 22,
    riskCategory: 'Rendah',
    preferredChannel: 'Mobile Push',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 1.8,
    tenureMonths: 6,
    monthlySpendAvg: 'Rp190.000',
    lastTransactionDate: '14 September 2026',
    lastInteractionDate: '14 September 2026',
    complaintStatus: 'Tidak Ada',
    behavioralAlert: 'Baru menyelesaikan KPB 2, pengguna aktif Mobile Apps dengan feedback bintang 5.',
    vehicle: {
      model: 'Honda Stylo 160 CBS',
      plateNumberMasked: 'AA 6*** GK',
      year: 2026,
      vinMasked: 'MH1KF711*RK******',
      odometerKm: 4250,
      engineCapacity: '160 cc 4-Katup eSP+',
      color: 'Glam Red',
      purchaseType: 'Kredit (FIFGROUP)',
      dealerPurchase: 'Timbul Jaya Motor Magelang',
      purchaseDate: '20 Maret 2026',
      kpbStatus: 'KPB 3 Aktif (Jatuh Tempo 8.000 KM)',
      warrantyStatus: 'Garansi Rangka 5 Th Aktif'
    },
    transactions: [
      { id: 'TRX-011', date: '14 Sep 2026', type: 'Servis Dealer', description: 'Servis KPB 2 + Ganti Oli AHM MPX2', outlet: 'Dealer Timbul Jaya Mertoyudan', amount: 'Rp0', status: 'Selesai' },
      { id: 'TRX-012', date: '20 Mar 2026', type: 'Unit Sales', description: 'Pembelian Honda Stylo 160 CBS', outlet: 'Timbul Jaya Motor Magelang', amount: 'Rp28.250.000', status: 'Kredit Aktif' }
    ],
    serviceHistory: [
      { id: 'SRV-008', date: '14 Sep 2026', serviceType: 'KPB 2 (4.000 km)', ahassName: 'Dealer Timbul Jaya Mertoyudan', mechanicName: 'Wawan S.', odometerKm: 4180, cost: 'Rp0', notes: 'Servis KPB 2, cek kelistrikan smart key, tekanan ban, oli MPX2 diganti.', kpbStatus: 'Gratis Jasa' }
    ],
    interactions: [
      { id: 'INT-006', date: '14 Sep 2026', channel: 'Aplikasi Mobile Apps', subject: 'Rating Bintang 5 Servis KPB 2', sentiment: 'Positif', agent: 'Sistem', outcome: 'Ulasan sangat puas dengan ruang tunggu ber-AC dan minuman gratis.' }
    ],
    campaigns: [
      { id: 'CMP-006', campaignName: 'Welcome Pack Apparel Stylo Jateng', channel: 'Push Mobile Apps', sentDate: '01 Apr 2026', status: 'Dikonversi', incentive: 'Voucher Diskon Helm Honda Classic 20%' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. Magelang-Yogya Km. ***',
      district: 'Mertoyudan',
      regency: 'Magelang',
      nearestAhass: 'Dealer Timbul Jaya Mertoyudan (1,8 km)',
      distanceKm: 1.8,
      travelTimeMin: 6,
      alternateAhass: 'Dealer Armada Tunas Magelang (3,2 km)',
      alternateDistanceKm: 3.2
    },
    nextBestAction: {
      title: 'Kirimkan Jadwal Otomatis KPB 3 (8.000 km) & Paket Aksesoris HGA Stylo',
      reason: 'Pengguna baru sangat aktif, pertahankan loyalitas melalui reminder preskriptif sebelum KPB 3 jatuh tempo.',
      recommendedChannel: 'Mobile Push',
      recommendedTiming: 'Jumat, 16.00 WIB',
      approvalStatus: 'Disetujui',
      expectedConversionRate: '74,0%'
    }
  },
  {
    id: 'cust-honda-006',
    maskedId: 'CUST-TGL-067823',
    maskedName: 'D*** P******',
    segment: 'High Value — At Risk',
    area: 'Tegal Barat',
    kabupaten: 'Kota Tegal',
    customerValueScore: 84,
    retentionRiskScore: 76,
    riskCategory: 'Tinggi',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 6.2,
    tenureMonths: 18,
    monthlySpendAvg: 'Rp290.000',
    lastTransactionDate: '10 Juli 2026',
    lastInteractionDate: '15 Agustus 2026',
    complaintStatus: 'Dalam Proses',
    behavioralAlert: 'Keluhan ketersediaan kampas kopling ganda inden selama 9 hari di Dealer Tegal Barat.',
    vehicle: {
      model: 'Honda Vario 125 CBS',
      plateNumberMasked: 'G 2*** DF',
      year: 2024,
      vinMasked: 'MH1JM511*PK******',
      odometerKm: 16900,
      engineCapacity: '125 cc eSP',
      color: 'Advance Matte Blue',
      purchaseType: 'Kredit (Adira)',
      dealerPurchase: 'Palma Motor Tegal',
      purchaseDate: '12 Januari 2024',
      kpbStatus: 'KPB Selesai',
      warrantyStatus: 'Garansi Rangka 5 Th Aktif'
    },
    transactions: [
      { id: 'TRX-013', date: '10 Jul 2026', type: 'Servis Dealer', description: 'Ganti Oli AHM MPX2 + Servis CVT', outlet: 'Dealer Palma Motor Tegal', amount: 'Rp145.000', status: 'Selesai' },
      { id: 'TRX-014', date: '12 Jan 2024', type: 'Unit Sales', description: 'Pembelian Honda Vario 125 CBS', outlet: 'Palma Motor Tegal', amount: 'Rp23.400.000', status: 'Kredit Aktif' }
    ],
    serviceHistory: [
      { id: 'SRV-009', date: '10 Jul 2026', serviceType: 'Servis Berkala & CVT', ahassName: 'Dealer Palma Motor Tegal', mechanicName: 'Iwan', odometerKm: 15400, cost: 'Rp145.000', notes: 'Pembersihan ruang CVT, disarankan ganti kampas ganda karena sudah mulai aus.', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-007', date: '15 Ags 2026', channel: 'WhatsApp Mobile Apps', subject: 'Eskalasi Inden Spare Part', sentiment: 'Negatif', agent: 'Part Officer Tegal', outcome: 'Pelanggan mempertanyakan kejelasan stok part kampas ganda.' }
    ],
    campaigns: [
      { id: 'CMP-007', campaignName: 'Promo Merdeka Dealer Tegal', channel: 'WhatsApp', sentDate: '17 Ags 2026', status: 'Diabaikan', incentive: 'Diskon Jasa 17%' }
    ],
    complaints: [
      { id: 'CMPL-003', ticketNo: 'TKT-TGL-260815', date: '15 Ags 2026', category: 'Ketersediaan Spare Part', status: 'Dalam Penanganan', description: 'Inden kampas ganda kopling Vario 125 melebihi SLA 5 hari kerja.', resolution: 'Pengiriman darurat part dialokasikan dari Gudang Spare Part Semarang (Dealer Jateng).' }
    ],
    locationAccess: {
      addressMasked: 'Jl. Kolonel Sugiono No. ***',
      district: 'Tegal Barat',
      regency: 'Kota Tegal',
      nearestAhass: 'Dealer Palma Motor Tegal (6,2 km)',
      distanceKm: 6.2,
      travelTimeMin: 18,
      alternateAhass: 'Dealer Bahari Slawi (7,5 km)',
      alternateDistanceKm: 7.5
    },
    nextBestAction: {
      title: 'Pemberitahuan Kesiapan Part Sparepart HGP & Bebas Biaya Pasang',
      reason: 'Part sudah tiba dari Main Dealer Semarang. Hubungi segera dengan fasilitas gratis ongkos pasang sebagai kompensasi inden.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Segera (Hari Ini)',
      approvalStatus: 'Perlu persetujuan',
      expectedConversionRate: '78,5%'
    }
  },
  {
    id: 'cust-honda-007',
    maskedId: 'CUST-PKL-079234',
    maskedName: 'H*** N******',
    segment: 'Commercial / Fleet User',
    area: 'Kedungwuni',
    kabupaten: 'Pekalongan',
    customerValueScore: 91,
    retentionRiskScore: 32,
    riskCategory: 'Sedang',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 2.8,
    tenureMonths: 30,
    monthlySpendAvg: 'Rp680.000',
    lastTransactionDate: '01 September 2026',
    lastInteractionDate: '01 September 2026',
    complaintStatus: 'Tidak Ada',
    behavioralAlert: 'Pelanggan memiliki 3 unit armada operasional usaha batik (2 Honda Supra X 125 dan 1 Honda Revo X). Servis rutin setiap bulan.',
    vehicle: {
      model: 'Honda Supra X 125 FI Spoke',
      plateNumberMasked: 'G 4*** AK',
      year: 2023,
      vinMasked: 'MH1JB911*NK******',
      odometerKm: 48500,
      engineCapacity: '125 cc PGM-FI',
      color: 'Quantum Black',
      purchaseType: 'Cash',
      dealerPurchase: 'Cendana Wangi Motor Pekalongan',
      purchaseDate: '15 Maret 2023',
      kpbStatus: 'KPB Selesai',
      warrantyStatus: 'Garansi Reguler'
    },
    transactions: [
      { id: 'TRX-015', date: '01 Sep 2026', type: 'Servis Dealer', description: 'Paket Servis Armada (Tune Up + Ganti Rantai Roda HGP + Oli MPX1)', outlet: 'Dealer Cendana Wangi Kedungwuni', amount: 'Rp345.000', status: 'Selesai' },
      { id: 'TRX-016', date: '04 Agu 2026', type: 'Spare Part HGP', description: 'Ban Luar Belakang Tubetype AHM Federal', outlet: 'Dealer Kedungwuni', amount: 'Rp215.000', status: 'Selesai' }
    ],
    serviceHistory: [
      { id: 'SRV-010', date: '01 Sep 2026', serviceType: 'Tune Up & Drive Chain', ahassName: 'Dealer Cendana Kedungwuni', mechanicName: 'Ahmad S.', odometerKm: 48100, cost: 'Rp345.000', notes: 'Ganti rantai set (drive chain kit HGP) dan oli mesin MPX1, kompresi mesin prima.', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-008', date: '01 Sep 2026', channel: 'WhatsApp Mobile Apps', subject: 'Invoice Servis Elektronik', sentiment: 'Positif', agent: 'Sistem', outcome: 'Invoice PDF diterima dan dibayar melalui QRIS DealerPay.' }
    ],
    campaigns: [
      { id: 'CMP-008', campaignName: 'Program Servis Fleet / Perusahaan UMKM Pekalongan', channel: 'WhatsApp', sentDate: '15 Agu 2026', status: 'Dikonversi', incentive: 'Potongan Jasa 25% untuk Minimal 2 Unit' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. Raya Capgawen No. ***',
      district: 'Kedungwuni',
      regency: 'Pekalongan',
      nearestAhass: 'Dealer Cendana Kedungwuni (2,8 km)',
      distanceKm: 2.8,
      travelTimeMin: 8,
      alternateAhass: 'Dealer Pekalongan Kota (6,0 km)',
      alternateDistanceKm: 6.0
    },
    nextBestAction: {
      title: 'Tawarkan Paket Kontrak Perawatan Armada Berkala (Fleet Care) UMKM',
      reason: 'Pelanggan memiliki volume servis tinggi bulanan dengan multi-unit Honda. Kontrak Fleet Care akan mengunci retensi jangka panjang.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Senin, 09.00 WIB',
      approvalStatus: 'Disetujui',
      expectedConversionRate: '71,2%'
    }
  },
  {
    id: 'cust-honda-008',
    maskedId: 'CUST-CLP-086541',
    maskedName: 'M*** F******',
    segment: 'High Value — At Risk',
    area: 'Cilacap Tengah',
    kabupaten: 'Cilacap',
    customerValueScore: 87,
    retentionRiskScore: 78,
    riskCategory: 'Tinggi',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 8.4,
    tenureMonths: 15,
    monthlySpendAvg: 'Rp360.000',
    lastTransactionDate: '20 Mei 2026',
    lastInteractionDate: '12 Juli 2026',
    complaintStatus: 'Tidak Ada',
    behavioralAlert: 'Celah jarak tempuh ke Dealer terdekat mencapai 8,4 km (kawasan industri Cilacap). Pelanggan berisiko beralih ke bengkel umum.',
    vehicle: {
      model: 'Honda CB150R Streetfire Special Edition',
      plateNumberMasked: 'R 6*** EP',
      year: 2024,
      vinMasked: 'MH1KC111*PK******',
      odometerKm: 13500,
      engineCapacity: '150 cc DOHC 6-Kecepatan',
      color: 'Fury Matte Red',
      purchaseType: 'Cash',
      dealerPurchase: 'Kompo Motor Cilacap',
      purchaseDate: '14 Juni 2024',
      kpbStatus: 'KPB Selesai',
      warrantyStatus: 'Garansi Rangka 5 Th Aktif'
    },
    transactions: [
      { id: 'TRX-017', date: '20 Mei 2026', type: 'Servis Dealer', description: 'Ganti Oli AHM SPX1 + Tune Up DOHC', outlet: 'Dealer Kompo Motor Cilacap', amount: 'Rp220.000', status: 'Selesai' },
      { id: 'TRX-018', date: '14 Jun 2024', type: 'Unit Sales', description: 'Pembelian Honda CB150R Streetfire SE Cash', outlet: 'Kompo Motor Cilacap', amount: 'Rp31.500.000', status: 'Lunas' }
    ],
    serviceHistory: [
      { id: 'SRV-011', date: '20 Mei 2026', serviceType: 'Servis Berkala & Ganti Oli', ahassName: 'Dealer Kompo Cilacap', mechanicName: 'Rahmat H.', odometerKm: 12100, cost: 'Rp220.000', notes: 'Ganti oli SPX1 1.2L, cek celah klep DOHC dan setel kopling manual.', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-009', date: '12 Jul 2026', channel: 'WhatsApp Mobile Apps', subject: 'Pengingat Ganti Oli SPX1', sentiment: 'Netral', agent: 'Sistem', outcome: 'Belum ada konfirmasi booking dari pelanggan.' }
    ],
    campaigns: [
      { id: 'CMP-009', campaignName: 'Promo Sport Honda Jateng Riders', channel: 'WhatsApp', sentDate: '01 Agu 2026', status: 'Dibuka & Klik', incentive: 'Diskon Jasa Servis Sport 25%' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. MT Haryono No. ***, Donan',
      district: 'Cilacap Tengah',
      regency: 'Cilacap',
      nearestAhass: 'Dealer Kompo Cilacap (8,4 km)',
      distanceKm: 8.4,
      travelTimeMin: 24,
      alternateAhass: 'Dealer Kroya Raya (18,0 km)',
      alternateDistanceKm: 18.0
    },
    nextBestAction: {
      title: 'Tawarkan Layanan Service Kunjung Dealer ke Kawasan Industri Cilacap',
      reason: 'Fasilitasi jarak tempuh 8,4 km dengan layanan service kunjung perusahaan/perumahan industri pada jam istirahat.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Rabu, 11.30 WIB',
      approvalStatus: 'Perlu persetujuan',
      expectedConversionRate: '49,0%'
    }
  },
  {
    id: 'cust-honda-009',
    maskedId: 'CUST-DMK-092318',
    maskedName: 'I*** Z******',
    segment: 'High Value Loyal',
    area: 'Mranggen',
    kabupaten: 'Demak',
    customerValueScore: 88,
    retentionRiskScore: 26,
    riskCategory: 'Rendah',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 1.5,
    tenureMonths: 24,
    monthlySpendAvg: 'Rp275.000',
    lastTransactionDate: '02 September 2026',
    lastInteractionDate: '03 September 2026',
    complaintStatus: 'Tidak Ada',
    behavioralAlert: 'Pelanggan komuter Mranggen-Semarang dengan mobilitas harian tinggi (>45 km/hari). Disiplin servis setiap 2 bulan sekali.',
    vehicle: {
      model: 'Honda Scoopy Prestige Green',
      plateNumberMasked: 'H 5*** EN',
      year: 2024,
      vinMasked: 'MH1JM321*PK******',
      odometerKm: 26100,
      engineCapacity: '110 cc eSP Smart Key',
      color: 'Prestige Green',
      purchaseType: 'Kredit (FIFGROUP)',
      dealerPurchase: 'Dealer Mranggen Demak',
      purchaseDate: '05 September 2024',
      kpbStatus: 'KPB Selesai',
      warrantyStatus: 'Garansi Rangka 5 Th Aktif'
    },
    transactions: [
      { id: 'TRX-019', date: '02 Sep 2026', type: 'Servis Dealer', description: 'Ganti Oli MPX2 + Oli Gardan + Busi', outlet: 'Dealer Mranggen', amount: 'Rp135.000', status: 'Selesai' },
      { id: 'TRX-020', date: '05 Sep 2024', type: 'Unit Sales', description: 'Pembelian Honda Scoopy Prestige', outlet: 'Dealer Mranggen', amount: 'Rp22.850.000', status: 'Kredit Aktif' }
    ],
    serviceHistory: [
      { id: 'SRV-012', date: '02 Sep 2026', serviceType: 'Servis Berkala & Ganti Oli', ahassName: 'Dealer Mranggen', mechanicName: 'Joko S.', odometerKm: 25800, cost: 'Rp135.000', notes: 'Ganti oli MPX2, periksa ketebalan v-belt masih dalam toleransi aman (18,2 mm).', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-010', date: '03 Sep 2026', channel: 'WhatsApp Mobile Apps', subject: 'Survei Kepuasan Servis', sentiment: 'Positif', agent: 'Sistem', outcome: 'Memberikan skor 10/10 dan memuji keramahan service advisor.' }
    ],
    campaigns: [
      { id: 'CMP-010', campaignName: 'Promo Komuter Tangguh Dealer Demak', channel: 'WhatsApp', sentDate: '20 Agu 2026', status: 'Dikonversi', incentive: 'Gratis Pembersihan Injektor' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. Raya Bandungrejo No. ***',
      district: 'Mranggen',
      regency: 'Demak',
      nearestAhass: 'Dealer Mranggen (1,5 km)',
      distanceKm: 1.5,
      travelTimeMin: 5,
      alternateAhass: 'Dealer Majapahit Semarang (4,2 km)',
      alternateDistanceKm: 4.2
    },
    nextBestAction: {
      title: 'Tawarkan Paket Perawatan Komuter Tahunan (V-Belt + Kampas Rem + Ban HGP)',
      reason: 'Kilometer bertambah cepat karena mobilitas komuter harian. Bundling part pencegah mogok jalan akan sangat diminati.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Kamis, 19.00 WIB',
      approvalStatus: 'Disetujui',
      expectedConversionRate: '65,5%'
    }
  },
  {
    id: 'cust-honda-010',
    maskedId: 'CUST-JPR-103492',
    maskedName: 'T*** W******',
    segment: 'EV Early Adopter',
    area: 'Tahunan',
    kabupaten: 'Jepara',
    customerValueScore: 92,
    retentionRiskScore: 28,
    riskCategory: 'Rendah',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 3.1,
    tenureMonths: 8,
    monthlySpendAvg: 'Rp150.000',
    lastTransactionDate: '10 Agustus 2026',
    lastInteractionDate: '11 Agustus 2026',
    complaintStatus: 'Tidak Ada',
    behavioralAlert: 'Pemilik motor listrik Honda EM1 e: PLUS, antusias tinggi terhadap ekosistem Honda Mobile Power Pack e: dan charger resmi.',
    vehicle: {
      model: 'Honda EM1 e: PLUS',
      plateNumberMasked: 'K 2*** ZL',
      year: 2026,
      vinMasked: 'MH1ED111*RK******',
      odometerKm: 3800,
      engineCapacity: 'In-Wheel Electric Motor 1.7 kW',
      color: 'Excellent Matte Silver',
      purchaseType: 'Cash',
      dealerPurchase: 'Jepara Motor Honda EV Center',
      purchaseDate: '15 Januari 2026',
      kpbStatus: 'KPB EV 2 Selesai',
      warrantyStatus: 'Garansi Baterai 3 Th & Rangka 5 Th Aktif'
    },
    transactions: [
      { id: 'TRX-021', date: '10 Ags 2026', type: 'Servis Dealer', description: 'Inspeksi Berkala EV + Cek Kesehatan Baterai (SOH 99%)', outlet: 'Dealer EV Center Jepara', amount: 'Rp0', status: 'Selesai' },
      { id: 'TRX-022', date: '15 Jan 2026', type: 'Unit Sales', description: 'Pembelian Honda EM1 e: PLUS + Honda Power Pack Charger e:', outlet: 'Jepara Motor EV Center', amount: 'Rp39.500.000', status: 'Lunas' }
    ],
    serviceHistory: [
      { id: 'SRV-013', date: '10 Ags 2026', serviceType: 'Inspeksi Berkala EV', ahassName: 'Dealer EV Center Jepara', mechanicName: 'Bambang E.', odometerKm: 3750, cost: 'Rp0', notes: 'Inspeksi motor drive, konektor baterai Honda MPP e: bersih, kalibrasi ECU EV.', kpbStatus: 'Gratis Jasa' }
    ],
    interactions: [
      { id: 'INT-011', date: '11 Ags 2026', channel: 'WhatsApp Mobile Apps', subject: 'Edukasi Titik B swap Jateng', sentiment: 'Positif', agent: 'EV Specialist', outcome: 'Pelanggan menerima peta titik B-Swap Dealer di Kudus dan Semarang.' }
    ],
    campaigns: [
      { id: 'CMP-011', campaignName: 'Program Komunitas Motor Listrik Honda Jateng', channel: 'WhatsApp', sentDate: '01 Agu 2026', status: 'Dikonversi', incentive: 'Gratis Aksesoris Rear Carrier Resmi' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. Raya Soekarno-Hatta No. ***',
      district: 'Tahunan',
      regency: 'Jepara',
      nearestAhass: 'Dealer EV Center Jepara (3,1 km)',
      distanceKm: 3.1,
      travelTimeMin: 9,
      alternateAhass: 'Dealer Kartini Jepara (4,5 km)',
      alternateDistanceKm: 4.5
    },
    nextBestAction: {
      title: 'Tawarkan Baterai Cadangan Kedua (Second Pack) dengan Cicilan 0%',
      reason: 'Pelanggan aktif menggunakan EM1 e: untuk komuter harian furnitur Jepara. Baterai cadangan akan meningkatkan kenyamanan jarak tempuh.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Rabu, 10.00 WIB',
      approvalStatus: 'Disetujui',
      expectedConversionRate: '58,0%'
    }
  },
  // Customers 11 to 30: Realistic Honda owner personas across Central Java
  {
    id: 'cust-honda-011',
    maskedId: 'CUST-SKH-114920',
    maskedName: 'W*** P******',
    segment: 'High Value Loyal',
    area: 'Kartasura',
    kabupaten: 'Sukoharjo',
    customerValueScore: 90,
    retentionRiskScore: 21,
    riskCategory: 'Rendah',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 1.2,
    tenureMonths: 22,
    monthlySpendAvg: 'Rp410.000',
    lastTransactionDate: '04 September 2026',
    lastInteractionDate: '04 September 2026',
    complaintStatus: 'Tidak Ada',
    vehicle: {
      model: 'Honda PCX 160 ABS',
      plateNumberMasked: 'AD 3*** YT',
      year: 2024,
      vinMasked: 'MH1KF521*PK******',
      odometerKm: 17200,
      engineCapacity: '160 cc eSP+ ABS HSTC',
      color: 'Imperial Matte Blue',
      purchaseType: 'Cash',
      dealerPurchase: 'Dealer Solo Baru',
      purchaseDate: '12 November 2024',
      kpbStatus: 'KPB Selesai',
      warrantyStatus: 'Garansi Rangka 5 Th Aktif'
    },
    transactions: [
      { id: 'TRX-023', date: '04 Sep 2026', type: 'Servis Dealer', description: 'Ganti Oli AHM SPX2 + Flush Radiator Coolant', outlet: 'Dealer Kartasura Motor', amount: 'Rp195.000', status: 'Selesai' }
    ],
    serviceHistory: [
      { id: 'SRV-014', date: '04 Sep 2026', serviceType: 'Servis Berkala & Pendingin', ahassName: 'Dealer Kartasura', mechanicName: 'Danang', odometerKm: 17000, cost: 'Rp195.000', notes: 'Ganti oli SPX2 dan kuras cairan coolant radiator AHM.', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-012', date: '04 Sep 2026', channel: 'WhatsApp Mobile Apps', subject: 'Konfirmasi Booking Berhasil', sentiment: 'Positif', agent: 'Sistem', outcome: 'Servis selesai tepat waktu dalam 35 menit.' }
    ],
    campaigns: [
      { id: 'CMP-012', campaignName: 'Service Reward Point Mobile Apps', channel: 'Push Mobile Apps', sentDate: '01 Sep 2026', status: 'Dikonversi', incentive: 'Cashback DealerPay Rp25.000' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. Ahmad Yani No. ***',
      district: 'Kartasura',
      regency: 'Sukoharjo',
      nearestAhass: 'Dealer Kartasura Motor (1,2 km)',
      distanceKm: 1.2,
      travelTimeMin: 4,
      alternateAhass: 'Dealer Solo Baru (6,1 km)',
      alternateDistanceKm: 6.1
    },
    nextBestAction: {
      title: 'Tawarkan Paket Servis CVT & Ganti V-Belt Kit HGP (18.000 km)',
      reason: 'Odometer mendekati 18.000 km, waktu ideal untuk penggantian preventive part transmisi matic PCX 160.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Jumat, 14.00 WIB',
      approvalStatus: 'Disetujui',
      expectedConversionRate: '72,0%'
    }
  },
  {
    id: 'cust-honda-012',
    maskedId: 'CUST-KLT-128391',
    maskedName: 'F*** R******',
    segment: 'Potential Upgrader',
    area: 'Klaten Utara',
    kabupaten: 'Klaten',
    customerValueScore: 79,
    retentionRiskScore: 38,
    riskCategory: 'Sedang',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 2.5,
    tenureMonths: 35,
    monthlySpendAvg: 'Rp230.000',
    lastTransactionDate: '24 Juli 2026',
    lastInteractionDate: '25 Juli 2026',
    complaintStatus: 'Tidak Ada',
    vehicle: {
      model: 'Honda Vario 125 CBS ISS',
      plateNumberMasked: 'AD 5*** HQ',
      year: 2021,
      vinMasked: 'MH1JM521*MK******',
      odometerKm: 34200,
      engineCapacity: '125 cc eSP',
      color: 'Advance Matte Black',
      purchaseType: 'Kredit (FIFGROUP)',
      dealerPurchase: 'Naga Mas Motor Klaten',
      purchaseDate: '10 Oktober 2021',
      kpbStatus: 'KPB Selesai',
      warrantyStatus: 'Masa Garansi Reguler'
    },
    transactions: [
      { id: 'TRX-024', date: '24 Jul 2026', type: 'Servis Dealer', description: 'Ganti Ban Belakang Tubeless AHM + Ganti Oli MPX2', outlet: 'Dealer Naga Mas Klaten', amount: 'Rp340.000', status: 'Selesai' }
    ],
    serviceHistory: [
      { id: 'SRV-015', date: '24 Jul 2026', serviceType: 'Ganti Ban & Tune Up', ahassName: 'Dealer Naga Mas Klaten', mechanicName: 'Gunawan', odometerKm: 34000, cost: 'Rp340.000', notes: 'Ban belakang botak diganti part Federal Tire HGP.', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-013', date: '25 Jul 2026', channel: 'WhatsApp Mobile Apps', subject: 'Simulasi Trade-In Vario 160', sentiment: 'Positif', agent: 'Sales Klaten', outcome: 'Pelanggan meminta simulasi angsuran 24 bulan FIFGROUP.' }
    ],
    campaigns: [
      { id: 'CMP-013', campaignName: 'Promo Upgrade Matic 160cc Jateng', channel: 'WhatsApp', sentDate: '26 Jul 2026', status: 'Dibuka & Klik', incentive: 'Potongan Angsuran Rp50.000/bln' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. Pemuda No. ***',
      district: 'Klaten Utara',
      regency: 'Klaten',
      nearestAhass: 'Dealer Naga Mas Klaten (2,5 km)',
      distanceKm: 2.5,
      travelTimeMin: 7,
      alternateAhass: 'Dealer Delanggu Raya (8,0 km)',
      alternateDistanceKm: 8.0
    },
    nextBestAction: {
      title: 'Kirim Proposal Tukar Tambah ke Vario 160 dengan Diskon DP FIFGROUP',
      reason: 'Pelanggan sudah meminta simulasi angsuran, unit lama sudah lunas cicilan 3 tahun.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Senin, 13.00 WIB',
      approvalStatus: 'Disetujui',
      expectedConversionRate: '61,0%'
    }
  },
  {
    id: 'cust-honda-013',
    maskedId: 'CUST-PTI-139201',
    maskedName: 'K*** A******',
    segment: 'High Value — At Risk',
    area: 'Juwana',
    kabupaten: 'Pati',
    customerValueScore: 85,
    retentionRiskScore: 74,
    riskCategory: 'Tinggi',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 7.1,
    tenureMonths: 16,
    monthlySpendAvg: 'Rp320.000',
    lastTransactionDate: '15 Mei 2026',
    lastInteractionDate: '10 Juli 2026',
    complaintStatus: 'Selesai',
    vehicle: {
      model: 'Honda Scoopy Stylish Red',
      plateNumberMasked: 'K 4*** GA',
      year: 2024,
      vinMasked: 'MH1JM331*PK******',
      odometerKm: 15300,
      engineCapacity: '110 cc eSP Smart Key',
      color: 'Stylish Red',
      purchaseType: 'Cash',
      dealerPurchase: 'Juwana Motor Honda',
      purchaseDate: '20 April 2024',
      kpbStatus: 'KPB Selesai',
      warrantyStatus: 'Garansi Rangka 5 Th Aktif'
    },
    transactions: [
      { id: 'TRX-025', date: '15 Mei 2026', type: 'Servis Dealer', description: 'Ganti Oli MPX2 + Servis CVT', outlet: 'Dealer Juwana Motor', amount: 'Rp145.000', status: 'Selesai' }
    ],
    serviceHistory: [
      { id: 'SRV-016', date: '15 Mei 2026', serviceType: 'Servis Berkala & CVT', ahassName: 'Dealer Juwana', mechanicName: 'Hendri', odometerKm: 14900, cost: 'Rp145.000', notes: 'Ganti oli dan bersihkan kampas ganda CVT.', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-014', date: '10 Jul 2026', channel: 'SMS Blast', subject: 'Reminder Servis', sentiment: 'Netral', agent: 'Sistem', outcome: 'Tidak ada respon dari pelanggan.' }
    ],
    campaigns: [
      { id: 'CMP-014', campaignName: 'Promo Merdeka Dealer Pati', channel: 'WhatsApp', sentDate: '15 Agu 2026', status: 'Diabaikan', incentive: 'Diskon Jasa 20%' }
    ],
    complaints: [
      { id: 'CMPL-004', ticketNo: 'TKT-PTI-260420', date: '20 Apr 2026', category: 'Fasilitas Ruang Tunggu', status: 'Selesai', description: 'Ruang tunggu AC Dealer kurang dingin dan kursi terbatas.', resolution: 'Kepala Bengkel melakukan perbaikan AC dan menambah sofa tunggu pelanggan.' }
    ],
    locationAccess: {
      addressMasked: 'Jl. Silugonggo No. ***',
      district: 'Juwana',
      regency: 'Pati',
      nearestAhass: 'Dealer Juwana Motor (7,1 km)',
      distanceKm: 7.1,
      travelTimeMin: 20,
      alternateAhass: 'Dealer Pati Kota (12,0 km)',
      alternateDistanceKm: 12.0
    },
    nextBestAction: {
      title: 'Tawarkan Booking Prioritas di Ruang Tunggu VIP Dealer Juwana & Diskon Oli',
      reason: 'Riwayat komplain ruang tunggu dan jarak tempuh 7,1 km membuat pelanggan enggan datang jika harus menunggu lama.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Rabu, 10.00 WIB',
      approvalStatus: 'Perlu persetujuan',
      expectedConversionRate: '45,0%'
    }
  },
  {
    id: 'cust-honda-014',
    maskedId: 'CUST-KDL-140283',
    maskedName: 'B*** Y******',
    segment: 'New Active Customer',
    area: 'Kaliwungu',
    kabupaten: 'Kendal',
    customerValueScore: 81,
    retentionRiskScore: 24,
    riskCategory: 'Rendah',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 2.0,
    tenureMonths: 5,
    monthlySpendAvg: 'Rp175.000',
    lastTransactionDate: '01 September 2026',
    lastInteractionDate: '01 September 2026',
    complaintStatus: 'Tidak Ada',
    vehicle: {
      model: 'Honda BeAT Deluxe Smart Key',
      plateNumberMasked: 'H 6*** BR',
      year: 2026,
      vinMasked: 'MH1JM811*RK******',
      odometerKm: 3950,
      engineCapacity: '110 cc eSP Smart Key',
      color: 'Deluxe Matte Black',
      purchaseType: 'Kredit (FIFGROUP)',
      dealerPurchase: 'Cendana Motor Kaliwungu',
      purchaseDate: '12 April 2026',
      kpbStatus: 'KPB 2 Aktif',
      warrantyStatus: 'Garansi Rangka 5 Th Aktif'
    },
    transactions: [
      { id: 'TRX-026', date: '01 Sep 2026', type: 'Servis Dealer', description: 'Servis KPB 2 + Cek Smart Key', outlet: 'Dealer Cendana Kaliwungu', amount: 'Rp0', status: 'Selesai' }
    ],
    serviceHistory: [
      { id: 'SRV-017', date: '01 Sep 2026', serviceType: 'KPB 2 (4.000 km)', ahassName: 'Dealer Kaliwungu', mechanicName: 'Zaenal', odometerKm: 3900, cost: 'Rp0', notes: 'Servis KPB 2 selesai, setel rem belakang, cek aki dan baterai remote remote.', kpbStatus: 'Gratis Jasa' }
    ],
    interactions: [
      { id: 'INT-015', date: '01 Sep 2026', channel: 'WhatsApp Mobile Apps', subject: 'Rating Servis Bintang 5', sentiment: 'Positif', agent: 'Sistem', outcome: 'Sangat puas dengan kecepatan pengerjaan Fast Pit (20 menit).' }
    ],
    campaigns: [
      { id: 'CMP-015', campaignName: 'Aksesoris Resmi BeAT HGA Diskon 15%', channel: 'Push Mobile Apps', sentDate: '15 Mei 2026', status: 'Dikonversi', incentive: 'Voucher HGA Garnish Knalpot' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. Raya Timur Kaliwungu No. ***',
      district: 'Kaliwungu',
      regency: 'Kendal',
      nearestAhass: 'Dealer Cendana Kaliwungu (2,0 km)',
      distanceKm: 2.0,
      travelTimeMin: 6,
      alternateAhass: 'Dealer Mangkang Semarang (5,2 km)',
      alternateDistanceKm: 5.2
    },
    nextBestAction: {
      title: 'Reminder Otomatis KPB 3 (8.000 km) dengan Paket Aksesoris HGA',
      reason: 'Pelanggan baru puas dengan layanan Fast Pit. KPB 3 dijadwalkan estimasi 3 bulan mendatang.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Sabtu, 11.00 WIB',
      approvalStatus: 'Disetujui',
      expectedConversionRate: '75,0%'
    }
  },
  {
    id: 'cust-honda-015',
    maskedId: 'CUST-BBS-159482',
    maskedName: 'A*** S******',
    segment: 'High Value — At Risk',
    area: 'Bumiayu',
    kabupaten: 'Brebes',
    customerValueScore: 84,
    retentionRiskScore: 80,
    riskCategory: 'Tinggi',
    preferredChannel: 'WhatsApp',
    consentStatus: 'Diizinkan',
    nearestServicePointKm: 8.9,
    tenureMonths: 26,
    monthlySpendAvg: 'Rp350.000',
    lastTransactionDate: '10 Mei 2026',
    lastInteractionDate: '20 Juni 2026',
    complaintStatus: 'Tidak Ada',
    vehicle: {
      model: 'Honda CRF150L Extreme Black',
      plateNumberMasked: 'G 5*** WQ',
      year: 2024,
      vinMasked: 'MH1KD111*PK******',
      odometerKm: 21800,
      engineCapacity: '150 cc SOHC PGM-FI',
      color: 'Extreme Black',
      purchaseType: 'Cash',
      dealerPurchase: 'Mitra Motor Bumiayu',
      purchaseDate: '15 Juli 2024',
      kpbStatus: 'KPB Selesai',
      warrantyStatus: 'Garansi Reguler'
    },
    transactions: [
      { id: 'TRX-027', date: '10 Mei 2026', type: 'Servis Dealer', description: 'Ganti Oli AHM SPX1 + Setel Rantai & Suspensi Pro-Link', outlet: 'Dealer Mitra Bumiayu', amount: 'Rp215.000', status: 'Selesai' }
    ],
    serviceHistory: [
      { id: 'SRV-018', date: '10 Mei 2026', serviceType: 'Servis Berkala Motor Sport', ahassName: 'Dealer Bumiayu', mechanicName: 'Teguh', odometerKm: 20500, cost: 'Rp215.000', notes: 'Ganti oli SPX1, periksa swingarm dan pelumasan link suspensi.', kpbStatus: 'Reguler Berbayar' }
    ],
    interactions: [
      { id: 'INT-016', date: '20 Jun 2026', channel: 'SMS Blast', subject: 'Pengingat Ganti Oli', sentiment: 'Netral', agent: 'Sistem', outcome: 'Belum ada konfirmasi.' }
    ],
    campaigns: [
      { id: 'CMP-016', campaignName: 'CRF Community Trail Adventure Jateng', channel: 'WhatsApp', sentDate: '01 Agu 2026', status: 'Dibuka & Klik', incentive: 'Gratis Cek 15 Titik Kendaraan' }
    ],
    complaints: [],
    locationAccess: {
      addressMasked: 'Jl. Pangeran Diponegoro No. ***',
      district: 'Bumiayu',
      regency: 'Brebes',
      nearestAhass: 'Dealer Mitra Motor Bumiayu (8,9 km)',
      distanceKm: 8.9,
      travelTimeMin: 26,
      alternateAhass: 'Dealer Ajibarang Banyumas (14,0 km)',
      alternateDistanceKm: 14.0
    },
    nextBestAction: {
      title: 'Tawarkan Servis Komunitas Trail & Voucher Oli SPX1 Khusus CRF',
      reason: 'Pengguna CRF di jalur pegunungan Bumiayu berjarak 8,9 km ke Dealer. Promosi komunitas offroad efektif mendatangkan kembali.',
      recommendedChannel: 'WhatsApp',
      recommendedTiming: 'Jumat, 15.00 WIB',
      approvalStatus: 'Perlu persetujuan',
      expectedConversionRate: '48,0%'
    }
  },
  // Customers 16 to 30: Additional Central Java Cities & Honda Models
  ...Array.from({ length: 15 }).map((_, idx) => {
    const custNum = 16 + idx;
    const areas = [
      { area: 'Wonosobo Kota', kab: 'Wonosobo', plate: 'AA', dealer: 'Wonosobo Indah Motor', dist: 3.5 },
      { area: 'Purbalingga Lor', kab: 'Purbalingga', plate: 'R', dealer: 'Tunas Jaya Purbalingga', dist: 2.2 },
      { area: 'Gombong', kab: 'Kebumen', plate: 'AA', dealer: 'Sumber Abadi Gombong', dist: 4.8 },
      { area: 'Sragen Kota', kab: 'Sragen', plate: 'AD', dealer: 'Tunas Baru Sragen', dist: 2.9 },
      { area: 'Karanganyar Kota', kab: 'Karanganyar', plate: 'AD', dealer: 'Karanganyar Motor', dist: 1.8 },
      { area: 'Boyolali Kota', kab: 'Boyolali', plate: 'AD', dealer: 'Susu Murni Motor Boyolali', dist: 2.4 },
      { area: 'Batang Kota', kab: 'Batang', plate: 'G', dealer: 'Batang Raya Motor', dist: 3.1 },
      { area: 'Pemalang Kota', kab: 'Pemalang', plate: 'G', dealer: 'Pemalang Indah Motor', dist: 4.0 },
      { area: 'Purwodadi', kab: 'Grobogan', plate: 'K', dealer: 'Purwodadi Sakti Motor', dist: 3.8 },
      { area: 'Salatiga Sidomukti', kab: 'Kota Salatiga', plate: 'H', dealer: 'Dealer Salatiga', dist: 1.6 },
      { area: 'Ungaran Barat', kab: 'Semarang', plate: 'H', dealer: 'Ungaran Motor Raya', dist: 2.7 },
      { area: 'Temanggung Kota', kab: 'Temanggung', plate: 'AA', dealer: 'Temanggung Makmur', dist: 3.2 },
      { area: 'Banjarnegara Kota', kab: 'Banjarnegara', plate: 'R', dealer: 'Surya Banjarnegara', dist: 4.5 },
      { area: 'Rembang Kota', kab: 'Rembang', plate: 'K', dealer: 'Rembang Mandiri Motor', dist: 3.6 },
      { area: 'Blora Kota', kab: 'Blora', plate: 'K', dealer: 'Blora Motor Sejahtera', dist: 5.0 }
    ][idx];

    const models = [
      { model: 'Honda Vario 160 CBS', cc: '160 cc eSP+', color: 'Matte Blue', type: 'Servis Dealer', part: 'Ganti Oli SPX2' },
      { model: 'Honda Scoopy Prestige White', cc: '110 cc eSP', color: 'Prestige White', type: 'Servis Dealer', part: 'Ganti Oli MPX2 & Busi' },
      { model: 'Honda Stylo 160 ABS', cc: '160 cc eSP+', color: 'Royal Green', type: 'Servis Dealer', part: 'Servis KPB 2' },
      { model: 'Honda BeAT Street', cc: '110 cc eSP', color: 'Street Silver', type: 'Servis Dealer', part: 'Ganti Oli MPX2' },
      { model: 'Honda PCX 160 CBS', cc: '160 cc eSP+', color: 'Brilliant Black', type: 'Servis Dealer', part: 'Servis Berkala & CVT' },
      { model: 'Honda CBR150R Victory Red', cc: '150 cc DOHC', color: 'Victory Red Black', type: 'Servis Dealer', part: 'Ganti Oli SPX1' },
      { model: 'Honda ADV 160 CBS', cc: '160 cc eSP+', color: 'Dynamic Red', type: 'Servis Dealer', part: 'Servis CVT Berkala' },
      { model: 'Honda Revo X', cc: '110 cc PGM-FI', color: 'Galaxy Blue', type: 'Servis Dealer', part: 'Tune Up Injeksi' },
      { model: 'Honda Supra X 125 FI', cc: '125 cc PGM-FI', color: 'Golden Matte Black', type: 'Servis Dealer', part: 'Ganti Rantai & Oli' },
      { model: 'Honda Genio CBS ISS', cc: '110 cc eSP', color: 'Radiant Black', type: 'Servis Dealer', part: 'Ganti Oli & Filter' },
      { model: 'Honda Vario 125 Special Edition', cc: '125 cc eSP', color: 'Matte Blue', type: 'Servis Dealer', part: 'Ganti Kampas Rem' },
      { model: 'Honda BeAT Deluxe', cc: '110 cc eSP', color: 'Deluxe Green', type: 'Servis Dealer', part: 'Servis KPB 3' },
      { model: 'Honda CB150X Adventure', cc: '150 cc DOHC', color: 'Amazonia Green', type: 'Servis Dealer', part: 'Ganti Oli SPX1' },
      { model: 'Honda Scoopy Fashion Blue', cc: '110 cc eSP', color: 'Fashion Blue', type: 'Servis Dealer', part: 'Servis Berkala' },
      { model: 'Honda PCX 160 ABS', cc: '160 cc eSP+', color: 'Wonderful White', type: 'Servis Dealer', part: 'Servis Lengkap CVT' }
    ][idx];

    const isHighRisk = idx % 3 === 0;
    const isLoyal = idx % 3 === 1;

    return {
      id: `cust-honda-0${custNum}`,
      maskedId: `CUST-JTG-${String(160000 + custNum * 123).padStart(6, '0')}`,
      maskedName: `${['A***', 'D***', 'E***', 'F***', 'G***', 'H***', 'I***', 'J***', 'L***', 'M***', 'N***', 'P***', 'R***', 'S***', 'T***'][idx]} ${['P******', 'W******', 'K******', 'S******', 'H******', 'N******', 'M******', 'R******', 'F******', 'B******', 'L******', 'Y******', 'Z******', 'C******', 'D******'][idx]}`,
      segment: isHighRisk ? 'High Value — At Risk' : isLoyal ? 'High Value Loyal' : 'Growing Customer',
      area: areas.area,
      kabupaten: areas.kab,
      customerValueScore: isLoyal ? 88 + (idx % 8) : 74 + (idx % 12),
      retentionRiskScore: isHighRisk ? 72 + (idx % 15) : isLoyal ? 18 + (idx % 10) : 38 + (idx % 15),
      riskCategory: (isHighRisk ? 'Tinggi' : isLoyal ? 'Rendah' : 'Sedang') as 'Tinggi' | 'Sedang' | 'Rendah',
      preferredChannel: (idx % 4 === 0 ? 'Telepon Pribadi' : idx % 3 === 0 ? 'Mobile Push' : 'WhatsApp') as any,
      consentStatus: 'Diizinkan' as const,
      nearestServicePointKm: areas.dist,
      tenureMonths: 12 + idx * 2,
      monthlySpendAvg: `Rp${(220 + (idx % 6) * 45).toLocaleString('id-ID')}.000`,
      lastTransactionDate: `${10 + (idx % 18)} Agustus 2026`,
      lastInteractionDate: `${15 + (idx % 14)} Agustus 2026`,
      complaintStatus: (idx % 5 === 0 ? 'Dalam Proses' : 'Tidak Ada') as 'Dalam Proses' | 'Selesai' | 'Tidak Ada',
      behavioralAlert: isHighRisk
        ? `Jatuh tempo servis berkala terlewat lebih dari ${30 + idx * 2} hari pada unit ${models.model}.`
        : `Pengguna aktif unit ${models.model}, riwayat servis terpantau stabil di Dealer ${areas.dealer}.`,
      vehicle: {
        model: models.model,
        plateNumberMasked: `${areas.plate} ${1000 + idx * 234} **`,
        year: 2023 + (idx % 4),
        vinMasked: `MH1KF${100 + idx}*PK******`,
        odometerKm: 8500 + idx * 1750,
        engineCapacity: models.cc,
        color: models.color,
        purchaseType: (idx % 2 === 0 ? 'Kredit (FIFGROUP)' : 'Cash') as any,
        dealerPurchase: areas.dealer,
        purchaseDate: `14 Mei ${2023 + (idx % 4)}`,
        kpbStatus: idx % 2 === 0 ? 'KPB Selesai (Perawatan Reguler)' : 'KPB 3 & 4 Aktif',
        warrantyStatus: 'Garansi Rangka 5 Th Aktif'
      },
      transactions: [
        {
          id: `TRX-AUTO-0${custNum}`,
          date: `${10 + (idx % 18)} Ags 2026`,
          type: 'Servis Dealer' as const,
          description: `${models.part} di Dealer ${areas.dealer}`,
          outlet: `Dealer ${areas.dealer}`,
          amount: `Rp${(145 + (idx % 5) * 35).toLocaleString('id-ID')}.000`,
          status: 'Selesai' as const
        }
      ],
      serviceHistory: [
        {
          id: `SRV-AUTO-0${custNum}`,
          date: `${10 + (idx % 18)} Ags 2026`,
          serviceType: 'Servis Berkala Dealer',
          ahassName: `Dealer ${areas.dealer}`,
          mechanicName: `Mekanik Dealer #${idx + 1}`,
          odometerKm: 8200 + idx * 1750,
          cost: `Rp${(145 + (idx % 5) * 35).toLocaleString('id-ID')}.000`,
          notes: `Pengerjaan servis berkala dan pengecekan injeksi PGM-FI unit ${models.model}.`,
          kpbStatus: 'Reguler Berbayar' as const
        }
      ],
      interactions: [
        {
          id: `INT-AUTO-0${custNum}`,
          date: `${15 + (idx % 14)} Ags 2026`,
          channel: 'WhatsApp Mobile Apps' as const,
          subject: 'Reminder Servis & Promo Dealer',
          sentiment: 'Positif' as const,
          agent: 'Customer Care Dealer',
          outcome: 'Pelanggan menerima informasi promo voucher servis.'
        }
      ],
      campaigns: [
        {
          id: `CMP-AUTO-0${custNum}`,
          campaignName: 'Satu Hati Service Fest Jawa Tengah',
          channel: 'WhatsApp' as const,
          sentDate: '01 Agu 2026',
          status: 'Dibuka & Klik' as const,
          incentive: 'Voucher Diskon Jasa 20%'
        }
      ],
      complaints: idx % 5 === 0 ? [
        {
          id: `CMPL-AUTO-0${custNum}`,
          ticketNo: `TKT-JTG-${260000 + custNum}`,
          date: '10 Agu 2026',
          category: 'Waktu Tunggu Dealer' as const,
          status: 'Dalam Penanganan' as const,
          description: 'Waktu tunggu servis pada jam sibuk hari Sabtu melebihi 30 menit.',
          resolution: 'Penjadwalan ulang melalui jalur booking Mobile Apps Fast Track.'
        }
      ] : [],
      locationAccess: {
        addressMasked: `Jl. Utama ${areas.area} No. ***`,
        district: areas.area,
        regency: areas.kab,
        nearestAhass: `Dealer ${areas.dealer} (${areas.dist} km)`,
        distanceKm: areas.dist,
        travelTimeMin: Math.round(areas.dist * 2.8),
        alternateAhass: `Dealer Regional ${areas.kab} (6,5 km)`,
        alternateDistanceKm: 6.5
      },
      nextBestAction: {
        title: isHighRisk
          ? `Hubungi Pemilik ${models.model} dengan Voucher Servis & Gratis Antrean Pit Express`
          : `Kirimkan Notifikasi Promo Perawatan ${models.model} via Mobile Apps`,
        reason: isHighRisk
          ? `Unit ${models.model} sudah melewati jadwal servis rutin di ${areas.kab}. Potensi churn dapat dimitigasi dengan voucher servis.`
          : `Pelanggan memiliki kepuasan baik terhadap Dealer ${areas.dealer}. Tawarkan penukaran poin Mobile Apps.`,
        recommendedChannel: isHighRisk ? 'WhatsApp' : 'Mobile Push',
        recommendedTiming: 'Rabu, 10.30 WIB',
        approvalStatus: (isHighRisk ? 'Perlu persetujuan' : 'Disetujui') as 'Perlu persetujuan' | 'Disetujui' | 'Draft',
        expectedConversionRate: `${45 + (idx % 20)}%`
      }
    };
  })
];

export const DEFAULT_HONDA_CUSTOMER = HONDA_CUSTOMERS[0];
