import { SearchParams } from '@/lib/types'
import { VerifyAnimation } from './animation'
import VerifyPageError from './error'
import { fetcher } from '@/lib/fetcher'
import { actions } from '@/actions'

export default async function VerifyPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const key = searchParams.key
  if (!key || typeof key !== 'string') {
    return <VerifyPageError />
  }

  const [res] = await Promise.all([
    fetcher({ url: `/auth/verify?key=${key}` }),
    new Promise((resolve) => setTimeout(resolve, 5000)),
  ])

  if (res.error) {
    return <VerifyPageError />
  } else {
    const { token } = res.data as { token: string }
    await actions.auth.createSessionAndRedirect(token)
  }

  return (
    <>
      <VerifyAnimation />
    </>
  )
}
