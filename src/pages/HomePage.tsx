import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import StaticPostersCarousel from '../components/ui/StaticPosterCarousel'
import LogoText from '../components/logo/LogoText'
import tabletUrl from '../assets/moviesnacks-tablet.png'
import phoneUrl from '../assets/moviesnacks-phone.png'
import './HomePage.css'

const HomePage = () => {
  return (
    <>
      <Container>
        <section className="section-featured feature">
          <Row>
            <Col
              lg={{ span: 6, order: 2 }}
              className="d-flex justify-content-center"
            >
              <StaticPostersCarousel />
            </Col>
            <Col lg>
              <h1>All your streaming services in one app.</h1>
              <p>
                Get personal recommendations for movies and TV shows available
                on Netflix, Amazon Prime Video, Disney Plus and many more
              </p>
              <Link to="/discover">
                <button className="btn btn-warning">Discover movies</button>
              </Link>
            </Col>
          </Row>
        </section>
        <section className="section-tablet feature">
          <Row>
            <Col lg>
              <img src={tabletUrl} alt="tablet" />
            </Col>
            <Col
              lg
              className="d-lg-flex flex-lg-column justify-content-lg-center"
            >
              <span>all in one place</span>
              <h2>Your streaming guide</h2>
              <p>
                Get personal recommendations and see what’s new across your
                favorite streaming services.
              </p>
            </Col>
          </Row>
        </section>
        <section className="section-phone feature">
          <Row>
            <Col
              lg={{ span: 6, order: 2 }}
              className="d-lg-flex justify-content-lg-center"
            >
              <img src={phoneUrl} alt="phone" />
            </Col>
            <Col
              lg
              className="d-lg-flex flex-lg-column justify-content-lg-center"
            >
              <span>wherever you go</span>
              <h2>Available on your devices</h2>
              <p>
                Explore thousands of hours of TV series, movies and originals.
                Stream on up to four screens at once on compatible devices
              </p>
            </Col>
          </Row>
        </section>
        <footer className="d-flex justify-content-center align-items-center">
          <LogoText />
          <span>@</span>
          <span>2022</span>
        </footer>
      </Container>
    </>
  )
}

export default HomePage
