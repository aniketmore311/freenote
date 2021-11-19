import { useState, useCallback } from 'react'

export default function useLoading(initState) {
  const [isLoading, setIsLoading] = useState(initState);
  const startLoading = useCallback(
    () => {
      setIsLoading(true);
    },
    [],
  )
  const stopLoading = useCallback(
    () => {
      setIsLoading(false);
    },
    [],
  )
  return { isLoading, startLoading, stopLoading }
}
