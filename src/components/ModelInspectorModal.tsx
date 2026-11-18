import React from 'react';
import { X, Cpu, ShieldCheck, CheckCircle2, Layers, Activity } from 'lucide-react';

interface ModelInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelInspectorModal: React.FC<ModelInspectorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-xs text-slate-300 font-mono">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-sans">Bhasha Drishti Model Card & In-Memory Pipeline</h2>
              <span className="text-[11px] text-teal-400">Release: v0.4.2-bdslw60 | Quantized ONNX & PyTorch</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tensor Geometry & Hyperparameters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">TENSOR INPUT SHAPE</span>
            <span className="text-sm font-bold text-emerald-400">[40, 42, 3]</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">40 Frames × 42 Points × XYZ</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">HELD-OUT ACCURACY</span>
            <span className="text-sm font-bold text-teal-300">93.4% Top-1</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Macro-F1: 0.928</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">TOTAL SLA BUDGET</span>
            <span className="text-sm font-bold text-cyan-400">238ms</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Target: &lt; 300ms SLA</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">NORMALIZATION</span>
            <span className="text-xs font-bold text-white">Wrist Root Anchor</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Scale & Invariance</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">CONFIDENCE GATE</span>
            <span className="text-xs font-bold text-amber-400">&gt; 0.80 Softmax</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Abstain on Ambiguity</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">PRIVACY ASSURANCE</span>
            <span className="text-xs font-bold text-emerald-400">RAM Ephemeral</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Zero Biometric Storage</span>
          </div>
        </div>

        {/* Live Architectural Pipeline Verification */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-slate-400 font-semibold block text-[11px]">
            Inference Pipeline Stages:
          </span>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-850">
              <span className="text-emerald-400 font-bold">Stage 1: MediaPipe 3D Landmark Extractor</span>
              <span className="text-slate-400">18ms (X, Y, Z, Visibility)</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-850">
              <span className="text-cyan-400 font-bold">Stage 2: PyTorch CNN-BiLSTM Spatio-Temporal Classifier</span>
              <span className="text-slate-400">65ms (BdSLW60 60 Classes)</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-850">
              <span className="text-purple-400 font-bold">Stage 3: pgvector Hybrid RAG + bhasha-drishti-bdsl-mcp</span>
              <span className="text-slate-400">110ms (Grammar Reconstruction)</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-850">
              <span className="text-teal-400 font-bold">Stage 4: Natural Bengali TTS Audio Synthesis</span>
              <span className="text-slate-400">45ms (Web Speech bn-BD)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
          <span className="text-slate-500">Team Tensor_Titan • SmartHospital Challenge</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs transition"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
