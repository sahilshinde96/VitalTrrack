
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, DailyLog, CalorieEstimation, ProductRecommendation, SymptomAnalysis } from "../types";

// Always use the process.env.API_KEY directly for initialization as per guidelines.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

const SYSTEM_PROMPT = `You are VitalTrack AI, a professional health coach assistant. 
Your goal is to provide personalized, goal-based wellness guidance based on the user's data.

IMPORTANT CONSTRAINTS:
1. DO NOT provide medical diagnoses.
2. DO NOT prescribe medications or specific medical treatments.
3. Focus on lifestyle, preventive care, nutrition, and general wellness.
4. Always include a small disclaimer if the user asks a health-related question that sounds medical.
5. Provide culturally relevant advice based on the user's region when applicable.
6. For the "Natural Recommendations" part, emphasize safer, eco-friendly alternatives.

User Context:
Goal: {goal}
Age: {age}
Region: {region}
`;

export async function getChatResponse(
  message: string, 
  user: UserProfile, 
  history: { role: 'user' | 'model', content: string }[]
) {
  const model = 'gemini-3-flash-preview';
  
  const instruction = SYSTEM_PROMPT
    .replace('{goal}', user.goal)
    .replace('{age}', user.age.toString())
    .replace('{region}', user.country);

  const contents = [
    ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
    { role: 'user', parts: [{ text: message }] }
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: instruction,
        temperature: 0.7,
      },
    });

    // Access the .text property directly as per latest SDK guidelines.
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The wellness coach is currently resting. Please try again in a moment.";
  }
}

export async function getReportInsights(user: UserProfile, logs: DailyLog[]) {
  const model = 'gemini-3-flash-preview';
  const recentLogs = JSON.stringify(logs.slice(-7));
  
  const prompt = `Analyze these last 7 days of logs for a user targeting ${user.goal}. 
  Provide 3 key bullet points of encouragement or specific lifestyle adjustments. 
  Keep it brief and non-medical. Logs: ${recentLogs}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { systemInstruction: "You are a health data analyst. Provide brief, actionable wellness insights." }
    });
    return response.text || "Keep up the consistent effort! Consistency is key to reaching your goals.";
  } catch (error) {
    console.error("Report Insights Error:", error);
    return "Unable to generate insights at the moment. Your data shows great progress!";
  }
}

export async function estimateCalories(input: { text?: string, imageBase64?: string }): Promise<CalorieEstimation | null> {
  const model = 'gemini-3-flash-preview';
  
  const parts: any[] = [];
  if (input.text) parts.push({ text: `Estimate calories for this: ${input.text}` });
  if (input.imageBase64) {
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: input.imageBase64.split(',')[1] || input.imageBase64
      }
    });
    parts.push({ text: "Identify the food in this image and estimate its calorie content and macros." });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodItem: { type: Type.STRING },
            estimatedCalories: { type: Type.NUMBER },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.STRING },
                carbs: { type: Type.STRING },
                fats: { type: Type.STRING },
              },
              required: ["protein", "carbs", "fats"]
            },
            confidence: { type: Type.STRING }
          },
          required: ["foodItem", "estimatedCalories", "macros", "confidence"]
        }
      }
    });

    return JSON.parse(response.text || "null");
  } catch (error) {
    console.error("Calorie Estimation Error:", error);
    return null;
  }
}

export async function getEcoAlternative(productName: string): Promise<Partial<ProductRecommendation> | null> {
  const model = 'gemini-3-flash-preview';
  const prompt = `Provide a natural, eco-friendly, and non-toxic alternative to the following commercial product: "${productName}". 
  Include why the commercial one might be harmful and why the alternative is better.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The original commercial product name" },
            alternative: { type: Type.STRING, description: "The natural/eco-friendly alternative name" },
            description: { type: Type.STRING, description: "Brief explanation of why to switch and the benefits" },
            category: { type: Type.STRING, description: "Product category (e.g. Skincare, Cleaning, Hygiene)" }
          },
          required: ["name", "alternative", "description", "category"]
        }
      }
    });

    return JSON.parse(response.text || "null");
  } catch (error) {
    console.error("Eco-Alternative Error:", error);
    return null;
  }
}

export async function analyzeSymptoms(symptoms: string, user: UserProfile): Promise<SymptomAnalysis> {
  const model = 'gemini-3-flash-preview';
  const prompt = `The user (Age: ${user.age}, Country: ${user.country}) describes the following symptoms: "${symptoms}".
Analyze these symptoms and provide a JSON response with the fields: "potentialConcerns" (array of strings), "preventiveMeasures" (array of strings), "urgencyLevel" ('Low', 'Moderate', or 'High'), "recommendedProfessional" (string), and "summary" (string).
IMPORTANT: This is not a medical diagnosis. Frame the response as a preliminary analysis to help the user understand possibilities. Prioritize safety and strongly recommend professional consultation.`;
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            potentialConcerns: { type: Type.ARRAY, items: { type: Type.STRING } },
            preventiveMeasures: { type: Type.ARRAY, items: { type: Type.STRING } },
            urgencyLevel: { type: Type.STRING },
            recommendedProfessional: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ["potentialConcerns", "preventiveMeasures", "urgencyLevel", "recommendedProfessional", "summary"]
        }
      }
    });

    return JSON.parse(response.text || "null");
  } catch (error) {
    console.error("Symptom Analysis Error:", error);
    // Return a default or error-indicating object that matches the SymptomAnalysis interface
    return {
      potentialConcerns: [],
      preventiveMeasures: ["Please consult a healthcare professional for any health concerns."],
      urgencyLevel: 'Low',
      recommendedProfessional: "General Practitioner",
      summary: "Could not analyze symptoms at this time. Please try again later."
    };
  }
}

export async function vibeCheckTip(tip: string): Promise<boolean> {
  const model = 'gemini-3-flash-preview';
  const prompt = `Analyze the following user-submitted health tip. The goal is to ensure it is supportive and does not contain dangerous medical advice.
  Tip: "${tip}"
  Respond with a single word: 'true' if the tip is safe and positive, or 'false' if it gives potentially harmful medical advice, is overly negative, or promotes dangerous behavior.`;
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    const text = response.text?.trim().toLowerCase() || 'false';
    return text === 'true';
  } catch (error) {
    console.error("Vibe Check Error:", error);
    return false;
  }
}

