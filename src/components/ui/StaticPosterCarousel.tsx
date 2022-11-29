import { Carousel, Container, Row } from 'react-bootstrap'

import Poster from '../movie/Poster'
import poster1 from '../../assets/home-pages-posters/abbott.webp'
import poster2 from '../../assets/home-pages-posters/american.webp'
import poster3 from '../../assets/home-pages-posters/andor.webp'
import poster4 from '../../assets/home-pages-posters/barbarian.webp'
import poster5 from '../../assets/home-pages-posters/better.webp'
import poster6 from '../../assets/home-pages-posters/doctor.webp'
import poster7 from '../../assets/home-pages-posters/documentary.webp'
import poster8 from '../../assets/home-pages-posters/english.webp'
import poster9 from '../../assets/home-pages-posters/ghosts.webp'
import poster10 from '../../assets/home-pages-posters/guillermo.webp'
import poster11 from '../../assets/home-pages-posters/house.webp'
import poster12 from '../../assets/home-pages-posters/inside.webp'
import poster13 from '../../assets/home-pages-posters/interview.webp'
import poster14 from '../../assets/home-pages-posters/peripheral.webp'
import poster15 from '../../assets/home-pages-posters/rick.webp'
import poster16 from '../../assets/home-pages-posters/terrifier.webp'
import poster17 from '../../assets/home-pages-posters/top.webp'
import poster18 from '../../assets/home-pages-posters/watcher.webp'
import poster19 from '../../assets/home-pages-posters/white.webp'
import poster20 from '../../assets/home-pages-posters/yellowstone.webp'

const StaticPostersCarousel = () => {
  return (
    <Container>
      <div className="posters-carousel">
        <Row>
          <Carousel interval={null} indicators={false}>
            <Carousel.Item>
              <div className="d-flex">
                <Poster imgUrl={poster1} />
                <Poster imgUrl={poster2} />
                <Poster imgUrl={poster3} />
                <Poster imgUrl={poster4} />
                <Poster imgUrl={poster5} />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex">
                <Poster imgUrl={poster6} />
                <Poster imgUrl={poster7} />
                <Poster imgUrl={poster8} />
                <Poster imgUrl={poster9} />
                <Poster imgUrl={poster10} />
              </div>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row>
          <Carousel interval={null} indicators={false}>
            <Carousel.Item>
              <div className="d-flex">
                <Poster imgUrl={poster11} />
                <Poster imgUrl={poster12} />
                <Poster imgUrl={poster13} />
                <Poster imgUrl={poster14} />
                <Poster imgUrl={poster15} />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex">
                <Poster imgUrl={poster16} />
                <Poster imgUrl={poster17} />
                <Poster imgUrl={poster18} />
                <Poster imgUrl={poster19} />
                <Poster imgUrl={poster20} />
              </div>
            </Carousel.Item>
          </Carousel>
        </Row>
      </div>
    </Container>
  )
}

export default StaticPostersCarousel
