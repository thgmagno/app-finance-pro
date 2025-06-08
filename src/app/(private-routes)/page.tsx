import { UserInfo } from './userInfo'

export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Bem-vindo ao FinancePRO</h1>
        <UserInfo />
      </div>
    </div>
  )
}
