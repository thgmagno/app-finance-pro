'use client'

export function VerifyAnimation() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-[80%] max-w-md animate-pulse space-y-4 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
          Bem-vindo ao FinancePRO
        </h1>
        <p className="text-muted-foreground md:text-lg">
          Estamos verificando suas credenciais...
        </p>
        <div className="mt-4 h-1 w-full overflow-hidden rounded bg-slate-700">
          <div className="h-full animate-[progress_5s_linear_forwards] bg-emerald-400" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
