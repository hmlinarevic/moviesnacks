import { createSlice } from '@reduxjs/toolkit'

export type MovieFavorite = {
  id: number
  title: string
}

const initialState: MovieFavorite[] = []

export const movieFavoritesSlice = createSlice({
  name: 'movieFavorites',
  initialState,
  reducers: {
    update: (state, action) => {
      const favorite = state.find(
        (movieFavorite) => movieFavorite.id === action.payload.id
      )
      if (!favorite) {
        state.push(action.payload)
      } else {
        return state.filter(
          (movieFavorite) => movieFavorite.id !== action.payload.id
        )
      }
    },
    clear: () => [],
  },
})

export const { update, clear } = movieFavoritesSlice.actions

export default movieFavoritesSlice.reducer
