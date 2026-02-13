import { PopularRoute } from '../../tours/types/tour.types';

export const popularRoutesMock: PopularRoute[] = [
  {
    id: '10',
    title: 'Midnight City Lights Tour',
    description:
      'Experience the city skyline illuminated at night with exclusive rooftop viewpoints.',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785',
    badge: 'nightTour',
    rating: 4.9,
    price: 35,
    travelerCount: 1243,
    travelerAvatars: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
    ],
  },
  {
    id: '11',
    title: 'Colonial Heritage Walk',
    description:
      'Step back in time through preserved colonial architecture and historic sites.',
    imageUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86',
    badge: 'heritage',
    rating: 4.8,
    price: 'free',
    travelerCount: 892,
    travelerAvatars: [
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=5',
    ],
  },
  {
    id: '12',
    title: 'Foodie Street Market Trail',
    description:
      'Taste your way through the best local street food and hidden gems.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    badge: 'popular',
    rating: 4.7,
    price: 20,
    travelerCount: 2156,
    travelerAvatars: [
      'https://i.pravatar.cc/150?img=6',
      'https://i.pravatar.cc/150?img=7',
      'https://i.pravatar.cc/150?img=8',
      'https://i.pravatar.cc/150?img=9',
    ],
  },
  {
    id: '13',
    title: 'Nature Reserve Loop',
    description:
      'Peaceful trail through urban greenspace with wildlife observation points.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    badge: 'new',
    rating: 4.6,
    price: 'free',
    travelerCount: 567,
    travelerAvatars: [
      'https://i.pravatar.cc/150?img=10',
      'https://i.pravatar.cc/150?img=11',
    ],
  },
];
