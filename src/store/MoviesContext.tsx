import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react'
import { MovieDetails } from '../types/APIResponsesTypes'
import { MovieCollectionActions, MovieFavorite, reducer } from './movieReducer'

export type MovieCollection = {
  searched: MovieDetails[]
  loaded: []
  isLoading: boolean
  favorites: MovieFavorite[]
}

interface MovieContextType extends MovieCollection {
  dispatch: Dispatch<MovieCollectionActions>
}

const initalState: MovieCollection = {
  searched: [],
  loaded: [],
  favorites: [],
  isLoading: false,
}

export const MovieContext = createContext(initalState as MovieContextType)

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initalState)

  useEffect(() => {
    const favorites = localStorage.getItem('movie-favorites-ids')

    if (favorites) {
      const parsedFavorites = JSON.parse(favorites)

      if (parsedFavorites.length) {
        localStorage.setItem('movie-favorites-ids', `${favorites}`)
        dispatch({ type: 'SET-FAVORITES', payload: parsedFavorites })
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'movie-favorites-ids',
      `${JSON.stringify(state.favorites.map((f) => f.id))}`
    )
  }, [state.favorites])

  return (
    <MovieContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}
