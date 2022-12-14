import { MovieAPIResponse } from '../types/APIResponsesTypes'

export const {
  VITE_API_URL: API_URL,
  VITE_API_KEY: API_KEY,
  VITE_IMG_API_URL: IMG_API_URL,
} = import.meta.env

const defaultParams = `language=en-US&page=1&include_adult=false`

export const makeSearchUrl = (searchTerm: string) => {
  return `${API_URL}/search/movie?api_key=${API_KEY}&${defaultParams}&query=${searchTerm}`
}

export async function getApiData(url: string): Promise<MovieAPIResponse> {
  console.log('fetching data...', { handleApiCall: url })

  let data
  try {
    const res = await fetch(url)
    data = await res.json()

    return data
  } catch (e) {
    console.error(e)
  }
  return data
}
