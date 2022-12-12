import { MovieDetails } from '../types/APIResponsesTypes'
import { MovieCollection } from './MoviesContext'

export type MovieFavorite = {
  id: number
  title: string
}

type SearchAction = {
  type: 'SEARCH'
  payload: MovieDetails[]
}

type LoadingAction = {
  type: 'UPDATE-ISLOADING'
  payload: true | false
}

type FavoritesAction = {
  type: 'UPDATE-FAVORITES'
  payload: MovieFavorite | MovieFavorite[]
}

export type MovieCollectionActions =
  | SearchAction
  | LoadingAction
  | FavoritesAction

export const reducer = (
  state: MovieCollection,
  action: MovieCollectionActions
): MovieCollection => {
  //
  switch (action.type) {
    case 'SEARCH':
      return { ...state, searched: action.payload }
    //
    case 'UPDATE-ISLOADING':
      return { ...state, isLoading: action.payload }
    //
    case 'UPDATE-FAVORITES':
      // single obj
      if (!Array.isArray(action.payload)) {
        const favorite = action.payload
        const favoritesCopy = [...state.favorites]

        // check if it's already part of favorites list
        const index = favoritesCopy.findIndex((f) => f.id === favorite.id)
        if (index >= 0) {
          // remove
          favoritesCopy.splice(index, 1)
        } else {
          // add
          favoritesCopy.push(favorite)
        }

        return { ...state, favorites: favoritesCopy }
      }
      // list of obj
      else {
        return { ...state, favorites: action.payload }
      }
    default:
      return state
  }
}
