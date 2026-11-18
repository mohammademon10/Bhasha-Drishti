import React from 'react';
import { 
  LayoutDashboard, Video, MessageSquare, BookOpen, 
  Stethoscope, History, BarChart3, Settings, FileText,
  ShieldCheck, ChevronLeft, ChevronRight, PlusCircle, Activity
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type AppView = 
  | 'dashboard' 
  | 'translator' 
  | 'desk' 
  | 'dictionary' 
  | 'phrasebook' 
  | 'history' 
  | 'analytics' 
  | 'settings' 
  | 'docs';

interface NavigationSidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentView,
  onViewChange,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const { t } = useLanguage();

  const mainNavItems = [
    {
      id: 'dashboard' as AppView,
      labelBn: 'ড্যাশবোর্ড',
      labelEn: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'translator' as AppView,
      labelBn: 'লাইভ অনুবাদক',
      labelEn: 'Live Translator',
      icon: Video,
      badge: 'Live'
    },
    {
      id: 'desk' as AppView,
      labelBn: 'কমিউনিকেশন ডেস্ক',
      labelEn: 'Communication Desk',
      icon: MessageSquare,
      badge: '2-Way'
    },
    {
      id: 'dictionary' as AppView,
      labelBn: 'সাইন ডিকশনারি',
      labelEn: 'Sign Dictionary',
      icon: BookOpen,
      badge: '60 Signs'
    },
    {
      id: 'phrasebook' as AppView,
      labelBn: 'মেডিকেল ফ্রেজবুক',
      labelEn: 'Medical Phrasebook',
      icon: Stethoscope,
      badge: null
    },
    {
      id: 'history' as AppView,
      labelBn: 'সেশন হিস্ট্রি',
      labelEn: 'Session History',
      icon: History,
      badge: null
    },
    {
      id: 'analytics' as AppView,
      labelBn: 'এআই অ্যানালিটিক্স',
      labelEn: 'AI Analytics',
      icon: BarChart3,
      badge: '93.4%'
    }
  ];

  const secondaryNavItems = [
    {
      id: 'settings' as AppView,
      labelBn: 'সেটিংস',
      labelEn: 'Settings',
      icon: Settings
    },
    {
      id: 'docs' as AppView,
      labelBn: 'ডকুমেন্টেশন ও পেপার',
      labelEn: 'Docs & Whitepaper',
      icon: FileText
    }
  ];

  const handleItemClick = (view: AppView) => {
    onViewChange(view);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-obsidian-900 border-r border-crimson-800/30 shadow-2xl select-none">
      
      {/* 1. Header & Brand Badge */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-crimson-800/30">
          <div 
            onClick={() => handleItemClick('dashboard')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-obsidian-850 via-crimson-800 to-crimson-600 flex items-center justify-center text-offwhite-100 font-black text-xl shadow-lg shadow-crimson-800/25 border border-crimson-500/40 group-hover:scale-105 transition shrink-0">
              ভা
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-offwhite-100 text-base tracking-tight font-bengali">
                    ভাষা দৃষ্টি
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-crimson-900/40 text-crimson-300 border border-crimson-700/50">
                    Hospital
                  </span>
                </div>
                <span className="text-[11px] text-offwhite-400 font-sans">
                  BdSL AI Platform
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-offwhite-400 hover:text-offwhite-100 border border-crimson-800/30 transition"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Action Button */}
        {!isCollapsed && (
          <div className="p-3">
            <button
              onClick={() => handleItemClick('translator')}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl btn-crimson text-xs font-bold font-sans tracking-wide transition shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('নতুন অনুবাদ শুরু করুন', 'Start New Translation')}</span>
            </button>
          </div>
        )}

        {/* 2. Main Navigation List */}
        <div className="px-3 py-2 space-y-1">
          <div className={`px-2 py-1 text-[11px] font-mono font-semibold uppercase text-offwhite-400 ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '•' : t('প্রধান মেনু', 'Main Menu')}
          </div>
          {mainNavItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-crimson-800/40 via-crimson-900/20 to-transparent text-offwhite-100 font-bold border border-crimson-700/50 shadow-sm'
                    : 'text-offwhite-300 hover:text-offwhite-100 hover:bg-obsidian-850/80'
                }`}
                title={isCollapsed ? (t(item.labelBn, item.labelEn)) : undefined}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-crimson-400' : 'text-offwhite-400'}`} />
                  {!isCollapsed && <span>{t(item.labelBn, item.labelEn)}</span>}
                </div>
                {!isCollapsed && item.badge && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    item.badge === 'Live' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-crimson-950/80 text-offwhite-200 border border-crimson-800/40'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Secondary Navigation & Footer Telemetry */}
      <div>
        <div className="px-3 py-2 border-t border-crimson-800/30 space-y-1">
          <div className={`px-2 py-1 text-[11px] font-mono font-semibold uppercase text-offwhite-400 ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '•' : t('সিস্টেম ও সাপোর্ট', 'System & Specs')}
          </div>
          {secondaryNavItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-start space-x-3 px-3'} py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-crimson-800/25 text-offwhite-100 font-bold border border-crimson-700/50'
                    : 'text-offwhite-400 hover:text-offwhite-100 hover:bg-obsidian-850/80'
                }`}
                title={isCollapsed ? (t(item.labelBn, item.labelEn)) : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-crimson-400' : 'text-offwhite-400'}`} />
                {!isCollapsed && <span>{t(item.labelBn, item.labelEn)}</span>}
              </button>
            );
          })}
        </div>

        {/* RAM Zero Retention Indicator */}
        {!isCollapsed && (
          <div className="p-3 mx-3 my-2 rounded-xl bg-obsidian-850/70 border border-crimson-800/30">
            <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400 font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Retention RAM</span>
            </div>
            <p className="text-[10px] text-offwhite-300 leading-tight">
              {t('রোগীর গোপনীয়তা নিশ্চিতকরণ: কোনো বায়োমেট্রিক ভিডিও ক্লাউডে সংরক্ষিত হয় না।', 'HIPAA Privacy: Zero video or facial frames retained.')}
            </p>
          </div>
        )}

        {/* Builder Attribution */}
        {!isCollapsed && (
          <div className="p-3 border-t border-crimson-800/30 text-[10px] text-offwhite-400 flex justify-between items-center">
            <span>Tensor_Titan • v1.4.2</span>
            <span className="font-mono text-crimson-400 font-medium">MD. Emon Hossain</span>
          </div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:block transition-all duration-300 shrink-0 sticky top-0 h-screen z-40 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-fade-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
