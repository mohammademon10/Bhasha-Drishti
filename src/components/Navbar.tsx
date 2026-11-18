import React from 'react';
import { Activity, ShieldCheck, Stethoscope, FileText, Video, MessageSquare, Volume2, Cpu } from 'lucide-react';

interface NavbarProps {
  currentView: 'translator' | 'desk' | 'docs';
  onViewChange: (view: 'translator' | 'desk' | 'docs') => void;
  onOpenModelCard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, onOpenModelCard }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onViewChange('translator')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg shadow-emerald-500/20 border border-emerald-400/40">
              <span className="text-2xl font-bold text-white select-none">ভা</span>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white font-bengali">ভাষা দৃষ্টি</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-emerald-500/30 font-mono font-medium">Bhasha Drishti</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-medium">Team Tensor_Titan</span>
                <span>•</span>
                <span className="flex items-center space-x-1 text-slate-300">
                  <Stethoscope className="w-3 h-3 text-teal-400" />
                  <span>SmartHospital Challenge</span>
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800/80">
            <button
              id="nav-translator"
              onClick={() => onViewChange('translator')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentView === 'translator'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Live BdSL Translator</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            </button>

            <button
              id="nav-desk"
              onClick={() => onViewChange('desk')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentView === 'desk'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>SmartHospital Desk</span>
              <span className="text-[10pt] px-1.5 py-0.2 rounded bg-teal-900/60 text-teal-300 border border-teal-500/30 font-mono">2-Way</span>
            </button>

            <button
              id="nav-docs"
              onClick={() => onViewChange('docs')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentView === 'docs'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Technical /docs</span>
              <span className="text-[10pt] px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30 font-mono">Judge Pack</span>
            </button>
          </nav>

          {/* Right Status & Telemetry HUD */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex flex-col items-end text-right">
              <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Zero-Retention RAM</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Top-1 Acc: 93.4% | Latency: 238ms</span>
            </div>

            <button
              onClick={onOpenModelCard}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-xs font-mono text-slate-200 border border-slate-700 transition"
              title="Inspect Model Pipeline & Live Telemetry"
            >
              <Cpu className="w-3.5 h-3.5 text-teal-400" />
              <span>v0.4.2-bdslw60</span>
            </button>
          </div>

        </div>

        {/* Mobile View Navigation */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-slate-800/60">
          <button
            onClick={() => onViewChange('translator')}
            className={`flex items-center space-x-1.5 text-xs py-1.5 px-3 rounded-lg ${
              currentView === 'translator' ? 'bg-emerald-600 text-white' : 'text-slate-400'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Translator</span>
          </button>
          <button
            onClick={() => onViewChange('desk')}
            className={`flex items-center space-x-1.5 text-xs py-1.5 px-3 rounded-lg ${
              currentView === 'desk' ? 'bg-emerald-600 text-white' : 'text-slate-400'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hospital Desk</span>
          </button>
          <button
            onClick={() => onViewChange('docs')}
            className={`flex items-center space-x-1.5 text-xs py-1.5 px-3 rounded-lg ${
              currentView === 'docs' ? 'bg-emerald-600 text-white' : 'text-slate-400'
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
