import { createSlice } from '@reduxjs/toolkit'
import { MovieDetails } from '../types/APIResponsesTypes'

interface searchMoviesState {
  data: [] | MovieDetails[]
  isLoading: true | false
}

const initialState: searchMoviesState = {
  data: [],
  isLoading: true,
}

export const searchMoviesSlice = createSlice({
  name: 'searchMovies',
  initialState,
  reducers: {
    addResults: (state, action) => {
      state.data = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})
