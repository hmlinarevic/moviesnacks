import { MovieAPIResponse } from '../types/APIResponsesTypes'

export const {
  VITE_API_URL: API_URL,
  VITE_API_KEY: API_KEY,
  VITE_IMG_API_URL: IMG_API_URL,
} = import.meta.env

const defaultParams = `language=en-US&page=1&include_adult=false`

export const getApiEndpoint = (resource: string) => {
  return `${API_URL}/movie/${resource}?api_key=${API_KEY}&language=en-US`
}

export const makeSearchUrl = (searchTerm: string) => {
  return `${API_URL}/search/movie?api_key=${API_KEY}&${defaultParams}&query=${searchTerm}`
}

export async function getApiData(
  url: string
): Promise<MovieAPIResponse | undefined> {
  console.log('fetching data...', { getApiData: url })

  try {
    const res = await fetch(url)
    console.log({ res })

    if (res.ok) {
      return res.json()
    }
  } catch (e) {
    console.error(e)
  }
}
