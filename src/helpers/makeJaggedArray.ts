export const makeJaggedArray = <T>(array: Array<T>, size: number) => {
  const data: Array<T[]> = []
  const numOfSlices = array.length / size

  let start = 0
  let end = size

  for (let i = 0; i < numOfSlices; i++) {
    data.push(array.slice(start, end))
    start += size
    end += size
  }

  return data
}
