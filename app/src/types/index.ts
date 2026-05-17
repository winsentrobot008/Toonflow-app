// ============================================================
// Toonflow - Type Definitions
// ============================================================

export interface User {
  email: string;
  salt?: string;
  hash?: string;
  password?: string; // legacy support
  createdAt: string;
}

export interface GenerationRecord {
  prompt: string;
  result: string;
  model: string;
  style: string;
  shotStrategy: string;
  characterConsistency: string;
  sceneStyle: string;
  quality: string;
  createdAt: string;
}

export interface GenerationOptions {
  model: ModelType;
  style: StyleType;
  shotStrategy: ShotStrategyType;
  characterConsistency: CharacterConsistencyType;
  sceneStyle: SceneStyleType;
  quality: QualityType;
}

export type ModelType =
  | "DeepSeek"
  | "GPT"
  | "Claude"
  | "Runway"
  | "Pika"
  | "Kling";

export type StyleType =
  | "写实"
  | "二次元"
  | "赛博朋克"
  | "国风"
  | "电影感";

export type ShotStrategyType =
  | "远景优先"
  | "特写优先"
  | "快节奏"
  | "慢节奏";

export type CharacterConsistencyType = "开启" | "关闭";

export type SceneStyleType = "写实" | "插画" | "3D" | "动漫";

export type QualityType = "普通" | "高清" | "电影级";

export interface ApiResponse<T = unknown> {
  msg?: string;
  error?: string;
  result?: string;
  records?: T[];
  user?: { email: string };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  isLoading: boolean;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}
