import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import { Container } from 'react-bootstrap'
import { useAppSelector } from '../hooks'
import { groupMoviesByGenre } from '../utils/movie'
import Carousel from '../components/ui/Carousel'
import MovieCard from '../components/movie/MovieCard'
import FilterNavigation from '../components/ui/FilterNavigation'
import './DiscoveryPage.css'

export default function DiscoveryPage() {
  // movies
  const nowPlaying = useAppSelector((state) => state.movies.nowPlaying)
  const popular = useAppSelector((state) => state.movies.popular)

  const popularMoviesByGenre = groupMoviesByGenre(popular)

  console.log({ popularMoviesByGenre })

  // slider config
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()
  const [numOfSlides, setNumOfSlides] = useState(3)
  const slideWidth = 260

  // loading
  const [isLoadingContent, setIsLoadingContent] = useState(true)

  useLayoutEffect(() => {
    if (!containerRef.current) return

    const { clientWidth } = containerRef.current
    const slides = Math.round(clientWidth / slideWidth)

    setNumOfSlides(slides)
  }, [containerWidth])

  useEffect(() => {
    const handleWindowResize = () => {
      setContainerWidth(containerRef.current?.clientWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    setIsLoadingContent(false)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <Container ref={containerRef}>
      {isLoadingContent && <h3>loading...</h3>}

      {!isLoadingContent && (
        <>
          <FilterNavigation />

          <Carousel
            id="carousel-0"
            items={nowPlaying}
            heading="Now Playing"
            component={MovieCard}
            numOfSlides={numOfSlides}
          />
          <Carousel
            id="carousel-1"
            items={popular}
            heading="Popular"
            component={MovieCard}
            numOfSlides={numOfSlides}
          />

          {Object.entries(popularMoviesByGenre).map((moviesByGenre, i) => {
            const genre = moviesByGenre[0]
            const listOfMovies = moviesByGenre[1]

            return (
              <Carousel
                key={nanoid()}
                id={`carousel-${i + 2}`}
                items={listOfMovies}
                heading={genre}
                component={MovieCard}
                numOfSlides={numOfSlides}
              />
            )
          })}
        </>
      )}
    </Container>
  )
}
