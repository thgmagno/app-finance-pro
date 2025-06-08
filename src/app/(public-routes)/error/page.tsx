'use server'

import { buttonVariants } from '@/components/ui/button'
import { env } from '@/lib/env'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function GlobalError() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get(env.SESSION_KEY)
  const href = isAuthenticated ? '/' : '/auth'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-[90%] max-w-lg space-y-6 text-center">
        <h1 className="text-3xl font-bold">Algo deu errado</h1>
        <p className="text-muted-foreground">
          Não conseguimos processar sua solicitação. Pode ser um erro interno ou
          algo inesperado.
        </p>
        <div className="mx-auto flex max-w-sm flex-col space-y-4">
          <Link href={href} className={buttonVariants()}>
            Voltar para a página principal
          </Link>
          <Link
            href={href}
            className={buttonVariants({ variant: 'secondary' })}
          >
            Entrar em contato com o suporte
          </Link>
        </div>
      </div>
    </div>
  )
}
