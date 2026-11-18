import React from 'react';
import { Stethoscope, FileText, Video, MessageSquare, Globe, Cpu, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentView: 'translator' | 'desk' | 'docs';
  onViewChange: (view: 'translator' | 'desk' | 'docs') => void;
  onOpenModelCard: () => void;
  onOpenVideoPitchStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onViewChange, 
  onOpenModelCard,
  onOpenVideoPitchStudio
}) => {
  const { language, toggleLanguage, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-aurora-rose/15 shadow-2xl backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
          
          {/* 1. Left Logo & Brand Identity (Clean & Compact) */}
          <div 
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group shrink-0" 
            onClick={() => onViewChange('translator')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-royal-700 via-royal-600 to-aurora-rose shadow-lg shadow-aurora-rose/25 border border-white/20 transition-all group-hover:scale-105 duration-300">
              <span className="text-xl sm:text-2xl font-black text-white select-none">ভা</span>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aurora-rose opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-aurora-rose border-2 border-royal-950"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-white font-bengali">
                  ভাষা দৃষ্টি
                </span>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-aurora-rose/15 text-rose-300 border border-aurora-rose/30 font-mono font-medium">
                  SmartHospital
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-sans">
                <span className="text-rose-400 font-medium font-mono">Tensor_Titan</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-sans">{t('এআই অনুবাদক', 'AI Translator')}</span>
              </div>
            </div>
          </div>

          {/* 2. Center Dynamic Navigation Tabs (Guaranteed Single-Line & Balanced Typography) */}
          <nav className="hidden md:flex items-center p-1 bg-royal-900/90 rounded-2xl border border-aurora-rose/15 shadow-inner shrink-0">
            {/* Tab 1: Translator */}
            <button
              id="nav-translator"
              onClick={() => onViewChange('translator')}
              className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold tracking-normal whitespace-nowrap transition-all duration-300 ${
                currentView === 'translator'
                  ? 'bg-gradient-to-r from-royal-700 via-royal-600 to-aurora-rose text-white shadow-md shadow-aurora-rose/25 font-black'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Video className={`w-4 h-4 ${currentView === 'translator' ? 'text-white' : 'text-rose-400'}`} />
              <span>{t('লাইভ অনুবাদক', 'Live Translator')}</span>
              {currentView === 'translator' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              )}
            </button>

            {/* Tab 2: Hospital Desk */}
            <button
              id="nav-desk"
              onClick={() => onViewChange('desk')}
              className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold tracking-normal whitespace-nowrap transition-all duration-300 ${
                currentView === 'desk'
                  ? 'bg-gradient-to-r from-royal-700 via-royal-600 to-aurora-rose text-white shadow-md shadow-aurora-rose/25 font-black'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <MessageSquare className={`w-4 h-4 ${currentView === 'desk' ? 'text-white' : 'text-purple-400'}`} />
              <span>{t('হাসপাতাল ডেস্ক', 'Hospital Desk')}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                currentView === 'desk' ? 'bg-black/20 text-white' : 'bg-aurora-rose/20 text-rose-300'
              }`}>
                2-Way
              </span>
            </button>

            {/* Tab 3: Docs */}
            <button
              id="nav-docs"
              onClick={() => onViewChange('docs')}
              className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold tracking-normal whitespace-nowrap transition-all duration-300 ${
                currentView === 'docs'
                  ? 'bg-gradient-to-r from-royal-700 via-royal-600 to-aurora-rose text-white shadow-md shadow-aurora-rose/25 font-black'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <FileText className={`w-4 h-4 ${currentView === 'docs' ? 'text-white' : 'text-purple-300'}`} />
              <span>{t('ডকুমেন্টেশন', 'Documentation')}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                currentView === 'docs' ? 'bg-black/20 text-white' : 'bg-purple-500/20 text-purple-300'
              }`}>
                /docs
              </span>
            </button>
          </nav>

          {/* 3. Right Controls: Language Switcher & Accuracy Badge */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
            
            {/* Interactive Segmented Language Switcher (বাংলা | EN) */}
            <div className="flex items-center p-0.5 bg-royal-900 rounded-xl border border-aurora-rose/20 shadow-inner">
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 sm:py-1.2 rounded-lg text-xs font-bold font-bengali transition-all duration-200 ${
                  language === 'bn'
                    ? 'bg-gradient-to-r from-royal-700 to-aurora-rose text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 sm:py-1.2 rounded-lg text-xs font-bold font-mono transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-royal-700 to-aurora-rose text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Model Accuracy Pill */}
            <button
              onClick={onOpenModelCard}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-royal-850 hover:bg-royal-800 text-xs font-mono font-semibold text-rose-300 border border-aurora-rose/30 transition shadow-sm"
              title="Inspect Model Card & Pipeline Metrics"
            >
              <Cpu className="w-3.5 h-3.5 text-aurora-rose shrink-0" />
              <span>93.4%</span>
            </button>

            {/* 180s Video Pitch Studio Button */}
            <button
              onClick={onOpenVideoPitchStudio}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-royal-700 via-royal-600 to-aurora-rose hover:opacity-95 text-white text-xs font-mono font-bold border border-aurora-rose/40 transition shadow-md shadow-aurora-rose/20"
              title="180-Second Video Pitch Studio & Script Teleprompter"
            >
              <Video className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" />
              <span className="hidden sm:inline">{t('ভিডিও পিচ', '180s Pitch')}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer / Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-aurora-rose/15 gap-1">
          <button
            onClick={() => onViewChange('translator')}
            className={`flex items-center space-x-1.5 text-xs py-1.5 px-3 rounded-xl font-bold whitespace-nowrap ${
              currentView === 'translator' 
                ? 'bg-gradient-to-r from-royal-700 to-aurora-rose text-white shadow-sm' 
                : 'text-slate-400'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{t('অনুবাদক', 'Translator')}</span>
          </button>
          
          <button
            onClick={() => onViewChange('desk')}
            className={`flex items-center space-x-1.5 text-xs py-1.5 px-3 rounded-xl font-bold whitespace-nowrap ${
              currentView === 'desk' 
                ? 'bg-gradient-to-r from-royal-700 to-aurora-rose text-white shadow-sm' 
                : 'text-slate-400'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('ডেস্ক', 'Desk')}</span>
          </button>

          <button
            onClick={() => onViewChange('docs')}
            className={`flex items-center space-x-1.5 text-xs py-1.5 px-3 rounded-xl font-bold whitespace-nowrap ${
              currentView === 'docs' 
                ? 'bg-gradient-to-r from-royal-700 to-aurora-rose text-white shadow-sm' 
                : 'text-slate-400'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>/docs</span>
          </button>
        </div>

      </div>
    </header>
  );
};
