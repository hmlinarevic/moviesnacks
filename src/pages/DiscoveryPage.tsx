import { useState, useEffect, useMemo } from 'react'
import { nanoid } from 'nanoid'
import { Container, Row, Col } from 'react-bootstrap'
import { useAppSelector } from '../hooks'
import { MovieDetails } from '../types/APIResponsesTypes'
import useWindowResize from '../hooks/useWindowResize'
import useFilter from '../hooks/useFilter'
import { groupMoviesByGenre } from '../utils/movie'
import Carousel from '../components/ui/Carousel'
import MovieCard from '../components/movie/MovieCard/'
import Filters from '../components/ui/Filters'
import './DiscoveryPage.css'

export default function DiscoveryPage() {
  const movies = {
    nowPlaying: useAppSelector((state) => state.movies.nowPlaying),
    popular: useAppSelector((state) => state.movies.popular),
  }

  // used for carousel config - calc num of slides
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const container = document.getElementById('content-container')
    container && setContainerWidth(container.clientWidth)
  }, [])

  useWindowResize(() => {
    const container = document.getElementById('content-container')
    container && setContainerWidth(container.clientWidth)
  })

  // content filtering hook
  const [filteredContent, setFilter] = useFilter<MovieDetails[]>(movies.popular)

  const popularMoviesByGenre = useMemo(
    () => groupMoviesByGenre(movies.popular),
    [movies.popular]
  )
  const popularMoviesEntries = useMemo(
    () => Object.entries(popularMoviesByGenre),
    [popularMoviesByGenre]
  )

  const isCarouselReady =
    containerWidth &&
    movies.nowPlaying.length &&
    movies.popular.length &&
    !filteredContent.length

  return (
    <Container id="content-container">
      <Filters
        listOfGenre={Object.keys(popularMoviesByGenre)}
        setFilter={setFilter}
      />

      {filteredContent.length ? (
        <Row>
          {filteredContent.map((movie) => (
            <Col key={nanoid()} className="mb-4" xs={6} sm={4} lg={2}>
              <MovieCard {...movie} />
            </Col>
          ))}
        </Row>
      ) : null}

      {isCarouselReady ? (
        <Carousel
          id="discovery-carousel-0"
          className="discovery-carousel"
          spaceBetween={20}
          items={movies.nowPlaying}
          heading="Now Playing"
          component={MovieCard}
          parentContainerWidth={containerWidth}
        />
      ) : null}

      {isCarouselReady
        ? popularMoviesEntries.map((moviesByGenre, i) => {
            const genre = moviesByGenre[0]
            const listOfMovies = moviesByGenre[1]

            if (listOfMovies.length < 7) return null

            return (
              <Carousel
                key={listOfMovies[0].id}
                id={`discovery-carousel-${i + 1}`}
                className="discovery-carousel"
                spaceBetween={20}
                items={listOfMovies}
                heading={genre}
                component={MovieCard}
                parentContainerWidth={containerWidth}
              />
            )
          })
        : null}
    </Container>
  )
}
