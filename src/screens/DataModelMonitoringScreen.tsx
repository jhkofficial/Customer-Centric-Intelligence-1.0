import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Database,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { KpiCard } from '../components/common/KpiCard';
import { ScreenId } from '../types';

interface DataModelMonitoringScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const DataModelMonitoringScreen: React.FC<DataModelMonitoringScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'kualitas' | 'pipeline' | 'performa' | 'drift' | 'registry'>('kualitas');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Pemantauan Kualitas Data &amp; Model AI
          </h1>
          <p className="text-xs text-[#607080]">
            Observabilitas end-to-end: kesehatan pipeline integrasi, kelengkapan atribut, metrik akurasi model ML, dan data drift.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast('Pemeriksaan integritas data manual selesai: Semua sistem sehat.')}
            className="px-3 py-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#607080]" />
            <span>Jalankan Validasi Cepat</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          title="Indeks Kualitas Data Keseluruhan"
          value="96,2%"
          change="Sangat Baik"
          changeType="positive"
          subtitle="Completeness 98,2%"
          sparklineData={[94.5, 95.1, 95.8, 96.0, 96.2]}
        />
        <KpiCard
          title="Akurasi Model Retensi (AUROC)"
          value="0,86"
          change="Optimal"
          changeType="positive"
          subtitle="Recall 0,81 · Precision 0,74"
          sparklineData={[0.82, 0.83, 0.84, 0.85, 0.86]}
        />
        <KpiCard
          title="Status Data Drift"
          value="0,04 (Rendah)"
          change="Stabil"
          changeType="positive"
          subtitle="Population Stability Index"
          sparklineData={[0.08, 0.06, 0.05, 0.04, 0.04]}
        />
        <KpiCard
          title="Sinkronisasi Pipeline Terakhir"
          value="24 Mnt Lalu"
          change="Real-time"
          changeType="positive"
          subtitle="4/4 Pipeline Aktif"
          sparklineData={[1, 1, 1, 1, 1]}
        />
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-[#DDE3EA] px-1 text-xs font-semibold text-[#607080] gap-2">
        {[
          { id: 'kualitas', label: '1. Kualitas Data (DQI)' },
          { id: 'pipeline', label: '2. Status Pipeline ETL' },
          { id: 'performa', label: '3. Performa Model ML' },
          { id: 'drift', label: '4. Deteksi Drift Fitur' },
          { id: 'registry', label: '5. Registri Model' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-2 px-3 border-b-2 transition-all ${
              activeTab === t.id
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent hover:text-[#17212B]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'kualitas' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#DDE3EA] space-y-2">
            <div className="text-[11px] text-[#607080] font-semibold">Kelengkapan Data (Completeness)</div>
            <div className="text-2xl font-bold text-[#14804A] tabular-nums">98,2%</div>
            <p className="text-[11px] text-[#607080]">Atribut koordinat domisili, frekuensi transaksi, dan riwayat komplain terisi lengkap.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DDE3EA] space-y-2">
            <div className="text-[11px] text-[#607080] font-semibold">Validitas Format (Validity)</div>
            <div className="text-2xl font-bold text-[#14804A] tabular-nums">97,4%</div>
            <p className="text-[11px] text-[#607080]">Pemeriksaan skema nomor telepon, kode pos wilayah Jateng, dan format mata uang.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DDE3EA] space-y-2">
            <div className="text-[11px] text-[#607080] font-semibold">Kebaruan Data (Freshness)</div>
            <div className="text-2xl font-bold text-[#2563EB] tabular-nums">95,8%</div>
            <p className="text-[11px] text-[#607080]">95,8% rekord pelanggan diperbarui dalam 24 jam terakhir melalui integrasi batch harian.</p>
          </div>
        </div>
      )}

      {activeTab === 'performa' && (
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
            <div>
              <h3 className="font-bold text-xs text-[#17212B] uppercase tracking-wider">
                Metrik Evaluasi Model Klasifikasi Retensi v1.3
              </h3>
              <p className="text-[11px] text-[#607080]">Dataset validasi terpisah periode Agustus-September 2026 (120.000 sampel)</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-xs">
              Status Produksi: Optimal
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <div className="text-[11px] text-[#607080]">AUROC</div>
              <div className="text-xl font-bold text-[#2563EB] mt-1 tabular-nums">0,86</div>
              <div className="text-[10px] text-[#607080] mt-0.5">Daya pisah kelas kuat</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <div className="text-[11px] text-[#607080]">Recall (Sensitivitas)</div>
              <div className="text-xl font-bold text-[#14804A] mt-1 tabular-nums">0,81</div>
              <div className="text-[10px] text-[#607080] mt-0.5">Mendeteksi 81% churner nyata</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <div className="text-[11px] text-[#607080]">Presisi</div>
              <div className="text-xl font-bold text-[#17212B] mt-1 tabular-nums">0,74</div>
              <div className="text-[10px] text-[#607080] mt-0.5">Efisiensi biaya kontak tinggi</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <div className="text-[11px] text-[#607080]">F1-Score</div>
              <div className="text-xl font-bold text-[#17212B] mt-1 tabular-nums">0,77</div>
              <div className="text-[10px] text-[#607080] mt-0.5">Keseimbangan presisi/recall</div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'kualitas' && activeTab !== 'performa' && (
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-8 text-center text-[#607080] space-y-2">
          <p className="text-xs font-semibold text-[#17212B]">
            Data dan log telemetri untuk tab &ldquo;{activeTab}&rdquo; termonitor secara real-time.
          </p>
          <p className="text-[11px]">Tidak terdeteksi deviasi anomali atau data drift melebihi ambang batas batas kritis (PSI &lt; 0,10).</p>
        </div>
      )}
    </div>
  );
};
