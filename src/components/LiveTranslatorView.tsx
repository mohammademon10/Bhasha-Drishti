import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, CameraOff, Volume2, Copy, Check, RotateCcw, AlertTriangle, 
  Sparkles, Layers, Clock, Zap, Shield, Play, Activity, Info
} from 'lucide-react';
import { SAMPLE_GESTURE_PRESETS, GesturePreset, BDSL_W60_CLASSES } from '../data/bdslLexicon';

export const LiveTranslatorView: React.FC = () => {
  // Camera & Simulator State
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<GesturePreset>(SAMPLE_GESTURE_PRESETS[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(30);
  const [pipelineProgress, setPipelineProgress] = useState<{
    stage1: boolean;
    stage2: boolean;
    stage3: boolean;
    stage4: boolean;
  }>({ stage1: true, stage2: true, stage3: true, stage4: true });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const gestureStepRef = useRef<number>(0);

  // Initialize Speech Synthesis Voices
  const [bengaliVoice, setBengaliVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        const bnVoice = voices.find(v => v.lang.includes('bn') || v.lang.toLowerCase().includes('bengali') || v.name.includes('Bangla') || v.name.includes('Bangladesh'));
        if (bnVoice) {
          setBengaliVoice(bnVoice);
        } else if (voices.length > 0) {
          setBengaliVoice(voices[0]);
        }
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // WebRTC Webcam Stream handling
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (useWebcam) {
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      })
      .then(s => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play();
        }
        setWebcamError(null);
      })
      .catch(err => {
        console.warn('Webcam permission error or no camera device found:', err);
        setWebcamError('ক্যামেরা চালু করা যায়নি বা অনুমতি নেই। সিমুলেটেড ক্লিনিক্যাল ফিড ব্যবহার করা হচ্ছে।');
        setUseWebcam(false);
      });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [useWebcam]);

  // Handle Preset Trigger & Animated Pipeline Stages
  const handleSelectPreset = (preset: GesturePreset) => {
    setActivePreset(preset);
    gestureStepRef.current = 0;

    // Reset pipeline animation
    setPipelineProgress({ stage1: false, stage2: false, stage3: false, stage4: false });

    // Staged latency progression simulating real inference
    setTimeout(() => setPipelineProgress(prev => ({ ...prev, stage1: true })), 40);
    setTimeout(() => setPipelineProgress(prev => ({ ...prev, stage2: true })), 110);
    setTimeout(() => setPipelineProgress(prev => ({ ...prev, stage3: true })), 220);
    setTimeout(() => {
      setPipelineProgress(prev => ({ ...prev, stage4: true }));
      // Auto-trigger audio if normal urgency or alert
      playBengaliSpeech(preset.reconstructedBn);
    }, 280);
  };

  // Web Speech API execution
  const playBengaliSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Browser does not support Speech Synthesis. Text displayed above.');
      return;
    }

    window.speechSynthesis.cancel();
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    if (bengaliVoice) {
      utterance.voice = bengaliVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activePreset.reconstructedBn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    handleSelectPreset(SAMPLE_GESTURE_PRESETS[0]);
  };

  // Real-Time HTML5 Canvas 3D Skeletal Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const render = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      step += 0.04;
      gestureStepRef.current = step;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Background: Either Video Feed or Simulated Clinical Environment
      if (useWebcam && videoRef.current && videoRef.current.readyState >= 2) {
        ctx.save();
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        // Dim video slightly to make fluorescent green skeleton pop
        ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      } else {
        // Draw Simulated Clinical Room
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#0F172A');
        gradient.addColorStop(0.5, '#1E293B');
        gradient.addColorStop(1, '#0B1120');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Clinical Wall & Depth Grid Lines
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.35)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Hospital Cross Watermark in Background
        ctx.save();
        ctx.fillStyle = 'rgba(16, 185, 129, 0.05)';
        ctx.fillRect(width / 2 - 30, height / 2 - 100, 60, 160);
        ctx.fillRect(width / 2 - 80, height / 2 - 50, 160, 60);
        ctx.restore();

        // Signer Body Silhouette
        ctx.save();
        ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
        ctx.beginPath();
        // Head
        ctx.arc(width / 2, height * 0.28, 48, 0, Math.PI * 2);
        ctx.fill();
        // Torso
        ctx.beginPath();
        ctx.moveTo(width / 2 - 85, height * 0.46);
        ctx.lineTo(width / 2 + 85, height * 0.46);
        ctx.lineTo(width / 2 + 105, height);
        ctx.lineTo(width / 2 - 105, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 2. Calculate 3D Landmark Coordinates based on Active Gesture Preset
      const cx = width / 2;
      const cy = height * 0.38;

      // Base upper body keypoints
      const nose = { x: cx, y: cy - 45 };
      const leftShoulder = { x: cx - 80, y: cy + 30 };
      const rightShoulder = { x: cx + 80, y: cy + 30 };
      const leftElbow = { x: cx - 110 + Math.sin(step) * 5, y: cy + 105 };
      const rightElbow = { x: cx + 110 - Math.sin(step) * 5, y: cy + 105 };

      // Dynamic Wrists & Hands according to gesture type
      let leftWrist = { x: cx - 75, y: cy + 160 };
      let rightWrist = { x: cx + 75, y: cy + 160 };

      const gType = activePreset.simulatedLandmarkType;

      if (gType === 'head_pain') {
        // Right hand moves to forehead with rapid tension vibration
        const vibr = Math.sin(step * 14) * 4;
        rightWrist = { x: cx + 30 + vibr, y: cy - 40 + vibr };
        rightElbow.x = cx + 85;
        rightElbow.y = cy + 35;
        leftWrist = { x: cx - 80, y: cy + 150 };
      } else if (gType === 'emergency_breath') {
        // Both hands on upper chest with rapid alternating heaving
        const breath = Math.sin(step * 8) * 9;
        leftWrist = { x: cx - 35, y: cy + 50 + breath };
        rightWrist = { x: cx + 35, y: cy + 50 - breath };
        leftElbow.x = cx - 95;
        rightElbow.x = cx + 95;
      } else if (gType === 'medicine_time') {
        // Left hand holds flat palm, right fingers pinch to mouth
        leftWrist = { x: cx - 45, y: cy + 115 };
        const mouthPinch = Math.sin(step * 4) * 12;
        rightWrist = { x: cx + 15, y: cy - 10 + mouthPinch };
      } else if (gType === 'bp_check') {
        // Right hand grips left upper bicep
        leftWrist = { x: cx - 80, y: cy + 130 };
        rightWrist = { x: cx - 75, y: cy + 45 + Math.sin(step * 5) * 3 };
      } else if (gType === 'thank_you') {
        // Right hand moves from chin forward in gratitude
        const fwd = Math.sin(step * 3) * 25;
        rightWrist = { x: cx + 25 + fwd, y: cy + 15 + fwd * 0.8 };
        leftWrist = { x: cx - 80, y: cy + 155 };
      } else {
        // Unknown Noise: Erratic unstable jitter
        const jitterX = (Math.random() - 0.5) * 40;
        const jitterY = (Math.random() - 0.5) * 40;
        leftWrist = { x: cx - 70 + jitterX, y: cy + 120 + jitterY };
        rightWrist = { x: cx + 70 + jitterX, y: cy + 120 + jitterY };
      }

      // 3. Draw Skeletal Connections (Upper Body Pose)
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#06B6D4'; // Cyan for torso pose
      ctx.beginPath();
      // Shoulders
      ctx.moveTo(leftShoulder.x, leftShoulder.y);
      ctx.lineTo(rightShoulder.x, rightShoulder.y);
      // Arms
      ctx.lineTo(rightElbow.x, rightElbow.y);
      ctx.lineTo(rightWrist.x, rightWrist.y);
      ctx.moveTo(leftShoulder.x, leftShoulder.y);
      ctx.lineTo(leftElbow.x, leftElbow.y);
      ctx.lineTo(leftWrist.x, leftWrist.y);
      // Neck to nose
      ctx.moveTo((leftShoulder.x + rightShoulder.x) / 2, (leftShoulder.y + rightShoulder.y) / 2);
      ctx.lineTo(nose.x, nose.y);
      ctx.stroke();

      // Draw Pose Keypoint Nodes
      const posePoints = [nose, leftShoulder, rightShoulder, leftElbow, rightElbow];
      posePoints.forEach(pt => {
        ctx.fillStyle = '#22D3EE';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // 4. Draw 21-Point Detailed Hand Skeletal Structures
      const drawHand = (wrist: { x: number; y: number }, isRight: boolean) => {
        const factor = isRight ? 1 : -1;
        const fingerColors = ['#10B981', '#14B8A6', '#06B6D4', '#3B82F6', '#8B5CF6'];

        // Wrist anchor node
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(wrist.x, wrist.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // 5 Fingers, 4 segments each (20 points + 1 wrist = 21 landmarks)
        for (let f = 0; f < 5; f++) {
          const angle = -0.9 + f * 0.45;
          const fingerLen = f === 0 ? 30 : f === 2 ? 46 : 40;
          ctx.strokeStyle = fingerColors[f];
          ctx.lineWidth = 2.5;

          ctx.beginPath();
          ctx.moveTo(wrist.x, wrist.y);

          let prevX = wrist.x;
          let prevY = wrist.y;

          for (let seg = 1; seg <= 4; seg++) {
            const segDist = (fingerLen / 4) * seg;
            const px = wrist.x + Math.sin(angle * factor) * segDist * 1.1;
            const py = wrist.y - Math.cos(angle * factor) * segDist;

            ctx.lineTo(px, py);

            // Draw joint circle
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(px - 2.5, py - 2.5, 5, 5);

            prevX = px;
            prevY = py;
          }
          ctx.stroke();

          // Fingertip glowing landmark
          ctx.fillStyle = fingerColors[f];
          ctx.beginPath();
          ctx.arc(prevX, prevY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawHand(leftWrist, false);
      drawHand(rightWrist, true);

      // 5. Active Signing HUD Overlay on Canvas
      ctx.save();
      // Bounding Box on Sign Region
      ctx.strokeStyle = gType === 'unknown_noise' ? '#EF4444' : '#10B981';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(cx - 130, cy - 80, 260, 270);
      ctx.setLineDash([]);

      // Top corner brackets
      ctx.fillStyle = gType === 'unknown_noise' ? '#EF4444' : '#10B981';
      ctx.font = '600 12px "JetBrains Mono"';
      ctx.fillText(`ROI: BDSL_TRACKER_3D`, cx - 125, cy - 65);
      ctx.fillText(`CONF: ${activePreset.confidence}%`, cx + 30, cy - 65);
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [useWebcam, activePreset]);

  return (
    <div className="space-y-6">

      {/* Top Banner & Accessibility Alert */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>লাইভ বাংলা সাইন ল্যাঙ্গুয়েজ অনুবাদক</span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-600/40">
                MediaPipe 3D + PyTorch
              </span>
            </h1>
            <p className="text-sm text-slate-400">
              ক্লিনিক্যাল ডেস্কে শ্রবণ ও বাকপ্রতিবন্ধী রোগীর ইশারা ভাষা তাৎক্ষণিক বাংলা টেক্সট ও মিষ্টি কণ্ঠস্বরে অনুবাদ করুন।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <button
            onClick={() => setUseWebcam(!useWebcam)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition shadow-md ${
              useWebcam 
                ? 'bg-rose-600/90 hover:bg-rose-500 text-white shadow-rose-600/20' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
            }`}
          >
            {useWebcam ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            <span>{useWebcam ? 'Stop Webcam' : 'Start Real Webcam'}</span>
          </button>
        </div>
      </div>

      {webcamError && (
        <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl p-3 text-xs text-amber-200 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{webcamError}</span>
        </div>
      )}

      {/* Main Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT PANEL: Real-Time Vision & 3D Skeletal Overlay Canvas (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Top Canvas HUD Badges */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>LIVE {fps} FPS</span>
                </span>
                <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-cyan-300">
                  42 3D Landmarks
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-slate-300">
                  Mode: {useWebcam ? 'WebRTC Webcam' : 'Simulated Clinical Feed'}
                </span>
              </div>
            </div>

            {/* Video hidden element for webcam capture */}
            <video 
              ref={videoRef} 
              playsInline 
              muted 
              className="hidden" 
            />

            {/* Main Interactive 3D Canvas */}
            <div className="relative aspect-[4/3] w-full bg-slate-950 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="w-full h-full object-contain"
              />

              {/* Bottom Canvas Overlay Pill */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs text-slate-300">
                <div className="flex items-center space-x-2 font-mono">
                  <span className="text-emerald-400 font-semibold">Normalized Tensor:</span>
                  <span className="text-slate-400">[40, 42, 3]</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-slate-400 font-mono text-[11px]">RAM Ephemeral Purge: Active</span>
                </div>
              </div>
            </div>

          </div>

          {/* One-Click BdSLW60 Sample Gesture Simulator Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  BdSLW60 Clinical Gesture Simulator (One-Click Test)
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Tap any gesture to test pipeline</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_GESTURE_PRESETS.map((preset) => {
                const isSelected = activePreset.id === preset.id;
                const isUrgent = preset.urgency === 'Urgent Alert';
                const isNoise = preset.id === 'preset_unknown';

                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-left p-2.5 rounded-xl border transition flex flex-col justify-between ${
                      isSelected
                        ? isUrgent
                          ? 'bg-rose-950/60 border-rose-500 shadow-md shadow-rose-950'
                          : isNoise
                          ? 'bg-amber-950/60 border-amber-500 shadow-md shadow-amber-950'
                          : 'bg-emerald-950/60 border-emerald-500 shadow-md shadow-emerald-950'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold text-white font-bengali">
                        {preset.titleBn}
                      </span>
                      {isUrgent ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-900 text-rose-300 font-mono font-bold">
                          URGENT
                        </span>
                      ) : isNoise ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-900 text-amber-300 font-mono">
                          GUARDRAIL
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">
                          {preset.confidence}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 flex-wrap gap-1">
                      {preset.tokens.map((token, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800/90 text-teal-300 font-mono">
                          {token}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Spatio-Temporal Pipeline & Bengali Output (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">

          {/* Animated Latency Telemetry Pipeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>LATENCY TELEMETRY PIPELINE</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {activePreset.latencyBreakdown.mediapipe + 
                 activePreset.latencyBreakdown.bilstm + 
                 activePreset.latencyBreakdown.rag + 
                 activePreset.latencyBreakdown.tts}ms (SLA &lt;300ms)
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {/* Stage 1 */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${pipelineProgress.stage1 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`}></span>
                  <span className="text-slate-300">1. MediaPipe 3D Landmarks</span>
                </div>
                <span className="text-teal-400 font-bold">{activePreset.latencyBreakdown.mediapipe}ms</span>
              </div>

              {/* Stage 2 */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${pipelineProgress.stage2 ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`}></span>
                  <span className="text-slate-300">2. PyTorch CNN-BiLSTM Gloss</span>
                </div>
                <span className="text-cyan-400 font-bold">{activePreset.latencyBreakdown.bilstm}ms</span>
              </div>

              {/* Stage 3 */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${pipelineProgress.stage3 ? 'bg-purple-400 animate-pulse' : 'bg-slate-700'}`}></span>
                  <span className="text-slate-300">3. pgvector RAG + MCP Refiner</span>
                </div>
                <span className="text-purple-400 font-bold">{activePreset.latencyBreakdown.rag}ms</span>
              </div>

              {/* Stage 4 */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${pipelineProgress.stage4 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`}></span>
                  <span className="text-slate-300">4. Bengali TTS Output</span>
                </div>
                <span className="text-emerald-400 font-bold">{activePreset.latencyBreakdown.tts}ms</span>
              </div>
            </div>
          </div>

          {/* Recognized BdSL Gloss Token Sequence */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Recognized BdSL Gloss Sequence
            </span>
            <div className="flex items-center flex-wrap gap-2">
              {activePreset.tokens.map((token, index) => (
                <div key={index} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-sm font-mono text-emerald-300 shadow-sm">
                  <span className="font-bold font-bengali">[{token}]</span>
                  <span className="text-[11px] text-slate-400">({activePreset.tokenEn[index]})</span>
                </div>
              ))}
              <span className="text-xs text-slate-500 font-mono">→ Grammatically Mapped</span>
            </div>
          </div>

          {/* Large Reconstructed Bengali Sentence Output Card */}
          <div className={`p-5 rounded-2xl border transition-all ${
            activePreset.urgency === 'Urgent Alert'
              ? 'bg-rose-950/40 border-rose-500/80 shadow-xl shadow-rose-950/40'
              : activePreset.id === 'preset_unknown'
              ? 'bg-amber-950/40 border-amber-500/80 shadow-xl shadow-amber-950/40'
              : 'bg-slate-900 border-emerald-500/40 shadow-xl'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>পুনর্গঠিত বাংলা বাক্য (Reconstructed Speech)</span>
              </span>

              {activePreset.urgency === 'Urgent Alert' ? (
                <span className="px-2.5 py-1 rounded-full bg-rose-900/80 text-rose-200 border border-rose-500/50 text-xs font-mono font-bold flex items-center gap-1 animate-pulse">
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  <span>তীব্র জরুরি সতর্কতা</span>
                </span>
              ) : activePreset.id === 'preset_unknown' ? (
                <span className="px-2.5 py-1 rounded-full bg-amber-900/80 text-amber-200 border border-amber-500/50 text-xs font-mono font-bold">
                  পুনরায় সাইন করুন (Abstain)
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
                  স্বাভাবিক (Normal Triage)
                </span>
              )}
            </div>

            {/* High-Contrast Bengali Typography */}
            <p className="text-2xl sm:text-3xl font-bold text-white font-bengali leading-relaxed tracking-wide min-h-[90px]">
              "{activePreset.reconstructedBn}"
            </p>

            {/* English Translation Subtitle */}
            <p className="text-xs text-slate-400 italic mt-2 border-t border-slate-800/80 pt-2">
              Translation: "{activePreset.reconstructedEn}"
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mt-3">
              <span>Department: <strong className="text-teal-300">{activePreset.department}</strong></span>
              <span>Model Confidence: <strong className="text-emerald-400">{activePreset.confidence}%</strong></span>
            </div>
          </div>

          {/* Action Buttons: Speak Bengali, Copy, Reset */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={() => playBengaliSpeech(activePreset.reconstructedBn)}
              disabled={isSpeaking}
              className={`w-full sm:flex-1 flex items-center justify-center space-x-2.5 px-5 py-3 rounded-xl font-medium text-sm transition shadow-lg ${
                isSpeaking 
                  ? 'bg-teal-700 text-white animate-pulse' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
              <span className="font-bengali font-bold">🔊 বাংলায় শুনুন (Speak Bengali)</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition"
              title="Copy Bengali Text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition"
              title="Reset Session"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          {/* Visual Audio Waveform Fallback Bar */}
          {isSpeaking && (
            <div className="p-3 bg-slate-900 border border-teal-500/40 rounded-xl flex items-center justify-between">
              <span className="text-xs font-mono text-teal-400">Audio Speech Output Stream:</span>
              <div className="flex items-center space-x-1 h-5">
                {[4, 14, 8, 20, 12, 18, 6, 22, 10, 16, 4].map((h, i) => (
                  <span 
                    key={i} 
                    className="w-1 bg-teal-400 rounded-full animate-soundwave"
                    style={{ animationDelay: `${i * 0.1}s`, height: `${h}px` }}
                  ></span>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
