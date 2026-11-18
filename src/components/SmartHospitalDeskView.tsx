import React, { useState } from 'react';
import { 
  Stethoscope, Send, Download, Sparkles, CheckCircle2, 
  HelpCircle, ChevronRight, User, Hospital, Volume2, ArrowRight,
  Clock, ShieldAlert, FileText, Check, Plus
} from 'lucide-react';
import { DOCTOR_PRESETS, DoctorPreset, BDSL_W60_CLASSES } from '../data/bdslLexicon';
import { UniversalSpeechEngine } from '../utils/audioPlayer';
import { useLanguage } from '../context/LanguageContext';

interface ConsultationMessage {
  id: string;
  sender: 'doctor' | 'patient';
  textBn: string;
  textEn: string;
  timestamp: string;
  department: string;
  urgency?: 'Normal' | 'Urgent Alert';
  glossTokens?: string[];
}

export const SmartHospitalDeskView: React.FC = () => {
  const { language, t } = useLanguage();

  const [selectedPreset, setSelectedPreset] = useState<DoctorPreset>(DOCTOR_PRESETS[0]);
  const [customInput, setCustomInput] = useState<string>('');
  const [messages, setMessages] = useState<ConsultationMessage[]>([
    {
      id: 'm1',
      sender: 'patient',
      textBn: 'আমার প্রচণ্ড মাথা ব্যথা করছে, আমি ডাক্তার দেখাতে চাই।',
      textEn: 'I have a severe headache, I want to see a doctor.',
      timestamp: '10:14 AM',
      department: 'General Medicine',
      urgency: 'Normal',
      glossTokens: ['আমি', 'মাথা', 'ব্যথা']
    },
    {
      id: 'm2',
      sender: 'doctor',
      textBn: 'আপনার অ্যাপয়েন্টমেন্ট নম্বর কত?',
      textEn: 'What is your appointment number?',
      timestamp: '10:15 AM',
      department: 'Reception Desk',
      glossTokens: ['আপনার', 'অ্যাপয়েন্টমেন্ট', 'নম্বর', 'কত']
    }
  ]);

  const [activeSignIndex, setActiveSignIndex] = useState<number>(0);
  const [exported, setExported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const currentSigns = selectedPreset.signs;

  const handleSendCustomMessage = () => {
    if (!customInput.trim()) return;

    const words = customInput.trim().split(/\s+/);
    const generatedSigns = words.map((word) => {
      const match = BDSL_W60_CLASSES.find(c => c.labelBn.includes(word) || word.includes(c.labelBn));
      return {
        glossBn: match ? match.labelBn : word,
        glossEn: match ? match.glossEn : 'DIRECT SIGN',
        instructionBn: match ? match.descriptionBn : 'স্বাভাবিক গতিতে মুখের সামনে হাত রেখে স্পষ্টভাবে ইঙ্গিত করুন',
        instructionEn: 'Perform clear manual sign gesture with open posture',
        handshape: 'flat_palm' as const,
        direction: 'Forward'
      };
    });

    const newPreset: DoctorPreset = {
      id: `custom_${Date.now()}`,
      bengaliText: customInput,
      englishText: 'Doctor clinical directive',
      department: 'Clinical Consultation',
      signs: generatedSigns
    };

    setSelectedPreset(newPreset);

    const newMsg: ConsultationMessage = {
      id: `m_${Date.now()}`,
      sender: 'doctor',
      textBn: customInput,
      textEn: 'Doctor customized directive',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      department: 'Doctor Consultation Desk',
      glossTokens: generatedSigns.map(s => s.glossBn)
    };

    setMessages(prev => [...prev, newMsg]);
    setCustomInput('');

    // Speak audio
    UniversalSpeechEngine.speak(customInput, 'bn');
  };

  const handleSelectPreset = (preset: DoctorPreset) => {
    setSelectedPreset(preset);
    setActiveSignIndex(0);

    const newMsg: ConsultationMessage = {
      id: `m_${Date.now()}`,
      sender: 'doctor',
      textBn: preset.bengaliText,
      textEn: preset.englishText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      department: preset.department,
      glossTokens: preset.signs.map(s => s.glossBn)
    };

    setMessages(prev => [...prev, newMsg]);

    // Speak audio
    UniversalSpeechEngine.speak(preset.bengaliText, 'bn');
  };

  const handleExportSummary = () => {
    const summaryData = {
      hospital: 'SmartHospital HealthSphere AI Desk',
      patientId: 'PT-BDSL-8921',
      date: new Date().toLocaleDateString(),
      leadSpecialist: 'Duty Medical Officer (DMO)',
      transcriptLog: messages.map(m => ({
        timestamp: m.timestamp,
        speaker: m.sender === 'patient' ? 'Patient (BdSL Translated)' : 'Doctor/Receptionist',
        bengaliText: m.textBn,
        englishText: m.textEn,
        department: m.department,
        urgency: m.urgency || 'Normal'
      })),
      complianceNotes: 'Zero raw video retained in accordance with Bhasha Drishti Responsible AI specifications.'
    };

    const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bhasha_Drishti_Consultation_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  const speakCurrent = (text: string) => {
    UniversalSpeechEngine.speak(
      text, 
      'bn', 
      () => setIsSpeaking(true), 
      () => setIsSpeaking(false)
    );
  };

  const renderHandshapeSVG = (type: string, direction: string) => {
    return (
      <svg className="w-20 h-20 text-electric-cyan stroke-current fill-none" viewBox="0 0 100 100">
        <rect x="5" y="5" width="90" height="90" rx="14" className="stroke-white/10 fill-space-950/80" strokeWidth="1" />
        <path d="M35 70 C 35 55, 40 45, 50 45 C 60 45, 65 55, 65 70 Z" strokeWidth="2.5" className="stroke-electric-cyan fill-electric-cyan/20" />
        
        {type === 'flat_palm' && (
          <g strokeWidth="2.5" strokeLinecap="round">
            <line x1="38" y1="46" x2="28" y2="30" />
            <line x1="43" y1="45" x2="38" y2="20" />
            <line x1="50" y1="45" x2="50" y2="16" />
            <line x1="57" y1="45" x2="62" y2="20" />
            <line x1="62" y1="46" x2="72" y2="30" />
          </g>
        )}

        {type === 'pointing' && (
          <g strokeWidth="2.5" strokeLinecap="round">
            <line x1="50" y1="45" x2="50" y2="15" stroke="#00F0FF" strokeWidth="3" />
            <circle cx="50" cy="15" r="3" fill="#00F0FF" />
            <path d="M42 55 Q 38 48 45 48" stroke="#64748B" />
            <path d="M58 55 Q 62 48 55 48" stroke="#64748B" />
          </g>
        )}

        {type === 'cupped' && (
          <path d="M32 40 Q 50 20 68 40" strokeWidth="3" strokeLinecap="round" stroke="#10B981" />
        )}

        {type === 'two_hands_cross' && (
          <g strokeWidth="2.5" strokeLinecap="round" stroke="#F59E0B">
            <line x1="30" y1="30" x2="70" y2="70" />
            <line x1="70" y1="30" x2="30" y2="70" />
          </g>
        )}

        {type === 'chest_touch' && (
          <g strokeWidth="2" stroke="#F43F5E">
            <circle cx="50" cy="50" r="18" fill="rgba(244,63,94,0.15)" />
            <path d="M42 48 Q 50 40 58 48 Q 50 62 42 48" fill="#F43F5E" />
          </g>
        )}

        <path d="M50 82 L 56 88 L 44 88 Z" fill="#00F0FF" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">

      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl border border-white/10">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-electric-indigo to-electric-teal text-white shadow-lg shadow-electric-teal/20">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span>{t('স্মার্টহাসপাতাল দ্বি-মুখী যোগাযোগ ডেস্ক', 'SmartHospital Two-Way Clinical Desk')}</span>
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-electric-teal/20 text-electric-teal border border-electric-teal/40">
                Doctor-to-Patient Reverse Mode
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {t(
                'ডাক্তার বাংলায় বললে তা স্বয়ংক্রিয়ভাবে বধির রোগীর জন্য ক্রমিক সাইন কার্ড ও হ্যান্ডশেইপ নির্দেশিকায় রূপান্তরিত হয়।',
                'Physicians speak or type in Bengali, automatically generating step-by-step sign language cards for deaf patients.'
              )}
            </p>
          </div>
        </div>

        <button
          onClick={handleExportSummary}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold glass-panel glass-panel-hover text-electric-cyan border border-electric-cyan/40 transition shadow-lg"
        >
          {exported ? <Check className="w-4 h-4 text-electric-teal" /> : <Download className="w-4 h-4" />}
          <span>{exported ? t('ট্রান্সক্রিপ্ট ডাউনলোড হয়েছে', 'Transcript Exported') : t('ডাউনলোড কনসালটেশন সামারি', 'Export Transcript')}</span>
        </button>
      </div>

      {/* Main Grid: Doctor Sentences + Dynamic Sign Cards & 2-Way Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT 7 COLS: Presets + Sequential Signs */}
        <div className="lg:col-span-7 space-y-5">

          {/* Quick Doctor Presets */}
          <div className="glass-panel rounded-3xl p-5 space-y-3 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-electric-cyan" />
                <span>{t('দ্রুত ক্লিনিক্যাল প্রশ্নমালা (Doctor Quick Presets)', 'Physician Clinical Quick Presets')}</span>
              </span>
              <span className="text-[11px] text-electric-teal font-mono">{t('সাইন দেখতে ট্যাপ করুন', 'Tap to decompose')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DOCTOR_PRESETS.map((p) => {
                const isSelected = selectedPreset.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-electric-indigo/30 to-electric-cyan/30 border-electric-cyan text-white shadow-lg shadow-electric-cyan/20'
                        : 'bg-space-900/60 hover:bg-space-850 border-white/[0.06] text-slate-300'
                    }`}
                  >
                    <p className="font-bold font-bengali text-sm text-white mb-1">{p.bengaliText}</p>
                    <p className="text-[11px] text-slate-400 italic">{p.englishText}</p>
                    <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-electric-teal font-mono">
                      {p.signs.length} {t('টি সাইন স্টেপ', 'Sign Steps')}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Doctor Typing Bar */}
            <div className="pt-2 border-t border-white/[0.08]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendCustomMessage()}
                  placeholder={t('অন্য কোনো নির্দেশনা বাংলায় লিখুন...', 'Type custom directive in Bengali...')}
                  className="flex-1 px-4 py-3 rounded-2xl bg-space-950 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric-cyan font-bengali"
                />
                <button
                  onClick={handleSendCustomMessage}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-electric-indigo to-electric-cyan hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-electric-cyan/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('সাইন করুন', 'Translate')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Doctor Sentence Card */}
          <div className="glass-panel rounded-3xl p-5 border border-electric-cyan/30 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-electric-cyan uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Hospital className="w-4 h-4" />
                <span>{t('নির্বাচিত ডাক্তারের বাক্য', 'Selected Physician Directive')} ({selectedPreset.department})</span>
              </span>
              <button
                onClick={() => speakCurrent(selectedPreset.bengaliText)}
                className="text-xs text-electric-teal hover:text-white flex items-center gap-1.5 font-mono"
              >
                <Volume2 className="w-4 h-4" />
                <span>{t('উচ্চারণ শুনুন', 'Listen Audio')}</span>
              </button>
            </div>
            <p className="text-2xl font-bold text-white font-bengali">
              "{selectedPreset.bengaliText}"
            </p>
            <p className="text-xs text-slate-400 mt-1.5 italic">
              Meaning: "{selectedPreset.englishText}"
            </p>
          </div>

          {/* Sequential BdSL Sign Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wider font-semibold">
                {t('ক্রমিক সাইন নির্দেশিকা', 'Sequential Sign Steps')} ({currentSigns.length} {t('টি সাইন', 'Steps')})
              </h3>
              <span className="text-xs text-electric-teal font-mono">{t('বধির-বান্ধব ভিজ্যুয়াল গাইড', 'Deaf-First Visual Guide')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentSigns.map((sign, index) => {
                const isActive = activeSignIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveSignIndex(index)}
                    className={`cursor-pointer p-4 rounded-3xl border transition-all duration-200 ${
                      isActive
                        ? 'bg-space-850 border-electric-cyan shadow-xl shadow-electric-cyan/15 scale-[1.01]'
                        : 'glass-panel hover:bg-space-850 border-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/40 flex items-center justify-center text-xs font-mono font-bold">
                            {index + 1}
                          </span>
                          <span className="text-lg font-bold text-white font-bengali">
                            {sign.glossBn}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-electric-teal block mt-1">
                          GLOSS: {sign.glossEn}
                        </span>
                      </div>

                      <div className="shrink-0">
                        {renderHandshapeSVG(sign.handshape, sign.direction)}
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/[0.08] space-y-1">
                      <p className="text-xs font-bengali text-slate-200">
                        👉 <strong>{t('ইঙ্গিত:', 'Gesture:')}</strong> {sign.instructionBn}
                      </p>
                      <p className="text-[11px] text-slate-400 italic">
                        {sign.instructionEn} ({sign.direction})
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT 5 COLS: 2-Way Consultation Audit Stream */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-5 flex flex-col h-full min-h-[580px] shadow-2xl border border-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-electric-cyan" />
                <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
                  {t('দ্বিমুখী কনসালটেশন লগ', '2-Way Consultation Audit Log')}
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-electric-teal/20 text-electric-teal border border-electric-teal/40 font-mono font-semibold">
                {t('অ্যাক্টিভ সেশন', 'Live Session')}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
              {messages.map((msg) => {
                const isPatient = msg.sender === 'patient';
                return (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-2xl border text-xs space-y-1.5 transition ${
                      isPatient
                        ? 'bg-space-950/80 border-electric-cyan/40 mr-3'
                        : 'bg-space-850/80 border-electric-indigo/40 ml-3'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                        {isPatient ? (
                          <span className="text-electric-cyan font-bold flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            <span>{t('রোগীর ইশারা (BdSL)', 'Patient BdSL')}</span>
                          </span>
                        ) : (
                          <span className="text-electric-teal font-bold flex items-center gap-1">
                            <Stethoscope className="w-3.5 h-3.5" />
                            <span>{t('চিকিৎসক / ডেস্ক', 'Physician')}</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>

                    <p className="text-sm font-bold text-white font-bengali leading-relaxed">
                      "{msg.textBn}"
                    </p>

                    <p className="text-[11px] text-slate-400 italic">
                      "{msg.textEn}"
                    </p>

                    {msg.glossTokens && (
                      <div className="flex items-center space-x-1 pt-1 flex-wrap gap-1">
                        <span className="text-[10px] text-slate-500 font-mono">{t('টোকেন:', 'Tokens:')}</span>
                        {msg.glossTokens.map((t, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-electric-cyan font-mono">
                            [{t}]
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{t('রোগী আইডি:', 'Patient ID:')} <strong className="text-white">PT-BDSL-8921</strong></span>
                <span>{t('ট্রায়াজ:', 'Triage:')} <strong className="text-electric-teal">OPD Room 4</strong></span>
              </div>
              <button
                onClick={handleExportSummary}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-electric-indigo via-electric-cyan to-electric-teal text-space-950 font-bold text-xs transition flex items-center justify-center space-x-2 shadow-lg shadow-electric-cyan/20"
              >
                <Download className="w-4 h-4 text-space-950" />
                <span>{t('কনসালটেশন সামারি ডাউনলোড করুন', 'Export Official Transcript (JSON)')}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
