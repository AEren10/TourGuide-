import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../services/api';
import favoritesReducer from './slices/favoritesSlice';
import activeTourReducer from './slices/activeTourSlice';
import savedRoutesReducer from './slices/savedRoutesSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    favorites: favoritesReducer,
    activeTour: activeTourReducer,
    savedRoutes: savedRoutesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
