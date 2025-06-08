export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export interface UserCtx {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
}

export interface UserCtxState {
  userCtx: UserCtx | null
  timestamp: number | null
  lastUpdateAt: number | null
  setUserCtx: (ctx: UserCtx) => void
  clearUserCtx: () => void
  isExpired: () => boolean
  getUserCtx: () => UserCtx | null
}
