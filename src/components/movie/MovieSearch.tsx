import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { searchMovies } from '../../store/searchSlice'
import { MOVIESEARCH_DEBOUNCE_TIME } from '../../config'
import './MovieSearch.css'

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!searchTerm) return

    const timeoutID = setTimeout(() => {
      navigate('/results')
      dispatch(searchMovies(searchTerm))
    }, MOVIESEARCH_DEBOUNCE_TIME)

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
        className="form-control search"
        aria-label="Search movies"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </>
  )
}
