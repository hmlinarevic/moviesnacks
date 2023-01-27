import { Container, Form, Navbar, Offcanvas } from 'react-bootstrap'
import Logo from '../logo'
import NavigationMenu from './NavigationMenu'
import MovieSearch from '../movie/MovieSearch'
import './Navigation.css'

export default function Navigation() {
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
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md" />
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* menu */}
            <NavigationMenu />

            {/* search */}
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <MovieSearch />
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </Container>
  )
}
