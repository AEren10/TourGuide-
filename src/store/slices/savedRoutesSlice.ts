import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedRoutesState } from '@/features/favorites/types/favorites.types';
import type { RootState } from '../index';

const initialState: SavedRoutesState = {
  routeIds: [],
};

const savedRoutesSlice = createSlice({
  name: 'savedRoutes',
  initialState,
  reducers: {
    saveRoute: (state, action: PayloadAction<string>) => {
      const routeId = action.payload;
      if (!state.routeIds.includes(routeId)) {
        state.routeIds.push(routeId);
      }
    },
    unsaveRoute: (state, action: PayloadAction<string>) => {
      const routeId = action.payload;
      const index = state.routeIds.indexOf(routeId);
      if (index > -1) {
        state.routeIds.splice(index, 1);
      }
    },
    clearSavedRoutes: (state) => {
      state.routeIds = [];
    },
  },
});

export const { saveRoute, unsaveRoute, clearSavedRoutes } =
  savedRoutesSlice.actions;

// Selectors
export const selectIsRouteSaved = (state: RootState, routeId: string) =>
  state.savedRoutes.routeIds.includes(routeId);

export const selectSavedRouteIds = (state: RootState) =>
  state.savedRoutes.routeIds;

export default savedRoutesSlice.reducer;
