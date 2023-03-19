import { useEffect, useState } from "react"

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

export default useHasMounted

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
