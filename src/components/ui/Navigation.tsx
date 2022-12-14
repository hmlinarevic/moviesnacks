import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap'
import Logo from '../logo'
import MovieSearch from '../movie/MovieSearch'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { favoritesSlice } from '../../store/favoritesSlice'
import './Navigation.css'

const Navigation = () => {
  const favorites = useAppSelector((state) => state.favorites)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const dropDownContent = favorites.map((favoriteMovie) => (
    <Link
      key={favoriteMovie.id}
      className="dropdown-item"
      to={`movie/${favoriteMovie.id}`}
    >
      {favoriteMovie.title}
    </Link>
  ))

  const handleClearFavorites = () => {
    dispatch(favoritesSlice.actions.clear())
  }

  return (
    <Container>
      <Navbar key="md" variant="dark" expand="md" className="nav">
        <Navbar.Brand>
          <Logo size={48} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
        >
          <Offcanvas.Header closeButton className="btn-close-white">
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link onClick={() => navigate('/discover')}>
                Discover
              </Nav.Link>
              <NavDropdown
                title="Favorites"
                id="offcanvasNavbarDropdown-expand-md"
              >
                {dropDownContent.length ? (
                  <>
                    {dropDownContent}

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
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <MovieSearch />
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </Container>
  )
}

export default Navigation
