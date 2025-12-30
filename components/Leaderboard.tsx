import React from 'react';
import { Crown, Zap, Shield } from 'lucide-react';

const MOCK_LEADERBOARD = [
  { id: '1', name: 'ZenMaster', avatar: '🧘', streak: 124, streakType: 'Active' },
  { id: '2', name: 'CardioKing', avatar: '🏃', streak: 98, streakType: 'Active' },
  { id: '3', name: 'Sara', avatar: '👩', streak: 75, streakType: 'Headache-Free' },
  { id: '4', name: 'Mike', avatar: '👨', streak: 60, streakType: 'Active' },
  { id: '5', name: 'You', avatar: '👤', streak: 5, streakType: 'Active', isCurrentUser: true }
].sort((a, b) => b.streak - a.streak);

const Leaderboard: React.FC = () => {
  return (
    <div className="hud-card-elevated p-6">
      <h3 className="text-xl font-bold text-sky-100 text-glow mb-4">Streak Standings</h3>
      <div className="space-y-4">
        {MOCK_LEADERBOARD.map((user, index) => (
          <div 
            key={user.id} 
            className={`flex items-center justify-between p-3 rounded-2xl transition-all ${user.isCurrentUser ? 'hud-card-elevated pulse-glow' : 'hud-glass'}`}
            style={user.isCurrentUser ? { borderColor: 'rgba(56, 189, 248, 0.6)' } : {}}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-sky-300 w-6">#{index + 1}</span>
              <span className="text-3xl">{user.avatar}</span>
              <div>
                <p className="font-bold text-sky-100">{user.name}</p>
                <p className="text-xs text-slate-400">{user.streakType} Streak</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 font-bold text-yellow-400 text-glow">
                <Zap size={16} />
                <span>{user.streak} Days</span>
              </div>
              {!user.isCurrentUser && (
                <button 
                  onClick={() => alert(`Nudged ${user.name} to keep their streak going!`)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-200 mt-1"
                >
                  Nudge
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
