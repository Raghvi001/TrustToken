import { useState, useEffect } from 'react';
import { Fingerprint } from 'lucide-react'; // Swapped Lock to Fingerprint for more Cyberpunk feel

const BlockchainSeal = ({ hash = "0x8f2a...c91b", isAnalyzing }) => {
  const [displayHash, setDisplayHash] = useState(hash);

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        // Generate random hex string
        setDisplayHash("0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''));
      }, 50);
    } else {
      setDisplayHash(hash);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, hash]);

  return (
    <div className="relative bg-[#050505] border border-yellow-500/30 p-6 h-full flex flex-col items-center justify-start text-center group hover:border-yellow-400 transition-colors">
      
      {/* HUD Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>

      <h2 className="text-yellow-500/80 text-xs font-mono font-bold mb-6 tracking-[0.3em] uppercase w-full text-left border-b border-yellow-900/50 pb-2">
        <span className="text-yellow-500 mr-2">■</span> RAG_Ledger
      </h2>

      <div className={`p-4 rounded-full mb-6 mt-4 border border-yellow-500/20 bg-black ${isAnalyzing ? 'animate-pulse shadow-[0_0_20px_rgba(234,179,8,0.4)]' : ''}`}>
        <Fingerprint className="text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" size={32} />
      </div>
      
      <p className="text-gray-500 font-mono text-[10px] mb-2 tracking-[0.2em]">IMMUTABLE SHA-256 HASH</p>
      
      <div className={`bg-black border border-yellow-500/30 p-4 w-full break-all font-mono text-[11px] leading-relaxed shadow-inner ${isAnalyzing ? 'text-yellow-400/50' : 'text-yellow-200/90'}`}>
        {displayHash}
      </div>
    </div>
  );
};

export default BlockchainSeal;