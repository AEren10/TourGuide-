import { NextAdventure } from '../types/home.types';

export const nextAdventuresMock: NextAdventure[] = [
  {
    id: '1',
    title: 'Historic Downtown Walking Tour',
    description:
      'Explore the historic heart of the city with guided stops at iconic landmarks.',
    location: 'Downtown District',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
    images: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    ],
    rating: 4.8,
    reviewCount: 342,
    price: 25,
    duration: '2.5 hours',
    distance: '3.2 km',
    calories: '450 cal',
    stopCount: 8,
    badge: 'recommended',
  },
  {
    id: '2',
    title: 'Waterfront Sunset Trail',
    description:
      'A scenic route along the waterfront with breathtaking sunset views.',
    location: 'Harbor District',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
    ],
    rating: 4.9,
    reviewCount: 567,
    price: 'free',
    duration: '1.5 hours',
    distance: '2.8 km',
    calories: '320 cal',
    stopCount: 5,
    badge: 'new',
  },
  {
    id: '3',
    title: 'Art District Gallery Hop',
    description:
      'Discover contemporary art and street murals in the creative district.',
    location: 'Arts Quarter',
    imageUrl: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8',
    images: [
      'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
    ],
    rating: 4.7,
    reviewCount: 234,
    price: 15,
    duration: '3 hours',
    distance: '2.5 km',
    calories: '380 cal',
    stopCount: 10,
    badge: 'popular',
  },
];
