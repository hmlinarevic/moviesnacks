import { useState, useCallback, MouseEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import { addDataIntoCache, getCacheData } from '../../utils/cache'
import { MovieDetails } from '../../types/APIResponsesTypes'
import HeartSvg from '../svg/HeartSvg'
import { getMoviePoster } from '../../utils'
import { useAppDispatch } from '../../hooks'
import { favoritesSlice } from '../../store/favoritesSlice'
import './MovieCard.css'

type MovieProps = MovieDetails & { isFavorite: boolean | undefined }

export default function MovieCard({
  id,
  title,
  overview,
  genresIds,
  posterPath,
  releaseDate,
  isFavorite,
}: MovieProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [cache, setCache] = useState({} as MovieDetails)

  const loadCachedMovieData = useCallback(async () => {
    const cacheData = await getCacheData('favorite-movies', `/movie/${id}`)

    cacheData && setCache(cacheData)
  }, [id])

  useEffect(() => {
    loadCachedMovieData()
  }, [loadCachedMovieData])

  const handleCardClick = () => {
    navigate(`/movie/${id}`, {
      state: {
        hasInfo: true,
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

    dispatch(favoritesSlice.actions.update({ id, title }))

    if (!cache.id) {
      addDataIntoCache('favorite-movies', `movie/${id}`, {
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
        <Card.Body className="movie-card-body">
          {/* <Card.Title className="movie-card-title">{title}</Card.Title> */}
          <button
            className={
              isFavorite
                ? 'btn-mybtn btn-mybtn-primary'
                : 'btn-mybtn btn-mybtn-primary-outline'
            }
            onClick={handleHeartClick}
          >
            <HeartSvg />
          </button>
        </Card.Body>
      </Card>
    </Col>
  )
}
