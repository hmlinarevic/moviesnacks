import { useContext, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Card, Button } from 'react-bootstrap'
import { MovieContext } from '../../store/MoviesContext'
import HeartSvg from '../svg/HeartSvg'
import './MovieCard.css'

const { VITE_IMG_API_URL: IMG_API_URL } = import.meta.env

type MovieProps = {
  id: number
  title: string
  overview: string
  posterPath: string
}

const MovieCard = ({ id, title, overview, posterPath }: MovieProps) => {
  const movieCtx = useContext(MovieContext)
  const navigate = useNavigate()

  const imgUrl = `${IMG_API_URL}${posterPath}`

  const handleCardClick = () => {
    navigate(`/movie/${id}`, {
      state: { details: { title, overview, poster: imgUrl } },
    })
  }

  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    console.log('favorite button clicked!')
    movieCtx.dispatch({
      type: 'SET-FAVORITES',
      payload: { id, title, details: { overview, imgUrl } },
    })
  }

  return (
    <Col className="movie-card-container mb-4" xs={6} sm={4} lg={3}>
      <Card className="movie-card" onClick={handleCardClick}>
        <Card.Img variant="top" src={imgUrl} />
        <Card.Body className="movie-card-body">
          <Card.Title className="movie-card-title">{title}</Card.Title>
          <Button className="movie-card-btn" onClick={handleBtnClick}>
            <HeartSvg />
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default MovieCard
