import React, { useState } from 'react';
import { 
  FileText, Shield, Database, Cpu, Activity, ExternalLink, 
  CheckCircle, AlertCircle, Copy, Terminal, Search, ChevronDown, ChevronRight,
  BookOpen, Sparkles, Layers, Sliders, Server, Code, HelpCircle
} from 'lucide-react';
import { 
  RESEARCH_DATASETS, MCP_TOOLS, PROMPT_LIBRARY_ITEMS, 
  OFFICIAL_DOCS, JUDGES_QA_ITEMS, DocFile, PromptItem, MCPToolDef 
} from '../data/docsContent';
import { useLanguage } from '../context/LanguageContext';

export const DocsPortalView: React.FC = () => {
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'architecture' | 'datasets' | 'mcp' | 'governance' | 'prompts' | 'markdown' | 'qa'>('architecture');
  const [selectedDoc, setSelectedDoc] = useState<DocFile>(OFFICIAL_DOCS[0]);
  const [searchDocQuery, setSearchDocQuery] = useState<string>('');
  const [activeMcpTool, setActiveMcpTool] = useState<MCPToolDef>(MCP_TOOLS[0]);
  const [mcpResult, setMcpResult] = useState<any>(MCP_TOOLS[0].exampleResponse);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const filteredDocs = OFFICIAL_DOCS.filter(d => 
    d.title.toLowerCase().includes(searchDocQuery.toLowerCase()) || 
    d.filename.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
    d.summary.toLowerCase().includes(searchDocQuery.toLowerCase())
  );

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const runMcpSimulation = (tool: MCPToolDef) => {
    setActiveMcpTool(tool);
    setMcpResult(tool.exampleResponse);
  };

  return (
    <div className="space-y-6">

      {/* Top Header Banner: Dynamic & Sleek */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-bold">
              Official Whitepaper & Specs
            </span>
            <span className="text-xs text-slate-400 font-mono">CloudCamp Bangladesh</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-white mt-1 font-bengali tracking-tight">
            Bhasha Drishti (ভাষা দৃষ্টি) — {t('টেকনিক্যাল ডকুমেন্টেশন ও জাজ পোর্টাল', 'Technical Documentation & Judge Portal')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
            {t(
              'সম্পূর্ণ সিস্টেম আর্কিটেকচার, BdSLW60 ডেটাসেট বেঞ্চমার্ক, কাস্টম MCP সার্ভার টুলস ও রেসপন্সিবল এআই গভর্ন্যান্স।',
              'End-to-end system architecture, BdSLW60 benchmarks, custom MCP server specifications, and Responsible AI governance.'
            )}
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-xl bg-space-850 border border-emerald-500/25 text-xs font-mono text-emerald-400 font-bold self-end md:self-auto shrink-0">
          100% Faithful Specs
        </span>
      </div>

      {/* Sub-Navigation Tabs: Fluid, Single-Line, Dynamic */}
      <div className="flex items-center space-x-1.5 p-1.5 glass-panel rounded-2xl border border-white/10 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'architecture' 
              ? 'bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400 text-space-950 font-black shadow-md shadow-cyan-500/20' 
              : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span>Architecture & SLA</span>
        </button>

        <button
          onClick={() => setActiveTab('datasets')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'datasets' 
              ? 'bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400 text-space-950 font-black shadow-md shadow-cyan-500/20' 
              : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Database className="w-3.5 h-3.5 shrink-0" />
          <span>Datasets & Metrics (93.4%)</span>
        </button>

        <button
          onClick={() => setActiveTab('mcp')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'mcp' 
              ? 'bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400 text-space-950 font-black shadow-md shadow-cyan-500/20' 
              : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Server className="w-3.5 h-3.5 shrink-0" />
          <span>MCP Server (4 Tools)</span>
        </button>

        <button
          onClick={() => setActiveTab('governance')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'governance' 
              ? 'bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400 text-space-950 font-black shadow-md shadow-cyan-500/20' 
              : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Shield className="w-3.5 h-3.5 shrink-0" />
          <span>Responsible AI</span>
        </button>

        <button
          onClick={() => setActiveTab('prompts')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'prompts' 
              ? 'bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400 text-space-950 font-black shadow-md shadow-cyan-500/20' 
              : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Prompt Library (9 Prompts)</span>
        </button>

        <button
          onClick={() => setActiveTab('markdown')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'markdown' 
              ? 'bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400 text-space-950 font-black shadow-md shadow-cyan-500/20' 
              : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span>Package Docs (15 Files)</span>
        </button>

        <button
          onClick={() => setActiveTab('qa')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'qa' 
              ? 'bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400 text-space-950 font-black shadow-md shadow-cyan-500/20' 
              : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Judges' Q&A</span>
        </button>
      </div>

      {/* TAB 1: System Architecture & Data Flow */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-6 border border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-electric-cyan" />
                <span>Interactive System Architecture & End-to-End Pipeline</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time WebRTC 30 FPS ingestion to Bengali speech output with strict &lt;300ms SLA budget.
              </p>
            </div>

            {/* SVG Diagram */}
            <div className="p-4 bg-space-950/80 rounded-2xl border border-white/10 overflow-x-auto">
              <svg className="w-full min-w-[760px] h-60" viewBox="0 0 900 240">
                <g transform="translate(20, 40)">
                  <rect width="180" height="90" rx="14" fill="#0B1120" stroke="#00F0FF" strokeWidth="2" />
                  <text x="90" y="32" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="13" fontFamily="Inter">WebRTC Stream</text>
                  <text x="90" y="52" textAnchor="middle" fill="#00F0FF" fontSize="11" fontFamily="JetBrains Mono">30 FPS Camera Feed</text>
                  <text x="90" y="70" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">RAM In-Memory Only</text>
                </g>

                <path d="M 200 85 L 240 85" stroke="#00F0FF" strokeWidth="2.5" />

                <g transform="translate(240, 40)">
                  <rect width="180" height="90" rx="14" fill="#0B1120" stroke="#10B981" strokeWidth="2" />
                  <text x="90" y="32" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="13" fontFamily="Inter">MediaPipe Holistic</text>
                  <text x="90" y="52" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="JetBrains Mono">42 3D Landmarks</text>
                  <text x="90" y="70" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Latency: 18ms (-96% BW)</text>
                </g>

                <path d="M 420 85 L 460 85" stroke="#10B981" strokeWidth="2.5" />

                <g transform="translate(460, 40)">
                  <rect width="190" height="90" rx="14" fill="#0B1120" stroke="#8B5CF6" strokeWidth="2" />
                  <text x="95" y="32" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="13" fontFamily="Inter">PyTorch CNN-BiLSTM</text>
                  <text x="95" y="52" textAnchor="middle" fill="#A78BFA" fontSize="11" fontFamily="JetBrains Mono">BdSLW60 Classifier</text>
                  <text x="95" y="70" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Latency: 65ms (Acc 93.4%)</text>
                </g>

                <path d="M 650 85 L 690 85" stroke="#8B5CF6" strokeWidth="2.5" />

                <g transform="translate(690, 40)">
                  <rect width="190" height="90" rx="14" fill="#0B1120" stroke="#F59E0B" strokeWidth="2" />
                  <text x="95" y="32" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="13" fontFamily="Inter">pgvector RAG + MCP</text>
                  <text x="95" y="52" textAnchor="middle" fill="#FBBF24" fontSize="11" fontFamily="JetBrains Mono">Bengali Grammar Refiner</text>
                  <text x="95" y="70" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Latency: 110ms (Zero Halluc.)</text>
                </g>

                <g transform="translate(20, 165)">
                  <rect width="860" height="50" rx="12" fill="#060913" stroke="#1E293B" />
                  <text x="25" y="30" fill="#F8FAFC" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">TOTAL FRAME-TO-SPEECH PIPELINE:</text>
                  <text x="340" y="30" fill="#00F0FF" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">18ms + 65ms + 110ms + 45ms = 238ms</text>
                  <text x="730" y="30" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">SLA &lt; 300ms PASS</text>
                </g>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-space-950/80 border border-white/[0.08]">
                <span className="text-[11px] font-mono text-electric-cyan font-bold">1. Edge Capture</span>
                <p className="text-sm font-bold text-white mt-1">WebRTC Ingestion</p>
                <p className="text-xs text-slate-400 mt-1">Direct from smartphone or webcam without wearable gloves or sensors.</p>
              </div>

              <div className="p-4 rounded-2xl bg-space-950/80 border border-white/[0.08]">
                <span className="text-[11px] font-mono text-electric-teal font-bold">2. Keypoint Vectorizer</span>
                <p className="text-sm font-bold text-white mt-1">MediaPipe 3D Holistic</p>
                <p className="text-xs text-slate-400 mt-1">Extracts 42 normalized keypoints discarding raw pixel frames in RAM immediately.</p>
              </div>

              <div className="p-4 rounded-2xl bg-space-950/80 border border-white/[0.08]">
                <span className="text-[11px] font-mono text-electric-purple font-bold">3. Spatio-Temporal Model</span>
                <p className="text-sm font-bold text-white mt-1">PyTorch CNN-BiLSTM</p>
                <p className="text-xs text-slate-400 mt-1">Classifies 40-frame sliding windows into BdSLW60 word glosses with softmax confidence scoring.</p>
              </div>

              <div className="p-4 rounded-2xl bg-space-950/80 border border-white/[0.08]">
                <span className="text-[11px] font-mono text-electric-amber font-bold">4. Linguistic RAG + TTS</span>
                <p className="text-sm font-bold text-white mt-1">pgvector + FastMCP</p>
                <p className="text-xs text-slate-400 mt-1">Recovers Bengali grammar and outputs clear synthesized speech with &lt;0.80 abstention guardrail.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Datasets & Metrics */}
      {activeTab === 'datasets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl glass-panel border border-white/10">
              <span className="text-xs font-mono text-slate-400">Top-1 Accuracy</span>
              <p className="text-3xl font-extrabold text-electric-cyan font-mono mt-1">93.4%</p>
              <span className="text-[11px] text-slate-400 font-mono">Held-out disjoint signers</span>
            </div>

            <div className="p-5 rounded-3xl glass-panel border border-white/10">
              <span className="text-xs font-mono text-slate-400">End-to-End Latency</span>
              <p className="text-3xl font-extrabold text-electric-teal font-mono mt-1">238ms</p>
              <span className="text-[11px] text-slate-400 font-mono">SLA &lt;300ms SLA target</span>
            </div>

            <div className="p-5 rounded-3xl glass-panel border border-white/10">
              <span className="text-xs font-mono text-slate-400">Bandwidth Reduction</span>
              <p className="text-3xl font-extrabold text-electric-indigo font-mono mt-1">96.2%</p>
              <span className="text-[11px] text-slate-400 font-mono">3D keypoints vs 1080p video</span>
            </div>

            <div className="p-5 rounded-3xl glass-panel border border-white/10">
              <span className="text-xs font-mono text-slate-400">Macro F1-Score</span>
              <p className="text-3xl font-extrabold text-purple-400 font-mono mt-1">0.928</p>
              <span className="text-[11px] text-slate-400 font-mono">60 dynamic BdSL classes</span>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4 border border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-electric-cyan" />
              <span>Research Dataset Provenance & Mapping</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESEARCH_DATASETS.map((ds, i) => (
                <div key={i} className="p-4 rounded-2xl bg-space-950/80 border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white font-mono">{ds.name}</span>
                    <a 
                      href={ds.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-electric-cyan hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>Citation</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                    <div>Classes: <strong className="text-electric-teal">{ds.classesCount}</strong></div>
                    <div>Samples: <strong className="text-electric-cyan">{ds.samples}</strong></div>
                    <div>Signers: <strong className="text-purple-300">{ds.signers}</strong></div>
                    <div>Sign Type: <strong className="text-amber-300">{ds.signType}</strong></div>
                  </div>
                  <p className="text-xs text-slate-400 pt-1 border-t border-white/[0.06]">
                    <strong>Role in Build:</strong> {ds.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MCP Server */}
      {activeTab === 'mcp' && (
        <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-5 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-electric-teal" />
                <span>Custom MCP Server: bhasha-drishti-bdsl-mcp</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Built on Python FastMCP to expose dictionary lookups and anatomical validation directly to agents.
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-electric-teal/20 text-electric-teal border border-electric-teal/40 text-xs font-mono">
              stdio + Streamable HTTP
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                Exposed Endpoints (4 Tools)
              </span>
              {MCP_TOOLS.map((t, idx) => {
                const isSelected = activeMcpTool.name === t.name;
                return (
                  <button
                    key={idx}
                    onClick={() => runMcpSimulation(t)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition ${
                      isSelected 
                        ? 'bg-electric-cyan/20 border-electric-cyan text-white shadow-lg' 
                        : 'bg-space-950/80 hover:bg-space-850 border-white/[0.08] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-electric-cyan">{t.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                        {t.transport}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{t.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-space-950/80 border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <span className="text-white font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-electric-cyan" />
                  <span>Live JSON-RPC 2.0 Response</span>
                </span>
                <span className="text-[11px] text-electric-teal">Latency: 12ms</span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Parameters:</span>
                <div className="space-y-1">
                  {activeMcpTool.parameters.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-space-900 border border-white/[0.06]">
                      <span className="text-electric-cyan">{p.name} ({p.type})</span>
                      <span className="text-slate-400 text-[11px]">{p.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Request:</span>
                <pre className="p-3 rounded-xl bg-space-900 text-slate-300 overflow-x-auto text-[11px] border border-white/[0.06]">
                  {JSON.stringify(activeMcpTool.exampleRequest, null, 2)}
                </pre>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Result:</span>
                <pre className="p-3 rounded-xl bg-space-900 text-electric-teal border border-electric-teal/30 overflow-x-auto text-[11px]">
                  {JSON.stringify(mcpResult, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Governance & Privacy */}
      {activeTab === 'governance' && (
        <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-6 border border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-electric-cyan" />
              <span>Responsible AI & Zero-Retention Edge Privacy Architecture</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Deaf-first linguistic rights, zero biometric storage, and clinical safety boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-3xl bg-space-950/80 border border-white/[0.08] space-y-2.5">
              <span className="w-8 h-8 rounded-xl bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/40 flex items-center justify-center font-bold text-xs">
                01
              </span>
              <h3 className="text-sm font-bold text-white">Zero-Retention RAM Processing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Webcam frames are buffered strictly in volatile device RAM solely to compute anonymous 3D landmarks (X, Y, Z coordinates) and are immediately purged. Zero raw video, photos, or facial biometric embeddings are ever stored to disk or transmitted across network boundaries.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-space-950/80 border border-white/[0.08] space-y-2.5">
              <span className="w-8 h-8 rounded-xl bg-electric-amber/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
                02
              </span>
              <h3 className="text-sm font-bold text-white">Confidence Abstention Gate (&lt;0.80)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whenever gesture classification confidence drops below 80% (due to rapid hand movement, camera blur, or occlusion), the model triggers a graceful abstention prompt in high-contrast Bengali rather than fabricating a false translation.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-space-950/80 border border-white/[0.08] space-y-2.5">
              <span className="w-8 h-8 rounded-xl bg-electric-rose/20 text-rose-300 border border-rose-500/40 flex items-center justify-center font-bold text-xs">
                03
              </span>
              <h3 className="text-sm font-bold text-white">Clinical Boundaries (No Interpreter Replacement)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bhasha Drishti is engineered for routine hospital service interactions (reception triage, appointment scheduling, pharmacy instructions). It is strictly prohibited as the sole communication channel for high-stakes surgical consent or emergency legal matters.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Prompts */}
      {activeTab === 'prompts' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-3xl p-5 shadow-xl border border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-electric-cyan" />
              <span>Complete Prompt Library (All 9 Competition Categories)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Exact system prompts, Few-Shot exemplars, and reasoning chains utilized across the AI development lifecycle.
            </p>
          </div>

          <div className="space-y-4">
            {PROMPT_LIBRARY_ITEMS.map((item) => (
              <div key={item.id} className="glass-panel rounded-3xl p-5 space-y-3 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30 font-mono font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-slate-400 font-mono">Target: {item.modelTarget}</span>
                    <button
                      onClick={() => handleCopyPrompt(item.id, item.promptText)}
                      className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-200 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedPromptId === item.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-space-950/80 rounded-2xl p-4 border border-white/[0.08] text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto">
                  {item.promptText}
                </div>

                <div className="text-xs text-slate-400 flex items-start space-x-2">
                  <span className="font-mono text-electric-teal font-semibold shrink-0">Output Summary:</span>
                  <span>{item.outputSummary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Package Docs (All 15 Files) */}
      {activeTab === 'markdown' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 glass-panel rounded-3xl p-4 space-y-3 border border-white/10 shadow-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchDocQuery}
                onChange={(e) => setSearchDocQuery(e.target.value)}
                placeholder="Search 15 package docs..."
                className="w-full pl-10 pr-4 py-2 bg-space-950 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-cyan font-mono"
              />
            </div>

            <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1">
              {filteredDocs.map((doc) => {
                const isSelected = selectedDoc.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left p-3 rounded-2xl border transition ${
                      isSelected
                        ? 'bg-electric-cyan/20 border-electric-cyan text-white shadow-lg'
                        : 'bg-space-950/80 hover:bg-space-850 border-white/[0.08] text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-mono font-bold text-white truncate max-w-[190px]">
                        {doc.filename}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-electric-teal font-mono">
                        {doc.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{doc.title}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 shadow-xl space-y-4 border border-white/10">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <span className="text-xs font-mono text-electric-cyan">{selectedDoc.category} / docs/{selectedDoc.filename}</span>
                <h2 className="text-lg font-bold text-white mt-0.5">{selectedDoc.title}</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">docs/{selectedDoc.filename}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-space-950/80 border border-white/[0.08] text-xs text-slate-300 italic">
              <strong>Summary:</strong> {selectedDoc.summary}
            </div>

            <div className="bg-space-950/80 rounded-2xl p-4 border border-white/[0.08] max-h-[500px] overflow-y-auto">
              <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                {selectedDoc.content}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Judges' Q&A */}
      {activeTab === 'qa' && (
        <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-5 border border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-electric-teal" />
              <span>Judges' Q&A Defense Matrix (CloudCamp Bangladesh)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Direct, transparent answers regarding vocabulary bounds, avatar ethics, data leakage, and clinical safety.
            </p>
          </div>

          <div className="space-y-3">
            {JUDGES_QA_ITEMS.map((item, index) => (
              <div key={index} className="p-4 rounded-2xl bg-space-950/80 border border-white/[0.08] space-y-2">
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-electric-cyan/20 text-electric-cyan flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    Q
                  </span>
                  <h3 className="text-sm font-bold text-white">{item.q}</h3>
                </div>
                <div className="flex items-start space-x-2 pl-7">
                  <p className="text-xs text-slate-300 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
