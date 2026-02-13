export interface Location {
  latitude: number;
  longitude: number;
}

export interface UserLocation extends Location {
  heading?: number; // Compass direction in degrees (0-360)
  accuracy?: number;
  speed?: number;
}

export interface StopLocation extends Location {
  id: string;
  title: string;
  order: number;
  isActive?: boolean;
  isCompleted?: boolean;
}

export interface RouteNavigation {
  tourId: string;
  tourName: string;
  currentStopIndex: number;
  totalStops: number;
  progressPercentage: number;
  stops: StopLocation[];
  route: Location[];
  userLocation?: UserLocation;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
