
import React, { useState } from 'react';
import { ExperienceTip, UserProfile } from '../types';
import { TIP_CATEGORIES } from '../constants';
import { vibeCheckTip } from '../services/geminiService';
import { MessageSquare, ThumbsUp, Plus, Search, Zap, Award } from 'lucide-react';

interface CommunityExperienceProps {
  user: UserProfile | null;
}

const CommunityExperience: React.FC<CommunityExperienceProps> = ({ user }) => {
  const [tips, setTips] = useState<ExperienceTip[]>([
    {
      id: '1',
      userName: 'Alice M.',
      category: 'Headache',
      tip: 'I found that doing 2 minutes of chin tucks and drinking 500ml of electrolyte water immediately helps cut the tension by half.',
      relatability: 24,
      timestamp: '2h ago',
      replies: []
    },
    {
      id: '2',
      userName: 'John D.',
      category: 'Fatigue',
      tip: 'Instead of just sitting, I started doing "cat-cow" stretches every morning for 5 mins. The stiffness is gone after a week of consistency!',
      relatability: 15,
      timestamp: '5h ago',
      replies: []
    },
    {
      id: '3',
      userName: 'Sriya K.',
      category: 'Stress',
      tip: 'I swapped my 3 PM coffee for a 10-minute power nap or a cold face splash. My focus is way better now.',
      relatability: 42,
      timestamp: '1d ago',
      replies: []
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTip, setNewTip] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(TIP_CATEGORIES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handlePostTip = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const isSafe = await vibeCheckTip(newTip);

    setIsLoading(false);

    if (!isSafe) {
      alert("Our AI Coach has flagged this tip as potentially unsafe or not supportive. Please revise your tip to be more encouraging and avoid giving medical advice.");
      return;
    }

    const newEntry: ExperienceTip = {
      id: Date.now().toString(),
      userName: 'You',
      category: selectedCategory,
      tip: newTip,
      relatability: 0,
      timestamp: 'Just now'
    };
    setTips([newEntry, ...tips]);
    setNewTip('');
    setSelectedCategory(TIP_CATEGORIES[0]);
    setIsAdding(false);
  };

  const handleRelatabilityClick = (id: string) => {
    setTips(tips.map(tip => tip.id === id ? { ...tip, relatability: tip.relatability + 1 } : tip));
  };

  const handleReplySubmit = async (tipId: string) => {
    if (!replyContent) return;

    setIsLoading(true);
    const isSafe = await vibeCheckTip(replyContent);
    setIsLoading(false);

    if (!isSafe) {
      alert("Our AI Coach has flagged this reply as potentially unsafe or not supportive. Please revise your reply.");
      return;
    }

    const newReply: ExperienceTip = {
      id: Date.now().toString(),
      userName: 'You',
      category: '', // Not needed for replies
      tip: replyContent,
      relatability: 0,
      timestamp: 'Just now'
    };

    setTips(tips.map(tip => 
      tip.id === tipId 
        ? { ...tip, replies: [...(tip.replies || []), newReply] } 
        : tip
    ));

    setReplyContent('');
    setReplyingTo(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="hud-card p-6">
        <h2 className="text-2xl font-bold text-sky-100 text-glow mb-4">Your Momentum</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="hud-glass p-4 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-2">
              <Zap size={18} className="text-yellow-400 icon-glow" />
              <span className="text-3xl font-bold text-yellow-300 text-glow">{user?.streaks?.active || 0}</span>
            </div>
            <p className="text-xs text-slate-400 font-bold">Active Days Streak</p>
            <p className="text-xs text-yellow-400 mt-2">Top 15% Globally (mocked)</p>
          </div>
          <div className="hud-glass p-4 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-2">
              <Award size={18} className="text-green-400 icon-glow" />
              <span className="text-3xl font-bold text-green-300 text-glow">{user?.streaks?.headacheFree || 0}</span>
            </div>
            <p className="text-xs text-slate-400 font-bold">Headache-Free Streak</p>
            <p className="text-xs text-green-400 mt-2">Top 20% Globally (mocked)</p>
          </div>
          <div className="hud-glass p-4 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-bold text-sky-300 text-glow">#5</span>
            </div>
            <p className="text-xs text-slate-400 font-bold">Overall Rank</p>
             <p className="text-xs text-sky-400 mt-2">Global Leaderboard (mocked)</p>
          </div>
        </div>
      </div>
      
      <div className="hud-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-sky-100 text-glow">Community Experience</h2>
          <p className="text-slate-400">Crowdsourced tips for better wellness.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all text-white icon-glow relative z-10"
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
          }}
        >
          <Plus size={18} />
          {isAdding ? 'Close' : 'Share a Tip'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handlePostTip} className="hud-card-elevated p-6 animate-slideDown">
          <div className="space-y-4 relative z-10">
            <div>
              <label className="block text-sm font-bold text-sky-300 mb-1">Category</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ backdropFilter: 'blur(10px)' }}
              >
                {TIP_CATEGORIES.map(cat => <option key={cat} style={{ background: '#0f172a' }}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-sky-300 mb-1">Experience Tip (Max 250 chars)</label>
              <textarea 
                placeholder="Share your experience..."
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all h-24"
                value={newTip}
                onChange={e => setNewTip(e.target.value)}
                maxLength={250}
                required
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </div>
            <button type="submit" className="w-full py-3 hud-button font-bold" disabled={isLoading} style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))',
              borderColor: 'rgba(16, 185, 129, 0.6)'
            }}>
              {isLoading ? 'Checking Tip...' : 'Post Tip'}
            </button>
          </div>
        </form>
      )}

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400">
          <Search size={18} className="icon-glow" />
        </div>
        <input 
          type="text" 
          placeholder="Search for tips (e.g. headaches, sleep, energy)..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
          style={{ backdropFilter: 'blur(10px)' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.sort((a, b) => b.relatability - a.relatability).map((tip, index) => (
          <div key={tip.id} className="hud-card-elevated p-6 relative">
            {index < 2 && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                Pinned
              </div>
            )}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs icon-glow" style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#6ee7b7'
                }}>
                  {tip.userName.charAt(0)}
                </div>
                <span className="font-bold text-sky-100 text-sm">{tip.userName}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">{tip.timestamp}</span>
            </div>
            <h3 className="text-lg font-black text-sky-100 mb-2 relative z-10">{tip.category}</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic relative z-10">
              "{tip.tip}"
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <button 
                onClick={() => handleRelatabilityClick(tip.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <ThumbsUp size={16} />
                <span className="text-xs font-bold">{tip.relatability} Relatable</span>
              </button>
              <button 
                onClick={() => setReplyingTo(replyingTo === tip.id ? null : tip.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare size={16} />
                <span className="text-xs font-bold">Reply</span>
              </button>
            </div>

            {replyingTo === tip.id && (
              <div className="mt-4 space-y-2">
                <textarea
                  placeholder="Write a reply..."
                  className="w-full px-3 py-2 rounded-lg border border-sky-500/30 bg-slate-800/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <button 
                  onClick={() => handleReplySubmit(tip.id)}
                  className="px-3 py-1 text-xs font-bold text-white rounded-md bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
                  disabled={isLoading || !replyContent}
                >
                  {isLoading ? 'Submitting...' : 'Submit Reply'}
                </button>
              </div>
            )}

            {tip.replies && tip.replies.length > 0 && (
              <div className="mt-4 pl-6 border-l-2 border-slate-700 space-y-4">
                {tip.replies.map(reply => (
                  <div key={reply.id} className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sky-200">{reply.userName}</span>
                      <span className="text-xs text-slate-500">{reply.timestamp}</span>
                    </div>
                    <p className="text-slate-300 italic">"{reply.tip}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityExperience;
