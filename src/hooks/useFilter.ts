/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react'

type DataToFilter = {
  [k: PropertyKey]: any
}

export interface Filter {
  // property which will be used to access data
  prop: PropertyKey

  // callback which will be called on accessed data
  callback: (...params: any) => boolean
}

const filterFunction = (
  data: DataToFilter,
  prop: PropertyKey,
  callback: (data: any) => boolean
): any[] => {
  return data.filter((accessedData: any) => callback(accessedData[prop]))
}

export default function useFilter<T extends DataToFilter>(
  data: T
): [any[], React.Dispatch<React.SetStateAction<Filter>>] {
  const [content, setContent] = useState<any[]>([])
  const [filter, setFilter] = useState({} as Filter)

  useEffect(() => {
    const { prop, callback } = filter

    if (filter.prop) {
      const content = filterFunction(data, prop, callback)

      setContent(content)
    }
  }, [data, filter])

  return [content, setFilter]
}
