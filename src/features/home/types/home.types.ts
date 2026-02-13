import { Tour, PopularRoute } from '../../tours/types/tour.types';

export interface NextAdventure extends Tour {
  badge: 'recommended' | 'new' | 'popular';
}

export interface HomeData {
  nextAdventures: NextAdventure[];
  popularRoutes: PopularRoute[];
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  hasNotification?: boolean;
}
