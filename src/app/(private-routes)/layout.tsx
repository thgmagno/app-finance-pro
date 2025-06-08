import { ReactNode } from 'react'
import { Providers } from './providers'

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>
}
