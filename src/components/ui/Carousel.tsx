import { Navigation, A11y } from 'swiper'

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { nanoid } from 'nanoid'

import 'swiper/css'
import 'swiper/css/navigation'

type Props<U> = {
  items: U[]
  component: React.ElementType
  id: string
}

interface Cache {
  [k: string]: any
}

// remember carousel slide position
const cache: Cache = {
  init(id: string) {
    this.id = id

    this[id] = {
      activeIndex: 0,
    }
  },
  getIndex(id: string) {
    return this[id].activeIndex
  },
  setIndex(id: string, index: number) {
    this[id].activeIndex = index
  },
}

export default function Carousel<T>({
  id,
  items,
  component: Component,
}: Props<T>) {
  const content = items.map((item) => {
    return <Component key={nanoid()} {...item} />
  })

  if (!cache[id]) {
    cache.init(id)
  }

  return (
    <Swiper
      slidesPerView={5}
      // spaceBetween={30}
      modules={[Navigation, A11y]}
      navigation
      initialSlide={cache.getIndex(id)}
      onActiveIndexChange={(e) => {
        cache.setIndex(id, e.activeIndex)

        console.log('active index changed')
        console.log({ id, cache: cache[id] })
      }}
    >
      {content.map((x, i) => (
        <SwiperSlide key={i} data-slide={`slide${i + 1}`}>
          {x}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
