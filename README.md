# hawk-wave

スマホゲーム「金脈攻防戦」の同盟運営を支援するWebプラットフォーム。
Discordに参加していないメンバーにも作戦・情報・データ分析を届けます。

---

## 🆕 最新リリース

### v0.3.0 — 2026-04-09 · 認証・多言語対応

- 3層アクセス制御（公開 / パスワード / Discord OAuth）
- Google Sheetsでスタッフ許可リスト管理
- 6言語対応（ja / en / ko / zh-TW / zh-CN / ar）

→ [リリース詳細](docs/releases/v0.3.0-auth-i18n.md)

### v0.2.0 — 2026-04-09 · 静的サイト公開

- Next.js 16.2.2 初期化（TypeScript / Tailwind CSS / App Router）
- ゲームルール解説ページ作成（施設一覧・戦闘スケジュール）
- Vercel連携・本番デプロイ完了

→ [リリース詳細](docs/releases/v0.2.0-static-site.md)

### v0.1.0 — 2025-04-09 · プロジェクト基盤

- リポジトリ初期構成（ディレクトリ・ドキュメント体系）
- `CLAUDE.md` 作成（Claude Code 向け設定）
- Webページ公開ロードマップ策定（`docs/architecture/`）
- 技術スタック選定：Next.js + Vercel + NextAuth.js

→ [リリース詳細](docs/releases/v0.1.0-initial-setup.md)

---

## 概要

| 項目 | 内容 |
|---|---|
| ゲームイベント | 金脈攻防戦 Week2〜Week4 |
| 防衛側サーバー | #606, #625, #676 |
| 公開対象 | 同盟員（スマホゲームのみの方含む） |
| 主な機能 | 作戦共有・施設データ・破壊値シミュレーター |

---

## アクセス制御

| ページ | 対象 | 認証方式 |
|---|---|---|
| 公開ページ | 誰でも | なし |
| 同盟ページ | 同盟員 | パスワード |
| 幹部ページ | 幹部 | Discord OAuth |

---

## 開発スタック

- **Next.js** (App Router) — フレームワーク
- **Vercel** — ホスティング・CI/CD
- **NextAuth.js** — 認証（Discord OAuth + パスワード）
- **next-intl** — 多言語対応（ja / en / ko）
- **Google Sheets CSV** — データソース
- **Streamlit** — データ分析（別サービス）

---

## ドキュメント

| フォルダ | 内容 |
|---|---|
| [docs/discussions/](docs/discussions/) | 議論した内容・意思決定の記録 |
| [docs/architecture/](docs/architecture/) | アーキテクチャ図・技術選定 |
| [docs/services/](docs/services/) | 使用サービスの知識・設定メモ |
| [docs/planning/](docs/planning/) | 作業手順書（番号付き） |
| [docs/issues/](docs/issues/) | 今後取り組む課題 |
| [docs/releases/](docs/releases/) | 実施済みの作業記録 |

---

## クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/hawk-wave.git
cd hawk-wave

# 依存関係インストール（Next.js セットアップ後）
npm install

# 環境変数を設定
cp .env.example .env.local
# .env.local を編集

# 開発サーバー起動
npm run dev
```

---

## Claude Code での開発

```bash
# Claude Code を起動
claude

# 指示例（日本語でそのまま）
「施設一覧ページを src/app/(public)/facilities/page.tsx に作って」
「docs/planning/ に新しい手順書を追加して」
```

詳細は [CLAUDE.md](CLAUDE.md) を参照してください。

---

## ライセンス

このリポジトリは同盟内での利用を目的としたプライベートプロジェクトです。
