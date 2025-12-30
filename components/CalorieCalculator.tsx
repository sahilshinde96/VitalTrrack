
import React, { useState, useRef } from 'react';
import { estimateCalories } from '../services/geminiService';
import { CalorieEstimation } from '../types';
import { Utensils, Camera, Upload, Search, RefreshCw, Zap, PieChart } from 'lucide-react';

const CalorieCalculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<CalorieEstimation | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!input && !image) return;
    setLoading(true);
    const estimation = await estimateCalories({
      text: input || undefined,
      imageBase64: image || undefined
    });
    setResult(estimation);
    setLoading(false);
  };

  const reset = () => {
    setInput('');
    setImage(null);
    setResult(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="hud-card p-6">
        <h2 className="text-2xl font-bold text-sky-100 text-glow relative z-10">AI Nutrition Scanner</h2>
        <p className="text-slate-400 relative z-10">Instant calorie and macro estimation using advanced AI vision.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="hud-card-elevated p-6">
            <h3 className="font-bold text-sky-100 mb-4 flex items-center gap-2 relative z-10">
              <Search size={18} className="text-emerald-400 icon-glow" /> Describe or Upload
            </h3>
            
            <div className="space-y-4 relative z-10">
              <textarea
                className="w-full px-4 py-3 rounded-2xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all h-24"
                placeholder="e.g. A bowl of oatmeal with blueberries and honey..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ backdropFilter: 'blur(10px)' }}
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-3 px-4 hud-glass text-slate-300 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Camera size={18} className="icon-glow" />
                  {image ? 'Change Photo' : 'Snap/Upload'}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              {image && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200">
                  <img src={image} alt="Food" className="w-full h-48 object-cover" />
                  <button 
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-red-500 hover:bg-white"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading || (!input && !image)}
                className="w-full py-4 hud-button font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-white icon-glow"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderColor: 'rgba(16, 185, 129, 0.6)'
                }}
              >
                {loading ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
                {loading ? 'Analyzing Meal...' : 'Estimate Nutrition'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {result ? (
            <div className="hud-card-elevated p-8 animate-slideDown pulse-glow" style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.08))',
              borderColor: 'rgba(16, 185, 129, 0.4)'
            }}>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                  <h3 className="text-xl font-bold text-sky-100">{result.foodItem}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full icon-glow" />
                    AI Confidence: {result.confidence}
                  </div>
                </div>
                <div className="p-3 rounded-2xl text-emerald-400 icon-glow" style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <Utensils size={24} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-8 relative z-10">
                <div className="p-6 hud-glass rounded-2xl text-center">
                  <div className="text-4xl font-black text-sky-100">{result.estimatedCalories}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Estimated Calories</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 relative z-10">
                <div className="p-4 hud-glass rounded-2xl" style={{
                  background: 'rgba(251, 146, 60, 0.1)',
                  borderColor: 'rgba(251, 146, 60, 0.3)'
                }}>
                  <div className="text-xs font-bold text-orange-400 uppercase mb-1">Protein</div>
                  <div className="text-sm font-bold text-sky-100">{result.macros.protein}</div>
                </div>
                <div className="p-4 hud-glass rounded-2xl" style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderColor: 'rgba(59, 130, 246, 0.3)'
                }}>
                  <div className="text-xs font-bold text-blue-400 uppercase mb-1">Carbs</div>
                  <div className="text-sm font-bold text-sky-100">{result.macros.carbs}</div>
                </div>
                <div className="p-4 hud-glass rounded-2xl" style={{
                  background: 'rgba(236, 72, 153, 0.1)',
                  borderColor: 'rgba(236, 72, 153, 0.3)'
                }}>
                  <div className="text-xs font-bold text-pink-400 uppercase mb-1">Fats</div>
                  <div className="text-sm font-bold text-sky-100">{result.macros.fats}</div>
                </div>
              </div>

              <div className="mt-8 pt-6 flex items-center justify-between relative z-10" style={{ borderTop: '1px solid rgba(56, 189, 248, 0.1)' }}>
                <p className="text-[10px] text-slate-500 italic">This is an estimation and may vary based on exact portions.</p>
                <button onClick={reset} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Clear Result</button>
              </div>
            </div>
          ) : (
            <div className="hud-glass border-2 border-dashed rounded-3xl h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <div className="w-16 h-16 hud-card-elevated rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                <PieChart size={32} className="icon-glow" />
              </div>
              <h3 className="font-bold text-slate-300">Nutritional Insights</h3>
              <p className="text-sm max-w-[240px] mt-2">Upload a photo of your meal or describe it to see a detailed caloric and macro breakdown.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
