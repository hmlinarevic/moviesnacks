import { nanoid } from 'nanoid'
import { Navigation, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import './Carousel.css'

type Props<T> = {
  id: string
  items: T[]
  heading: string
  component: React.ElementType
  numOfSlides: number
}

interface CarouselCache extends Record<string, any> {
  init: (id: string) => void
  setIndex: (id: string, index: number) => void
  getIndex: (id: string) => number
}

const cache: CarouselCache = {
  init(id) {
    this[id] = {
      activeIndex: 0,
    }
  },
  setIndex(id, index) {
    this[id].activeIndex = index
  },
  getIndex(id) {
    return this[id].activeIndex
  },
}

export default function Carousel<T>({
  id,
  items,
  heading,
  component: Component,
  numOfSlides,
}: Props<T>) {
  const content = items.map((item) => (
    <SwiperSlide key={nanoid()}>
      <Component {...item} />
    </SwiperSlide>
  ))

  if (!cache[id]) {
    cache.init(id)
  }

  return (
    <>
      <h2>{heading}</h2>
      <Swiper
        slidesPerView={numOfSlides}
        spaceBetween={20}
        modules={[Navigation, A11y]}
        navigation
        initialSlide={cache.getIndex(id)}
        onActiveIndexChange={(e) => cache.setIndex(id, e.activeIndex)}
      >
        {content}
      </Swiper>
    </>
  )
}
