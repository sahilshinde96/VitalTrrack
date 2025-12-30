
import React, { useState, useEffect } from 'react';
import { UserProfile, DailyLog } from '../types';
import { getReportInsights } from '../services/geminiService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { FileText, Sparkles, RefreshCcw } from 'lucide-react';

interface ReportsProps {
  user: UserProfile;
  logs: DailyLog[];
}

const Reports: React.FC<ReportsProps> = ({ user, logs }) => {
  const [insights, setInsights] = useState<string>('Log at least 3 days of data to generate personalized AI insights.');
  const [loading, setLoading] = useState(false);

  // Take last 7 days for the chart
  const last7Days = logs.slice(-7);
  
  const generateInsights = async () => {
    if (logs.length < 3) {
      setInsights("Not enough data. Please log at least 3 days to generate insights.");
      return;
    }
    setLoading(true);
    const result = await getReportInsights(user, logs);
    setInsights(result);
    setLoading(false);
  };

  useEffect(() => {
    generateInsights();
  }, [logs]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="hud-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-sky-100 text-glow">Health Reports</h2>
          <p className="text-slate-400">Visualizing your progress over the last week.</p>
        </div>
        <button 
          onClick={generateInsights}
          disabled={loading}
          className="hud-button flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <RefreshCcw className="animate-spin icon-glow" size={16} /> : <Sparkles size={16} className="icon-glow" />}
          Recalculate AI Insights
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Step Progression */}
        <div className="hud-card-elevated p-6">
          <h3 className="font-bold text-sky-100 mb-6 relative z-10">Step Activity</h3>
          <div className="h-64 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7Days}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(56, 189, 248, 0.1)" />
                <XAxis dataKey="date" tick={{fontSize: 10, fill: '#94a3b8'}} tickFormatter={(val) => val.split('-').slice(1).join('/')} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid rgba(56, 189, 248, 0.3)', 
                    background: 'rgba(14, 165, 233, 0.15)',
                    backdropFilter: 'blur(12px)',
                    color: '#e2e8f0'
                  }} 
                  cursor={{fill: 'rgba(56, 189, 248, 0.1)'}}
                />
                <Bar dataKey="steps" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={24} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep Quality */}
        <div className="hud-card-elevated p-6">
          <h3 className="font-bold text-sky-100 mb-6 relative z-10">Sleep & Mood Trends</h3>
          <div className="h-64 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last7Days}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(56, 189, 248, 0.1)" />
                <XAxis dataKey="date" tick={{fontSize: 10, fill: '#94a3b8'}} tickFormatter={(val) => val.split('-').slice(1).join('/')} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid rgba(56, 189, 248, 0.3)', 
                    background: 'rgba(14, 165, 233, 0.15)',
                    backdropFilter: 'blur(12px)',
                    color: '#e2e8f0'
                  }} 
                />
                <Line type="monotone" dataKey="sleep" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#818cf8' }} filter="drop-shadow(0 0 4px #6366f1)" />
                <Line type="monotone" dataKey="mood" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fbbf24' }} filter="drop-shadow(0 0 4px #f59e0b)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4 justify-center relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
              <div className="w-2 h-2 rounded-full bg-indigo-400 icon-glow" /> Sleep (Hrs)
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <div className="w-2 h-2 rounded-full bg-amber-400 icon-glow" /> Mood (Level)
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="hud-card-elevated p-8 pulse-glow" style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.08))',
        borderColor: 'rgba(16, 185, 129, 0.4)'
      }}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl shadow-lg text-emerald-400 icon-glow" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.15))',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <Sparkles size={24} />
          </div>
          <div className="flex-1 relative z-10">
            <h3 className="text-xl font-bold text-emerald-300 mb-3 flex flex-wrap items-center gap-2">
              AI Health Intelligence
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter shimmer" style={{
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#6ee7b7'
              }}>Powered by Gemini</span>
            </h3>
            {loading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 rounded w-full" style={{ background: 'rgba(16, 185, 129, 0.2)' }} />
                <div className="h-4 rounded w-5/6" style={{ background: 'rgba(16, 185, 129, 0.2)' }} />
                <div className="h-4 rounded w-4/6" style={{ background: 'rgba(16, 185, 129, 0.2)' }} />
              </div>
            ) : (
              <div className="prose prose-emerald max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                {insights || "Log at least 3 days of data to generate personalized AI insights."}
              </div>
            )}
            <div className="mt-6 p-4 hud-glass rounded-2xl flex items-center gap-3 text-sm text-slate-400">
              <FileText size={18} className="text-emerald-400 icon-glow" />
              This report is for educational purposes only and is not a medical diagnosis.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
