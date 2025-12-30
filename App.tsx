
import React, { useState, useEffect } from 'react';
import { UserProfile, DailyLog, HealthGoal } from './types';
import { NAVIGATION_ITEMS } from './constants';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import DailyTracker from './components/DailyTracker';
import Reports from './components/Reports';
import Chatbot from './components/Chatbot';
import Awareness from './components/Awareness';
import NaturalProducts from './components/NaturalProducts';
import Profile from './components/Profile';
import Layout from './components/Layout';
import CommunityExperience from './components/CommunityExperience';
import ExerciseGuide from './components/ExerciseGuide';
import CalorieCalculator from './components/CalorieCalculator';
import EarlyTracker from './components/EarlyTracker';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('vitaltrack_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [logs, setLogs] = useState<DailyLog[]>(() => {
    const saved = localStorage.getItem('vitaltrack_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // One-time data migration for existing users
    if (user && (!user.streaks || user.incognito === undefined)) {
      setUser({
        ...user,
        streaks: user.streaks || { active: 0, headacheFree: 0 },
        incognito: user.incognito || false,
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('vitaltrack_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vitaltrack_logs', JSON.stringify(logs));
  }, [logs]);

  const handleOnboarding = (profile: UserProfile) => {
    setUser(profile);
  };

  const handleLogEntry = (newLog: DailyLog) => {
    setLogs(prev => {
      const filtered = prev.filter(l => l.date !== newLog.date);
      return [...filtered, newLog].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  };

  if (!user || !user.onboarded) {
    return <Onboarding onComplete={handleOnboarding} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} logs={logs} />;
      case 'tracking':
        return <DailyTracker user={user} setUser={setUser} logs={logs} onLogSubmit={handleLogEntry} />;
      case 'early-tracker':
        return <EarlyTracker user={user} />;
      case 'exercises':
        return <ExerciseGuide user={user} />;
      case 'calories':
        return <CalorieCalculator />;
      case 'community-experience':
        return <CommunityExperience user={user} />;
      case 'reports':
        return <Reports user={user} logs={logs} />;
      case 'chatbot':
        return <Chatbot user={user} />;
      case 'awareness':
        return <Awareness user={user} />;
      case 'products':
        return <NaturalProducts />;
      case 'profile':
        return <Profile user={user} setUser={setUser} logs={logs} />;
      default:
        return <Dashboard user={user} logs={logs} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
