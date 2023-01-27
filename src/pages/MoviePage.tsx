import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks'
import { MovieDetails } from '../types/APIResponsesTypes'
import {
  updateFavoriteMovies,
  updateFavoriteMoviesStorage,
} from '../store/favoritesSlice'
import { getMoviePoster } from '../utils/movie'
import { getCacheData } from '../utils/cache'
import HeartSvg from '../components/svg/HeartSvg'

export default function MoviePage() {
  const { id } = useParams()
  const { state } = useLocation()
  const [movieData, setMovieData] = useState<MovieDetails>()
  const favoriteMovies = useAppSelector((state) => state.favorites.movies)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!state) {
      getCacheData<MovieDetails>('movie-details', `/movie/${id}`).then((data) =>
        setMovieData(data)
      )
    } else {
      setMovieData(state)
    }
  }, [id, state])

  const isFavorite = favoriteMovies.find((movie) => movie.id === Number(id))

  return (
    <Container>
      {!movieData || !id ? (
        <p>movie not found</p>
      ) : (
        <Row>
          <Col sm md lg={{ span: 4 }}>
            <img
              src={getMoviePoster(movieData.posterPath)}
              alt={`${movieData.title} dataSource poster`}
              style={{ width: '100%' }}
            />
          </Col>
          <Col sm md lg>
            <h2>{movieData.title}</h2>
            <p>{movieData.overview}</p>
            <button
              className={
                isFavorite
                  ? 'btn-mybtn btn-mybtn-primary'
                  : 'btn-mybtn btn-mybtn-primary-outline'
              }
              onClick={() => {
                dispatch(
                  updateFavoriteMovies({
                    id: Number(id),
                    title: movieData.title,
                  })
                )

                dispatch(
                  updateFavoriteMoviesStorage({
                    ...movieData,
                  })
                )
              }}
            >
              <span style={{ marginRight: '.25rem' }}>favorite</span>

              <HeartSvg />
            </button>
          </Col>
        </Row>
      )}
    </Container>
  )
}
