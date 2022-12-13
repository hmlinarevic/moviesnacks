import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchMovies } from '../../api/searchMovies'
import { useAppDispatch } from '../../hooks'
import { searchMoviesSlice } from '../../store/searchMoviesSlice'
import './SearchMovie.css'

const SearchMovie = () => {
  const [query, setQuery] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!query) return

    const id = setTimeout(async () => {
      console.log('searching movies...', query)

      navigate('/results')

      const searchResult = await searchMovies(query)

      // cached data
      if (Array.isArray(searchResult)) {
        console.log('dispatching action', searchResult)

        dispatch(searchMoviesSlice.actions.addResults(searchResult))
        dispatch(searchMoviesSlice.actions.setIsLoading(false))
      }
      // api response
      // else {
      //   console.log('received back api response but no data')

      //   if (searchResult.success === false) {
      //     moviesCtx.dispatch({ type: 'SEARCH', payload: [] })
      //   }
      //   if (searchResult.results) {
      //     moviesCtx.dispatch({ type: 'SEARCH', payload: searchResult.results })
      //   }
      // }
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
