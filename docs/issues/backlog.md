# 課題バックログ

**最終更新**: 2025-04-09

優先度: 🔴 高 / 🟡 中 / 🟢 低

---

## 未着手

| # | 優先度 | 課題 | メモ |
|---|---|---|---|
| 1 | 🔴 | GitHub + Vercel で静的サイトを公開する | [手順書](../planning/01-static-site-setup.md) |
| 2 | 🔴 | パスワード保護ページを追加する | Vercel Middleware を使用 |
| 3 | 🟡 | Google Sheets CSV 連携を実装する | [Sheetsメモ](../services/google-sheets.md) |
| 4 | 🟡 | 施設マップページを作成する | マップ画像 + 各施設の状態表示 |
| 5 | 🟡 | Discord OAuth 認証を実装する | [NextAuthメモ](../services/nextauth-discord.md) |
| 6 | 🟡 | 多言語対応（ja/en/ko）を実装する | next-intl を使用 |
| 7 | 🟢 | 破壊値シミュレーターを作成する | Streamlit または React |
| 8 | 🟢 | Streamlit Cloud との連携を検討する | iframe埋め込み or 別URL |
| 9 | 🟢 | DeepL API で自動翻訳を設定する | 50万字/月の無料枠 |
| 10 | 🟢 | カスタムドメインを設定する | 独自ドメイン取得が必要 |

---

## 進行中

*なし*

---

## 完了済み

| # | 課題 | 完了日 | リリース |
|---|---|---|---|
| - | プロジェクト基盤・ドキュメント整備 | 2025-04-09 | [v0.1.0](../releases/v0.1.0-initial-setup.md) |

---

## 議論が必要な課題

- **Streamlit と Next.js の統合方法**
  - Option A: Streamlit Cloud（無料）でホストし、Next.jsからiframeで埋め込む
  - Option B: Python API（FastAPI）として別でホストし、Next.jsからfetch
  - Option C: JavaScriptで再実装してNext.jsに統合する（工数大）

- **多言語コンテンツの管理フロー**
  - 誰が翻訳するか（DeepL自動 or 手動レビュー）
  - ゲーム固有用語の翻訳辞書をどこで管理するか
