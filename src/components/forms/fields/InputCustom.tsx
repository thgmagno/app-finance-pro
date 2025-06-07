import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import clsx from 'clsx'
import { ShowMessage } from './ShowMessage'

interface Props extends React.ComponentProps<typeof Input> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  name: string
  label?: string
  placeholder?: string
  isInvalid?: boolean
  prevState?: string | number | readonly string[]
  errorMessage?: string | string[]
}

export function InputCustom({
  name,
  placeholder,
  type = 'text',
  label,
  isInvalid = false,
  errorMessage,
  prevState,
  ...rest
}: Props) {
  return (
    <div className="flex w-full flex-col space-y-1.5">
      <Label htmlFor={name} className={clsx({ 'sr-only': !label })}>
        {name}
      </Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={prevState ?? ''}
        className={clsx({
          'border border-amber-600 bg-amber-50 text-amber-900 placeholder-amber-500 focus:border-amber-600 focus:ring-amber-600':
            isInvalid,
        })}
        {...rest}
      />
      <ShowMessage message={errorMessage} />
    </div>
  )
}
