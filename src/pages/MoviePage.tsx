import { useState, useEffect, useCallback, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { MovieContext } from '../store/MoviesContext'
import { MovieDetails } from '../types/APIResponsesTypes'
import { getMoviePoster } from '../utils'
import { getCacheData } from '../utils/cache'
import HeartSvg from '../components/svg/HeartSvg'
import { useAppDispatch, useAppSelector } from '../hooks'
import { favoritesSlice } from '../store/favoritesSlice'

export default function MoviePage() {
  const { id } = useParams()
  const { state } = useLocation()
  const [cache, setCache] = useState({} as MovieDetails)
  const favorites = useAppSelector((state) => state.favorites)
  const dispatch = useAppDispatch()

  const loadCachedMovieData = useCallback(async () => {
    const cacheData = await getCacheData('favorite-movies', `/movie/${id}`)

    cacheData && setCache(cacheData)
  }, [id])

  useEffect(() => {
    loadCachedMovieData()
  }, [loadCachedMovieData])

  let dataSource: MovieDetails

  // data passed through react router navigate state
  if (state && state.hasInfo) {
    dataSource = state
  }
  // data loaded and passed from cache
  else {
    dataSource = cache
  }

  const isFavorite = favorites.find(
    (movieFavorite) => movieFavorite.id === dataSource.id
  )

  const handleHeartClick = () => {
    dispatch(
      favoritesSlice.actions.update({
        id: dataSource.id,
        title: dataSource.title,
      })
    )
  }

  const content = (
    <>
      <Col sm md lg={{ span: 4 }} className="me-lg-5">
        <img
          src={getMoviePoster(dataSource.posterPath)}
          alt={`${dataSource.title} movie poster`}
          style={{ width: '100%' }}
        />
      </Col>
      <Col sm md lg>
        <h2>{dataSource.title}</h2>
        <p>{dataSource.overview}</p>
        <button
          className={
            isFavorite
              ? 'btn-mybtn btn-mybtn-primary'
              : 'btn-mybtn btn-mybtn-primary-outline'
          }
          onClick={handleHeartClick}
        >
          <span style={{ marginRight: '.25rem' }}>favorite</span>

          <HeartSvg />
        </button>
      </Col>
    </>
  )

  return (
    <Container>
      <Row>{content}</Row>
    </Container>
  )
}
