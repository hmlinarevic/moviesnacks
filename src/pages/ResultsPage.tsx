import { Container, Row, Spinner } from 'react-bootstrap'
import MovieCard from '../components/movie/MovieCard'
import { useAppSelector } from '../hooks'

const ResultsPage = () => {
  const favorites = useAppSelector((state) => state.favorites)
  const searchMovies = useAppSelector((state) => state.searchMovies)

  const content = searchMovies.data.map((movie) => {
    // find out if movie is favorited
    const isFavorite = Boolean(
      favorites.find((movieFavorite) => movieFavorite.id === movie.id)
    )

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

  if (searchMovies.isLoading) {
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
