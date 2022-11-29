import { CSSProperties, useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import { MovieContext } from '../store/MoviesContext'

const posterStyle: CSSProperties = {
  maxHeight: '500px',
  width: '100%',
  objectFit: 'cover',
}

const MovieDetails = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const movieCtx = useContext(MovieContext)

  let content

  // data found in favorites
  if (id && movieCtx.favorites.length) {
    const movie = movieCtx.favorites.find((f) => f.id === +id)
    if (movie) {
      content = (
        <>
          <Col sm md lg>
            <img
              style={posterStyle}
              src={movie.details.imgUrl}
              alt={`${movie.title} movie poster`}
            />
          </Col>
          <Col sm md lg>
            <h2>{movie.title}</h2>
            <p>{movie.details.overview}</p>
            <Button
              className="btn btn-warning"
              onClick={() => {
                movieCtx.dispatch({
                  type: 'SET-FAVORITES',
                  payload: {
                    id: movie.id,
                    title: movie.title,
                    details: movie.details,
                  },
                })
              }}
            >
              unfavorite
            </Button>
          </Col>
        </>
      )
    }
  }

  // data passed through movieCard
  if (state) {
    content = (
      <>
        <Col sm md lg>
          <img
            style={posterStyle}
            src={state.details.poster}
            alt={`${state.details.title} movie poster`}
          />
        </Col>
        <Col sm md lg>
          <h2>{state.details.title}</h2>
          <p>{state.details.overview}</p>
        </Col>
      </>
    )
  }

  return (
    <Container>
      <Row>{content ? content : <p>no movie found</p>}</Row>
    </Container>
  )
}

export default MovieDetails
