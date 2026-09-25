import React, { useState } from 'react';
import { X, CheckCircle2, Clock, AlertTriangle, ShieldCheck, UserCheck, ArrowRight, History } from 'lucide-react';
import { AreaDetailData } from './SharedAreaDrawer';
import { UserRole } from '../../types';

interface ApprovalWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AreaDetailData | null;
  currentUserRole: UserRole;
  onStatusChange?: (newStatus: string) => void;
}

export const ApprovalWorkflowModal: React.FC<ApprovalWorkflowModalProps> = ({
  isOpen,
  onClose,
  data,
  currentUserRole,
  onStatusChange
}) => {
  const [currentStatus, setCurrentStatus] = useState<string>(
    data?.recommendedAction.approvalStatus || 'Menunggu Review'
  );
  const [notes, setNotes] = useState('');
  const [auditLog, setAuditLog] = useState([
    {
      timestamp: '22 Sep 2026, 21.30 WIB',
      user: 'SERVEON Recommendation Engine',
      action: 'Rekomendasi Diterbitkan',
      role: 'Automated Agent',
      note: 'Dihasilkan otomatis berdasarkan evaluasi ambang batas risiko >75.'
    },
    {
      timestamp: '22 Sep 2026, 22.15 WIB',
      user: 'Dewi Lestari',
      action: 'Diajukan ke Review Bisnis',
      role: 'Business / Marketing',
      note: 'Target audiens disesuaikan dengan contact policy capping 30 hari.'
    }
  ]);

  if (!isOpen || !data) return null;

  const steps = [
    'Draft',
    'Menunggu Review',
    'Menunggu Persetujuan',
    'Disetujui',
    'Dalam Pelaksanaan',
    'Selesai'
  ];

  const currentStepIndex = steps.indexOf(currentStatus);

  const handleApprove = () => {
    const nextStatus = 'Disetujui';
    setCurrentStatus(nextStatus);
    setAuditLog([
      {
        timestamp: '23 Sep 2026, 09.05 WIB',
        user: `Johanes (${currentUserRole})`,
        action: 'Persetujuan Diberikan',
        role: currentUserRole,
        note: notes || 'Disetujui setelah verifikasi alokasi anggaran dan ketersediaan relasi cabang.'
      },
      ...auditLog
    ]);
    if (onStatusChange) onStatusChange(nextStatus);
  };

  const handleReject = () => {
    const nextStatus = 'Ditolak';
    setCurrentStatus(nextStatus);
    setAuditLog([
      {
        timestamp: '23 Sep 2026, 09.05 WIB',
        user: `Johanes (${currentUserRole})`,
        action: 'Rekomendasi Dikembalikan / Ditolak',
        role: currentUserRole,
        note: notes || 'Perlu penyesuaian segmentasi audiens sasaran.'
      },
      ...auditLog
    ]);
    if (onStatusChange) onStatusChange(nextStatus);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#DDE3EA] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#DDE3EA] flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#15324B] text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#607080] uppercase tracking-wider">
                Human-in-the-Loop Governance
              </div>
              <h3 className="font-bold text-sm text-[#17212B]">
                Tata Kelola &amp; Persetujuan Aksi ({data.name})
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs text-[#17212B]">
          {/* Workflow Stepper */}
          <div>
            <div className="text-[11px] font-semibold text-[#607080] mb-2 uppercase tracking-wider">
              Tahapan Siklus Hidup Rekomendasi
            </div>
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                          isCurrent
                            ? 'bg-[#2563EB] text-white ring-4 ring-blue-100'
                            : isPassed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>
                      <span
                        className={`text-[9.5px] mt-1 whitespace-nowrap ${
                          isCurrent ? 'font-bold text-[#2563EB]' : 'text-slate-500'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`h-0.5 w-6 sm:w-10 mx-1 mb-4 ${
                          idx < currentStepIndex ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Details */}
          <div className="p-3.5 rounded-xl border border-[#DDE3EA] bg-slate-50 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-[#607080] uppercase">Tindakan Rekomendasi</span>
                <h4 className="font-bold text-sm text-[#17212B] mt-0.5">{data.recommendedAction.title}</h4>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                {currentStatus}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">{data.recommendedAction.description}</p>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-200">
              <div>PIC Pemilik: <strong>{data.recommendedAction.owner}</strong></div>
              <div>Penyetujui Wajib: <strong>{data.recommendedAction.approver}</strong></div>
              <div>Target Jangkauan: <strong>{data.recommendedAction.targetAudience}</strong></div>
              <div>Kanal Terpilih: <strong>{data.recommendedAction.preferredChannels}</strong></div>
            </div>
          </div>

          {/* Decision Safeguard Notice */}
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Pengamanan Kebijakan:</strong> Tindakan komunikasi massal, penyesuaian tarif, atau komitmen investasi jaringan <strong>tidak dapat dieksekusi secara otomatis</strong> oleh sistem. Persetujuan eksplisit dari pemegang wewenang mutlak diperlukan.
            </div>
          </div>

          {/* Approval Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#17212B]">Catatan Evaluasi / Persetujuan:</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tambahkan catatan pertimbangan bisnis atau syarat pelaksanaan..."
              className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3EA] bg-white text-[#17212B] focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Audit Trail History */}
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#607080] mb-2 uppercase tracking-wider">
              <History className="w-3.5 h-3.5" />
              <span>Jejak Audit Persetujuan (Audit Trail)</span>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {auditLog.map((log, idx) => (
                <div key={idx} className="p-2 rounded-lg border border-slate-100 bg-white text-[11px] space-y-0.5">
                  <div className="flex justify-between font-semibold text-[#17212B]">
                    <span>{log.action}</span>
                    <span className="text-slate-400 font-normal">{log.timestamp}</span>
                  </div>
                  <div className="text-slate-600">
                    Oleh: {log.user} ({log.role})
                  </div>
                  <div className="text-slate-500 text-[10px] italic">“{log.note}”</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#DDE3EA] bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 border border-[#DDE3EA] bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold"
          >
            Tutup
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReject}
              className="px-3 py-1.5 border border-red-300 text-red-700 hover:bg-red-50 rounded-lg text-xs font-semibold"
            >
              Tolak / Minta Revisi
            </button>
            <button
              onClick={handleApprove}
              className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Beri Persetujuan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
