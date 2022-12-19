import { useState, useCallback, MouseEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import { addDataIntoCache, getCachedMovieDetails } from '../../utils/cache'
import { MovieDetails } from '../../types/APIResponsesTypes'
import { getMoviePoster } from '../../utils'
import { useAppDispatch } from '../../hooks'
import { update } from '../../store/movieFavoritesSlice'
import HeartSvg from '../svg/HeartSvg'
import './MovieCard.css'

type MovieProps = MovieDetails & { isFavorite: boolean | undefined }

const MovieCard = ({
  id,
  title,
  overview,
  genresIds,
  posterPath,
  releaseDate,
  isFavorite,
}: MovieProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [cacheData, setCacheData] = useState({} as MovieDetails)

  const loadCachedMovieDetails = useCallback(async () => {
    const cacheResponse = await getCachedMovieDetails(`/movie/${id}`)

    cacheResponse && setCacheData(cacheResponse)
  }, [id])

  useEffect(() => {
    loadCachedMovieDetails()
  }, [loadCachedMovieDetails])

  const handleCardClick = () => {
    navigate(`/movie/${id}`, {
      state: {
        id,
        title,
        overview,
        posterPath,
        releaseDate,
      },
    })
  }

  const handleHeartClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    dispatch(update({ id, title }))

    if (!cacheData.id) {
      addDataIntoCache('movie-data', `movie/${id}`, {
        id,
        title,
        overview,
        genresIds,
        releaseDate,
        posterPath,
      })
    }
  }

  return (
    <Col className="movie-card-container mb-4" xs={6} sm={4} lg={2}>
      <Card className="movie-card" onClick={handleCardClick}>
        <Card.Img variant="top" src={getMoviePoster(posterPath)} />
        {/* <Card.Body className="movie-card-body"> */}
        {/* <Card.Title className="movie-card-title">{title}</Card.Title> */}
        <button className="movie-card-btn-test" onClick={handleHeartClick}>
          <HeartSvg />
        </button>
        {/* <button
            className={
              isFavorite
                ? 'btn-mybtn btn-mybtn-primary'
                : 'btn-mybtn btn-mybtn-primary-outline'
            }
            onClick={handleHeartClick}
          >
            <HeartSvg />
          </button> */}
        {/* </Card.Body> */}
      </Card>
    </Col>
  )
}

export default MovieCard
