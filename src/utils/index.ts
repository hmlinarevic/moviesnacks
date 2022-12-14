const { VITE_IMG_API_URL: IMG_API_URL } = import.meta.env

export const getMoviePoster = (posterPath: string): string => {
  return `${IMG_API_URL}${posterPath}`
}
