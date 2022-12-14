import { MovieDetails } from '../types/APIResponsesTypes'

export const addDataIntoCache = (
  cacheName: string,
  url: string,
  response: MovieDetails | MovieDetails[]
) => {
  console.log('call to add data into cache')
  // Converting our response into Actual Response form
  const data = new Response(JSON.stringify(response))
  if ('caches' in window) {
    // Opening given cache and putting our data into it
    caches.open(cacheName).then((cache) => {
      cache.put(url, data)
      console.log('Data Added into cache!')
    })
  }
}

export const getCachedMovieDetails = async (
  url: string,
  cacheName = 'movie-data'
): Promise<MovieDetails | undefined> => {
  try {
    const cache = await caches.open(cacheName)
    const res = await cache.match(url)

    if (res?.ok) {
      return await res.json()
    }
  } catch (error) {
    console.log(error)
  }
}

export const getCacheData = async (
  cacheName: string,
  url: string
): Promise<MovieDetails | MovieDetails[] | undefined> => {
  try {
    const cache = await caches.open(cacheName)
    const res = await cache.match(url)

    if (res?.ok) {
      return await res.json()
    }
  } catch (error) {
    console.error(error)
  }
}
