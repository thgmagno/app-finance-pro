export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to the Home Page</h1>
        <p className="text-lg">
          This page is protected and requires authentication.
        </p>
      </div>
    </div>
  )
}
