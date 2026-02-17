import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { supabase } from './supabase';
import { NextAdventure } from '@/features/home/types/home.types';
import { PopularRoute, TourDetail } from '@/features/tours/types/tour.types';
import { StopDetail, TravelerInsight } from '@/features/stops/types/stop.types';
import { RouteNavigation } from '@/features/map/types/map.types';

// Supabase base query
const supabaseBaseQuery: BaseQueryFn<
  { query: () => Promise<any> },
  unknown,
  { error: string }
> = async ({ query }) => {
  try {
    const result = await query();

    if (result.error) {
      return { error: { error: result.error.message || 'Unknown error' } };
    }

    return { data: result.data };
  } catch (error: any) {
    return { error: { error: error.message || 'Unknown error' } };
  }
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: supabaseBaseQuery,
  tagTypes: ['Tours', 'Stops', 'Home', 'Navigation', 'Favorites'],
  endpoints: (builder) => ({
    // Home screen endpoints
    getNextAdventures: builder.query<NextAdventure[], void>({
      query: () => ({
        query: async () => {
          const { data, error } = await supabase
            .from('tours')
            .select(
              `
              id,
              title,
              description,
              image_url,
              duration,
              distance,
              difficulty,
              price,
              rating,
              badge,
              category:categories(name, icon)
            `
            )
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(5);

          return { data, error };
        },
      }),
      transformResponse: (response: any[]) => {
        return response.map((tour) => ({
          id: tour.id,
          title: tour.title,
          description: tour.description,
          imageUrl: tour.image_url,
          duration: tour.duration,
          distance: tour.distance,
          difficulty: tour.difficulty,
          badge: tour.badge,
        }));
      },
      providesTags: ['Home', 'Tours'],
    }),

    getPopularRoutes: builder.query<PopularRoute[], void>({
      query: () => ({
        query: async () => {
          const { data, error } = await supabase
            .from('tours')
            .select(
              `
              id,
              title,
              image_url,
              duration,
              distance,
              difficulty,
              price,
              rating
            `
            )
            .eq('is_active', true)
            .order('rating', { ascending: false })
            .limit(10);

          return { data, error };
        },
      }),
      transformResponse: (response: any[]) => {
        return response.map((tour) => ({
          id: tour.id,
          name: tour.title,
          imageUrl: tour.image_url,
          duration: tour.duration,
          distance: tour.distance,
          difficulty: tour.difficulty,
          price: tour.price,
          rating: tour.rating,
        }));
      },
      providesTags: ['Home', 'Tours'],
    }),

    // Tour detail endpoint
    getTourDetails: builder.query<TourDetail, string>({
      query: (id) => ({
        query: async () => {
          const { data, error } = await supabase
            .from('tours')
            .select(
              `
              *,
              category:categories(name, icon),
              stops(
                id,
                name,
                description,
                latitude,
                longitude,
                order_index,
                duration,
                image_urls,
                audio_url
              )
            `
            )
            .eq('id', id)
            .single();

          return { data, error };
        },
      }),
      transformResponse: (response: any) => {
        return {
          id: response.id,
          title: response.title,
          description: response.description,
          imageUrl: response.image_url,
          duration: response.duration,
          distance: response.distance,
          difficulty: response.difficulty,
          price: response.price,
          rating: response.rating,
          badge: response.badge,
          category: response.category?.name || 'General',
          audioUrl: response.audio_url,
          stops:
            response.stops
              ?.sort((a: any, b: any) => a.order_index - b.order_index)
              .map((stop: any) => ({
                id: stop.id,
                order: stop.order_index,
                title: stop.name,
                name: stop.name,
                description: stop.description || '',
                imageUrl: stop.image_urls?.[0] || '',
                imageUrls: stop.image_urls || [],
                duration: stop.duration ? `${stop.duration} min` : '30 min',
                coordinates: {
                  latitude: stop.latitude,
                  longitude: stop.longitude,
                },
                audioUrl: stop.audio_url,
              })) || [],
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'Tours', id }],
    }),

    // Stop detail endpoints
    getStopDetails: builder.query<StopDetail, string>({
      query: (id) => ({
        query: async () => {
          const { data, error } = await supabase
            .from('stops')
            .select(
              `
              *,
              tour:tours(
                id,
                title,
                image_url,
                category:categories(name)
              )
            `
            )
            .eq('id', id)
            .single();

          return { data, error };
        },
      }),
      transformResponse: (response: any) => {
        return {
          id: response.id,
          title: response.name, // Map name to title
          name: response.name,
          category: response.category || 'landmark', // Use DB category or default
          description: response.description || '',
          images: response.image_urls || [], // Map imageUrls to images
          rating: 0, // Default rating (stops don't have ratings in DB)
          reviewCount: 0, // Default reviewCount
          status: 'open' as any, // Default status
          statusMessage: undefined,
          duration: `${response.duration || 30} min`, // Format duration
          distance: undefined,
          audioGuide: !!response.audio_url, // Boolean based on audioUrl presence
          price: 'free' as any, // Default to free
          location: {
            latitude: response.latitude,
            longitude: response.longitude,
            address: '',
          },
          coordinates: {
            // Keep for backward compatibility
            latitude: response.latitude,
            longitude: response.longitude,
          },
          highlights: [], // Empty highlights
          imageUrls: response.image_urls || [],
          audioUrl: response.audio_url,
          tourId: response.tour?.id,
          tourTitle: response.tour?.title,
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'Stops', id }],
    }),

    getTravelerInsights: builder.query<TravelerInsight[], string>({
      query: (stopId) => ({
        query: async () => {
          const { data, error } = await supabase
            .from('reviews')
            .select(
              `
              id,
              rating,
              comment,
              created_at,
              user:users(
                id,
                full_name,
                avatar_url
              )
            `
            )
            .eq('tour_id', stopId)
            .order('created_at', { ascending: false })
            .limit(10);

          return { data, error };
        },
      }),
      transformResponse: (response: any[]) => {
        return response.map((review) => ({
          id: review.id,
          userName: review.user?.full_name || 'Anonymous',
          userAvatar: review.user?.avatar_url,
          rating: review.rating,
          comment: review.comment,
          timestamp: review.created_at,
        }));
      },
      providesTags: (_result, _error, stopId) => [
        { type: 'Stops', id: stopId },
      ],
    }),

    // Route navigation endpoint
    getRouteNavigation: builder.query<RouteNavigation, string>({
      query: (tourId) => ({
        query: async () => {
          const { data, error } = await supabase
            .from('stops')
            .select(
              `
              id,
              name,
              latitude,
              longitude,
              order_index
            `
            )
            .eq('tour_id', tourId)
            .order('order_index', { ascending: true });

          return { data, error };
        },
      }),
      transformResponse: (response: any[]) => {
        return {
          tourId: response[0]?.tour_id,
          waypoints: response.map((stop) => ({
            id: stop.id,
            name: stop.name,
            coordinates: {
              latitude: stop.latitude,
              longitude: stop.longitude,
            },
            orderIndex: stop.order_index,
          })),
        };
      },
      providesTags: (_result, _error, tourId) => [
        { type: 'Navigation', id: tourId },
      ],
    }),

    // Explore screen endpoint
    getExploreTours: builder.query<
      PopularRoute[],
      { category?: string; search?: string }
    >({
      query: ({ category, search } = {}) => ({
        query: async () => {
          let q = supabase
            .from('tours')
            .select(
              `
              id,
              title,
              description,
              image_url,
              duration,
              distance,
              price,
              rating,
              badge,
              category:categories(name, icon)
            `
            )
            .eq('is_active', true);

          if (category && category !== 'all') {
            q = q.eq('categories.name', category);
          }

          if (search) {
            q = q.ilike('title', `%${search}%`);
          }

          const { data, error } = await q.order('rating', { ascending: false });
          return { data, error };
        },
      }),
      transformResponse: (response: any[]) => {
        return response.map((tour) => ({
          id: tour.id,
          title: tour.title,
          description: tour.description,
          imageUrl: tour.image_url,
          duration: tour.duration ? `${tour.duration} dk` : undefined,
          distance: tour.distance ? `${tour.distance} km` : undefined,
          price:
            tour.price === 0 || tour.price === null
              ? 'Ücretsiz'
              : `₺${tour.price}`,
          rating: tour.rating ?? 0,
          badge: tour.badge,
          category: tour.category?.name?.toLowerCase() || 'other',
        }));
      },
      providesTags: ['Tours'],
    }),

    // Favorites endpoints
    getFavorites: builder.query<PopularRoute[], void>({
      query: () => ({
        query: async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!user) {
            return { data: [], error: null };
          }

          const { data, error } = await supabase
            .from('favorites')
            .select(
              `
              tour:tours(
                id,
                title,
                image_url,
                duration,
                distance,
                difficulty,
                price,
                rating
              )
            `
            )
            .eq('user_id', user.id);

          return { data, error };
        },
      }),
      transformResponse: (response: any[]) => {
        return response.map((fav) => ({
          id: fav.tour.id,
          name: fav.tour.title,
          imageUrl: fav.tour.image_url,
          duration: fav.tour.duration,
          distance: fav.tour.distance,
          difficulty: fav.tour.difficulty,
          price: fav.tour.price,
          rating: fav.tour.rating,
        }));
      },
      providesTags: ['Favorites'],
    }),

    addFavorite: builder.mutation<void, string>({
      query: (tourId) => ({
        query: async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!user) {
            return { data: null, error: { message: 'User not authenticated' } };
          }

          const { error } = await supabase
            .from('favorites')
            .insert({ user_id: user.id, tour_id: tourId });

          return { data: null, error };
        },
      }),
      invalidatesTags: ['Favorites'],
    }),

    removeFavorite: builder.mutation<void, string>({
      query: (tourId) => ({
        query: async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!user) {
            return { data: null, error: { message: 'User not authenticated' } };
          }

          const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('tour_id', tourId);

          return { data: null, error };
        },
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const {
  useGetNextAdventuresQuery,
  useGetPopularRoutesQuery,
  useGetExploreToursQuery,
  useGetTourDetailsQuery,
  useGetStopDetailsQuery,
  useGetTravelerInsightsQuery,
  useGetRouteNavigationQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = api;
