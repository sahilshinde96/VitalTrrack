import React, { useEffect, useState } from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import Leaderboard from './Leaderboard';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; left: string; top: string; delay: string }>
  >([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = [];
      for (let i = 0; i < 20; i++) {
        newSparkles.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          delay: `${Math.random() * 3}s`,
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 8000);
    return () => clearInterval(interval);
  }, []);

  const isCommunityTab = activeTab === 'community-experience';

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">

      {/* Sparkle Layer */}
      <div className="sparkle-container" />

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 hud-sidebar sticky top-0 h-screen z-10">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-3">

            {/* ✅ CLEAN, SHARP VT LOGO */}
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center select-none"
              style={{
                background: '#0f172a', // solid navy
                border: '2px solid #38bdf8', // sky blue border
              }}
            >
              <span
                className="text-white font-extrabold"
                style={{
                  fontSize: '0.85rem',
                  lineHeight: '1',
                }}
              >
                VT
              </span>
            </span>

            <span className="text-sky-100 tracking-wide">
              VitalTrack
            </span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 hud-nav-item ${
                activeTab === item.id
                  ? 'hud-nav-item-active text-sky-300'
                  : 'text-slate-400 hover:text-sky-200'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8 relative z-10">
        <div className={`max-w-7xl mx-auto ${isCommunityTab ? 'flex gap-8' : ''}`}>
          <div className={isCommunityTab ? 'flex-grow' : 'w-full'}>
            {children}
          </div>
          {isCommunityTab && (
            <aside className="hidden lg:block w-96 sticky top-8 h-screen">
              <Leaderboard />
            </aside>
          )}
        </div>
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 hud-sidebar border-t border-sky-500/20 flex justify-around p-2 z-50">
        {NAVIGATION_ITEMS.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg ${
              activeTab === item.id ? 'text-sky-400' : 'text-slate-500'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;

