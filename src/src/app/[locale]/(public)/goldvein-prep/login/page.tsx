'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
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
      router.push('/ja/members/goldvein-prep/guide')
    } else {
      setError('パスワードがちがうようだ...')
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center px-4">

      {/* バナー */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/login-banner.png"
        alt=""
        className="w-full max-w-md rounded-xl mb-6 shadow-lg"
      />

      {/* ドラクエ風ウィンドウ */}
      <div className="w-full max-w-md">
        <div
          className="relative bg-[#0a0a2a] border-4 border-white rounded-xl p-6 shadow-2xl"
          style={{
            boxShadow: 'inset 0 0 0 3px #0a0a2a, inset 0 0 0 5px #6366f1, 0 0 30px rgba(99,102,241,0.3)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-white text-center text-lg" style={{ fontFamily: 'serif' }}>
              🔒 を入力してログインする
            </p>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a2a] border-2 border-indigo-400 rounded-lg px-4 py-3 text-white text-center text-lg tracking-widest focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="＊＊＊＊＊＊"
              required
            />

            {error && (
              <p className="text-yellow-300 text-center text-sm" style={{ fontFamily: 'serif' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0a0a2a] border-2 border-white rounded-lg py-3 text-white text-lg hover:bg-indigo-900 disabled:opacity-50 transition-colors cursor-pointer"
              style={{ fontFamily: 'serif' }}
            >
              {loading ? '...' : '▶ すすむ'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
