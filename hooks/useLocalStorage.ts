import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState(fallbackValue)
  useEffect(() => {
    const stored = localStorage.getItem(key)
    console.log(stored)
    setValue(stored ? JSON.parse(stored) : fallbackValue)
  }, [fallbackValue, key])

  useEffect(() => {
    console.log(value)
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

// https://upmostly.com/next-js/using-localstorage-in-next-js
