import React, { useState } from 'react';
import {
  Users,
  Flame,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Percent,
  XCircle,
  FileCheck2,
  Calendar,
  ArrowRight,
  Filter,
  Eye,
  Layers,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { ORCHESTRATION_FUNNEL_STAGES, INITIAL_PROSPECTS } from '../../data/orchestrationData';
import { ProspectProfile } from '../../types/orchestration';

interface OrchestrationOverviewTabProps {
  onSelectProspect: (prospect: ProspectProfile) => void;
  onNavigateSubmenu: (submenu: any) => void;
  onOpenFollowUpModal: (prospect: ProspectProfile) => void;
  onShowToast: (msg: string) => void;
}

export const OrchestrationOverviewTab: React.FC<OrchestrationOverviewTabProps> = ({
  onSelectProspect,
  onNavigateSubmenu,
  onOpenFollowUpModal,
  onShowToast
}) => {
  const [selectedFunnelStage, setSelectedFunnelStage] = useState<string | null>(null);

  // 10 KPI Cards (Section 2)
  const kpis = [
    { label: 'Active Prospects', value: '12.480', subtext: 'Sedang Berjalan', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50/70' },
    { label: 'Hot Prospects', value: '1.842', subtext: 'Skor Minat > 80', icon: Flame, color: 'text-rose-600', bg: 'bg-rose-50/70' },
    { label: 'Prospects in Nurture', value: '3.420', subtext: 'Alur Edukasi Terjadwal', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50/70' },
    { label: 'Follow-Up Due Today', value: '428', subtext: 'SLA < 12 Jam', icon: PhoneCall, color: 'text-indigo-600', bg: 'bg-indigo-50/70' },
    { label: 'Re-Engaged Prospects', value: '312', subtext: 'Sinyal Digital Baru', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50/70' },
    { label: 'Conversion Rate', value: '18,4%', subtext: '+2,3% vs Bulan Lalu', icon: Percent, color: 'text-emerald-600', bg: 'bg-emerald-50/70' },
    { label: 'No Response Rate', value: '14,8%', subtext: 'Contact Policy Enforced', icon: AlertTriangle, color: 'text-slate-600', bg: 'bg-slate-50' },
    { label: 'Deferred Prospects', value: '1.154', subtext: 'Tunda Beli 30–90 Hari', icon: Calendar, color: 'text-amber-700', bg: 'bg-amber-50/50' },
    { label: 'Lost Prospects', value: '624', subtext: 'Analisis Win/Loss Aktif', icon: XCircle, color: 'text-red-700', bg: 'bg-red-50/50' },
    { label: 'Deal Closed', value: '824', subtext: 'Konversi ke Nasabah', icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50/90' }
  ];

  const filteredProspects = selectedFunnelStage
    ? INITIAL_PROSPECTS.filter((p) => {
        if (selectedFunnelStage === 'interested') return p.status === 'Interested' || p.status === 'Financing Barrier' || p.status === 'Deferred';
        if (selectedFunnelStage === 'test-drive') return p.status === 'Test Drive Scheduled' || p.status === 'Hot Prospect';
        if (selectedFunnelStage === 'negotiation') return p.status === 'Negotiation';
        if (selectedFunnelStage === 'closed') return p.status === 'Deal Closed' || p.status === 'Purchased Other Branch';
        return true;
      })
    : INITIAL_PROSPECTS;

  return (
    <div className="space-y-6">
      {/* 10 Executive Operational KPI Cards (Section 2) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border border-[#DDE3EA] ${kpi.bg} shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider">{kpi.label}</span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div>
                <div className={`text-xl font-extrabold tabular-nums ${kpi.color}`}>{kpi.value}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{kpi.subtext}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Large Interactive Pipeline Funnel (Section 2) */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DDE3EA]">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Orchestrated Customer Funnel (End-to-End Pipeline)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik setiap tahapan funnel untuk memfilter dan membedah daftar prospek aktif di bawah.
            </p>
          </div>
          {selectedFunnelStage && (
            <button
              onClick={() => setSelectedFunnelStage(null)}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Reset Filter Funnel (Tampilkan Semua)
            </button>
          )}
        </div>

        {/* Funnel Visual Pipeline Bars */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 pt-2">
          {ORCHESTRATION_FUNNEL_STAGES.map((st, idx) => {
            const isSelected = selectedFunnelStage === st.id;
            return (
              <div
                key={st.id}
                onClick={() => setSelectedFunnelStage(isSelected ? null : st.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'ring-2 ring-blue-600 bg-blue-50/80 border-blue-500 shadow-sm'
                    : 'bg-[#F5F7FA] border-[#DDE3EA] hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tahap {idx + 1}</span>
                  <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    {st.conversionRate}
                  </span>
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900">{st.count.toLocaleString('id-ID')}</div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5 leading-snug">{st.label}</div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Drill down</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drill-down Prospect Table */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Antrean Prospek &amp; Tindak Lanjut Aktif {selectedFunnelStage ? `(Filter: ${selectedFunnelStage.toUpperCase()})` : ''}
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {filteredProspects.length} Prospek
            </span>
          </div>

          <button
            onClick={() => onNavigateSubmenu('prospect-followup')}
            className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
          >
            <span>Buka Workspace Follow-Up Lengkap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto border border-[#DDE3EA] rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F7FA] text-slate-700 border-b border-[#DDE3EA] text-[11px] font-bold">
              <tr>
                <th className="p-3">Nama Prospek</th>
                <th className="p-3">Unit Minat</th>
                <th className="p-3 text-center">Lead Score</th>
                <th className="p-3">Status Saat Ini</th>
                <th className="p-3">Hambatan Konsumen</th>
                <th className="p-3">Follow-Up Berikutnya</th>
                <th className="p-3">Sales PIC</th>
                <th className="p-3 text-right">Aksi Operasional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE3EA]">
              {filteredProspects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <button
                      onClick={() => onSelectProspect(p)}
                      className="font-bold text-slate-900 hover:text-blue-600 text-left cursor-pointer"
                    >
                      {p.name}
                    </button>
                    <div className="text-[10px] text-slate-500 font-mono">{p.phone} · {p.city}</div>
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{p.productInterest}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded font-black text-[11px] font-mono ${
                        p.leadScore >= 80
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : p.leadScore >= 60
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {p.leadScore}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10.5px] font-bold whitespace-nowrap ${
                        p.isDoNotContact
                          ? 'bg-rose-100 text-rose-800'
                          : p.isConverted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 max-w-xs text-slate-600 truncate text-[11px]">
                    {p.customerBarrier || p.notes}
                  </td>
                  <td className="p-3 font-medium text-slate-700 whitespace-nowrap">
                    {p.nextFollowUpDate}
                  </td>
                  <td className="p-3 text-slate-700 whitespace-nowrap">{p.assignedSales.split(' ')[0]}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectProspect(p)}
                        className="px-2.5 py-1 bg-white border border-[#DDE3EA] hover:bg-slate-100 text-slate-700 rounded-lg font-semibold text-[11px] transition-colors"
                      >
                        Detail 360°
                      </button>
                      {!p.isDoNotContact && (
                        <button
                          onClick={() => onOpenFollowUpModal(p)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[11px] transition-colors"
                        >
                          Catat Hasil
                        </button>
                      )}
                    </div>
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
