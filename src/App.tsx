import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/ui/Navigation'
import HomePage from './pages/HomePage'
import DiscoveryPage from './pages/DiscoveryPage'
import ResultsPage from './pages/ResultsPage'
import MoviePage from './pages/MoviePage'
import { useAppDispatch } from './hooks'
import {
  fetchMovieGenres,
  fetchNowPlayingMovies,
  fetchPopularMovies,
} from './store/moviesSlice'
import { loadFavoriteMovies } from './store/favoritesSlice'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchMovieGenres())
    dispatch(fetchPopularMovies(20)) // argument --> num of pages
    dispatch(fetchNowPlayingMovies())

    dispatch(loadFavoriteMovies())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoveryPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
