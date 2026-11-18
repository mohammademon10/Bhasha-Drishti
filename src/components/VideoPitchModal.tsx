import React, { useState, useEffect } from 'react';
import { 
  X, Play, Pause, RotateCcw, Video, CheckCircle2, 
  ExternalLink, Layers, Volume2, Sparkles, Clock, Copy, Check, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UniversalSpeechEngine } from '../utils/audioPlayer';

interface VideoPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: 'translator' | 'desk' | 'docs') => void;
}

interface PitchSegment {
  id: number;
  timeRange: string;
  nameBn: string;
  nameEn: string;
  durationSec: number;
  keyMessage: string;
  evaluatorLookFor: string;
  visualDirectionBn: string;
  visualDirectionEn: string;
  scriptBn: string;
  scriptEn: string;
  targetView: 'translator' | 'desk' | 'docs';
}

const PITCH_SEGMENTS: PitchSegment[] = [
  {
    id: 1,
    timeRange: '0:00 – 0:30',
    nameBn: '১. সমস্যা ও মানবিক সংকট (Problem - The Vibe)',
    nameEn: '1. Problem & Urgency (The Vibe)',
    durationSec: 30,
    keyMessage: '"This problem matters"',
    evaluatorLookFor: 'Clarity, relevance, human urgency',
    visualDirectionBn: 'হাসপাতালের জরুরি বিভাগ, ওপিডি ডেস্কে বধির রোগীর ভোগান্তি এবং ৩ মিলিয়নের পরিসংখ্যান স্লাইড বা চার্ট দেখান।',
    visualDirectionEn: 'Show hospital triage queue, deaf patient struggling, and stat card (3M+ Deaf in BD, 0 interpreters).',
    scriptBn: 'বাংলাদেশের ৩ মিলিয়নেরও বেশি মানুষ প্রতিদিন বাক ও শ্রবণ প্রতিবন্ধকতার সাথে বসবাস করছেন। তাদের একমাত্র যোগাযোগের মাধ্যম—বাংলা ইশারা ভাষা (BdSL)। কিন্তু আমাদের হাসপাতালগুলোর জরুরি বিভাগে কোনো পেশাদার সাইন ইন্টারপ্রেটার থাকে না। একজন বধির রোগী যখন তীব্র শ্বাসকষ্ট বা বুকে ব্যথা নিয়ে ডাক্তারের কাছে আসেন, তিনি তার কষ্ট প্রকাশ করতে পারেন না। এই কমিউনিকেশন গ্যাপের কারণে ভুল চিকিৎসা ও প্রাণহানির ঝুঁকি তৈরি হয়। এই নীরব সংকট দূর করতেই আমাদের উদ্ভাবন—ভাষা দৃষ্টি।',
    scriptEn: 'Over 3 million people in Bangladesh live with hearing and speech impairments, relying entirely on Bengali Sign Language. Yet, in 98% of hospital emergency desks, there are zero certified interpreters. When a deaf patient arrives with acute respiratory distress, communication breaks down—leading to dangerous delays and misdiagnoses. To bridge this critical medical divide, we built Bhasha Drishti.',
    targetView: 'translator'
  },
  {
    id: 2,
    timeRange: '0:30 – 1:00',
    nameBn: '২. এআই সমাধান ও সিস্টেম পরিচিতি (Solution)',
    nameEn: '2. AI Solution & Value Proposition',
    durationSec: 30,
    keyMessage: '"This is how we solve it"',
    evaluatorLookFor: 'Simplicity, uniqueness, differentiation',
    visualDirectionBn: 'ভাষা দৃষ্টি ওয়েব অ্যাপের হোমস্ক্রিন এবং সিস্টেমের মূল আর্কিটেকচার (ক্যামেরা → এজ এআই → দ্বিমুখী অডিও ও সাইন) দেখান।',
    visualDirectionEn: 'Show Bhasha Drishti live web interface, zero-hardware edge architecture, and sub-300ms SLA pill.',
    scriptBn: 'ভাষা দৃষ্টি হলো একটি এআই-চালিত রিয়েল-টাইম দ্বি-মুখী সাইন ল্যাঙ্গুয়েজ অনুবাদক প্ল্যাটফর্ম। কোনো দামি গ্লাভস বা সেন্সর ছাড়াই, যেকোনো সাধারণ স্মার্টফোন বা ওয়েবক্যামের সামনে রোগী ইশারা করলে সিস্টেমটি তাৎক্ষণিকভাবে তা শনাক্ত করে প্রাকৃতিক বাংলা টেক্সট ও মিষ্টি কণ্ঠস্বরে পড়ে শোনায়। আবার ডাক্তার যখন বাংলায় কথা বলেন, তা স্বয়ংক্রিয়ভাবে রোগীর বোধগম্য সাইন ল্যাঙ্গুয়েজ নির্দেশিকায় রূপান্তরিত হয়—যা নিশ্চিত করে শতভাগ দ্বি-মুখী যোগাযোগ।',
    scriptEn: 'Bhasha Drishti is a real-time, bidirectional BdSL translation platform. Requiring zero specialized hardware or sensory gloves, it works on any standard smartphone or PC webcam. It transforms deaf patient hand gestures into natural Bengali speech and text within 238ms—and reverses doctor directives into sequential visual sign decomposition cards for true two-way clinical consultation.',
    targetView: 'translator'
  },
  {
    id: 3,
    timeRange: '1:00 – 2:00',
    nameBn: '৩. লাইভ ডেমো ও প্রোটোটাইপ টেস্ট (Live Demo)',
    nameEn: '3. Working Demo / Concept Flow',
    durationSec: 60,
    keyMessage: '"This is how it works"',
    evaluatorLookFor: 'Feasibility, working software, responsiveness',
    visualDirectionBn: 'ক্লিনিক্যাল সিমুলেটরে "মাথা ব্যথা" ও "জরুরি শ্বাসকষ্ট" বাটনে চাপ দিয়ে তাৎক্ষণিক রিয়েল বাংলা অডিও শোনান, এরপর "হাসপাতাল ডেস্ক" ট্যাবে গিয়ে ২-ওয়ে সাইন কার্ড দেখান।',
    visualDirectionEn: 'Click "Headache" sign, play real Bengali audio, trigger "Emergency Breath" alert, then switch to Hospital Desk for 2-way doctor directives.',
    scriptBn: 'আসুন সরাসরি আমাদের ওয়ার্কিং প্রোটোটাইপটি দেখি। রোগী ক্যামেরার সামনে সাইন করছেন: [আমি] [মাথা] [ব্যথা]। আমাদের সিস্টেম মিলি-সেকেন্ডে ৪২টি ৩ডি ল্যান্ডমার্ক ট্র্যাক করে রিকনস্ট্রাক্ট করল: "আমার প্রচণ্ড মাথা ব্যথা করছে, আমি ডাক্তার দেখাতে চাই।" এবার দেখুন ইমার্জেন্সি কেস—রোগী সাইন করলেন: [জরুরি] [শ্বাসকষ্ট]। সাথে সাথে সিস্টেম হাই-প্রায়োরিটি রেড অ্যালার্ট ট্রিগার করে অডিও ঘোষণা দিল! এবার ২-ওয়ে ডেস্কে দেখুন: ডাক্তার যখন বললেন "আপনার অ্যাপয়েন্টমেন্ট নম্বর কত?", সিস্টেমটি সাথে সাথে রোগীর জন্য ভিজ্যুয়াল সাইন কার্ড তৈরি করে দিল। সম্পূর্ণ কনসালটেশন সামারি এক ক্লিকে ডাউনলোডযোগ্য!',
    scriptEn: 'Let us see our working prototype. The patient signs: [I] [Head] [Pain]. Our system tracks 42 3D landmarks in real time and speaks: "I have a severe headache, I want to see a doctor." In an emergency, the patient signs [Emergency] [Breathing], instantly triggering an urgent triage banner and voice alert. On our reverse Hospital Desk, doctor queries are instantly converted into step-by-step BdSL sign cards and downloaded as an audit log.',
    targetView: 'desk'
  },
  {
    id: 4,
    timeRange: '2:00 – 2:30',
    nameBn: '৪. ডিপ এআই মডেল ও আর্কিটেকচার (AI Approach)',
    nameEn: '4. AI Approach & Technical Depth',
    durationSec: 30,
    keyMessage: '"This is real AI thinking"',
    evaluatorLookFor: 'Depth, model structure, SLA pass, privacy',
    visualDirectionBn: 'ডকুমেন্টেশন (/docs) ট্যাবে যান। ৪২টি ল্যান্ডমার্ক, PyTorch CNN-BiLSTM, FastMCP সার্ভার এবং জিরো-ভিডিও রিটেনশন ডায়াগ্রাম দেখান।',
    visualDirectionEn: 'Navigate to /docs portal. Show MediaPipe 3D extraction, CNN-BiLSTM, FastMCP Server tools, and Zero-Retention RAM privacy flow.',
    scriptBn: 'আমাদের এআই আর্কিটেকচারটি এজ-ফার্স্ট এবং সম্পূর্ণ প্রাইভেসি-সুরক্ষিত। প্রথম ধাপে, মিডিয়া পাইপ হোলিস্টিক ৩ডি প্রতি ফ্রেমে ৪২টি বায়োমেকানিকাল ল্যান্ডমার্ক এক্সট্রাক্ট করে। র কোঅর্ডিনেটগুলো আমাদের কোয়ান্টাইজড PyTorch CNN-BiLSTM মডেলে যায়, যা ৯৩.৪% নির্ভুলতায় সাইন গ্লস প্রেডিক্ট করে। এরপর কাস্টম FastMCP টুলস ও pgvector আরএজি ব্যাকরণগত ত্রুটিহীন বাংলা বাক্য গঠন করে। মোট লেটেন্সি মাত্র ২৩৮ মিলি-সেকেন্ড—যা আমাদের ৩০০ মিলি-সেকেন্ড এসএলএ-এর চেয়েও দ্রুত! সবচেয়ে গুরুত্বপূর্ণ, কোনো রোগীর ভিডিও ক্লাউডে সেভ হয় না; র‍্যামেই ৩ডি ডেটা প্রসেস হয়ে তাৎক্ষণিক ডিলিট হয়ে যায়।',
    scriptEn: 'Our architecture is edge-first and strictly privacy-compliant. MediaPipe Holistic 3D extracts 42 wrist-normalized skeletal landmarks in RAM. An optimized PyTorch CNN-BiLSTM predicts BdSLW60 word glosses with 93.4% validation accuracy. Then, our custom FastMCP server and pgvector RAG reconstruct complete grammatical sentences within 238ms. Video pixels are purged instantly in volatile memory—guaranteeing zero facial biometric retention.',
    targetView: 'docs'
  },
  {
    id: 5,
    timeRange: '2:30 – 3:00',
    nameBn: '৫. ইমপ্যাক্ট, ইউনিকর্ন রোডম্যাপ ও টিম (Impact & Next Step)',
    nameEn: '5. Impact, Scalability & Unicorn Vision',
    durationSec: 30,
    keyMessage: '"We can build and scale this"',
    evaluatorLookFor: 'Vision, scalability, founder energy',
    visualDirectionBn: 'হাসপাতাল পাইলট রোডম্যাপ, বিটুবি সাস মডেল, SDG-3/10 কমপ্লায়েন্স এবং লিড বিল্ডার মো: ইমন হোসেন ও টিম Tensor_Titan এর সমাপনী স্লাইড দেখান।',
    visualDirectionEn: 'Show SmartHospital rollout roadmap, B2B SaaS economics, SDG-3 & 10 badges, and Team Tensor_Titan builder attribution.',
    scriptBn: 'ভাষা দৃষ্টি কেবল একটি কনসেপ্ট নয়; এটি কার্যকর কোড, ভেরিফায়েড মডেল ও লাইভ ডিপ্লয়মেন্টসহ সম্পূর্ণ প্রোডাকশন-রেডি প্ল্যাটফর্ম। আমাদের লক্ষ্য—বাংলাদেশের প্রতিটি জেলা সদর হাসপাতাল ও প্রাইভেট ক্লিনিকের ওপিডি ডেস্কে ভাষা দৃষ্টি ইন্টিগ্রেট করা। বিটুবি সাস মডেল এবং সরকারি হেলথ পোর্টাল ইন্টিগ্রেশনের মাধ্যমে এটি একটি টেকসই ইউনিকর্ন উদ্যোগে রূপ নেওয়ার পূর্ণ সম্ভাবনা রাখে। বাক ও শ্রবণ প্রতিবন্ধী ভাই-বোনদের স্বাস্থ্যসেবা নিশ্চিত করতে টিম Tensor_Titan তৈরি। ধন্যবাদ। ভিজিট করুন: bhashadrishti.vercel.app।',
    scriptEn: 'Bhasha Drishti is not just a concept—it is a production-ready, fully verified AI system solving an urgent human crisis. With B2B hospital subscriptions and national digital health integrations, we have a clear trajectory from idea to scalable health-tech unicorn. Built with passion by Team Tensor_Titan. Thank you. Explore our live platform at bhashadrishti.vercel.app.',
    targetView: 'docs'
  }
];

export const VideoPitchModal: React.FC<VideoPitchModalProps> = ({ isOpen, onClose, onNavigateView }) => {
  const { language, t } = useLanguage();
  
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [copiedScriptId, setCopiedScriptId] = useState<number | null>(null);

  // Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev >= 180) {
            setIsTimerRunning(false);
            return 180;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Sync active segment with elapsed time
  useEffect(() => {
    if (timerSeconds < 30) {
      setActiveSegmentIndex(0);
    } else if (timerSeconds < 60) {
      setActiveSegmentIndex(1);
    } else if (timerSeconds < 120) {
      setActiveSegmentIndex(2);
    } else if (timerSeconds < 150) {
      setActiveSegmentIndex(3);
    } else {
      setActiveSegmentIndex(4);
    }
  }, [timerSeconds]);

  if (!isOpen) return null;

  const currentSegment = PITCH_SEGMENTS[activeSegmentIndex];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyScript = (segment: PitchSegment) => {
    const text = language === 'bn' ? segment.scriptBn : segment.scriptEn;
    navigator.clipboard.writeText(text);
    setCopiedScriptId(segment.id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  const handleSpeakScript = (text: string) => {
    UniversalSpeechEngine.speak(text, language === 'bn' ? 'bn' : 'en');
  };

  const handleJumpToSegment = (index: number) => {
    setActiveSegmentIndex(index);
    const seg = PITCH_SEGMENTS[index];
    onNavigateView(seg.targetView);
  };

  const progressPercent = Math.min(100, (timerSeconds / 180) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-royal-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel border border-aurora-rose/30 rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-200">
        
        {/* Header: Title & Studio Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-royal-700 via-royal-600 to-aurora-rose text-white shadow-md shadow-aurora-rose/25">
              <Video className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-bengali tracking-tight">
                  {t('১৮০-সেকেন্ড ভিডিও পিচ প্রোডাকশন স্টুডিও', '180-Second Video Pitch Production Studio')}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-aurora-rose/20 text-rose-300 font-mono font-bold border border-aurora-rose/30">
                  "Vibe to Production"
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {t(
                  'আইডিয়া টু ইউনিকর্ন পিচ স্ট্যান্ডার্ড অনুযায়ী ৩ মিনিটের নিখুঁত চিত্রনাট্য ও ভিজ্যুয়াল ডিরেকশন।',
                  'Idea to Unicorn competition standard: exact word-for-word voiceover script and visual storyboard.'
                )}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 180-Second Countdown & Progress Ribbon */}
        <div className="py-4 border-b border-white/[0.08] shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-royal-900 border border-aurora-rose/30 font-mono text-xl font-black text-rose-300 shadow-inner flex items-center gap-2">
                <Clock className="w-4 h-4 text-aurora-rose" />
                <span>{formatTime(timerSeconds)} / 3:00</span>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="px-3 py-1.5 rounded-xl bg-aurora-rose text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-aurora-rose/25 hover:opacity-95 transition"
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isTimerRunning ? t('পজ', 'Pause') : t('টাইমার শুরু', 'Start')}</span>
                </button>

                <button
                  onClick={() => { setIsTimerRunning(false); setTimerSeconds(0); }}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <span className="text-xs font-mono text-rose-300 font-semibold">
              Current Key Message: <strong className="text-white">{currentSegment.keyMessage}</strong>
            </span>
          </div>

          {/* Progress Bar with 5 Stage Segments */}
          <div className="w-full bg-royal-950 h-2.5 rounded-full overflow-hidden border border-white/10 relative">
            <div 
              className="h-full bg-gradient-to-r from-royal-700 via-royal-600 to-aurora-rose transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Segment Indicator Buttons */}
          <div className="grid grid-cols-5 gap-1.5">
            {PITCH_SEGMENTS.map((seg, idx) => {
              const isActive = activeSegmentIndex === idx;
              return (
                <button
                  key={seg.id}
                  onClick={() => handleJumpToSegment(idx)}
                  className={`p-2 rounded-xl text-left border transition text-[11px] font-mono ${
                    isActive
                      ? 'bg-gradient-to-r from-royal-700 to-aurora-rose/60 border-aurora-rose text-white shadow-md shadow-aurora-rose/20 font-bold'
                      : 'bg-royal-900/60 border-white/[0.08] text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold">{seg.timeRange}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>}
                  </div>
                  <p className="truncate text-[10px] opacity-90">{seg.nameEn.split('.')[1]}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Segment Content Details & Script (Scrollable) */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          
          {/* Active Segment Header */}
          <div className="p-4 rounded-2xl bg-royal-900/80 border border-aurora-rose/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-aurora-rose/20 text-rose-300">
                  {currentSegment.timeRange} ({currentSegment.durationSec}s)
                </span>
                <span className="text-xs font-mono text-purple-300 font-semibold">
                  Evaluators: {currentSegment.evaluatorLookFor}
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-bengali mt-1">
                {language === 'bn' ? currentSegment.nameBn : currentSegment.nameEn}
              </h3>
            </div>

            <button
              onClick={() => onNavigateView(currentSegment.targetView)}
              className="btn-royal-aurora px-4 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 self-end md:self-auto shadow-md"
            >
              <span>{t('এই ভিউতে যান', 'Switch App Screen')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Visual Storyboard Direction Box */}
          <div className="p-4 rounded-2xl bg-royal-950/80 border border-white/[0.08] space-y-1.5">
            <div className="flex items-center space-x-2 text-xs font-mono text-rose-300 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-aurora-rose" />
              <span>{t('ভিডিওতে কী দেখাতে হবে (Visual Storyboard Action)', 'What You Must Show on Screen')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {language === 'bn' ? currentSegment.visualDirectionBn : currentSegment.visualDirectionEn}
            </p>
          </div>

          {/* Word-for-Word Voiceover Script Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-royal-900 via-royal-850 to-royal-950 border border-aurora-rose/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-aurora-rose" />
                <span>{t('মুখে যা বলতে হবে (Word-for-Word Voiceover Script)', 'Spoken Voiceover Script')}</span>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSpeakScript(language === 'bn' ? currentSegment.scriptBn : currentSegment.scriptEn)}
                  className="px-3 py-1 rounded-lg bg-royal-800 text-rose-300 hover:text-white text-xs font-mono flex items-center gap-1 border border-aurora-rose/25 transition"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{t('ভয়েস শুনুন', 'Listen')}</span>
                </button>

                <button
                  onClick={() => handleCopyScript(currentSegment)}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1 transition"
                >
                  {copiedScriptId === currentSegment.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScriptId === currentSegment.id ? t('কপি হয়েছে', 'Copied') : t('কপি স্ক্রিপ্ট', 'Copy')}</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-royal-950 border border-white/[0.06]">
              <p className="text-sm sm:text-base font-bengali text-white leading-relaxed whitespace-pre-line font-medium">
                "{language === 'bn' ? currentSegment.scriptBn : currentSegment.scriptEn}"
              </p>
            </div>

            {/* Translation reference */}
            <p className="text-xs text-slate-400 italic">
              <strong>English Reference:</strong> "{currentSegment.scriptEn}"
            </p>
          </div>

        </div>

        {/* Footer: Quick Reference & GitHub Document Link */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span>Doc Location:</span>
            <code className="text-rose-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">docs/VIDEO_PITCH_180S_SCRIPT.md</code>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                const allScript = PITCH_SEGMENTS.map(s => `[${s.timeRange}] ${s.nameEn}\n${s.scriptBn}\n`).join('\n\n');
                navigator.clipboard.writeText(allScript);
                alert(t('সম্পূর্ণ ১৮০-সেকেন্ড স্ক্রিপ্ট ক্লিপবোর্ডে কপি হয়েছে!', 'Full 180s script copied to clipboard!'));
              }}
              className="px-3 py-1.5 rounded-xl glass-panel glass-panel-hover text-rose-300 border border-aurora-rose/20 transition"
            >
              {t('পুরো ৩ মিনিটের স্ক্রিপ্ট কপি করুন', 'Copy Full 180s Script')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
