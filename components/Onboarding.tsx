
import React, { useState } from 'react';
import { UserProfile, HealthGoal } from '../types';
import { GOAL_DETAILS } from '../constants';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: 25,
    height: 0, // in cm
    weight: 0, // in kg
    country: '',
    city: '',
    state: '',
    goal: HealthGoal.MENTAL_HEALTH,
    streaks: {
      active: 0,
      headacheFree: 0
    },
    incognito: false,
    onboarded: true
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="max-w-md w-full hud-card-elevated p-8">
        <div className="mb-8 relative z-10">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= step 
                ? 'bg-gradient-to-r from-sky-400 to-cyan-400 shimmer' 
                : 'bg-slate-700/50'
              }`} />
            ))}
          </div>
          <h2 className="text-2xl font-bold text-sky-100 text-glow">
            {step === 1 && "Let's start with your profile"}
            {step === 2 && "Where are you located?"}
            {step === 3 && "What's your main goal?"}
          </h2>
          <p className="text-slate-400 mt-1">
            {step === 1 && "Help us personalize your experience with some basic details."}
            {step === 2 && "We'll suggest location-aware insights and recommendations."}
            {step === 3 && "Select the focus area for your health journey."}
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-4 relative z-10">
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">Age</label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">Height (cm)</label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                placeholder="e.g., 175"
                value={formData.height || ''}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                placeholder="e.g., 70"
                value={formData.weight || ''}
                onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 relative z-10">
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">Country</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                placeholder="e.g., United States"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">State</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                placeholder="e.g., California"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-300 mb-1">City</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
                placeholder="e.g., New York"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-3 relative z-10">
            {Object.values(HealthGoal).map((goal) => (
              <button
                key={goal}
                onClick={() => setFormData({ ...formData, goal })}
                className={`w-full p-4 text-left rounded-2xl border-2 transition-all ${
                  formData.goal === goal 
                  ? 'hud-card-elevated pulse-glow' 
                  : 'hud-glass hover:border-sky-400/50'
                }`}
                style={formData.goal === goal ? {
                  borderColor: 'rgba(56, 189, 248, 0.6)'
                } : {}}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div className={`p-2 rounded-lg icon-glow ${formData.goal === goal ? 'text-white' : 'text-slate-400'}`}
                    style={formData.goal === goal ? {
                      background: 'linear-gradient(135deg, #38bdf8, #06b6d4)',
                      boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)'
                    } : {
                      background: 'rgba(56, 189, 248, 0.1)'
                    }}>
                    {(GOAL_DETAILS as any)[goal].icon}
                  </div>
                  <div>
                    <div className={`font-semibold ${formData.goal === goal ? 'text-sky-100' : 'text-slate-300'}`}>{goal}</div>
                    <div className="text-xs text-slate-400 leading-tight">{(GOAL_DETAILS as any)[goal].description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-3 relative z-10">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-slate-300 hud-glass hover:text-sky-300 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 3 ? () => onComplete(formData) : nextStep}
            disabled={
              (step === 1 && (!formData.name || !formData.age || !formData.height || !formData.weight)) ||
              (step === 2 && (!formData.country || !formData.state || !formData.city))
            }
            className="flex-[2] hud-button disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(6, 182, 212, 0.3))',
              borderColor: 'rgba(56, 189, 248, 0.6)'
            }}
          >
            {step === 3 ? "Let's Begin" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
