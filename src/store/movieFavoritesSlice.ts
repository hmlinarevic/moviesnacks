import { createSlice } from '@reduxjs/toolkit'

export type MovieFavorite = {
  id: number
  title: string
}

const initialState: MovieFavorite[] = []

export const favoritesSlice = createSlice({
  name: 'favorites',
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

export const { update, clear } = favoritesSlice.actions

export default favoritesSlice.reducer
