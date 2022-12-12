import { useContext } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import { MovieContext } from '../store/MoviesContext'
import MovieCard from '../components/movie/MovieCard'

type FavoriteMovieIdsMap = { [id: string]: string }

const ResultsPage = () => {
  const movieCtx = useContext(MovieContext)

  let mapOfFavoriteMovieIds: FavoriteMovieIdsMap

  if (movieCtx.favorites.length) {
    mapOfFavoriteMovieIds = movieCtx.favorites.reduce((obj, favorite) => {
      obj[favorite.id] = favorite.title

      return obj
    }, {} as FavoriteMovieIdsMap)
  }

  const content = movieCtx.searched.map((movie) => {
    let isFavorite

    if (mapOfFavoriteMovieIds) {
      isFavorite = Boolean(mapOfFavoriteMovieIds[movie.id])
    }

    if (!movie.posterPath) return null

    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        genresIds={movie.genresIds}
        posterPath={movie.posterPath}
        releaseDate={movie.releaseDate}
        isFavorite={isFavorite}
      />
    )
  })

  if (movieCtx.isLoading) {
    return (
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      </Container>
    )
  }

  return (
    <Container>
      <Row>{content.length ? content : <p>Movie could not be found</p>}</Row>
    </Container>
  )
}

export default ResultsPage
