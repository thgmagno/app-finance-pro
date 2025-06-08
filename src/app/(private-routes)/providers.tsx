'use client'

import { fetcherUserCtx } from '@/lib/fetcher'
import { useUserStore } from '@/store/useUserStore'
import { ReactNode, useEffect } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const { getUserCtx, setUserCtx } = useUserStore.getState()

  useEffect(() => {
    const loadCtx = async () => {
      if (!getUserCtx()) {
        const freshCtx = await fetcherUserCtx()
        console.log('Cache userCtx atualizado!')
        if (freshCtx) setUserCtx(freshCtx)
      }
    }

    loadCtx()
  }, [])

  return <>{children}</>
}
