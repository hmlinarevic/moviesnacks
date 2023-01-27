export const createLocalStorageWrapper = <T>(key: string) => {
  const saveToStorage = (state: T) => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem(key, serializedState)
    } catch (error) {
      if (error instanceof Error) {
        console.warn(`Failed to save state to local storage: ${error.message}`)
      }
    }
  }

  const loadFromStorage = (): T | undefined => {
    const serializedState = localStorage.getItem(key)

    if (!serializedState) {
      return undefined
    } else {
      return JSON.parse(serializedState)
    }
  }

  return { saveToStorage, loadFromStorage }
}
