# Google Sheets 連携 — 設定メモ

**最終更新**: 2025-04-09

---

## 概要

Google Sheetsのデータをウェブページで表示する方法。
APIキー不要の「公開CSV方式」から始めることを推奨。

## 方法1: 公開CSV方式（推奨・簡単）

### スプレッドシート側の設定

1. スプレッドシートを開く
2. ファイル → 共有 → 「ウェブに公開」
3. 「シート全体」または特定シートを選択
4. 形式: 「カンマ区切りの値（.csv）」を選択
5. 「公開」→ URLをコピー

URLの形式:
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}
```

### Next.js での取得例

```typescript
// src/lib/sheets.ts
export async function fetchSheetData(csvUrl: string) {
  const res = await fetch(csvUrl, {
    next: { revalidate: 300 }, // 5分キャッシュ
  })
  const text = await res.text()

  // CSV → オブジェクト配列に変換
  const lines = text.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim())
  
  return lines.slice(1).map(line => {
    const values = line.split(',')
    return Object.fromEntries(headers.map((h, i) => [h, values[i]?.trim()]))
  })
}
```

## 方法2: Sheets API v4（詳細制御が必要な場合）

APIキーが必要。データ更新・書き込みが必要な場合に使用。

1. [Google Cloud Console](https://console.cloud.google.com) でプロジェクト作成
2. Google Sheets API を有効化
3. 認証情報 → APIキーを作成
4. `.env.local` に `GOOGLE_SHEETS_API_KEY=` を設定

```typescript
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY
const SHEET_ID = 'your-sheet-id'

const res = await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`
)
const data = await res.json()
// data.values = [['A1', 'B1', ...], ['A2', 'B2', ...], ...]
```

## 金脈攻防戦での活用例

| シート | 用途 | 更新者 |
|---|---|---|
| 施設状態 | 各施設の爆弾進行度・破壊状況 | 同盟員 |
| 戦闘記録 | Week別の結果・破壊値 | 幹部 |
| メンバー配置 | 各施設の担当者 | 幹部 |
| 作戦メモ | テキスト形式の指示 | 幹部 |

## 注意事項

- 「公開CSV」は誰でもアクセス可能。機密情報は入れない
- 更新頻度が高い場合は `revalidate` を短くする（最短60秒程度）
- シートが非公開の場合はCSV方式は使えない → API v4 + サービスアカウントが必要
