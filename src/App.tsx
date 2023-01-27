import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppDispatch } from './hooks'
import {
  fetchMovieGenres,
  fetchNowPlayingMovies,
  fetchPopularMovies,
} from './store/moviesSlice'
import { loadFavoriteMovies } from './store/favoritesSlice'
import Navigation from './components/ui/Navigation'
import HomePage from './pages/HomePage'
import DiscoveryPage from './pages/DiscoveryPage'
import ResultsPage from './pages/ResultsPage'
import MoviePage from './pages/MoviePage'
import NotFound404Page from './pages/NotFound404Page'
import { POPULAR_MOVIES_PAGES } from './config'
import { createLocalStorageWrapper } from './utils/localStorage'

const { saveToStorage, loadFromStorage } =
  createLocalStorageWrapper<number>('date-snap')

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const currentDate = new Date().getDate()
    const previousDate = loadFromStorage()

    !previousDate && saveToStorage(new Date().getDate())

    const isRefetch = currentDate !== previousDate ? true : false

    dispatch(fetchMovieGenres())
    dispatch(fetchPopularMovies({ pages: POPULAR_MOVIES_PAGES, isRefetch }))
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
        <Route path="*" element={<NotFound404Page />} />
      </Routes>
    </BrowserRouter>
  )
}
