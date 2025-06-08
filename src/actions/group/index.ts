'use server'

import { SearchGroupSchema } from '@/lib/schemas/group'
import { SearchGroupFormState } from '@/lib/states/group'
import { getPrevState } from '../utils'
import { fetcher } from '@/lib/fetcher'

export async function searchGroup(
  formState: SearchGroupFormState,
  formData: FormData,
): Promise<SearchGroupFormState> {
  const data = Object.fromEntries(formData.entries())
  const parsed = SearchGroupSchema.safeParse(data)
  const prevState = getPrevState(formData)

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, prevState }
  }

  try {
    const res = await fetcher({ url: `/group?search=${parsed.data.name}` })

    console.log(res)
  } catch {
    return {
      errors: {
        _form:
          'Não foi possível estabeler uma conexão segura com o servidor. Tente novamente',
      },
      prevState,
    }
  }

  return { errors: {}, prevState }
}
