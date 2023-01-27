import { API_KEY } from '../utils/api'

export interface QueryParams {
  [k: string]: string | number
}

export const makeQueryString = (path: string, params?: QueryParams): string => {
  if (!params) return `?api_key=${API_KEY}`

  const defaults = {
    apiKey: `api_key=${API_KEY}`,
    lang: `language=${params?.lang || 'en-US'}`,
    page: `page=${params?.page || 1}`,
  } as QueryParams

  if (path === '/search/movies') {
    defaults.includeAdult = 'include_adult=false'
  }

  for (const key in params) {
    if (defaults[key]) {
      delete params[key]
    }
  }

  const allParams = {
    ...defaults,
    ...params,
  }

  let queryString = '?'

  for (const key in allParams) {
    if (defaults[key]) {
      queryString += `${allParams[key]}&`
    } else {
      queryString += `${key}=${allParams[key]}&`
    }
  }

  return queryString.slice(0, -1)
}
