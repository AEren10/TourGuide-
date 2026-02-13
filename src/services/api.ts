import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { NextAdventure } from '@/features/home/types/home.types';
import { PopularRoute, TourDetail } from '@/features/tours/types/tour.types';
import { StopDetail, TravelerInsight } from '@/features/stops/types/stop.types';
import { RouteNavigation } from '@/features/map/types/map.types';

// Mock data imports
import { nextAdventuresMock } from '@/features/home/mocks/nextAdventures.mock';
import { popularRoutesMock } from '@/features/home/mocks/popularRoutes.mock';
import { tourDetailsMock } from '@/features/tours/mocks/tourDetails.mock';
import {
  stopDetailsMock,
  travelerInsightsMock,
} from '@/features/stops/mocks/stopDetails.mock';
import { routeNavigationMock } from '@/features/map/mocks/routeNavigation.mock';

const mockBaseQuery: BaseQueryFn<
  { url: string; method?: string; body?: unknown },
  unknown,
  { error: string }
> = async ({ url }) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Parse URL to extract ID for detail endpoints
  const segments = url.split('/');

  // Route to appropriate mock data
  if (url.includes('/tours/next-adventure')) {
    return { data: nextAdventuresMock };
  }
  if (url.includes('/tours/popular')) {
    return { data: popularRoutesMock };
  }
  if (url.includes('/tours/') && url.includes('/navigation')) {
    const tourId = segments[segments.indexOf('tours') + 1];
    return { data: routeNavigationMock[tourId] || null };
  }
  if (url.includes('/tours/')) {
    const tourId = segments[segments.indexOf('tours') + 1];
    return { data: tourDetailsMock[tourId] || null };
  }
  if (url.includes('/stops/') && url.includes('/insights')) {
    const stopId = segments[segments.indexOf('stops') + 1];
    return { data: travelerInsightsMock[stopId] || [] };
  }
  if (url.includes('/stops/')) {
    const stopId = segments[segments.indexOf('stops') + 1];
    return { data: stopDetailsMock[stopId] || null };
  }

  return { data: { url, message: 'Mock response' } };
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery,
  tagTypes: ['Tours', 'Stops', 'Home', 'Navigation'],
  endpoints: (builder) => ({
    // Home screen endpoints
    getNextAdventures: builder.query<NextAdventure[], void>({
      query: () => ({ url: '/tours/next-adventure' }),
      providesTags: ['Home', 'Tours'],
    }),
    getPopularRoutes: builder.query<PopularRoute[], void>({
      query: () => ({ url: '/tours/popular' }),
      providesTags: ['Home', 'Tours'],
    }),

    // Tour detail endpoint
    getTourDetails: builder.query<TourDetail, string>({
      query: (id) => ({ url: `/tours/${id}` }),
      providesTags: (_result, _error, id) => [{ type: 'Tours', id }],
    }),

    // Stop detail endpoints
    getStopDetails: builder.query<StopDetail, string>({
      query: (id) => ({ url: `/stops/${id}` }),
      providesTags: (_result, _error, id) => [{ type: 'Stops', id }],
    }),
    getTravelerInsights: builder.query<TravelerInsight[], string>({
      query: (stopId) => ({ url: `/stops/${stopId}/insights` }),
      providesTags: (_result, _error, stopId) => [
        { type: 'Stops', id: stopId },
      ],
    }),

    // Route navigation endpoint
    getRouteNavigation: builder.query<RouteNavigation, string>({
      query: (tourId) => ({ url: `/tours/${tourId}/navigation` }),
      providesTags: (_result, _error, tourId) => [
        { type: 'Navigation', id: tourId },
      ],
    }),
  }),
});

export const {
  useGetNextAdventuresQuery,
  useGetPopularRoutesQuery,
  useGetTourDetailsQuery,
  useGetStopDetailsQuery,
  useGetTravelerInsightsQuery,
  useGetRouteNavigationQuery,
} = api;
