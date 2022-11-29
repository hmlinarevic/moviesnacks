import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/ui/Navigation'
import { MovieProvider } from './store/MoviesContext'
import Home from './pages/Home'
import MovieDiscovery from './pages/MovieDiscovery'
import Results from './pages/Results'
import MovieDetails from './pages/MovieDetails'

const App = () => {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<MovieDiscovery />} />
          <Route path="/results" element={<Results />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  )
}

export default App
