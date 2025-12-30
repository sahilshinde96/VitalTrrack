import React, { useState } from 'react';
import { UserProfile, SymptomAnalysis } from '../types';
import { analyzeSymptoms } from '../services/geminiService';
import {
  Stethoscope,
  AlertTriangle,
  ShieldCheck,
  Activity,
  RefreshCcw,
  Search,
  ChevronRight,
  Info
} from 'lucide-react';

interface EarlyTrackerProps {
  user: UserProfile;
}

const EarlyTracker: React.FC<EarlyTrackerProps> = ({ user }) => {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    const result = await analyzeSymptoms(symptoms, user);
    setAnalysis(result);
    setLoading(false);
  };

  const reset = () => {
    setSymptoms('');
    setAnalysis(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <header className="hud-card p-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-sky-100 text-glow">
            Early Health Risk Awareness
          </h2>
          <p className="text-slate-400">
            Detect potential issues at early stages through symptom awareness.
          </p>
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl"
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1.5px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5'
          }}
        >
          <Info size={18} className="icon-glow" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Non-Diagnostic Tool
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="hud-card-elevated p-6">
            <h3 className="font-bold text-sky-100 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-emerald-400 icon-glow" />
              Describe Your Symptoms
            </h3>

            <p className="text-xs text-slate-400 mb-4">
              Be specific about duration, intensity, and progression.
            </p>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <textarea
                className="w-full h-40 px-4 py-3 rounded-2xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:ring-2 focus:ring-sky-400"
                placeholder="e.g. Persistent fatigue and tingling in fingers for 2 weeks..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading || !symptoms.trim()}
                className="w-full py-4 hud-button font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-white"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)'
                }}
              >
                {loading ? (
                  <RefreshCcw size={20} className="animate-spin" />
                ) : (
                  <Search size={20} />
                )}
                {loading ? 'Analyzing Symptoms...' : 'Run Risk Assessment'}
              </button>
            </form>
          </div>

          <div
            className="hud-card-elevated p-6"
            style={{
              background:
                'linear-gradient(135deg, rgba(251,146,60,0.12), rgba(249,115,22,0.08))',
              borderColor: 'rgba(251,146,60,0.4)'
            }}
          >
            <div className="flex gap-3">
              <AlertTriangle size={20} className="text-amber-400 icon-glow" />
              <p className="text-xs text-slate-300 leading-relaxed">
                This AI tool highlights possible early risks but is not a medical
                diagnosis. Always consult a healthcare professional.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {analysis ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Urgency Card */}
              <div
                className="hud-card-elevated p-6 rounded-2xl pulse-glow"
                style={{
                  borderColor:
                    analysis.urgencyLevel === 'High'
                      ? 'rgba(239, 68, 68, 0.6)'
                      : analysis.urgencyLevel === 'Moderate'
                      ? 'rgba(251, 146, 60, 0.6)'
                      : 'rgba(16, 185, 129, 0.6)',
                }}
              >
                <h3 className="font-bold text-sky-100 mb-2 flex items-center gap-2">
                  <span
                    style={{
                      color:
                        analysis.urgencyLevel === 'High'
                          ? '#f87171'
                          : analysis.urgencyLevel === 'Moderate'
                          ? '#fbb_f24'
                          : '#34d399',
                    }}
                  >
                    {analysis.urgencyLevel === 'High' || analysis.urgencyLevel === 'Moderate' ? (
                      <AlertTriangle size={20} />
                    ) : (
                      <ShieldCheck size={20} />
                    )}
                  </span>
                  Urgency Level: {analysis.urgencyLevel}
                </h3>
                <p className="text-sm text-slate-400">{analysis.summary}</p>
              </div>

              {/* Details Grid */}
              <div className="hud-card-elevated p-6">
                <h3 className="font-bold text-sky-100 mb-4">
                  Potential Concerns
                </h3>
                <ul className="space-y-2">
                  {analysis.potentialConcerns.map((concern, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm">
                      <ChevronRight
                        size={16}
                        className="text-red-400 mt-1 flex-shrink-0"
                      />
                      <span className="text-slate-300">{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hud-card-elevated p-6">
                <h3 className="font-bold text-sky-100 mb-4">
                  Preventive Measures
                </h3>
                <ul className="space-y-2">
                  {analysis.preventiveMeasures.map((measure, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm">
                      <ChevronRight
                        size={16}
                        className="text-emerald-400 mt-1 flex-shrink-0"
                      />
                      <span className="text-slate-300">{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hud-card-elevated p-6">
                <h3 className="font-bold text-sky-100 mb-4">
                  Recommended Professional
                </h3>
                <p className="text-emerald-300 font-semibold">
                  {analysis.recommendedProfessional}
                </p>
              </div>

              <button
                onClick={reset}
                className="w-full mt-4 py-3 hud-button font-bold flex items-center justify-center gap-2"
              >
                <RefreshCcw size={16} />
                Analyze New Symptoms
              </button>
            </div>
          ) : (
            /* 🔥 FIXED HEALTH INTELLIGENCE CARD */
            <div className="hud-card-elevated p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
              <div
                className="p-4 rounded-2xl mb-4"
                style={{
                  background: 'rgba(14,165,233,0.15)',
                  border: '1px solid rgba(14,165,233,0.3)'
                }}
              >
                <Stethoscope size={32} className="text-sky-400 icon-glow" />
              </div>

              <h3 className="font-bold text-sky-100 text-lg">
                Health Intelligence
              </h3>

              <p className="text-sm text-slate-400 max-w-[300px] mt-2">
                Describe your physical or mental symptoms. Our AI analyzes
                patterns to highlight early risks and guide you toward the
                right medical professional.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarlyTracker;
