import { MovieAPIResponse } from '../types/APIResponsesTypes'

// api details
export const {
  VITE_API_URL: API_URL,
  VITE_API_KEY: API_KEY,
  VITE_IMG_API_URL: IMG_API_URL,
} = import.meta.env

// fetch data
export async function handleApiCall(url: string): Promise<MovieAPIResponse> {
  let data
  try {
    console.log('...fetching data..........')
    const res = await fetch(url)
    data = await res.json()

    console.log({ handleApiCall: data })
    return data
  } catch (e) {
    console.error(e)
  }
  return data
}
