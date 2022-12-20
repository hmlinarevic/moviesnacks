import { configureStore } from '@reduxjs/toolkit'
import movieDiscovery from './movieDiscoverySlice'
import movieFavorites from './movieFavoritesSlice'
import movieSearch from './movieSearchSlice'

export const store = configureStore({
  reducer: {
    movieFavorites,
    movieSearch,
    movieDiscovery,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
