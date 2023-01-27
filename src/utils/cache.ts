import { MovieDetails, MovieGenre } from '../types/APIResponsesTypes'

export const addDataIntoCache = <T>(
  cacheName: string,
  url: string,
  response: T | MovieDetails | MovieDetails[] | MovieGenre[]
) => {
  const data = new Response(JSON.stringify(response))

  if ('caches' in window) {
    caches.open(cacheName).then((cache) => {
      cache.put(url, data)
    })
  }
}

export const getCacheData = async <T>(
  cacheName: string,
  url: string
): Promise<T | undefined> => {
  try {
    const cache = await caches.open(cacheName)
    const res = await cache.match(url)

    if (res?.ok) {
      return res.json()
    }
  } catch (error) {
    console.error(error)
  }
}
