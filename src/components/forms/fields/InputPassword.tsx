import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import clsx from 'clsx'
import { ShowMessage } from './ShowMessage'

interface InputPasswordProps extends React.ComponentProps<typeof Input> {
  confirm?: boolean
  label?: string
  isInvalid?: boolean
  errorMessage?: string | string[]
  prevState?: string | number | readonly string[]
}

export function InputPassword({
  confirm = false,
  label,
  isInvalid = false,
  errorMessage,
  prevState,
  ...props
}: InputPasswordProps) {
  const [show, setShow] = useState(false)
  const name = confirm ? 'confirmPassword' : 'password'
  const placeholder = confirm ? 'Confirmar senha' : 'Senha'

  return (
    <div className="flex w-full flex-col space-y-1.5">
      <Label htmlFor={name} className={clsx({ 'sr-only': !label })}>
        {name}
      </Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          defaultValue={prevState ?? ''}
          className={clsx({
            'border border-amber-600 bg-amber-50 text-amber-900 placeholder-amber-500 focus:border-amber-600 focus:ring-amber-600':
              isInvalid,
          })}
          {...props}
        />
        <Button
          type="button"
          variant="link"
          size="icon"
          onClick={() => setShow(!show)}
          className={clsx('absolute top-1/2 right-2 -translate-y-1/2', {
            'text-amber-600': isInvalid,
          })}
          tabIndex={-1}
          aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      <ShowMessage message={errorMessage} />
    </div>
  )
}
