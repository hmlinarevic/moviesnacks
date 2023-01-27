import { useInView } from 'react-intersection-observer'
import { MovieDetails } from '../../../types/APIResponsesTypes'
import MovieCardContent from './MovieCardContent'
import './MovieCard.css'

export default function MovieCard(props: MovieDetails) {
  const { ref, inView } = useInView()

  return (
    <div className="movie-card-container" ref={ref}>
      {inView ? (
        <MovieCardContent {...props} />
      ) : (
        <div style={{ height: '340px' }} />
      )}
    </div>
  )
}
