import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import camelcaseKeys from 'camelcase-keys'
import { getApiData, getApiEndpoint } from '../utils/api'
import { MovieDetails } from '../types/APIResponsesTypes'

interface movieDiscoveryState {
  popular: {
    data: [] | MovieDetails[]
    isLoading: true | false
  }
  nowPlaying: {
    data: [] | MovieDetails[]
    isLoading: true | false
  }
}

const initialState: movieDiscoveryState = {
  popular: { data: [], isLoading: true },
  nowPlaying: { data: [], isLoading: true },
}

export const discoverNowPlaying = createAsyncThunk(
  'movieDiscovery/discoverNowPlaying',
  async () => {
    const endpoint = getApiEndpoint('now_playing')
    const response = await getApiData(endpoint)

    if (response && response.results.length) {
      return response.results
    }
  }
)

export const discoverPopular = createAsyncThunk(
  'movieDiscovery/discoverPopular',
  async () => {
    const endpoint = getApiEndpoint('popular')
    const response = await getApiData(endpoint)

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
    builder.addCase(discoverPopular.fulfilled, (state, action) => {
      if (action.payload) {
        state.popular.data = camelcaseKeys(action.payload)
        state.popular.isLoading = false
      }
    })
    builder.addCase(discoverNowPlaying.fulfilled, (state, action) => {
      if (action.payload) {
        state.nowPlaying.data = camelcaseKeys(action.payload)
        state.nowPlaying.isLoading = false
      }
    })
  },
})

export default movieDiscoverySlice.reducer
