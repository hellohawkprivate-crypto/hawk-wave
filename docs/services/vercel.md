# Vercel — サービス知識メモ

**最終更新**: 2025-04-09

---

## 概要

Next.jsを作ったVercel社が提供するホスティング・デプロイプラットフォーム。
GitHubと連携することで、`git push` するだけで自動デプロイが動く。

## 無料枠（Hobby Plan）

| 項目 | 制限 |
|---|---|
| 帯域幅 | 100 GB / 月 |
| サーバーレス関数 | 100 GB-hrs / 月 |
| ビルド時間 | 6000分 / 月 |
| カスタムドメイン | 無制限 |
| 同時デプロイ | 無制限 |

小規模な同盟サイトなら無料枠で十分。

## セットアップ手順

1. [vercel.com](https://vercel.com) でアカウント作成（GitHubでログイン）
2. 「New Project」→ GitHubリポジトリを選択
3. Framework: Next.js を選択（自動検出される）
4. 環境変数を設定（後述）
5. 「Deploy」→ 完了

## 環境変数の設定

Vercel Dashboard → Project → Settings → Environment Variables で設定。

```
NEXTAUTH_URL        = https://your-app.vercel.app
NEXTAUTH_SECRET     = （openssl rand -base64 32 で生成）
DISCORD_CLIENT_ID   = （Discord Developer Portal から）
DISCORD_CLIENT_SECRET = （Discord Developer Portal から）
MEMBERS_PASSWORD    = （任意のパスワード）
```

**注意**: `.env.local` はGitHubにコミットしない。Vercelのダッシュボードで直接設定する。

## カスタムドメインの設定

1. Vercel Dashboard → Project → Domains
2. ドメインを追加
3. DNS設定（Cloudflare使用時はCNAMEレコードを追加）

## プレビューデプロイ

プルリクエストを作成すると、自動でプレビューURLが発行される。
`feature/` ブランチの変更をメインにマージ前に確認可能。

## Middleware によるパスワード保護

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/members')) {
    const cookie = request.cookies.get('members-auth')
    if (cookie?.value !== process.env.MEMBERS_PASSWORD) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
}
```

## 参考リンク

- [Vercel ドキュメント](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [環境変数の管理](https://vercel.com/docs/projects/environment-variables)
