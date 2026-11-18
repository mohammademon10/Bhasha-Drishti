import React from 'react';
import { X, Cpu, ShieldCheck, CheckCircle2, Layers, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ModelInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelInspectorModal: React.FC<ModelInspectorModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-royal-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel border border-aurora-rose/25 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-xs text-slate-300 font-mono">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-royal-700 to-aurora-rose text-white shadow-md shadow-aurora-rose/25">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-sans">
                {t('ভাষা দৃষ্টি মডেল কার্ড ও পাইপলাইন স্পেক্স', 'Bhasha Drishti Model Card & In-Memory Pipeline')}
              </h2>
              <span className="text-[11px] text-rose-300">Release: v0.4.2-bdslw60 | Quantized ONNX & PyTorch</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tensor Geometry & Hyperparameters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-royal-900/80 border border-white/[0.08]">
            <span className="text-slate-400 block text-[10px]">TENSOR SHAPE</span>
            <span className="text-sm font-bold text-aurora-rose">[40, 42, 3]</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">40 Frames × 42 Pts</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-royal-900/80 border border-white/[0.08]">
            <span className="text-slate-400 block text-[10px]">TOP-1 ACCURACY</span>
            <span className="text-sm font-bold text-rose-300">93.4%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Macro-F1: 0.928</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-royal-900/80 border border-white/[0.08]">
            <span className="text-slate-400 block text-[10px]">LATENCY SLA</span>
            <span className="text-sm font-bold text-purple-300">238ms</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">&lt; 300ms SLA Pass</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-royal-900/80 border border-white/[0.08]">
            <span className="text-slate-400 block text-[10px]">NORMALIZATION</span>
            <span className="text-xs font-bold text-white">Wrist Root Anchor</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Scale Invariant</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-royal-900/80 border border-white/[0.08]">
            <span className="text-slate-400 block text-[10px]">CONFIDENCE GATE</span>
            <span className="text-xs font-bold text-amber-300">&gt; 0.80 Softmax</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Abstain on Noise</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-royal-900/80 border border-white/[0.08]">
            <span className="text-slate-400 block text-[10px]">PRIVACY ASSURANCE</span>
            <span className="text-xs font-bold text-emerald-400">Zero-Retention</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">RAM Ephemeral</span>
          </div>
        </div>

        {/* Live Architectural Pipeline Verification */}
        <div className="p-4 rounded-2xl bg-royal-900/80 border border-white/[0.08] space-y-2">
          <span className="text-slate-300 font-semibold block text-[11px]">
            Inference Pipeline Stages (238ms Total):
          </span>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded-xl bg-royal-850 border border-white/[0.06]">
              <span className="text-aurora-rose font-bold">Stage 1: MediaPipe 3D Landmark Extractor</span>
              <span className="text-slate-300">18ms (X, Y, Z, Visibility)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-royal-850 border border-white/[0.06]">
              <span className="text-purple-300 font-bold">Stage 2: PyTorch CNN-BiLSTM Classifier</span>
              <span className="text-slate-300">65ms (BdSLW60 60 Classes)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-royal-850 border border-white/[0.06]">
              <span className="text-rose-300 font-bold">Stage 3: pgvector Hybrid RAG + bhasha-drishti-bdsl-mcp</span>
              <span className="text-slate-300">110ms (Grammar Refinement)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-royal-850 border border-white/[0.06]">
              <span className="text-pink-300 font-bold">Stage 4: Bengali Universal Speech Synthesizer</span>
              <span className="text-slate-300">45ms (Dual-Engine Audio)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[11px]">
          <span className="text-slate-400">Team Tensor_Titan • Lead: MD. Emon Hossain</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-sans text-xs transition"
          >
            {t('বন্ধ করুন', 'Close')}
          </button>
        </div>

      </div>
    </div>
  );
};
