import React, { useState } from 'react';
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Bell,
  HelpCircle,
  Bot,
  ChevronDown,
  CheckCircle2,
  X,
  PanelLeft,
  PanelLeftClose,
  Maximize2,
  Minimize2,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';
import { ScreenId, UserRole } from '../../types';
import { GLOBAL_METRICS, STRATEGIC_PRIORITIES } from '../../data/mockData';
import { SidebarMode } from './Sidebar';

interface TopBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  userRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  onOpenAgentModal: (contextPrompt?: string) => void;
  onOpenNotificationDrawer: () => void;
  onOpenHelpModal: () => void;
  sidebarMode: SidebarMode;
  onSetSidebarMode: (mode: SidebarMode) => void;
  onLogout?: () => void;
}

const SCREEN_TITLES: Record<ScreenId, { group: string; title: string }> = {
  login: { group: 'AUTENTIKASI & AKUN', title: 'Halaman Login & Akses' },
  'ringkasan-eksekutif': { group: 'BERANDA', title: 'Ringkasan Eksekutif' },
  'pelanggan-360': { group: 'INTELIJEN PELANGGAN', title: 'Pelanggan 360' },
  'segmentasi-pelanggan': { group: 'INTELIJEN PELANGGAN', title: 'Segmentasi Pelanggan' },
  'distribusi-pelanggan': { group: 'INTELIJEN PELANGGAN', title: 'Distribusi Pelanggan' },
  'peta-kepadatan': { group: 'INTELIJEN LOKASI', title: 'Peta & Kepadatan' },
  'jaringan-cakupan': { group: 'INTELIJEN LOKASI', title: 'Jaringan & Cakupan' },
  'pasar-poi-demografi': { group: 'INTELIJEN LOKASI', title: 'Pasar, POI & Demografi' },
  'retensi': { group: 'STRATEGI', title: 'Retensi' },
  'pertahanan-pasar': { group: 'STRATEGI', title: 'Pertahanan Pasar' },
  'akuisisi': { group: 'STRATEGI', title: 'Akuisisi' },
  'kandidat-lokasi': { group: 'KEPUTUSAN', title: 'Analisis Kandidat Lokasi' },
  'peringkat-strategis': { group: 'KEPUTUSAN', title: 'Peringkat Strategis' },
  'explainability': { group: 'KEPUTUSAN', title: 'Explainability & SHAP' },
  'campaign-omnichannel': { group: 'ENGAGEMENT', title: 'Campaign & Omnichannel' },
  'aktivitas-hasil': { group: 'ENGAGEMENT', title: 'Aktivitas & Hasil' },
  'serveon-agent': { group: 'AI & ASISTEN', title: 'SERVEON Agent' },
  'monitoring-data-model': { group: 'MONITORING', title: 'Data & Model' },
  'audit-governance': { group: 'MONITORING', title: 'Audit & Governance' },
  'administrasi': { group: 'PENGATURAN', title: 'Administrasi' }
};

const ALL_ROLES: UserRole[] = [
  'Administrator',
  'Executive / Management',
  'Business / Marketing',
  'Network Development',
  'Regional / Branch Operations',
  'Data Analyst / Data Scientist',
  'Security / Data Governance'
];

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  onSelectScreen,
  userRole,
  onChangeUserRole,
  onOpenAgentModal,
  onOpenNotificationDrawer,
  onOpenHelpModal,
  sidebarMode,
  onSetSidebarMode,
  onLogout
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const screenInfo = SCREEN_TITLES[currentScreen] || { group: 'SERVEON', title: 'Dashboard' };

  // Filtered search results
  const searchResults = searchQuery.trim()
    ? STRATEGIC_PRIORITIES.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.kabupaten.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.strategy.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleToggleSidebar = () => {
    if (sidebarMode === 'expanded') {
      onSetSidebarMode('compact');
    } else if (sidebarMode === 'compact') {
      onSetSidebarMode('hidden');
    } else {
      onSetSidebarMode('expanded');
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-[#DDE3EA] flex items-center justify-between px-4 sm:px-6 shrink-0 transition-all shadow-2xs">
      {/* Left: Sidebar Toggle Button & Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs">
        {/* Sidebar Minimize/Maximize Master Button */}
        <button
          onClick={handleToggleSidebar}
          className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 ${
            sidebarMode === 'hidden'
              ? 'bg-[#2563EB] text-white border-blue-600 shadow-xs'
              : 'bg-[#F5F7FA] text-[#17212B] border-[#DDE3EA] hover:bg-slate-100'
          }`}
          title={
            sidebarMode === 'hidden'
              ? 'Menu sedang tertutup. Klik untuk membuka menu kembali.'
              : sidebarMode === 'compact'
              ? 'Mode ringkas. Klik untuk menyembunyikan sepenuhnya (Layar Penuh).'
              : 'Klik untuk menciutkan menu samping.'
          }
        >
          {sidebarMode === 'hidden' ? (
            <>
              <PanelLeft className="w-4 h-4 text-white" />
              <span className="font-bold text-[11px] hidden sm:inline">Buka Menu</span>
            </>
          ) : sidebarMode === 'compact' ? (
            <PanelLeftClose className="w-4 h-4 text-[#2563EB]" />
          ) : (
            <PanelLeft className="w-4 h-4 text-[#607080]" />
          )}
        </button>

        {/* Fullscreen Page Mode Toggle */}
        <button
          onClick={() => onSetSidebarMode(sidebarMode === 'hidden' ? 'expanded' : 'hidden')}
          className="p-1.5 rounded-lg border border-[#DDE3EA] bg-white hover:bg-slate-50 text-[#607080] hover:text-[#17212B] transition-colors hidden md:flex items-center gap-1"
          title={sidebarMode === 'hidden' ? 'Kembalikan Menu Samping' : 'Mode Layar Penuh (Sembunyikan Menu)'}
        >
          {sidebarMode === 'hidden' ? (
            <Minimize2 className="w-3.5 h-3.5 text-blue-600" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5" />
          )}
          <span className="text-[10px] font-semibold hidden lg:inline">
            {sidebarMode === 'hidden' ? 'Keluar Full' : 'Layar Penuh'}
          </span>
        </button>

        {/* Breadcrumb Path */}
        <div className="flex items-center gap-1.5 text-xs truncate">
          <span className="text-[#607080] font-medium hidden sm:inline">{screenInfo.group}</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-[#17212B] font-bold truncate">{screenInfo.title}</span>

          {/* Pilot Badge */}
          <div className="hidden xl:flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] text-[11px] font-semibold border border-blue-100">
            <MapPin className="w-3 h-3" />
            <span>Pilot Jawa Tengah</span>
          </div>
        </div>
      </div>

      {/* Middle: Global Search */}
      <div className="relative w-48 sm:w-72 lg:w-80 hidden md:block">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#607080] absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Cari pelanggan, area, outlet..."
            className="w-full bg-[#F5F7FA] border border-[#DDE3EA] focus:border-[#2563EB] focus:bg-white text-xs text-[#17212B] placeholder:text-[#607080] rounded-lg pl-9 pr-8 py-2 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchFocused && searchQuery && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#DDE3EA] rounded-lg shadow-lg p-2 z-50 text-xs">
            <div className="text-[10px] font-semibold text-[#607080] px-2 py-1">HASIL PENCARIAN STRATEGIS</div>
            {searchResults.length > 0 ? (
              searchResults.map((res) => (
                <button
                  key={res.id}
                  onClick={() => {
                    if (res.strategy === 'DEFEND') onSelectScreen('pertahanan-pasar');
                    else if (res.strategy === 'RETAIN') onSelectScreen('retensi');
                    else onSelectScreen('akuisisi');
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-2 rounded hover:bg-slate-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-[#17212B]">{res.name}</div>
                    <div className="text-[11px] text-[#607080]">{res.kabupaten} · Skor: {res.score}</div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      res.strategy === 'DEFEND'
                        ? 'bg-red-50 text-[#C73E3A]'
                        : res.strategy === 'RETAIN'
                        ? 'bg-amber-50 text-[#D97706]'
                        : 'bg-teal-50 text-[#0F7C7B]'
                    }`}
                  >
                    {res.strategy}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-3 text-center text-[#607080]">
                Tidak ditemukan hasil untuk &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Pilot Region Selector */}
        <div className="relative hidden xl:block">
          <button
            onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#DDE3EA] bg-white hover:bg-slate-50 text-xs text-[#17212B] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#0F7C7B]" />
            <span className="font-medium">Jawa Tengah</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          {isRegionDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-[#DDE3EA] rounded-lg shadow-lg p-2 z-50 text-xs">
              <div className="px-2 py-1 font-semibold text-[10px] text-[#607080]">CAKUPAN PILOT</div>
              <div className="px-2 py-1.5 flex items-center justify-between text-[#17212B] font-medium bg-blue-50 rounded">
                <span>Jawa Tengah (Aktif)</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
              </div>
              <div className="px-2 py-1.5 text-slate-400 cursor-not-allowed">
                <span>Jawa Timur (Segera Hadir)</span>
              </div>
              <div className="px-2 py-1.5 text-slate-400 cursor-not-allowed">
                <span>Jawa Barat (Segera Hadir)</span>
              </div>
            </div>
          )}
        </div>

        {/* Period Selector */}
        <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#DDE3EA] bg-white text-xs text-[#17212B]">
          <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
          <span className="font-medium">September 2026</span>
        </div>

        {/* Quick Tanya SERVEON Agent Trigger */}
        <button
          onClick={() => onOpenAgentModal()}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#0F7C7B] to-[#2563EB] text-white text-xs font-semibold hover:opacity-95 transition-opacity shadow-xs"
          title="Buka asisten kecerdasan keputusan SERVEON"
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tanya Agent</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotificationDrawer}
          className="relative p-2 text-[#607080] hover:text-[#17212B] hover:bg-slate-100 rounded-lg transition-colors"
          title="Notifikasi & Tindakan Menunggu Persetujuan"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C73E3A]" />
        </button>

        {/* Dedicated Menu Login Direct Button */}
        <button
          onClick={() => onSelectScreen('login')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
            currentScreen === 'login'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-[#DDE3EA] bg-white hover:bg-slate-50 text-[#17212B]'
          }`}
          title="Buka Halaman Login & Autentikasi"
        >
          <LogIn className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">Menu Login</span>
        </button>

        {/* User Profile & Demo Role Switcher */}
        <div className="relative pl-1 border-l border-[#DDE3EA]">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-blue-600 text-white font-bold text-xs flex items-center justify-center border border-slate-200">
              JA
            </div>
            <div className="hidden lg:block leading-tight">
              <div className="text-xs font-semibold text-[#17212B]">Johanes</div>
              <div className="text-[10px] text-[#0F7C7B] font-medium">{userRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#607080]" />
          </button>

          {/* Role & Auth Dropdown */}
          {isRoleDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#DDE3EA] rounded-xl shadow-xl p-2 z-50 text-xs">
              <div className="px-3 py-2 border-b border-[#DDE3EA]/80 mb-1">
                <div className="font-bold text-[#17212B]">Johanes Administrator</div>
                <div className="text-[11px] text-[#607080]">johanes.admin@serveon.id</div>
              </div>

              {/* Login Page Link */}
              <div className="p-1 space-y-1 border-b border-[#DDE3EA]/80 mb-2">
                <button
                  onClick={() => {
                    setIsRoleDropdownOpen(false);
                    onSelectScreen('login');
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Buka Halaman Login</span>
                </button>

                <button
                  onClick={() => {
                    setIsRoleDropdownOpen(false);
                    if (onLogout) onLogout();
                    else onSelectScreen('login');
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-red-600 hover:bg-red-50 font-semibold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar dari Akun (Logout)</span>
                </button>
              </div>

              <div className="px-2 py-1 font-semibold text-[10.5px] text-[#607080]">
                SIMULASI PERAN (ROLE ACCESS)
              </div>
              <div className="space-y-0.5 max-h-52 overflow-y-auto">
                {ALL_ROLES.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      onChangeUserRole(role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      userRole === role
                        ? 'bg-blue-50 text-[#2563EB] font-semibold'
                        : 'text-[#17212B] hover:bg-slate-50'
                    }`}
                  >
                    <span>{role}</span>
                    {userRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
