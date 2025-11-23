/**
 * Sistema de tags para variações de diálogo
 */

export type DialogueTag =
  | "default"
  | "emotional"
  | "second_playthrough"
  | "third_playthrough"
  | "high_amability"
  | "low_amability"
  | "high_efficiency"
  | "low_efficiency"
  | "first_playthrough"
  | "manipulative_path"
  | "genuine_path";

export const DialogueTag = {
  Default: "default" as const,
  Emotional: "emotional" as const,
  SecondPlaythrough: "second_playthrough" as const,
  ThirdPlaythrough: "third_playthrough" as const,
  HighAmability: "high_amability" as const,
  LowAmability: "low_amability" as const,
  HighEfficiency: "high_efficiency" as const,
  LowEfficiency: "low_efficiency" as const,
  FirstPlaythrough: "first_playthrough" as const,
  ManipulativePath: "manipulative_path" as const,
  GenuinePath: "genuine_path" as const,
} as const;





