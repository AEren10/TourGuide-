import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface ActiveTourState {
  tourId: string | null;
  currentStopIndex: number;
  startedAt: string | null; // ISO date string
  isNavigating: boolean;
}

const initialState: ActiveTourState = {
  tourId: null,
  currentStopIndex: 0,
  startedAt: null,
  isNavigating: false,
};

const activeTourSlice = createSlice({
  name: 'activeTour',
  initialState,
  reducers: {
    startTour: (state, action: PayloadAction<string>) => {
      state.tourId = action.payload;
      state.currentStopIndex = 0;
      state.startedAt = new Date().toISOString();
      state.isNavigating = true;
    },
    endTour: (state) => {
      state.tourId = null;
      state.currentStopIndex = 0;
      state.startedAt = null;
      state.isNavigating = false;
    },
    moveToNextStop: (state) => {
      state.currentStopIndex += 1;
    },
    moveToPreviousStop: (state) => {
      if (state.currentStopIndex > 0) {
        state.currentStopIndex -= 1;
      }
    },
    goToStop: (state, action: PayloadAction<number>) => {
      state.currentStopIndex = action.payload;
    },
    updateProgress: (
      state,
      action: PayloadAction<{ stopIndex: number; isNavigating: boolean }>
    ) => {
      state.currentStopIndex = action.payload.stopIndex;
      state.isNavigating = action.payload.isNavigating;
    },
  },
});

export const {
  startTour,
  endTour,
  moveToNextStop,
  moveToPreviousStop,
  goToStop,
  updateProgress,
} = activeTourSlice.actions;

// Selectors
export const selectActiveTour = (state: RootState) => state.activeTour;
export const selectIsNavigating = (state: RootState) =>
  state.activeTour.isNavigating;
export const selectCurrentStopIndex = (state: RootState) =>
  state.activeTour.currentStopIndex;

export default activeTourSlice.reducer;
