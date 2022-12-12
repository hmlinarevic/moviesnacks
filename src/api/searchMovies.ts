import { API_KEY, API_URL, handleApiCall } from '.'
import { MovieDetails } from '../types/APIResponsesTypes'
import { adaptDataPropsToCamelCase } from '../utils'
import { addDataIntoCache, getCacheData } from '../utils/cache'

const params = `language=en-US&page=1&include_adult=false`

export async function searchMovies(movie: string) {
  const url = `${API_URL}/search/movie?api_key=${API_KEY}&${params}&query=${movie}`
  console.log(url)

  const cacheData = await getCacheData('searchCache', url)

  if (cacheData) {
    console.log('data found in cache:', cacheData)
    console.log('data send from cache')
    return adaptDataPropsToCamelCase(cacheData)
  } else {
    // const data = await handleApiCall(url)
    // if (data.results.length) {
    //   const adaptedData = adaptDataPropsToCamelCase(data.results)
    //   console.log({ adaptedData, oldData: data.results })
    //   console.log({ hadnleApiCallResonse: data })
    //   addDataIntoCache('searchCache', url, data.results)
    // }
    // return data
  }
}
