import React, { useState } from 'react';
import {
  Users,
  MapPin,
  TrendingUp,
  Filter,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Download
} from 'lucide-react';
import { JawaTengahMap } from '../components/map/JawaTengahMap';
import { REGENCIES_DATA } from '../data/mockData';
import { ScreenId } from '../types';

interface CustomerDistributionScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const CustomerDistributionScreen: React.FC<CustomerDistributionScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [selectedRegencyName, setSelectedRegencyName] = useState('Kota Semarang');
  const [metricView, setMetricView] = useState<'count' | 'active_rate' | 'value' | 'frequency'>('count');

  const selectedReg = REGENCIES_DATA.find((r) => r.name === selectedRegencyName) || REGENCIES_DATA[0];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Distribusi Pelanggan
          </h1>
          <p className="text-xs text-[#607080]">
            Eksplorasi agregasi spasial pelanggan terdaftar di seluruh wilayah administratif Jawa Tengah.
          </p>
        </div>

        {/* Metric Toggles */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#DDE3EA] rounded-xl text-xs">
          {[
            { id: 'count', label: 'Total Jumlah' },
            { id: 'active_rate', label: 'Tingkat Keaktifan' },
            { id: 'value', label: 'Nilai Pelanggan' },
            { id: 'frequency', label: 'Frekuensi Layanan' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMetricView(m.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                metricView === m.id
                  ? 'bg-[#2563EB] text-white font-semibold shadow-2xs'
                  : 'text-[#607080] hover:text-[#17212B]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: 65% Map / 35% Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Map Explorer (8 cols / ~65%) */}
        <div className="xl:col-span-8 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#17212B]">Peta Agregasi Administratif</span>
              <span className="text-[10px] text-[#607080]">· Klik wilayah untuk menginspeksi metrik</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privasi Terjaga: Agregasi Tingkat Kecamatan / Kota</span>
            </div>
          </div>

          <JawaTengahMap
            selectedAreaId={selectedRegencyName}
            onSelectArea={(name) => setSelectedRegencyName(name)}
          />

          <div className="mt-3 pt-3 border-t border-[#DDE3EA] flex items-center justify-between text-[11px] text-[#607080]">
            <span>Metrik aktif: <strong>{metricView.replace('_', ' ').toUpperCase()}</strong></span>
            <span>Titik individual rumah tangga disembunyikan sesuai kepatuhan privasi (UU PDP)</span>
          </div>
        </div>

        {/* Right Analytical Panel (4 cols / ~35%) */}
        <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#DDE3EA] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                  Wilayah Terpilih
                </span>
                <h2 className="text-lg font-bold text-[#17212B]">{selectedReg.name}</h2>
                <div className="text-[11px] text-[#607080]">{selectedReg.category} · Jawa Tengah</div>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  selectedReg.strategy === 'DEFEND'
                    ? 'bg-rose-50 text-[#C73E3A]'
                    : selectedReg.strategy === 'RETAIN'
                    ? 'bg-amber-50 text-[#D97706]'
                    : 'bg-teal-50 text-[#0F7C7B]'
                }`}
              >
                {selectedReg.strategy}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                <div className="text-[11px] text-[#607080]">Total Pelanggan</div>
                <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                  {selectedReg.totalCustomers.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                <div className="text-[11px] text-[#607080]">Rasio Aktif</div>
                <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                  {selectedReg.activeRate}%
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                <div className="text-[11px] text-[#607080]">Segmen Dominan</div>
                <div className="text-xs font-bold text-[#17212B] mt-1 truncate">
                  High Value Loyal
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                <div className="text-[11px] text-[#607080]">Outlet Resmi</div>
                <div className="text-base font-bold text-[#2563EB] mt-0.5 tabular-nums">
                  {selectedReg.outlets} Titik
                </div>
              </div>
            </div>

            {/* Top 3 Observations */}
            <div>
              <div className="text-[11px] font-bold text-[#17212B] uppercase tracking-wider mb-2">
                3 Observasi Kunci Wilayah
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg border border-[#DDE3EA] bg-white">
                  <strong>1. Konsentrasi Nilai Tinggi:</strong> Memiliki lebih dari 28.000 pelanggan berpenghasilan menengah-keatas dengan rata-rata transaksi Rp3,85 juta.
                </div>
                <div className="p-2.5 rounded-lg border border-[#DDE3EA] bg-white">
                  <strong>2. Pertumbuhan Kompetitor:</strong> Terdapat 38 titik layanan kompetitor terdeteksi dalam radius 10 km dari pusat kota.
                </div>
                <div className="p-2.5 rounded-lg border border-[#DDE3EA] bg-white">
                  <strong>3. Celah Cakupan Sub-urban:</strong> Zona pinggiran timur memiliki waktu tempuh &gt; 18 menit menuju outlet layanan terdekat.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDE3EA] space-y-2">
            <button
              onClick={() => onNavigateToScreen('pertahanan-pasar')}
              className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Buka Analisis Mendalam Area Ini</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Compact Ranked Table Below Map */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#17212B]">Peringkat Wilayah Berdasarkan Basis Pelanggan</h3>
            <p className="text-[11px] text-[#607080]">11 Kabupaten/Kota percontohan di Jawa Tengah</p>
          </div>
          <button
            onClick={() => onShowToast('Data tabel distribusi pelanggan diunduh.')}
            className="text-xs text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Tabel</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F7FA] text-[#607080] font-semibold border-y border-[#DDE3EA]">
              <tr>
                <th className="py-2.5 px-3">Nama Area</th>
                <th className="py-2.5 px-3">Kategori</th>
                <th className="py-2.5 px-3 text-right">Total Pelanggan</th>
                <th className="py-2.5 px-3 text-right">Pelanggan Aktif</th>
                <th className="py-2.5 px-3 text-right">Rasio Aktif</th>
                <th className="py-2.5 px-3 text-right">Titik Layanan</th>
                <th className="py-2.5 px-3 text-right">Cakupan</th>
                <th className="py-2.5 px-3 text-center">Strategi</th>
                <th className="py-2.5 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE3EA]">
              {REGENCIES_DATA.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelectedRegencyName(r.name)}
                  className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                    selectedRegencyName === r.name ? 'bg-blue-50/40' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-semibold text-[#17212B]">{r.name}</td>
                  <td className="py-2.5 px-3 text-[#607080]">{r.category}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-medium">
                    {r.totalCustomers.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums">
                    {r.activeCustomers.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-semibold text-[#17212B]">
                    {r.activeRate}%
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums">{r.outlets}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums">{r.coverageRate}%</td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        r.strategy === 'DEFEND'
                          ? 'bg-rose-50 text-[#C73E3A]'
                          : r.strategy === 'RETAIN'
                          ? 'bg-amber-50 text-[#D97706]'
                          : 'bg-teal-50 text-[#0F7C7B]'
                      }`}
                    >
                      {r.strategy}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRegencyName(r.name);
                      }}
                      className="text-[#2563EB] font-semibold hover:underline"
                    >
                      Pilih
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
