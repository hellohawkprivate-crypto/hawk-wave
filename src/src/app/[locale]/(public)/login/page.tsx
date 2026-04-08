'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (res.ok) {
      // ロケールを保持したままメンバーページへ
      router.push(`/${locale}/members/goldvein-prep/strategy`)
    } else {
      const data = await res.json()
      setError(data.error ?? 'エラーが発生しました')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Goldvein War Prep</h1>
        <p className="text-sm text-gray-500 mb-6">Members only</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-yellow-600 disabled:opacity-50 transition-colors"
          >
            {loading ? '...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
