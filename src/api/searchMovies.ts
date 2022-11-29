import { API_KEY, API_URL, handleApiCall } from '.'
import { addDataIntoCache, getAllCacheData } from '../utils/cache'

const params = `language=en-US&page=1&include_adult=false`

export async function searchMovies(movie: string) {
  const url = `${API_URL}/search/movie?api_key=${API_KEY}&${params}&query=${movie}`
  console.log(url)

  const cacheData = await getAllCacheData(url)

  if (cacheData) {
    console.log('data found in cache:', cacheData)
    console.log('data send from cache')
    return cacheData
  } else {
    const data = await handleApiCall(url)

    if (data.results.length) {
      console.log({ hadnleApiCallResonse: data })
      addDataIntoCache('searchCache', url, data.results)
    }
    return data
  }
}
