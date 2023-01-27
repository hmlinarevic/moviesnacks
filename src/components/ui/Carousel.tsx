import { memo } from 'react'
import { nanoid } from 'nanoid'
import { Navigation, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CAROUSEL_SLIDE_WIDTH } from '../../config'
import 'swiper/css'
import 'swiper/css/navigation'
import './Carousel.css'

type Props<T> = {
  id: string
  items: T[]
  heading?: string
  className?: string
  spaceBetween: number
  component: React.ElementType
  parentContainerWidth: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default memo(function Carousel<T>({
  id,
  items,
  heading,
  className,
  spaceBetween,
  component: Component,
  parentContainerWidth,
}: Props<T>) {
  const numOfSlides = Math.round(parentContainerWidth / CAROUSEL_SLIDE_WIDTH)

  if (!cache[id]) {
    cache.init(id)
  }

  return (
    <div className={className}>
      {heading && <h2>{heading}</h2>}
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={numOfSlides}
        modules={[Navigation, A11y]}
        navigation
        initialSlide={cache.getIndex(id)}
        onActiveIndexChange={(e) => cache.setIndex(id, e.activeIndex)}
      >
        {items.map((item) => (
          <SwiperSlide key={nanoid()}>
            <Component {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
})
