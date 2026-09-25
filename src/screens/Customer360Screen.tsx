import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle,
  MessageSquare,
  Clock,
  MapPin,
  TrendingDown,
  ArrowRight,
  Sparkles,
  FileText,
  Lock,
  Bike,
  Wrench,
  Tag,
  ShieldCheck,
  Gauge,
  ShoppingBag,
  CheckCircle2,
  Navigation,
  Info,
  Download,
  Upload,
  FileSpreadsheet,
  Table as TableIcon,
  LayoutGrid,
  ChevronDown,
  Plus
} from 'lucide-react';
import { HONDA_CUSTOMERS } from '../data/hondaCustomers';
import { ScreenId, CustomerProfile } from '../types';
import {
  exportToExcel,
  exportToCsv,
  formatCustomersForExport,
  mapImportedRowToCustomer,
  TEMPLATES
} from '../utils/exportImportUtils';
import { DataImportModal } from '../components/common/DataImportModal';

interface Customer360ScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onOpenAgentModal: (prompt?: string) => void;
  onShowToast: (msg: string) => void;
}

export const Customer360Screen: React.FC<Customer360ScreenProps> = ({
  onNavigateToScreen,
  onOpenAgentModal,
  onShowToast
}) => {
  const [customersList, setCustomersList] = useState<CustomerProfile[]>(HONDA_CUSTOMERS);
  const [activeTab, setActiveTab] = useState<
    'ringkasan' | 'produk' | 'layanan' | 'interaksi' | 'keluhan' | 'lokasi' | 'rekomendasi'
  >('ringkasan');
  const [viewMode, setViewMode] = useState<'profile360' | 'tableGrid'>('profile360');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'AT_RISK' | 'LOYAL' | 'MATIC' | 'SPORT_BEBEK_EV'>('ALL');
  const [customer, setCustomer] = useState<CustomerProfile>(HONDA_CUSTOMERS[0]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customersList.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !searchQuery ||
        c.maskedId.toLowerCase().includes(q) ||
        c.maskedName.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q) ||
        c.kabupaten.toLowerCase().includes(q) ||
        (c.vehicle?.model && c.vehicle.model.toLowerCase().includes(q));

      if (!matchSearch) return false;

      if (selectedFilter === 'AT_RISK') return c.riskCategory === 'Tinggi';
      if (selectedFilter === 'LOYAL') return c.riskCategory === 'Rendah';
      if (selectedFilter === 'MATIC') {
        const model = c.vehicle?.model.toLowerCase() || '';
        return (
          model.includes('vario') ||
          model.includes('beat') ||
          model.includes('scoopy') ||
          model.includes('pcx') ||
          model.includes('stylo') ||
          model.includes('adv') ||
          model.includes('genio')
        );
      }
      if (selectedFilter === 'SPORT_BEBEK_EV') {
        const model = c.vehicle?.model.toLowerCase() || '';
        return (
          model.includes('cb') ||
          model.includes('cbr') ||
          model.includes('crf') ||
          model.includes('supra') ||
          model.includes('revo') ||
          model.includes('em1')
        );
      }

      return true;
    });
  }, [customersList, searchQuery, selectedFilter]);

  const handlePrepareAction = () => {
    onShowToast(`Aktivitas untuk ${customer.maskedName} (${customer.vehicle?.model || 'Unit Honda'}) disiapkan ke Campaign & Omnichannel.`);
    onNavigateToScreen('campaign-omnichannel');
  };

  // Export handlers
  const handleExportExcel = () => {
    try {
      const flatData = formatCustomersForExport(customersList);
      exportToExcel(flatData, `Data_Pelanggan_Honda_360_Jateng_${new Date().toISOString().slice(0, 10)}`, 'Pelanggan 360');
      onShowToast(`Berhasil mengekspor ${flatData.length} data pelanggan ke format Excel (.xlsx)!`);
      setIsDownloadDropdownOpen(false);
    } catch (err: any) {
      onShowToast('Gagal mengekspor data ke Excel.');
    }
  };

  const handleExportCsv = () => {
    try {
      const flatData = formatCustomersForExport(customersList);
      exportToCsv(flatData, `Data_Pelanggan_Honda_360_Jateng_${new Date().toISOString().slice(0, 10)}`);
      onShowToast(`Berhasil mengekspor ${flatData.length} data pelanggan ke format CSV!`);
      setIsDownloadDropdownOpen(false);
    } catch (err: any) {
      onShowToast('Gagal mengekspor data ke CSV.');
    }
  };

  const handleDownloadTemplate = (format: 'xlsx' | 'csv') => {
    if (format === 'xlsx') {
      exportToExcel(TEMPLATES.customer, 'Template_Impor_Pelanggan_Honda', 'Template');
    } else {
      exportToCsv(TEMPLATES.customer, 'Template_Impor_Pelanggan_Honda');
    }
    onShowToast(`Template format impor pelanggan (.${format}) berhasil diunduh.`);
    setIsDownloadDropdownOpen(false);
  };

  // Import handler
  const handleDataImported = (importedRows: any[], mode: 'append' | 'replace') => {
    try {
      const newCustomers: CustomerProfile[] = importedRows.map((r, i) =>
        mapImportedRowToCustomer(r, mode === 'append' ? customersList.length + i : i)
      );

      if (mode === 'replace') {
        setCustomersList(newCustomers);
        if (newCustomers.length > 0) setCustomer(newCustomers[0]);
        onShowToast(`Berhasil mengganti data dengan ${newCustomers.length} pelanggan baru dari file.`);
      } else {
        setCustomersList((prev) => [...prev, ...newCustomers]);
        if (newCustomers.length > 0) setCustomer(newCustomers[0]);
        onShowToast(`Berhasil menambahkan ${newCustomers.length} pelanggan baru (Total: ${customersList.length + newCustomers.length}).`);
      }
    } catch (err) {
      onShowToast('Terjadi kesalahan saat memproses data yang diimpor.');
    }
  };

  const v = customer.vehicle;
  const loc = customer.locationAccess;

  return (
    <div className="space-y-5">
      {/* Header with Honda Context Banner & Export/Import Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
              Pelanggan 360 · Penjualan &amp; After Sales Honda
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 font-semibold border border-red-200 flex items-center gap-1">
              <Bike className="w-3.5 h-3.5 text-red-600" />
              <span>Dealer Honda Motor · Dealer Jateng</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-[#15324B] font-semibold border border-slate-300 flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#607080]" />
              <span>{customersList.length} Pelanggan Terenkripsi PDP</span>
            </span>
          </div>
          <p className="text-xs text-[#607080]">
            Profil identitas aman 360°, unit motor Honda, riwayat perawatan berkala di Dealer, interaksi Mobile Apps, dan rekomendasi Next Best Action.
          </p>
        </div>

        {/* Action Buttons: Import, Export, AI Agent, SHAP */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* View Toggle */}
          <div className="flex items-center bg-white border border-[#DDE3EA] rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={() => setViewMode('profile360')}
              title="Tampilan Profil 360°"
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'profile360' ? 'bg-[#2563EB] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kartu 360°</span>
            </button>
            <button
              onClick={() => setViewMode('tableGrid')}
              title="Tampilan Tabel Data"
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'tableGrid' ? 'bg-[#2563EB] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tabel Data</span>
            </button>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3 py-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>Upload Data (CSV / Excel)</span>
          </button>

          {/* Download Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDownloadDropdownOpen((prev) => !prev)}
              className="px-3 py-2 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Download ({customersList.length})</span>
              <ChevronDown className="w-3 h-3 text-emerald-700" />
            </button>

            {isDownloadDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsDownloadDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Format Ekspor Pelanggan
                  </div>
                  <button
                    onClick={handleExportExcel}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">Unduh Format Excel (.xlsx)</div>
                      <div className="text-[10px] text-slate-500">Lengkap dengan kolom Dealer &amp; Sales</div>
                    </div>
                  </button>
                  <button
                    onClick={handleExportCsv}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">Unduh Format CSV (.csv)</div>
                      <div className="text-[10px] text-slate-500">Standar UTF-8 universal</div>
                    </div>
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Template Impor
                  </div>
                  <button
                    onClick={() => handleDownloadTemplate('xlsx')}
                    className="w-full px-3 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-600 text-[11px] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Template Excel (.xlsx)</span>
                  </button>
                  <button
                    onClick={() => handleDownloadTemplate('csv')}
                    className="w-full px-3 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-600 text-[11px] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Template CSV (.csv)</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() =>
              onOpenAgentModal(
                `Analisis profil pelanggan Honda ${customer.maskedName} (${customer.maskedId}) dengan unit ${
                  customer.vehicle?.model || 'Honda'
                }. Apa rekomendasi retensi after sales terbaik di Dealer?`
              )
            }
            className="px-3 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tanya SERVEON AI</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: TABLE GRID VIEW (When user clicks "Tabel Data") */}
      {viewMode === 'tableGrid' && (
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-3 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <TableIcon className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800">
                Tabel Seluruh Data Pelanggan Honda Jawa Tengah ({filteredCustomers.length} dari {customersList.length})
              </h2>
            </div>

            {/* Quick Filters inside Table */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#607080] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari ID, Nama, Model, Plat, Kota..."
                  className="bg-[#F5F7FA] border border-[#DDE3EA] text-xs text-[#17212B] rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-blue-500 w-56 placeholder:text-slate-400"
                />
              </div>

              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as any)}
                className="bg-[#F5F7FA] border border-[#DDE3EA] text-xs text-[#17212B] rounded-lg px-2.5 py-1.5 outline-none"
              >
                <option value="ALL">Semua Segmen ({customersList.length})</option>
                <option value="AT_RISK">Risiko Tinggi (&gt;70)</option>
                <option value="LOYAL">Pelanggan Loyal</option>
                <option value="MATIC">Tipe Matic</option>
                <option value="SPORT_BEBEK_EV">Tipe Sport / Bebek / EV</option>
              </select>

              <button
                onClick={() => setIsImportModalOpen(true)}
                className="px-2.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah / Upload</span>
              </button>
            </div>
          </div>

          {/* Full Grid Table */}
          <div className="border border-slate-200 rounded-xl overflow-x-auto max-h-[580px] scrollbar-thin">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-slate-700 font-bold border-b border-slate-200 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">ID Pelanggan</th>
                  <th className="p-3">Nama (Masked)</th>
                  <th className="p-3">Unit Motor Honda</th>
                  <th className="p-3">Nomor Plat</th>
                  <th className="p-3">Kabupaten / Kota</th>
                  <th className="p-3 text-right">Odometer</th>
                  <th className="p-3 text-center">Status KPB</th>
                  <th className="p-3 text-center">Risiko Churn</th>
                  <th className="p-3">Rekomendasi AI (Next Best Action)</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-400">
                      Tidak ada data pelanggan yang sesuai dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((c) => {
                    const isSelected = c.id === customer.id;
                    const isHighRisk = c.retentionRiskScore > 70;
                    return (
                      <tr
                        key={c.id}
                        className={`hover:bg-blue-50/50 transition-colors ${
                          isSelected ? 'bg-blue-50/80 font-medium' : ''
                        }`}
                      >
                        <td className="p-3 font-mono font-bold text-slate-700 whitespace-nowrap">{c.maskedId}</td>
                        <td className="p-3 text-slate-900 font-semibold whitespace-nowrap">{c.maskedName}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="font-bold text-red-700 flex items-center gap-1">
                            <Bike className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            {c.vehicle?.model || '-'}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-600 whitespace-nowrap">{c.vehicle?.plateNumberMasked || '-'}</td>
                        <td className="p-3 text-slate-700 whitespace-nowrap">
                          {c.area}, {c.kabupaten}
                        </td>
                        <td className="p-3 text-right font-mono text-slate-800 whitespace-nowrap">
                          {c.vehicle?.odometerKm.toLocaleString('id-ID')} KM
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                            {c.vehicle?.kpbStatus || '-'}
                          </span>
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isHighRisk
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {c.retentionRiskScore} ({c.riskCategory})
                          </span>
                        </td>
                        <td className="p-3 max-w-xs truncate text-slate-600" title={c.nextBestAction.title}>
                          {c.nextBestAction.title}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              setCustomer(c);
                              setViewMode('profile360');
                            }}
                            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold cursor-pointer"
                          >
                            Buka 360°
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
            <span>
              Menampilkan <strong>{filteredCustomers.length}</strong> pelanggan. Data tersinkronisasi dengan kepatuhan PDP.
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportExcel}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ekspor Tabel Ini</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: 3-COLUMN 360 PROFILE VIEW */}
      {viewMode === 'profile360' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Customer Selector with Quick Import/Export buttons (3 cols) */}
          <div className="lg:col-span-3 bg-white border border-[#DDE3EA] rounded-xl p-3 flex flex-col h-[680px]">
            {/* Search Box */}
            <div className="relative mb-2.5">
              <Search className="w-3.5 h-3.5 text-[#607080] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ID, Nama, Model, Kota..."
                className="w-full bg-[#F5F7FA] border border-[#DDE3EA] focus:border-[#2563EB] text-xs text-[#17212B] rounded-lg pl-8 pr-3 py-1.5 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Quick Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2 scrollbar-none text-[10px]">
              <button
                onClick={() => setSelectedFilter('ALL')}
                className={`px-2 py-0.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === 'ALL'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-100 text-[#607080] hover:bg-slate-200'
                }`}
              >
                Semua ({customersList.length})
              </button>
              <button
                onClick={() => setSelectedFilter('AT_RISK')}
                className={`px-2 py-0.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === 'AT_RISK'
                    ? 'bg-rose-600 text-white font-bold'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Risiko Tinggi
              </button>
              <button
                onClick={() => setSelectedFilter('LOYAL')}
                className={`px-2 py-0.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === 'LOYAL'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Loyal
              </button>
              <button
                onClick={() => setSelectedFilter('MATIC')}
                className={`px-2 py-0.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === 'MATIC'
                    ? 'bg-slate-800 text-white font-bold'
                    : 'bg-slate-100 text-[#607080] hover:bg-slate-200'
                }`}
              >
                Matic
              </button>
              <button
                onClick={() => setSelectedFilter('SPORT_BEBEK_EV')}
                className={`px-2 py-0.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === 'SPORT_BEBEK_EV'
                    ? 'bg-slate-800 text-white font-bold'
                    : 'bg-slate-100 text-[#607080] hover:bg-slate-200'
                }`}
              >
                Sport/EV
              </button>
            </div>

            {/* List Header with count & Quick Upload link */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#607080] mb-2 px-1">
              <span>DAFTAR PELANGGAN ({filteredCustomers.length})</span>
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer font-bold"
              >
                <Plus className="w-3 h-3" />
                <span>Upload</span>
              </button>
            </div>

            {/* Scrollable Customer List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {filteredCustomers.length === 0 ? (
                <div className="p-4 text-center text-slate-400 text-xs">
                  Tidak ada pelanggan yang cocok dengan filter pencarian.
                </div>
              ) : (
                filteredCustomers.map((c) => {
                  const isSelected = c.id === customer.id;
                  const isHighRisk = c.retentionRiskScore > 70;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setCustomer(c)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50/70 shadow-xs ring-1 ring-blue-400'
                          : 'border-[#DDE3EA] bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-[#17212B]">
                        <div className="flex items-center gap-1.5 truncate">
                          <span>{c.maskedName}</span>
                          {c.vehicle?.model.includes('EM1') && (
                            <span className="px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                              EV
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#607080] font-mono shrink-0">{c.maskedId}</span>
                      </div>

                      {/* Honda Motorcycle Model & Plate */}
                      <div className="flex items-center gap-1 text-[11px] text-blue-700 font-medium mt-0.5 truncate">
                        <Bike className="w-3 h-3 text-red-600 shrink-0" />
                        <span className="truncate">{c.vehicle?.model || 'Unit Honda'}</span>
                        <span className="text-slate-400 text-[10px]">
                          ({c.vehicle?.plateNumberMasked || 'Jateng'})
                        </span>
                      </div>

                      <div className="mt-1.5 flex items-center justify-between text-[10px]">
                        <span className="text-[#607080] truncate max-w-[120px]">
                          {c.area}, {c.kabupaten}
                        </span>
                        <span
                          className={`font-semibold px-1.5 py-0.2 rounded shrink-0 ${
                            isHighRisk
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          Risk: {c.retentionRiskScore}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-2.5 border-t border-[#DDE3EA] text-[10px] text-[#607080] flex items-center justify-between">
              <span>Sistem CRM Dealer</span>
              <span className="text-emerald-700 font-medium">{customersList.length} Records Aktif</span>
            </div>
          </div>

          {/* Center Column: Main Customer Profile with 7 Tabs (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-[#DDE3EA] rounded-xl flex flex-col h-[680px] overflow-hidden">
            {/* Top Identity & Honda Unit Summary Header */}
            <div className="p-4 border-b border-[#DDE3EA] bg-slate-50/70">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-red-100">
                    <Bike className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base font-bold text-[#17212B]">{customer.maskedName}</h2>
                      <span className="font-mono text-xs text-[#607080] bg-white border border-slate-200 px-2 py-0.5 rounded">
                        {customer.maskedId}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold border border-red-200">
                        {v?.plateNumberMasked || 'Plat Jateng'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#607080] mt-0.5 flex-wrap">
                      <span className="text-red-600 font-bold flex items-center gap-1">
                        {v?.model} ({v?.year})
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-[#17212B]">
                        <MapPin className="w-3 h-3 text-[#2563EB]" />
                        {customer.area}, {customer.kabupaten}
                      </span>
                      <span>·</span>
                      <span>Tenur: {customer.tenureMonths} Bln</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 border ${
                      customer.riskCategory === 'Tinggi'
                        ? 'bg-rose-50 border-rose-200 text-rose-700'
                        : customer.riskCategory === 'Rendah'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{customer.segment}</span>
                  </span>
                </div>
              </div>

              {/* Sub-strip with vehicle tech details */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
                <span className="flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-blue-600" />
                  <span>
                    Odometer: <strong className="text-slate-800 font-mono">{v?.odometerKm.toLocaleString('id-ID')} KM</strong>
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    KPB: <strong className="text-slate-800">{v?.kpbStatus}</strong>
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    Pembelian: <strong className="text-slate-800">{v?.purchaseType}</strong>
                  </span>
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-4 border-b border-[#DDE3EA] bg-[#F5F7FA] text-xs divide-x divide-[#DDE3EA]">
              <div className="p-2 text-center">
                <div className="text-[10px] text-[#607080]">Nilai Pelanggan</div>
                <div className="text-sm font-bold text-[#2563EB] tabular-nums mt-0.5">
                  {customer.customerValueScore} / 100
                </div>
              </div>

              <div className="p-2 text-center">
                <div className="text-[10px] text-[#607080]">Risiko Churn</div>
                <div
                  className={`text-sm font-bold tabular-nums mt-0.5 ${
                    customer.retentionRiskScore > 70 ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  {customer.retentionRiskScore} ({customer.riskCategory})
                </div>
              </div>

              <div className="p-2 text-center">
                <div className="text-[10px] text-[#607080]">Kanal Preferensi</div>
                <div className="text-sm font-semibold text-[#17212B] mt-0.5 truncate">{customer.preferredChannel}</div>
              </div>

              <div className="p-2 text-center">
                <div className="text-[10px] text-[#607080]">Izin Kontak (Consent)</div>
                <div className="text-sm font-semibold text-emerald-700 mt-0.5 flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{customer.consentStatus}</span>
                </div>
              </div>
            </div>

            {/* 7 Tabs Navigation Bar */}
            <div className="flex border-b border-[#DDE3EA] px-3 overflow-x-auto text-xs font-medium text-[#607080] scrollbar-none bg-white">
              {[
                { id: 'ringkasan', label: 'Ringkasan' },
                { id: 'produk', label: 'Unit Motor & Transaksi' },
                { id: 'layanan', label: 'Riwayat Servis Dealer' },
                { id: 'interaksi', label: 'Interaksi & Campaign' },
                { id: 'keluhan', label: 'Keluhan Pelanggan' },
                { id: 'lokasi', label: 'Lokasi & Dealer Terdekat' },
                { id: 'rekomendasi', label: 'Rekomendasi AI' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600 font-bold bg-red-50/30'
                      : 'border-transparent hover:text-[#17212B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Body */}
            <div className="flex-1 overflow-y-auto p-4 text-xs space-y-4">
              {/* TAB 1: RINGKASAN */}
              {activeTab === 'ringkasan' && (
                <div className="space-y-4">
                  {/* Behavioral Alert / Sinyal Risiko */}
                  {customer.behavioralAlert && (
                    <div
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                        customer.retentionRiskScore > 70
                          ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                          : 'bg-blue-50/80 border-blue-200 text-blue-900'
                      }`}
                    >
                      <TrendingDown
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          customer.retentionRiskScore > 70 ? 'text-rose-600' : 'text-blue-600'
                        }`}
                      />
                      <div>
                        <strong className="font-semibold">Sinyal Perilaku Pelanggan:</strong> {customer.behavioralAlert}
                      </div>
                    </div>
                  )}

                  {/* Ringkasan Kendaraan Honda Aktif */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                        <Bike className="w-4 h-4 text-red-600" />
                        Detail Kendaraan Honda
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {v?.warrantyStatus}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tipe &amp; Model</span>
                        <strong className="text-slate-800">{v?.model}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Warna Unit</span>
                        <span className="text-slate-700 font-medium">{v?.color}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Mesin / Kapasitas</span>
                        <span className="text-slate-700 font-medium">{v?.engineCapacity}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Nomor Rangka (VIN)</span>
                        <span className="text-slate-700 font-mono">{v?.vinMasked}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Dealer Pembelian</span>
                        <span className="text-slate-700 font-medium">{v?.dealerPurchase}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tanggal Pembelian</span>
                        <span className="text-slate-700 font-medium">{v?.purchaseDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Terpadu */}
                  <div>
                    <h4 className="font-bold text-xs text-[#17212B] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      Lini Masa Terpadu (Layanan Dealer &amp; Interaksi)
                    </h4>

                    <div className="relative pl-5 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE3EA]">
                      {/* Layanan Servis Terakhir */}
                      {customer.serviceHistory && customer.serviceHistory[0] && (
                        <div className="relative">
                          <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-red-600 ring-4 ring-white" />
                          <div className="p-2.5 rounded-lg border border-[#DDE3EA] bg-white">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="font-semibold text-slate-800">
                                Servis Dealer: {customer.serviceHistory[0].serviceType}
                              </span>
                              <span className="text-slate-500 tabular-nums">{customer.serviceHistory[0].date}</span>
                            </div>
                            <p className="text-[11px] text-slate-600">{customer.serviceHistory[0].notes}</p>
                            <div className="mt-1.5 flex items-center gap-2 text-[10px]">
                              <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded font-medium">
                                {customer.serviceHistory[0].ahassName}
                              </span>
                              <span className="text-slate-500">
                                Mekanik: {customer.serviceHistory[0].mechanicName}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Interaksi Terakhir */}
                      {customer.interactions && customer.interactions[0] && (
                        <div className="relative">
                          <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                          <div className="p-2.5 rounded-lg border border-[#DDE3EA] bg-white">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="font-semibold text-slate-800">{customer.interactions[0].subject}</span>
                              <span className="text-slate-500 tabular-nums">{customer.interactions[0].date}</span>
                            </div>
                            <p className="text-[11px] text-slate-600">{customer.interactions[0].outcome}</p>
                            <span className="inline-block mt-1 text-[10px] font-medium bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded">
                              {customer.interactions[0].channel}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Transaksi Terakhir */}
                      {customer.transactions && customer.transactions[0] && (
                        <div className="relative">
                          <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-white" />
                          <div className="p-2.5 rounded-lg border border-[#DDE3EA] bg-white">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="font-semibold text-slate-800">
                                {customer.transactions[0].description}
                              </span>
                              <span className="text-emerald-700 font-bold font-mono">
                                {customer.transactions[0].amount}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500">
                              {customer.transactions[0].outlet} · {customer.transactions[0].date}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: UNIT MOTOR & TRANSAKSI */}
              {activeTab === 'produk' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-red-900 flex items-center gap-1.5">
                        <Bike className="w-4 h-4 text-red-600" />
                        Unit Motor Honda Utama
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white">
                        {v?.plateNumberMasked}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                      <div>
                        <span className="text-slate-500 text-[10px]">Model Unit:</span>
                        <div className="font-bold text-slate-800">{v?.model}</div>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px]">Tahun Perakitan:</span>
                        <div className="font-semibold text-slate-800">{v?.year}</div>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px]">Metode Pembelian:</span>
                        <div className="font-semibold text-slate-800">{v?.purchaseType}</div>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px]">Odometer Terakhir:</span>
                        <div className="font-semibold text-blue-700 font-mono">
                          {v?.odometerKm.toLocaleString('id-ID')} KM
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px]">Status KPB:</span>
                        <div className="font-semibold text-emerald-700">{v?.kpbStatus}</div>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px]">Garansi Pabrikan:</span>
                        <div className="font-semibold text-slate-800">{v?.warrantyStatus}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                      Riwayat Transaksi Penjualan &amp; Suku Cadang HGP
                    </h4>
                    <div className="space-y-2">
                      {customer.transactions && customer.transactions.length > 0 ? (
                        customer.transactions.map((t) => (
                          <div
                            key={t.id}
                            className="p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-center justify-between"
                          >
                            <div>
                              <div className="font-bold text-xs text-slate-800">{t.description}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {t.outlet} · <span className="text-slate-600 font-medium">{t.date}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-xs text-slate-800 font-mono">{t.amount}</div>
                              <span
                                className={`inline-block px-1.5 py-0.2 rounded text-[9.5px] font-semibold mt-0.5 ${
                                  t.status === 'Lunas' || t.status === 'Selesai'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-blue-50 text-blue-700'
                                }`}
                              >
                                {t.status}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-slate-400 text-xs">Belum ada catatan transaksi tambahan.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: RIWAYAT SERVIS DEALER */}
              {activeTab === 'layanan' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-red-600" />
                      Buku Servis Elektronik (e-KPB &amp; Servis Berkala Dealer)
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Total: {customer.serviceHistory?.length || 0} Riwayat Pengerjaan
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {customer.serviceHistory && customer.serviceHistory.length > 0 ? (
                      customer.serviceHistory.map((s) => (
                        <div key={s.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                              <span>{s.serviceType}</span>
                              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px] font-mono">
                                {s.odometerKm.toLocaleString('id-ID')} KM
                              </span>
                            </div>
                            <span className="text-slate-500 text-[11px]">{s.date}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <strong>Catatan Mekanik:</strong> {s.notes}
                          </p>
                          <div className="flex items-center justify-between text-[11px] pt-1">
                            <span className="text-slate-500">
                              Bengkel: <strong className="text-slate-700">{s.ahassName}</strong> (Mekanik:{' '}
                              {s.mechanicName})
                            </span>
                            <span className="font-bold text-emerald-700 font-mono">
                              {s.cost} ({s.kpbStatus})
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-slate-400 text-xs">
                        Belum ada riwayat servis Dealer tercatat.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: INTERAKSI & CAMPAIGN */}
              {activeTab === 'interaksi' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      Interaksi Omnichannel (Mobile Apps / CS / Telepon)
                    </h4>
                    <div className="space-y-2">
                      {customer.interactions && customer.interactions.length > 0 ? (
                        customer.interactions.map((i) => (
                          <div key={i.id} className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-slate-800">{i.subject}</span>
                              <span className="text-slate-500 text-[10px]">{i.date}</span>
                            </div>
                            <p className="text-[11px] text-slate-600">{i.outcome}</p>
                            <div className="flex items-center justify-between text-[10px] pt-1">
                              <span className="text-slate-500">
                                Kanal: <strong className="text-blue-700">{i.channel}</strong> · Petugas: {i.agent}
                              </span>
                              <span
                                className={`px-1.5 py-0.2 rounded font-semibold ${
                                  i.sentiment === 'Positif'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : i.sentiment === 'Negatif'
                                    ? 'bg-rose-50 text-rose-700'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                Sentimen: {i.sentiment}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-slate-400 text-xs">Belum ada catatan interaksi.</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-teal-600" />
                      Riwayat Kampanye &amp; Promosi Yang Diterima
                    </h4>
                    <div className="space-y-2">
                      {customer.campaigns && customer.campaigns.length > 0 ? (
                        customer.campaigns.map((c) => (
                          <div
                            key={c.id}
                            className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between"
                          >
                            <div>
                              <div className="font-bold text-xs text-slate-800">{c.campaignName}</div>
                              <div className="text-[10.5px] text-slate-500 mt-0.5">
                                Kanal: {c.channel} · Dikirim: {c.sentDate} · Insentif:{' '}
                                <span className="text-teal-700 font-medium">{c.incentive}</span>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                c.status === 'Dikonversi'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : c.status === 'Dibuka & Klik'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {c.status}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-slate-400 text-xs">Belum ada kampanye terkirim.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: KELUHAN PELANGGAN */}
              {activeTab === 'keluhan' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                      Tiket Keluhan Pelanggan (Customer Care Dealer Honda)
                    </h4>
                    <span className="text-[10.5px] text-slate-500">
                      Status Umum:{' '}
                      <strong
                        className={customer.complaintStatus === 'Dalam Proses' ? 'text-amber-600' : 'text-emerald-700'}
                      >
                        {customer.complaintStatus}
                      </strong>
                    </span>
                  </div>

                  {customer.complaints && customer.complaints.length > 0 ? (
                    customer.complaints.map((comp) => (
                      <div key={comp.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-800">{comp.category}</span>
                            <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">
                              {comp.ticketNo}
                            </span>
                          </div>
                          <span className="text-slate-500 text-[10px]">{comp.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-relaxed bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
                          <strong>Keluhan:</strong> {comp.description}
                        </p>
                        <div className="text-[11px] text-slate-600 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-200/50">
                          <strong className="text-emerald-800">Resolusi / Solusi:</strong> {comp.resolution}
                        </div>
                        <div className="flex justify-end pt-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              comp.status === 'Selesai'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            Status: {comp.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 space-y-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                      <div className="font-bold text-xs text-slate-700">Tidak Ada Keluhan Aktif</div>
                      <p className="text-[11px]">
                        Pelanggan memiliki catatan kepuasan baik tanpa tiket eskalasi purna jual.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: LOKASI & AKSES KE DEALER */}
              {activeTab === 'lokasi' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-blue-950 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        Aksesibilitas Geospasial Pelanggan ke Jaringan Dealer
                      </span>
                      <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                        Wilayah {customer.kabupaten}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-700 space-y-1">
                      <div>
                        Alamat Tersamar: <strong>{loc?.addressMasked || `${customer.area}, ${customer.kabupaten}`}</strong>
                      </div>
                      <div>
                        Kecamatan/Area: <strong>{customer.area}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Bengkel Resmi Dealer Terdekat
                      </div>
                      <div className="font-bold text-xs text-slate-800">{loc?.nearestAhass || 'Dealer Pusat'}</div>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-slate-500">Jarak Tempuh:</span>
                        <span
                          className={`font-bold font-mono ${
                            customer.nearestServicePointKm > 6 ? 'text-rose-600' : 'text-emerald-700'
                          }`}
                        >
                          {customer.nearestServicePointKm} KM{' '}
                          {customer.nearestServicePointKm > 6 ? '(Celah Layanan)' : '(Ideal)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Estimasi Waktu:</span>
                        <span className="font-semibold text-slate-800 font-mono">±{loc?.travelTimeMin || 15} Menit</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Dealer Alternatif Terdekat
                      </div>
                      <div className="font-bold text-xs text-slate-800">{loc?.alternateAhass || 'Dealer Satelit'}</div>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-slate-500">Jarak Tempuh:</span>
                        <span className="font-bold font-mono text-slate-700">{loc?.alternateDistanceKm || 6.5} KM</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Status Cadangan:</span>
                        <span className="text-blue-700 font-semibold text-[10.5px]">Tersedia Fast Track</span>
                      </div>
                    </div>
                  </div>

                  {customer.nearestServicePointKm > 6 && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Rekomendasi Spasial:</strong> Jarak pelanggan ke Dealer terdekat melebihi batas
                        kenyamanan (6 km). Tawarkan layanan <em>Service Kunjung Dealer</em> atau fasilitas{' '}
                        <em>Pit Express Tanpa Antre</em> untuk mencegah perpindahan ke bengkel non-resmi.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: REKOMENDASI (NEXT BEST ACTION) */}
              {activeTab === 'rekomendasi' && (
                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        Preskripsi AI: Next Best Action
                      </span>
                      <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
                        Konversi Est: {customer.nextBestAction.expectedConversionRate}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug">{customer.nextBestAction.title}</h3>

                    <p className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3 rounded-lg border border-blue-100">
                      {customer.nextBestAction.reason}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="bg-white/60 p-2 rounded border border-blue-100">
                        <span className="text-slate-400 block text-[10px]">Kanal Rekomendasi:</span>
                        <strong className="text-slate-800">{customer.nextBestAction.recommendedChannel}</strong>
                      </div>
                      <div className="bg-white/60 p-2 rounded border border-blue-100">
                        <span className="text-slate-400 block text-[10px]">Waktu Pengiriman Terbaik:</span>
                        <strong className="text-slate-800">{customer.nextBestAction.recommendedTiming}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrepareAction}
                      className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <span>Luncurkan Kampanye untuk Pelanggan Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigateToScreen('explainability')}
                      className="py-2.5 px-3 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Audit SHAP</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Next Best Action & Spatial Prescriptive Panel (3 cols) */}
          <div className="lg:col-span-3 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between h-[680px]">
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-[#DDE3EA]">
                <div className="p-1.5 rounded-lg bg-red-50 text-red-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#17212B]">Tindakan AI Terpilih</h3>
                  <span className="text-[10px] text-emerald-700 font-medium">Model Preskriptif Dealer v1.3</span>
                </div>
              </div>

              {/* Prescriptive Recommendation Card */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50/80 via-white to-teal-50/60 border border-blue-200 space-y-2">
                <div className="font-bold text-xs text-blue-900 leading-snug">{customer.nextBestAction.title}</div>

                <p className="text-[11px] text-slate-700 leading-relaxed">{customer.nextBestAction.reason}</p>

                <div className="pt-2 border-t border-blue-200/60 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#607080]">Kanal Kontak:</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-teal-600" />
                      {customer.nextBestAction.recommendedChannel}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#607080]">Waktu Optimal:</span>
                    <span className="font-bold text-[#17212B]">{customer.nextBestAction.recommendedTiming}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#607080]">Potensi Konversi:</span>
                    <span className="font-bold text-emerald-700">{customer.nextBestAction.expectedConversionRate}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#607080]">Persetujuan:</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-semibold text-[10px] border border-amber-200">
                      {customer.nextBestAction.approvalStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Geographic & Service Point Proximity */}
              <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA] space-y-1.5 text-xs">
                <div className="text-[11px] font-semibold text-[#607080] flex items-center justify-between">
                  <span>Jangkauan Jaringan Dealer</span>
                  <Navigation className="w-3 h-3 text-blue-600" />
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#607080]">Bengkel Terdekat:</span>
                  <span className="font-bold text-[#17212B] truncate max-w-[130px] text-right">
                    {loc?.nearestAhass || 'Dealer Terdekat'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#607080]">Jarak Tempuh:</span>
                  <span
                    className={`font-bold tabular-nums ${
                      customer.nearestServicePointKm > 6 ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {customer.nearestServicePointKm} km {customer.nearestServicePointKm > 6 ? '(Celah Layanan)' : ''}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#607080]">Unit Motor:</span>
                  <span className="font-bold text-red-600 truncate max-w-[130px]">{v?.model}</span>
                </div>
              </div>

              {/* PDP & Security Badge */}
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-[10px] text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Data disamarkan otomatis sesuai UU PDP &amp; standar Dealer Honda Motor.</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-3 border-t border-[#DDE3EA] space-y-2">
              <button
                onClick={handlePrepareAction}
                className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Siapkan Aktivitas Kampanye</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() =>
                  onOpenAgentModal(
                    `Tolong berikan strategi promosi after-sales dan retention khusus untuk pelanggan Honda bernama ${
                      customer.maskedName
                    } pemilik ${customer.vehicle?.model || 'motor Honda'} di ${customer.kabupaten}.`
                  )
                }
                className="w-full py-2 px-3 border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Analisis dengan AI Agent</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reusable Data Import Modal for Customer */}
      <DataImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Unggah Data Pelanggan (Excel / CSV)"
        subtitle="Tambahkan atau perbarui data profil pelanggan Honda, riwayat servis Dealer, dan kepemilikan unit"
        templateType="customer"
        onDataImported={handleDataImported}
        onShowToast={onShowToast}
      />
    </div>
  );
};
