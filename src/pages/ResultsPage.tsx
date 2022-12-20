import { Container, Row, Spinner } from 'react-bootstrap'
import { useAppSelector } from '../hooks'
import MovieCard from '../components/movie/MovieCard'

const ResultsPage = () => {
  const favorites = useAppSelector((state) => state.movieFavorites)
  const searched = useAppSelector((state) => state.movieSearch)

  const content = searched.data.map((movie) => {
    // find out if movie is favorited
    const isFavorite = Boolean(
      favorites.find((favoritedMovie) => favoritedMovie.id === movie.id)
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

  if (searched.isLoading) {
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
