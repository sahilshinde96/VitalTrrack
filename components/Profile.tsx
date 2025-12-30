
import React from 'react';
import { UserProfile, DailyLog, HealthGoal } from '../types';
import { GOAL_DETAILS } from '../constants';
import { User, Settings, History, ChevronRight, LogOut, Trash2 } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  setUser: (user: UserProfile | null) => void;
  logs: DailyLog[];
}

const Profile: React.FC<ProfileProps> = ({ user, setUser, logs }) => {
  const handleReset = () => {
    if (window.confirm("Are you sure? This will delete all your local tracking history.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const totalLogs = logs.length;
  const avgSteps = totalLogs > 0 ? Math.round(logs.reduce((acc, l) => acc + l.steps, 0) / totalLogs) : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="hud-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-sky-100 text-glow relative z-10">Your Profile</h2>
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-colors relative z-10"
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1.5px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5'
          }}
        >
          <Trash2 size={14} className="icon-glow" />
          Reset All Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="hud-card-elevated p-8 text-center">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden relative z-10" style={{
            border: '3px solid rgba(56, 189, 248, 0.4)',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)'
          }}>
            <img src={`https://picsum.photos/seed/${user.name}/200`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold text-sky-100 relative z-10">{user.name}</h3>
                     <p className="text-sm text-slate-400 mb-6 relative z-10">{user.age} years old • {user.country}</p>          
          <div className="p-4 rounded-2xl mb-8 pulse-glow relative z-10" style={{
            background: 'rgba(14, 165, 233, 0.15)',
            border: '1.5px solid rgba(56, 189, 248, 0.4)'
          }}>
            <div className="flex items-center justify-center gap-2 mb-1 text-sky-300">
              <span className="icon-glow">{(GOAL_DETAILS as any)[user.goal].icon}</span>
              <span className="font-bold text-sm">{user.goal}</span>
            </div>
            <p className="text-[10px] font-bold uppercase text-slate-500">Current Mission</p>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="hud-glass p-4 rounded-2xl">
              <div className="text-lg font-bold text-sky-100">{totalLogs}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Days Active</div>
            </div>
            <div className="hud-glass p-4 rounded-2xl">
              <div className="text-lg font-bold text-sky-100">{avgSteps}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Steps</div>
            </div>
          </div>
        </div>

        {/* History and Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="hud-card-elevated p-6">
            <h3 className="font-bold text-sky-100 mb-6 flex items-center gap-2 relative z-10">
              <History size={20} className="text-emerald-400 icon-glow" /> Recent History
            </h3>
            <div className="space-y-3 relative z-10">
              {logs.slice(-5).reverse().map((log, i) => (
                <div key={i} className="hud-glass flex items-center justify-between p-4 rounded-2xl">
                  <div>
                    <div className="text-sm font-bold text-sky-100">{new Date(log.date).toLocaleDateString()}</div>
                    <div className="text-xs text-slate-400">{log.steps} steps • {log.sleep}h sleep</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{
                    background: log.mood >= 4 ? 'rgba(16, 185, 129, 0.2)' : log.mood <= 2 ? 'rgba(251, 146, 60, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                    border: `1px solid ${log.mood >= 4 ? 'rgba(16, 185, 129, 0.4)' : log.mood <= 2 ? 'rgba(251, 146, 60, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`
                  }}>
                    {log.mood === 1 && '😫'}
                    {log.mood === 2 && '😔'}
                    {log.mood === 3 && '😐'}
                    {log.mood === 4 && '😊'}
                    {log.mood === 5 && '🤩'}
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="text-center py-8 text-slate-400 italic text-sm relative z-10">No activity history yet.</div>
              )}
            </div>
          </div>

          <div className="hud-card-elevated p-6">
            <h3 className="font-bold text-sky-100 mb-6 flex items-center gap-2 relative z-10">
              <Settings size={20} className="text-slate-400 icon-glow" /> Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
              <button className="hud-glass flex items-center justify-between p-4 rounded-2xl transition-colors">
                <span className="text-sm font-medium text-slate-300">Export Wellness Report (PDF)</span>
                <ChevronRight size={16} className="text-sky-400" />
              </button>
              <button className="hud-glass flex items-center justify-between p-4 rounded-2xl transition-colors">
                <span className="text-sm font-medium text-slate-300">Update Health Goals</span>
                <ChevronRight size={16} className="text-sky-400" />
              </button>
              <button className="hud-glass flex items-center justify-between p-4 rounded-2xl transition-colors">
                <span className="text-sm font-medium text-slate-300">Regional Language Support</span>
                <ChevronRight size={16} className="text-sky-400" />
              </button>
              <button className="hud-glass flex items-center justify-between p-4 rounded-2xl transition-colors">
                <span className="text-sm font-medium text-slate-300">Privacy & Data Shield</span>
                <ChevronRight size={16} className="text-sky-400" />
              </button>
              <button 
                onClick={() => setUser({ ...user, incognito: !user.incognito })}
                className="hud-glass flex items-center justify-between p-4 rounded-2xl transition-colors"
              >
                <span className="text-sm font-medium text-slate-300">Incognito Mode</span>
                <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${user.incognito ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                  <span className={`h-5 w-5 bg-white rounded-full transition-transform ${user.incognito ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
