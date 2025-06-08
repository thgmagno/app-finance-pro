'use client'

import { timestampToDate } from '@/lib/utils'
import { useUserStore } from '@/store/useUserStore'

export function UserInfo() {
  const { userCtx, lastUpdateAt } = useUserStore()

  if (!userCtx) return null

  return (
    <section className="flex flex-col items-start space-y-2 rounded-md border bg-zinc-900 p-3">
      <h1>{userCtx.name}</h1>
      <span className="text-muted-foreground">{userCtx.email}</span>
      <small className="text-muted-foreground">
        Dados atualizados em: {timestampToDate(lastUpdateAt)}
      </small>
    </section>
  )
}
