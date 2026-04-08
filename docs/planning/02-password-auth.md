# 02 — パスワード認証ページを追加する

**ステータス**: 完了 ✅  
**難易度**: ⭐⭐（中級者向け）  
**所要時間**: 1〜2時間

---

## 目標

`/members` 以下のページをパスワードで保護する。  
正しいパスワードを入力したユーザーにのみ、作戦ページなどを表示する。

---

## 仕組み

```
ユーザー → /members にアクセス
         → middleware.ts が Cookie を確認
         → Cookie なし → /login にリダイレクト
         → /login でパスワード入力
         → API Route がパスワードを検証
         → 正しければ Cookie をセット → /members にリダイレクト
         → 以降は Cookie があるのでそのままアクセス可能
```

---

## 作成するファイル

| ファイル | 役割 |
|---|---|
| `src/src/app/(public)/login/page.tsx` | パスワード入力フォーム |
| `src/src/app/api/auth/login/route.ts` | パスワード検証 → Cookie セット |
| `src/src/app/(members)/strategy/page.tsx` | 保護対象のサンプルページ |
| `src/src/middleware.ts` | `/members` へのアクセス制御 |

---

## 環境変数

`.env.local` に以下を追加（Vercelにも同様に設定）:

```bash
MEMBERS_PASSWORD=（任意のパスワード）
```

---

## 手順

### Step 1: 環境変数を設定

```bash
# .env.local を作成（リポジトリにはコミットしない）
echo "MEMBERS_PASSWORD=your-password-here" >> src/.env.local
```

### Step 2: middleware.ts を作成

`src/src/middleware.ts` に以下を作成:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /members/* を保護
  if (pathname.startsWith('/members')) {
    const cookie = request.cookies.get('members-auth')
    if (cookie?.value !== process.env.MEMBERS_PASSWORD) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/members/:path*'],
}
```

### Step 3: ログインフォームを作成

`src/src/app/(public)/login/page.tsx`

### Step 4: API Route を作成

`src/src/app/api/auth/login/route.ts`

```typescript
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password !== process.env.MEMBERS_PASSWORD) {
    return NextResponse.json({ error: 'パスワードが違います' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('members-auth', password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7日間
  })
  return response
}
```

### Step 5: 保護ページを作成

`src/src/app/(members)/strategy/page.tsx`（サンプルコンテンツ）

### Step 6: 動作確認

1. `npm run dev` で起動
2. `/members/strategy` にアクセス → `/login` にリダイレクトされることを確認
3. パスワードを入力 → `/members/strategy` にアクセスできることを確認
4. Vercel の環境変数に `MEMBERS_PASSWORD` を設定してデプロイ

---

## 完了後にやること

1. `docs/releases/` にリリースノートを追加
2. `README.md` の「最新リリース」を更新
3. 次のステップ: [03 — Discord OAuth を追加する](03-discord-oauth.md)
