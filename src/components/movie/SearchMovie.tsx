import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchMovies } from '../../api/searchMovies'
import { useAppDispatch } from '../../hooks'
import { searchMoviesSlice } from '../../store/searchMoviesSlice'
import './MovieSearch.css'

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const search = async () => {
    navigate('/results')

    const searchResult = await searchMovies(searchTerm)

    if (!searchResult) {
      dispatch(searchMoviesSlice.actions.addResults([]))
    } else {
      console.log({ searchResult })
      dispatch(searchMoviesSlice.actions.addResults(searchResult))
    }
    dispatch(searchMoviesSlice.actions.setIsLoading(false))
  }

  useEffect(() => {
    if (!searchTerm) return

    const timeoutID = setTimeout(search, 1000)

    return () => {
      clearTimeout(timeoutID)
    }

    // [navigate]
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
        onSubmit={() => console.log('search submited')}
      />
    </>
  )
}

export default MovieSearch
