import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import camelcaseKeys from 'camelcase-keys'
import { MovieDetails } from '../types/APIResponsesTypes'
import { getApiData, makeSearchUrl } from '../utils/api'
import { addDataIntoCache, getCacheData } from '../utils/cache'

interface movieSearchState {
  data: [] | MovieDetails[]
  isLoading: true | false
}

const initialState: movieSearchState = {
  data: [],
  isLoading: true,
}

export const search = createAsyncThunk(
  'movieSearch/search',
  async (searchTerm: string) => {
    const url = makeSearchUrl(searchTerm)

    const cacheResponse = await getCacheData('search-cache', url)
    console.log({ cacheResponse })
    if (cacheResponse) return cacheResponse
    else {
      const apiResponse = await getApiData(url)

      if (apiResponse && apiResponse.results.length) {
        const data = camelcaseKeys(apiResponse.results)
        addDataIntoCache('search-cache', url, data)

        return data
      }
    }
  }
)

export const movieSearchSlice = createSlice({
  name: 'movieSearch',
  initialState,
  reducers: {
    addResults: (state, action) => {
      state.data = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(search.fulfilled, (state, action) => {
      console.log(action)
      if (action.payload) {
        state.data = action.payload
        state.isLoading = false
      }
    })
  },
})

export const { addResults, setIsLoading } = movieSearchSlice.actions

export default movieSearchSlice.reducer
