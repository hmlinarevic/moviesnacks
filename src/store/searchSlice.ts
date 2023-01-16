import camelcaseKeys from 'camelcase-keys'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApiEndpoint, getApiData } from '../utils/api'
import { getCacheData, addDataIntoCache } from '../utils/cache'
import { MovieDetails } from '../types/APIResponsesTypes'

interface SearchState {
  movies: MovieDetails[]

  isLoading: {
    movies: true | false
  }
}

const initialState: SearchState = {
  movies: [],

  isLoading: {
    movies: true,
  },
}

export const searchMovies = createAsyncThunk(
  'search/searchMovies',
  async (serchTerm: string) => {
    const endpoint = getApiEndpoint('/search/movie', { query: serchTerm })
    console.log({ searching: true, endpoint })
    const cacheResponse = await getCacheData<MovieDetails[]>(
      'search-cache',
      endpoint
    )

    if (cacheResponse) {
      console.log('returned from cache ', { cacheResponse })
      return cacheResponse
    } else {
      const apiResponse = await getApiData(endpoint)
      if (apiResponse?.results.length) {
        const adapted = camelcaseKeys(apiResponse.results)

        addDataIntoCache('search-cache', endpoint, adapted)

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
  },
})

export default searchSlice.reducer
