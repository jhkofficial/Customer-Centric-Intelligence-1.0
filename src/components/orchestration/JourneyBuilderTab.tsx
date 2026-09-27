import React, { useState } from 'react';
import {
  GitFork,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  MessageSquare,
  Phone,
  Layers,
  ArrowRight,
  Filter,
  Check,
  ShieldCheck,
  Save,
  Zap,
  Users,
  Building2,
  Calendar,
  Share2
} from 'lucide-react';
import { OrchestrationSubmenuId } from '../../types/orchestration';

interface JourneyBuilderTabProps {
  onShowToast: (msg: string) => void;
  onNavigateSubmenu?: (sub: OrchestrationSubmenuId) => void;
}

interface FlowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay' | 'outcome';
  title: string;
  subtitle: string;
  channel?: string;
  details: string;
  status: 'active' | 'configured' | 'pending';
  icon: any;
  badge?: string;
}

export const JourneyBuilderTab: React.FC<JourneyBuilderTabProps> = ({
  onShowToast,
  onNavigateSubmenu
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<'financing' | 'sport' | 'reactivate' | 'testride'>('financing');
  const [activeNodeId, setActiveNodeId] = useState<string>('node-2');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const templates = [
    {
      id: 'financing',
      name: 'Penyelamatan Kendala Pembiayaan (Financing Barrier)',
      desc: 'Otomatisasi pengalihan lead berkendala DP/angsuran ke skema alternatif & subsidi leasing.',
      leadsActive: '1.842 Lead'
    },
    {
      id: 'sport',
      name: 'Nurturing Honda Sport Series (CB150R / CBR150R)',
      desc: 'Alur edukasi performa mesin DOHC, komunitas motor sport, dan simulasi cicilan khusus.',
      leadsActive: '920 Lead'
    },
    {
      id: 'reactivate',
      name: 'Reaktivasi Lead Dingin / No Response (> 7 Hari)',
      desc: 'Pemicu multi-kanal berbasis sinyal digital (kunjungan web / e-brosur) dengan Contact Policy terukur.',
      leadsActive: '1.154 Lead'
    },
    {
      id: 'testride',
      name: 'Jalur Cepat Test Ride & Konversi SPK Showroom',
      desc: 'Undangan instan H+1 setelah ketertarikan dengan penugasan otomatis ke Sales Advisor terdekat.',
      leadsActive: '640 Lead'
    }
  ];

  const flowNodes: FlowNode[] = [
    {
      id: 'node-1',
      type: 'trigger',
      title: 'Pemicu Alur: Lead Dibuat / Sinyal Baru',
      subtitle: 'Event Registrasi QR / Web Landing Page / Form',
      details: 'Kriteria: Intent Level = HIGH, Lead Score >= 75. Terhubung ke data input omnichannel.',
      status: 'active',
      icon: Zap,
      badge: 'TRIGGER'
    },
    {
      id: 'node-2',
      type: 'condition',
      title: 'Percabangan Respon: Deteksi Hambatan',
      subtitle: 'Evaluasi Catatan Follow-up Sales & Kategori Reason Code',
      details: 'Jika Hasil Follow-up = "Financing Barrier" (DP Tinggi / Angsuran Berat), arahkan ke Jalur Penyelamatan Finansial.',
      status: 'active',
      icon: GitFork,
      badge: 'DECISION SPLIT'
    },
    {
      id: 'node-3',
      type: 'delay',
      title: 'Jeda Cerdas (Smart Delay & Quiet Hours)',
      subtitle: 'Tunggu 2 Jam (Di Dalam Jam Operasional 08.30 - 18.00)',
      details: 'Mencegah kesan pesan spam otomatis dan memastikan mematuhi Contact Policy UU PDP.',
      status: 'configured',
      icon: Clock,
      badge: 'DELAY'
    },
    {
      id: 'node-4',
      type: 'action',
      title: 'Aksi: Kirim Pesan Interaktif WhatsApp',
      subtitle: 'Template Resmi WA Business: Brosur Subsidi & DP Murah',
      channel: 'WhatsApp',
      details: 'Personalisasi nama, unit favorit (contoh: Honda CB150R), dan simulasi angsuran ringan tenor 35 bulan.',
      status: 'configured',
      icon: MessageSquare,
      badge: 'ACTION'
    },
    {
      id: 'node-5',
      type: 'condition',
      title: 'Evaluasi Interaksi: Respon dalam 24 Jam?',
      subtitle: 'Pengecekan Balasan / Klik Tautan Brosur',
      details: 'Tracking status: Read, Link Clicked, atau Pesan Masuk (Inbound).',
      status: 'pending',
      icon: Filter,
      badge: 'EVALUATION'
    },
    {
      id: 'node-6',
      type: 'action',
      title: 'Aksi: Task Prioritas ke Sales Advisor',
      subtitle: 'Penugasan CRM Astra Motor: Jadwalkan Test Ride & Negosiasi',
      channel: 'Dealer / Telepon',
      details: 'Notifikasi otomatis di aplikasi sales dengan SLA kontak maksimal 4 jam kerja.',
      status: 'pending',
      icon: Users,
      badge: 'SALES TASK'
    },
    {
      id: 'node-7',
      type: 'outcome',
      title: 'Hasil Alur: Deal Closed / SPK Diterbitkan',
      subtitle: 'Konversi Prospek Menjadi Nasabah Resmi',
      details: 'Otomatis menghentikan kampanye akuisisi dan memulai alur Onboarding & Servis KPB 1.',
      status: 'configured',
      icon: CheckCircle2,
      badge: 'CONVERSION'
    }
  ];

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationStep(1);
    onShowToast('Memulai simulasi alur perjalanan dengan sampel data Budi Santoso...');

    const timer1 = setTimeout(() => setSimulationStep(2), 1000);
    const timer2 = setTimeout(() => setSimulationStep(3), 2000);
    const timer3 = setTimeout(() => setSimulationStep(4), 3000);
    const timer4 = setTimeout(() => setSimulationStep(5), 4000);
    const timer5 = setTimeout(() => setSimulationStep(6), 5000);
    const timer6 = setTimeout(() => {
      setSimulationStep(7);
      setIsSimulating(false);
      onShowToast('Simulasi alur selesai! Prospek berhasil diarahkan ke konversi SPK.');
    }, 6000);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimulationStep(0);
    onShowToast('Status simulasi diatur ulang.');
  };

  const selectedNode = flowNodes.find((n) => n.id === activeNodeId) || flowNodes[1];

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                VISUAL WORKFLOW ENGINE
              </span>
              <span className="text-xs text-slate-500">Versi Alur 2.4 (Aktif)</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Journey Builder — Alur Orkestrasi &amp; Decision Tree
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Rancang dan uji alur otomatisasi penanganan respon konsumen berdasarkan hasil nyata follow-up, alasan penundaan, dan waktu kontak optimal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleResetSimulation}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
                isSimulating
                  ? 'bg-amber-500 text-white cursor-wait animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isSimulating ? `Menjalankan Langkah ${simulationStep}/7...` : 'Uji Coba Alur (Dry Run)'}</span>
            </button>
            <button
              onClick={() => onShowToast('Perubahan alur otomatisasi berhasil disimpan & diverifikasi sesuai Contact Policy.')}
              className="px-3.5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan &amp; Terapkan Alur</span>
            </button>
          </div>
        </div>

        {/* Template Selector Bar */}
        <div className="mt-5 pt-4 border-t border-[#DDE3EA]">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Pilih Template Alur Operasional:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => {
                  setSelectedTemplate(tpl.id as any);
                  onShowToast(`Template aktif: ${tpl.name}`);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedTemplate === tpl.id
                    ? 'border-[#2563EB] bg-blue-50/50 shadow-2xs'
                    : 'border-[#DDE3EA] bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className={selectedTemplate === tpl.id ? 'text-[#2563EB]' : 'text-slate-900'}>
                    {tpl.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                    {tpl.leadsActive}
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {tpl.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Flow Designer Canvas & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Canvas: Flow Nodes Pipeline (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#DDE3EA] rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-bold text-slate-900">Kanvas Diagram Alur Operasional</h3>
            </div>
            <span className="text-xs text-slate-500">Klik node untuk melihat parameter &amp; aturan eksekusi</span>
          </div>

          <div className="space-y-3 relative py-2">
            {flowNodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = activeNodeId === node.id;
              const isSimActive = simulationStep === index + 1;
              const isSimPassed = simulationStep > index + 1;

              return (
                <div key={node.id} className="relative">
                  {/* Connecting Line */}
                  {index < flowNodes.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-7 bg-slate-200 z-0">
                      {isSimPassed && <div className="w-full h-full bg-emerald-500 transition-all duration-500" />}
                    </div>
                  )}

                  <div
                    onClick={() => setActiveNodeId(node.id)}
                    className={`relative z-10 p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'border-[#2563EB] bg-blue-50/40 shadow-xs ring-1 ring-[#2563EB]/40'
                        : isSimActive
                        ? 'border-amber-400 bg-amber-50/70 shadow-xs ring-2 ring-amber-400 animate-pulse'
                        : isSimPassed
                        ? 'border-emerald-300 bg-emerald-50/30'
                        : 'border-[#DDE3EA] bg-white hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                        isSimActive
                          ? 'bg-amber-500 text-white'
                          : isSimPassed
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase ${
                            node.type === 'trigger'
                              ? 'bg-purple-100 text-purple-700'
                              : node.type === 'condition'
                              ? 'bg-amber-100 text-amber-700'
                              : node.type === 'action'
                              ? 'bg-blue-100 text-blue-700'
                              : node.type === 'delay'
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {node.badge}
                        </span>
                        {node.channel && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                            {node.channel}
                          </span>
                        )}
                        {isSimActive && (
                          <span className="text-[10px] font-bold text-amber-600 animate-bounce">
                            ● Memproses Lead...
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 mt-1">{node.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{node.subtitle}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-semibold text-slate-400">Langkah {index + 1}</span>
                      {isSelected && (
                        <div className="text-[11px] font-bold text-[#2563EB] flex items-center gap-1 mt-1 justify-end">
                          <span>Terpilih</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Inspector Panel: Node Configuration (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  INSPEKTOR PARAMETER
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">{selectedNode.title}</h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {selectedNode.badge}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Deskripsi Logika Node
                </label>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed text-[11px]">
                  {selectedNode.details}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Aturan Pemicu / Kriteria Masuk
                </label>
                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Lolos Contact Policy &amp; Batas Frekuensi Mingguan</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Persetujuan Kontak (Consent UU PDP) Terverifikasi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Sinkronisasi Otomatis ke DMS Astra Motor</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Penetapan Waktu Eksekusi
                </label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600">
                  <option>Segera Saat Pemicu Terdeteksi (Real-Time)</option>
                  <option>Tunggu 2 Jam (Dalam Jam Kerja)</option>
                  <option>Kirim Pagi Hari Berikutnya (09:00 WIB)</option>
                  <option>Kirim Sore Hari (16:30 WIB — Waktu Efektif)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Eskalasi Jika Tidak Ada Respon
                </label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600">
                  <option>Arahkan ke Cadence Nurture WhatsApp (Jeda 7 Hari)</option>
                  <option>Alihkan Tugas ke Telesales Pusat</option>
                  <option>Kirim SMS Fallback Satu Kali</option>
                  <option>Tandai Status Sebagai "Deferred - Follow-Up Bulan Depan"</option>
                </select>
              </div>

              <button
                onClick={() => onShowToast(`Konfigurasi "${selectedNode.title}" berhasil diperbarui.`)}
                className="w-full mt-2 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Terapkan Konfigurasi Node
              </button>
            </div>
          </div>

          {/* Quick Metrics Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Efektivitas Alur Otomatisasi
              </span>
              <span className="text-emerald-400 font-bold">+28% Rasio Konversi</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Dengan mengintegrasikan penanganan keberatan spesifik (Reason Codes), waktu siklus transaksi prospek terpangkas dari 18 hari menjadi 7,4 hari.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
