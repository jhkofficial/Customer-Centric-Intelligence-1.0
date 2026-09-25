import React from 'react';
import { X, CheckCircle, AlertTriangle, Clock, ArrowRight, Shield } from 'lucide-react';
import { ScreenId } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScreen: (screen: ScreenId) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToScreen
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Persetujuan Campaign Dibutuhkan',
      desc: 'Draf Campaign "Retensi High Value Semarang Timur" (10.920 pelanggan) menunggu persetujuan eksekusi.',
      time: '15 menit yang lalu',
      type: 'approval',
      screen: 'campaign-omnichannel' as ScreenId,
      unread: true
    },
    {
      id: 'notif-2',
      title: 'Peringatan Risiko Retensi Meningkat',
      desc: 'Surakarta Utara mencatat 21.200 pelanggan dalam kategori risiko tinggi churn (+4,1% bulan ini).',
      time: '2 jam yang lalu',
      type: 'warning',
      screen: 'retensi' as ScreenId,
      unread: true
    },
    {
      id: 'notif-3',
      title: 'Evaluasi Lokasi Kandidat Selesai',
      desc: 'Simulasi multi-kriteria Semarang Timur A selesai dengan skor 88,6 (Rekomendasi Utama).',
      time: '4 jam yang lalu',
      type: 'info',
      screen: 'kandidat-lokasi' as ScreenId,
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-[#DDE3EA] animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-[#DDE3EA] flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#17212B]">Pusat Notifikasi &amp; Persetujuan</h3>
            <span className="w-5 h-5 rounded-full bg-[#C73E3A] text-white text-[10px] flex items-center justify-center font-bold">
              2
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onNavigateToScreen(n.screen);
                onClose();
              }}
              className={`p-3 rounded-xl border transition-all cursor-pointer hover:border-[#2563EB] ${
                n.unread
                  ? 'bg-blue-50/40 border-blue-200'
                  : 'bg-white border-[#DDE3EA]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-semibold text-xs text-[#17212B]">{n.title}</span>
                {n.unread && (
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0 mt-1" />
                )}
              </div>
              <p className="text-[11px] text-[#607080] leading-relaxed mb-2">{n.desc}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {n.time}
                </span>
                <span className="text-[#2563EB] font-semibold flex items-center gap-0.5">
                  Tinjau <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-[#DDE3EA] bg-slate-50 text-center">
          <span className="text-[10px] text-[#607080]">
            Seluruh aksi dan persetujuan dicatat dalam Audit &amp; Governance
          </span>
        </div>
      </div>
    </div>
  );
};
