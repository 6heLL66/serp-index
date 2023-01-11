import { useCallback, useState } from 'react'

export const useRequest = <T>(
  request: () => Promise<T>,
  onSuccess?: () => void,
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const fetch = useCallback(() => {
    setLoading(true)

    return request()
      .then(res => {
        setData(res)
        onSuccess?.()
      })
      .catch(err => {
        setError(err?.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [request, onSuccess])

  return { data, loading, error, fetch }
}
