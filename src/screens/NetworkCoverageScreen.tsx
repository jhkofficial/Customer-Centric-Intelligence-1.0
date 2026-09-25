import React, { useState } from 'react';
import {
  Network,
  Building2,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
  Car
} from 'lucide-react';
import { KpiCard } from '../components/common/KpiCard';
import { JawaTengahMap } from '../components/map/JawaTengahMap';
import { GLOBAL_METRICS } from '../data/mockData';
import { ScreenId } from '../types';

interface NetworkCoverageScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const NetworkCoverageScreen: React.FC<NetworkCoverageScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [selectedOutlet, setSelectedOutlet] = useState({
    name: 'Outlet Semarang Pandanaran',
    type: 'Kantor Cabang Utama & Hub Regional',
    capacityUtilization: '88,4%',
    customersInCatchment: '46.200',
    activeRate: '82,1%',
    avgDistance: '4,2 km',
    overlapPct: '22,5%',
    status: 'Optimal Beroperasi'
  });

  const [catchmentMode, setCatchmentMode] = useState<'travel_time' | 'radius'>('travel_time');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Jaringan &amp; Cakupan Layanan
          </h1>
          <p className="text-xs text-[#607080]">
            Evaluasi 48 titik layanan aktif, tumpang tindih (overlap), dan celah jangkauan (underserved gaps) di Jawa Tengah.
          </p>
        </div>

        {/* Actions: Catchment Mode & Data Manager Link */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigateToScreen('pasar-poi-demografi')}
            className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Network className="w-3.5 h-3.5" />
            <span>Kelola / Upload Data Jaringan</span>
          </button>

          <div className="flex items-center gap-1 p-1 bg-white border border-[#DDE3EA] rounded-xl text-xs">
            <button
              onClick={() => setCatchmentMode('travel_time')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                catchmentMode === 'travel_time'
                  ? 'bg-[#2563EB] text-white shadow-2xs'
                  : 'text-[#607080] hover:text-[#17212B]'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Isochrone Waktu Tempuh (15 mnt)</span>
            </button>
            <button
              onClick={() => setCatchmentMode('radius')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                catchmentMode === 'radius'
                  ? 'bg-[#2563EB] text-white shadow-2xs'
                  : 'text-[#607080] hover:text-[#17212B]'
              }`}
            >
              Radius Garis Lurus (5 km)
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiCard
          title="Titik Layanan Aktif"
          value={GLOBAL_METRICS.activeServicePoints}
          subtitle="Cabang & Satellite"
          sparklineData={[44, 45, 46, 47, 48]}
        />
        <KpiCard
          title="Cakupan Layanan Total"
          value={GLOBAL_METRICS.serviceCoverage}
          change="+1,6 poin"
          changeType="positive"
          sparklineData={[79.5, 80.2, 81.1, 81.6, 82.4]}
        />
        <KpiCard
          title="Pelanggan Kurang Terlayani"
          value={GLOBAL_METRICS.underservedCustomers}
          change="Underserved"
          changeType="warning"
          subtitle=">15 menit ke outlet"
          sparklineData={[112000, 108000, 104000, 99000, 96700]}
        />
        <KpiCard
          title="Titik Overlap Tinggi"
          value={GLOBAL_METRICS.highOverlapServicePoints}
          change="7 Outlet"
          changeType="neutral"
          subtitle="Overlap > 25%"
          sparklineData={[9, 8, 8, 7, 7]}
        />
        <KpiCard
          title="Jarak Rata-rata Layanan"
          value={GLOBAL_METRICS.avgDistanceToService}
          change="-0,8 km"
          changeType="positive"
          subtitle="Efisiensi akses"
          sparklineData={[7.4, 7.1, 6.8, 6.6, 6.4]}
        />
      </div>

      {/* Main Content: Map (8 cols) + Selected Outlet Card (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-8 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-[#17212B]">Peta Jangkauan Catchment Titik Layanan</span>
            <span className="text-[#607080]">
              Mode: <strong>{catchmentMode === 'travel_time' ? 'Isochrone Waktu Tempuh 15 Menit' : 'Radius Buffer 5 km'}</strong>
            </span>
          </div>

          <JawaTengahMap
            activeLayers={{
              customerDensity: false,
              customerValue: false,
              retentionRisk: false,
              outlets: true,
              competitors: true,
              catchments: true
            }}
          />

          <div className="mt-3 pt-3 border-t border-[#DDE3EA] flex items-center justify-between text-[11px] text-[#607080]">
            <span>Metodologi: Isochrone dihitung berdasarkan data jaringan jalan arteri &amp; kecepatan rata-rata harian</span>
            <span className="text-emerald-700 font-semibold">48 Outlet Terdaftar Resmi</span>
          </div>
        </div>

        {/* Selected Outlet Profile */}
        <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#DDE3EA]">
              <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                Titik Layanan Terpilih
              </span>
              <h2 className="text-base font-bold text-[#17212B]">{selectedOutlet.name}</h2>
              <div className="text-[11px] text-[#607080]">{selectedOutlet.type}</div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA] flex justify-between items-center">
                <span className="text-[#607080]">Utilisasi Kapasitas:</span>
                <span className="font-bold text-[#17212B] tabular-nums">{selectedOutlet.capacityUtilization}</span>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA] flex justify-between items-center">
                <span className="text-[#607080]">Pelanggan dalam Catchment:</span>
                <span className="font-bold text-[#2563EB] tabular-nums">{selectedOutlet.customersInCatchment}</span>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA] flex justify-between items-center">
                <span className="text-[#607080]">Rasio Aktif Pelanggan:</span>
                <span className="font-bold text-[#17212B] tabular-nums">{selectedOutlet.activeRate}</span>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA] flex justify-between items-center">
                <span className="text-[#607080]">Jarak Rata-rata Nasabah:</span>
                <span className="font-bold text-[#17212B] tabular-nums">{selectedOutlet.avgDistance}</span>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex justify-between items-center">
                <span className="text-[#D97706] font-medium">Tingkat Overlap Jaringan:</span>
                <span className="font-bold text-[#D97706] tabular-nums">{selectedOutlet.overlapPct}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/60 flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Status Operasional: <strong>{selectedOutlet.status}</strong></span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDE3EA] space-y-2">
            <button
              onClick={() => onNavigateToScreen('kandidat-lokasi')}
              className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Simulasi Tambah Satellite Outlet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
