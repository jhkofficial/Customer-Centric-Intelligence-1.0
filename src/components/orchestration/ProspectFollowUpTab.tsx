import React, { useState } from 'react';
import {
  Search,
  Filter,
  Users,
  Phone,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building2,
  FileText,
  UserCheck,
  Flame,
  HelpCircle,
  Eye,
  RefreshCw,
  Download
} from 'lucide-react';
import { ProspectProfile } from '../../types/orchestration';
import { INITIAL_PROSPECTS } from '../../data/orchestrationData';

interface ProspectFollowUpTabProps {
  prospects: ProspectProfile[];
  onOpenFollowUpModal: (prospect: ProspectProfile) => void;
  onOpenCustomerDrawer: (prospect: ProspectProfile) => void;
  onOpenAiExplanation: (prospect: ProspectProfile) => void;
  onShowToast: (msg: string) => void;
}

export const ProspectFollowUpTab: React.FC<ProspectFollowUpTabProps> = ({
  prospects,
  onOpenFollowUpModal,
  onOpenCustomerDrawer,
  onOpenAiExplanation,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('all');
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>('all');

  const filteredProspects = prospects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.productInterest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.branch.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus =
      selectedStatusFilter === 'all'
        ? true
        : selectedStatusFilter === 'hot'
        ? p.status === 'Hot Prospect' || p.leadScore >= 80
        : selectedStatusFilter === 'financing'
        ? p.status === 'Financing Barrier' || p.lastReason?.includes('Financing')
        : selectedStatusFilter === 'deferred'
        ? p.status === 'Deferred'
        : selectedStatusFilter === 'no-response'
        ? p.status === 'No Response'
        : selectedStatusFilter === 'converted'
        ? p.isConverted
        : true;

    const matchPriority =
      selectedPriorityFilter === 'all' ? true : p.priority === selectedPriorityFilter;

    const matchProduct =
      selectedProductFilter === 'all' ? true : p.productInterest.includes(selectedProductFilter);

    return matchSearch && matchStatus && matchPriority && matchProduct;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Hot Prospect':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Financing Barrier':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Deferred':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Test Drive Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Negotiation':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'No Response':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Deal Closed':
      case 'Purchased Other Branch':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-red-600 text-white font-extrabold';
      case 'HIGH':
        return 'bg-orange-500 text-white font-bold';
      case 'MEDIUM':
        return 'bg-blue-500 text-white font-semibold';
      default:
        return 'bg-slate-400 text-white font-normal';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Operational Summary Bar */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DDE3EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                OPERATIONAL PIPELINE
              </span>
              <span className="text-xs text-slate-500">
                Pembaruan Real-Time · Astra Motor Jawa Tengah
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Workspace Tindak Lanjut Prospek (Prospect Follow-Up)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola respon nyata konsumen, hambatan finansial, alasan penundaan, serta pencatatan terstruktur tanpa sekadar opsi Beli / Tidak Beli.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('Daftar antrean prospek berhasil disinkronkan dengan DMS cabang.')}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sinkronkan DMS</span>
            </button>
            <button
              onClick={() => onShowToast('Mengekspor data operasional follow-up ke CSV...')}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-[#DDE3EA] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Log Follow-Up</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Counts Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 text-xs">
          <button
            onClick={() => setSelectedStatusFilter('all')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedStatusFilter === 'all'
                ? 'border-[#2563EB] bg-blue-50/50 shadow-2xs font-bold text-[#2563EB]'
                : 'border-[#DDE3EA] bg-white text-slate-700'
            }`}
          >
            <div className="text-[10px] text-slate-500">Semua Prospek</div>
            <div className="text-base font-extrabold mt-0.5">{prospects.length}</div>
          </button>

          <button
            onClick={() => setSelectedStatusFilter('hot')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedStatusFilter === 'hot'
                ? 'border-rose-500 bg-rose-50/60 shadow-2xs font-bold text-rose-700'
                : 'border-[#DDE3EA] bg-white text-slate-700'
            }`}
          >
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-500" />
              <span>Hot Prospect</span>
            </div>
            <div className="text-base font-extrabold text-rose-600 mt-0.5">
              {prospects.filter((p) => p.status === 'Hot Prospect' || p.leadScore >= 80).length}
            </div>
          </button>

          <button
            onClick={() => setSelectedStatusFilter('financing')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedStatusFilter === 'financing'
                ? 'border-amber-500 bg-amber-50/60 shadow-2xs font-bold text-amber-800'
                : 'border-[#DDE3EA] bg-white text-slate-700'
            }`}
          >
            <div className="text-[10px] text-slate-500">Kendala Finansial</div>
            <div className="text-base font-extrabold text-amber-700 mt-0.5">
              {prospects.filter((p) => p.status === 'Financing Barrier' || p.lastReason?.includes('Financing')).length}
            </div>
          </button>

          <button
            onClick={() => setSelectedStatusFilter('deferred')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedStatusFilter === 'deferred'
                ? 'border-yellow-500 bg-yellow-50/60 shadow-2xs font-bold text-yellow-800'
                : 'border-[#DDE3EA] bg-white text-slate-700'
            }`}
          >
            <div className="text-[10px] text-slate-500">Tunda Beli (Deferred)</div>
            <div className="text-base font-extrabold text-yellow-700 mt-0.5">
              {prospects.filter((p) => p.status === 'Deferred').length}
            </div>
          </button>

          <button
            onClick={() => setSelectedStatusFilter('no-response')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedStatusFilter === 'no-response'
                ? 'border-slate-500 bg-slate-100 shadow-2xs font-bold text-slate-800'
                : 'border-[#DDE3EA] bg-white text-slate-700'
            }`}
          >
            <div className="text-[10px] text-slate-500">No Response</div>
            <div className="text-base font-extrabold text-slate-700 mt-0.5">
              {prospects.filter((p) => p.status === 'No Response').length}
            </div>
          </button>

          <button
            onClick={() => setSelectedStatusFilter('converted')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedStatusFilter === 'converted'
                ? 'border-emerald-500 bg-emerald-50/60 shadow-2xs font-bold text-emerald-800'
                : 'border-[#DDE3EA] bg-white text-slate-700'
            }`}
          >
            <div className="text-[10px] text-slate-500">Deal Closed</div>
            <div className="text-base font-extrabold text-emerald-700 mt-0.5">
              {prospects.filter((p) => p.isConverted).length}
            </div>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="mt-4 pt-3 border-t border-[#DDE3EA] flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama prospek, nomor telepon, produk (CB150R, PCX), atau cabang..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <select
              value={selectedPriorityFilter}
              onChange={(e) => setSelectedPriorityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg py-2 px-3 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">Semua Prioritas</option>
              <option value="CRITICAL">Critical SLA (&lt;2 Jam)</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
            </select>

            <select
              value={selectedProductFilter}
              onChange={(e) => setSelectedProductFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg py-2 px-3 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">Semua Produk</option>
              <option value="CB150R">Honda CB150R</option>
              <option value="PCX">Honda PCX 160</option>
              <option value="Scoopy">Honda Scoopy</option>
              <option value="ADV">Honda ADV 160</option>
              <option value="Stylo">Honda Stylo 160</option>
              <option value="BeAT">Honda BeAT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prospects Workspace Table */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#DDE3EA] text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Prospek &amp; Lokasi</th>
                <th className="py-3 px-4">Minat Produk &amp; Skor</th>
                <th className="py-3 px-4">Status &amp; Hambatan Teridentifikasi</th>
                <th className="py-3 px-4">Interaksi Terakhir</th>
                <th className="py-3 px-4">Jadwal &amp; SLA</th>
                <th className="py-3 px-4">PIC Sales</th>
                <th className="py-3 px-4 text-center">Aksi Operasional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE3EA]">
              {filteredProspects.map((prospect) => (
                <tr
                  key={prospect.id}
                  className="hover:bg-blue-50/20 transition-colors group"
                >
                  {/* Prospect & Location */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                        {prospect.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                          <span>{prospect.name}</span>
                          <span
                            className={`text-[9px] px-1 rounded ${getPriorityBadge(
                              prospect.priority
                            )}`}
                          >
                            {prospect.priority}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {prospect.phone}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3" />
                          <span>{prospect.branch}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Product & Score */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{prospect.productInterest}</div>
                    {prospect.previousProductInterest && prospect.previousProductInterest !== prospect.productInterest && (
                      <div className="text-[10px] text-amber-600 font-medium">
                        Beralih dari: {prospect.previousProductInterest}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        Skor: {prospect.leadScore}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          prospect.intentLevel === 'HIGH'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {prospect.intentLevel} INTENT
                      </span>
                    </div>
                  </td>

                  {/* Status & Barrier */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border mb-1 ${getStatusBadge(
                        prospect.status
                      )}`}
                    >
                      {prospect.status}
                    </span>
                    {prospect.customerBarrier && (
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {prospect.customerBarrier}
                      </p>
                    )}
                    {prospect.lastSubReason && (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded inline-block mt-1">
                        Sub-Reason: {prospect.lastSubReason}
                      </span>
                    )}
                  </td>

                  {/* Last Interaction */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-800">
                      {prospect.lastChannel === 'WhatsApp' ? (
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      ) : prospect.lastChannel === 'Phone' ? (
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <Building2 className="w-3.5 h-3.5 text-purple-600" />
                      )}
                      <span>{prospect.lastChannel}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {prospect.lastInteractionDate} · {prospect.lastInteractionTime}
                    </div>
                    {prospect.lastOutcome && (
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[150px]">
                        {prospect.lastOutcome}
                      </div>
                    )}
                  </td>

                  {/* Schedule & SLA */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{prospect.nextFollowUpDate}</span>
                    </div>
                    {prospect.slaHoursRemaining > 0 ? (
                      <div className="flex items-center gap-1 text-[10.5px] font-bold text-amber-600 mt-1">
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>Sisa SLA: {prospect.slaHoursRemaining} Jam</span>
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-400 mt-1">SLA Terpenuhi</div>
                    )}
                  </td>

                  {/* PIC Sales */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{prospect.assignedSales}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Kontak ke-{prospect.contactAttempts} dari {prospect.maxContactAttempts}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onOpenFollowUpModal(prospect)}
                        className="px-2.5 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1 whitespace-nowrap"
                        title="Catat Hasil Tindak Lanjut"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Catat Hasil</span>
                      </button>

                      <button
                        onClick={() => onOpenAiExplanation(prospect)}
                        className="p-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-[11px] transition-colors"
                        title="Next Best Action AI"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenCustomerDrawer(prospect)}
                        className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] transition-colors"
                        title="Lihat Profil 360"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProspects.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            Tidak ada prospek yang sesuai dengan kriteria pencarian atau filter yang dipilih.
          </div>
        )}
      </div>
    </div>
  );
};
