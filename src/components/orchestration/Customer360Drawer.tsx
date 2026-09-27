import React from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Bike,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Clock,
  Calendar,
  MessageSquare,
  Lock,
  Building2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ProspectProfile } from '../../types/orchestration';

interface Customer360DrawerProps {
  prospect: ProspectProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onTriggerFollowUpModal?: (prospect: ProspectProfile) => void;
  onOpenFollowUpModal?: (prospect: ProspectProfile) => void;
  onAskAIWhy?: (question: string) => void;
  onOpenAiExplanation?: (prospect: ProspectProfile) => void;
  onShowToast?: (msg: string) => void;
}

export const Customer360Drawer: React.FC<Customer360DrawerProps> = ({
  prospect,
  isOpen,
  onClose,
  onTriggerFollowUpModal,
  onOpenFollowUpModal,
  onAskAIWhy,
  onOpenAiExplanation,
  onShowToast
}) => {
  if (!isOpen || !prospect) return null;

  const triggerFollowUp = onOpenFollowUpModal || onTriggerFollowUpModal;
  const triggerAi = onOpenAiExplanation || ((p: ProspectProfile) => onAskAIWhy && onAskAIWhy(`Kenapa ${p.name}?`));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-2xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-xl bg-white border-l border-[#DDE3EA] shadow-2xl h-full flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Top Header */}
        <div>
          <div className="p-5 border-b border-[#DDE3EA] flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-base shadow-sm">
                {prospect.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{prospect.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      prospect.isDoNotContact
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : prospect.isConverted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {prospect.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  ID: <span className="font-mono text-slate-700">{prospect.id}</span> · {prospect.city} · PIC: {prospect.assignedSales}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Do Not Contact Privacy Banner (Section 17) */}
          {prospect.isDoNotContact && (
            <div className="p-3.5 bg-rose-50 border-b border-rose-200 flex items-center gap-2.5 text-xs text-rose-900">
              <Lock className="w-4 h-4 text-rose-600 shrink-0" />
              <div>
                <strong className="block text-[11px] font-bold">🔒 STATUS: DO NOT CONTACT (OPT-OUT)</strong>
                Konsumen telah mencabut izin komunikasi promosi. Seluruh task sales, bot WA, dan kampanye otomatis dinonaktifkan.
              </div>
            </div>
          )}

          {/* Purchased Other Branch Banner (Section 16) */}
          {prospect.isPurchasedOtherBranch && (
            <div className="p-3.5 bg-emerald-50 border-b border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-[11px] font-bold">ONE CUSTOMER VIEW: PEMBELIAN CABANG LAIN</strong>
                Konsumen telah menyelesaikan pembelian di cabang rekanan. Otomatis beralih ke Post-Purchase Journey &amp; Loyalty.
              </div>
            </div>
          )}

          {/* 5 Prominent Cards (Section 23) */}
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">Customer Intent</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">
                  {prospect.intentLevel} ({prospect.leadScore}/100)
                </div>
                <div className="text-[10.5px] text-slate-600 mt-0.5">{prospect.productInterest}</div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">Current Barrier</span>
                <div className="font-bold text-slate-900 text-xs mt-0.5 truncate">
                  {prospect.lastReason || 'Finansial'}
                </div>
                <div className="text-[10.5px] text-amber-900 truncate mt-0.5">
                  {prospect.lastSubReason || 'Pertimbangan Angsuran'}
                </div>
              </div>
            </div>

            {/* AI Next Best Action Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/80 to-purple-50/60 border border-indigo-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  AI Next Best Action
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                  Prioritas {prospect.priority}
                </span>
              </div>
              <p className="font-semibold text-slate-900 leading-relaxed text-xs">
                {prospect.customerBarrier
                  ? `Atasi hambatan "${prospect.lastSubReason || prospect.customerBarrier}" dengan skema pembiayaan alternatif DP 15% via ${prospect.preferredChannel}.`
                  : `Lakukan pendekatan personal untuk menjadwalkan test drive ${prospect.productInterest}.`}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-purple-200/60">
                <span>Rekomendasi Waktu: <strong>Hari ini, 16.00 – 18.00 WIB</strong></span>
                {onAskAIWhy && (
                  <button
                    onClick={() => onAskAIWhy(`Mengapa SERVEON merekomendasikan tindakan ini untuk ${prospect.name}?`)}
                    className="text-purple-700 font-bold hover:underline"
                  >
                    Mengapa tindakan ini? →
                  </button>
                )}
              </div>
            </div>

            {/* Profile Attributes Grid */}
            <div className="space-y-2 text-xs">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Informasi Kontak &amp; Sosio-Ekonomi
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 divide-y divide-slate-200 text-xs">
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-500">Nomor Telepon:</span>
                  <strong className="text-slate-900 font-mono">{prospect.phone}</strong>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-slate-800">{prospect.email}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-500">Kota Domisili:</span>
                  <span className="text-slate-800">{prospect.city}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-500">Cabang Penanggung Jawab:</span>
                  <span className="text-slate-800">{prospect.branch}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-500">Kepemilikan Motor Saat Ini:</span>
                  <span className="text-slate-800">{prospect.vehicleOwnership || 'Belum terdata'}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-500">Estimasi Pengeluaran Bulanan:</span>
                  <span className="text-slate-800">{prospect.monthlyExpenditure || 'Rp3.500.000'}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-500">Kanal Komunikasi Pilihan:</span>
                  <span className="text-blue-700 font-bold">{prospect.preferredChannel}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-500">Percobaan Kontak:</span>
                  <span className="text-slate-800 font-mono">
                    {prospect.contactAttempts} / {prospect.maxContactAttempts} Kali
                  </span>
                </div>
              </div>
            </div>

            {/* Sales Notes */}
            <div className="space-y-1.5 text-xs">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Catatan Terakhir Sales
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs leading-relaxed">
                {prospect.notes}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#DDE3EA] bg-slate-50 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500">
            SLA Response: <strong>{prospect.slaHoursRemaining} Jam Tersisa</strong>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Tutup
            </button>
            {onTriggerFollowUpModal && !prospect.isDoNotContact && (
              <button
                onClick={() => {
                  onTriggerFollowUpModal(prospect);
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Catat Follow-Up</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
