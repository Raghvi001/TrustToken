import React, { useState, useEffect } from "react";
import { Terminal, Loader2, Zap } from "lucide-react";

const ClaimInput = ({ onAnalyze, isAnalyzing, externalClaim = "" }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (externalClaim) {
      setText(externalClaim);
    }
  }, [externalClaim]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isAnalyzing) {
      onAnalyze(text);
    }
  };

  const isImported = Boolean(externalClaim);

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 relative overflow-hidden group">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            isImported
              ? "Claim imported from Trust Token extension"
              : "Enter claim here..."
          }
          disabled={isAnalyzing || isImported}
          className={`w-full border border-zinc-800 rounded-xl p-4 font-mono ${
            isImported ? "opacity-70 cursor-not-allowed" : ""
          }`}
        />

        <button
          type="submit"
          disabled={!text.trim() || isAnalyzing}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Processing
            </>
          ) : (
            <>
              <Zap size={16} /> Verify
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ClaimInput;