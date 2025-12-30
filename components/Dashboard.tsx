
import React from 'react';
import { UserProfile, DailyLog } from '../types';
import { GOAL_DETAILS, DEFAULT_GOAL_TARGETS } from '../constants';
import { 
  Footprints, 
  Flame, 
  GlassWater, 
  Moon, 
  Smile, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  logs: DailyLog[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, logs }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayLog = logs.find(l => l.date === today) || {
    date: today, steps: 0, calories: 0, water: 0, sleep: 0, mood: 0
  };

  const targets = (DEFAULT_GOAL_TARGETS as any)[user.goal];
  const progressPercent = Math.min(100, (todayLog.steps / targets.steps) * 100);

  const StatCard = ({ icon: Icon, label, value, target, unit, color }: any) => {
    const percent = Math.min(100, (value / target) * 100);
    return (
      <div className="stat-card-electric p-5">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className={`p-2 rounded-xl ${color} icon-glow`}>
            <Icon size={20} />
          </div>
          <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">{label}</span>
        </div>
        <div className="flex items-baseline gap-1 mb-3 relative z-10">
          <span className="text-2xl font-bold text-sky-100">{value}</span>
          <span className="text-slate-400 text-sm">/ {target} {unit}</span>
        </div>
        <div className="progress-electric">
          <div 
            className="progress-electric-fill" 
            style={{ width: `${percent}%` }} 
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 hud-card p-6">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-sky-100 text-glow">Hello, {user.name}! 👋</h2>
          <p className="text-slate-400">Welcome back to your {user.goal} journey.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl pulse-glow" style={{
          background: 'rgba(14, 165, 233, 0.15)',
          border: '1.5px solid rgba(56, 189, 248, 0.4)'
        }}>
          <span className="icon-glow">{(GOAL_DETAILS as any)[user.goal].icon}</span>
          <span className="font-semibold text-sm text-sky-300">{user.goal}</span>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Footprints} label="Steps" value={todayLog.steps} target={targets.steps} unit="steps" color="text-emerald-500 bg-emerald-50"
        />
        <StatCard 
          icon={Flame} label="Calories" value={todayLog.calories} target={targets.calories} unit="kcal" color="text-orange-500 bg-orange-50"
        />
        <StatCard 
          icon={GlassWater} label="Hydration" value={todayLog.water} target={targets.water} unit="cups" color="text-blue-500 bg-blue-50"
        />
        <StatCard 
          icon={Moon} label="Sleep" value={todayLog.sleep} target={targets.sleep} unit="hrs" color="text-indigo-500 bg-indigo-50"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress & Goals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="hud-card-elevated p-6">
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="font-bold text-sky-100 flex items-center gap-2">
                <TrendingUp size={20} className="text-sky-400 icon-glow" />
                Current Progress Score
              </h3>
              <span className="px-3 py-1 text-xs font-bold rounded-full shimmer" style={{
                background: 'rgba(14, 165, 233, 0.2)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                color: '#38bdf8'
              }}>DAILY UPDATE</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="12" fill="transparent" />
                  <circle cx="80" cy="80" r="70" stroke="url(#gradient)" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * progressPercent) / 100} strokeLinecap="round" className="transition-all duration-1000" style={{
                    filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))'
                  }} />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-sky-100 text-glow">{Math.round(progressPercent)}%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Daily Goal</span>
                </div>
              </div>
              <div className="flex-1 space-y-4 w-full">
                <div className="hud-glass flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="p-2 rounded-lg icon-glow" style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
                    }}>
                      <Award size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-sky-100">Keep it up!</div>
                      <div className="text-xs text-slate-400">You're almost at your daily step goal.</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-sky-400" />
                </div>
                <div className="hud-glass flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="p-2 rounded-lg icon-glow" style={{
                      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
                    }}>
                      <Smile size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-sky-100">Mood Tracking</div>
                      <div className="text-xs text-slate-400">Consistency leads to mental clarity.</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-sky-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          <div className="hud-card-elevated p-6 pulse-glow" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))',
            borderColor: 'rgba(16, 185, 129, 0.4)'
          }}>
            <h3 className="font-bold text-lg mb-2 text-emerald-300 relative z-10">Regional Tip</h3>
            <p className="text-slate-300 text-sm mb-4 relative z-10">
              Based on your location ({user.country}), try adding more seasonal greens to your diet this week to boost your immunity!
            </p>
            <button className="hud-button text-xs relative z-10">
              Learn More
            </button>
          </div>

          <div className="hud-card p-6">
            <h3 className="font-bold text-sky-100 mb-4 relative z-10">Quick Log</h3>
            <div className="space-y-3 relative z-10">
              <div className="hud-glass flex items-center justify-between p-3 cursor-pointer">
                <span className="text-sm font-medium text-slate-300 relative z-10">Track Water</span>
                <GlassWater size={18} className="text-blue-400 icon-glow" />
              </div>
              <div className="hud-glass flex items-center justify-between p-3 cursor-pointer">
                <span className="text-sm font-medium text-slate-300 relative z-10">Mood Check-in</span>
                <Smile size={18} className="text-orange-400 icon-glow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
