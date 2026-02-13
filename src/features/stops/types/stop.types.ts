export type StopCategory =
  | 'landmark'
  | 'museum'
  | 'park'
  | 'restaurant'
  | 'viewpoint'
  | 'historical'
  | 'cultural';

export type StopStatus = 'open' | 'closed' | 'closing-soon';

export interface StopDetail {
  id: string;
  title: string;
  category: StopCategory;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  status: StopStatus;
  statusMessage?: string; // e.g., "Open until 6:00 PM"
  duration: string; // Recommended visit duration
  distance?: string; // Distance from user or previous stop
  audioGuide: boolean;
  price?: number | 'free';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  highlights: string[];
  openingHours?: {
    day: string;
    hours: string;
  }[];
}

export interface TravelerInsight {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  isVerified: boolean;
  tip: string;
  helpful: number;
  timestamp: string; // ISO date string
}

export interface AudioGuide {
  id: string;
  stopId: string;
  duration: string;
  language: string;
  audioUrl: string;
}
