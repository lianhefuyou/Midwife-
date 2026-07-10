export type FontSize = 'standard' | 'medium' | 'large';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string; // If user has a real URL
  youtubeUrl?: string; // Youtube link
  posterUrl: string; // Background thumbnail
  tags: string[];
  captions: { time: number; text: string }[];
}

export interface QAOption {
  id: string;
  text: string;
  isCorrect: boolean;
  empathyFeedback: string; // 同理心回饋字樣
}

export interface QAQuestion {
  id: string;
  category: string;
  question: string;
  options: QAOption[];
  explanation: string; // 詳細釐清與賦權衛教資訊
}
