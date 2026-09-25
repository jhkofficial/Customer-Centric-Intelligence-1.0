import React, { useState } from 'react';
import { Sidebar, SidebarMode } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { ContextFilterBar } from './components/layout/ContextFilterBar';
import { AgentModal } from './components/common/AgentModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { HelpModal } from './components/common/HelpModal';

// Screens
import { LoginScreen } from './screens/LoginScreen';
import { ExecutiveSummaryScreen } from './screens/ExecutiveSummaryScreen';
import { Customer360Screen } from './screens/Customer360Screen';
import { CustomerSegmentationScreen } from './screens/CustomerSegmentationScreen';
import { CustomerDistributionScreen } from './screens/CustomerDistributionScreen';
import { MapDensityScreen } from './screens/MapDensityScreen';
import { NetworkCoverageScreen } from './screens/NetworkCoverageScreen';
import { MarketPoiDemographicsScreen } from './screens/MarketPoiDemographicsScreen';
import { RetentionScreen } from './screens/RetentionScreen';
import { MarketDefenseScreen } from './screens/MarketDefenseScreen';
import { AcquisitionScreen } from './screens/AcquisitionScreen';
import { LocationCandidateScreen } from './screens/LocationCandidateScreen';
import { StrategicRankingScreen } from './screens/StrategicRankingScreen';
import { ExplainabilityScreen } from './screens/ExplainabilityScreen';
import { CampaignOmnichannelScreen } from './screens/CampaignOmnichannelScreen';
import { ActivityOutcomeScreen } from './screens/ActivityOutcomeScreen';
import { ServeonAgentScreen } from './screens/ServeonAgentScreen';
import { DataModelMonitoringScreen } from './screens/DataModelMonitoringScreen';
import { AuditGovernanceScreen } from './screens/AuditGovernanceScreen';
import { AdministrationScreen } from './screens/AdministrationScreen';

import { ScreenId, UserRole } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('login');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Administrator');
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('expanded');

  // Global Context Filter State
  const [selectedRegency, setSelectedRegency] = useState('Semua Kabupaten/Kota');
  const [selectedSegment, setSelectedSegment] = useState('Semua Segmen');
  const [selectedProduct, setSelectedProduct] = useState('Semua Produk');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');

  // Modals
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [agentInitialPrompt, setAgentInitialPrompt] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenAgent = (prompt?: string) => {
    setAgentInitialPrompt(prompt || '');
    setIsAgentModalOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedRegency('Semua Kabupaten/Kota');
    setSelectedSegment('Semua Segmen');
    setSelectedProduct('Semua Produk');
    setSelectedStatus('Semua Status');
    showToast('Semua filter konteks telah dikembalikan ke kondisi default.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
    showToast('Sesi kerja diakhiri. Silakan login kembali untuk mengakses data.');
  };

  // If user is directly accessing Login Screen or logged out
  if (!isAuthenticated || currentScreen === 'login') {
    return (
      <LoginScreen
        initialRole={currentUserRole}
        onLoginSuccess={(role) => {
          if (role) {
            setCurrentUserRole(role);
          }
          setIsAuthenticated(true);
          setCurrentScreen('ringkasan-eksekutif');
          showToast(`Selamat datang di SERVEON — Jawa Tengah (${role || currentUserRole}).`);
        }}
      />
    );
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'ringkasan-eksekutif':
        return (
          <ExecutiveSummaryScreen
            onNavigateToScreen={setCurrentScreen}
            onOpenAgentModal={handleOpenAgent}
            onShowToast={showToast}
          />
        );
      case 'pelanggan-360':
        return (
          <Customer360Screen
            onNavigateToScreen={setCurrentScreen}
            onOpenAgentModal={handleOpenAgent}
            onShowToast={showToast}
          />
        );
      case 'segmentasi-pelanggan':
        return (
          <CustomerSegmentationScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'distribusi-pelanggan':
        return (
          <CustomerDistributionScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'peta-kepadatan':
        return (
          <MapDensityScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'jaringan-cakupan':
        return (
          <NetworkCoverageScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'pasar-poi-demografi':
        return (
          <MarketPoiDemographicsScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'retensi':
        return (
          <RetentionScreen
            onNavigateToScreen={setCurrentScreen}
            onOpenAgentModal={handleOpenAgent}
            onShowToast={showToast}
            currentUserRole={currentUserRole}
          />
        );
      case 'pertahanan-pasar':
        return (
          <MarketDefenseScreen
            onNavigateToScreen={setCurrentScreen}
            onOpenAgentModal={handleOpenAgent}
            onShowToast={showToast}
            currentUserRole={currentUserRole}
          />
        );
      case 'akuisisi':
        return (
          <AcquisitionScreen
            onNavigateToScreen={setCurrentScreen}
            onOpenAgentModal={handleOpenAgent}
            onShowToast={showToast}
            currentUserRole={currentUserRole}
          />
        );
      case 'kandidat-lokasi':
        return (
          <LocationCandidateScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'peringkat-strategis':
        return (
          <StrategicRankingScreen
            onNavigateToScreen={setCurrentScreen}
            onOpenAgentModal={handleOpenAgent}
            onShowToast={showToast}
          />
        );
      case 'explainability':
        return (
          <ExplainabilityScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'campaign-omnichannel':
        return (
          <CampaignOmnichannelScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'aktivitas-hasil':
        return (
          <ActivityOutcomeScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'serveon-agent':
        return (
          <ServeonAgentScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'monitoring-data-model':
        return (
          <DataModelMonitoringScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'audit-governance':
        return (
          <AuditGovernanceScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case 'administrasi':
        return (
          <AdministrationScreen
            onNavigateToScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      default:
        return (
          <ExecutiveSummaryScreen
            onNavigateToScreen={setCurrentScreen}
            onOpenAgentModal={handleOpenAgent}
            onShowToast={showToast}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#F5F7FA] text-[#17212B] overflow-hidden antialiased">
      {/* Persistent Left Sidebar with Expand, Compact & Full Hidden (0px) support */}
      <Sidebar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        sidebarMode={sidebarMode}
        onSetSidebarMode={setSidebarMode}
        userRole={currentUserRole}
        onLogout={handleLogout}
      />

      {/* Main Content Area - Expands to 100% Full Width when sidebar is hidden */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <TopBar
          currentScreen={currentScreen}
          onSelectScreen={setCurrentScreen}
          userRole={currentUserRole}
          onChangeUserRole={setCurrentUserRole}
          onOpenAgentModal={handleOpenAgent}
          onOpenNotificationDrawer={() => setIsNotificationOpen(true)}
          onOpenHelpModal={() => setIsHelpOpen(true)}
          sidebarMode={sidebarMode}
          onSetSidebarMode={setSidebarMode}
          onLogout={handleLogout}
        />

        {/* Global Context Filters (sticky below topbar) */}
        {currentScreen !== 'serveon-agent' && currentScreen !== 'administrasi' && (
          <ContextFilterBar
            selectedRegency={selectedRegency}
            onSelectRegency={setSelectedRegency}
            selectedSegment={selectedSegment}
            onSelectSegment={setSelectedSegment}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
            selectedStatus={selectedStatus}
            onSelectStatus={setSelectedStatus}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* Scrollable Screen Content - Full Width Canvas */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6">
          <div className="w-full max-w-[1700px] mx-auto pb-12">
            {renderCurrentScreen()}
          </div>
        </main>
      </div>

      {/* Interactive Global Modals & Drawers */}
      <AgentModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
        initialPrompt={agentInitialPrompt}
        onNavigateToScreen={setCurrentScreen}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onNavigateToScreen={setCurrentScreen}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#15324B] text-white px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-3 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
