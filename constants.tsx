
import React from 'react';
import { 
  Heart, 
  Dumbbell, 
  Zap, 
  Target, 
  Leaf, 
  MessageCircle, 
  LayoutDashboard, 
  User,
  Activity,
  Users,
  Utensils,
  Stethoscope
} from 'lucide-react';
import { ProductRecommendation, HealthGoal, Exercise } from './types';

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'tracking', label: 'Daily Log', icon: <Activity size={20} /> },
  { id: 'early-tracker', label: 'Health Risk Tracker', icon: <Stethoscope size={20} /> },
  { id: 'exercises', label: 'Training', icon: <Dumbbell size={20} /> },
  { id: 'calories', label: 'AI Calorie', icon: <Utensils size={20} /> },
  { id: 'community-experience', label: 'Community', icon: <Users size={20} /> },
  { id: 'reports', label: 'Reports', icon: <Zap size={20} /> },
  { id: 'chatbot', label: 'AI Coach', icon: <MessageCircle size={20} /> },
  { id: 'awareness', label: 'Wellness', icon: <Heart size={20} /> },
  { id: 'products', label: 'Eco-Products', icon: <Leaf size={20} /> },
  { id: 'profile', label: 'Profile', icon: <User size={20} /> },
];

export const GOAL_EXERCISES: Record<HealthGoal, Exercise[]> = {
  [HealthGoal.MENTAL_HEALTH]: [
    { name: 'Mindful Walking', sets: 1, reps: '20 mins', category: 'Mindfulness', description: 'Focus on your breath and the sensation of your feet hitting the ground.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/walking.mp4' },
    { name: 'Restorative Yoga', sets: 3, reps: '5 mins per pose', category: 'Flexibility', description: 'Gentle stretching to calm the nervous system.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/yoga.mp4' },
    { name: 'Guided Meditation', sets: 1, reps: '10 mins', category: 'Mental', description: 'Daily session for mental clarity and stress reduction.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/meditation.mp4' }
  ],
  [HealthGoal.BULKING]: [
    { name: 'Barbell Squats', sets: 4, reps: '8-10', category: 'Strength', description: 'Fundamental lower body compound movement for mass.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/barbell-squat.mp4' },
    { name: 'Bench Press', sets: 4, reps: '6-8', category: 'Strength', description: 'Core chest building exercise with focus on heavy load.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/barbell-bench-press.mp4' },
    { name: 'Deadlifts', sets: 3, reps: '5', category: 'Strength', description: 'Full body pull to build overall muscle density.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/barbell-deadlift.mp4' }
  ],
  [HealthGoal.CUTTING]: [
    { name: 'High Intensity Intervals', sets: 5, reps: '1 min on / 1 min off', category: 'Cardio', description: 'Max effort sprints followed by active recovery.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/running.mp4' },
    { name: 'Burpees', sets: 4, reps: 'Max till failure', category: 'Endurance', description: 'Full body calorie burner for metabolic boost.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/burpee.mp4' },
    { name: 'Jump Rope', sets: 3, reps: '3 mins', category: 'Cardio', description: 'Continuous movement for sustained fat oxidation.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/jump-rope.mp4' }
  ],
  [HealthGoal.MOBILITY]: [
    { name: 'Hip Openers', sets: 3, reps: '45s per side', category: 'Mobility', description: 'Pigeon pose or 90/90 stretch to free the hips.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/pigeon-pose.mp4' },
    { name: 'Shoulder Dislocations', sets: 3, reps: '15', category: 'Mobility', description: 'Using a band or stick to improve rotational range.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/shoulder-dislocation.mp4' },
    { name: 'Thoracic Bridges', sets: 2, reps: '10 per side', category: 'Stability', description: 'Improve mid-back rotation and core control.', animationUrl: 'https://musclewiki.com/media/uploads/videos/male/thoracic-bridge.mp4' }
  ]
};

export const GOAL_DETAILS = {
  'Mental Health': {
    color: 'bg-indigo-100 text-indigo-700',
    description: 'Focus on stress management, mindfulness, and sleep hygiene.',
    icon: <Heart size={24} />
  },
  'Bulking': {
    color: 'bg-orange-100 text-orange-700',
    description: 'Caloric surplus and progressive overload for muscle growth.',
    icon: <Dumbbell size={24} />
  },
  'Cutting': {
    color: 'bg-emerald-100 text-emerald-700',
    description: 'Fat loss through caloric deficit and cardio-focused activity.',
    icon: <Target size={24} />
  },
  'Mobility & Flexibility': {
    color: 'bg-blue-100 text-blue-700',
    description: 'Enhanced range of motion and functional movement recovery.',
    icon: <Activity size={24} />
  }
};

export const SAMPLE_PRODUCTS: ProductRecommendation[] = [
  {
    id: '1',
    name: 'Chemical Face Wash',
    description: 'Most commercial face washes contain SLS and Parabens.',
    alternative: 'Raw Honey or Cold-Pressed Neem Oil Wash',
    category: 'Skincare',
    image: 'https://picsum.photos/seed/face/400/300'
  },
  {
    id: '2',
    name: 'Aluminum Deodorant',
    description: 'Standard antiperspirants block sweat glands with aluminum salts.',
    alternative: 'Baking Soda & Coconut Oil Paste or Mineral Stone',
    category: 'Hygiene',
    image: 'https://picsum.photos/seed/deo/400/300'
  },
  {
    id: '3',
    name: 'Plastic Toothbrush',
    description: 'Plastic toothbrushes take 500+ years to decompose.',
    alternative: 'Bamboo Toothbrush with Charcoal Bristles',
    category: 'Personal Care',
    image: 'https://picsum.photos/seed/brush/400/300'
  }
];

export const DEFAULT_GOAL_TARGETS = {
  'Mental Health': { steps: 6000, water: 8, sleep: 8, calories: 2000 },
  'Bulking': { steps: 8000, water: 12, sleep: 8, calories: 3000 },
  'Cutting': { steps: 12000, water: 10, sleep: 7, calories: 1800 },
  'Mobility & Flexibility': { steps: 7000, water: 9, sleep: 8, calories: 2200 },
};

export const PAMPHLETS: Pamphlet[] = [
  {
    title: "Diabetes Prevention",
    description: "Understanding the role of low glycemic index foods.",
    content: [
      {
        heading: "What is the Glycemic Index (GI)?",
        points: [
          "The GI is a scale from 1-100 that ranks carbohydrate-containing foods by how much they raise blood sugar levels.",
          "High-GI foods are rapidly digested and cause a quick spike in blood sugar.",
          "Low-GI foods are digested slowly, leading to a gradual rise in blood sugar and insulin levels."
        ]
      },
      {
        heading: "Examples of Low-GI Foods",
        points: [
          "Rolled or steel-cut oatmeal",
          "Non-starchy vegetables (broccoli, spinach, carrots)",
          "Most fruits (apples, berries, oranges)",
          "Legumes (lentils, chickpeas, beans)"
        ]
      },
      {
        heading: "Practical Tips",
        points: [
          "Choose whole grains over refined grains (brown rice instead of white).",
          "Combine high-GI foods with low-GI foods to balance the meal's overall GI.",
          "Limit sugary drinks and processed snacks."
        ]
      }
    ]
  },
  {
    title: "Posture Care",
    description: "Simple stretches to reverse the effects of desk work.",
    content: [
      {
        heading: "The Problem with 'Tech Neck'",
        points: [
          "Constant downward gaze at screens puts immense strain on your neck and upper back muscles.",
          "This can lead to chronic pain, headaches, and reduced mobility over time."
        ]
      },
      {
        heading: "Corrective Stretches (Every Hour)",
        points: [
          "Chin Tucks: Gently tuck your chin towards your neck, creating a 'double chin'. Hold for 5 seconds. (10 reps)",
          "Shoulder Blade Squeeze: Sit tall and squeeze your shoulder blades together as if holding a pencil. Hold for 10 seconds. (5 reps)",
          "Chest Opener: Clasp your hands behind your back and gently pull your shoulders back, opening your chest. Hold for 20-30 seconds."
        ]
      }
    ]
  },
  {
    title: "Local Superfoods",
    description: `Nutritious staples found across your region.`,
    content: [
      {
        heading: "The Power of Eating Local",
        points: [
          "Local foods are often fresher, more nutrient-dense, and have a smaller carbon footprint.",
          "They support local economies and connect you to your region's agricultural heritage."
        ]
      },
      {
        heading: "Examples (Varies by Region)",
        points: [
          "India: Turmeric (anti-inflammatory), Amla (rich in Vitamin C), Moringa (nutrient-packed leaves).",
          "Mediterranean: Olive Oil (healthy fats), Lentils (protein & fiber), Sardines (omega-3s).",
          "Southeast Asia: Jackfruit (versatile fruit), Lemongrass (antioxidant), Galangal (digestive aid)."
        ]
      }
    ]
  }
];

export const TIP_CATEGORIES = [
  'Headache', 
  'Post-Workout', 
  'Fatigue', 
  'Sleep', 
  'Stress', 
  'Nutrition'
];
