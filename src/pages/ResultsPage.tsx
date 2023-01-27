import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { useAppSelector } from '../hooks'
import MovieCard from '../components/movie/MovieCard'
import ErrorBoundary from '../components/ui/ErrorBoundary'

function ResultsPage() {
  const searched = useAppSelector((state) => ({
    movies: state.search.movies,
    isLoadingMovies: state.search.isLoading.movies,
    hasError: state.search.hasError,
  }))

  const content = searched.movies.map((movie) => {
    if (!movie.posterPath) return null

    return (
      <Col key={movie.id} className="mb-4" xs={6} sm={4} lg={2}>
        <MovieCard
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          genreIds={movie.genreIds}
          posterPath={movie.posterPath}
          releaseDate={movie.releaseDate}
        />
      </Col>
    )
  })

  if (searched.isLoadingMovies) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ResultsPageErrorBoundary(props: any) {
  return (
    <ErrorBoundary>
      <ResultsPage {...props} />
    </ErrorBoundary>
  )
}
