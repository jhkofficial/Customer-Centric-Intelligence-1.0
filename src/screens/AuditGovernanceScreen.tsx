import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Download,
  Filter,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
  FileText
} from 'lucide-react';
import { AUDIT_EVENTS } from '../data/mockData';
import { ScreenId, AuditEvent } from '../types';

interface AuditGovernanceScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const AuditGovernanceScreen: React.FC<AuditGovernanceScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(AUDIT_EVENTS[0]);
  const [dataMaskingActive, setDataMaskingActive] = useState(true);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
              Audit Trail &amp; Tata Kelola AI
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              Kepatuhan UU PDP No. 27/2022
            </span>
          </div>
          <p className="text-xs text-[#607080]">
            Log kepatuhan forensik, otorisasi persetujuan pengguna, ekspor data, dan penyamaran identitas otomatis.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#DDE3EA] bg-white text-xs cursor-pointer">
            <Lock className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="font-semibold text-[#17212B]">Penyamaran Data Otomatis:</span>
            <input
              type="checkbox"
              checked={dataMaskingActive}
              onChange={(e) => {
                setDataMaskingActive(e.target.checked);
                onShowToast(e.target.checked ? 'Penyamaran data PDP diaktifkan.' : 'Mode audit unmasked diajukan.');
              }}
              className="rounded text-[#2563EB] cursor-pointer"
            />
          </label>

          <button
            onClick={() => onShowToast('Log audit resmi (Immutable Hash) telah diekspor.')}
            className="px-3.5 py-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#607080]" />
            <span>Ekspor Log Audit</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Audit Table (8 cols) + Event Detail Payload (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-8 bg-white border border-[#DDE3EA] rounded-xl overflow-hidden shadow-2xs">
          <div className="p-3.5 border-b border-[#DDE3EA] bg-slate-50/50 flex items-center justify-between text-xs">
            <span className="font-bold text-[#17212B]">Daftar Rekord Audit Terenkripsi</span>
            <span className="text-[#607080]">Total {AUDIT_EVENTS.length} Rekord Terverifikasi</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F7FA] text-[#607080] font-semibold border-b border-[#DDE3EA]">
                <tr>
                  <th className="py-2.5 px-3">Waktu (WIB)</th>
                  <th className="py-2.5 px-3">Pengguna &amp; Peran</th>
                  <th className="py-2.5 px-3">Tindakan</th>
                  <th className="py-2.5 px-3">Target</th>
                  <th className="py-2.5 px-3">Tingkat Risiko</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE3EA]">
                {AUDIT_EVENTS.map((evt) => {
                  const isSelected = selectedEvent?.id === evt.id;
                  return (
                    <tr
                      key={evt.id}
                      onClick={() => setSelectedEvent(evt)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 text-[#607080] font-mono text-[11px] whitespace-nowrap">
                        {evt.timestamp}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-[#17212B]">{evt.userName}</div>
                        <div className="text-[10px] text-[#607080]">{evt.role}</div>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-[#17212B]">{evt.action}</td>
                      <td className="py-2.5 px-3 text-[#607080]">{evt.objectId}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            evt.riskLevel === 'Tinggi'
                              ? 'bg-rose-50 text-[#C73E3A]'
                              : evt.riskLevel === 'Sedang'
                              ? 'bg-amber-50 text-[#D97706]'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {evt.riskLevel}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="text-[10px] font-semibold text-emerald-700 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{evt.result}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Selected Event Payload & Verification Hash */}
        <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4 flex flex-col justify-between">
          {selectedEvent ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#DDE3EA]">
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                  DETAIL REKORD AUDIT
                </span>
                <h3 className="font-bold text-sm text-[#17212B] mt-0.5">
                  {selectedEvent.action}
                </h3>
                <div className="text-[10px] font-mono text-[#607080] mt-0.5">
                  Correlation ID: {selectedEvent.correlationId}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#607080]">Waktu Pencatatan:</span>
                  <span className="font-mono text-[#17212B]">{selectedEvent.timestamp}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#607080]">Pengguna Otorisasi:</span>
                  <span className="font-semibold text-[#17212B]">
                    {selectedEvent.userName} ({selectedEvent.role})
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#607080]">Objek Sasaran:</span>
                  <span className="font-semibold text-[#2563EB]">{selectedEvent.objectId}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#607080]">Tingkat Risiko:</span>
                  <span className="font-bold">{selectedEvent.riskLevel}</span>
                </div>
              </div>

              {/* Immutable Hash Verification */}
              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA] space-y-1">
                <div className="text-[10px] font-bold text-[#607080] uppercase">
                  SHA-256 Chain Verification Hash
                </div>
                <div className="font-mono text-[10px] text-slate-600 break-all">
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Integritas Log Tidak Dimanipulasi</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#607080] text-xs">
              Pilih salah satu baris audit untuk meninjau data payload.
            </div>
          )}

          <div className="pt-3 border-t border-[#DDE3EA] text-[10px] text-[#607080] text-center">
            Penyimpanan log retensi minimum 5 tahun sesuai regulasi perbankan &amp; PDP.
          </div>
        </div>
      </div>
    </div>
  );
};
