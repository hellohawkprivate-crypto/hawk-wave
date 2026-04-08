# Webページ公開方針の議論

**日付**: 2025-04-09  
**参加者**: 同盟幹部  
**ステータス**: 決定済み ✅

---

## 背景・課題

スマホゲーム「金脈攻防戦」では、作戦共有の手段がDiscordに限られている。
しかしDiscordを使っていない同盟員も多く、テキストチャットでは画像・表の共有が困難。

## 議論した選択肢

### ホスティングサービス

| 選択肢 | メリット | デメリット |
|---|---|---|
| Vercel | Next.jsと相性◎、初期設定が最小 | 帯域制限あり（無料100GB/月） |
| Cloudflare Pages | 帯域無制限、Workersが高速 | 設定が少し複雑 |
| GitHub Pages | 最もシンプル | 静的のみ、認証不可 |

**決定**: Vercelを第一選択とする。Next.jsの公式ホスティングで設定が最小。

### フレームワーク

| 選択肢 | 理由 |
|---|---|
| Next.js ✅ | 3つのアクセス層を1リポジトリで管理可能。認証・多言語・API全対応 |
| Astro | 静的ページのみで認証が難しい |
| Nuxt.js | Vueエコシステム、Next.jsより事例が少ない |

**決定**: Next.js (App Router) を採用。

### 認証方式

- **幹部ページ**: Discord OAuth（NextAuth.js） → サーバーID + ロールIDで制御
- **同盟ページ**: Vercel Middleware + パスワード（Cookie管理）
- **公開ページ**: 認証なし

## 決定事項まとめ

1. フレームワーク: **Next.js (App Router)**
2. ホスティング: **Vercel**（将来的にCF Pagesも検討）
3. 認証: **NextAuth.js**（Discord OAuth + パスワード）
4. 多言語: **next-intl**（ja / en / ko）
5. データ: **Google Sheets 公開CSV**（API不要の簡易方式から開始）
6. 開発ツール: **Claude Code**

## 今後の課題

- Streamlit との連携方法（別サービスとしてiframe埋め込み vs 同一ドメイン）
- 多言語の翻訳フロー（DeepL API自動化 vs 手動管理）
- Google Sheets の更新頻度とキャッシュ戦略
