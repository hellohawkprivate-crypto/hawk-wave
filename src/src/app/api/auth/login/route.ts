import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password !== process.env.MEMBERS_PASSWORD) {
    return NextResponse.json({ error: 'パスワードが違います' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  // Cookie にパスワードをセット（middleware で照合する）
  response.cookies.set('members-auth', password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7日間
  })
  return response
}
