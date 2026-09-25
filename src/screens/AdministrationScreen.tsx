import React, { useState } from 'react';
import {
  Users,
  Shield,
  MapPin,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  Database,
  ArrowRight,
  UserPlus
} from 'lucide-react';
import { ScreenId } from '../types';

interface AdministrationScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const AdministrationScreen: React.FC<AdministrationScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'rbac' | 'region' | 'integrations'>('users');

  const users = [
    {
      name: 'Johanes',
      email: 'johanes.admin@serveon.id',
      role: 'Administrator Sistem',
      accessScope: 'Penuh (Jawa Tengah)',
      status: 'Aktif',
      lastLogin: 'Hari ini, 08.45 WIB'
    },
    {
      name: 'Maya Puspitasari',
      email: 'maya.eksekutif@serveon.id',
      role: 'Eksekutif Bisnis',
      accessScope: 'Semua Laporan & Ringkasan',
      status: 'Aktif',
      lastLogin: 'Kemarin, 16.20 WIB'
    },
    {
      name: 'Deni Kurniawan',
      email: 'deni.analis@serveon.id',
      role: 'Analis Intelijen Spasial',
      accessScope: 'GIS, MCDM, POI & Demografi',
      status: 'Aktif',
      lastLogin: '21 Sep 2026, 11.10 WIB'
    },
    {
      name: 'Rina Anggraini',
      email: 'rina.crm@serveon.id',
      role: 'Manajer Operasional CRM',
      accessScope: 'Pelanggan 360, Retensi & Campaign',
      status: 'Aktif',
      lastLogin: 'Hari ini, 09.15 WIB'
    }
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Administrasi &amp; Konfigurasi Sistem
          </h1>
          <p className="text-xs text-[#607080]">
            Pengelolaan pengguna, hak akses berbasis peran (RBAC), cakupan wilayah pilot Jawa Tengah, dan status konektor integrasi.
          </p>
        </div>

        <button
          onClick={() => onShowToast('Formulir penambahan pengguna dibuka.')}
          className="px-3.5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Tambah Pengguna Baru</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DDE3EA] px-1 text-xs font-semibold text-[#607080] gap-2">
        {[
          { id: 'users', label: '1. Manajemen Pengguna' },
          { id: 'rbac', label: '2. Matriks Hak Akses (RBAC)' },
          { id: 'region', label: '3. Cakupan Wilayah Pilot' },
          { id: 'integrations', label: '4. Kesehatan Integrasi & API' }
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

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white border border-[#DDE3EA] rounded-xl overflow-hidden shadow-2xs">
          <div className="p-3.5 border-b border-[#DDE3EA] bg-slate-50/50 flex items-center justify-between text-xs">
            <span className="font-bold text-[#17212B]">Daftar Pengguna Resmi SERVEON</span>
            <span className="text-[#607080]">4 Pengguna Terdaftar</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-[#607080] font-semibold border-b border-[#DDE3EA]">
                <tr>
                  <th className="py-2.5 px-3">Nama Pengguna</th>
                  <th className="py-2.5 px-3">Email Kantor</th>
                  <th className="py-2.5 px-3">Peran (Role)</th>
                  <th className="py-2.5 px-3">Cakupan Wilayah</th>
                  <th className="py-2.5 px-3">Aktivitas Terakhir</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE3EA]">
                {users.map((u) => (
                  <tr key={u.email} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-[#17212B]">{u.name}</td>
                    <td className="py-2.5 px-3 text-[#607080] font-mono text-[11px]">{u.email}</td>
                    <td className="py-2.5 px-3 font-medium text-[#2563EB]">{u.role}</td>
                    <td className="py-2.5 px-3 text-[#607080]">{u.accessScope}</td>
                    <td className="py-2.5 px-3 text-[#607080]">{u.lastLogin}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#DDE3EA] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#2563EB]" />
                <span className="font-bold text-xs text-[#17212B]">Core CRM &amp; Transaksi Pelanggan</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                Terhubung (99,9%)
              </span>
            </div>
            <p className="text-[11px] text-[#607080]">
              Sinkronisasi data batch harian pukul 23.45 WIB. Total 1.248.560 pelanggan Jawa Tengah.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DDE3EA] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#0F7C7B]" />
                <span className="font-bold text-xs text-[#17212B]">Spatial GIS &amp; Isochrone Engine</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                Aktif (v4.2)
              </span>
            </div>
            <p className="text-[11px] text-[#607080]">
              Menghitung poligon waktu tempuh 15 menit dan catchment 48 outlet resmi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DDE3EA] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#D97706]" />
                <span className="font-bold text-xs text-[#17212B]">WhatsApp Business Platform Provider</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                Terhubung
              </span>
            </div>
            <p className="text-[11px] text-[#607080]">
              Kanal resmi terverifikasi centang hijau dengan batasan throughput 1.000 pesan/menit.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DDE3EA] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#15324B]" />
                <span className="font-bold text-xs text-[#17212B]">BPS Demografi &amp; Registri POI Eksternal</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                Tersinkronisasi
              </span>
            </div>
            <p className="text-[11px] text-[#607080]">
              Basis data demografi dan 38 titik pemetaan kompetitor diperbarui setiap kuartal.
            </p>
          </div>
        </div>
      )}

      {activeTab !== 'users' && activeTab !== 'integrations' && (
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-8 text-center text-[#607080] space-y-2">
          <p className="text-xs font-semibold text-[#17212B]">
            Pengaturan konfigurasi &ldquo;{activeTab}&rdquo; telah aktif dan terkelola secara terpusat.
          </p>
          <p className="text-[11px]">Seluruh perubahan konfigurasi diaudit dan dicatat dalam log forensik.</p>
        </div>
      )}
    </div>
  );
};
