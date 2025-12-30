
import React, { useState } from 'react';
import { DailyLog, UserProfile } from '../types';
import { 
  Save, 
  Calendar,
  Footprints,
  Flame,
  Droplets,
  Moon,
  Smile
} from 'lucide-react';

interface DailyTrackerProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  logs: DailyLog[];
  onLogSubmit: (log: DailyLog) => void;
}

const DailyTracker: React.FC<DailyTrackerProps> = ({ user, setUser, logs, onLogSubmit }) => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  
  const existingLog = logs.find(l => l.date === selectedDate);
  const [formData, setFormData] = useState<DailyLog>(existingLog || {
    date: selectedDate,
    steps: 0,
    calories: 0,
    water: 0,
    sleep: 0,
    mood: 3
  });

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const log = logs.find(l => l.date === date);
    setFormData(log || {
      date: date,
      steps: 0,
      calories: 0,
      water: 0,
      sleep: 0,
      mood: 3
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogSubmit(formData);
    
    // Simplified streak update: increments every time a log is saved.
    // A real implementation should check for consecutive days.
    if (user) {
      setUser({
        ...user,
        streaks: {
          ...user.streaks,
          active: (user.streaks?.active || 0) + 1
        }
      });
    }

    alert('Log saved successfully! Your active streak has increased.');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="hud-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-sky-100 text-glow">Daily Health Journal</h2>
          <p className="text-slate-400">Tracking daily habits is the first step to change.</p>
        </div>
        <div className="hud-glass flex items-center gap-2 px-4 py-2 rounded-2xl">
          <Calendar size={18} className="text-sky-400 icon-glow" />
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => handleDateChange(e.target.value)}
            className="text-sm font-semibold outline-none bg-transparent text-sky-100"
            style={{ colorScheme: 'dark' }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hud-card-elevated p-6 space-y-6">
          <h3 className="font-bold text-sky-100 mb-4 flex items-center gap-2 relative z-10">
            <Footprints size={20} className="text-emerald-400 icon-glow" /> Activity & Energy
          </h3>
          
          <div className="space-y-4 relative z-10">
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">Steps Taken</label>
              <input 
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                value={formData.steps}
                onChange={(e) => setFormData({...formData, steps: parseInt(e.target.value) || 0})}
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">Calories Consumed (kcal)</label>
              <input 
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                value={formData.calories}
                onChange={(e) => setFormData({...formData, calories: parseInt(e.target.value) || 0})}
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">Water Intake (Glasses)</label>
              <div className="flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormData({...formData, water: num})}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                      formData.water >= num 
                      ? 'text-white icon-glow' 
                      : 'bg-slate-800/50 text-slate-500 border border-sky-500/20'
                    }`}
                    style={formData.water >= num ? {
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
                    } : {}}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hud-card-elevated p-6 space-y-6">
          <h3 className="font-bold text-sky-100 mb-4 flex items-center gap-2 relative z-10">
            <Moon size={20} className="text-indigo-400 icon-glow" /> Rest & Mindfulness
          </h3>
          
          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">Sleep Duration (Hours)</label>
              <input 
                type="range" min="0" max="12" step="0.5"
                className="w-full accent-sky-500"
                value={formData.sleep}
                onChange={(e) => setFormData({...formData, sleep: parseFloat(e.target.value)})}
                style={{
                  background: `linear-gradient(to right, #38bdf8 0%, #38bdf8 ${(formData.sleep / 12) * 100}%, rgba(56, 189, 248, 0.1) ${(formData.sleep / 12) * 100}%, rgba(56, 189, 248, 0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0h</span>
                <span className="text-sky-400 font-bold text-glow">{formData.sleep}h</span>
                <span>12h</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">Energy / Mood Level</label>
              <div className="flex justify-between items-center gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFormData({...formData, mood: val})}
                    className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
                      formData.mood === val 
                      ? 'hud-card-elevated pulse-glow scale-105' 
                      : 'hud-glass'
                    }`}
                    style={formData.mood === val ? {
                      borderColor: 'rgba(56, 189, 248, 0.6)'
                    } : {}}
                  >
                    <span className="text-2xl relative z-10">
                      {val === 1 && '😫'}
                      {val === 2 && '😔'}
                      {val === 3 && '😐'}
                      {val === 4 && '😊'}
                      {val === 5 && '🤩'}
                    </span>
                    <span className={`text-[10px] font-bold relative z-10 ${formData.mood === val ? 'text-sky-300' : 'text-slate-500'}`}>Level {val}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-4 hud-button font-bold flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.3))',
              borderColor: 'rgba(16, 185, 129, 0.6)'
            }}
          >
            <Save size={20} className="icon-glow" />
            Save Today's Metrics
          </button>
        </div>
      </form>
    </div>
  );
};

export default DailyTracker;
