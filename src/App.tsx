import React, { useState } from 'react';
import { PageType, Visit, Agency, DashboardStats, AgencyMemory } from './types';
import { INITIAL_STATS, INITIAL_AGENCIES, INITIAL_VISITS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Dashboard } from './components/Dashboard';
import { VisitsPage } from './components/VisitsPage';
import { AgencyDetailDrawer } from './components/AgencyDetailDrawer';
import { NewVisitModal } from './components/NewVisitModal';
import { AgencyProfilePage } from './components/AgencyProfilePage';
import { AIAssistantPage } from './components/AIAssistantPage';
import { AgenciesListPage } from './components/AgenciesListPage';
import { CalendarPage } from './components/CalendarPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [agencies, setAgencies] = useState<Agency[]>(INITIAL_AGENCIES);
  const [visits, setVisits] = useState<Visit[]>(INITIAL_VISITS);

  // Selected entities for Drawer or Full Profile Page
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(INITIAL_AGENCIES[0]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  // Modal, Drawer, and Mobile Navigation states
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isNewVisitModalOpen, setIsNewVisitModalOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Global search
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle visit row click -> open right drawer for agency detail
  const handleSelectVisit = (visit: Visit) => {
    setSelectedVisit(visit);
    const agency = agencies.find((a) => a.id === visit.acenteId) || agencies[0];
    setSelectedAgency(agency);
    setIsDrawerOpen(true);
  };

  // Handle agency click -> open drawer or navigate to full profile
  const handleSelectAgency = (agency: Agency) => {
    setSelectedAgency(agency);
    setCurrentPage('agency-profile');
  };

  // Save new visit
  const handleSaveNewVisit = (newVisit: Visit, memoryUpdate?: Partial<AgencyMemory>) => {
    setVisits((prev) => [newVisit, ...prev]);

    // Update stats
    setStats((prev) => ({
      ...prev,
      toplamZiyaret: prev.toplamZiyaret + 1,
      gerçeklesen: prev.gerçeklesen + 1,
      aiOzetSayisi: prev.aiOzetSayisi + 1,
    }));

    // If memory was extracted by AI, update agency's memory
    if (memoryUpdate) {
      setAgencies((prev) =>
        prev.map((agency) => {
          if (agency.id === newVisit.acenteId) {
            return {
              ...agency,
              sonZiyaretTarihi: newVisit.tarih,
              memory: {
                ...agency.memory,
                ...memoryUpdate,
                sonZiyaretOzet: {
                  tarih: newVisit.tarih,
                  notlar: [newVisit.not],
                },
              },
            };
          }
          return agency;
        })
      );
    }

    setIsNewVisitModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F6F8FB] font-sans text-slate-800 antialiased overflow-hidden select-none relative">
      {/* Sidebar Component with Mobile Drawer support */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Header */}
        <Header
          onOpenNewVisitModal={() => setIsNewVisitModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleMobileMenu={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          title={
            currentPage === 'dashboard'
              ? 'Genel Gösterge Paneli'
              : currentPage === 'visits'
              ? 'Ziyaretler'
              : currentPage === 'agencies'
              ? 'Acenteler'
              : currentPage === 'agency-profile'
              ? 'Acente Detay Profili'
              : currentPage === 'ai-assistant'
              ? 'AI Asistan'
              : currentPage === 'calendar'
              ? 'Saha Takvimi'
              : currentPage === 'reports'
              ? 'Raporlar'
              : 'Ayarlar'
          }
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 pb-20 sm:pb-12">
          {currentPage === 'dashboard' && (
            <Dashboard
              stats={stats}
              visits={visits}
              agencies={agencies}
              onNavigate={setCurrentPage}
              onOpenNewVisitModal={() => setIsNewVisitModalOpen(true)}
              onSelectVisit={handleSelectVisit}
              onSelectAgency={handleSelectAgency}
            />
          )}

          {currentPage === 'visits' && (
            <VisitsPage
              visits={visits}
              agencies={agencies}
              onSelectVisit={handleSelectVisit}
              onOpenNewVisitModal={() => setIsNewVisitModalOpen(true)}
            />
          )}

          {currentPage === 'agencies' && (
            <AgenciesListPage
              agencies={agencies}
              onSelectAgency={handleSelectAgency}
              onOpenNewVisitModal={() => setIsNewVisitModalOpen(true)}
            />
          )}

          {currentPage === 'agency-profile' && selectedAgency && (
            <AgencyProfilePage
              agency={selectedAgency}
              visits={visits}
              onBack={() => setCurrentPage('agencies')}
              onOpenNewVisitModal={() => setIsNewVisitModalOpen(true)}
            />
          )}

          {currentPage === 'ai-assistant' && <AIAssistantPage />}

          {currentPage === 'calendar' && (
            <CalendarPage
              visits={visits}
              onOpenNewVisitModal={() => setIsNewVisitModalOpen(true)}
              onSelectVisit={handleSelectVisit}
            />
          )}

          {currentPage === 'reports' && <ReportsPage />}

          {currentPage === 'settings' && <SettingsPage />}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <MobileBottomNav
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Right Drawer (Acente Detayı) */}
      {isDrawerOpen && (
        <AgencyDetailDrawer
          agency={selectedAgency}
          visit={selectedVisit}
          onClose={() => setIsDrawerOpen(false)}
          onViewFullProfile={(agencyId) => {
            setIsDrawerOpen(false);
            const agency = agencies.find((a) => a.id === agencyId);
            if (agency) setSelectedAgency(agency);
            setCurrentPage('agency-profile');
          }}
        />
      )}

      {/* Modal: Yeni Ziyaret Kaydı */}
      {isNewVisitModalOpen && (
        <NewVisitModal
          agencies={agencies}
          onClose={() => setIsNewVisitModalOpen(false)}
          onSave={handleSaveNewVisit}
        />
      )}
    </div>
  );
}

