'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function VerifyPageError() {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/auth')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold">Erro na verificação</h1>
        <p className="text-lg">
          Algo deu errado com sua chave de acesso. Pode estar ausente, inválida
          ou expirada.
        </p>
        <p className="text-muted-foreground text-sm">
          Você será redirecionado para a tela de login em instantes...
        </p>
      </div>
    </div>
  )
}
