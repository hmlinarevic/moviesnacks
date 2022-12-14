import camelcaseKeys from 'camelcase-keys'
import { makeSearchUrl, getApiData } from '.'
import { addDataIntoCache, getCacheData } from '../utils/cache'
import { MovieDetails } from '../types/APIResponsesTypes'

export const searchMovies = async (searchTerm: string) => {
  const url = makeSearchUrl(searchTerm)

  let dataSource: MovieDetails[] | undefined

  const cacheResponse = await getCacheData('search-cache', url)

  if (cacheResponse) {
    dataSource = cacheResponse
  } else {
    const apiResponse = await getApiData(url)

    if (apiResponse.results.length) {
      dataSource = camelcaseKeys(apiResponse.results)

      addDataIntoCache('search-cache', url, dataSource)
    }
  }

  return dataSource
}
