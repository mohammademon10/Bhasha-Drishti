import React from 'react';
import { Stethoscope, FileText, Video, MessageSquare, Globe, Cpu, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentView: 'translator' | 'desk' | 'docs';
  onViewChange: (view: 'translator' | 'desk' | 'docs') => void;
  onOpenModelCard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, onOpenModelCard }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/[0.08] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3.5 cursor-pointer group" onClick={() => onViewChange('translator')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-electric-indigo via-electric-cyan to-electric-teal shadow-lg shadow-electric-cyan/20 border border-white/20 transition-transform group-hover:scale-105 duration-300">
              <span className="text-2xl font-bold text-white select-none">ভা</span>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-electric-emerald border-2 border-space-950"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white font-bengali">ভাষা দৃষ্টি</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-electric-cyan border border-electric-cyan/30 font-mono font-medium">Bhasha Drishti</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="text-electric-teal font-medium">Team Tensor_Titan</span>
                <span>•</span>
                <span className="flex items-center space-x-1 text-slate-300">
                  <Stethoscope className="w-3 h-3 text-electric-cyan" />
                  <span>SmartHospital</span>
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1.5 p-1.5 bg-space-900/90 rounded-2xl border border-white/[0.08] shadow-inner">
            <button
              id="nav-translator"
              onClick={() => onViewChange('translator')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                currentView === 'translator'
                  ? 'bg-gradient-to-r from-electric-indigo to-electric-cyan text-white shadow-lg shadow-electric-indigo/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>{t('লাইভ সাইন অনুবাদক', 'Live BdSL Translator')}</span>
              <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse"></span>
            </button>

            <button
              id="nav-desk"
              onClick={() => onViewChange('desk')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                currentView === 'desk'
                  ? 'bg-gradient-to-r from-electric-indigo to-electric-cyan text-white shadow-lg shadow-electric-indigo/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('হাসপাতাল ডেক্স', 'SmartHospital Desk')}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-electric-teal/20 text-electric-teal border border-electric-teal/40 font-mono">2-Way</span>
            </button>

            <button
              id="nav-docs"
              onClick={() => onViewChange('docs')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                currentView === 'docs'
                  ? 'bg-gradient-to-r from-electric-indigo to-electric-cyan text-white shadow-lg shadow-electric-indigo/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t('টেকনিক্যাল ডকুমেন্টস', 'Technical /docs')}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-electric-purple/20 text-purple-300 border border-purple-500/30 font-mono">Judge Pack</span>
            </button>
          </nav>

          {/* Right Controls: Language Toggle & Tech Specs */}
          <div className="flex items-center space-x-3">
            
            {/* Language Switcher Button (বাংলা / English) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-space-850 hover:bg-space-800 text-xs font-semibold text-white border border-white/10 hover:border-electric-cyan/40 transition shadow-md group"
              title="Toggle Language / ভাষা পরিবর্তন করুন"
            >
              <Globe className="w-3.5 h-3.5 text-electric-cyan group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-mono text-electric-cyan font-bold">{language === 'bn' ? 'বাংলা' : 'EN'}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 font-mono text-[11px]">{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Model Card Quick Trigger */}
            <button
              onClick={onOpenModelCard}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-space-850 hover:bg-space-800 text-xs font-mono text-slate-200 border border-white/10 hover:border-electric-teal/40 transition"
              title="Inspect Pipeline Specs"
            >
              <Cpu className="w-3.5 h-3.5 text-electric-teal" />
              <span>93.4% Acc</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-white/[0.08]">
          <button
            onClick={() => onViewChange('translator')}
            className={`flex items-center space-x-1.5 text-xs py-1.5 px-3 rounded-lg font-medium ${
              currentView === 'translator' ? 'bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/40' : 'text-slate-400'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{t('অনুবাদক', 'Translator')}</span>
          </button>
          <button
            onClick={() => onViewChange('desk')}
            className={`flex items-center space-x-1.5 text-xs py-1.5 px-3 rounded-lg font-medium ${
              currentView === 'desk' ? 'bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/40' : 'text-slate-400'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('হাসপাতাল ডেক্স', 'Desk')}</span>
          </button>
          <button
            onClick={() => onViewChange('docs')}
            className={`flex items-center space-x-1.5 text-xs py-1.5 px-3 rounded-lg font-medium ${
              currentView === 'docs' ? 'bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/40' : 'text-slate-400'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>/docs</span>
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 text-xs py-1.5 px-2.5 rounded-lg text-slate-300 font-mono bg-white/5"
          >
            <Globe className="w-3 h-3 text-electric-cyan" />
            <span>{language.toUpperCase()}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
