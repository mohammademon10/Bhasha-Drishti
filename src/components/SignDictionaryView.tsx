import React, { useState, useMemo } from 'react';
import { 
  Search, BookOpen, Volume2, Filter, Sparkles, 
  Hand, Stethoscope, ChevronRight, X, ExternalLink, Play
} from 'lucide-react';
import { BDSL_W60_CLASSES, BdSLClass } from '../data/bdslLexicon';
import { UniversalSpeechEngine } from '../utils/audioPlayer';
import { useLanguage } from '../context/LanguageContext';
import { AppView } from './NavigationSidebar';

interface SignDictionaryViewProps {
  onNavigate: (view: AppView) => void;
}

export const SignDictionaryView: React.FC<SignDictionaryViewProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSign, setSelectedSign] = useState<BdSLClass | null>(null);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);

  const categories = ['All', 'Medical', 'Emergency', 'General', 'Daily', 'Action'];

  const filteredSigns = useMemo(() => {
    return BDSL_W60_CLASSES.filter((sign) => {
      const matchesCategory = selectedCategory === 'All' || sign.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch = 
        sign.labelBn.toLowerCase().includes(q) ||
        sign.glossEn.toLowerCase().includes(q) ||
        sign.phonetic.toLowerCase().includes(q) ||
        (sign.hospitalDepartment && sign.hospitalDepartment.toLowerCase().includes(q)) ||
        sign.descriptionBn.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleSpeak = (sign: BdSLClass) => {
    setIsSpeakingId(sign.id);
    UniversalSpeechEngine.speak(
      sign.labelBn,
      'bn',
      () => setIsSpeakingId(sign.id),
      () => setIsSpeakingId(null)
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-crimson-800/30 bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-850 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-crimson-900/30 text-crimson-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-offwhite-100 font-bengali">
              {t('বাংলা সাইন ল্যাঙ্গুয়েজ (BdSL) মেডিকেল শব্দকোষ', 'BdSL Medical Sign Dictionary')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-offwhite-300">
            {t(
              'স্বাস্থ্যসেবায় ব্যবহৃত ৬০টি প্রমাণিত ক্লিনিক্যাল সাইন ভাষার প্রমিত হ্যান্ডশেইপ ও উচ্চারণ নির্দেশিকা।',
              'Standardized 60-class hospital BdSL lexicon with handshape guides and audio pronunciation.'
            )}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-crimson-300 px-3 py-1.5 rounded-xl bg-obsidian-850 border border-crimson-800/40">
          <span>{BDSL_W60_CLASSES.length} {t('ক্লিনিক্যাল সাইন অন্তর্ভুক্ত', 'Clinical Signs')}</span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-crimson-800/20 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-offwhite-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('বাংলা শব্দ, ইংরেজি অর্থ বা বিভাগ দিয়ে খুঁজুন...', 'Search by Bengali word, English, or department...')}
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

          {/* Result Count */}
          <div className="text-xs font-mono text-offwhite-400 shrink-0">
            {t(`মোট প্রাপ্ত: ${filteredSigns.length}টি`, `Showing: ${filteredSigns.length}`)}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-mono text-offwhite-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>{t('ক্যাটাগরি:', 'Category:')}</span>
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

      {/* Grid of Sign Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSigns.map((sign) => {
          const isSpeaking = isSpeakingId === sign.id;
          return (
            <div
              key={sign.id}
              onClick={() => setSelectedSign(sign)}
              className="glass-panel glass-panel-hover rounded-2xl p-4 border border-crimson-800/25 hover:border-crimson-600 space-y-3 cursor-pointer group flex flex-col justify-between transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border ${
                    sign.category === 'Emergency'
                      ? 'bg-crimson-900/40 text-crimson-300 border-crimson-700/50'
                      : sign.category === 'Medical'
                      ? 'bg-crimson-950/60 text-offwhite-200 border-crimson-800/40'
                      : 'bg-obsidian-850 text-offwhite-300 border-crimson-800/20'
                  }`}>
                    {sign.category}
                  </span>
                  <span className="text-[10px] font-mono text-offwhite-400">
                    {sign.handshapeType}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-offwhite-100 font-bengali group-hover:text-crimson-300 transition">
                    {sign.labelBn}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-offwhite-400 font-mono mt-0.5">
                    <span className="text-crimson-400">{sign.glossEn}</span>
                    <span>•</span>
                    <span className="text-offwhite-400 italic">/{sign.phonetic}/</span>
                  </div>
                </div>

                <p className="text-xs text-offwhite-300 leading-relaxed font-sans line-clamp-2">
                  {sign.descriptionBn}
                </p>

                {sign.hospitalDepartment && (
                  <div className="text-[11px] font-mono text-offwhite-400 flex items-center gap-1 pt-1 border-t border-crimson-800/30">
                    <Stethoscope className="w-3 h-3 text-crimson-400 shrink-0" />
                    <span className="truncate">{sign.hospitalDepartment}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(sign);
                  }}
                  className={`p-2 rounded-xl text-xs font-mono transition flex items-center space-x-1.5 ${
                    isSpeaking 
                      ? 'bg-crimson-800 text-offwhite-100 animate-pulse' 
                      : 'bg-obsidian-850 hover:bg-obsidian-800 text-offwhite-300 hover:text-offwhite-100 border border-crimson-800/30'
                  }`}
                  title={t('উচ্চারণ শুনুন', 'Listen Audio')}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{isSpeaking ? t('শুনছেন...', 'Playing') : t('উচ্চারণ', 'Listen')}</span>
                </button>

                <span className="text-xs text-crimson-400 font-mono flex items-center gap-1 group-hover:translate-x-1 transition">
                  <span>{t('বিস্তারিত', 'View')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSigns.length === 0 && (
        <div className="text-center py-12 glass-panel rounded-3xl border border-crimson-800/20 space-y-2">
          <BookOpen className="w-10 h-10 text-offwhite-400 mx-auto" />
          <h3 className="text-base font-bold text-offwhite-100 font-bengali">
            {t('কোনো সাইন পাওয়া যায়নি', 'No Matching BdSL Signs Found')}
          </h3>
          <p className="text-xs text-offwhite-400">
            {t('অন্য শব্দ বা ক্যাটাগরি দিয়ে সার্চ করে দেখুন।', 'Try searching with a different term or clear filters.')}
          </p>
        </div>
      )}

      {/* Sign Detail Modal */}
      {selectedSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-crimson-800/40 space-y-5 bg-obsidian-900 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedSign(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-obsidian-850 text-offwhite-400 hover:text-offwhite-100 hover:bg-obsidian-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-crimson-900/30 text-crimson-300 border border-crimson-700/40 font-bold uppercase">
                {selectedSign.category} • {selectedSign.handshapeType}
              </span>
              <h2 className="text-2xl font-bold text-offwhite-100 font-bengali pt-1">
                {selectedSign.labelBn}
              </h2>
              <div className="text-sm font-mono text-crimson-400">
                {selectedSign.glossEn} • /{selectedSign.phonetic}/
              </div>
            </div>

            {/* Handshape Visualization Guide Box */}
            <div className="p-4 rounded-2xl bg-obsidian-950 border border-crimson-800/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-offwhite-400">
                <span className="flex items-center gap-1.5 text-crimson-300 font-bold">
                  <Hand className="w-4 h-4" />
                  <span>{t('ইশারা প্রদর্শনের নিয়ম (Gesture Execution Guide)', 'Gesture Guide')}</span>
                </span>
                <span>{selectedSign.handshapeType}</span>
              </div>
              <p className="text-sm text-offwhite-200 font-sans leading-relaxed">
                {selectedSign.descriptionBn}
              </p>
              {selectedSign.hospitalDepartment && (
                <div className="text-xs text-offwhite-400 pt-1 font-mono">
                  {t('সংশ্লিষ্ট হাসপাতাল বিভাগ:', 'Hospital Dept:')} <strong className="text-offwhite-100">{selectedSign.hospitalDepartment}</strong>
                </div>
              )}
            </div>

            {/* Audio & Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleSpeak(selectedSign)}
                className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl btn-obsidian-secondary text-offwhite-100 text-xs font-bold font-mono transition"
              >
                <Volume2 className="w-4 h-4 text-crimson-400" />
                <span>{t('বাংলা উচ্চারণ শুনুন', 'Listen Bengali Audio')}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedSign(null);
                  onNavigate('translator');
                }}
                className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl btn-crimson text-offwhite-100 text-xs font-bold transition shadow-md"
              >
                <Play className="w-4 h-4" />
                <span>{t('লাইভ টেস্ট করুন', 'Test in Translator')}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
