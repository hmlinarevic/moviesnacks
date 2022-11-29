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
import SearchMovie from '../movie/SearchMovie'
import { useContext } from 'react'
import { MovieContext } from '../../store/MoviesContext'
import './Navigation.css'

const Navigation = () => {
  const movieCtx = useContext(MovieContext)
  const navigate = useNavigate()

  const dropDownContent = movieCtx.favorites.map((f) => {
    if (f) {
      return (
        <Link key={f.id} to={`/movie/${f.id}`} className="dropdown-item">
          {f.title}
        </Link>
      )
    }
  })

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
                  dropDownContent
                ) : (
                  <NavDropdown.Item disabled>empty</NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <SearchMovie />
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </Container>
  )
}

export default Navigation
