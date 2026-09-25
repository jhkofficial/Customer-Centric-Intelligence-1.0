import React, { useState } from 'react';
import {
  ListFilter,
  CheckCircle2,
  TrendingUp,
  Download,
  ArrowRight,
  Sparkles,
  Sliders,
  ChevronRight,
  X
} from 'lucide-react';
import { StrategyBadge } from '../components/common/StrategyBadge';
import { STRATEGIC_PRIORITIES } from '../data/mockData';
import { ScreenId, StrategicPriority } from '../types';

interface StrategicRankingScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onOpenAgentModal: (prompt?: string) => void;
  onShowToast: (msg: string) => void;
}

export const StrategicRankingScreen: React.FC<StrategicRankingScreenProps> = ({
  onNavigateToScreen,
  onOpenAgentModal,
  onShowToast
}) => {
  const [strategyTab, setStrategyTab] = useState<'ALL' | 'DEFEND' | 'RETAIN' | 'ACQUIRE'>('ALL');
  const [method, setMethod] = useState<'weighted' | 'ahp' | 'topsis' | 'ml'>('ahp');
  const [selectedIds, setSelectedIds] = useState<string[]>(['prio-1', 'prio-2']);

  const filteredList = STRATEGIC_PRIORITIES.filter((p) => {
    if (strategyTab === 'ALL') return true;
    return p.strategy === strategyTab;
  });

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 3) {
        onShowToast('Maksimal membandingkan 3 wilayah sekaligus.');
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const comparedPriorities = STRATEGIC_PRIORITIES.filter((p) => selectedIds.includes(p.id));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Peringkat Strategis &amp; Keputusan Terpadu
          </h1>
          <p className="text-xs text-[#607080]">
            Tabel keputusan holistik mengintegrasikan prioritas RETAIN, DEFEND, dan ACQUIRE di seluruh Jawa Tengah.
          </p>
        </div>

        {/* Method Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-white border border-[#DDE3EA] rounded-xl text-xs">
            {[
              { id: 'ahp', label: 'Metode AHP' },
              { id: 'topsis', label: 'Metode TOPSIS' },
              { id: 'weighted', label: 'Weighted Scoring' },
              { id: 'ml', label: 'ML-Supported' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id as any)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  method === m.id
                    ? 'bg-[#2563EB] text-white shadow-2xs'
                    : 'text-[#607080] hover:text-[#17212B]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onShowToast('Daftar peringkat strategis diunduh (XLSX).')}
            className="p-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg transition-colors shadow-2xs"
            title="Ekspor Data"
          >
            <Download className="w-4 h-4 text-[#607080]" />
          </button>
        </div>
      </div>

      {/* Strategy Tabs Bar */}
      <div className="flex items-center justify-between border-b border-[#DDE3EA] pb-1">
        <div className="flex items-center gap-1 text-xs">
          {(['ALL', 'DEFEND', 'RETAIN', 'ACQUIRE'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStrategyTab(tab)}
              className={`px-4 py-2 border-b-2 font-semibold transition-all ${
                strategyTab === tab
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-[#607080] hover:text-[#17212B]'
              }`}
            >
              {tab === 'ALL' ? 'Semua Strategi' : tab}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#607080]">
          Menampilkan <strong>{filteredList.length}</strong> area prioritas aktif
        </span>
      </div>

      {/* Main Ranking Table */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F7FA] text-[#607080] font-semibold border-b border-[#DDE3EA]">
              <tr>
                <th className="py-3 px-3 w-10 text-center">Bandingkan</th>
                <th className="py-3 px-3">Peringkat &amp; Wilayah</th>
                <th className="py-3 px-3">Kab/Kota</th>
                <th className="py-3 px-3 text-center">Strategi Utama</th>
                <th className="py-3 px-3 text-right">Skor Keputusan</th>
                <th className="py-3 px-3">Nilai Pelanggan</th>
                <th className="py-3 px-3">Tekanan Kompetitor</th>
                <th className="py-3 px-3">Celah Cakupan</th>
                <th className="py-3 px-3 text-right">Nilai Peluang</th>
                <th className="py-3 px-3">Rekomendasi Tindakan</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE3EA]">
              {filteredList.map((item, idx) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isSelected ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(item.id)}
                        className="rounded text-[#2563EB] focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-3 font-bold text-[#17212B]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-[#17212B] font-bold text-[11px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[#607080]">{item.kabupaten}</td>
                    <td className="py-3 px-3 text-center">
                      <StrategyBadge strategy={item.strategy} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-[#2563EB] tabular-nums text-sm">
                      {item.score}
                    </td>
                    <td className="py-3 px-3 text-[#17212B]">{item.customerValue}</td>
                    <td className="py-3 px-3 text-[#17212B]">{item.competitorPressure}</td>
                    <td className="py-3 px-3 text-[#17212B]">{item.coverageGap}</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-700 tabular-nums">
                      {item.opportunityValue}
                    </td>
                    <td className="py-3 px-3 text-slate-700 max-w-xs truncate" title={item.recommendedAction}>
                      {item.recommendedAction}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          if (item.strategy === 'DEFEND') onNavigateToScreen('pertahanan-pasar');
                          else if (item.strategy === 'RETAIN') onNavigateToScreen('retensi');
                          else onNavigateToScreen('akuisisi');
                        }}
                        className="text-[#2563EB] font-semibold hover:underline flex items-center gap-1 justify-end"
                      >
                        <span>Eksplor</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Comparison Panel (when 2 or 3 selected) */}
      {comparedPriorities.length > 0 && (
        <div className="bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#17212B]">
                Komparasi Langsung {comparedPriorities.length} Wilayah
              </h3>
              <span className="text-xs text-[#607080]">(Metode {method.toUpperCase()})</span>
            </div>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Bersihkan Pilihan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparedPriorities.map((cp) => (
              <div key={cp.id} className="p-4 rounded-xl border border-[#DDE3EA] bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#17212B]">{cp.name}</span>
                  <StrategyBadge strategy={cp.strategy} score={cp.score} size="sm" />
                </div>
                <p className="text-[11px] text-[#607080] leading-snug">{cp.reason}</p>
                <div className="space-y-1.5 text-xs pt-2 border-t border-[#DDE3EA]">
                  <div className="flex justify-between">
                    <span className="text-[#607080]">Nilai Peluang:</span>
                    <span className="font-bold text-emerald-700">{cp.opportunityValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#607080]">Nilai Pelanggan:</span>
                    <span className="font-semibold">{cp.customerValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#607080]">Celah Layanan:</span>
                    <span className="font-semibold">{cp.coverageGap}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
