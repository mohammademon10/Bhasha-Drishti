import React, { useState } from 'react';
import { 
  Stethoscope, Send, Download, Sparkles, CheckCircle2, 
  HelpCircle, ChevronRight, User, Hospital, Volume2, ArrowRight,
  Clock, ShieldAlert, FileText, Check, Plus
} from 'lucide-react';
import { DOCTOR_PRESETS, DoctorPreset, BDSL_W60_CLASSES } from '../data/bdslLexicon';

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

  // Generate dynamic signs from preset or custom input
  const currentSigns = selectedPreset.signs;

  const handleSendCustomMessage = () => {
    if (!customInput.trim()) return;

    // Build a quick synthetic gloss breakdown for custom input
    const words = customInput.trim().split(/\s+/);
    const generatedSigns = words.map((word, idx) => {
      const match = BDSL_W60_CLASSES.find(c => c.labelBn.includes(word) || word.includes(c.labelBn));
      return {
        glossBn: match ? match.labelBn : word,
        glossEn: match ? match.glossEn : 'CUSTOM WORD',
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
  };

  // Downloadable Consultation Transcript (Clean JSON/Text Export)
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

  // Speak Bengali Audio
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'bn-BD';
      window.speechSynthesis.speak(u);
    }
  };

  // Render SVG Handshape Anatomical Diagram
  const renderHandshapeSVG = (type: string, direction: string) => {
    return (
      <svg className="w-24 h-24 text-emerald-400 stroke-current fill-none" viewBox="0 0 100 100">
        <rect x="5" y="5" width="90" height="90" rx="12" className="stroke-slate-700/60 fill-slate-950/80" strokeWidth="1" />
        
        {/* Palm base */}
        <path d="M35 70 C 35 55, 40 45, 50 45 C 60 45, 65 55, 65 70 Z" strokeWidth="2.5" className="stroke-teal-400 fill-teal-950/40" />
        
        {type === 'flat_palm' && (
          // 5 extended fingers
          <g strokeWidth="2.5" strokeLinecap="round">
            <line x1="38" y1="46" x2="28" y2="30" />
            <line x1="43" y1="45" x2="38" y2="20" />
            <line x1="50" y1="45" x2="50" y2="16" />
            <line x1="57" y1="45" x2="62" y2="20" />
            <line x1="62" y1="46" x2="72" y2="30" />
          </g>
        )}

        {type === 'pointing' && (
          // Index finger pointing, others folded
          <g strokeWidth="2.5" strokeLinecap="round">
            <line x1="50" y1="45" x2="50" y2="15" stroke="#10B981" strokeWidth="3" />
            <circle cx="50" cy="15" r="3" fill="#10B981" />
            <path d="M42 55 Q 38 48 45 48" stroke="#64748B" />
            <path d="M58 55 Q 62 48 55 48" stroke="#64748B" />
          </g>
        )}

        {type === 'cupped' && (
          // Cupped curved fingers
          <path d="M32 40 Q 50 20 68 40" strokeWidth="3" strokeLinecap="round" stroke="#06B6D4" />
        )}

        {type === 'two_hands_cross' && (
          // Crossed hands
          <g strokeWidth="2.5" strokeLinecap="round" stroke="#F59E0B">
            <line x1="30" y1="30" x2="70" y2="70" />
            <line x1="70" y1="30" x2="30" y2="70" />
          </g>
        )}

        {type === 'chest_touch' && (
          // Heart chest contact
          <g strokeWidth="2" stroke="#EC4899">
            <circle cx="50" cy="50" r="18" fill="rgba(236,72,153,0.15)" />
            <path d="M42 48 Q 50 40 58 48 Q 50 62 42 48" fill="#EC4899" />
          </g>
        )}

        {/* Direction Indicator Arrow */}
        <path d="M50 82 L 56 88 L 44 88 Z" fill="#10B981" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>স্মার্টহাসপাতাল দ্বি-মুখী যোগাযোগ ডেস্ক</span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-teal-950 text-teal-300 border border-teal-600/40">
                Doctor-to-Patient Reverse BdSL Mode
              </span>
            </h1>
            <p className="text-sm text-slate-400">
              ডাক্তার বা নার্স বাংলায় বাক্য বললে অথবা নির্বাচন করলে তা স্বয়ংক্রিয়ভাবে বধির রোগীর জন্য ক্রমিক সাইন কার্ড ও নির্দেশিকায় রূপান্তরিত হয়।
            </p>
          </div>
        </div>

        <button
          onClick={handleExportSummary}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40 transition shadow-md"
        >
          {exported ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
          <span>{exported ? 'Transcript Exported' : 'ডাউনলোড কনসালটেশন সামারি'}</span>
        </button>
      </div>

      {/* Main Grid: Input + BdSL Decomposition & Two-Way Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT 7 COLS: Doctor Sentence Input & Sequential BdSL Sign Cards */}
        <div className="lg:col-span-7 space-y-5">

          {/* Quick Clinical Presets for Doctor */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>দ্রুত ক্লিনিক্যাল প্রশ্নমালা (Doctor Quick Presets)</span>
              </span>
              <span className="text-xs text-slate-500 font-mono">Click to decompose into BdSL</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DOCTOR_PRESETS.map((p) => {
                const isSelected = selectedPreset.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`text-left p-3 rounded-xl border text-xs transition ${
                      isSelected
                        ? 'bg-teal-950/70 border-teal-500 text-white shadow-md shadow-teal-950'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <p className="font-bold font-bengali text-sm mb-1">{p.bengaliText}</p>
                    <p className="text-[11px] text-slate-400 italic">{p.englishText}</p>
                    <span className="inline-block mt-2 text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-teal-300 font-mono">
                      {p.signs.length} BdSL Signs
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Doctor Input Bar */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendCustomMessage()}
                  placeholder="অন্য কোনো নির্দেশনা বা প্রশ্ন বাংলায় লিখুন (যেমন: ৫ মিনিট অপেক্ষা করুন)..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-bengali"
                />
                <button
                  onClick={handleSendCustomMessage}
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs flex items-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>সাইন করুন</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Doctor Sentence Display */}
          <div className="bg-slate-900 border border-teal-500/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider flex items-center gap-1">
                <Hospital className="w-3.5 h-3.5" />
                <span>নির্বাচিত ডাক্তারের বাক্য ({selectedPreset.department})</span>
              </span>
              <button
                onClick={() => speakText(selectedPreset.bengaliText)}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-mono"
              >
                <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                <span>উচ্চারণ শুনুন</span>
              </button>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white font-bengali">
              "{selectedPreset.bengaliText}"
            </p>
            <p className="text-xs text-slate-400 mt-1 italic">
              Meaning: "{selectedPreset.englishText}"
            </p>
          </div>

          {/* Sequential BdSL Sign Decomposition Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                BdSL Sign Sequence Breakdown ({currentSigns.length} Sequential Steps)
              </h3>
              <span className="text-xs text-teal-400 font-mono">Deaf-Reviewed Notation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentSigns.map((sign, index) => {
                const isActive = activeSignIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveSignIndex(index)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-slate-850 border-emerald-400 shadow-xl shadow-emerald-950/40 scale-[1.01]'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-mono font-bold">
                            {index + 1}
                          </span>
                          <span className="text-base font-bold text-white font-bengali">
                            {sign.glossBn}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-teal-300 block mt-0.5">
                          GLOSS: {sign.glossEn}
                        </span>
                      </div>

                      {/* Visual Handshape SVG Thumbnail */}
                      <div className="shrink-0">
                        {renderHandshapeSVG(sign.handshape, sign.direction)}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1">
                      <p className="text-xs font-bengali text-slate-300">
                        👉 <strong>ইঙ্গিত:</strong> {sign.instructionBn}
                      </p>
                      <p className="text-[11px] text-slate-500 italic">
                        Gesture: {sign.instructionEn} ({sign.direction})
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT 5 COLS: Live Two-Way Consultation Log & Patient History */}
        <div className="lg:col-span-5 space-y-4">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col h-full min-h-[580px] shadow-xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                  দ্বিমুখী কনসালটেশন লগ (Live 2-Way Audit)
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-600/30 font-mono">
                Active Session
              </span>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
              {messages.map((msg) => {
                const isPatient = msg.sender === 'patient';
                return (
                  <div
                    key={msg.id}
                    className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                      isPatient
                        ? 'bg-slate-950 border-emerald-500/40 mr-4'
                        : 'bg-teal-950/40 border-teal-500/40 ml-4'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                        {isPatient ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>রোগীর ইশারা (BdSL)</span>
                          </span>
                        ) : (
                          <span className="text-teal-300 font-semibold flex items-center gap-1">
                            <Stethoscope className="w-3 h-3" />
                            <span>ডাক্তার / রিসেপশন</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>

                    <p className="text-sm font-bold text-white font-bengali leading-relaxed">
                      "{msg.textBn}"
                    </p>

                    <p className="text-[11px] text-slate-400 italic">
                      "{msg.textEn}"
                    </p>

                    {msg.glossTokens && (
                      <div className="flex items-center space-x-1 pt-1 flex-wrap gap-1">
                        <span className="text-[10px] text-slate-500 font-mono">Tokens:</span>
                        {msg.glossTokens.map((t, i) => (
                          <span key={i} className="text-[10px] px-1 py-0.2 rounded bg-slate-800 text-teal-300 font-mono">
                            [{t}]
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Consultation Summary Card */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Patient ID: <strong className="text-white">PT-BDSL-8921</strong></span>
                <span>Triage: <strong className="text-emerald-400">General OPD</strong></span>
              </div>
              <button
                onClick={handleExportSummary}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold transition flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-950"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Official Clinical Transcript (JSON)</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
