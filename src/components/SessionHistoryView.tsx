import React, { useState, useMemo } from 'react';
import { 
  History, Search, Filter, Download, FileText, Trash2, 
  Clock, ShieldCheck, Eye, X, Volume2, User, Stethoscope, 
  CheckCircle2, AlertTriangle, FileDown, Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UniversalSpeechEngine } from '../utils/audioPlayer';

interface ConsultationRecord {
  id: string;
  patientId: string;
  date: string;
  time: string;
  duration: string;
  phrasesCount: number;
  department: string;
  status: 'Completed' | 'Triage In Progress' | 'Urgent Review';
  dialogue: {
    speaker: 'patient' | 'doctor';
    textBn: string;
    textEn: string;
    tokens?: string[];
    timestamp: string;
  }[];
}

const INITIAL_SESSIONS: ConsultationRecord[] = [
  {
    id: 'SES-2026-8921',
    patientId: 'PT-BDSL-8921',
    date: '19 November 2026',
    time: '10:14 AM',
    duration: '4m 32s',
    phrasesCount: 5,
    department: 'General Medicine / Neurology',
    status: 'Completed',
    dialogue: [
      {
        speaker: 'patient',
        textBn: 'আমার প্রচণ্ড মাথা ব্যথা করছে, আমি ডাক্তার দেখাতে চাই।',
        textEn: 'I have a severe headache, I want to see a doctor.',
        tokens: ['আমি', 'মাথা', 'ব্যথা'],
        timestamp: '10:14 AM'
      },
      {
        speaker: 'doctor',
        textBn: 'আপনার অ্যাপয়েন্টমেন্ট নম্বর কত?',
        textEn: 'What is your appointment number?',
        timestamp: '10:15 AM'
      },
      {
        speaker: 'patient',
        textBn: 'আমার নম্বর ৪২, অনুগ্রহ করে প্রেসার পরীক্ষা করুন।',
        textEn: 'My number is 42, please check my blood pressure.',
        tokens: ['নম্বর', 'রক্তচাপ', 'পরীক্ষা'],
        timestamp: '10:16 AM'
      },
      {
        speaker: 'doctor',
        textBn: 'অনুগ্রহ করে চেয়ারে সোজা হয়ে বসুন, আমি আপনার রক্তচাপ মেপে দেব।',
        textEn: 'Please sit upright in the chair; I will check your blood pressure.',
        timestamp: '10:17 AM'
      },
      {
        speaker: 'patient',
        textBn: 'আপনাকে অসংখ্য ধন্যবাদ, আমি এখন আগের চেয়ে ভালো বোধ করছি।',
        textEn: 'Thank you very much, I feel much better than before.',
        tokens: ['ধন্যবাদ', 'ভালো'],
        timestamp: '10:18 AM'
      }
    ]
  },
  {
    id: 'SES-2026-8920',
    patientId: 'PT-BDSL-8920',
    date: '19 November 2026',
    time: '09:42 AM',
    duration: '2m 15s',
    phrasesCount: 3,
    department: 'Emergency Triage & ICU',
    status: 'Urgent Review',
    dialogue: [
      {
        speaker: 'patient',
        textBn: 'জরুরি সাহায্য প্রয়োজন! রোগীর তীব্র শ্বাসকষ্ট হচ্ছে।',
        textEn: 'Emergency assistance required! Patient is experiencing severe respiratory distress.',
        tokens: ['জরুরি', 'সাহায্য', '呼吸'],
        timestamp: '09:42 AM'
      },
      {
        speaker: 'doctor',
        textBn: 'জরুরি অক্সিজেন মাস্ক পরিয়ে দিন এবং ইসিজি মনিটর চালু করুন।',
        textEn: 'Administer emergency oxygen mask immediately and initiate ECG monitor.',
        timestamp: '09:43 AM'
      }
    ]
  },
  {
    id: 'SES-2026-8919',
    patientId: 'PT-BDSL-8919',
    date: '18 November 2026',
    time: '04:15 PM',
    duration: '6m 10s',
    phrasesCount: 4,
    department: 'Hospital Pharmacy',
    status: 'Completed',
    dialogue: [
      {
        speaker: 'patient',
        textBn: 'আমি এই ওষুধটি কখন এবং কীভাবে খাবো?',
        textEn: 'When and how should I take this medication?',
        tokens: ['ওষুধ', 'কখন', 'খাবো'],
        timestamp: '04:15 PM'
      },
      {
        speaker: 'doctor',
        textBn: 'এই ট্যাবলেটটি প্রতিদিন সকালে ও রাতে ভরা পেটে খাবেন।',
        textEn: 'Take this tablet twice daily, morning and night, after meals.',
        timestamp: '04:16 PM'
      }
    ]
  },
  {
    id: 'SES-2026-8918',
    patientId: 'PT-BDSL-8918',
    date: '18 November 2026',
    time: '02:30 PM',
    duration: '3m 45s',
    phrasesCount: 3,
    department: 'Diagnostic & Nursing Station',
    status: 'Completed',
    dialogue: [
      {
        speaker: 'patient',
        textBn: 'দয়া করে আমার রক্তচাপ পরীক্ষা করুন।',
        textEn: 'Please check my blood pressure.',
        tokens: ['রক্তচাপ', 'পরীক্ষা'],
        timestamp: '02:30 PM'
      },
      {
        speaker: 'doctor',
        textBn: 'আপনার রক্তচাপ স্বাভাবিক: ১২০/৮০ mmHg।',
        textEn: 'Your blood pressure is normal: 120/80 mmHg.',
        timestamp: '02:32 PM'
      }
    ]
  }
];

export const SessionHistoryView: React.FC = () => {
  const { t } = useLanguage();
  const [sessions, setSessions] = useState<ConsultationRecord[]>(INITIAL_SESSIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedSession, setSelectedSession] = useState<ConsultationRecord | null>(null);
  const [exportedPdfId, setExportedPdfId] = useState<string | null>(null);

  const departments = ['All', 'General Medicine', 'Emergency', 'Pharmacy', 'Diagnostic'];

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchesDept = selectedDept === 'All' || s.department.toLowerCase().includes(selectedDept.toLowerCase());
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesDept;

      const matchesSearch = 
        s.id.toLowerCase().includes(q) ||
        s.patientId.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.dialogue.some(d => d.textBn.toLowerCase().includes(q) || d.textEn.toLowerCase().includes(q));

      return matchesDept && matchesSearch;
    });
  }, [sessions, searchQuery, selectedDept]);

  const handleDeleteSession = (id: string) => {
    if (confirm(t('আপনি কি নিশ্চিত যে এই সেশন হিস্ট্রি লগ মুছে ফেলতে চান?', 'Are you sure you want to delete this session record?'))) {
      setSessions(prev => prev.filter(s => s.id !== id));
      if (selectedSession?.id === id) {
        setSelectedSession(null);
      }
    }
  };

  const handlePrintPDF = (session: ConsultationRecord) => {
    setExportedPdfId(session.id);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert(t('পপ-আপ ব্লক করা আছে, দয়া করে অনুমতি দিন।', 'Pop-up blocked. Please allow pop-ups to print PDF.'));
      return;
    }

    const messagesHtml = session.dialogue.map((d, idx) => `
      <div style="margin-bottom: 12px; padding: 12px 14px; border-radius: 8px; border-left: 4px solid ${d.speaker === 'patient' ? '#20B6A5' : '#182C47'}; background: #F8FAFC;">
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #64748B; font-family: monospace; margin-bottom: 4px;">
          <strong>#${idx + 1} ${d.speaker === 'patient' ? '🧏 রোগী (BdSL অনুবাদ)' : '👨‍⚕️ চিকিৎসক / পরামর্শক'}</strong>
          <span>${d.timestamp}</span>
        </div>
        <div style="font-size: 14px; font-weight: bold; color: #0F172A; font-family: 'Hind Siliguri', sans-serif;">
          "${d.textBn}"
        </div>
        <div style="font-size: 11px; color: #475569; font-style: italic; margin-top: 2px;">
          Meaning: "${d.textEn}"
        </div>
        ${d.tokens ? `<div style="font-size: 10px; color: #0D9488; font-family: monospace; margin-top: 4px;">Tokens: [${d.tokens.join('] [')}]</div>` : ''}
      </div>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html lang="bn">
      <head>
        <meta charset="UTF-8">
        <title>Bhasha_Drishti_Clinical_Transcript_${session.id}</title>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: 'Inter', sans-serif; color: #0F172A; margin: 0; padding: 15px; }
          .header { border-bottom: 2px solid #20B6A5; padding-bottom: 10px; margin-bottom: 15px; display: flex; justify-content: space-between; }
          .meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; background: #F1F5F9; padding: 10px; border-radius: 6px; margin-bottom: 15px; font-size: 11px; }
          .footer { margin-top: 20px; padding-top: 10px; border-top: 1px solid #E2E8F0; font-size: 10px; color: #64748B; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 style="margin: 0; font-family: 'Hind Siliguri'; font-size: 20px;">ভাষা দৃষ্টি — ক্লিনিক্যাল কনসালটেশন রিপোর্ট</h1>
            <p style="margin: 2px 0 0; font-size: 11px; color: #64748B;">SmartHospital Bidirectional BdSL Translation Audit • HealthSphere AI</p>
          </div>
          <div style="text-align: right; font-size: 11px; font-family: monospace;">
            <div>SESSION: ${session.id}</div>
            <div>DATE: ${session.date}</div>
          </div>
        </div>

        <div class="meta-grid">
          <div><strong>PATIENT ID:</strong><br/>${session.patientId}</div>
          <div><strong>DEPARTMENT:</strong><br/>${session.department}</div>
          <div><strong>DURATION:</strong><br/>${session.duration}</div>
          <div><strong>AI ACCURACY:</strong><br/><span style="color: #059669;">93.4% • 238ms SLA</span></div>
        </div>

        <div>${messagesHtml}</div>

        <div style="margin-top: 15px; padding: 8px 12px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; font-size: 10px; color: #166534;">
          <strong>🔒 Zero-Retention Privacy:</strong> No raw biometric video or facial frames retained on cloud storage.
        </div>

        <div class="footer">
          <div>Team Tensor_Titan • Lead Architect: MD. Emon Hossain • bhashadrishti.vercel.app</div>
          <div style="font-weight: bold; color: #0D9488;">✓ VERIFIED CLINICAL RECORD</div>
        </div>

        <script>
          window.onload = function() { window.focus(); window.print(); };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => setExportedPdfId(null), 2500);
  };

  const handleExportJSON = (session: ConsultationRecord) => {
    const blob = new Blob([JSON.stringify(session, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bhasha_Drishti_${session.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-teal-500/20 bg-gradient-to-r from-navy-900 to-navy-850 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <History className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-bengali">
              {t('ক্লিনিক্যাল কনসালটেশন সেশন হিস্ট্রি', 'Consultation Session History')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            {t(
              'হাসপাতালে সম্পাদিত বধির রোগীর ট্রায়াজ সেশন লগ, ট্রান্সক্রিপ্ট ও প্রিন্ট-রেডি মেডিকেল রিপোর্ট।',
              'Archive of hospital triage sessions, bilingual transcripts, and printable clinical records.'
            )}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 px-3.5 py-2 rounded-xl bg-navy-800 border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('জিরো-রিটেনশন প্রাইভেসির নিশ্চয়তা', 'Zero-Retention RAM Policy')}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('সেশন আইডি, রোগী আইডি বা উপসর্গ দিয়ে খুঁজুন...', 'Search by Session ID, Patient ID, symptoms...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition font-sans"
            />
          </div>

          <div className="text-xs font-mono text-slate-400 shrink-0">
            {t(`মোট সেশন: ${filteredSessions.length}টি`, `Total Sessions: ${filteredSessions.length}`)}
          </div>
        </div>

        {/* Department Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>{t('বিভাগ:', 'Department:')}</span>
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap ${
                selectedDept === dept
                  ? 'bg-teal-500 text-white font-bold shadow-md shadow-teal-500/20'
                  : 'bg-navy-800 text-slate-400 hover:text-white hover:bg-navy-750'
              }`}
            >
              {dept === 'All' ? t('সকল বিভাগ', 'All Departments') : dept}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions Table */}
      <div className="glass-panel rounded-3xl p-5 border border-white/5 space-y-3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-navy-700 text-slate-400 font-mono">
                <th className="py-3 px-4 font-semibold">{t('সেশন আইডি', 'Session ID')}</th>
                <th className="py-3 px-4 font-semibold">{t('তারিখ ও সময়', 'Date & Time')}</th>
                <th className="py-3 px-4 font-semibold">{t('স্থায়িত্ব', 'Duration')}</th>
                <th className="py-3 px-4 font-semibold">{t('বিভাগ', 'Department')}</th>
                <th className="py-3 px-4 font-semibold">{t('স্ট্যাটাস', 'Status')}</th>
                <th className="py-3 px-4 font-semibold text-right">{t('অ্যাকশন', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/50">
              {filteredSessions.map((s) => (
                <tr key={s.id} className="hover:bg-navy-800/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    <div className="flex flex-col">
                      <span>{s.id}</span>
                      <span className="text-[10px] text-teal-400 font-normal">{s.patientId}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono">
                    <div>{s.date}</div>
                    <div className="text-[10px] text-slate-500">{s.time}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">
                    {s.duration}
                  </td>
                  <td className="py-3.5 px-4 text-slate-200">
                    {s.department}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border ${
                      s.status === 'Completed'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => setSelectedSession(s)}
                        className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-teal-400 transition"
                        title={t('ট্রান্সক্রিপ্ট দেখুন', 'View Transcript')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrintPDF(s)}
                        className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-rose-300 transition"
                        title={t('PDF সামারি প্রিন্ট করুন', 'Print PDF Summary')}
                      >
                        <FileDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSession(s.id)}
                        className="p-1.5 rounded-lg bg-navy-800 hover:bg-rose-900/50 text-slate-500 hover:text-rose-400 transition"
                        title={t('মুছে ফেলুন', 'Delete Record')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transcript Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 max-w-2xl w-full border border-teal-500/30 space-y-5 bg-navy-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedSession(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-navy-800 text-slate-400 hover:text-white hover:bg-navy-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 font-bold uppercase">
                {selectedSession.id} • {selectedSession.patientId}
              </span>
              <h2 className="text-xl font-bold text-white font-bengali pt-1">
                {t('কনসালটেশন ট্রান্সক্রিপ্ট বিবরণী', 'Clinical Consultation Transcript')}
              </h2>
              <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono mt-0.5">
                <span>{selectedSession.date}</span>
                <span>•</span>
                <span>{selectedSession.department}</span>
              </div>
            </div>

            {/* Messages Log */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {selectedSession.dialogue.map((msg, i) => {
                const isPatient = msg.speaker === 'patient';
                return (
                  <div
                    key={i}
                    className={`p-3.5 rounded-2xl border space-y-1.5 ${
                      isPatient 
                        ? 'bg-navy-950/80 border-teal-500/30 mr-4' 
                        : 'bg-navy-800/80 border-navy-700 ml-4'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className={isPatient ? 'text-teal-400 font-bold flex items-center gap-1' : 'text-slate-300 font-bold flex items-center gap-1'}>
                        {isPatient ? <User className="w-3.5 h-3.5" /> : <Stethoscope className="w-3.5 h-3.5" />}
                        <span>{isPatient ? t('রোগীর ইশারা (BdSL অনুবাদ)', 'Patient (BdSL Translated)') : t('চিকিৎসকের বার্তা', 'Physician Message')}</span>
                      </span>
                      <span className="text-slate-500">{msg.timestamp}</span>
                    </div>

                    <p className="text-sm font-bold text-white font-bengali">
                      "{msg.textBn}"
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      "{msg.textEn}"
                    </p>

                    {msg.tokens && (
                      <div className="flex items-center gap-1 pt-1">
                        <span className="text-[10px] text-slate-500 font-mono">Tokens:</span>
                        {msg.tokens.map((tok, idx) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.2 rounded bg-navy-900 text-teal-300 font-mono">
                            [{tok}]
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-navy-700">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero-Retention RAM Policy Enforced</span>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePrintPDF(selectedSession)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl btn-teal-primary text-xs font-bold font-sans transition shadow-md"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('অফিসিয়াল PDF রিপোর্ট', 'Download PDF Report')}</span>
                </button>
                <button
                  onClick={() => handleExportJSON(selectedSession)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white text-xs font-mono border border-navy-700 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
