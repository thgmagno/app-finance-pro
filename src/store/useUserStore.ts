import { ONE_HOUR } from '@/lib/contants'
import { UserCtxState } from '@/lib/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create<UserCtxState>()(
  persist(
    (set, get) => ({
      userCtx: null,
      timestamp: null,
      lastUpdateAt: null,

      setUserCtx: (ctx) => {
        const now = Date.now()
        set(() => ({
          userCtx: ctx,
          timestamp: now,
          lastUpdateAt: now,
        }))
      },

      clearUserCtx: () =>
        set(() => ({
          userCtx: null,
          timestamp: null,
          lastUpdateAt: null,
        })),

      isExpired: () => {
        const ts = get().timestamp
        if (!ts) return true
        return Date.now() - ts > ONE_HOUR
      },

      getUserCtx: () => {
        if (get().isExpired()) {
          get().clearUserCtx()
          return null
        }
        return get().userCtx
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        userCtx: state.userCtx,
        timestamp: state.timestamp,
        lastUpdateAt: state.lastUpdateAt,
      }),
    },
  ),
)
