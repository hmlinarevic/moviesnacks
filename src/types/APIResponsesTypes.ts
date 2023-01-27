export interface MovieAPIResponse {
  page: number
  results: MovieDetails[]
  total_results: number
  total_pages: number
  success: true | false
  genres: MovieGenre[]
}

export interface MovieDetails {
  id: number
  title: string
  overview: string
  releaseDate: string
  posterPath: string
  genreIds: number[]
  genres?: string[] | undefined
}

export interface MovieGenre {
  id: number
  name: string
}
