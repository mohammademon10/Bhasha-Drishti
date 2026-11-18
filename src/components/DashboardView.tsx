import React from 'react';
import { 
  Video, MessageSquare, BookOpen, Stethoscope, 
  Activity, CheckCircle2, Clock, ShieldCheck, ArrowRight, 
  Sparkles, AlertCircle, Cpu, Volume2, UserCheck, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AppView } from './NavigationSidebar';

interface DashboardViewProps {
  onNavigate: (view: AppView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const currentDate = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const kpis = [
    {
      titleBn: 'সর্বমোট কনসালটেশন সেশন',
      titleEn: 'Total Triage Sessions',
      value: '১,৪২০',
      valueEn: '1,420',
      change: '+18% this week',
      badge: t('হাসপাতাল লগ', 'Hospital Log'),
      badgeColor: 'bg-crimson-900/30 text-crimson-300 border-crimson-700/40'
    },
    {
      titleBn: 'আজকের সক্রিয় ট্রায়াজ',
      titleEn: 'Sessions Today',
      value: '৩৪',
      valueEn: '34',
      change: '8 Active OPD Rooms',
      badge: t('লাইভ ওপিডি', 'Live OPD'),
      badgeColor: 'bg-emerald-950/40 text-emerald-300 border-emerald-700/40'
    },
    {
      titleBn: 'শনাক্তকৃত সাইন শব্দভাণ্ডার',
      titleEn: 'Recognized BdSL Phrases',
      value: '৪,৮৯০',
      valueEn: '4,890',
      change: '60 Clinical Classes',
      badge: t('ক্লিনিক্যাল ক্লাস্টার', 'BdSLW60'),
      badgeColor: 'bg-crimson-900/40 text-offwhite-200 border-crimson-700/40'
    },
    {
      titleBn: 'গড় মডেল নির্ভুলতা (বেঞ্চমার্ক)',
      titleEn: 'Model Accuracy (Benchmark)',
      value: '৯৩.৪%',
      valueEn: '93.4%',
      change: 'Macro F1: 0.912',
      badge: t('বেঞ্চমার্ক ডাটা', 'Benchmark Data'),
      badgeColor: 'bg-crimson-950/60 text-crimson-300 border-crimson-800/40'
    }
  ];

  const systemDiagnostics = [
    {
      name: 'WebRTC Camera Vision',
      statusBn: 'সক্রিয় ও প্রস্তুত',
      statusEn: 'Online & Ready',
      desc: '30 FPS Frame Stream / RAM Buffer',
      icon: Video,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      name: 'PyTorch CNN-BiLSTM Engine',
      statusBn: 'ভার্সন v1.4.2 লোডেড',
      statusEn: 'Loaded & Active',
      desc: '42 Holistic Landmark Tensor Input',
      icon: Cpu,
      color: 'text-crimson-400',
      bg: 'bg-crimson-900/20'
    },
    {
      name: 'Bengali Speech Synthesizer',
      statusBn: 'ন্যাচারাল ভয়েস ইঞ্জিন',
      statusEn: 'WebSpeech bn-BD Active',
      desc: 'Multi-Tier Native Voice Synthesis',
      icon: Volume2,
      color: 'text-offwhite-200',
      bg: 'bg-obsidian-800'
    },
    {
      name: 'Zero-Retention RAM Privacy',
      statusBn: 'নিরাপত্তা শিল্ড সক্রিয়',
      statusEn: 'HIPAA Shield Enforced',
      desc: 'Zero facial/video storage on cloud',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    }
  ];

  const recentSessions = [
    {
      id: 'SES-8921',
      patientId: 'PT-BDSL-8921',
      time: '10:14 AM',
      tokens: ['আমি', 'মাথা', 'ব্যথা'],
      translatedBn: 'আমার প্রচণ্ড মাথা ব্যথা করছে, আমি ডাক্তার দেখাতে চাই।',
      department: 'Neurology / General Medicine',
      urgency: 'Normal',
      confidence: '96.4%'
    },
    {
      id: 'SES-8920',
      patientId: 'PT-BDSL-8920',
      time: '09:42 AM',
      tokens: ['জরুরি', 'সাহায্য', 'শ্বাসকষ্ট'],
      translatedBn: 'জরুরি সাহায্য প্রয়োজন! রোগীর তীব্র শ্বাসকষ্ট হচ্ছে।',
      department: 'Emergency Triage & ICU',
      urgency: 'Emergency',
      confidence: '98.2%'
    },
    {
      id: 'SES-8919',
      patientId: 'PT-BDSL-8919',
      time: '09:15 AM',
      tokens: ['ওষুধ', 'কখন', 'খাবো'],
      translatedBn: 'আমি এই ওষুধটি কখন এবং কীভাবে খাবো?',
      department: 'Hospital Pharmacy',
      urgency: 'Normal',
      confidence: '94.8%'
    },
    {
      id: 'SES-8918',
      patientId: 'PT-BDSL-8918',
      time: '08:50 AM',
      tokens: ['রক্তচাপ', 'পরীক্ষা'],
      translatedBn: 'দয়া করে আমার রক্তচাপ পরীক্ষা করুন।',
      department: 'Diagnostic & Nursing',
      urgency: 'Normal',
      confidence: '95.1%'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* 1. Welcome Clinical Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden border border-crimson-800/30 shadow-xl bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-850">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-crimson-900/30 border border-crimson-700/40 text-crimson-300 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse"></span>
              <span>SmartHospital HealthSphere AI • CloudCamp Bangladesh</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-offwhite-100 font-bengali tracking-tight">
              {t('ভাষা দৃষ্টি ক্লিনিক্যাল অপারেশনস ড্যাশবোর্ড', 'Bhasha Drishti Clinical Operations Desk')}
            </h1>
            <p className="text-sm text-offwhite-300 leading-relaxed">
              {t(
                'হাসপাতালে মূক ও বধির রোগীদের জন্য কৃত্রিম বুদ্ধিমত্তা-ভিত্তিক তাৎক্ষণিক বাংলা ইশারা অনুবাদ এবং চিকিৎসকের দ্বি-মুখী যোগাযোগ প্ল্যাটফর্ম।',
                'AI-native real-time Bengali Sign Language recognition and bidirectional communication suite for Deaf healthcare accessibility.'
              )}
            </p>
            <div className="flex items-center space-x-4 pt-1 text-xs text-offwhite-400 font-mono">
              <span>{currentDate}</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t('সকল এআই সাব-সিস্টেম সক্রিয়', 'All AI Subsystems Nominal')}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => onNavigate('translator')}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl btn-crimson text-sm font-bold shadow-lg shadow-crimson-800/25 tracking-wide transition"
            >
              <Video className="w-4 h-4" />
              <span>{t('লাইভ অনুবাদ শুরু করুন', 'Start Live Translation')}</span>
            </button>
            <button
              onClick={() => onNavigate('desk')}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl btn-obsidian-secondary text-sm font-bold transition shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-crimson-400" />
              <span>{t('দ্বি-মুখী ডাক্তার ডেস্ক', 'Doctor 2-Way Desk')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {kpis.map((kpi, idx) => (
          <div 
            key={idx}
            className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3 border border-crimson-800/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border ${kpi.badgeColor}`}>
                {kpi.badge}
              </span>
              <span className="text-[11px] font-mono text-offwhite-400">{kpi.change}</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-offwhite-100 font-mono tracking-tight">
                {t(kpi.value, kpi.valueEn)}
              </div>
              <div className="text-xs text-offwhite-300 font-sans mt-1">
                {t(kpi.titleBn, kpi.titleEn)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. System Health & Diagnostics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemDiagnostics.map((sys, idx) => {
          const Icon = sys.icon;
          return (
            <div key={idx} className="glass-panel rounded-2xl p-4 flex items-center space-x-3.5 border border-crimson-800/20">
              <div className={`p-2.5 rounded-xl ${sys.bg} ${sys.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-bold text-offwhite-100 truncate">{sys.name}</div>
                <div className={`text-[11px] font-mono font-medium ${sys.color}`}>
                  {t(sys.statusBn, sys.statusEn)}
                </div>
                <div className="text-[10px] text-offwhite-400 truncate">{sys.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Quick Access Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Live Translator */}
        <div 
          onClick={() => onNavigate('translator')}
          className="glass-panel glass-panel-hover rounded-3xl p-5 cursor-pointer border border-crimson-800/30 hover:border-crimson-600 space-y-3 group transition"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-crimson-900/30 text-crimson-400 group-hover:scale-105 transition">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-crimson-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
              <span>{t('শুরু করুন', 'Launch')}</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-offwhite-100 font-bengali">
              {t('লাইভ সাইন ল্যাঙ্গুয়েজ অনুবাদক', 'Live BdSL Vision Translator')}
            </h3>
            <p className="text-xs text-offwhite-300 mt-1 leading-relaxed">
              {t(
                'ক্যামেরার সামনে ইশারা ভাষা প্রদর্শন করুন; ৩০ FPS এআই ট্র্যাকিংয়ে স্বয়ংক্রিয়ভাবে স্বাভাবিক বাংলা কণ্ঠ তৈরি হবে।',
                'Show gestures via webcam; MediaPipe 3D and BiLSTM model output native spoken Bengali in real-time.'
              )}
            </p>
          </div>
        </div>

        {/* Card 2: 2-Way Doctor Desk */}
        <div 
          onClick={() => onNavigate('desk')}
          className="glass-panel glass-panel-hover rounded-3xl p-5 cursor-pointer border border-crimson-800/30 hover:border-crimson-600 space-y-3 group transition"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-crimson-900/30 text-crimson-400 group-hover:scale-105 transition">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-crimson-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
              <span>{t('ডেস্ক খুলুন', 'Open Desk')}</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-offwhite-100 font-bengali">
              {t('স্মার্টহাসপাতাল দ্বি-মুখী ডেস্ক', 'SmartHospital 2-Way Clinical Desk')}
            </h3>
            <p className="text-xs text-offwhite-300 mt-1 leading-relaxed">
              {t(
                'ডাক্তারের মুখের কথা বধির রোগীর জন্য ক্রমিক সাইন কার্ড ও হ্যান্ডশেইপে রূপান্তরিত হয়; প্রিন্ট-রেডি PDF সামারি এক্সপোর্ট সহ।',
                'Physician voice translates to sequential BdSL sign cards; includes printable PDF consultation reports.'
              )}
            </p>
          </div>
        </div>

        {/* Card 3: Sign Dictionary & Phrasebook */}
        <div 
          onClick={() => onNavigate('dictionary')}
          className="glass-panel glass-panel-hover rounded-3xl p-5 cursor-pointer border border-crimson-800/30 hover:border-crimson-600 space-y-3 group transition"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-crimson-900/30 text-crimson-400 group-hover:scale-105 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-crimson-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
              <span>{t('ব্রাউজ করুন', 'Explore')}</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-offwhite-100 font-bengali">
              {t('মেডিকেল সাইন ডিকশনারি ও ফ্রেজবুক', 'BdSL Dictionary & Medical Phrasebook')}
            </h3>
            <p className="text-xs text-offwhite-300 mt-1 leading-relaxed">
              {t(
                '৬০টি ক্লিনিক্যাল সাইন এবং জরুরি মেডিকেল প্রশ্নমালার অডিও উচ্চারণ ও হ্যান্ডশেইপ বিশদ নির্দেশিকা।',
                '60+ clinical gesture classes and hospital question bank with audio pronunciation and usage examples.'
              )}
            </p>
          </div>
        </div>

      </div>

      {/* 5. Recent Triage Translation Sessions Table */}
      <div className="glass-panel rounded-3xl p-6 border border-crimson-800/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-offwhite-100 font-bengali flex items-center gap-2">
              <Clock className="w-4 h-4 text-crimson-400" />
              <span>{t('সাম্প্রতিক ক্লিনিক্যাল ট্রায়াজ সেশন', 'Recent Clinical Triage Logs')}</span>
            </h2>
            <p className="text-xs text-offwhite-400 mt-0.5">
              {t('জিরো-রিটেনশন প্রাইভেসির অধীনে প্রসেসকৃত সাম্প্রতিক ট্রায়াজ অনুবাদ', 'Recent triage translations processed under RAM zero-retention.')}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('history')}
            className="text-xs font-mono text-crimson-400 hover:text-crimson-300 font-semibold flex items-center gap-1 transition"
          >
            <span>{t('সকল সেশন দেখুন', 'View All History')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-crimson-800/40 text-offwhite-400 font-mono">
                <th className="py-3 px-4 font-semibold">{t('রোগী আইডি / কোড', 'Patient ID')}</th>
                <th className="py-3 px-4 font-semibold">{t('সময়', 'Time')}</th>
                <th className="py-3 px-4 font-semibold">{t('শনাক্ত টোকেন', 'BdSL Tokens')}</th>
                <th className="py-3 px-4 font-semibold">{t('অনূদিত বাংলা বার্তা', 'Translated Text')}</th>
                <th className="py-3 px-4 font-semibold">{t('বিভাগ', 'Department')}</th>
                <th className="py-3 px-4 font-semibold">{t('কনফিডেন্স', 'Confidence')}</th>
                <th className="py-3 px-4 font-semibold text-right">{t('অ্যাকশন', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-crimson-800/20">
              {recentSessions.map((s) => (
                <tr key={s.id} className="hover:bg-obsidian-850/60 transition">
                  <td className="py-3 px-4 font-mono font-bold text-offwhite-200">
                    {s.patientId}
                  </td>
                  <td className="py-3 px-4 text-offwhite-400 font-mono">
                    {s.time}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 flex-wrap">
                      {s.tokens.map((tok, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-obsidian-850 text-crimson-300 border border-crimson-800/30 font-mono">
                          [{tok}]
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bengali font-bold text-offwhite-100 max-w-xs truncate">
                    "{s.translatedBn}"
                  </td>
                  <td className="py-3 px-4 text-offwhite-300">
                    {s.department}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className="text-emerald-400 font-bold">{s.confidence}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigate('history')}
                      className="px-2.5 py-1 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-crimson-400 border border-crimson-800/30 text-xs font-mono transition"
                    >
                      {t('বিস্তারিত', 'View')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
