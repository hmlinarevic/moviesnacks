import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/ui/Navigation'
import { MovieProvider } from './store/MoviesContext'
import HomePage from './pages/HomePage'
import DiscoveryPage from './pages/DiscoveryPage'
import ResultsPage from './pages/ResultsPage'
import MoviePage from './pages/MoviePage'

const App = () => {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover" element={<DiscoveryPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  )
}

export default App
