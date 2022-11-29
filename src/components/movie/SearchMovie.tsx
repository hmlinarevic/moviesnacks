import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchMovies } from '../../api/searchMovies'
import { MovieContext } from '../../store/MoviesContext'
import './SearchMovie.css'

const SearchMovie = () => {
  const [query, setQuery] = useState('')
  const moviesCtx = useContext(MovieContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!query) return

    const id = setTimeout(async () => {
      console.log('searching movies...', query)

      moviesCtx.dispatch({ type: 'SET-ISLOADING', payload: true })
      navigate('/results')

      const searchResult = await searchMovies(query)

      // cached data
      if (Array.isArray(searchResult)) {
        moviesCtx.dispatch({ type: 'SEARCH', payload: searchResult })
      }
      // api response
      else {
        console.log('received back api response but no data')

        if (searchResult.success === false) {
          moviesCtx.dispatch({ type: 'SEARCH', payload: [] })
        }
        if (searchResult.results) {
          moviesCtx.dispatch({ type: 'SEARCH', payload: searchResult.results })
        }
      }
      moviesCtx.dispatch({ type: 'SET-ISLOADING', payload: false })
    }, 1000)

    return () => {
      clearTimeout(id)
    }
    // [navigate]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <>
      <input
        type="search"
        placeholder="Search movies"
        className="form-control search me-2"
        aria-label="Search movies"
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  )
}

export default SearchMovie
