export interface FavoritesState {
  tours: string[]; // Array of tour IDs
  stops: string[]; // Array of stop IDs
}

export interface SavedRoutesState {
  routeIds: string[]; // Array of saved route IDs
}
