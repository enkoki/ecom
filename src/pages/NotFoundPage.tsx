import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-24 text-center">
      <p className="text-8xl font-bold text-violet-brand">404</p>
      <h1 className="mt-5 text-3xl font-semibold">Page not found</h1>
      <Link className="mt-8 inline-flex items-center gap-2 rounded-sm bg-violet-brand px-6 py-3 font-semibold text-white" to="/"><ArrowLeft size={18} /> Back to shop</Link>
    </main>
  )
}

export default NotFoundPage
