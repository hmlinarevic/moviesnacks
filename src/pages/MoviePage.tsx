import { useState, useEffect, useCallback, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { MovieDetails } from '../types/APIResponsesTypes'
import { getMoviePoster } from '../utils'
import { getCacheData, getCachedMovieDetails } from '../utils/cache'
import HeartSvg from '../components/svg/HeartSvg'
import { useAppDispatch, useAppSelector } from '../hooks'
import { favoritesSlice } from '../store/favoritesSlice'

const MoviePage = () => {
  const { id } = useParams()
  const { state: routerState } = useLocation()
  const [cachedData, setCachedData] = useState({} as MovieDetails)
  const favorites = useAppSelector((state) => state.favorites)
  const dispatch = useAppDispatch()

  const loadCachedMovieData = useCallback(async () => {
    const cacheResponse = await getCachedMovieDetails(`/movie/${id}`)
    console.log({ cacheResponse })

    cacheResponse && setCachedData(cacheResponse)
  }, [id])

  console.log({ cachedData })

  let dataSource: MovieDetails

  // data loaded from react router's useNavigate hook
  if (routerState) {
    dataSource = routerState
  }
  // data loaded from cache
  else {
    dataSource = cachedData
  }

  const isFavorite = favorites.find(
    (movieFavorite) => movieFavorite.id === dataSource.id
  )

  useEffect(() => {
    if (dataSource === cachedData) {
      loadCachedMovieData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          onClick={() => {
            dispatch(
              favoritesSlice.actions.update({
                id: dataSource.id,
                title: dataSource.title,
              })
            )
          }}
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

export default MoviePage
