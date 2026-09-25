import React from 'react';
import { ShieldAlert, Shield, Target, ArrowLeftRight, Download, BookmarkCheck, Bot, Lock } from 'lucide-react';
import { StrategyType, ScreenId, UserRole } from '../../types';

interface StrategySwitcherProps {
  currentStrategy: StrategyType;
  onNavigateToScreen: (screen: ScreenId) => void;
  onOpenCompareModal: () => void;
  onOpenAgentModal: (prompt?: string) => void;
  onSaveAnalysis: () => void;
  onExportReport: () => void;
  userRole: UserRole;
  isExportPermitted: boolean;
}

export const StrategySwitcher: React.FC<StrategySwitcherProps> = ({
  currentStrategy,
  onNavigateToScreen,
  onOpenCompareModal,
  onOpenAgentModal,
  onSaveAnalysis,
  onExportReport,
  userRole,
  isExportPermitted
}) => {
  const tabs = [
    {
      id: 'RETAIN' as StrategyType,
      screenId: 'retensi' as ScreenId,
      label: 'RETAIN',
      sublabel: 'Retensi Pelanggan',
      icon: ShieldAlert,
      count: '9 Area · 3 Kritis',
      activeBg: 'bg-[#D97706]',
      activeBorder: 'border-amber-500',
      activeText: 'text-white',
      badgeBg: 'bg-amber-100 text-amber-900',
      inactiveHover: 'hover:bg-amber-50/60 hover:border-amber-200'
    },
    {
      id: 'DEFEND' as StrategyType,
      screenId: 'pertahanan-pasar' as ScreenId,
      label: 'DEFEND',
      sublabel: 'Pertahanan Pasar',
      icon: Shield,
      count: '12 Area · 5 Kritis',
      activeBg: 'bg-[#C73E3A]',
      activeBorder: 'border-red-500',
      activeText: 'text-white',
      badgeBg: 'bg-red-100 text-red-900',
      inactiveHover: 'hover:bg-red-50/60 hover:border-red-200'
    },
    {
      id: 'ACQUIRE' as StrategyType,
      screenId: 'akuisisi' as ScreenId,
      label: 'ACQUIRE',
      sublabel: 'Akuisisi Pelanggan',
      icon: Target,
      count: '14 Area · 5 Siap',
      activeBg: 'bg-[#0F7C7B]',
      activeBorder: 'border-teal-500',
      activeText: 'text-white',
      badgeBg: 'bg-teal-100 text-teal-900',
      inactiveHover: 'hover:bg-teal-50/60 hover:border-teal-200'
    }
  ];

  return (
    <div className="space-y-3">
      {/* Breadcrumb & Strategy Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs text-[#607080]">
          <span className="font-medium hover:text-[#17212B] cursor-pointer" onClick={() => onNavigateToScreen('ringkasan-eksekutif')}>
            SERVEON
          </span>
          <span>/</span>
          <span>Strategi</span>
          <span>/</span>
          <span className="font-bold text-[#17212B] tracking-wide">
            {currentStrategy}
          </span>
        </div>

        {/* Header Action Buttons with role checks */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={onOpenCompareModal}
            className="px-3 py-1.5 rounded-lg border border-[#DDE3EA] bg-white hover:bg-slate-50 text-[#17212B] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Bandingkan skor RETAIN, DEFEND, dan ACQUIRE untuk wilayah terpilih"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Bandingkan Strategi</span>
          </button>

          <button
            onClick={onSaveAnalysis}
            className="px-3 py-1.5 rounded-lg border border-[#DDE3EA] bg-white hover:bg-slate-50 text-[#17212B] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Simpan parameter dan snapshot analisis saat ini"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simpan Analisis</span>
          </button>

          {isExportPermitted ? (
            <button
              onClick={onExportReport}
              className="px-3 py-1.5 rounded-lg border border-[#DDE3EA] bg-white hover:bg-slate-50 text-[#17212B] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Ekspor laporan ringkasan strategi ke format PDF/Excel"
            >
              <Download className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Ekspor Laporan</span>
            </button>
          ) : (
            <button
              disabled
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 text-xs font-medium flex items-center gap-1.5 cursor-not-allowed"
              title={`Ekspor laporan dibatasi untuk role ${userRole}. Memerlukan otorisasi Administrator atau Data Governance.`}
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Ekspor Terkunci</span>
            </button>
          )}

          <button
            onClick={() => onOpenAgentModal(`Analisis mendalam pilar strategi ${currentStrategy} untuk wilayah prioritas di Jawa Tengah.`)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#15324B] to-[#1E4464] hover:from-[#1E4464] hover:to-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Bot className="w-3.5 h-3.5 text-teal-400" />
            <span>Tanya SERVEON Agent</span>
          </button>
        </div>
      </div>

      {/* Prominent Segmented Strategy Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 p-1.5 bg-[#E8EEF5]/70 rounded-xl border border-[#DDE3EA]">
        {tabs.map((tab) => {
          const isActive = currentStrategy === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigateToScreen(tab.screenId)}
              className={`flex items-center justify-between p-2.5 sm:p-3 rounded-lg border text-left transition-all duration-150 ${
                isActive
                  ? `${tab.activeBg} ${tab.activeBorder} ${tab.activeText} shadow-md`
                  : `bg-white border-[#DDE3EA] text-[#17212B] ${tab.inactiveHover}`
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#607080]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black tracking-wider uppercase">
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                        isActive ? 'bg-white/20 text-white' : tab.badgeBg
                      }`}
                    >
                      {tab.sublabel}
                    </span>
                  </div>
                  <div
                    className={`text-[11px] mt-0.5 font-medium ${
                      isActive ? 'text-white/80' : 'text-[#607080]'
                    }`}
                  >
                    {tab.count}
                  </div>
                </div>
              </div>

              <div
                className={`text-[10px] font-bold px-2 py-1 rounded tracking-wide uppercase ${
                  isActive ? 'bg-white text-[#17212B]' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isActive ? 'Aktif' : 'Buka'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
