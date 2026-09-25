import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Sliders,
  Maximize2,
  Save,
  Copy,
  Send,
  AlertCircle,
  Building2,
  MapPin,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { JawaTengahMap } from '../components/map/JawaTengahMap';
import { CANDIDATE_LOCATIONS } from '../data/mockData';
import { ScreenId, CandidateLocation } from '../types';

interface LocationCandidateScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const LocationCandidateScreen: React.FC<LocationCandidateScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [currentStep, setCurrentStep] = useState(5); // Default to Comparison step
  const [selectedCandidateId, setSelectedCandidateId] = useState('cand-1');

  // Interactive weights state (totaling 100%)
  const [weights, setWeights] = useState({
    customerDensity: 25,
    marketPotential: 20,
    accessibility: 15,
    competitionPressure: 15,
    serviceGap: 15,
    investmentFeasibility: 10
  });

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const isValidWeight = totalWeight === 100;

  const steps = [
    '1. Tentukan Tujuan',
    '2. Tambahkan Kandidat',
    '3. Pilih Kriteria',
    '4. Atur Bobot',
    '5. Bandingkan',
    '6. Rekomendasi'
  ];

  const selectedCandidate =
    CANDIDATE_LOCATIONS.find((c) => c.id === selectedCandidateId) || CANDIDATE_LOCATIONS[0];

  const handleSaveScenario = () => {
    onShowToast('Skenario simulasi lokasi "SCN-JTG-2026-09" berhasil disimpan.');
  };

  const handleDuplicateScenario = () => {
    onShowToast('Skenario berhasil diduplikasi sebagai "SCN-JTG-2026-09-Salinan".');
  };

  const handleSubmitReview = () => {
    onShowToast('Rekomendasi Kandidat A diajukan ke Komite Investasi & Network Development.');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Analisis Kandidat Lokasi Jaringan
          </h1>
          <p className="text-xs text-[#607080]">
            Simulasi Multi-Kriteria (MCDM) untuk penentuan prioritas investasi pembukaan titik layanan baru di Jawa Tengah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveScenario}
            className="px-3 py-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Save className="w-3.5 h-3.5 text-[#607080]" />
            <span>Simpan Skenario</span>
          </button>

          <button
            onClick={handleDuplicateScenario}
            className="px-3 py-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Copy className="w-3.5 h-3.5 text-[#607080]" />
            <span>Duplikasi</span>
          </button>

          <button
            onClick={handleSubmitReview}
            className="px-3.5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ajukan Review</span>
          </button>
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

      {/* Main Grid: Candidate Map with Pins (7 cols) + Weight Controls & Results (5 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Map with Candidate Pins A, B, C */}
        <div className="xl:col-span-7 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs">
            <div>
              <span className="font-bold text-[#17212B]">Peta Sebaran 3 Kandidat Lokasi</span>
              <p className="text-[11px] text-[#607080]">Pin A: Semarang Timur · Pin B: Solo Baru · Pin C: Purwokerto Utara</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] font-semibold text-[11px]">
              Catchment Buffer 15 Mnt
            </span>
          </div>

          <JawaTengahMap
            showCandidatePins={true}
            activeLayers={{
              customerDensity: true,
              customerValue: false,
              retentionRisk: false,
              outlets: true,
              competitors: true,
              catchments: true
            }}
          />

          <div className="mt-3 pt-3 border-t border-[#DDE3EA] flex items-center justify-between text-[11px] text-[#607080]">
            <span>Metode: Analytical Hierarchy Process (AHP) + TOPSIS</span>
            <span className="font-semibold text-emerald-700">Skor Tertinggi: Semarang Timur A (88,6)</span>
          </div>
        </div>

        {/* Right: MCDM Weights Adjuster & Radar Comparison */}
        <div className="xl:col-span-5 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#DDE3EA] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#17212B] uppercase tracking-wider">
                  Pengaturan Bobot Kriteria (MCDM)
                </h3>
                <p className="text-[11px] text-[#607080]">Total pembobotan harus bernilai tepat 100%.</p>
              </div>

              {/* Validation Status */}
              <div
                className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                  isValidWeight
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-[#C73E3A] border border-rose-200'
                }`}
              >
                {!isValidWeight && <AlertCircle className="w-3.5 h-3.5" />}
                <span>Total: {totalWeight}%</span>
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="space-y-2.5 text-xs">
              {[
                { key: 'customerDensity', label: 'Densitas Pelanggan', max: 50 },
                { key: 'marketPotential', label: 'Potensi Pasar (Demografi)', max: 50 },
                { key: 'accessibility', label: 'Aksesibilitas Jalan & Hub', max: 50 },
                { key: 'competitionPressure', label: 'Tekanan Kompetitor', max: 50 },
                { key: 'serviceGap', label: 'Celah Cakupan Layanan', max: 50 },
                { key: 'investmentFeasibility', label: 'Kelayakan Investasi (CAPEX)', max: 50 }
              ].map((c) => (
                <div key={c.key} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-medium text-[#17212B]">{c.label}</span>
                    <span className="font-mono font-bold text-[#2563EB] tabular-nums">
                      {(weights as any)[c.key]}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={c.max}
                    value={(weights as any)[c.key]}
                    onChange={(e) =>
                      setWeights((prev) => ({
                        ...prev,
                        [c.key]: Number(e.target.value)
                      }))
                    }
                    className="w-full accent-[#2563EB] cursor-pointer h-1.5 bg-slate-100 rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Candidate Result Ranking Cards */}
            <div className="pt-2 border-t border-[#DDE3EA] space-y-2">
              <div className="text-[11px] font-bold text-[#17212B] uppercase tracking-wider">
                Hasil Pemeringkatan Skenario
              </div>

              {CANDIDATE_LOCATIONS.map((cand, idx) => (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidateId(cand.id)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    selectedCandidateId === cand.id
                      ? 'border-[#2563EB] bg-blue-50/50 shadow-2xs'
                      : 'border-[#DDE3EA] bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#15324B] text-white font-bold text-xs flex items-center justify-center">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div>
                      <div className="font-bold text-xs text-[#17212B]">{cand.name}</div>
                      <div className="text-[10px] text-[#607080]">{cand.kabupaten} · Est. CAPEX: {cand.estimatedCapex}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-[#2563EB] tabular-nums">
                      {cand.overallScore}
                    </div>
                    <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                      {cand.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#DDE3EA] flex gap-2">
            <button
              onClick={() => onNavigateToScreen('peringkat-strategis')}
              className="flex-1 py-2 px-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold text-center transition-colors shadow-2xs"
            >
              Buka Peringkat Keputusan Lengkap
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table Between Candidates */}
      <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-[#17212B]">Matriks Perbandingan Rinci 3 Kandidat</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F7FA] text-[#607080] font-semibold border-y border-[#DDE3EA]">
              <tr>
                <th className="py-2 px-3">Kode &amp; Nama Kandidat</th>
                <th className="py-2 px-3 text-right">Skor Total</th>
                <th className="py-2 px-3 text-right">Pelanggan Catchment</th>
                <th className="py-2 px-3 text-right">Overlap Outlet</th>
                <th className="py-2 px-3 text-right">Kompetitor Terdekat</th>
                <th className="py-2 px-3 text-right">Waktu Tempuh Rata-rata</th>
                <th className="py-2 px-3 text-right">Estimasi CAPEX</th>
                <th className="py-2 px-3 text-center">Status Rekomendasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE3EA]">
              {CANDIDATE_LOCATIONS.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-[#17212B]">
                    {c.code} — {c.name}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-[#2563EB] tabular-nums">
                    {c.overallScore}
                  </td>
                  <td className="py-2 px-3 text-right tabular-nums">
                    {c.catchmentCustomers.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2 px-3 text-right tabular-nums">{c.overlapPercentage}%</td>
                  <td className="py-2 px-3 text-right tabular-nums">{c.competitorsNearby} Outlet</td>
                  <td className="py-2 px-3 text-right tabular-nums">{c.avgTravelTimeMin} Menit</td>
                  <td className="py-2 px-3 text-right tabular-nums font-medium">{c.estimatedCapex}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB]">
                      {c.status}
                    </span>
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
