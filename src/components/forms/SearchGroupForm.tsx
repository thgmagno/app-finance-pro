'use client'

import { actions } from '@/actions'
import { InputCustom } from '@/components/forms/fields/InputCustom'
import { Button } from '@/components/ui/button'
import { useFormState } from 'react-dom'

export function SearchGroupForm() {
  const [formState, action, isPending] = useFormState(
    actions.group.searchGroup,
    { errors: {} },
  )

  return (
    <form action={action} className="flex gap-3">
      <InputCustom
        name="name"
        isInvalid={!!formState?.errors.name}
        errorMessage={formState.errors?.name}
      />
      <Button type="submit">
        {isPending ? 'Pesquisando...' : 'Pesquisar'}
      </Button>
    </form>
  )
}
