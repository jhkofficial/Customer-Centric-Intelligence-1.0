import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  PieChart,
  Users,
  Map,
  Network,
  Building2,
  ShieldAlert,
  Shield,
  Target,
  Compass,
  ListOrdered,
  FileSearch,
  Send,
  BarChart3,
  Bot,
  Activity,
  FileCheck2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Lock,
  Layers,
  LogIn,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Maximize2
} from 'lucide-react';
import { ScreenId, UserRole } from '../../types';

export type SidebarMode = 'expanded' | 'compact' | 'hidden';

interface SidebarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  sidebarMode: SidebarMode;
  onSetSidebarMode: (mode: SidebarMode) => void;
  userRole: UserRole;
  onLogout?: () => void;
}

interface NavItem {
  id: ScreenId;
  label: string;
  icon: React.ElementType;
  rolesAllowed?: UserRole[];
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'BERANDA',
    items: [
      { id: 'ringkasan-eksekutif', label: 'Ringkasan Eksekutif', icon: LayoutDashboard }
    ]
  },
  {
    label: 'INTELIJEN PELANGGAN',
    items: [
      { id: 'pelanggan-360', label: 'Pelanggan 360', icon: UserCheck, rolesAllowed: ['Executive / Management', 'Business / Marketing', 'Data Analyst / Data Scientist', 'Administrator', 'Security / Data Governance', 'Regional / Branch Operations'] },
      { id: 'segmentasi-pelanggan', label: 'Segmentasi Pelanggan', icon: PieChart },
      { id: 'distribusi-pelanggan', label: 'Distribusi Pelanggan', icon: Users }
    ]
  },
  {
    label: 'INTELIJEN LOKASI',
    items: [
      { id: 'peta-kepadatan', label: 'Peta & Kepadatan', icon: Map },
      { id: 'jaringan-cakupan', label: 'Jaringan & Cakupan', icon: Network },
      { id: 'pasar-poi-demografi', label: 'Pasar, POI & Demografi', icon: Building2 }
    ]
  },
  {
    label: 'STRATEGI',
    items: [
      { id: 'retensi', label: 'Retensi', icon: ShieldAlert },
      { id: 'pertahanan-pasar', label: 'Pertahanan Pasar', icon: Shield },
      { id: 'akuisisi', label: 'Akuisisi', icon: Target }
    ]
  },
  {
    label: 'KEPUTUSAN',
    items: [
      { id: 'kandidat-lokasi', label: 'Analisis Kandidat Lokasi', icon: Compass, rolesAllowed: ['Executive / Management', 'Network Development', 'Data Analyst / Data Scientist', 'Administrator'] },
      { id: 'peringkat-strategis', label: 'Peringkat Strategis', icon: ListOrdered },
      { id: 'explainability', label: 'Explainability', icon: FileSearch }
    ]
  },
  {
    label: 'ENGAGEMENT',
    items: [
      { id: 'campaign-omnichannel', label: 'Campaign & Omnichannel', icon: Send, rolesAllowed: ['Executive / Management', 'Business / Marketing', 'Administrator', 'Regional / Branch Operations'] },
      { id: 'aktivitas-hasil', label: 'Aktivitas & Hasil', icon: BarChart3 }
    ]
  },
  {
    label: 'AI & ASISTEN',
    items: [
      { id: 'serveon-agent', label: 'SERVEON Agent', icon: Bot }
    ]
  },
  {
    label: 'MONITORING',
    items: [
      { id: 'monitoring-data-model', label: 'Data & Model', icon: Activity, rolesAllowed: ['Data Analyst / Data Scientist', 'Administrator', 'Security / Data Governance', 'Executive / Management'] },
      { id: 'audit-governance', label: 'Audit & Governance', icon: FileCheck2, rolesAllowed: ['Security / Data Governance', 'Administrator', 'Executive / Management'] }
    ]
  },
  {
    label: 'PENGATURAN & AKSES',
    items: [
      { id: 'administrasi', label: 'Administrasi', icon: Settings, rolesAllowed: ['Administrator'] },
      { id: 'login', label: 'Halaman Login & Akses', icon: LogIn }
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onSelectScreen,
  sidebarMode,
  onSetSidebarMode,
  userRole,
  onLogout
}) => {
  const isAllowed = (item: NavItem) => {
    if (!item.rolesAllowed) return true;
    return item.rolesAllowed.includes(userRole);
  };

  const isCollapsed = sidebarMode === 'compact';
  const isHidden = sidebarMode === 'hidden';

  // If hidden completely, return empty container with 0 width to let page take 100% width
  if (isHidden) {
    return null;
  }

  return (
    <aside
      className={`h-screen flex flex-col bg-[#15324B] text-slate-200 transition-all duration-300 border-r border-[#1e4464] shrink-0 z-30 select-none ${
        isCollapsed ? 'w-[68px]' : 'w-[260px]'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-3.5 border-b border-[#1e4464]/80 shrink-0">
        <button
          onClick={() => onSelectScreen('ringkasan-eksekutif')}
          className="flex items-center gap-3 text-left focus:outline-none group overflow-hidden"
          title="SERVEON — Beranda"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0F7C7B] to-[#2563EB] flex items-center justify-center text-white font-bold tracking-wider shadow-sm shrink-0">
            <Layers className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-wider text-base">SERVEON</span>
                <span className="text-[10px] text-[#0F7C7B] font-semibold bg-[#0F7C7B]/20 px-1.5 py-0.5 rounded">PILOT</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">Jawa Tengah Intelligence</p>
            </div>
          )}
        </button>

        {/* Quick Minimize to hidden or toggle */}
        {!isCollapsed && (
          <button
            onClick={() => onSetSidebarMode('hidden')}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1C4160] rounded-lg transition-colors"
            title="Sembunyikan Menu (Buka Layar Penuh)"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="space-y-1">
            {!isCollapsed && (
              <h2 className="px-3 text-[10px] font-semibold text-slate-400 tracking-wider">
                {group.label}
              </h2>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const allowed = isAllowed(item);
                const isActive = currentScreen === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (allowed) onSelectScreen(item.id);
                    }}
                    disabled={!allowed}
                    title={
                      !allowed
                        ? `${item.label} (Terkunci untuk role ${userRole})`
                        : item.label
                    }
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left relative ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-sm font-semibold'
                        : allowed
                        ? 'text-slate-300 hover:bg-[#1C4160] hover:text-white'
                        : 'text-slate-500 opacity-50 cursor-not-allowed'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : allowed ? 'text-slate-400' : 'text-slate-600'}`} />
                    {!isCollapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {!isCollapsed && !allowed && (
                      <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                    {item.id === 'login' && !isCollapsed && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 font-bold uppercase">
                        Menu
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Login / Logout Button in Sidebar Footer */}
      <div className="p-2 border-t border-[#1e4464] space-y-1">
        <button
          onClick={() => {
            if (onLogout) {
              onLogout();
            } else {
              onSelectScreen('login');
            }
          }}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-300 hover:text-white hover:bg-red-950/40 border border-red-900/30 transition-colors ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
          title="Keluar ke Halaman Login"
        >
          <LogOut className="w-4 h-4 text-red-400 shrink-0" />
          {!isCollapsed && <span className="font-semibold">Keluar / Ganti Akun</span>}
        </button>

        {/* Mode Toggle Bar: Expanded <-> Compact <-> Hidden */}
        <div className="flex items-center justify-between pt-1">
          {!isCollapsed && (
            <button
              onClick={() => onSetSidebarMode('hidden')}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 px-1 py-1"
              title="Buka Halaman Penuh Tanpa Menu"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Layar Penuh</span>
            </button>
          )}

          <button
            onClick={() => onSetSidebarMode(isCollapsed ? 'expanded' : 'compact')}
            className={`p-2 text-slate-400 hover:text-white hover:bg-[#1C4160] rounded-lg transition-colors focus:outline-none ${
              isCollapsed ? 'w-full flex justify-center' : 'ml-auto'
            }`}
            title={isCollapsed ? 'Perluas Menu (Expanded)' : 'Ciutkan Menu (Compact)'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
