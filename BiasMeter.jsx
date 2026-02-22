import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const BiasMeter = ({ score = 0 }) => {
  return (
    <div className="flex flex-col items-center justify-between bg-gray-950/80 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] rounded-xl p-6 w-full backdrop-blur-md transition-all duration-500 hover:scale-[1.02]">
      <h2 className="text-cyan-400 text-lg font-bold mb-8 tracking-widest uppercase">Bias Meter</h2>
      <div className="w-full px-6 mb-4">
        <Slider
          min={-1}
          max={1}
          step={0.1}
          value={score}
          marks={{
            '-1': { style: { color: '#60a5fa', fontFamily: 'monospace', fontSize: '10px' }, label: 'LEFT' },
            '0': { style: { color: '#9ca3af', fontFamily: 'monospace', fontSize: '10px' }, label: 'NEUTRAL' },
            '1': { style: { color: '#f87171', fontFamily: 'monospace', fontSize: '10px' }, label: 'RIGHT' }
          }}
          trackStyle={{ backgroundColor: '#06b6d4', height: 6 }}
          handleStyle={{
            borderColor: '#ffffff',
            backgroundColor: '#06b6d4',
            width: 16,
            height: 16,
            marginTop: -5,
            boxShadow: '0 0 10px rgba(6,182,212,0.8)'
          }}
          railStyle={{ backgroundColor: '#1f2937', height: 6 }}
        />
      </div>
    </div>
  );
};

export default BiasMeter;