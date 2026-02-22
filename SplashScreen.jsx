import logo from "../assets/logo.png";

const SplashScreen = ({ isFading }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-cyan-400 ${
        isFading ? "animate-fade-out-blur" : ""
      }`}
    >

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] animate-pan-grid"></div>

      <div className="relative z-10 flex flex-col items-center">

        {/* LOGO */}
        <div className="w-32 h-32 mb-8 animate-logo-pulse-glow">
          <img
            src={logo}
            alt="Trust Token Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* TEXT */}
        <div className="font-mono text-sm tracking-[0.3em] uppercase animate-pulse mb-6 text-cyan-50">
          INITIALIZING TRUST TOKEN...
        </div>

        {/* LOADING BAR */}
        <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 animate-loading-bar-progress"></div>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;