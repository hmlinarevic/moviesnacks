import { useState, useCallback, MouseEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import { addDataIntoCache, getCachedMovieDetails } from '../../utils/cache'
import { MovieDetails } from '../../types/APIResponsesTypes'
import { useAppDispatch } from '../../hooks'
import { update } from '../../store/movieFavoritesSlice'
import BookmarkSvg from '../svg/BookmarkSvg'
import { getMoviePoster } from '../../utils/movie'
import './MovieCard.css'

export type MovieProps = MovieDetails & { isFavorite: boolean | undefined }

const MovieCard = ({
  id,
  title,
  overview,
  genreIds,
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
        genreIds,
        releaseDate,
        posterPath,
      })
    }
  }

  return (
    <Col className="movie-card-container mb-4" xs={6} sm={4} lg={2}>
      <Card className="movie-card" onClick={handleCardClick}>
        <Card.Img variant="top" src={getMoviePoster(posterPath)} />
        <button
          className={
            isFavorite
              ? 'movie-card-btn-bookmark movie-card-btn-bookmark-clicked'
              : 'movie-card-btn-bookmark'
          }
          onClick={handleHeartClick}
        >
          <BookmarkSvg />
        </button>
      </Card>
    </Col>
  )
}

export default MovieCard
