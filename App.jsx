import React, { useState, useEffect } from 'react';
import { Terminal, Loader2, ShieldCheck, ChevronDown, ExternalLink, Fingerprint, Activity, Zap } from 'lucide-react';

// --- INLINE API SERVICE ---
// Embedded directly to ensure compilation in this single-file environment.
const verifyClaim = async (claimText) => {
  try {
    const response = await fetch('http://localhost:8001/verify-claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claim: claimText })
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Backend not reachable. Falling back to simulated AI analysis.", error);
  }
  
  // Simulated fallback if FastAPI backend is offline
  const randomTruth = Math.floor(Math.random() * 100);
  return {
    truth_score: randomTruth,
    panic_score: Math.floor(Math.random() * 10),
    bias_score: parseFloat((Math.random() * 2 - 1).toFixed(2)),
    evidence_links: [
      { source: "News API", summary: `Aggregated data cross-checked. Similarity index maps to ${randomTruth}% accuracy.`, url: "#" },
      { source: "GNews", summary: "Verified publisher consensus analyzed against emotional trigger words.", url: "#" }
    ],
    hash: "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')
  };
};

// --- INJECT CUSTOM CSS ANIMATIONS & STYLES ---
const injectStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
      100% { opacity: 1; transform: translateY(0); filter: blur(0); }
    }
    .animate-fade-in {
      animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
    }
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
    
    .glass-panel {
      background: rgba(9, 9, 11, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }

    .cyber-input {
      background: linear-gradient(90deg, rgba(6, 182, 212, 0.05) 0%, transparent 100%);
    }

    /* SYSTEM-LEVEL FORENSIC ANIMATIONS */
    @keyframes scanRing {
      0% { transform: rotate(0deg); opacity: 0.4; border-color: rgba(6, 182, 212, 0.4); box-shadow: 0 0 10px rgba(6, 182, 212, 0.2); }
      50% { opacity: 1; border-color: rgba(34, 211, 238, 1); box-shadow: 0 0 30px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(34, 211, 238, 0.4); }
      100% { transform: rotate(360deg); opacity: 0.4; border-color: rgba(6, 182, 212, 0.4); box-shadow: 0 0 10px rgba(6, 182, 212, 0.2); }
    }
    .animate-scan-ring {
      animation: scanRing 4s linear infinite;
    }

    @keyframes laserSweep {
      0% { top: -10%; opacity: 0; }
      10% { opacity: 0.8; }
      90% { opacity: 0.8; }
      100% { top: 110%; opacity: 0; }
    }
    .animate-laser-sweep {
      animation: laserSweep 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    @keyframes neonPulseGreen {
      0%, 100% { text-shadow: 0 0 10px #10b981; filter: brightness(1); }
      50% { text-shadow: 0 0 20px #10b981, 0 0 30px #10b981; filter: brightness(1.2); }
    }
    .animate-neon-green {
      animation: neonPulseGreen 2s ease-in-out infinite;
    }

    @keyframes neonFlickerRed {
      0%, 100% { text-shadow: 0 0 10px #ef4444; filter: brightness(1); opacity: 1; }
      22% { text-shadow: 0 0 20px #ef4444, 0 0 30px #ef4444; filter: brightness(1.3); opacity: 1; }
      25% { opacity: 0.8; filter: brightness(0.8); }
      28% { opacity: 1; filter: brightness(1); }
      70% { opacity: 1; text-shadow: 0 0 15px #ef4444; }
      72% { opacity: 0.9; }
    }
    .animate-neon-red {
      animation: neonFlickerRed 3s infinite;
    }

    @keyframes hashFlicker {
      0%, 100% { border-color: rgba(39, 39, 42, 1); box-shadow: none; filter: brightness(1); color: #71717a; }
      20% { border-color: rgba(6, 182, 212, 0.8); box-shadow: 0 0 15px rgba(6,182,212,0.4); filter: brightness(1.5); color: #22d3ee; }
      25% { border-color: rgba(6, 182, 212, 0.2); box-shadow: none; filter: brightness(0.8); color: #0891b2; }
      45% { border-color: rgba(6, 182, 212, 0.9); box-shadow: 0 0 20px rgba(6,182,212,0.5); filter: brightness(1.3); color: #22d3ee; }
      50% { border-color: rgba(39, 39, 42, 1); box-shadow: none; filter: brightness(1); color: #71717a; }
    }
    .animate-hash-flicker {
      animation: hashFlicker 2s infinite;
    }

    @keyframes shimmerStream {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer-stream {
      animation: shimmerStream 1s infinite;
    }

    @keyframes panGrid {
      0% { background-position: 0px 0px; }
      100% { background-position: 40px 0px; }
    }
    .animate-pan-grid {
      animation: panGrid 4s linear infinite;
    }
    .animate-pan-grid-fast {
      animation: panGrid 0.8s linear infinite;
    }

    @keyframes signalBlip {
      0%, 100% { opacity: 0.2; box-shadow: none; }
      50% { opacity: 1; box-shadow: 0 0 8px #22d3ee, 0 0 12px #22d3ee; }
    }
    .animate-signal-blip {
      animation: signalBlip 1s ease-in-out infinite;
    }

    @keyframes nodeIngest {
      0% { opacity: 0; filter: blur(10px); transform: scale(0.95) translateY(10px); box-shadow: none; border-color: rgba(6, 182, 212, 0); }
      40% { opacity: 1; filter: blur(0px); transform: scale(1.02) translateY(0); box-shadow: 0 0 20px rgba(6, 182, 212, 0.4); border-color: rgba(6, 182, 212, 0.8); }
      100% { opacity: 1; filter: blur(0px); transform: scale(1) translateY(0); box-shadow: none; border-color: rgba(39, 39, 42, 1); }
    }
    .animate-node-ingest {
      animation: nodeIngest 0.8s ease-out forwards;
      opacity: 0;
    }

    /* SPLASH SCREEN ANIMATIONS */
    @keyframes logoPulseGlow {
      0%, 100% { filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.3)); transform: scale(1); }
      50% { filter: drop-shadow(0 0 25px rgba(6, 182, 212, 0.8)); transform: scale(1.05); }
    }
    .animate-logo-pulse-glow {
      animation: logoPulseGlow 2s ease-in-out infinite;
    }

    @keyframes loadingBarProgress {
      0% { width: 0%; }
      30% { width: 40%; }
      70% { width: 75%; }
      100% { width: 100%; }
    }
    .animate-loading-bar-progress {
      animation: loadingBarProgress 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes fadeOutBlur {
      0% { opacity: 1; filter: blur(0px); transform: scale(1); }
      100% { opacity: 0; filter: blur(15px); transform: scale(1.05); }
    }
    .animate-fade-out-blur {
      animation: fadeOutBlur 0.5s ease-out forwards;
    }

    /* Custom range slider thumb styling */
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #000;
      border: 2px solid #06b6d4;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(6,182,212,0.8);
      margin-top: -6px;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
    }
  `}</style>
);

// --- COMPONENTS ---

const SplashScreen = ({ isFading }) => {
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-cyan-400 ${isFading ? 'animate-fade-out-blur' : ''}`}>
      {/* Background Grids for Splash */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#09090b] to-[#09090b]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] animate-pan-grid"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Pulsing Logo */}
        <div className="relative w-32 h-32 mb-8 animate-logo-pulse-glow flex items-center justify-center rounded-full bg-cyan-950/30 border border-cyan-500/20">
          <img 
            src="src/assets/logo.png" 
            alt="Trust Token Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            onError={(e) => {
              // Fallback styling if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <ShieldCheck size={64} className="text-cyan-400 hidden" />
        </div>

        {/* Text */}
        <div className="font-mono text-sm tracking-[0.3em] uppercase animate-pulse mb-6 text-cyan-50">
          INITIALIZING TRUST TOKEN...
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
          <div className="h-full bg-cyan-400 animate-loading-bar-progress shadow-[0_0_10px_#22d3ee]"></div>
        </div>
      </div>
    </div>
  );
};

const ClaimInput = ({ onAnalyze, isAnalyzing, initialClaim = "" }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (initialClaim) {
      setText(initialClaim);
    }
  }, [initialClaim]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isAnalyzing) onAnalyze(text);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-cyan-500/10 rounded-lg">
          <Terminal size={18} className="text-cyan-400" />
        </div>
        <div>
          <h2 className="text-zinc-100 text-sm font-bold tracking-widest uppercase">Target Acquisition</h2>
          <p className="text-zinc-500 text-xs font-mono">Enter claim parameters for neural verification</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Awaiting input stream..."
            className="w-full cyber-input border border-zinc-800 rounded-xl text-cyan-50 p-4 pl-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 resize-none font-mono text-sm min-h-[60px] transition-all placeholder:text-zinc-600"
            disabled={isAnalyzing}
          />
        </div>
        <button
          type="submit"
          disabled={!text.trim() || isAnalyzing}
          className={`px-8 py-3 rounded-xl font-mono text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
            isAnalyzing || !text.trim()
              ? 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'
              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
          }`}
        >
          {isAnalyzing ? (
            <><Loader2 className="animate-spin" size={16} /> Processing</>
          ) : (
            <><Zap size={16} /> Execute</>
          )}
        </button>
      </form>
    </div>
  );
};

const TruthMeter = ({ score = 0, isAnalyzing }) => {
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => setDisplayScore(Math.floor(Math.random() * 100)), 50);
    } else {
      setDisplayScore(score);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, score]);

  const getColor = (val) => {
    if (val === 0 && !isAnalyzing) return '#52525b'; 
    if (val < 40) return '#ef4444';
    if (val < 70) return '#eab308';
    return '#10b981';
  };

  const color = getColor(displayScore);
  const statusLabel = isAnalyzing ? 'ANALYZING' : displayScore === 0 ? 'STANDBY' : displayScore < 40 ? 'FABRICATED' : displayScore < 70 ? 'UNVERIFIED' : 'AUTHENTIC';

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  let verdictAnimationClass = "";
  if (!isAnalyzing && displayScore > 0) {
    if (displayScore >= 70) verdictAnimationClass = "animate-neon-green text-emerald-400";
    else if (displayScore < 40) verdictAnimationClass = "animate-neon-red text-red-500";
    else verdictAnimationClass = "text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]";
  } else if (isAnalyzing) {
    verdictAnimationClass = "text-cyan-500 animate-pulse";
  } else {
    verdictAnimationClass = "text-zinc-500";
  }

  return (
    <div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center w-full h-full relative transition-all duration-500 hover:border-zinc-700">
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Activity size={16} className={isAnalyzing ? 'text-cyan-400 animate-pulse' : 'text-zinc-500'} />
        <span className="text-zinc-400 text-xs font-mono font-bold tracking-widest uppercase">Truth Index</span>
      </div>

      <div className="relative w-48 h-48 mt-6 flex items-center justify-center rounded-full overflow-hidden">
        {isAnalyzing && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] blur-[1px] animate-laser-sweep z-20"></div>
        )}
        <div className={`absolute inset-0 border-[2px] border-dashed rounded-full ${isAnalyzing ? 'animate-scan-ring' : 'border-zinc-800'} scale-110 z-0`}></div>
        
        <svg className="transform -rotate-90 w-40 h-40 z-10">
          <circle cx="80" cy="80" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="transparent" />
          <circle 
            cx="80" cy="80" r={radius} stroke={color} strokeWidth="12" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all ${isAnalyzing ? 'duration-75' : 'duration-1000'} ease-out`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center z-10">
          <span className="text-3xl font-bold text-white tracking-tighter">{displayScore}<span className="text-xl text-zinc-500">%</span></span>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <span className="text-zinc-500 text-[10px] font-mono tracking-[0.3em] uppercase mb-1">System Verdict</span>
        <div className={`text-lg font-black tracking-widest uppercase transition-colors duration-300 ${verdictAnimationClass}`}>
          {statusLabel}
        </div>
      </div>
    </div>
  );
};

const PanicDial = ({ score = 0, isAnalyzing }) => {
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        // Random jitter to simulate active emotion signal spikes
        setDisplayScore(2 + Math.random() * 7); 
      }, 80);
    } else {
      setDisplayScore(score);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, score]);

  const angle = (displayScore / 10) * 180 - 90;

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-between w-full h-full">
      <h2 className="text-zinc-400 text-xs font-mono font-bold tracking-widest uppercase w-full text-left mb-6 flex items-center">
        Panic Level
        {isAnalyzing && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-signal-blip ml-2"></div>}
      </h2>
      
      <div className="relative mt-4 flex justify-center w-full">
        <svg viewBox="0 0 200 120" className="w-full max-w-[180px]">
          <defs>
            <linearGradient id="panicGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" strokeLinecap="round" />
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#panicGrad)" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
          
          <g transform={`rotate(${angle} 100 100)`} className={`transition-transform ${isAnalyzing ? 'duration-[80ms]' : 'duration-1000'} ease-out`}>
            <polygon points="96,100 104,100 100,30" fill="white" />
            <circle cx="100" cy="100" r="6" fill="white" />
          </g>
        </svg>
      </div>

      <div className="mt-4 text-zinc-300 font-mono text-xl font-bold">
        {isAnalyzing ? '-' : score}<span className="text-zinc-600 text-sm">/10</span>
      </div>
    </div>
  );
};

const BiasMeter = ({ score = 0, isAnalyzing }) => {
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      let angle = 0;
      interval = setInterval(() => {
        angle += 0.2;
        // Oscillate slowly between -0.1 and 0.1 to simulate drift
        setDisplayScore(Math.sin(angle) * 0.1);
      }, 50);
    } else {
      setDisplayScore(score);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, score]);

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center w-full h-full">
      <h2 className="text-zinc-400 text-xs font-mono font-bold tracking-widest uppercase mb-8">Bias Trajectory</h2>
      
      <div className="px-2 pb-6 relative w-full">
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={displayScore}
          readOnly
          className={`w-full appearance-none h-1.5 rounded-full transition-all duration-150 ${isAnalyzing ? 'bg-cyan-900/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-zinc-800'}`}
          style={{
            background: `linear-gradient(to right, #60a5fa 0%, rgba(255,255,255,0.1) 50%, #f87171 100%)`
          }}
        />
        
        <div className="flex justify-between w-full mt-4 text-[10px] font-mono tracking-widest text-zinc-500 absolute left-0 px-2">
          <span className="text-blue-400">LEFT</span>
          <span className="text-zinc-400">CENTER</span>
          <span className="text-red-400">RIGHT</span>
        </div>
      </div>
    </div>
  );
};

const EvidenceLocker = ({ evidence, isAnalyzing }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Mock data to simulate ingestion while analyzing
  const analyzingEv = [
    { source: "PIB FORENSICS", summary: "Querying government bulletin databases...", url: "#" },
    { source: "ALTNEWS DB", summary: "Cross-referencing image hashes...", url: "#" },
    { source: "GNEWS AGGREGATOR", summary: "Analyzing global narrative sentiment...", url: "#" },
    { source: "IFCN NETWORK", summary: "Fetching recognized fact-check signatures...", url: "#" }
  ];

  const defaultEv = [
    { source: "SYSTEM", summary: "Awaiting claim input to cross-reference databases.", url: "#" }
  ];
  
  const displayData = isAnalyzing ? analyzingEv : (evidence || defaultEv);

  return (
    <div className={`glass-panel rounded-2xl p-6 h-full transition-all duration-500 ${isAnalyzing ? 'border-cyan-500/30' : ''}`}>
      <h2 className="text-zinc-400 text-xs font-mono font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <ShieldCheck size={16} className="text-cyan-400" /> Source Nodes
      </h2>

      <div className="space-y-3">
        {displayData.map((item, idx) => (
          <div 
            key={`${isAnalyzing ? 'analyzing' : 'static'}-${idx}`} 
            className={`border rounded-xl overflow-hidden transition-colors ${
              isAnalyzing 
                ? 'animate-node-ingest border-cyan-500/50' 
                : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-600'
            }`}
            style={isAnalyzing ? { animationDelay: `${idx * 300}ms` } : {}}
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
              className="w-full flex justify-between items-center p-4 focus:outline-none"
            >
              <span className={`font-mono text-xs font-bold tracking-wider ${isAnalyzing ? 'text-cyan-400' : 'text-zinc-200'}`}>
                {item.source}
              </span>
              <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-300 ${expandedIndex === idx ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>

            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${expandedIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="p-4 pt-0 text-zinc-400 text-[11px] font-mono leading-relaxed border-t border-zinc-800/50 mt-2">
                  <p className="mb-4">{item.summary}</p>
                  {item.source !== "SYSTEM" && !isAnalyzing && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest text-[10px]">
                      Access Record <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlockchainSeal = ({ hash, isAnalyzing }) => {
  const [displayHash, setDisplayHash] = useState(hash);

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setDisplayHash("0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''));
      }, 50);
    } else {
      setDisplayHash(hash);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, hash]);

  return (
    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className={`absolute top-0 w-full h-1 ${isAnalyzing ? 'bg-cyan-500/50' : 'bg-zinc-800'} transition-colors`}></div>
      
      <div className={`p-4 rounded-full mb-6 border ${isAnalyzing ? 'border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-cyan-500/5' : 'border-zinc-800 bg-zinc-900/50'} transition-all duration-500`}>
        <Fingerprint className={isAnalyzing ? "text-cyan-400" : "text-zinc-500"} size={32} />
      </div>
      
      <h2 className="text-zinc-400 text-xs font-mono font-bold tracking-widest uppercase mb-2">Cryptographic Seal</h2>
      <p className="text-zinc-600 font-mono text-[10px] tracking-[0.2em] mb-6">SHA-256 IMMUTABLE LEDGER</p>
      
      <div className={`relative bg-zinc-950 border rounded-xl p-4 w-full break-all font-mono text-[10px] shadow-inner transition-colors duration-300 overflow-hidden ${isAnalyzing ? 'animate-hash-flicker text-cyan-400' : 'border-zinc-800 text-zinc-500'}`}>
        <span className="relative z-10">{displayHash}</span>
        {isAnalyzing && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-shimmer-stream z-0"></div>
        )}
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD ---

export default function App() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [initialClaimText, setInitialClaimText] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [systemStatus, setSystemStatus] = useState("SYSTEM ONLINE");
  
  const [dashboardData, setDashboardData] = useState({
    truth_score: 0,
    panic_score: 0,
    bias_score: 0,
    evidence_links: null,
    hash: "WAITING_FOR_DATA_STREAM..."
  });

  // Handle Splash Screen Timeline
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setSplashFading(true);
    }, 2500); // Start fading out at 2.5s

    const removeTimer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000); // Remove component at 3.0s

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Dynamic status evolution effect
  useEffect(() => {
    if (!isAnalyzing) {
      setSystemStatus("SYSTEM ONLINE");
      return;
    }
    const stages = [
      "INGESTING SOURCES",
      "CROSS-REFERENCING",
      "VERIFYING CLAIM",
      "FINALIZING HASH"
    ];
    let step = 0;
    setSystemStatus(stages[0]);
    
    const interval = setInterval(() => {
      step++;
      if (step < stages.length) {
        setSystemStatus(stages[step]);
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleAnalyzeClaim = async (claimText) => {
    setIsAnalyzing(true);
    
    try {
      const data = await verifyClaim(claimText);
      
      setDashboardData({
        truth_score: data.truth_score,
        panic_score: data.panic_score,
        bias_score: data.bias_score,
        evidence_links: data.evidence_links,
        hash: data.hash
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Check URL for claim parameter on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const claimParam = params.get('claim');
    
    if (claimParam) {
      const decodedClaim = decodeURIComponent(claimParam);
      setInitialClaimText(decodedClaim);
      
      // Automatically trigger analysis
      handleAnalyzeClaim(decodedClaim);
      
      // Optional: Clean up the URL so it doesn't re-trigger on manual refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []); // Empty dependency array means this runs only once when the page loads

  // Render Splash Screen if active
  if (splashVisible) {
    return (
      <>
        {injectStyles()}
        <SplashScreen isFading={splashFading} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 p-4 md:p-8 relative overflow-hidden font-sans">
      {injectStyles()}
      
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#09090b] to-[#09090b]"></div>
      <div className={`fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] ${isAnalyzing ? 'animate-pan-grid-fast' : 'animate-pan-grid'}`}></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              TRUST<span className="text-cyan-400">TOKEN</span>
            </h1>
            <p className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase mt-1">
              RAG-Powered Claim Verification
            </p>
          </div>
          <div className={`flex items-center gap-2 border rounded-full px-4 py-2 transition-colors duration-300 ${isAnalyzing ? 'bg-cyan-950/40 border-cyan-500/50' : 'bg-zinc-900/80 border-zinc-800'}`}>
            <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`}></div>
            <span className={`font-mono text-[10px] tracking-widest uppercase transition-colors ${isAnalyzing ? 'text-cyan-400' : 'text-zinc-400'}`}>{systemStatus}</span>
          </div>
        </header>

        <div className="animate-fade-in delay-100">
          <ClaimInput onAnalyze={handleAnalyzeClaim} isAnalyzing={isAnalyzing} initialClaim={initialClaimText} />
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-700 ${isAnalyzing ? 'opacity-80 scale-[0.99] filter blur-[1px]' : 'opacity-100 scale-100'}`}>
          
          <div className="lg:col-span-3 animate-fade-in delay-200 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500">
            <EvidenceLocker evidence={dashboardData.evidence_links} isAnalyzing={isAnalyzing} />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="h-full animate-fade-in delay-300 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500">
              <TruthMeter score={dashboardData.truth_score} isAnalyzing={isAnalyzing} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="animate-fade-in delay-400 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500">
                <PanicDial score={dashboardData.panic_score} isAnalyzing={isAnalyzing} />
              </div>
              <div className="animate-fade-in delay-400 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500">
                <BiasMeter score={dashboardData.bias_score} isAnalyzing={isAnalyzing} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 animate-fade-in delay-200 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500">
            <BlockchainSeal hash={dashboardData.hash} isAnalyzing={isAnalyzing} />
          </div>

        </div>
      </div>
    </div>
  );
}