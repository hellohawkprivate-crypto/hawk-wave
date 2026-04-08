# NextAuth.js + Discord OAuth — 設定メモ

**最終更新**: 2025-04-09

---

## 概要

NextAuth.js は Next.js 向けの認証ライブラリ。
Discord Provider を使うことで、Discordアカウントでのログインを実装できる。

## Discord Developer Portal の設定

1. [discord.com/developers/applications](https://discord.com/developers/applications) にアクセス
2. 「New Application」→ アプリ名を入力（例: hawk-wave）
3. OAuth2 → General
   - Client ID をコピー（`DISCORD_CLIENT_ID`）
   - 「Reset Secret」→ Client Secret をコピー（`DISCORD_CLIENT_SECRET`）
4. Redirects に追加:
   - `http://localhost:3000/api/auth/callback/discord`（開発用）
   - `https://your-app.vercel.app/api/auth/callback/discord`（本番用）

## Bot の設定（ロール確認に必要）

1. Bot タブ → 「Add Bot」
2. Bot Token をコピー（`DISCORD_BOT_TOKEN`）
3. Privileged Gateway Intents: `GUILD_MEMBERS` を有効化

## インストール

```bash
npm install next-auth
```

## 実装例

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

const GUILD_ID = process.env.DISCORD_GUILD_ID!
const STAFF_ROLE_ID = process.env.DISCORD_STAFF_ROLE_ID!

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: { scope: 'identify guilds guilds.members.read' },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      // 指定サーバーのメンバーかチェック
      const res = await fetch(
        `https://discord.com/api/guilds/${GUILD_ID}/members/${account?.providerAccountId}`,
        { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` } }
      )
      if (!res.ok) return false

      const member = await res.json()
      // 幹部ロールを持つかチェック
      return member.roles.includes(STAFF_ROLE_ID)
    },
  },
}
```

## ギルドID・ロールIDの確認方法

1. Discord を開く
2. ユーザー設定 → 詳細設定 → 開発者モード ON
3. サーバー名を右クリック → 「IDをコピー」（= GUILD_ID）
4. ロール名を右クリック → 「IDをコピー」（= STAFF_ROLE_ID）

## 参考リンク

- [NextAuth.js ドキュメント](https://next-auth.js.org)
- [Discord Provider](https://next-auth.js.org/providers/discord)
- [Discord API: Guild Member](https://discord.com/developers/docs/resources/guild)
