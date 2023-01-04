import camelcaseKeys from 'camelcase-keys'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '.'
import { MovieDetails, MovieGenre } from '../types/APIResponsesTypes'
import { getApiData, getApiEndpoint } from '../utils/api'
import { addDataIntoCache, getCacheData } from '../utils/cache'

// search slice
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

// movies slice
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
  async (pages: number, { getState }) => {
    console.log('fetching popular movies...', { pages })

    let results: MovieDetails[] = []
    let endpoint

    for (let currentPage = 1; currentPage <= pages; currentPage++) {
      endpoint = getApiEndpoint('/movie/popular', { page: currentPage })

      const cacheResponse = await getCacheData<MovieDetails[]>(
        'discover-movies',
        endpoint
      )
      console.log({ endpoint })

      if (cacheResponse) {
        results.push(...cacheResponse)
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

          endpoint && addDataIntoCache('discover-movies', endpoint, results)
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
      'discover-movies',
      endpoint
    )

    if (cacheResponse) return cacheResponse
    else {
      const apiResponse = await getApiData(endpoint)
      if (apiResponse?.results) {
        const adaptedResponse = camelcaseKeys(apiResponse.results)

        addDataIntoCache('discover-movies', endpoint, adaptedResponse)

        return adaptedResponse
      }
    }
  }
)
