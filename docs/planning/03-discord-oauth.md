# 03 — Discord OAuth でスタッフページを保護する

**ステータス**: 完了 ✅  
**難易度**: ⭐⭐⭐（上級者向け）  
**所要時間**: 2〜3時間

---

## 目標

`/staff` 以下のページを Discord アカウント認証で保護する。  
指定した Discord サーバーの特定ロールを持つメンバーのみアクセスできるようにする。

---

## 仕組み

```
ユーザー → /staff にアクセス
         → middleware.ts が NextAuth セッションを確認
         → セッションなし → /api/auth/signin にリダイレクト
         → Discord でログイン・認可
         → NextAuth の signIn コールバックでロール確認
         → ロールあり → セッション発行 → /staff にリダイレクト
         → ロールなし → ログイン拒否
```

---

## 事前準備: Discord Developer Portal の設定

### Step 1: アプリケーションを作成

1. [discord.com/developers/applications](https://discord.com/developers/applications) を開く
2. 右上の「New Application」をクリック
3. アプリ名を入力（例: `hawk-wave`）→「Create」

### Step 2: OAuth2 の設定

1. 左メニュー「OAuth2」→「General」を開く
2. **Client ID** をコピー → `.env.local` の `DISCORD_CLIENT_ID` に設定
3. 「Reset Secret」をクリック → **Client Secret** をコピー → `DISCORD_CLIENT_SECRET` に設定
4. 「Redirects」に以下を追加:
   - `http://localhost:3000/api/auth/callback/discord`（開発用）
   - `https://your-app.vercel.app/api/auth/callback/discord`（本番用）
5. 「Save Changes」をクリック

### Step 3: Bot の設定（ロール確認に必要）

1. 左メニュー「Bot」を開く
2. 「Add Bot」→「Yes, do it!」
3. **Token** をコピー → `DISCORD_BOT_TOKEN` に設定  
   ※ Token は一度しか表示されないので必ず保存すること
4. 「Privileged Gateway Intents」の **Server Members Intent** を ON にする
5. 「Save Changes」をクリック

### Step 4: Bot をサーバーに招待

1. 左メニュー「OAuth2」→「URL Generator」を開く
2. Scopes: `bot` にチェック
3. Bot Permissions: `View Channels` にチェック（最低限）
4. 生成されたURLをブラウザで開く → 対象サーバーを選択 → 「認証」

### Step 5: Guild ID・Role ID を確認

1. Discord を開く
2. ユーザー設定 → 詳細設定 → **開発者モード** を ON
3. 対象サーバー名を右クリック →「IDをコピー」→ `DISCORD_GUILD_ID` に設定
4. サーバー設定 → ロール → 対象ロールを右クリック →「IDをコピー」→ `DISCORD_STAFF_ROLE_ID` に設定

---

## 環境変数

`.env.local` に以下を追加（Vercelにも同様に設定）:

```bash
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_BOT_TOKEN=
DISCORD_GUILD_ID=
DISCORD_STAFF_ROLE_ID=

NEXTAUTH_URL=http://localhost:3000   # 本番は https://your-app.vercel.app
NEXTAUTH_SECRET=                     # openssl rand -base64 32 で生成
```

`NEXTAUTH_SECRET` の生成:
```bash
openssl rand -base64 32
```

---

## 実装手順

### Step 1: next-auth をインストール

```bash
cd src
npm install next-auth
```

### Step 2: NextAuth 設定ファイルを作成

`src/src/lib/auth.ts`

```typescript
import { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

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
      // 指定サーバーのメンバーかつ対象ロールを持つか確認
      const res = await fetch(
        `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${account?.providerAccountId}`,
        { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` } }
      )
      if (!res.ok) return false

      const member = await res.json()
      return member.roles.includes(process.env.DISCORD_STAFF_ROLE_ID!)
    },
  },
}
```

### Step 3: API Route を作成

`src/src/app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### Step 4: middleware.ts にスタッフ保護を追加

`src/src/middleware.ts` の `/staff` 保護ロジックを追加。

### Step 5: スタッフページを作成

`src/src/app/(staff)/analytics/page.tsx`（サンプルコンテンツ）

### Step 6: 動作確認

1. `npm run dev` で起動
2. `/staff/analytics` にアクセス → Discord ログインページにリダイレクトされることを確認
3. 対象ロールを持つ Discord アカウントでログイン → アクセスできることを確認
4. 対象ロールを持たないアカウントでログイン → 弾かれることを確認

---

## 別イベントへの転用方法

環境変数を変えるだけで別の同盟・別のDiscordサーバーに対応できる:

```bash
# 別イベントのVercelプロジェクトで以下を変更するだけ
DISCORD_GUILD_ID=（新しいサーバーID）
DISCORD_STAFF_ROLE_ID=（新しいロールID）
MEMBERS_PASSWORD=（新しいパスワード）
```

---

## 完了後にやること

1. `docs/releases/` にリリースノートを追加
2. `README.md` の「最新リリース」を更新
3. 次のステップ: 多言語対応（next-intl）または Google Sheets 連携
