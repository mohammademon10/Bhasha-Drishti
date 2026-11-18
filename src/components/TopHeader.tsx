import React from 'react';
import { 
  Menu, Cpu, Activity, Video, Volume2, ShieldCheck, 
  Globe, Stethoscope, Search, PlusCircle, CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AppView } from './NavigationSidebar';

interface TopHeaderProps {
  currentView: AppView;
  onOpenMobileMenu: () => void;
  onOpenModelCard: () => void;
  onQuickStart: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentView,
  onOpenMobileMenu,
  onOpenModelCard,
  onQuickStart
}) => {
  const { language, setLanguage, t } = useLanguage();

  const viewTitles: Record<AppView, { bn: string; en: string; path: string }> = {
    dashboard: { bn: 'ক্লিনিক্যাল ড্যাশবোর্ড', en: 'Clinical Operations Dashboard', path: '/dashboard' },
    translator: { bn: 'লাইভ সাইন ল্যাঙ্গুয়েজ অনুবাদক', en: 'Live BdSL Vision Translator', path: '/translator' },
    desk: { bn: 'স্মার্টহাসপাতাল দ্বি-মুখী ডেস্ক', en: 'SmartHospital 2-Way Clinical Desk', path: '/desk' },
    dictionary: { bn: 'বাংলা সাইন ল্যাঙ্গুয়েজ ডিকশনারি', en: 'BdSL Medical Sign Dictionary', path: '/dictionary' },
    phrasebook: { bn: 'হাসপাতাল মেডিকেল ফ্রেজবুক', en: 'Hospital Medical Phrasebook', path: '/phrasebook' },
    history: { bn: 'কনসালটেশন সেশন হিস্ট্রি', en: 'Consultation Session History', path: '/history' },
    analytics: { bn: 'এআই মডেল অ্যানালিটিক্স ও মেমোরি', en: 'AI Model Analytics & SLA Benchmark', path: '/analytics' },
    settings: { bn: 'প্ল্যাটফর্ম সেটিংস ও প্রেফারেন্স', en: 'Platform Settings & Preferences', path: '/settings' },
    docs: { bn: 'টেকনিক্যাল ডকুমেন্টেশন ও পেপার', en: 'Technical Documentation & Specs', path: '/docs' }
  };

  const currentInfo = viewTitles[currentView] || viewTitles.dashboard;

  return (
    <header className="sticky top-0 z-30 bg-obsidian-900/90 backdrop-blur-md border-b border-crimson-800/30 px-4 sm:px-6 py-3 shadow-md">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Trigger + Breadcrumb Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl bg-obsidian-800 text-offwhite-300 hover:text-offwhite-100 border border-crimson-800/30 transition"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2 text-[11px] font-mono text-offwhite-400">
              <span className="text-crimson-500 font-bold">Bhasha-Drishti</span>
              <span>/</span>
              <span className="text-offwhite-300">{currentInfo.path}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-offwhite-100 font-bengali tracking-tight flex items-center gap-2">
              <span>{t(currentInfo.bn, currentInfo.en)}</span>
            </h1>
          </div>
        </div>

        {/* Right: Live Telemetry Badges, Language Switcher, CTA */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Telemetry Pill 1: System SLA Latency */}
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-obsidian-850 border border-crimson-800/30 text-xs font-mono text-offwhite-200 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>238ms SLA</span>
          </div>

          {/* Telemetry Pill 2: AI Benchmark Accuracy Pill */}
          <button
            onClick={onOpenModelCard}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-xs font-mono font-bold text-offwhite-100 border border-crimson-800/40 hover:border-crimson-600 transition shadow-sm"
            title="Inspect Model Card, BiLSTM & FastMCP Specs"
          >
            <Cpu className="w-3.5 h-3.5 text-crimson-500 shrink-0" />
            <span>93.4% Acc</span>
          </button>

          {/* Language Switcher (বাংলা / English) */}
          <div className="flex items-center p-0.5 bg-obsidian-950 rounded-xl border border-crimson-800/40 shadow-inner">
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-bengali transition-all duration-200 ${
                language === 'bn'
                  ? 'bg-gradient-to-r from-crimson-800 to-crimson-600 text-offwhite-100 shadow-md shadow-crimson-800/30'
                  : 'text-offwhite-400 hover:text-offwhite-100'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all duration-200 ${
                language === 'en'
                  ? 'bg-gradient-to-r from-crimson-800 to-crimson-600 text-offwhite-100 shadow-md shadow-crimson-800/30'
                  : 'text-offwhite-400 hover:text-offwhite-100'
              }`}
            >
              EN
            </button>
          </div>

          {/* Header Quick CTA */}
          <button
            onClick={onQuickStart}
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl btn-crimson text-xs font-bold font-sans tracking-wide transition shadow-md"
          >
            <Video className="w-3.5 h-3.5" />
            <span>{t('লাইভ অনুবাদক', 'Live Translator')}</span>
          </button>

        </div>

      </div>
    </header>
  );
};
