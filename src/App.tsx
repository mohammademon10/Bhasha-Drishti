import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LiveTranslatorView } from './components/LiveTranslatorView';
import { SmartHospitalDeskView } from './components/SmartHospitalDeskView';
import { DocsPortalView } from './components/DocsPortalView';
import { ModelInspectorModal } from './components/ModelInspectorModal';
import { ShieldCheck, Heart, Github, Stethoscope, Sparkles } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'translator' | 'desk' | 'docs'>('translator');
  const [isModelModalOpen, setIsModelModalOpen] = useState<boolean>(false);

  // Sync with browser URL path (supports direct /docs or /desk routes on refresh)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('docs') || window.location.hash.includes('docs')) {
        setCurrentView('docs');
      } else if (path.includes('desk') || window.location.hash.includes('desk')) {
        setCurrentView('desk');
      } else {
        setCurrentView('translator');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleViewChange = (view: 'translator' | 'desk' | 'docs') => {
    setCurrentView(view);
    const targetPath = view === 'translator' ? '/' : `/${view}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Sticky Navbar */}
      <Navbar 
        currentView={currentView}
        onViewChange={handleViewChange}
        onOpenModelCard={() => setIsModelModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'translator' && <LiveTranslatorView />}
        {currentView === 'desk' && <SmartHospitalDeskView />}
        {currentView === 'docs' && <DocsPortalView />}
      </main>

      {/* Model Inspector Modal */}
      <ModelInspectorModal 
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
      />

      {/* Clinical High-Contrast Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white font-bengali text-base">ভাষা দৃষ্টি (Bhasha Drishti)</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px]">
                SmartHospital Edition
              </span>
            </div>
            <p className="text-slate-500 text-center md:text-left">
              Built with precision by <strong>Team Tensor_Titan</strong> for the International AI Builders Congress (CloudCamp Bangladesh).
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/mohammademon10/Bhasha-Drishti"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition font-mono"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GitHub Repo</span>
            </a>

            <button
              onClick={() => handleViewChange('docs')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 transition font-mono"
            >
              View /docs Whitepaper
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-2">
          <span>Zero-Retention RAM Architecture • WCAG AAA Deaf-First Contrast • MIT License</span>
          <span className="flex items-center gap-1 text-slate-400">
            <span>Domain: HealthSphere AI</span>
            <span>•</span>
            <span>Challenge: SmartHospital</span>
          </span>
        </div>
      </footer>

    </div>
  );
}

export default App;
