import { ReactNode } from 'react'
import { Providers } from './providers'
import { Navigation } from '@/components/Navigation'

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <main className="mx-auto max-w-5xl md:w-[92%]">
        <Navigation />
        <section className="card mt-4 mb-20 border-y px-3 py-6 pb-12 md:px-6">
          {children}
        </section>
      </main>
    </Providers>
  )
}
