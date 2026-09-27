import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  Clock,
  CheckCircle2,
  XCircle,
  FileCheck2,
  Users,
  Settings,
  RefreshCw,
  Slash,
  MessageSquare,
  Phone,
  Mail,
  Bell
} from 'lucide-react';
import { ContactPolicyRule } from '../../types/orchestration';
import { INITIAL_CONTACT_POLICIES } from '../../data/orchestrationData';

interface ContactPolicyTabProps {
  onShowToast: (msg: string) => void;
}

export const ContactPolicyTab: React.FC<ContactPolicyTabProps> = ({
  onShowToast
}) => {
  const [policies, setPolicies] = useState<ContactPolicyRule[]>(INITIAL_CONTACT_POLICIES);
  const [quietHoursStart, setQuietHoursStart] = useState('20:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('08:00');
  const [blockSundayCalls, setBlockSundayCalls] = useState(true);

  const dncList = [
    { name: 'Eko Wahyudi', phone: '0819-3321-0099', reason: 'Konsumen meminta stop kontak (UU PDP)', date: '21 Sep 2026', channel: 'Semua Kanal' },
    { name: 'Rahmat Hidayat', phone: '0812-4455-6677', reason: 'Pindah domisili ke luar Jawa Tengah', date: '18 Sep 2026', channel: 'Telepon & WA' },
    { name: 'Tri Mulyono', phone: '0857-9911-2233', reason: 'Nomor telepon tidak aktif / salah sambung', date: '15 Sep 2026', channel: 'Semua Kanal' }
  ];

  const handleTogglePolicy = (id: string) => {
    setPolicies((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus: 'Enforced' | 'Warning' | 'Disabled' =
            p.status === 'Enforced' ? 'Warning' : 'Enforced';
          onShowToast(`Aturan kontak ${p.channel} diubah menjadi ${nextStatus}.`);
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Policy Summary Banner */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DDE3EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>KEPATUHAN UU PDP &amp; FATIGUE GOVERNANCE</span>
              </span>
              <span className="text-xs text-slate-500">Standar Etika Pemasaran Astra Motor</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Contact Policy &amp; Tata Kelola Frekuensi Kontak
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Mencegah kejenuhan konsumen (customer fatigue), menegakkan jeda kontak wajib (cooldown), pembatasan jam malam (quiet hours), dan pematuhan UU Perlindungan Data Pribadi (PDP).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('Konfigurasi Contact Policy berhasil disinkronkan ke seluruh server dispatch.')}
              className="px-3.5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Terapkan Kebijakan ke Semua Kanal</span>
            </button>
          </div>
        </div>

        {/* 3 Suppression Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50">
            <div className="text-[10.5px] font-bold text-rose-800 uppercase">Kontak Ditekan (Suppressed)</div>
            <div className="text-xl font-extrabold text-rose-700 mt-1 tabular-nums">1.560 Prospek</div>
            <div className="text-[10px] text-rose-600 mt-0.5">12,5% dari total target populasi kampanye</div>
          </div>

          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50">
            <div className="text-[10.5px] font-bold text-blue-800 uppercase">Penyebab: Batas Frekuensi Penuh</div>
            <div className="text-xl font-extrabold text-blue-700 mt-1 tabular-nums">540 Prospek</div>
            <div className="text-[10px] text-blue-600 mt-0.5">Sudah menerima 2 pesan dalam pekan berjalan</div>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
            <div className="text-[10.5px] font-bold text-amber-800 uppercase">Penyebab: Belum Ada Izin (Consent)</div>
            <div className="text-xl font-extrabold text-amber-700 mt-1 tabular-nums">720 Prospek</div>
            <div className="text-[10px] text-amber-600 mt-0.5">Menunggu opt-in sebelum blast promosi</div>
          </div>
        </div>
      </div>

      {/* Rules Configuration Table */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#DDE3EA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-slate-900">
              Matriks Batas Kontak &amp; Jeda Antar Kanal (Channel Cadence Limits)
            </h3>
          </div>
          <span className="text-xs text-slate-500">Mode Penegakan Otomatis (Hard Enforcement)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#DDE3EA] text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Kanal Komunikasi</th>
                <th className="py-3 px-4">Batas Frekuensi Kontak</th>
                <th className="py-3 px-4">Masa Jeda Wajib (Cooldown)</th>
                <th className="py-3 px-4">Aturan Jika Tidak Ada Respon</th>
                <th className="py-3 px-4">Kepatuhan Consent (UU PDP)</th>
                <th className="py-3 px-4 text-center">Status Aturan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE3EA]">
              {policies.map((pol) => (
                <tr key={pol.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    {pol.channel === 'WhatsApp' ? (
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                    ) : pol.channel === 'Phone' ? (
                      <Phone className="w-4 h-4 text-blue-600" />
                    ) : pol.channel === 'Email' ? (
                      <Mail className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Bell className="w-4 h-4 text-purple-600" />
                    )}
                    <span>{pol.channel}</span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-800">{pol.maxFrequency}</td>

                  <td className="py-3.5 px-4 text-slate-600">{pol.cooldownPeriod}</td>

                  <td className="py-3.5 px-4 text-slate-600 max-w-xs">{pol.noResponseRule}</td>

                  <td className="py-3.5 px-4">
                    {pol.consentRequired ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Wajib Opt-in</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">In-App Native</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleTogglePolicy(pol.id)}
                      className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold transition-all ${
                        pol.status === 'Enforced'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      {pol.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quiet Hours & Do Not Contact Registry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Quiet Hours Configuration */}
        <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-bold text-slate-900">
                Jam Tenang (Quiet Hours &amp; Weekend Rules)
              </h3>
            </div>
            <span className="text-xs text-emerald-600 font-bold">Aktif &amp; Terkunci</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Sistem secara otomatis menolak dan menunda pengiriman pesan promosi maupun panggilan telesales jika berada di luar rentang jam operasional yang diizinkan.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Awal Jam Malam (Mulai Blokir)
              </label>
              <input
                type="time"
                value={quietHoursStart}
                onChange={(e) => setQuietHoursStart(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Akhir Jam Malam (Buka Blokir)
              </label>
              <input
                type="time"
                value={quietHoursEnd}
                onChange={(e) => setQuietHoursEnd(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-800"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={blockSundayCalls}
                onChange={(e) => setBlockSundayCalls(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>Blokir Seluruh Panggilan Telepon Promosi pada Hari Minggu &amp; Libur Nasional</span>
            </label>
          </div>
        </div>

        {/* Right: Do Not Contact (DNC) Registry */}
        <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
            <div className="flex items-center gap-2">
              <Slash className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Daftar Larangan Kontak (Do Not Contact Registry)
              </h3>
            </div>
            <span className="text-xs text-rose-600 font-bold">{dncList.length} Entri DNC</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {dncList.map((dnc, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-rose-100 bg-rose-50/30 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>{dnc.name}</span>
                    <span className="font-mono text-[11px] text-slate-500">{dnc.phone}</span>
                  </div>
                  <div className="text-[11px] text-rose-700 mt-0.5">{dnc.reason}</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Dicabut pada {dnc.date} · Saluran: {dnc.channel}
                  </div>
                </div>

                <button
                  onClick={() => onShowToast(`Audit trail untuk ${dnc.name} diverifikasi.`)}
                  className="px-2 py-1 text-[10.5px] border border-slate-300 rounded text-slate-600 hover:bg-slate-100 shrink-0 font-medium"
                >
                  Detail Audit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
