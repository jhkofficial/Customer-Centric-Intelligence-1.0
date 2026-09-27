import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Route,
  GitFork,
  PhoneCall,
  Sparkles,
  Send,
  MessageSquare,
  Clock,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { ScreenId } from '../types';
import {
  OrchestrationSubmenuId,
  ProspectProfile
} from '../types/orchestration';
import { INITIAL_PROSPECTS } from '../data/orchestrationData';

// 10 Submodule Tabs
import { OrchestrationOverviewTab } from '../components/orchestration/OrchestrationOverviewTab';
import { CustomerJourneyTab } from '../components/orchestration/CustomerJourneyTab';
import { JourneyBuilderTab } from '../components/orchestration/JourneyBuilderTab';
import { ProspectFollowUpTab } from '../components/orchestration/ProspectFollowUpTab';
import { NextBestActionTab } from '../components/orchestration/NextBestActionTab';
import { CampaignManagementTab } from '../components/orchestration/CampaignManagementTab';
import { OmnichannelCommunicationTab } from '../components/orchestration/OmnichannelCommunicationTab';
import { NurtureReengagementTab } from '../components/orchestration/NurtureReengagementTab';
import { ContactPolicyTab } from '../components/orchestration/ContactPolicyTab';
import { JourneyAnalyticsTab } from '../components/orchestration/JourneyAnalyticsTab';

// Modals and Drawers
import { RecordFollowUpModal } from '../components/orchestration/RecordFollowUpModal';
import { AiExplanationModal } from '../components/orchestration/AiExplanationModal';
import { Customer360Drawer } from '../components/orchestration/Customer360Drawer';

export interface SubViewItem {
  id: OrchestrationSubmenuId;
  label: string;
  icon: React.ElementType;
  badge?: string;
  description: string;
}

export interface ModuleGroup {
  id: 'journey' | 'followup' | 'campaign' | 'governance';
  title: string;
  shortTitle: string;
  icon: React.ElementType;
  description: string;
  subviews: SubViewItem[];
}

const MODULE_GROUPS: ModuleGroup[] = [
  {
    id: 'journey',
    title: 'Journey & Orkestrasi',
    shortTitle: 'Journey',
    icon: Route,
    description: 'Pemetaan alur prospek, funnel, dan alur automasi',
    subviews: [
      {
        id: 'overview',
        label: 'Ikhtisar Orkestrasi',
        icon: LayoutDashboard,
        description: 'Funnel makro, metrik konversi operasional & KPI'
      },
      {
        id: 'customer-journey',
        label: 'Customer Journey',
        icon: Route,
        badge: 'Interaktif',
        description: 'Visualisasi lintasan prospek individual step-by-step'
      },
      {
        id: 'journey-builder',
        label: 'Journey Builder',
        icon: GitFork,
        description: 'Desain alur kerja otomasi & pemicu aksi prospek'
      }
    ]
  },
  {
    id: 'followup',
    title: 'Tindak Lanjut & Eksekusi',
    shortTitle: 'Follow-Up & NBA',
    icon: PhoneCall,
    description: 'Antrean sales, rekomendasi Next Best Action AI, & re-engagement',
    subviews: [
      {
        id: 'prospect-followup',
        label: 'Antrean Follow-Up',
        icon: PhoneCall,
        badge: 'Live SLA',
        description: 'Worklist operasional sales & pelacakan batas waktu SLA'
      },
      {
        id: 'next-best-action',
        label: 'Next Best Action AI',
        icon: Sparkles,
        badge: 'AI Engine',
        description: 'Rekomendasi preskriptif aksi berikutnya dengan alasan AI'
      },
      {
        id: 'nurture-reengagement',
        label: 'Nurture & Re-Engage',
        icon: Clock,
        description: 'Radar peluang reaktivasi prospek dengan sinyal baru'
      }
    ]
  },
  {
    id: 'campaign',
    title: 'Kampanye & Omnichannel',
    shortTitle: 'Kampanye & Chat',
    icon: Send,
    description: 'Manajemen kampanye multi-kanal & live thread komunikasi',
    subviews: [
      {
        id: 'campaign-management',
        label: 'Manajemen Kampanye',
        icon: Send,
        description: 'Siklus kampanye, alokasi anggaran & pelacakan ROI'
      },
      {
        id: 'omnichannel',
        label: 'Komunikasi Omnichannel',
        icon: MessageSquare,
        description: 'Unified stream WhatsApp, telepon CTI, & kunjungan dealer'
      }
    ]
  },
  {
    id: 'governance',
    title: 'Analitik & Tata Kelola',
    shortTitle: 'Analitik & PDP',
    icon: BarChart3,
    description: 'Analisis kecepatan deal, kepatuhan cabang, & batas kontak UU PDP',
    subviews: [
      {
        id: 'journey-analytics',
        label: 'Analitik Perjalanan',
        icon: BarChart3,
        description: 'Kecepatan konversi ke deal & kepatuhan SLA antar cabang'
      },
      {
        id: 'contact-policy',
        label: 'Kebijakan Kontak (UU PDP)',
        icon: ShieldCheck,
        badge: 'UU PDP',
        description: 'Anti-fatigue rule, jam tenang, & registri Do-Not-Contact'
      }
    ]
  }
];

interface CampaignOmnichannelScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
  initialSubmenu?: OrchestrationSubmenuId;
}

export const CampaignOmnichannelScreen: React.FC<CampaignOmnichannelScreenProps> = ({
  onNavigateToScreen,
  onShowToast,
  initialSubmenu = 'overview'
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState<OrchestrationSubmenuId>(initialSubmenu);
  const [prospects, setProspects] = useState<ProspectProfile[]>(INITIAL_PROSPECTS);

  // Modal / Drawer states
  const [followUpProspect, setFollowUpProspect] = useState<ProspectProfile | null>(null);
  const [aiModalProspect, setAiModalProspect] = useState<ProspectProfile | null>(null);
  const [drawerProspect, setDrawerProspect] = useState<ProspectProfile | null>(null);

  // Identify which group the active submenu belongs to
  const activeGroup = useMemo(() => {
    return (
      MODULE_GROUPS.find((group) =>
        group.subviews.some((sub) => sub.id === activeSubmenu)
      ) || MODULE_GROUPS[0]
    );
  }, [activeSubmenu]);

  const handleSelectGroup = (group: ModuleGroup) => {
    // If current submenu is not in this group, default to first subview of that group
    if (!group.subviews.some((s) => s.id === activeSubmenu)) {
      const defaultSub = group.subviews[0].id;
      setActiveSubmenu(defaultSub);
      onShowToast(`Beralih ke kategori: ${group.title}`);
    }
  };

  const handleSelectSubView = (subId: OrchestrationSubmenuId, label: string) => {
    setActiveSubmenu(subId);
    onShowToast(`Membuka: ${label}`);
  };

  const handleOpenFollowUp = (p: ProspectProfile) => {
    setFollowUpProspect(p);
  };

  const handleSaveFollowUp = (updated: ProspectProfile) => {
    setProspects((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setFollowUpProspect(null);
  };

  const renderActiveSubmenu = () => {
    switch (activeSubmenu) {
      case 'overview':
        return (
          <OrchestrationOverviewTab
            onSelectProspect={(p) => setDrawerProspect(p)}
            onNavigateSubmenu={(sub) => setActiveSubmenu(sub)}
            onOpenFollowUpModal={handleOpenFollowUp}
            onShowToast={onShowToast}
          />
        );
      case 'customer-journey':
        return (
          <CustomerJourneyTab
            onShowToast={onShowToast}
            onNavigateSubmenu={(sub) => setActiveSubmenu(sub)}
          />
        );
      case 'journey-builder':
        return (
          <JourneyBuilderTab
            onShowToast={onShowToast}
            onNavigateSubmenu={(sub) => setActiveSubmenu(sub)}
          />
        );
      case 'prospect-followup':
        return (
          <ProspectFollowUpTab
            prospects={prospects}
            onOpenFollowUpModal={handleOpenFollowUp}
            onOpenCustomerDrawer={(p) => setDrawerProspect(p)}
            onOpenAiExplanation={(p) => setAiModalProspect(p)}
            onShowToast={onShowToast}
          />
        );
      case 'next-best-action':
        return (
          <NextBestActionTab
            onShowToast={onShowToast}
            onOpenAiExplanation={(p) => setAiModalProspect(p)}
            onOpenCustomerDrawer={(p) => setDrawerProspect(p)}
          />
        );
      case 'campaign-management':
        return <CampaignManagementTab onShowToast={onShowToast} />;
      case 'omnichannel':
        return (
          <OmnichannelCommunicationTab
            onShowToast={onShowToast}
            onOpenFollowUpModal={handleOpenFollowUp}
            onOpenCustomerDrawer={(p) => setDrawerProspect(p)}
          />
        );
      case 'nurture-reengagement':
        return (
          <NurtureReengagementTab
            onShowToast={onShowToast}
            onOpenFollowUpModal={handleOpenFollowUp}
            onOpenCustomerDrawer={(p) => setDrawerProspect(p)}
          />
        );
      case 'contact-policy':
        return <ContactPolicyTab onShowToast={onShowToast} />;
      case 'journey-analytics':
        return <JourneyAnalyticsTab onShowToast={onShowToast} />;
      default:
        return (
          <OrchestrationOverviewTab
            onSelectProspect={(p) => setDrawerProspect(p)}
            onNavigateSubmenu={(sub) => setActiveSubmenu(sub)}
            onOpenFollowUpModal={handleOpenFollowUp}
            onShowToast={onShowToast}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#DDE3EA] shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#0F7C7B] uppercase tracking-wider bg-[#0F7C7B]/10 px-2 py-0.5 rounded">
              ENTERPRISE ORCHESTRATION ENGINE
            </span>
            <span className="text-xs text-[#607080]">Astra Motor Jawa Tengah</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B] mt-0.5">
            Orkestrasi Campaign &amp; Omnichannel
          </h1>
          <p className="text-xs text-[#607080] mt-0.5">
            Kelola alur perjalanan prospek, tindak lanjut sales cabang, rekomendasi AI, dan konversi multi-kanal.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setActiveSubmenu('prospect-followup');
              onShowToast('Membuka antrean tindak lanjut prospek hari ini.');
            }}
            className="px-3 py-1.5 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Lihat antrean follow-up sales"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
            <span>Follow-Up Due (428)</span>
          </button>
          <button
            onClick={() => {
              setActiveSubmenu('next-best-action');
              onShowToast('Membuka rekomendasi Next Best Action AI.');
            }}
            className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Lihat rekomendasi AI preskriptif"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Next Best Action</span>
          </button>
        </div>
      </div>

      {/* Streamlined Menu Navigation: 4 Core Pillars + Sub-views */}
      <div className="bg-white border border-[#DDE3EA] rounded-2xl p-3 shadow-2xs space-y-3">
        {/* Tier 1: 4 Core Functional Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {MODULE_GROUPS.map((group) => {
            const Icon = group.icon;
            const isGroupActive = activeGroup.id === group.id;

            return (
              <button
                key={group.id}
                onClick={() => handleSelectGroup(group)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all relative ${
                  isGroupActive
                    ? 'bg-[#15324B] text-white shadow-sm ring-1 ring-[#15324B]'
                    : 'bg-[#F8FAFC] hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isGroupActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate">
                    {group.title}
                  </div>
                  <div
                    className={`text-[10.5px] truncate ${
                      isGroupActive ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {group.subviews.length} modul terpadu
                  </div>
                </div>
                {isGroupActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tier 2: Segmented Sub-view Controls for the Active Pillar */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">
              Tampilan:
            </span>
            {activeGroup.subviews.map((sub) => {
              const SubIcon = sub.icon;
              const isSubActive = activeSubmenu === sub.id;

              return (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubView(sub.id, sub.label)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSubActive
                      ? 'bg-[#2563EB] text-white shadow-2xs font-bold'
                      : 'bg-slate-100/90 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                  title={sub.description}
                >
                  <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{sub.label}</span>
                  {sub.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                        isSubActive
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {sub.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 italic hidden lg:block">
            {activeGroup.description}
          </div>
        </div>
      </div>

      {/* Render Active Submenu Screen */}
      <div>{renderActiveSubmenu()}</div>

      {/* Modals and Drawers */}
      {followUpProspect && (
        <RecordFollowUpModal
          prospect={followUpProspect}
          isOpen={!!followUpProspect}
          onClose={() => setFollowUpProspect(null)}
          onSaveResult={handleSaveFollowUp}
          onShowToast={onShowToast}
        />
      )}

      {aiModalProspect && (
        <AiExplanationModal
          prospect={aiModalProspect}
          isOpen={!!aiModalProspect}
          onClose={() => setAiModalProspect(null)}
          onShowToast={onShowToast}
        />
      )}

      {drawerProspect && (
        <Customer360Drawer
          prospect={drawerProspect}
          isOpen={!!drawerProspect}
          onClose={() => setDrawerProspect(null)}
          onOpenFollowUpModal={handleOpenFollowUp}
          onOpenAiExplanation={(p) => setAiModalProspect(p)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
};
