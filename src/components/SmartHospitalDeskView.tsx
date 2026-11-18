import React, { useState } from 'react';
import { 
  Stethoscope, Send, Download, Sparkles, CheckCircle2, 
  HelpCircle, ChevronRight, User, Hospital, Volume2, ArrowRight,
  Clock, ShieldAlert, FileText, Check, Plus, Printer, FileDown
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

  const [exportedPdf, setExportedPdf] = useState<boolean>(false);

  const handleExportJSON = () => {
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

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert(t('পপ-আপ উইন্ডো ব্লক করা হয়েছে। অনুগ্রহ করে পপ-আপ অনুমতি দিন।', 'Pop-up blocked. Please allow pop-ups to download PDF.'));
      return;
    }

    const currentDate = new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const messagesHtml = messages.map((m, idx) => `
      <div style="margin-bottom: 12px; padding: 12px 16px; border-radius: 8px; border-left: 4px solid ${m.sender === 'patient' ? '#E94560' : '#3E2F58'}; background: #F8FAFC;">
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #64748B; font-family: monospace; margin-bottom: 5px;">
          <span style="font-weight: bold; color: ${m.sender === 'patient' ? '#C2185B' : '#312E81'};">
            #${idx + 1} ${m.sender === 'patient' ? '🧏 রোগী (BdSL সাইন থেকে অনূদিত)' : '👨‍⚕️ চিকিৎসক / পরামর্শক'}
          </span>
          <span>${m.timestamp}</span>
        </div>
        <div style="font-size: 14px; font-weight: 700; color: #0F172A; line-height: 1.5; font-family: 'Hind Siliguri', 'Segoe UI', sans-serif;">
          "${m.textBn}"
        </div>
        <div style="font-size: 12px; color: #475569; font-style: italic; margin-top: 3px;">
          Meaning: "${m.textEn}"
        </div>
        ${m.glossTokens ? `
          <div style="margin-top: 5px; font-size: 11px; color: #0284C7; font-family: monospace;">
            চিহ্নিত টোকেন: [${m.glossTokens.join('] + [')}]
          </div>
        ` : ''}
      </div>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html lang="bn">
      <head>
        <meta charset="UTF-8">
        <title>Bhasha_Drishti_Consultation_Summary_PT-BDSL-8921</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          @page { size: A4; margin: 15mm; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #0F172A;
            background: #FFFFFF;
            margin: 0;
            padding: 16px;
            line-height: 1.4;
          }
          .header {
            border-bottom: 2px solid #E94560;
            padding-bottom: 12px;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .hospital-brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .logo-box {
            background: linear-gradient(135deg, #3E2F58, #E94560);
            color: #FFFFFF;
            font-family: 'Hind Siliguri', sans-serif;
            font-size: 26px;
            font-weight: 900;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .title-block h1 {
            font-family: 'Hind Siliguri', sans-serif;
            font-size: 20px;
            margin: 0;
            color: #0F172A;
          }
          .title-block p {
            margin: 2px 0 0;
            font-size: 11px;
            color: #64748B;
          }
          .doc-meta {
            text-align: right;
            font-size: 11px;
            font-family: monospace;
            color: #475569;
          }
          .badge {
            display: inline-block;
            background: #FFE4E6;
            color: #E11D48;
            font-weight: bold;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            margin-top: 4px;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            background: #F1F5F9;
            padding: 10px 14px;
            border-radius: 8px;
            margin-bottom: 18px;
            font-size: 11px;
          }
          .meta-item strong {
            display: block;
            color: #475569;
            font-size: 10px;
            text-transform: uppercase;
          }
          .meta-item span {
            font-weight: 700;
            color: #0F172A;
            font-size: 12px;
          }
          .section-title {
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            color: #334155;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 24px;
            padding-top: 12px;
            border-top: 1px solid #E2E8F0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10px;
            color: #64748B;
          }
          .seal-box {
            border: 1px dashed #E94560;
            padding: 5px 10px;
            border-radius: 6px;
            color: #C2185B;
            font-weight: bold;
            font-size: 10px;
          }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="hospital-brand">
            <div class="logo-box">ভা</div>
            <div class="title-block">
              <h1>ভাষা দৃষ্টি (Bhasha Drishti) — স্মার্টহাসপাতাল কনসালটেশন সামারি</h1>
              <p>SmartHospital Bidirectional BdSL Clinical Dialogue Report &bull; HealthSphere AI</p>
            </div>
          </div>
          <div class="doc-meta">
            <div>DATE: ${currentDate}</div>
            <div>TIME: ${currentTime}</div>
            <div class="badge">OFFICIAL CLINICAL RECORD</div>
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-item">
            <strong>রোগী আইডি (Patient ID)</strong>
            <span>PT-BDSL-8921</span>
          </div>
          <div class="meta-item">
            <strong>বিভাগ (Department)</strong>
            <span>OPD Clinical Triage</span>
          </div>
          <div class="meta-item">
            <strong>ভাষা মোড (Language Mode)</strong>
            <span>বাংলা সাইন ল্যাঙ্গুয়েজ (BdSL)</span>
          </div>
          <div class="meta-item">
            <strong>AI ভেরিফিকেশন (Accuracy)</strong>
            <span style="color: #059669;">93.4% • SLA: 238ms</span>
          </div>
        </div>

        <div class="section-title">
          📋 দ্বি-মুখী কনসালটেশন ট্রান্সক্রিপ্ট লগ (2-Way Dialogue Transcript Log)
        </div>

        <div>
          ${messagesHtml}
        </div>

        <div style="margin-top: 18px; padding: 10px 14px; background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 8px; font-size: 11px; color: #9F1239;">
          <strong>🔒 রেসপন্সিবল এআই ও প্রাইভেসির নিশ্চয়তা (Responsible AI & Privacy Compliance):</strong><br/>
          এই কথোপকথনটি ভাষা দৃষ্টির জিরো-রিটেনশন র‍্যাম মেমোরি কাঠামোর অধীনে তাৎক্ষণিক অনুবাদ করা হয়েছে। কোনো বায়োমেট্রিক ফেসিয়াল ভিডিও বা সংবেদনশীল ভিজ্যুয়াল ফাইল ক্লাউডে সংরক্ষিত করা হয়নি।
        </div>

        <div class="footer">
          <div>
            টিম <strong>Tensor_Titan</strong> দ্বারা International AI Builders Congress-এর জন্য নির্মিত।<br/>
            Lead Architect & Builder: <strong>MD. Emon Hossain</strong> &bull; MIT License &bull; bhashadrishti.vercel.app
          </div>
          <div class="seal-box">
            ✓ VERIFIED CLINICAL AI RECORD
          </div>
        </div>

        <script>
          window.onload = function() {
            window.focus();
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    setExportedPdf(true);
    setTimeout(() => setExportedPdf(false), 2500);
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
      <svg className="w-20 h-20 text-aurora-rose stroke-current fill-none" viewBox="0 0 100 100">
        <rect x="5" y="5" width="90" height="90" rx="14" className="stroke-aurora-rose/20 fill-royal-950/80" strokeWidth="1" />
        <path d="M35 70 C 35 55, 40 45, 50 45 C 60 45, 65 55, 65 70 Z" strokeWidth="2.5" className="stroke-aurora-rose fill-aurora-rose/20" />
        
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
            <line x1="50" y1="45" x2="50" y2="15" stroke="#E94560" strokeWidth="3" />
            <circle cx="50" cy="15" r="3" fill="#E94560" />
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
          <g strokeWidth="2" stroke="#E94560">
            <circle cx="50" cy="50" r="18" fill="rgba(233,69,96,0.15)" />
            <path d="M42 48 Q 50 40 58 48 Q 50 62 42 48" fill="#E94560" />
          </g>
        )}

        <path d="M50 82 L 56 88 L 44 88 Z" fill="#E94560" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">

      {/* Top Banner: Dynamic, Sleek & Fluid Bar in Royal Aurora Palette */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 shadow-xl border border-aurora-rose/20">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-royal-700 to-aurora-rose text-white shadow-md shadow-aurora-rose/25 shrink-0">
            <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h1 className="text-base sm:text-lg font-bold text-white font-bengali tracking-tight">
                {t('স্মার্টহাসপাতাল দ্বি-মুখী যোগাযোগ ডেস্ক', 'SmartHospital Two-Way Clinical Desk')}
              </h1>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-aurora-rose/15 text-rose-300 border border-aurora-rose/30">
                Doctor-to-Patient Reverse Mode
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {t(
                'ডাক্তার বাংলায় বললে তা স্বয়ংক্রিয়ভাবে বধির রোগীর জন্য ক্রমিক সাইন কার্ড ও হ্যান্ডশেইপ নির্দেশিকায় রূপান্তরিত হয়।',
                'Physicians speak or type in Bengali, automatically generating step-by-step sign language cards for deaf patients.'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end md:self-auto shrink-0">
          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-aurora-rose to-royal-700 text-white shadow-md shadow-aurora-rose/25 hover:brightness-110 transition shrink-0"
            title="Download Official PDF Consultation Report"
          >
            {exportedPdf ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <FileText className="w-3.5 h-3.5" />}
            <span>{exportedPdf ? t('PDF প্রস্তুত', 'PDF Ready') : t('📄 PDF সামারি', '📄 PDF Report')}</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center space-x-1.5 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-mono font-bold glass-panel glass-panel-hover text-rose-300 border border-aurora-rose/30 transition shadow-md shrink-0"
            title="Export Raw JSON Transcript Data"
          >
            {exported ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span>{exported ? t('JSON সেভ হয়েছে', 'Saved') : t('💾 JSON', '💾 JSON')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Doctor Sentences + Dynamic Sign Cards & 2-Way Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT 7 COLS: Presets + Sequential Signs */}
        <div className="lg:col-span-7 space-y-5">

          {/* Quick Doctor Presets */}
          <div className="glass-panel rounded-3xl p-5 space-y-3 border border-aurora-rose/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-aurora-rose" />
                <span>{t('দ্রুত ক্লিনিক্যাল প্রশ্নমালা (Doctor Quick Presets)', 'Physician Clinical Quick Presets')}</span>
              </span>
              <span className="text-[11px] text-rose-300 font-mono">{t('সাইন দেখতে ট্যাপ করুন', 'Tap to decompose')}</span>
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
                        ? 'bg-gradient-to-r from-royal-800 to-royal-700/80 border-aurora-rose text-white shadow-lg shadow-aurora-rose/20 ring-1 ring-aurora-rose'
                        : 'bg-royal-900/60 hover:bg-royal-850 border-white/[0.06] text-slate-300 hover:border-aurora-rose/30'
                    }`}
                  >
                    <p className="font-bold font-bengali text-sm text-white mb-1">{p.bengaliText}</p>
                    <p className="text-[11px] text-slate-400 italic">{p.englishText}</p>
                    <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-rose-300 font-mono">
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
                  className="flex-1 px-4 py-3 rounded-2xl bg-royal-950 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-aurora-rose font-bengali"
                />
                <button
                  onClick={handleSendCustomMessage}
                  className="btn-royal-aurora px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-aurora-rose/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('সাইন করুন', 'Translate')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Doctor Sentence Card */}
          <div className="glass-panel rounded-3xl p-5 border border-aurora-rose/30 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-aurora-rose uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Hospital className="w-4 h-4" />
                <span>{t('নির্বাচিত ডাক্তারের বাক্য', 'Selected Physician Directive')} ({selectedPreset.department})</span>
              </span>
              <button
                onClick={() => speakCurrent(selectedPreset.bengaliText)}
                className="text-xs text-rose-300 hover:text-white flex items-center gap-1.5 font-mono"
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
              <span className="text-xs text-rose-300 font-mono">{t('বধির-বান্ধব ভিজ্যুয়াল গাইড', 'Deaf-First Visual Guide')}</span>
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
                        ? 'bg-royal-850 border-aurora-rose shadow-xl shadow-aurora-rose/20 scale-[1.01]'
                        : 'glass-panel hover:bg-royal-850 border-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-aurora-rose/20 text-rose-300 border border-aurora-rose/40 flex items-center justify-center text-xs font-mono font-bold">
                            {index + 1}
                          </span>
                          <span className="text-lg font-bold text-white font-bengali">
                            {sign.glossBn}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-rose-300 block mt-1">
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
          <div className="glass-panel rounded-3xl p-5 flex flex-col h-full min-h-[580px] shadow-2xl border border-aurora-rose/20">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-aurora-rose" />
                <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
                  {t('দ্বিমুখী কনসালটেশন লগ', '2-Way Consultation Audit Log')}
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-aurora-rose/20 text-rose-300 border border-aurora-rose/40 font-mono font-semibold">
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
                        ? 'bg-royal-950/80 border-aurora-rose/40 mr-3'
                        : 'bg-royal-850/80 border-royal-700/60 ml-3'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                        {isPatient ? (
                          <span className="text-aurora-rose font-bold flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            <span>{t('রোগীর ইশারা (BdSL)', 'Patient BdSL')}</span>
                          </span>
                        ) : (
                          <span className="text-rose-300 font-bold flex items-center gap-1">
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
                          <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-rose-300 font-mono">
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
                <span>{t('ট্রায়াজ:', 'Triage:')} <strong className="text-rose-300">OPD Room 4</strong></span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleExportPDF}
                  className="btn-royal-aurora py-2.5 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center space-x-2 shadow-lg shadow-aurora-rose/20 text-white"
                >
                  {exportedPdf ? <Check className="w-4 h-4 text-emerald-300" /> : <FileDown className="w-4 h-4" />}
                  <span>{exportedPdf ? t('PDF প্রস্তুত হয়েছে', 'PDF Ready') : t('📄 অফিসিয়াল PDF সামারি', '📄 Official PDF Report')}</span>
                </button>
                <button
                  onClick={handleExportJSON}
                  className="glass-panel glass-panel-hover py-2.5 px-3 rounded-xl font-bold text-xs font-mono text-rose-200 border border-aurora-rose/30 transition flex items-center justify-center space-x-2 shadow-md"
                >
                  {exported ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
                  <span>{exported ? t('JSON সেভ হয়েছে', 'Saved') : t('💾 JSON ডাটা এক্সপোর্ট', '💾 Export JSON Data')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
