/**
 * Tipos relacionados aos personagens
 */

export interface Character {
  characterId: string;
  name: string;
  age?: number;
  role?: string;
  description?: string;
  modelPath?: string;
  animations?: CharacterAnimations;
  voiceProfile?: VoiceProfile;
  narrativeTree?: string;
}

export interface CharacterAnimations {
  idle?: string;
  worried?: string;
  relieved?: string;
  angry?: string;
  happy?: string;
  sad?: string;
  [key: string]: string | undefined;
}

export interface VoiceProfile {
  voiceId: string;
  emotionVariations?: boolean;
}

export interface CharacterData {
  characterId: string;
  name: string;
  age: number;
  role: string;
  description: string;
  modelPath: string;
  animations: CharacterAnimations;
  voiceProfile: VoiceProfile;
  narrativeTree: string;
}

export type Emotion = "neutral" | "worried" | "relieved" | "angry" | "happy" | "sad";

export const Emotion = {
  Neutral: "neutral" as const,
  Worried: "worried" as const,
  Relieved: "relieved" as const,
  Angry: "angry" as const,
  Happy: "happy" as const,
  Sad: "sad" as const,
} as const;

