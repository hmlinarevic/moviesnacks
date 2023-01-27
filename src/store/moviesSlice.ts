import camelcaseKeys from 'camelcase-keys'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApiEndpoint, getApiData } from '../utils/api'
import { MovieDetails, MovieGenre } from '../types/APIResponsesTypes'
import { getCacheData, addDataIntoCache } from '../utils/cache'
import { RootState } from '.'

interface MoviesState {
  genres: MovieGenre[]
  popular: MovieDetails[]
  nowPlaying: MovieDetails[]

  isLoading: {
    genres: true | false
    popular: true | false
    nowPlaying: true | false
  }
}

const initialState: MoviesState = {
  genres: [],
  popular: [],
  nowPlaying: [],

  isLoading: {
    genres: true,
    popular: true,
    nowPlaying: true,
  },
}

export const fetchMovieGenres = createAsyncThunk(
  'movies/fetchGenres',
  async () => {
    const endpoint = getApiEndpoint('/genre/movie/list')
    const cacheResponse = await getCacheData<MovieGenre[]>(
      'movie-genres',
      endpoint
    )

    if (cacheResponse) return cacheResponse
    else {
      const apiResponse = await getApiData(endpoint)
      if (apiResponse?.genres) {
        addDataIntoCache('movie-genres', endpoint, apiResponse.genres)

        return apiResponse.genres
      }
    }
  }
)

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (options: { pages: number; isRefetch: true | false }, { getState }) => {
    let results: MovieDetails[] = []
    let endpoint

    for (let currentPage = 1; currentPage <= options.pages; currentPage++) {
      endpoint = getApiEndpoint('/movie/popular', { page: currentPage })

      const cacheResponse = await getCacheData<MovieDetails[]>(
        'movie-discovery',
        endpoint
      )

      if (cacheResponse && !options.isRefetch) {
        results = results.concat(cacheResponse)
      } else {
        const apiResponse = await getApiData(endpoint)
        if (apiResponse?.results.length) {
          const adaptedResponse = camelcaseKeys(apiResponse.results)

          results = results.concat(adaptedResponse)

          const state = getState() as RootState

          // add genres property to each movieDetail by mapping over genreIds
          /* (e.g. result)
            {
              ...MovieDetails,
              genreIDs: [13, 54, 23] --> genres: ['Fantasy, Thriller, Mystery']
            }
          */
          results.forEach((movieDetails) => {
            movieDetails.genres = movieDetails.genreIds.map(
              (detailsGenreId) => {
                const genre = state.movies.genres.find(
                  (genre) => genre.id === detailsGenreId
                )

                if (genre) return genre.name
                else return ''
              }
            )
          })

          endpoint &&
            addDataIntoCache('movie-discovery', endpoint, adaptedResponse)
        }
      }
    }

    return results
  }
)

export const fetchNowPlayingMovies = createAsyncThunk(
  'movies/fetchNowPlaying',
  async () => {
    const endpoint = getApiEndpoint('/movie/now_playing')
    const cacheResponse = await getCacheData<MovieDetails[]>(
      'movie-discovery',
      endpoint
    )

    if (cacheResponse) return cacheResponse
    else {
      const apiResponse = await getApiData(endpoint)
      if (apiResponse?.results) {
        const adaptedResponse = camelcaseKeys(apiResponse.results)

        addDataIntoCache('movie-discovery', endpoint, adaptedResponse)

        return adaptedResponse
      }
    }
  }
)

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieGenres.fulfilled, (state, action) => {
      if (action.payload) {
        state.genres = action.payload
        state.isLoading.genres = false
      }
    })
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.popular = action.payload
        state.isLoading.popular = false
      }
    })
    builder.addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.nowPlaying = action.payload
        state.isLoading.nowPlaying = false
      }
    })
  },
})

export default moviesSlice.reducer
