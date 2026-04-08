# Discord ID許可リストの管理方法

**日付**: 2026-04-09  
**ステータス**: 決定済み ✅（実装は Google Sheets連携ステップで対応）

---

## 背景

Discord OAuthの認証でID許可リストを使う場合、人数が増えると環境変数での管理が煩雑になる。
より管理しやすい方法を検討した。

---

## 検討した案

| 方法 | 管理場所 | メリット | デメリット |
|---|---|---|---|
| 環境変数（現状） | Vercelダッシュボード | シンプル | 人数が増えると煩雑。変更のたびに再デプロイが必要 |
| Google Sheets | スプレッドシート | 非エンジニアも編集可能。即時反映 | Google Sheets API連携が必要 |
| Vercel Edge Config | Vercelダッシュボード | リアルタイム更新可能 | Vercel依存。別途設定が必要 |

---

## 決定

**Google Sheets で管理する。**

### 理由
- このプロジェクトはすでに Google Sheets をデータソースとして使う計画がある
- 同じスプレッドシートで許可リストも管理することで一元化できる
- Discordを知らない幹部もブラウザで編集できる
- 人数が増えても対応しやすい

---

## 実装方針

```
スプレッドシート（非公開）
├── シート1: 戦闘データ
└── シート2: スタッフID許可リスト
    ├── discord_id: 123456789012345678
    └── discord_id: 987654321098765432
```

`auth.ts` の `signIn` コールバックでシートからIDリストを取得して照合する。

```typescript
// Google Sheets からID許可リストを取得
const allowedIds = await fetchAllowedIdsFromSheets()
if (allowedIds.includes(userId)) return true
```

---

## 関連ドキュメント

- `docs/services/google-sheets.md`
- `docs/planning/03-discord-oauth.md`
- 実装手順は Google Sheets連携ステップで追加予定
