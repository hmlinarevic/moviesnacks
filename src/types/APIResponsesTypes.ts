export interface MovieAPIResponse {
  page: number
  results: MovieDetails[]
  total_results: number
  total_pages: number
  success: true | false
}

export interface MovieDetails {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
  genres_ids: number[]
}
