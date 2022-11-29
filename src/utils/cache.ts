import { MovieDetails } from '../types/APIResponsesTypes'

export const addDataIntoCache = (
  cacheName: string,
  url: string,
  response: MovieDetails[]
) => {
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

export const getAllCacheData = async (
  url: string
): Promise<MovieDetails[] | void> => {
  const names = await caches.keys()
  const name = names.find((name) => name === 'searchCache')

  if (!name) return

  const cacheDataArray: MovieDetails[] = []

  // Opening particular cache
  const cacheStorage = await caches.open(name)
  // Fetching from particular cache data
  const cachedResponse = await cacheStorage.match(url)
  // Cached data not found
  if (cachedResponse === undefined) return
  // Pushing fetched data into our cacheDataArray
  const data = await cachedResponse.json()
  cacheDataArray.push(...data)

  return cacheDataArray
}
