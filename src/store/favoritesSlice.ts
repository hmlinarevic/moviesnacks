import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { MovieDetails } from '../types/APIResponsesTypes'
import { addDataIntoCache, getCacheData } from '../utils/cache'

type MovieFavorite = {
  id: number
  title: string
}

interface FavoritesState {
  movies: MovieFavorite[]
}

const initialState: FavoritesState = {
  movies: [],
}

export const updateFavoriteMoviesStorage = createAsyncThunk(
  'favorites/updateFavoritesMoviesStorage',
  async (data: MovieDetails, { getState }) => {
    const state = getState() as RootState

    addDataIntoCache('movie-favorites', 'list', state.favorites.movies)
    addDataIntoCache('movie-data', `movie/${data.id}`, data)
  }
)

export const loadFavoriteMovies = createAsyncThunk(
  'favorites/loadFavoriteMovies',
  async () => {
    const data = await getCacheData<MovieDetails[]>('movie-favorites', 'list')

    return data
  }
)

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    updateFavoriteMovies: (state, action: PayloadAction<MovieFavorite>) => {
      const favorite = state.movies.find(
        (movie) => movie.id === action.payload.id
      )

      if (!favorite) {
        state.movies.push(action.payload)
      } else {
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload.id
        )
      }
    },
    clearFavoriteMovies: (state) => {
      state.movies = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavoriteMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.movies = action.payload
      }
    })
  },
})

export const { updateFavoriteMovies, clearFavoriteMovies } =
  favoritesSlice.actions

export default favoritesSlice.reducer
