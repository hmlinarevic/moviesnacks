import { useEffect } from 'react'

export default function useWindowResize(callback: () => void) {
  useEffect(() => {
    window.addEventListener('resize', callback)

    return () => {
      window.removeEventListener('resize', callback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
