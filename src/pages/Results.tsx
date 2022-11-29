import { useContext } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import { MovieContext } from '../store/MoviesContext'
import MovieCard from '../components/movie/MovieCard'

const Results = () => {
  const movieCtx = useContext(MovieContext)

  const content = movieCtx.searched.map((movie) => {
    if (!movie.poster_path) return null

    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        posterPath={movie.poster_path}
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

export default Results
