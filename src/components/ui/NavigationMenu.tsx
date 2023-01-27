import { Link } from 'react-router-dom'
import { Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  clearFavoriteMovies,
  clearFavoriteMoviesStorage,
} from '../../store/favoritesSlice'

export default function NavigationMenu() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClearFavorites = () => {
    dispatch(clearFavoriteMovies())
    dispatch(clearFavoriteMoviesStorage())
  }
  const favoriteMovies = useAppSelector((state) => state.favorites.movies)

  return (
    <Nav className="nav-custom justify-content-end flex-grow-1 pe-3">
      {/* discover page link */}
      <Nav.Link
        className="nav-menu-btn-discover"
        onClick={() => navigate('/discover')}
      >
        Discover
      </Nav.Link>

      {/* favorite movies dropdown */}
      <NavDropdown title="Favorites" id="offcanvasNavbarDropdown-expand-md">
        {favoriteMovies.length ? (
          <>
            {favoriteMovies.map((movie) => (
              <Link
                key={movie.id}
                className="dropdown-item"
                to={`movie/${movie.id}`}
              >
                {movie.title}
              </Link>
            ))}

            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleClearFavorites}>
              clear favorites
            </NavDropdown.Item>
          </>
        ) : (
          <NavDropdown.Item disabled>empty</NavDropdown.Item>
        )}
      </NavDropdown>
    </Nav>
  )
}
