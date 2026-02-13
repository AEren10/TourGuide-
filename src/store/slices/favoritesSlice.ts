import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState } from '@/features/favorites/types/favorites.types';
import type { RootState } from '../index';

const initialState: FavoritesState = {
  tours: [],
  stops: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleTourFavorite: (state, action: PayloadAction<string>) => {
      const tourId = action.payload;
      const index = state.tours.indexOf(tourId);

      if (index > -1) {
        state.tours.splice(index, 1);
      } else {
        state.tours.push(tourId);
      }
    },
    toggleStopFavorite: (state, action: PayloadAction<string>) => {
      const stopId = action.payload;
      const index = state.stops.indexOf(stopId);

      if (index > -1) {
        state.stops.splice(index, 1);
      } else {
        state.stops.push(stopId);
      }
    },
    clearFavorites: (state) => {
      state.tours = [];
      state.stops = [];
    },
  },
});

export const { toggleTourFavorite, toggleStopFavorite, clearFavorites } =
  favoritesSlice.actions;

// Selectors
export const selectIsTourFavorite = (state: RootState, tourId: string) =>
  state.favorites.tours.includes(tourId);

export const selectIsStopFavorite = (state: RootState, stopId: string) =>
  state.favorites.stops.includes(stopId);

export const selectFavoriteTours = (state: RootState) => state.favorites.tours;
export const selectFavoriteStops = (state: RootState) => state.favorites.stops;

export default favoritesSlice.reducer;
