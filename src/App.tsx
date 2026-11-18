import React, { useState, useEffect } from 'react';
import { NavigationSidebar, AppView } from './components/NavigationSidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { LiveTranslatorView } from './components/LiveTranslatorView';
import { SmartHospitalDeskView } from './components/SmartHospitalDeskView';
import { SignDictionaryView } from './components/SignDictionaryView';
import { MedicalPhrasebookView } from './components/MedicalPhrasebookView';
import { SessionHistoryView } from './components/SessionHistoryView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { DocsPortalView } from './components/DocsPortalView';
import { ModelInspectorModal } from './components/ModelInspectorModal';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ShieldCheck, Github, Stethoscope } from 'lucide-react';

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState<boolean>(false);
  const { t } = useLanguage();

  // URL Path Synchronization
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const target = `${path} ${hash}`;

      if (target.includes('translator')) {
        setCurrentView('translator');
      } else if (target.includes('desk')) {
        setCurrentView('desk');
      } else if (target.includes('dictionary')) {
        setCurrentView('dictionary');
      } else if (target.includes('phrasebook')) {
        setCurrentView('phrasebook');
      } else if (target.includes('history')) {
        setCurrentView('history');
      } else if (target.includes('analytics')) {
        setCurrentView('analytics');
      } else if (target.includes('settings')) {
        setCurrentView('settings');
      } else if (target.includes('docs')) {
        setCurrentView('docs');
      } else {
        setCurrentView('dashboard');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    const targetPath = view === 'dashboard' ? '/' : `/${view}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-obsidian-900 bg-mesh-glow text-offwhite-100 flex font-sans selection:bg-crimson-800 selection:text-offwhite-100">
      
      {/* 1. Collapsible Desktop Sidebar + Mobile Drawer */}
      <NavigationSidebar 
        currentView={currentView}
        onViewChange={handleViewChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Application Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Compact Clinical Header */}
        <TopHeader 
          currentView={currentView}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenModelCard={() => setIsModelModalOpen(true)}
          onQuickStart={() => handleViewChange('translator')}
        />

        {/* Viewport Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-7">
          {currentView === 'dashboard' && <DashboardView onNavigate={handleViewChange} />}
          {currentView === 'translator' && <LiveTranslatorView />}
          {currentView === 'desk' && <SmartHospitalDeskView />}
          {currentView === 'dictionary' && <SignDictionaryView onNavigate={handleViewChange} />}
          {currentView === 'phrasebook' && <MedicalPhrasebookView onNavigate={handleViewChange} />}
          {currentView === 'history' && <SessionHistoryView />}
          {currentView === 'analytics' && <AnalyticsView />}
          {currentView === 'settings' && <SettingsView />}
          {currentView === 'docs' && <DocsPortalView />}
        </main>

        {/* Clinical Clean Footer */}
        <footer className="bg-obsidian-950 border-t border-crimson-800/30 py-6 px-4 sm:px-6 lg:px-8 text-xs text-offwhite-400 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-col items-center md:items-start space-y-0.5">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-offwhite-100 font-bengali text-sm">
                  ভাষা দৃষ্টি (Bhasha-Drishti)
                </span>
                <span className="px-2 py-0.2 rounded-full bg-crimson-900/40 text-crimson-300 font-mono text-[10px] border border-crimson-700/50">
                  SmartHospital AI
                </span>
              </div>
              <p className="text-offwhite-400 text-center md:text-left text-[11px]">
                {t(
                  'টিম Tensor_Titan দ্বারা International AI Builders Congress (CloudCamp Bangladesh)-এর জন্য নির্মিত।',
                  'Engineered by Team Tensor_Titan for International AI Builders Congress (CloudCamp Bangladesh).'
                )}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-[11px] font-mono text-offwhite-400 hidden sm:block">
                Lead Builder: <strong className="text-crimson-400">MD. Emon Hossain</strong>
              </div>
              <a
                href="https://github.com/mohammademon10/Bhasha-Drishti"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-offwhite-100 transition font-mono border border-crimson-800/30"
              >
                <Github className="w-3.5 h-3.5 text-offwhite-100" />
                <span>GitHub</span>
              </a>
              <button
                onClick={() => handleViewChange('docs')}
                className="px-3 py-1.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-crimson-300 transition font-mono border border-crimson-800/40"
              >
                /docs
              </button>
            </div>

          </div>
        </footer>

      </div>

      {/* Model Inspector Modal */}
      <ModelInspectorModal 
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
