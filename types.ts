
export enum HealthGoal {
  MENTAL_HEALTH = 'Mental Health',
  BULKING = 'Bulking',
  CUTTING = 'Cutting',
  MOBILITY = 'Mobility & Flexibility'
}

export interface UserProfile {
  name: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  country: string;
  city: string;
  state: string;
  goal: HealthGoal;
  streaks: {
    active: number;
    headacheFree: number;
  };
  incognito: boolean;
  onboarded: boolean;
}

export interface DailyLog {
  date: string;
  steps: number;
  calories: number;
  water: number; // In glasses
  sleep: number; // In hours
  mood: number; // 1 to 5
}

export interface ProductRecommendation {
  id: string;
  name: string;
  description: string;
  alternative: string;
  category: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ExperienceTip {
  id: string;
  userName: string;
  category: string;
  tip: string;
  relatability: number;
  timestamp: string;
  replies?: ExperienceTip[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  description: string;
  category: string;
  animationUrl?: string;
}

export interface CalorieEstimation {
  foodItem: string;
  estimatedCalories: number;
  macros: {
    protein: string;
    carbs: string;
    fats: string;
  };
  confidence: string;
}

export interface SymptomAnalysis {
  potentialConcerns: string[];
  preventiveMeasures: string[];
  urgencyLevel: 'Low' | 'Moderate' | 'High';
  recommendedProfessional: string;
  summary: string;
}

export interface Pamphlet {
  title: string;
  description: string;
  content: {
    heading: string;
    points: string[];
  }[];
}
