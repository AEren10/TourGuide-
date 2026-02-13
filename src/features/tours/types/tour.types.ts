export type BadgeType =
  | 'recommended'
  | 'new'
  | 'nightTour'
  | 'heritage'
  | 'popular';

export interface Tour {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  images: string[];
  rating: number;
  reviewCount: number;
  price: number | 'free';
  duration: string; // e.g., "2.5 hours"
  distance: string; // e.g., "3.2 km"
  calories?: string; // e.g., "450 cal"
  stopCount: number;
  badge?: BadgeType;
}

export interface PopularRoute {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  badge?: BadgeType;
  rating: number;
  price: number | 'free';
  travelerCount: number;
  travelerAvatars: string[];
}

export interface ItineraryStop {
  id: string;
  order: number;
  title: string;
  description: string;
  imageUrl: string;
  duration: string; // e.g., "15 min"
  walkingTime?: string; // e.g., "5 min walk" to next stop
  walkingDistance?: string; // e.g., "400 m"
}

export interface RouteInfo {
  tourId: string;
  stops: ItineraryStop[];
  totalDuration: string;
  totalDistance: string;
  polyline: {
    latitude: number;
    longitude: number;
  }[];
}

export interface TourDetail extends Tour {
  itinerary: ItineraryStop[];
  highlights: string[];
  included: string[];
  meetingPoint: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}
