import { useEffect } from 'react'
import { Container, Row, Carousel, Col } from 'react-bootstrap'
import { useAppSelector, useAppDispatch } from '../hooks'
import {
  discoverNowPlaying,
  discoverPopular,
} from '../store/movieDiscoverySlice'
import { MovieDetails } from '../types/APIResponsesTypes'
import MovieCard from '../components/movie/MovieCard'

const sliceToMultiList = (data: any, sliceSize = 5) => {
  const multiList = []
  const numOfSlices = data.length / sliceSize

  let start = 0
  let end = sliceSize

  for (let i = 0; i < numOfSlices; i++) {
    multiList.push(data.slice(start, end))
    start += sliceSize
    end += sliceSize
  }

  return multiList
}

const DiscoveryPage = () => {
  const discovery = useAppSelector((state) => state.movieDiscovery)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(discoverNowPlaying())
    // dispatch(discoverPopular())
  }, [dispatch])

  const movies = discovery.nowPlaying.data
  const moviesMulitList = sliceToMultiList(movies)

  console.log({ moviesMulitList })

  const content = moviesMulitList.map((movieList) => (
    <Carousel.Item key={movieList[0].id}>
      <Row>
        {movieList.map((movie: MovieDetails) => (
          <Col key={movie.id} lg>
            <MovieCard
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              genresIds={movie.genresIds}
              posterPath={movie.posterPath}
              releaseDate={movie.releaseDate}
              isFavorite={false} //test state (fix)
            />
          </Col>
        ))}
      </Row>
    </Carousel.Item>
  ))

  return (
    <Container>
      <div>
        <h3>Discover movies</h3>
        <Carousel interval={null} indicators={false}>
          {content}
        </Carousel>
      </div>
    </Container>
  )
}

export default DiscoveryPage
