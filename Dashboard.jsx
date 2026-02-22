import { useState } from 'react';
import TruthMeter from '../components/TruthMeter';
import PanicDial from '../components/PanicDial';
import BiasMeter from '../components/BiasMeter';
import EvidenceLocker from '../components/EvidenceLocker';
import BlockchainSeal from '../components/BlockchainSeal';
import ClaimInput from '../components/ClaimInput';

const Dashboard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [dashboardData, setDashboardData] = useState({
    truth_score: 0,
    panic_score: 0,
    bias_score: 0,
    evidence_links: [],
    hash: "AWAITING_DATA_STREAM..."
  });

  const handleAnalyzeClaim = async (claimText) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const randomTruth = Math.floor(Math.random() * 100);
      setDashboardData({
        truth_score: randomTruth,
        panic_score: Math.floor(Math.random() * 10),
        bias_score: parseFloat((Math.random() * 2 - 1).toFixed(2)),
        evidence_links: [
          { source: "News API", summary: `Global network scan complete. Narrative alignment: ${randomTruth}%.`, url: "#" },
          { source: "GNews", summary: "Cross-referenced with 400+ nodes. Sentiment matches panic index.", url: "#" }
        ],
        hash: "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    // Added animate-crt-flicker here for the whole screen
    <div className="relative min-h-screen bg-[#020202] p-6 lg:p-10 font-sans text-gray-200 overflow-hidden animate-crt-flicker">
      
      {/* Background grids */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#06b6d415_1px,transparent_1px),linear-gradient(to_bottom,#06b6d415_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_800px_at_50%_50%,#00000000,#020202_90%)]"></div>
      
      <div className={`fixed top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] pointer-events-none z-50 transition-all duration-[2.5s] ease-in-out ${isAnalyzing ? 'translate-y-[100vh] opacity-100' : '-translate-y-10 opacity-0'}`}></div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        
        <header className="mb-10 text-center relative opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] uppercase animate-pulse">
            Trust_Token
          </h1>
          <p className="text-cyan-500 font-mono text-xs mt-3 tracking-[0.4em] uppercase">
            [ RAG Network Online // v2.0.4 ]
          </p>
        </header>

        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <ClaimInput onAnalyze={handleAnalyzeClaim} isAnalyzing={isAnalyzing} />
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-300 ${isAnalyzing ? 'opacity-70 blur-[1px] scale-[0.99]' : 'opacity-100 scale-100'}`}>
          
          <div className="lg:col-span-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <EvidenceLocker evidence={dashboardData.evidence_links.length > 0 ? dashboardData.evidence_links : undefined} isAnalyzing={isAnalyzing} />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              <TruthMeter score={dashboardData.truth_score} isAnalyzing={isAnalyzing} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <PanicDial score={dashboardData.panic_score} isAnalyzing={isAnalyzing} />
              </div>
              <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '750ms' }}>
                <BiasMeter score={dashboardData.bias_score} isAnalyzing={isAnalyzing} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '900ms' }}>
            <BlockchainSeal hash={dashboardData.hash} isAnalyzing={isAnalyzing} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;