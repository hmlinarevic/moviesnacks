import { MovieAPIResponse } from '../types/APIResponsesTypes'
import { makeQueryString, QueryParams } from '../helpers/makeQueryString'

export const {
  VITE_API_URL: API_BASE_URL,
  VITE_API_KEY: API_KEY,
  VITE_IMG_API_URL: IMG_API_URL,
} = import.meta.env

export const getApiEndpoint = (path: string, params?: QueryParams) => {
  return `${API_BASE_URL}${path}${makeQueryString(path, params)}`
}

export async function getApiData(
  endpoint: string
): Promise<MovieAPIResponse | undefined> {
  console.log('fetching data...', { getApiData: endpoint })

  try {
    const res = await fetch(endpoint)

    if (res.ok) {
      return res.json()
    }
  } catch (e) {
    console.error(e)
  }
}
