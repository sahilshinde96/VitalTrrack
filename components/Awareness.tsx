
import React, { useState } from 'react';
import { UserProfile, Pamphlet } from '../types';
import { PAMPHLETS } from '../constants';
import { BookOpen, CheckCircle, AlertCircle, HelpCircle, X } from 'lucide-react';

interface AwarenessProps {
  user: UserProfile;
}

const Awareness: React.FC<AwarenessProps> = ({ user }) => {
  const [showPamphletModal, setShowPamphletModal] = useState(false);
  const [selectedPamphlet, setSelectedPamphlet] = useState<Pamphlet | null>(null);

  const handleReadPamphlet = (pamphlet: Pamphlet) => {
    // A simple way to replace the placeholder country
    const finalPamphlet = JSON.parse(JSON.stringify(pamphlet).replace(/\$\{user\.country\}/g, user.country || 'your region'));
    setSelectedPamphlet(finalPamphlet);
    setShowPamphletModal(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="hud-card p-6">
        <h2 className="text-2xl font-bold text-sky-100 text-glow relative z-10">Wellness Education</h2>
        <p className="text-slate-400 relative z-10">Preventive care and traditional health wisdom for {user.country}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hud-card-elevated p-6 pulse-glow" style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.08))',
          borderColor: 'rgba(16, 185, 129, 0.4)'
        }}>
          <h3 className="font-bold text-emerald-300 mb-4 flex items-center gap-2 relative z-10">
            <CheckCircle size={20} className="text-emerald-400 icon-glow" /> Goal Do's
          </h3>
          <ul className="space-y-3 relative z-10">
            {[
              "Prioritize whole foods over processed snacks.",
              "Stick to a consistent sleep schedule even on weekends.",
              "Stay hydrated throughout the day, not just during meals.",
              "Include mindful breathing for at least 5 minutes daily."
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-slate-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0 icon-glow" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="hud-card-elevated p-6 pulse-glow" style={{
          background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.12), rgba(249, 115, 22, 0.08))',
          borderColor: 'rgba(251, 146, 60, 0.4)'
        }}>
          <h3 className="font-bold text-orange-300 mb-4 flex items-center gap-2 relative z-10">
            <AlertCircle size={20} className="text-orange-400 icon-glow" /> Goal Don'ts
          </h3>
          <ul className="space-y-3 relative z-10">
            {[
              "Don't ignore persistent body aches or mental burnout.",
              "Avoid screen time at least 45 minutes before bedtime.",
              "Don't rely solely on supplements without real food nutrients.",
              "Avoid long periods of sedentary behavior without movement."
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-slate-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0 icon-glow" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hud-card-elevated p-8">
        <h3 className="text-xl font-bold text-sky-100 mb-6 flex items-center gap-3 relative z-10">
          <div className="p-2 rounded-xl text-indigo-400 icon-glow" style={{
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            <BookOpen size={24} />
          </div>
          Preventive Awareness Pamphlets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {PAMPHLETS.map((item, i) => (
            <div key={i} 
                 onClick={() => handleReadPamphlet(item)}
                 className="hud-glass p-6 rounded-2xl group cursor-pointer transition-all"
                 style={{
                   background: ['rgba(59, 130, 246, 0.1)', 'rgba(168, 85, 247, 0.1)', 'rgba(236, 72, 153, 0.1)'][i % 3],
                   borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(168, 85, 247, 0.3)', 'rgba(236, 72, 153, 0.3)'][i % 3]
                 }}>
              <h4 className="font-bold text-sky-100 mb-2 group-hover:text-sky-300 transition-colors">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.description.replace(/\$\{user\.country\}/g, user.country || 'your region')}</p>
              <button className="text-xs font-bold text-indigo-400 flex items-center gap-1 icon-glow">
                Read Pamphlet <HelpCircle size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {showPamphletModal && selectedPamphlet && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn p-4">
          <div className="hud-card-elevated w-full max-w-2xl max-h-[90vh] rounded-2xl p-8 relative flex flex-col">
            <button onClick={() => setShowPamphletModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-sky-100 text-glow mb-2">{selectedPamphlet.title}</h2>
            <p className="text-slate-400 mb-6">{selectedPamphlet.description}</p>
            
            <div className="overflow-y-auto space-y-6 pr-4 -mr-4">
              {selectedPamphlet.content.map((section, i) => (
                <div key={i}>
                  <h3 className="font-bold text-emerald-300 mb-3 text-lg">{section.heading}</h3>
                  <ul className="space-y-2">
                    {section.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Awareness;
