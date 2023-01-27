import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { MovieDetails } from '../../../types/APIResponsesTypes'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { getMoviePoster } from '../../../utils/movie'
import {
  updateFavoriteMovies,
  updateFavoriteMoviesStorage,
} from '../../../store/favoritesSlice'
import BookmarkSvg from '../../svg/BookmarkSvg'

export default function MovieCardContent({
  id,
  title,
  overview,
  genreIds,
  posterPath,
  releaseDate,
}: MovieDetails) {
  const favoriteMovies = useAppSelector((state) => state.favorites.movies)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isFavorite = favoriteMovies.find((movie) => movie.id === id)

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

  const handleBookmarkClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    dispatch(updateFavoriteMovies({ id, title }))

    dispatch(
      updateFavoriteMoviesStorage({
        id,
        title,
        overview,
        releaseDate,
        posterPath,
        genreIds,
      })
    )
  }

  return (
    <Card className="movie-card" onClick={handleCardClick}>
      <Card.Img
        variant="top"
        src={getMoviePoster(posterPath)}
        className="movie-card-image-placeholder"
      />
      <button
        className={
          isFavorite
            ? 'movie-card-btn-bookmark movie-card-btn-bookmark-clicked'
            : 'movie-card-btn-bookmark'
        }
        onClick={handleBookmarkClick}
      >
        <BookmarkSvg />
      </button>
    </Card>
  )
}
