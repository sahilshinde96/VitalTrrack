
import React, { useState, useEffect } from 'react';
import { UserProfile, Exercise } from '../types';
import { GOAL_EXERCISES, GOAL_DETAILS } from '../constants';
import { Dumbbell, Play, Info, Timer, X, Pause, PlayCircle, ChevronsRight } from 'lucide-react';

interface ExerciseGuideProps {
  user: UserProfile;
}

const ExerciseGuide: React.FC<ExerciseGuideProps> = ({ user }) => {
  const exercises = GOAL_EXERCISES[user.goal] || [];
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const parseTime = (reps: string): number => {
    if (reps.includes('min')) {
      return parseInt(reps) * 60;
    }
    if (reps.includes('s')) {
      return parseInt(reps);
    }
    // For rep-based exercises, we can have a default time per rep, e.g., 3 seconds.
    const repCount = parseInt(reps);
    return isNaN(repCount) ? 30 : repCount * 3;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Here you could add a sound or notification
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  const handleStartExercise = (ex: Exercise) => {
    setActiveExercise(ex);
    setCurrentSet(1);
    const initialTime = parseTime(ex.reps);
    setTimer(initialTime);
    setIsTimerRunning(true);
    setShowModal(true);
  };

  const handleNextSet = () => {
    if (activeExercise && currentSet < activeExercise.sets) {
      setCurrentSet(currentSet + 1);
      const time = parseTime(activeExercise.reps);
      setTimer(time);
      setIsTimerRunning(true);
    } else {
      handleStopExercise();
    }
  };
  
  const handleStopExercise = () => {
    setShowModal(false);
    setActiveExercise(null);
    setIsTimerRunning(false);
    setTimer(0);
    setCurrentSet(1);
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="hud-card p-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-sky-100 text-glow">Training Guide</h2>
          <p className="text-slate-400">Curated routines optimized for your goal: <span className="text-emerald-400 font-semibold">{user.goal}</span></p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl pulse-glow relative z-10" style={{
          background: 'rgba(14, 165, 233, 0.15)',
          border: '1.5px solid rgba(56, 189, 248, 0.4)'
        }}>
          <span className="icon-glow">{(GOAL_DETAILS as any)[user.goal].icon}</span>
          <span className="font-bold text-xs uppercase text-sky-300">Level: Intermediate</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exercises.map((ex, i) => (
          <div key={i} className="hud-card-elevated rounded-3xl overflow-hidden flex flex-col group">
            <div className="h-40 flex items-center justify-center relative overflow-hidden" style={{
              background: 'rgba(14, 165, 233, 0.05)'
            }}>
               <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity" style={{
                 background: 'linear-gradient(135deg, #10b981, #059669)'
               }} />
               <Dumbbell size={48} className="text-slate-600 group-hover:text-emerald-400 transition-colors group-hover:scale-110 duration-500 icon-glow" />
            </div>
            <div className="p-6 flex-1 flex flex-col relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md" style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#6ee7b7'
                }}>
                  {ex.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-sky-100 mb-2">{ex.name}</h3>
              <p className="text-xs text-slate-400 mb-6 flex-1">{ex.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Sets</span>
                  <span className="text-lg font-black text-sky-100">{ex.sets}</span>
                </div>
                <div className="h-8 w-px" style={{ background: 'rgba(56, 189, 248, 0.2)' }} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Reps / Time</span>
                  <span className="text-lg font-black text-sky-100">{ex.reps}</span>
                </div>
              </div>

              <button 
                onClick={() => handleStartExercise(ex)}
                className="w-full py-3 hud-button font-bold flex items-center justify-center gap-2" style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.15))',
                borderColor: 'rgba(16, 185, 129, 0.5)'
              }}>
                <Play size={16} className="icon-glow" />
                Start Exercise
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hud-card-elevated p-6 flex items-start gap-4">
        <div className="p-3 rounded-2xl text-blue-400 icon-glow" style={{
          background: 'rgba(59, 130, 246, 0.2)',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <Info size={24} />
        </div>
        <div className="relative z-10">
          <h4 className="font-bold text-sky-100">Coach's Note</h4>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            Consistency is better than intensity. If you can't finish all sets today, focus on maintaining perfect form. These exercises are tailored to support {user.goal === 'Mental Health' ? 'mind-body connection' : user.goal === 'Bulking' ? 'muscle hypertrophy' : 'active recovery'}.
          </p>
        </div>
      </div>

      {showModal && activeExercise && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn p-4">
          <div className="hud-card-elevated w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={handleStopExercise} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-sky-100 text-glow mb-4">{activeExercise.name}</h2>
            
            <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
              {activeExercise.animationUrl ? (
                <video src={activeExercise.animationUrl} autoPlay loop muted playsInline className="w-full h-full object-contain" />
              ) : (
                <Dumbbell size={64} className="text-slate-500" />
              )}
            </div>

            <div className="text-center mb-6">
              <p className="text-slate-400 text-lg">Set <span className="text-sky-300 font-bold">{currentSet}</span> of <span className="text-sky-300 font-bold">{activeExercise.sets}</span></p>
              <p className="text-6xl font-black text-white text-glow my-2">{formatTime(timer)}</p>
              <p className="text-slate-400">{activeExercise.reps} {isNaN(parseInt(activeExercise.reps)) ? '' : 'Reps'}</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="w-20 h-20 rounded-full flex items-center justify-center text-white hud-button"
              >
                {isTimerRunning ? <Pause size={32} /> : <PlayCircle size={32} />}
              </button>
              {timer === 0 && (
                <button
                  onClick={handleNextSet}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white hud-button"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))',
                    borderColor: 'rgba(16, 185, 129, 0.6)'
                  }}
                >
                  <ChevronsRight size={32} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseGuide;
