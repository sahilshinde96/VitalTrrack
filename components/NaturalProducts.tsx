
import React, { useState } from 'react';
import { SAMPLE_PRODUCTS } from '../constants';
import { Leaf, ArrowRight, ShieldCheck, Search, Sparkles, RefreshCcw } from 'lucide-react';
import { getEcoAlternative } from '../services/geminiService';
import { ProductRecommendation } from '../types';

const NaturalProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResult, setAiResult] = useState<Partial<ProductRecommendation> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    const result = await getEcoAlternative(searchQuery);
    setAiResult(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <div className="hud-card p-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-sky-100 text-glow">Eco-Friendly Alternatives</h2>
          <p className="text-slate-400">Safer, natural personal care products to replace chemical-heavy items.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full pulse-glow relative z-10" style={{
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1.5px solid rgba(16, 185, 129, 0.4)',
          color: '#6ee7b7'
        }}>
          <ShieldCheck size={18} className="icon-glow" />
          Verified Safer Choices
        </div>
      </div>

      {/* AI Alternative Search */}
      <section className="hud-card-elevated p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center relative z-10">
            <h3 className="text-lg font-bold text-sky-100 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="text-emerald-400 icon-glow" size={20} />
              Find a Natural Alternative
            </h3>
            <p className="text-sm text-slate-400">Enter any product name to see its eco-friendly swap.</p>
          </div>

          <form onSubmit={handleSearch} className="relative z-10">
            <input 
              type="text"
              placeholder="e.g. Bleach, Conventional Shampoo, Plastic Loofah..."
              className="w-full pl-5 pr-32 py-4 border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ backdropFilter: 'blur(10px)' }}
            />
            <button 
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="absolute right-2 top-2 bottom-2 px-6 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 text-white icon-glow"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
              }}
            >
              {isLoading ? <RefreshCcw size={18} className="animate-spin" /> : <Search size={18} />}
              {isLoading ? 'Thinking...' : 'Analyze'}
            </button>
          </form>

          {aiResult && (
            <div className="mt-8 animate-slideDown p-6 hud-card-elevated rounded-2xl flex flex-col md:flex-row items-center gap-6 pulse-glow" style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))',
              borderColor: 'rgba(16, 185, 129, 0.4)'
            }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0 icon-glow" style={{
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <Leaf size={32} />
              </div>
              <div className="flex-1 text-center md:text-left relative z-10">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-slate-400">
                  <span className="text-xs line-through">{aiResult.name}</span>
                  <ArrowRight size={12} />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{aiResult.category}</span>
                </div>
                <h4 className="text-xl font-black text-sky-100 mb-2">{aiResult.alternative}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{aiResult.description}</p>
              </div>
              <button 
                onClick={() => setAiResult(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-widest relative z-10"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="pt-4">
        <h3 className="text-lg font-bold text-sky-100 mb-6 flex items-center gap-2">
          <Leaf className="text-emerald-400 icon-glow" size={20} />
          Common Daily Swaps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_PRODUCTS.map((product) => (
            <div key={product.id} className="hud-card-elevated rounded-3xl overflow-hidden group">
              <div className="h-48 relative overflow-hidden" style={{ background: 'rgba(14, 165, 233, 0.05)' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{
                  background: 'rgba(16, 185, 129, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#6ee7b7'
                }}>
                  {product.category}
                </div>
              </div>
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-2 mb-2 text-slate-400">
                  <span className="text-xs line-through">{product.name}</span>
                  <ArrowRight size={12} />
                </div>
                <h3 className="text-lg font-bold text-sky-100 mb-2">{product.alternative}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{product.description}</p>
                <button className="w-full py-3 hud-button font-bold flex items-center justify-center gap-2" style={
                  { background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.15))',
                    borderColor: 'rgba(16, 185, 129, 0.5)'
                  }}>
                  <Leaf size={16} className="icon-glow" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hud-card-elevated p-8 text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto text-emerald-400 icon-glow" style={{
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <Leaf size={32} />
        </div>
        <h3 className="text-xl font-bold text-sky-100 relative z-10">Why Switch?</h3>
        <p className="text-slate-400 text-sm leading-relaxed relative z-10">
          Many conventional personal care products contain endocrine disruptors like phthalates and parabens. Switching to natural, biodegradable alternatives reduces your toxic load and protects our environment.
        </p>
      </div>
    </div>
  );
};

export default NaturalProducts;
