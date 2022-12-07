import { isNull } from 'lodash'
const { VITE_IMG_API_URL: IMG_API_URL } = import.meta.env

export const copyObjectAndTransformPropsToCamelCase = <T>(oldObj: T) => {
  const newObj = { ...oldObj }

  for (const key in newObj) {
    if (
      typeof newObj[key] === 'object' &&
      !isNull(newObj[key]) &&
      !Array.isArray(newObj[key])
    ) {
      const recursiveObj = copyObjectAndTransformPropsToCamelCase(newObj[key])
      newObj[key] = recursiveObj
    }

    let newKey = key

    const index = key.indexOf('_')

    if (index > -1) {
      let toUpperCaseIndex

      newKey = key
        .split('')
        .map((char, i) => {
          if (char === '_') {
            toUpperCaseIndex = i + 1
            return ''
          }

          if (toUpperCaseIndex > 1 && toUpperCaseIndex === i) {
            return char.toUpperCase()
          }

          return char
        })
        .join('')

      newObj[newKey] = newObj[key]
      delete newObj[key]
    }
  }
  return newObj
}

export const adaptDataPropsToCamelCase = <T>(data: T | T[]) => {
  if (!Array.isArray(data)) {
    return copyObjectAndTransformPropsToCamelCase(data)
  } else {
    const adapted = data.map((obj) => {
      return copyObjectAndTransformPropsToCamelCase(obj)
    })
    return adapted
  }
}

export const getMoviePoster = (posterPath: string): string => {
  return `${IMG_API_URL}${posterPath}`
}
