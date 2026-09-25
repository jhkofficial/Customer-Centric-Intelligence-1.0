import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Phone,
  Bell,
  Building2,
  Users,
  Eye,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ScreenId } from '../types';

interface CampaignOmnichannelScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const CampaignOmnichannelScreen: React.FC<CampaignOmnichannelScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [currentStep, setCurrentStep] = useState(5); // Default to Review & Approval step
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [activeChannel, setActiveChannel] = useState<'wa' | 'call' | 'push' | 'branch'>('wa');

  const steps = [
    '1. Tentukan Objektif',
    '2. Pilih Target Audiens',
    '3. Pilih Kanal',
    '4. Pesan & Penawaran',
    '5. Review & Persetujuan',
    '6. Jadwal Eksekusi'
  ];

  const handleApprove = () => {
    setApprovalStatus('approved');
    onShowToast('Kampanye "Retensi High Value Semarang Timur" telah disetujui untuk eksekusi otomatis.');
  };

  const handleReject = () => {
    setApprovalStatus('rejected');
    onShowToast('Kampanye ditolak. Catatan revisi dikirimkan ke konseptor.');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Orkestrasi Campaign &amp; Omnichannel
          </h1>
          <p className="text-xs text-[#607080]">
            Penyusunan alur penjangkauan pelanggan multi-kanal dengan penegakan izin kontak (consent) dan tata kelola persetujuan manusia.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {approvalStatus === 'pending' && (
            <>
              <button
                onClick={handleReject}
                className="px-3 py-2 bg-white border border-rose-200 text-[#C73E3A] hover:bg-rose-50 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Tolak Draf</span>
              </button>
              <button
                onClick={handleApprove}
                className="px-3.5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Otorisasi &amp; Setujui Eksekusi</span>
              </button>
            </>
          )}

          {approvalStatus === 'approved' && (
            <span className="px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Telah Disetujui (Siap Dijalankan)</span>
            </span>
          )}
        </div>
      </div>

      {/* 6-Step Workflow Stepper */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-3">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-none gap-2 text-xs">
          {steps.map((st, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <button
                key={st}
                onClick={() => setCurrentStep(stepNum)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-[#2563EB] text-white font-bold shadow-2xs'
                    : isCompleted
                    ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100/60 font-semibold'
                    : 'text-[#607080] hover:text-[#17212B]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-current text-[10px] flex items-center justify-center font-bold">
                    {stepNum}
                  </span>
                )}
                <span>{st}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Campaign Spec Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Campaign Overview & Target Breakdown (7 cols) */}
        <div className="xl:col-span-7 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4">
          <div className="pb-3 border-b border-[#DDE3EA] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">
                STRATEGI RETENSI · DRAF AKTIF
              </span>
              <h2 className="text-base font-bold text-[#17212B]">
                Retensi High Value Semarang Timur
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-50 text-[#D97706] font-bold text-xs border border-amber-200">
              RETAIN · Skor 91
            </span>
          </div>

          {/* Target Audience Numbers Strip */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
              <div className="text-[11px] text-[#607080]">Total Target Populasi</div>
              <div className="text-base font-bold text-[#17212B] mt-0.5 tabular-nums">
                12.480
              </div>
              <div className="text-[10px] text-[#607080]">Nasabah Teridentifikasi</div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="text-[11px] text-emerald-800">Dapat Dihubungi (Reachable)</div>
              <div className="text-base font-bold text-[#14804A] mt-0.5 tabular-nums">
                10.920
              </div>
              <div className="text-[10px] text-emerald-700">87,5% Lolos Kepatuhan</div>
            </div>

            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
              <div className="text-[11px] text-rose-800">Ditekan (Suppressed)</div>
              <div className="text-base font-bold text-[#C73E3A] mt-0.5 tabular-nums">
                1.560
              </div>
              <div className="text-[10px] text-rose-700">12,5% Alasan Kebijakan</div>
            </div>
          </div>

          {/* Suppression Reasons Box */}
          <div className="p-3 rounded-lg border border-[#DDE3EA] bg-slate-50 text-xs space-y-1.5">
            <div className="font-bold text-[#17212B]">Rincian Penekanan Kontak (Suppression Rules PDP):</div>
            <div className="grid grid-cols-3 gap-2 text-[11px] text-[#607080]">
              <div>• 720 tanpa izin kontak aktif</div>
              <div>• 540 frekuensi kontak penuh</div>
              <div>• 300 nomor telepon belum valid</div>
            </div>
          </div>

          {/* Channel Allocation */}
          <div>
            <div className="text-[11px] font-bold text-[#17212B] uppercase tracking-wider mb-2">
              Distribusi Kanal Komunikasi Terjadwal
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
              <div
                onClick={() => setActiveChannel('wa')}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                  activeChannel === 'wa' ? 'border-[#2563EB] bg-blue-50/50' : 'border-[#DDE3EA] bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-[#17212B]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0F7C7B]" />
                  <span>WhatsApp</span>
                </div>
                <div className="text-base font-bold text-[#2563EB] mt-1 tabular-nums">45%</div>
                <div className="text-[10px] text-[#607080]">4.914 Nasabah</div>
              </div>

              <div
                onClick={() => setActiveChannel('call')}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                  activeChannel === 'call' ? 'border-[#2563EB] bg-blue-50/50' : 'border-[#DDE3EA] bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-[#17212B]">
                  <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Telepon VIP</span>
                </div>
                <div className="text-base font-bold text-[#2563EB] mt-1 tabular-nums">25%</div>
                <div className="text-[10px] text-[#607080]">2.730 Nasabah</div>
              </div>

              <div
                onClick={() => setActiveChannel('push')}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                  activeChannel === 'push' ? 'border-[#2563EB] bg-blue-50/50' : 'border-[#DDE3EA] bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-[#17212B]">
                  <Bell className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Push Notif</span>
                </div>
                <div className="text-base font-bold text-[#2563EB] mt-1 tabular-nums">20%</div>
                <div className="text-[10px] text-[#607080]">2.184 Nasabah</div>
              </div>

              <div
                onClick={() => setActiveChannel('branch')}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                  activeChannel === 'branch' ? 'border-[#2563EB] bg-blue-50/50' : 'border-[#DDE3EA] bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-[#17212B]">
                  <Building2 className="w-3.5 h-3.5 text-[#C73E3A]" />
                  <span>Cabang</span>
                </div>
                <div className="text-base font-bold text-[#2563EB] mt-1 tabular-nums">10%</div>
                <div className="text-[10px] text-[#607080]">1.092 Nasabah</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Message Template Preview & Human Approval Box (5 cols) */}
        <div className="xl:col-span-5 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#DDE3EA] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                  PRATINJAU PESAN PERSONALISASI
                </span>
                <h3 className="font-bold text-sm text-[#17212B] mt-0.5">
                  Template: WhatsApp Bisnis Resmi
                </h3>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                Terverifikasi Centang Hijau
              </span>
            </div>

            {/* Simulated Smartphone Chat Bubble */}
            <div className="p-4 rounded-xl bg-[#EFEAE2] border border-[#DDE3EA] text-xs space-y-2">
              <div className="bg-white rounded-lg p-3 shadow-xs space-y-2 text-[#17212B]">
                <div className="font-bold text-[11px] text-[#0F7C7B]">
                  SERVEON Layanan Nasabah Prioritas
                </div>
                <p className="text-xs leading-relaxed text-slate-800">
                  Halo Bapak/Ibu <span className="bg-blue-100 px-1 rounded font-mono text-[11px]">{'{{nama}}'}</span>, terima kasih atas kepercayaan Anda menjadi mitra utama kami di wilayah <span className="bg-blue-100 px-1 rounded font-mono text-[11px]">{'{{wilayah}}'}</span>.
                </p>
                <p className="text-xs leading-relaxed text-slate-800">
                  Sebagai bentuk apresiasi, kami telah menyiapkan kupon layanan prioritas bebas antrean dan konsultasi khusus di <span className="bg-blue-100 px-1 rounded font-mono text-[11px]">{'{{cabang_terdekat}}'}</span>.
                </p>
                <div className="pt-1 text-[10px] text-slate-400 text-right">10.15 WIB · Terenkripsi E2E</div>
              </div>
            </div>

            {/* Governance Checklist */}
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Tata Kelola Komunikasi &amp; Etika AI</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-800">
                Pesan ini telah mematuhi pedoman frekuensi kontak (maks. 1 kontak per 14 hari) dan hanya dikirimkan kepada kontak yang telah memberikan persetujuan eksplisit.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDE3EA]">
            <button
              onClick={() => onNavigateToScreen('aktivitas-hasil')}
              className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Pantau Hasil Eksekusi di Dashboard Hasil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
