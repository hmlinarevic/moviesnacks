import { MovieDetails } from '../types/APIResponsesTypes'

export const addDataIntoCache = (
  cacheName: string,
  url: string,
  response: MovieDetails | MovieDetails[]
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

// export const getAllCacheData = async (
//   cacheToFind: string,
//   url: string
// ): Promise<MovieDetails[] | void> => {
//   const names = await caches.keys()
//   const name = names.find((name) => name === cacheToFind)

//   console.log({ name })

//   if (!name) return

//   const cacheDataArray: MovieDetails[] = []

//   // Opening particular cache
//   const cacheStorage = await caches.open(name)
//   console.log({ cacheStorage })
//   // Fetching from particular cache data
//   const cachedResponse = await cacheStorage.match(url)
//   console.log({ cachedResponse })
//   // Cached data not found
//   if (cachedResponse === undefined) return
//   // Pushing fetched data into our cacheDataArray
//   const data = await cachedResponse.json()
//   cacheDataArray.push(...data)

//   return cacheDataArray
// }

export const getCacheData = async (
  cacheName: string,
  url: string
): Promise<MovieDetails | undefined> => {
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
