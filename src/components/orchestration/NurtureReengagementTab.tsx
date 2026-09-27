import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Users,
  Flame,
  Send,
  Zap,
  RotateCcw
} from 'lucide-react';
import { ReEngagementOpportunity, ProspectProfile } from '../../types/orchestration';
import {
  RE_ENGAGEMENT_OPPORTUNITIES,
  INITIAL_PROSPECTS
} from '../../data/orchestrationData';

interface NurtureReengagementTabProps {
  onShowToast: (msg: string) => void;
  onOpenFollowUpModal: (prospect: ProspectProfile) => void;
  onOpenCustomerDrawer: (prospect: ProspectProfile) => void;
}

export const NurtureReengagementTab: React.FC<NurtureReengagementTabProps> = ({
  onShowToast,
  onOpenFollowUpModal,
  onOpenCustomerDrawer
}) => {
  const [opportunities, setOpportunities] = useState<ReEngagementOpportunity[]>(
    RE_ENGAGEMENT_OPPORTUNITIES
  );
  const [reengagedIds, setReengagedIds] = useState<string[]>([]);

  const handleReEngage = (opp: ReEngagementOpportunity) => {
    if (reengagedIds.includes(opp.id)) return;

    setReengagedIds([...reengagedIds, opp.id]);
    onShowToast(
      `Sinyal reaktivasi "${opp.customerName}" berhasil dieksekusi. Task prioritas diteruskan ke PIC Sales.`
    );
  };

  const nurtureCadences = [
    {
      id: 'cad-1',
      title: 'Alur Nurture: Penyelamatan Kendala Finansial (30 Hari)',
      target: 'Prospek dengan Alasan "DP Tinggi / Angsuran Berat"',
      activeLeads: '1.420 Prospek',
      conversionRate: '24,2%',
      steps: [
        { day: 'Hari Ke-3', channel: 'WhatsApp', action: 'Kirimkan kalkulator interaktif simulasi kredit fleksibel' },
        { day: 'Hari Ke-7', channel: 'Mobile Apps', action: 'Video edukasi: Testimoni konsumen & keuntungan pembiayaan FIF' },
        { day: 'Hari Ke-14', channel: 'WhatsApp', action: 'Penawaran subsidi DP khusus periode akhir bulan' },
        { day: 'Hari Ke-21', channel: 'Telepon', action: 'Personal follow-up oleh Sales Advisor cabang' }
      ]
    },
    {
      id: 'cad-2',
      title: 'Alur Nurture: Waktu Beli Tertunda (Purchase Timing)',
      target: 'Prospek yang menunda beli 1–3 bulan ke depan',
      activeLeads: '1.154 Prospek',
      conversionRate: '19,5%',
      steps: [
        { day: 'Hari Ke-5', channel: 'WhatsApp', action: 'Kirim E-Brosur dan perbandingan varian warna ready stock' },
        { day: 'Hari Ke-12', channel: 'WhatsApp', action: 'Undangan Exclusive Weekend Test Ride di dealer terdekat' },
        { day: 'Hari Ke-25', channel: 'WhatsApp', action: 'Reminder penguncian harga unit sebelum awal bulan baru' }
      ]
    },
    {
      id: 'cad-3',
      title: 'Alur Nurture: Pertahanan Komparasi Kompetitor',
      target: 'Prospek yang sedang membandingkan harga/fitur brand lain',
      activeLeads: '846 Prospek',
      conversionRate: '16,8%',
      steps: [
        { day: 'Hari Ke-2', channel: 'WhatsApp', action: 'Edukasi Total Cost of Ownership & efisiensi BBM eSP (60,6 km/l)' },
        { day: 'Hari Ke-6', channel: 'Mobile Apps', action: 'Infografis komparasi: Garansi Rangka 5 Tahun & Jaringan Bengkel AHASS' },
        { day: 'Hari Ke-14', channel: 'WhatsApp', action: 'Voucher servis gratis tambahan untuk SPK pekan ini' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Operational Overview */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DDE3EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>NURTURE &amp; WIN-BACK ENGINE</span>
              </span>
              <span className="text-xs text-slate-500">Astra Motor Jawa Tengah</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Nurture &amp; Re-Engagement — Pengelolaan Prospek Tertunda
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Prospek yang belum siap bertransaksi tetap dirawat secara teratur melalui alur edukasi non-intrusif, dan diaktifkan kembali saat terdeteksi sinyal niat beli baru.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <div className="text-[10px] text-amber-800 font-bold uppercase">Prospek Dalam Nurture</div>
              <div className="text-base font-extrabold text-amber-900 tabular-nums">3.420</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-purple-50 border border-purple-200 text-center">
              <div className="text-[10px] text-purple-700 font-bold uppercase">Sinyal Re-Engaged</div>
              <div className="text-base font-extrabold text-purple-900 tabular-nums">312 Prospek</div>
            </div>
          </div>
        </div>

        {/* Re-Engagement Radar Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900">
                Radar Sinyal Re-Engagement Baru (Segera Tindak Lanjuti)
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Terdeteksi dari interaksi web, aplikasi Mobile Apps, &amp; tautan brosur
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {opportunities.map((opp) => {
              const isHandled = reengagedIds.includes(opp.id);
              const prospect =
                INITIAL_PROSPECTS.find((p) => p.id === opp.prospectId) || INITIAL_PROSPECTS[0];

              return (
                <div
                  key={opp.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isHandled
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-[#DDE3EA] bg-slate-50/50 hover:border-purple-300'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-200">
                      <div>
                        <div className="font-bold text-xs text-slate-900">{opp.customerName}</div>
                        <div className="text-[11px] text-slate-500">{opp.productInterest}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-700">
                        {opp.engagementScoreDelta} Skor
                      </span>
                    </div>

                    <div className="mt-2 text-xs">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Sinyal Digital Terdeteksi:
                      </span>
                      <p className="text-[11px] text-slate-700 mt-0.5 leading-relaxed bg-white p-2 rounded-lg border border-slate-200">
                        {opp.newSignal}
                      </p>
                    </div>

                    <div className="mt-2 text-xs">
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                        Rekomendasi Reaktivasi:
                      </span>
                      <p className="text-[11px] text-slate-900 font-semibold mt-0.5">
                        {opp.recommendedAction}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => onOpenCustomerDrawer(prospect)}
                      className="text-[11px] text-slate-600 hover:text-slate-900 font-medium"
                    >
                      Lihat Profil 360
                    </button>

                    <button
                      onClick={() => handleReEngage(opp)}
                      disabled={isHandled}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
                        isHandled
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-[#2563EB] hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isHandled ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Ditugaskan</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Re-Engage Sekarang</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nurture Cadence Sequences Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-slate-900">
              Alur Perawatan Prospek Aktif (Nurture Cadence Playbooks)
            </h3>
          </div>
          <span className="text-xs text-slate-500">Cadence Otomatis Terhubung ke CRM &amp; DMS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {nurtureCadences.map((cad) => (
            <div
              key={cad.id}
              className="bg-white border border-[#DDE3EA] rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#DDE3EA]">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{cad.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{cad.target}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {cad.conversionRate} Konversi
                  </span>
                </div>

                <div className="mt-3 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Populasi Prospek Aktif:</span>
                  <span className="font-bold text-slate-800 text-xs">{cad.activeLeads}</span>
                </div>

                {/* Steps Timeline */}
                <div className="mt-4 space-y-2.5">
                  {cad.steps.map((st, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="font-bold text-blue-700">{st.day}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-semibold">
                          {st.channel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-tight">{st.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#DDE3EA]">
                <button
                  onClick={() => onShowToast(`Menyesuaikan alur playbook "${cad.title}"...`)}
                  className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-colors"
                >
                  Konfigurasi Jadwal &amp; Template Pesan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
