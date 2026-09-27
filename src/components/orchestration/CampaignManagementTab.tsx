import React, { useState } from 'react';
import {
  Send,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  DollarSign,
  Users,
  Eye,
  Play,
  Pause,
  Download,
  Check,
  X,
  FileCheck2,
  Building2,
  Calendar
} from 'lucide-react';
import { CampaignRecord } from '../../types/orchestration';
import { INITIAL_CAMPAIGNS } from '../../data/orchestrationData';

interface CampaignManagementTabProps {
  onShowToast: (msg: string) => void;
}

export const CampaignManagementTab: React.FC<CampaignManagementTabProps> = ({
  onShowToast
}) => {
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>(INITIAL_CAMPAIGNS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newSegment, setNewSegment] = useState('Financing Barrier & Deferred');
  const [newChannel, setNewChannel] = useState<'WhatsApp' | 'Push Notification' | 'Social Media'>('WhatsApp');
  const [newBudget, setNewBudget] = useState('Rp12.000.000');

  const handleToggleStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Aktif' ? 'Selesai' : 'Aktif';
          onShowToast(`Status kampanye "${c.name}" diubah menjadi ${nextStatus}.`);
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) {
      onShowToast('Mohon masukkan nama kampanye.');
      return;
    }

    const created: CampaignRecord = {
      id: `cmp-0${campaigns.length + 1}`,
      name: newCampaignName,
      objective: newObjective || 'Konversi Segmen Tertunda',
      campaignType: 'Financing Campaign',
      audienceSegment: newSegment,
      channel: newChannel,
      schedule: '01 Okt – 20 Okt 2026',
      status: 'Aktif',
      owner: 'Marketing Jateng',
      budget: newBudget,
      sentCount: 2400,
      deliveredCount: 2350,
      openedCount: 1820,
      clickedCount: 940,
      respondedCount: 380,
      convertedCount: 46,
      revenueGenerated: 'Rp1,18 Miliar'
    };

    setCampaigns([created, ...campaigns]);
    setIsCreateModalOpen(false);
    setNewCampaignName('');
    setNewObjective('');
    onShowToast(`Kampanye "${created.name}" berhasil dibuat dan memasuki alur verifikasi kepatuhan.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Cards */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DDE3EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                CAMPAIGN LIFECYCLE
              </span>
              <span className="text-xs text-slate-500">
                Persetujuan &amp; Tata Kelola Anggaran Pemasaran
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Manajemen Kampanye (Campaign Management)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pantau siklus lengkap kampanye multi-kanal, performa pengiriman, konversi ke SPK, dan realisasi pendapatan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('Mengekspor laporan audit kampanye ke format XLSX...')}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Laporan</span>
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3.5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Buat Kampanye Baru</span>
            </button>
          </div>
        </div>

        {/* Campaign Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-[#DDE3EA] bg-blue-50/50">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase">Total Kampanye</div>
            <div className="text-xl font-extrabold text-[#2563EB] mt-1 tabular-nums">
              {campaigns.length} Kampanye
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {campaigns.filter((c) => c.status === 'Aktif').length} Sedang Berjalan
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#DDE3EA] bg-emerald-50/50">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase">Jangkauan Prospek</div>
            <div className="text-xl font-extrabold text-emerald-700 mt-1 tabular-nums">14.940</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">97,8% Tingkat Keterikatan</div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#DDE3EA] bg-purple-50/50">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase">Konversi ke Deal (SPK)</div>
            <div className="text-xl font-extrabold text-purple-700 mt-1 tabular-nums">510 Unit</div>
            <div className="text-[10px] text-purple-600 mt-0.5">Rata-rata 16,8% Konversi</div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#DDE3EA] bg-amber-50/50">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase">Pendapatan Teratribusi</div>
            <div className="text-xl font-extrabold text-amber-800 mt-1 tabular-nums">Rp5,22 Miliar</div>
            <div className="text-[10px] text-amber-700 mt-0.5">ROI 11,7x dari Biaya Blast</div>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#DDE3EA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-slate-900">Daftar Kampanye Aktif &amp; Terjadwal</h3>
          </div>
          <span className="text-xs text-slate-500">Kepatuhan UU PDP &amp; Persetujuan Kontak Aktif</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#DDE3EA] text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Nama Kampanye &amp; Objektif</th>
                <th className="py-3 px-4">Kanal &amp; Jadwal</th>
                <th className="py-3 px-4">Target Audiens</th>
                <th className="py-3 px-4 text-center">Terkirim / Dibuka</th>
                <th className="py-3 px-4 text-center">Konversi SPK</th>
                <th className="py-3 px-4">Nilai Penjualan</th>
                <th className="py-3 px-4 text-center">Status &amp; Opsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE3EA]">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold text-slate-900">{camp.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{camp.objective}</div>
                    <div className="text-[10px] text-slate-400 mt-1">PIC: {camp.owner}</div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{camp.channel}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{camp.schedule}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {camp.audienceSegment}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">Anggaran: {camp.budget}</div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="font-bold text-slate-900 tabular-nums">
                      {camp.sentCount.toLocaleString('id-ID')} / {camp.openedCount.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">
                      {Math.round((camp.openedCount / camp.sentCount) * 100)}% Open Rate
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="font-extrabold text-purple-700 tabular-nums text-sm">
                      {camp.convertedCount} Unit
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {Math.round((camp.convertedCount / camp.sentCount) * 100 * 10) / 10}% Rasio
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900">{camp.revenueGenerated}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">Attributed ROI</div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          camp.status === 'Aktif'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {camp.status}
                      </span>
                      <button
                        onClick={() => handleToggleStatus(camp.id)}
                        className="p-1 rounded hover:bg-slate-200 text-slate-600 transition-colors"
                        title={camp.status === 'Aktif' ? 'Jeda Kampanye' : 'Aktifkan Kampanye'}
                      >
                        {camp.status === 'Aktif' ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#DDE3EA] shadow-xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-[#2563EB]" />
                <h3 className="text-base font-bold text-slate-900">Buat Kampanye Baru</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3.5 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Nama Kampanye *
                </label>
                <input
                  type="text"
                  required
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  placeholder="Contoh: Flash Promo Subsidi Angsuran FIF CB150R"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Objektif Kampanye
                </label>
                <input
                  type="text"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  placeholder="Contoh: Menyelamatkan prospek berkendala DP di Semarang Timur"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Kanal Utama
                  </label>
                  <select
                    value={newChannel}
                    onChange={(e) => setNewChannel(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="WhatsApp">WhatsApp Business</option>
                    <option value="Push Notification">Push Notification Mobile Apps</option>
                    <option value="Social Media">Social Media Ads</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Anggaran Kampanye
                  </label>
                  <input
                    type="text"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none"
                  >
                  </input>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Segmen Target Audiens
                </label>
                <select
                  value={newSegment}
                  onChange={(e) => setNewSegment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="Financing Barrier & Deferred">Financing Barrier &amp; Deferred (Skor &gt; 70)</option>
                  <option value="Hot Prospects Need Test Drive">Hot Prospects Butuh Test Drive (Skor &gt; 80)</option>
                  <option value="No Response Re-Engagement">No Response &gt; 7 Hari (Sinyal Digital Baru)</option>
                  <option value="Nasabah Servis Berkala Jatuh Tempo">Nasabah Servis Berkala Jatuh Tempo KPB 3/4</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-[11px] flex items-start gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Kampanye akan otomatis diverifikasi terhadap aturan penekanan (suppression) Contact Policy dan validasi consent UU PDP sebelum jadwal pengiriman.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DDE3EA]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-2xs"
                >
                  Otorisasi &amp; Simpan Kampanye
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
