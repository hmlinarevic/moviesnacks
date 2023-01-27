import { configureStore } from '@reduxjs/toolkit'
import search from './searchSlice'
import movies from './moviesSlice'
import favorites from './favoritesSlice'

export const store = configureStore({
  reducer: {
    search,
    movies,
    favorites,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type AppDispatch = typeof store.dispatch
