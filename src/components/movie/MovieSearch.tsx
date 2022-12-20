import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { search } from '../../store/movieSearchSlice'
import './MovieSearch.css'

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!searchTerm) return

    const timeoutID = setTimeout(() => {
      navigate('/results')
      dispatch(search(searchTerm))
    }, 1000)

    return () => {
      clearTimeout(timeoutID)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  return (
    <>
      <input
        type="search"
        placeholder="Search movies"
        className="form-control search me-2"
        aria-label="Search movies"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </>
  )
}

export default MovieSearch
