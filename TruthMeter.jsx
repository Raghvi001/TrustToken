import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TruthMeter = ({ score = 0, isAnalyzing }) => {
  const [displayScore, setDisplayScore] = useState(score);

  // Scramble numbers while analyzing
  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setDisplayScore(Math.floor(Math.random() * 100));
      }, 50); // fast scramble
    } else {
      setDisplayScore(score);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, score]);

  const getColor = (val) => {
    if (val === 0 && !isAnalyzing) return '#374151'; // Neutral/Off
    if (val < 40) return '#ef4444';
    if (val < 70) return '#eab308';
    return '#22c55e';
  };

  const color = getColor(displayScore);
  const statusLabel = isAnalyzing ? 'SCANNING...' : displayScore === 0 ? 'STANDBY' : displayScore < 40 ? 'FAKE' : displayScore < 70 ? 'SUSPICIOUS' : 'VERIFIED';

  return (
    <div
      className="relative flex flex-col items-center bg-[#050505] border border-gray-800 p-6 w-full transition-all duration-500 hover:border-cyan-500/50"
      style={{ boxShadow: isAnalyzing ? `0 0 30px ${color}40` : `0 0 15px ${color}20` }}
    >
      {/* HUD Brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gray-500"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gray-500"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gray-500"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gray-500"></div>

      <h2 className="text-gray-400 text-xs font-mono font-bold mb-6 tracking-[0.3em] uppercase w-full text-left border-b border-gray-800 pb-2">
        <span className="text-cyan-500 mr-2">■</span> Truth_Index
      </h2>
      
      <div className="relative w-40 h-40">
        {/* Rotating outer ring for sci-fi effect */}
        <div className={`absolute inset-0 border border-dashed rounded-full border-gray-600 ${isAnalyzing ? 'animate-[spin_3s_linear_infinite] border-cyan-500' : ''} scale-110 opacity-50`}></div>
        
        <CircularProgressbar
          value={displayScore}
          text={`${displayScore}%`}
          styles={buildStyles({
            textColor: color,
            pathColor: color,
            trailColor: '#111',
            textSize: '22px',
            pathTransitionDuration: isAnalyzing ? 0.1 : 1.5,
          })}
        />
      </div>
      
      <div className="mt-8 text-gray-500 font-mono text-xs tracking-[0.2em] bg-black px-4 py-2 border border-gray-800 rounded">
        SYS_STATUS: <span style={{ color, textShadow: `0 0 10px ${color}` }} className={`font-bold ml-2 ${isAnalyzing ? 'animate-pulse' : ''}`}>
          [{statusLabel}]
        </span>
      </div>
    </div>
  );
};

export default TruthMeter;