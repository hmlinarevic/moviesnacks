import camelcaseKeys from 'camelcase-keys'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApiEndpoint, getApiData } from '../utils/api'
import { getCacheData, addDataIntoCache } from '../utils/cache'
import { MovieDetails } from '../types/APIResponsesTypes'

interface SearchState {
  movies: MovieDetails[]
  isLoading: { movies: true | false }
  hasError: true | false
}

const initialState: SearchState = {
  movies: [],
  isLoading: { movies: true },
  hasError: false,
}

export const searchMovies = createAsyncThunk(
  'search/searchMovies',
  async (serchTerm: string) => {
    const endpoint = getApiEndpoint('/search/movie', { query: serchTerm })

    const cacheResponse = await getCacheData<MovieDetails[]>(
      'movie-search',
      endpoint
    )

    if (cacheResponse) {
      return cacheResponse
    } else {
      const apiResponse = await getApiData(endpoint)
      if (apiResponse?.results.length) {
        const adapted = camelcaseKeys(apiResponse.results)

        addDataIntoCache('movie-search', endpoint, adapted)

        return adapted
      }
    }
  }
)

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchMovies.pending, (state) => {
      state.isLoading.movies = true
    })
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.movies = action.payload
        state.isLoading.movies = false
      }
    })
    builder.addCase(searchMovies.rejected, (state) => {
      state.hasError = true
    })
  },
})

export default searchSlice.reducer
