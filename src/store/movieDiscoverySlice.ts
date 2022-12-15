import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import camelcaseKeys from 'camelcase-keys'
import { getApiData, makeDiscoverUrl } from '../utils/api'
import { MovieDetails } from '../types/APIResponsesTypes'

interface movieDiscoveryState {
  movies: [] | MovieDetails[]
  isLoading: true | false
}

const initialState: movieDiscoveryState = {
  movies: [],
  isLoading: true,
}

export const discover = createAsyncThunk(
  'movieDiscovery/discover',
  async () => {
    const url = makeDiscoverUrl()
    const response = await getApiData(url)

    if (response && response.results.length) {
      return response.results
    }
  }
)

export const movieDiscoverySlice = createSlice({
  name: 'movieDiscovery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(discover.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(discover.fulfilled, (state, action) => {
      if (action.payload) {
        state.movies = camelcaseKeys(action.payload)
        state.isLoading = false
      }
    })
  },
})

export default movieDiscoverySlice.reducer
