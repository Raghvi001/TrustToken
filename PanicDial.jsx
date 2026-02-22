import ReactSpeedometer from "react-d3-speedometer";

const PanicDial = ({ score = 6 }) => {
  const getLabel = (val) => {
    if (val <= 3) return { text: 'CALM', color: '#22c55e' };
    if (val <= 7) return { text: 'EMOTIONAL', color: '#eab308' };
    return { text: 'PANIC', color: '#ef4444' };
  };

  const status = getLabel(score);

  return (
    <div className="flex flex-col items-center justify-between bg-gray-950/80 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-xl p-6 w-full backdrop-blur-md transition-all duration-500 hover:scale-[1.02]">
      <h2 className="text-purple-400 text-lg font-bold mb-4 tracking-widest uppercase">Panic Dial</h2>
      <div className="h-32 flex items-center justify-center">
        <ReactSpeedometer
          maxValue={10}
          value={score}
          needleColor="#ffffff"
          startColor="#22c55e"
          segments={3}
          endColor="#ef4444"
          textColor="#ffffff"
          height={150}
          ringWidth={15}
        />
      </div>
      <div className="mt-4 text-gray-400 font-mono text-sm tracking-widest">
        LEVEL: <span style={{ color: status.color, textShadow: `0 0 10px ${status.color}` }} className="font-bold">
          {status.text}
        </span>
      </div>
    </div>
  );
};

export default PanicDial;