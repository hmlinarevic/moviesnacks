import { Container } from 'react-bootstrap'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { nanoid } from 'nanoid'

interface Props<U> {
  heading?: string
  items: U[]
  size?: number
  component: React.ElementType
}

export default function Carousel<T>({
  heading,
  items,
  component: Component,
}: Props<T>) {
  const [transformValue, setTransformValue] = useState(0)
  const [carouselWidth, setCarouselWidth] = useState<number | undefined>(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const displayRef = useRef<HTMLDivElement | null>(null)

  const carouselStyle = {
    transform: `translateX(${transformValue}px)`,
  }

  console.log({ carouselWidth, transformValue })

  // if (carouselWidth) {
  //   const numOfItems = Math.round(carouselWidth / 156)
  //   console.log({ numOfItems })
  // }
  useEffect(() => {
    // set initally
    setCarouselWidth(carouselRef.current?.clientWidth)

    const handleWindowResize = () => {
      setCarouselWidth(() => carouselRef.current?.clientWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <Container>
      <h3>{heading}</h3>

      <div ref={carouselRef} className="myCarousel">
        <button
          className="myCarousel-nav-left"
          onClick={() => {
            if (!carouselWidth) return
            setTransformValue((prevValue) => prevValue + carouselWidth)
          }}
        >
          &larr;
        </button>
        <button
          className={'myCarousel-nav-right'}
          onClick={() => {
            if (!carouselWidth) return
            setTransformValue((prevValue) => prevValue - carouselWidth)
          }}
        >
          &rarr;
        </button>

        <div
          ref={displayRef}
          className="myCarousel-display"
          style={carouselStyle}
        >
          {items.map((item) => (
            <Component key={nanoid()} {...item} className="myCarousel-item" />
          ))}
        </div>
      </div>
    </Container>
  )
}
