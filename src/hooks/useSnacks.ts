import { useQuery } from '@tanstack/react-query'
import { getSnacks } from '../services/snackService'

export function useSnacks() {
  return useQuery({
    queryKey: ['snacks'],
    queryFn: () => Promise.resolve(getSnacks()),
  })
}
