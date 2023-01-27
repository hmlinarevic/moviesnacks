import { MovieDetails } from '../types/APIResponsesTypes'

const { VITE_IMG_API_URL: IMG_API_URL } = import.meta.env

type MoviesByGenre = {
  [genre: string]: MovieDetails[]
}

export const getMoviePoster = (
  posterPath: string | undefined
): string | undefined => {
  if (!posterPath) return
  return `${IMG_API_URL}${posterPath}`
}

export const groupMoviesByGenre = (movies: MovieDetails[]) => {
  const grouped = movies.reduce((obj, movie) => {
    if (movie.genres) {
      const genre = movie.genres[0]
      const details = { ...movie }

      if (genre) {
        if (obj[genre]) {
          obj[genre].push(details)
        } else {
          obj[genre] = []
          obj[genre].push(details)
        }
      }
    }
    return obj
  }, {} as MoviesByGenre)

  return grouped
}
