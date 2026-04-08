# Discord OAuth の認証方式

**日付**: 2026-04-09  
**ステータス**: 決定済み ✅

---

## 背景

Discord OAuth でスタッフページを保護する際、アクセスを許可する条件をどう設計するか検討した。
ゲームの同盟メンバーには「同じDiscordサーバーにいないが、フレンドやIDが既知」のケースがあるため。

---

## 検討した案

| 方式 | 仕組み | メリット | デメリット |
|---|---|---|---|
| Guild + Role | 指定サーバーのメンバー＋ロール保有者を許可 | ロール管理がDiscord側でできる | サーバー未参加者を許可できない |
| Discord ID許可リスト | 特定のDiscord IDを直接許可 | サーバー外メンバーも許可できる | IDを手動管理する必要がある |
| **併用**（採用） | どちらかを満たせば許可 | 柔軟に対応できる | — |

---

## 決定

**Guild + Role と Discord ID許可リストを併用する。**

どちらかの条件を満たせばアクセスを許可する。

---

## 実装方針

```typescript
// どちらかを満たせばOK
async signIn({ account }) {
  const userId = account?.providerAccountId ?? ''

  // 1. ID許可リストチェック
  const allowedIds = process.env.DISCORD_ALLOWED_USER_IDS?.split(',') ?? []
  if (allowedIds.includes(userId)) return true

  // 2. Guild + Roleチェック
  const res = await fetch(
    `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${userId}`,
    { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` } }
  )
  if (!res.ok) return false
  const member = await res.json()
  return member.roles.includes(process.env.DISCORD_STAFF_ROLE_ID!)
}
```

## 環境変数

```bash
DISCORD_ALLOWED_USER_IDS=ID1,ID2,ID3   # カンマ区切りで複数指定可
DISCORD_GUILD_ID=                        # 省略可（Guild+Role不要な場合）
DISCORD_STAFF_ROLE_ID=                   # 省略可（Guild+Role不要な場合）
```
