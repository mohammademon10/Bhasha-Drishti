import React, { useState, useMemo, useEffect } from 'react';
import { 
  Stethoscope, Search, Volume2, Copy, Check, Star, 
  Send, Filter, AlertTriangle, Sparkles, X, ChevronRight, Bookmark
} from 'lucide-react';
import { UniversalSpeechEngine } from '../utils/audioPlayer';
import { useLanguage } from '../context/LanguageContext';
import { AppView } from './NavigationSidebar';

interface MedicalPhrase {
  id: string;
  category: 'Emergency' | 'Reception' | 'Symptoms' | 'Doctor Questions' | 'Nurse Instructions' | 'Pharmacy' | 'Diagnostics' | 'Discharge';
  bengaliText: string;
  englishText: string;
  urgency: 'Normal' | 'Priority' | 'Emergency';
  department: string;
}

const HOSPITAL_PHRASES: MedicalPhrase[] = [
  // 1. Emergency
  {
    id: 'ph_em_1',
    category: 'Emergency',
    bengaliText: 'জরুরি সাহায্য প্রয়োজন! রোগীর তীব্র শ্বাসকষ্ট হচ্ছে।',
    englishText: 'Emergency assistance required! Patient is experiencing severe respiratory distress.',
    urgency: 'Emergency',
    department: 'Emergency & ICU'
  },
  {
    id: 'ph_em_2',
    category: 'Emergency',
    bengaliText: 'রোগীর বুকে প্রচণ্ড ব্যথা ও চাপ অনুভূত হচ্ছে।',
    englishText: 'Patient is experiencing severe chest pain and pressure.',
    urgency: 'Emergency',
    department: 'Cardiology'
  },
  {
    id: 'ph_em_3',
    category: 'Emergency',
    bengaliText: 'রোগী হঠাৎ অজ্ঞান হয়ে গেছেন, দ্রুত ট্রলিতে উঠান।',
    englishText: 'The patient suddenly collapsed; please transfer immediately to a trolley.',
    urgency: 'Emergency',
    department: 'Trauma Triage'
  },
  {
    id: 'ph_em_4',
    category: 'Emergency',
    bengaliText: 'আহত স্থান থেকে অতিরিক্ত রক্তপাত হচ্ছে, রক্ত বন্ধ করতে হবে।',
    englishText: 'Severe bleeding from the injured site; pressure needed to stop bleeding.',
    urgency: 'Emergency',
    department: 'Emergency Trauma'
  },

  // 2. Doctor Questions
  {
    id: 'ph_doc_1',
    category: 'Doctor Questions',
    bengaliText: 'আপনার সমস্যাটি কতদিন ধরে হচ্ছে?',
    englishText: 'How long have you had this problem?',
    urgency: 'Normal',
    department: 'OPD Consultation'
  },
  {
    id: 'ph_doc_2',
    category: 'Doctor Questions',
    bengaliText: 'ঠিক কোন জায়গায় বেশি ব্যথা অনুভূত হচ্ছে হাত দিয়ে দেখান।',
    englishText: 'Please point with your hand exactly where you feel the pain.',
    urgency: 'Normal',
    department: 'Clinical OPD'
  },
  {
    id: 'ph_doc_3',
    category: 'Doctor Questions',
    bengaliText: 'আপনার কি কোনো ওষুধে এলার্জি আছে?',
    englishText: 'Do you have any known allergies to any medication?',
    urgency: 'Priority',
    department: 'Clinical OPD'
  },
  {
    id: 'ph_doc_4',
    category: 'Doctor Questions',
    bengaliText: 'আপনি কি বর্তমানে কোনো নিয়মিত ওষুধ গ্রহণ করছেন?',
    englishText: 'Are you currently taking any regular medications?',
    urgency: 'Normal',
    department: 'General Medicine'
  },
  {
    id: 'ph_doc_5',
    category: 'Doctor Questions',
    bengaliText: 'আপনার কি ডায়াবেটিস বা উচ্চ রক্তচাপের ইতিহাস আছে?',
    englishText: 'Do you have a personal or family history of diabetes or hypertension?',
    urgency: 'Normal',
    department: 'General Medicine'
  },

  // 3. Nurse Instructions
  {
    id: 'ph_nur_1',
    category: 'Nurse Instructions',
    bengaliText: 'অনুগ্রহ করে চেয়ারে সোজা হয়ে বসুন, আমি আপনার রক্তচাপ মেপে দেব।',
    englishText: 'Please sit upright in the chair; I will check your blood pressure.',
    urgency: 'Normal',
    department: 'Nursing Station'
  },
  {
    id: 'ph_nur_2',
    category: 'Nurse Instructions',
    bengaliText: 'একটি গভীর দীর্ঘ শ্বাস নিন এবং ধরে রাখুন।',
    englishText: 'Take a deep breath and hold it for a moment.',
    urgency: 'Normal',
    department: 'Nursing & Pulmonology'
  },
  {
    id: 'ph_nur_3',
    category: 'Nurse Instructions',
    bengaliText: 'একটু ধৈর্য ধরে অপেক্ষা করুন, ডাক্তারবাবু অল্পক্ষণের মধ্যে আপনাকে দেখবেন।',
    englishText: 'Please wait patiently; the physician will attend to you shortly.',
    urgency: 'Normal',
    department: 'Waiting Area'
  },

  // 4. Symptoms
  {
    id: 'ph_sym_1',
    category: 'Symptoms',
    bengaliText: 'আমার গত তিন দিন ধরে প্রচণ্ড জ্বর ও গা ব্যথা করছে।',
    englishText: 'I have had a high fever and severe body aches for the last three days.',
    urgency: 'Priority',
    department: 'General Medicine'
  },
  {
    id: 'ph_sym_2',
    category: 'Symptoms',
    bengaliText: 'পেটে তীব্র মোচড় দিয়ে ব্যথা হচ্ছে এবং বমি বমি ভাব লাগছে।',
    englishText: 'I have severe cramping abdominal pain and feeling nauseated.',
    urgency: 'Priority',
    department: 'Gastroenterology'
  },
  {
    id: 'ph_sym_3',
    category: 'Symptoms',
    bengaliText: 'মাথা ভীষণ ঘোরাচ্ছে এবং চোখে অন্ধকার দেখছি।',
    englishText: 'I feel very dizzy and my vision is blurring.',
    urgency: 'Priority',
    department: 'Neurology'
  },

  // 5. Pharmacy & Medication
  {
    id: 'ph_phm_1',
    category: 'Pharmacy',
    bengaliText: 'এই ট্যাবলেটটি প্রতিদিন সকালে ও রাতে ভরা পেটে খাবেন।',
    englishText: 'Take this tablet twice daily, morning and night, after meals.',
    urgency: 'Normal',
    department: 'Hospital Pharmacy'
  },
  {
    id: 'ph_phm_2',
    category: 'Pharmacy',
    bengaliText: 'অ্যান্টিবায়োটিক কোর্সটি কোনোভাবেই মাঝপথে বন্ধ করবেন না।',
    englishText: 'Do not discontinue the antibiotic course prematurely under any circumstance.',
    urgency: 'Priority',
    department: 'Hospital Pharmacy'
  },
  {
    id: 'ph_phm_3',
    category: 'Pharmacy',
    bengaliText: 'এই সিরাপটি খাওয়ার আগে ভালো করে ঝাঁকিয়ে নেবেন।',
    englishText: 'Shake the syrup bottle well before taking the prescribed dose.',
    urgency: 'Normal',
    department: 'Hospital Pharmacy'
  },

  // 6. Diagnostics & Tests
  {
    id: 'ph_dia_1',
    category: 'Diagnostics',
    bengaliText: 'রক্ত পরীক্ষার জন্য কাল সকালে খালি পেটে ল্যাবে আসতে হবে।',
    englishText: 'For the blood test, please report to the diagnostic lab tomorrow morning fasting.',
    urgency: 'Normal',
    department: 'Diagnostic Pathology'
  },
  {
    id: 'ph_dia_2',
    category: 'Diagnostics',
    bengaliText: 'এক্স-রে করার সময় সমস্ত ধাতব অলংকার ও ঘড়ি খুলে ফেলুন।',
    englishText: 'Please remove all metallic ornaments and watch before the X-ray scan.',
    urgency: 'Normal',
    department: 'Radiology'
  },
  {
    id: 'ph_dia_3',
    category: 'Diagnostics',
    bengaliText: 'আপনার টেস্টের রিপোর্ট আজ বিকেল ৪টার পর ডেলিভারি কাউন্টার থেকে পাবেন।',
    englishText: 'You can collect your diagnostic test reports after 4:00 PM at the delivery counter.',
    urgency: 'Normal',
    department: 'Report Delivery'
  }
];

interface MedicalPhrasebookViewProps {
  onNavigate: (view: AppView) => void;
}

export const MedicalPhrasebookView: React.FC<MedicalPhrasebookViewProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bhasha_drishti_fav_phrases');
      return saved ? JSON.parse(saved) : ['ph_em_1', 'ph_doc_1'];
    } catch {
      return ['ph_em_1', 'ph_doc_1'];
    }
  });

  const categories = [
    'All',
    'Emergency',
    'Doctor Questions',
    'Nurse Instructions',
    'Symptoms',
    'Pharmacy',
    'Diagnostics'
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('bhasha_drishti_fav_phrases', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleCopy = (phrase: MedicalPhrase) => {
    navigator.clipboard.writeText(phrase.bengaliText);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (phrase: MedicalPhrase) => {
    setIsSpeakingId(phrase.id);
    UniversalSpeechEngine.speak(
      phrase.bengaliText,
      'bn',
      () => setIsSpeakingId(phrase.id),
      () => setIsSpeakingId(null)
    );
  };

  const filteredPhrases = useMemo(() => {
    return HOSPITAL_PHRASES.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch = 
        p.bengaliText.toLowerCase().includes(q) ||
        p.englishText.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-crimson-800/30 bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-850 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-crimson-900/30 text-crimson-400">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-offwhite-100 font-bengali">
              {t('হাসপাতাল ক্লিনিক্যাল কমিউনিকেশন ফ্রেজবুক', 'Hospital Clinical Phrasebook')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-offwhite-300">
            {t(
              'ডাক্তার ও স্বাস্থ্যকর্মীদের জন্য প্রস্তুতকৃত জরুরি ট্রায়াজ, ওপিডি প্রশ্নমালা ও ওষুধের নিয়মাবলীর দ্বৈত ভাষার নির্দেশিকা।',
              'Bilingual hospital communication bank categorized by emergency triage, clinical inquiries, and nursing instructions.'
            )}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-crimson-300 px-3 py-1.5 rounded-xl bg-obsidian-850 border border-crimson-800/40">
          <span>{HOSPITAL_PHRASES.length} {t('ক্লিনিক্যাল বাক্য সংরক্ষিত', 'Phrases Indexed')}</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="glass-panel rounded-2xl p-4 border border-crimson-800/20 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-offwhite-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('বাক্য বা বিভাগ অনুযায়ী খুঁজুন (যেমন: শ্বাসকষ্ট, এলার্জি, ওষুধ)...', 'Search phrases or department (e.g. pain, allergy, dosage)...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-950 border border-crimson-800/40 text-sm text-offwhite-100 placeholder-offwhite-400 focus:outline-none focus:border-crimson-600 transition font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-offwhite-400 hover:text-offwhite-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-offwhite-400 shrink-0">
            {t(`মোট: ${filteredPhrases.length}টি বাক্য`, `Showing: ${filteredPhrases.length}`)}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-mono text-offwhite-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>{t('বিভাগ:', 'Section:')}</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-crimson-800 to-crimson-600 text-offwhite-100 font-bold shadow-md shadow-crimson-800/25'
                  : 'bg-obsidian-850 text-offwhite-300 hover:text-offwhite-100 hover:bg-obsidian-800 border border-crimson-800/20'
              }`}
            >
              {cat === 'All' ? t('সবগুলো', 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map((phrase) => {
          const isCopied = copiedId === phrase.id;
          const isSpeaking = isSpeakingId === phrase.id;
          const isFav = favorites.includes(phrase.id);

          return (
            <div
              key={phrase.id}
              className={`glass-panel rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between space-y-3 ${
                phrase.urgency === 'Emergency'
                  ? 'border-crimson-600/50 bg-gradient-to-br from-obsidian-900 to-crimson-950/40 shadow-lg shadow-crimson-950/50'
                  : 'border-crimson-800/25 hover:border-crimson-600/40'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold uppercase border ${
                      phrase.urgency === 'Emergency'
                        ? 'bg-crimson-900/60 text-crimson-200 border-crimson-600 animate-pulse'
                        : phrase.urgency === 'Priority'
                        ? 'bg-amber-950/40 text-amber-300 border-amber-700/40'
                        : 'bg-obsidian-850 text-offwhite-200 border-crimson-800/30'
                    }`}>
                      {phrase.urgency}
                    </span>
                    <span className="text-[11px] font-mono text-offwhite-400">
                      {phrase.category}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFavorite(phrase.id)}
                    className="p-1.5 rounded-lg text-offwhite-400 hover:text-amber-400 transition"
                    title={isFav ? 'Remove Favorite' : 'Save as Favorite'}
                  >
                    <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="text-base sm:text-lg font-bold text-offwhite-100 font-bengali leading-snug">
                    "{phrase.bengaliText}"
                  </p>
                  <p className="text-xs text-offwhite-400 italic font-sans">
                    "{phrase.englishText}"
                  </p>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-crimson-800/30">
                <span className="text-[11px] font-mono text-offwhite-400 truncate max-w-[140px]">
                  {phrase.department}
                </span>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleSpeak(phrase)}
                    className={`p-2 rounded-xl text-xs font-mono transition flex items-center space-x-1 ${
                      isSpeaking 
                        ? 'bg-crimson-800 text-offwhite-100 animate-pulse' 
                        : 'bg-obsidian-850 hover:bg-obsidian-800 text-offwhite-300 hover:text-offwhite-100 border border-crimson-800/30'
                    }`}
                    title={t('উচ্চারণ শুনুন', 'Listen Audio')}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{isSpeaking ? t('শুনছেন', 'Playing') : t('শুনুন', 'Audio')}</span>
                  </button>

                  <button
                    onClick={() => handleCopy(phrase)}
                    className="p-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-offwhite-300 hover:text-offwhite-100 border border-crimson-800/30 transition flex items-center space-x-1 text-xs font-mono"
                    title={t('কপি করুন', 'Copy')}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[11px]">{isCopied ? t('কপি হয়েছে', 'Copied') : t('কপি', 'Copy')}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('desk')}
                    className="p-2 rounded-xl btn-crimson text-offwhite-100 transition flex items-center space-x-1 text-xs font-bold font-mono"
                    title={t('ডাক্তার ডেস্কে পাঠান', 'Send to 2-Way Desk')}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{t('ডেস্কে পাঠান', 'To Desk')}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
