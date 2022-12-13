import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/ui/Navigation'
import HomePage from './pages/HomePage'
import DiscoveryPage from './pages/DiscoveryPage'
import ResultsPage from './pages/ResultsPage'
import MoviePage from './pages/MoviePage'

const App = () => {
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
