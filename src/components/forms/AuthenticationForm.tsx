'use client'

import { useActionState, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { actions } from '@/actions'
import { InputCustom } from './fields/InputCustom'
import { InputPassword } from './fields/InputPassword'
import { ShowMessage } from './fields/ShowMessage'

export function AuthenticationForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'login' ? 'register' : 'login'))
  }

  return (
    <>
      {mode === 'login' ? (
        <LoginForm toggleMode={toggleMode} />
      ) : (
        <RegisterForm toggleMode={toggleMode} />
      )}
    </>
  )
}

function HeaderForm() {
  return (
    <header className="mt-4 mb-8 flex flex-col items-center space-y-2.5">
      <div className="h-12 w-12 rounded-lg bg-gradient-to-tr from-amber-800 to-indigo-900" />
      <h1 className="mb-4 text-2xl font-light">Bem-vindo!</h1>
    </header>
  )
}

function Divider() {
  return (
    <div className="mt-4 flex w-full items-center justify-center space-x-4">
      <div className="flex-1 border-t" />
      <span>ou</span>
      <div className="flex-1 border-t" />
    </div>
  )
}

function FormWrapper({
  children,
  action,
}: {
  children: React.ReactNode
  action: (payload: FormData) => void
}) {
  return (
    <form
      action={action}
      className="flex w-[92%] max-w-sm flex-col items-center rounded-4xl bg-neutral-900 p-6 shadow-lg sm:p-8"
    >
      <HeaderForm />
      <div className="flex w-full flex-col space-y-3">{children}</div>
    </form>
  )
}

function LoginForm({ toggleMode }: { toggleMode: () => void }) {
  const [formState, action, isPending] = useActionState(actions.auth.login, {
    errors: {},
  })

  return (
    <FormWrapper action={action}>
      <InputCustom
        name="email"
        placeholder="E-mail"
        isInvalid={!!formState.errors?.email}
        errorMessage={formState.errors?.email}
        prevState={formState.prevState?.email}
      />
      <InputPassword
        isInvalid={!!formState.errors?.password}
        errorMessage={formState.errors?.password}
        prevState={formState.prevState?.password}
      />
      {formState.response && (
        <ShowMessage message={formState.response} type="success" />
      )}
      {formState.errors._form && (
        <ShowMessage message={formState.errors._form} />
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Aguarde...' : 'Entrar'}
      </Button>
      <Button type="button" variant="ghost">
        Esqueceu a senha?
      </Button>
      <Divider />
      <Button type="button" onClick={toggleMode} variant="link">
        Crie uma conta
      </Button>
    </FormWrapper>
  )
}

function RegisterForm({ toggleMode }: { toggleMode: () => void }) {
  const [formState, action, isPending] = useActionState(actions.auth.register, {
    errors: {},
  })

  return (
    <FormWrapper action={action}>
      <InputCustom
        name="name"
        placeholder="Nome"
        isInvalid={!!formState.errors?.name}
        errorMessage={formState.errors?.name}
        prevState={formState.prevState?.name}
      />
      <InputCustom
        name="email"
        placeholder="E-mail"
        isInvalid={!!formState.errors?.email}
        errorMessage={formState.errors?.email}
        prevState={formState.prevState?.email}
      />
      <InputPassword
        isInvalid={!!formState.errors?.password}
        errorMessage={formState.errors?.password}
        prevState={formState.prevState?.password}
      />
      <InputPassword
        confirm
        isInvalid={!!formState.errors?.confirmPassword}
        errorMessage={formState.errors?.confirmPassword}
        prevState={formState.prevState?.confirmPassword}
      />
      {formState.response && (
        <ShowMessage message={formState.response} type="success" />
      )}
      {formState.errors._form && (
        <ShowMessage message={formState.errors._form} />
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Aguarde...' : 'Criar conta'}
      </Button>
      <Divider />
      <Button type="button" onClick={toggleMode} variant="link">
        Entre com e-mail e senha
      </Button>
    </FormWrapper>
  )
}
