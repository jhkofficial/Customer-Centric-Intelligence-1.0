import React, { useState } from 'react';
import { Filter, RotateCcw, Check, ChevronDown } from 'lucide-react';
import { REGENCIES_DATA } from '../../data/mockData';

interface ContextFilterBarProps {
  selectedRegency: string;
  onSelectRegency: (regency: string) => void;
  selectedSegment: string;
  onSelectSegment: (segment: string) => void;
  selectedProduct: string;
  onSelectProduct: (product: string) => void;
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  onApplyFilters?: () => void;
  onResetFilters?: () => void;
}

export const ContextFilterBar: React.FC<ContextFilterBarProps> = ({
  selectedRegency,
  onSelectRegency,
  selectedSegment,
  onSelectSegment,
  selectedProduct,
  onSelectProduct,
  selectedStatus,
  onSelectStatus,
  onApplyFilters,
  onResetFilters
}) => {
  const [appliedFeedback, setAppliedFeedback] = useState(false);

  // Compute active filters count
  const activeCount = [
    selectedRegency !== 'Semua Kabupaten/Kota',
    selectedSegment !== 'Semua Segmen',
    selectedProduct !== 'Semua Produk',
    selectedStatus !== 'Semua Status'
  ].filter(Boolean).length;

  const handleApply = () => {
    setAppliedFeedback(true);
    if (onApplyFilters) onApplyFilters();
    setTimeout(() => setAppliedFeedback(false), 1500);
  };

  const handleReset = () => {
    onSelectRegency('Semua Kabupaten/Kota');
    onSelectSegment('Semua Segmen');
    onSelectProduct('Semua Produk');
    onSelectStatus('Semua Status');
    if (onResetFilters) onResetFilters();
  };

  return (
    <div className="bg-white border-b border-[#DDE3EA] px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Left: Filter Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-[#607080] font-semibold pr-2 border-r border-[#DDE3EA]">
          <Filter className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Filter Analisis</span>
          {activeCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#2563EB] text-white text-[10px] flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </div>

        {/* Wilayah (Fixed Pilot) */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F5F7FA] border border-[#DDE3EA] text-[#17212B]">
          <span className="text-[#607080] text-[11px]">Wilayah:</span>
          <span className="font-semibold">Jawa Tengah</span>
        </div>

        {/* Kabupaten / Kota */}
        <div className="relative">
          <select
            value={selectedRegency}
            onChange={(e) => onSelectRegency(e.target.value)}
            className="appearance-none bg-[#F5F7FA] border border-[#DDE3EA] hover:border-slate-400 focus:border-[#2563EB] text-[#17212B] font-medium rounded-md px-2.5 py-1 pr-6 outline-none transition-colors cursor-pointer text-xs"
          >
            <option value="Semua Kabupaten/Kota">Semua Kab/Kota (35 Area)</option>
            {REGENCIES_DATA.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-[#607080] absolute right-2 top-2 pointer-events-none" />
        </div>

        {/* Segmen */}
        <div className="relative">
          <select
            value={selectedSegment}
            onChange={(e) => onSelectSegment(e.target.value)}
            className="appearance-none bg-[#F5F7FA] border border-[#DDE3EA] hover:border-slate-400 focus:border-[#2563EB] text-[#17212B] font-medium rounded-md px-2.5 py-1 pr-6 outline-none transition-colors cursor-pointer text-xs"
          >
            <option value="Semua Segmen">Semua Segmen Pelanggan</option>
            <option value="High Value Loyal">High Value Loyal</option>
            <option value="High Value At Risk">High Value At Risk</option>
            <option value="Growing Customer">Growing Customer</option>
            <option value="Price Sensitive">Price Sensitive</option>
            <option value="Dormant">Dormant</option>
            <option value="New Customer">New Customer</option>
          </select>
          <ChevronDown className="w-3 h-3 text-[#607080] absolute right-2 top-2 pointer-events-none" />
        </div>

        {/* Produk */}
        <div className="relative">
          <select
            value={selectedProduct}
            onChange={(e) => onSelectProduct(e.target.value)}
            className="appearance-none bg-[#F5F7FA] border border-[#DDE3EA] hover:border-slate-400 focus:border-[#2563EB] text-[#17212B] font-medium rounded-md px-2.5 py-1 pr-6 outline-none transition-colors cursor-pointer text-xs"
          >
            <option value="Semua Produk">Semua Solusi & Produk</option>
            <option value="Layanan Utama Retail">Layanan Utama Retail</option>
            <option value="Solusi Bisnis & UMKM">Solusi Bisnis & UMKM</option>
            <option value="Digital Platform">Digital Platform</option>
            <option value="Enterprise Corporate">Enterprise Corporate</option>
          </select>
          <ChevronDown className="w-3 h-3 text-[#607080] absolute right-2 top-2 pointer-events-none" />
        </div>

        {/* Status Pelanggan */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => onSelectStatus(e.target.value)}
            className="appearance-none bg-[#F5F7FA] border border-[#DDE3EA] hover:border-slate-400 focus:border-[#2563EB] text-[#17212B] font-medium rounded-md px-2.5 py-1 pr-6 outline-none transition-colors cursor-pointer text-xs"
          >
            <option value="Semua Status">Semua Status (Aktif & Berisiko)</option>
            <option value="Aktif">Hanya Pelanggan Aktif (78,6%)</option>
            <option value="Berisiko Tinggi">Hanya Berisiko Tinggi (11,4%)</option>
            <option value="Dormant">Hanya Dormant / Tidak Aktif</option>
          </select>
          <ChevronDown className="w-3 h-3 text-[#607080] absolute right-2 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Right: Apply & Reset Actions */}
      <div className="flex items-center gap-3">
        {activeCount > 0 && (
          <button
            onClick={handleReset}
            className="text-[11px] text-[#607080] hover:text-[#C73E3A] flex items-center gap-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filter</span>
          </button>
        )}

        <button
          onClick={handleApply}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
            appliedFeedback
              ? 'bg-[#14804A] text-white shadow-sm'
              : 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-sm'
          }`}
        >
          {appliedFeedback ? (
            <>
              <Check className="w-3 h-3" />
              <span>Diterapkan</span>
            </>
          ) : (
            <span>Terapkan</span>
          )}
        </button>
      </div>
    </div>
  );
};
