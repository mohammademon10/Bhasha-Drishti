import React, { useState } from 'react';
import { 
  Settings, Globe, Video, Volume2, Eye, ShieldCheck, 
  Info, Check, Trash2, Sliders, Smartphone, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UniversalSpeechEngine } from '../utils/audioPlayer';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [speechPitch, setSpeechPitch] = useState<number>(1.0);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [mirrorCamera, setMirrorCamera] = useState<boolean>(true);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [testingVoice, setTestingVoice] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleTestSpeech = () => {
    setTestingVoice(true);
    UniversalSpeechEngine.speak(
      language === 'bn' 
        ? 'ভাষা দৃষ্টি প্ল্যাটফর্মে আপনাকে স্বাগতম। বাংলা ভয়েস সিন্থেসিস সফলভাবে কাজ করছে।'
        : 'Welcome to Bhasha Drishti. Voice synthesis is functioning normally.',
      language,
      () => setTestingVoice(true),
      () => setTestingVoice(false)
    );
  };

  const handleClearCache = () => {
    if (confirm(t('আপনি কি লোকাল সেটিংস ও হিস্ট্রি ক্যাশ মুছে ফেলতে চান?', 'Do you want to reset local preferences?'))) {
      localStorage.removeItem('bhasha_drishti_fav_phrases');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">

      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-crimson-800/30 bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-850 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-crimson-900/30 text-crimson-400">
              <Settings className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-offwhite-100 font-bengali">
              {t('প্ল্যাটফর্ম সেটিংস ও কন্ট্রোল প্যানেল', 'Platform Settings & Control Panel')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-offwhite-300">
            {t(
              'ভাষা, অডিও স্পিচ সিন্থেসিস, ভিশন ট্র্যাকিং ও অ্যাক্সেসিবিলিটি কাস্টমাইজেশন।',
              'Configure speech synthesis, vision tracking, accessibility, and privacy preferences.'
            )}
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-700/40 text-emerald-300 text-xs font-mono font-bold animate-pulse">
            <Check className="w-4 h-4" />
            <span>{t('সংরক্ষিত', 'Saved')}</span>
          </div>
        )}
      </div>

      {/* Section 1: General & Language */}
      <div className="glass-panel rounded-3xl p-6 border border-crimson-800/25 space-y-4">
        <h2 className="text-base font-bold text-offwhite-100 font-bengali flex items-center gap-2">
          <Globe className="w-4 h-4 text-crimson-400" />
          <span>{t('ভাষা ও ইন্টারফেস প্রেফারেন্স', 'Language & Interface')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-obsidian-950 border border-crimson-800/30 space-y-2">
            <div className="text-xs font-bold text-offwhite-100">{t('ডিফল্ট সিস্টেম ভাষা', 'Primary Display Language')}</div>
            <p className="text-[11px] text-offwhite-400">
              {t('ইন্টারফেসের সমস্ত লেবেল ও বাটনের ভাষা নির্বাচন করুন।', 'Choose primary language for all labels and controls.')}
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={() => setLanguage('bn')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold font-bengali transition ${
                  language === 'bn' ? 'bg-gradient-to-r from-crimson-800 to-crimson-600 text-offwhite-100 shadow-md shadow-crimson-800/25' : 'bg-obsidian-850 text-offwhite-400 hover:text-offwhite-100'
                }`}
              >
                বাংলা (Bengali)
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono transition ${
                  language === 'en' ? 'bg-gradient-to-r from-crimson-800 to-crimson-600 text-offwhite-100 shadow-md shadow-crimson-800/25' : 'bg-obsidian-850 text-offwhite-400 hover:text-offwhite-100'
                }`}
              >
                English (US)
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-950 border border-crimson-800/30 space-y-2">
            <div className="text-xs font-bold text-offwhite-100">{t('অ্যাক্সেসিবিলিটি মোড', 'Accessibility Display')}</div>
            <p className="text-[11px] text-offwhite-400">
              {t('দৃষ্টিপ্রতিবন্ধী ও বয়স্ক রোগীদের জন্য উচ্চ কনট্রাস্ট ও বড় ফন্ট।', 'High contrast and larger typography for low-vision patients.')}
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-offwhite-300 font-mono">{t('লার্জ টাইপোগ্রাফি:', 'Large Typography:')}</span>
              <button
                onClick={() => setLargeText(!largeText)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                  largeText ? 'bg-crimson-800 text-offwhite-100' : 'bg-obsidian-850 text-offwhite-400'
                }`}
              >
                {largeText ? 'ACTIVE' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Speech Synthesis Engine */}
      <div className="glass-panel rounded-3xl p-6 border border-crimson-800/25 space-y-4">
        <h2 className="text-base font-bold text-offwhite-100 font-bengali flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-crimson-400" />
          <span>{t('বাংলা স্পিচ সিন্থেসিস ইঞ্জিন (Speech Synthesis)', 'Bangla Speech Engine')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-obsidian-950 border border-crimson-800/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-offwhite-100 font-bold">{t('কথার গতি (Speech Rate):', 'Speech Rate:')}</span>
              <span className="text-crimson-400 font-bold">{speechRate}x</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.25"
              step="0.05"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full accent-crimson-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-offwhite-400 font-mono">
              <span>0.75x (ধীর)</span>
              <span>1.0x (স্বাভাবিক)</span>
              <span>1.25x (দ্রুত)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-950 border border-crimson-800/30 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-offwhite-100">{t('ভয়েস অডিও প্রিভিউ', 'Voice Audio Preview')}</div>
              <p className="text-[11px] text-offwhite-400 mt-0.5">
                {t('ওয়েব স্পিচ এপিআই বা প্রি-রেন্ডারড ন্যাচারাল ভয়েস টেস্ট করুন।', 'Test Web Speech API and native human voice playback.')}
              </p>
            </div>
            <button
              onClick={handleTestSpeech}
              className={`w-full py-2.5 rounded-xl text-xs font-bold font-sans transition flex items-center justify-center space-x-2 ${
                testingVoice ? 'bg-crimson-800 text-offwhite-100 animate-pulse' : 'btn-crimson text-offwhite-100 shadow-md'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{testingVoice ? t('অডিও বাজছে...', 'Speaking...') : t('টেস্ট অডিও শুনুন', 'Test Audio Playback')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Camera & AI Vision */}
      <div className="glass-panel rounded-3xl p-6 border border-crimson-800/25 space-y-4">
        <h2 className="text-base font-bold text-offwhite-100 font-bengali flex items-center gap-2">
          <Video className="w-4 h-4 text-crimson-400" />
          <span>{t('ক্যামেরা ও এআই ভিশন কনফিগারেশন', 'Camera & AI Vision Configuration')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-obsidian-950 border border-crimson-800/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-offwhite-100">{t('মিরর ক্যামেরা প্রিভিউ', 'Mirror Camera Preview')}</div>
              <div className="text-[11px] text-offwhite-400">{t('সেলফি ক্যামেরার মতো অনুভূমিক ফ্লিপ', 'Flip horizontal preview')}</div>
            </div>
            <button
              onClick={() => setMirrorCamera(!mirrorCamera)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                mirrorCamera ? 'bg-crimson-800 text-offwhite-100' : 'bg-obsidian-850 text-offwhite-400'
              }`}
            >
              {mirrorCamera ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-950 border border-crimson-800/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-offwhite-100">{t('থ্রিডি কঙ্কাল ল্যান্ডমার্ক HUD', '3D Skeletal Landmark HUD')}</div>
              <div className="text-[11px] text-offwhite-400">{t('ক্যানভাসে ৪২ পয়েন্টের ট্র্যাকিং গ্রিড', 'Draw 42 skeletal keypoints')}</div>
            </div>
            <button
              onClick={() => setShowSkeleton(!showSkeleton)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                showSkeleton ? 'bg-crimson-800 text-offwhite-100' : 'bg-obsidian-850 text-offwhite-400'
              }`}
            >
              {showSkeleton ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Section 4: Privacy & Responsible AI */}
      <div className="glass-panel rounded-3xl p-6 border border-crimson-800/25 space-y-4">
        <h2 className="text-base font-bold text-offwhite-100 font-bengali flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{t('রেসপন্সিবল এআই ও রোগী ডেটা সুরক্ষা', 'Responsible AI & Patient Privacy')}</span>
        </h2>

        <div className="p-4 rounded-2xl bg-obsidian-950 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero-Retention RAM Policy Enforced (Non-negotiable)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-700/40">
              HIPAA Compliant
            </span>
          </div>
          <p className="text-xs text-offwhite-300 leading-relaxed font-sans">
            {t(
              'ভাষা দৃষ্টি কোনো রোগীর ভিডিও ফ্রেম, বায়োমেট্রিক ফেস ডেটা বা ব্যক্তিগত তথ্য ডিস্কে বা সার্ভারে স্থায়ীভাবে জমা রাখে না। প্রতিটি ফ্রেম র‍্যাম মেমরিতে ল্যান্ডমার্ক বিশ্লেষণের পরপরই তাৎক্ষণিক ধ্বংস হয়ে যায়।',
              'Bhasha Drishti operates under a strict zero-retention RAM architecture. No raw video frames or patient biometric data are ever written to disk or transmitted to remote servers.'
            )}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-offwhite-400 font-mono">
            {t('লোকাল ব্রাউজার প্রেফারেন্স রিসেট:', 'Reset Local Browser Preferences:')}
          </span>
          <button
            onClick={handleClearCache}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-obsidian-850 hover:bg-crimson-950/80 text-offwhite-400 hover:text-crimson-300 text-xs font-mono transition border border-crimson-800/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t('ক্যাশ মুছুন', 'Clear Cache')}</span>
          </button>
        </div>
      </div>

      {/* Section 5: System & Model Info */}
      <div className="p-5 rounded-2xl bg-obsidian-950 border border-crimson-800/30 text-xs font-mono text-offwhite-400 space-y-1">
        <div className="text-offwhite-100 font-bold font-sans text-sm">
          Bhasha-Drishti (ভাষা দৃষ্টি) • SmartHospital AI Edition
        </div>
        <div>Engine Version: v1.4.2-bdslw60 | PyTorch + ONNX Runtime Web</div>
        <div>Lead Architect & Builder: <strong className="text-crimson-400">MD. Emon Hossain</strong> (Team Tensor_Titan)</div>
        <div>Domain: HealthSphere AI • International AI Builders Congress 2026</div>
      </div>

    </div>
  );
};
