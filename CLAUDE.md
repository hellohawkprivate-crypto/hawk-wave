# CLAUDE.md

このファイルはClaude Codeがリポジトリを操作する際に読み込む設定ファイルです。

---

## プロジェクト概要

**hawk-wave** は、スマホゲーム「金脈攻防戦」の同盟運営を支援するWebプラットフォームです。
Discordに参加していないメンバーにも作戦・情報・データ分析結果を届けることを目的としています。

- **防衛側サーバー**: #606, #625, #676
- **対象イベント**: 金脈攻防戦（Week2〜Week4）
- **公開目標**: 段階的に3層のアクセス制御を実装する

---

## 技術スタック

| レイヤー | 技術 | 用途 |
|---|---|---|
| フレームワーク | Next.js (App Router) | メインWebアプリ |
| ホスティング | Vercel | デプロイ・サーバーレス関数 |
| 認証 | NextAuth.js | Discord OAuth / パスワード |
| データ | Google Sheets CSV | 戦闘データの取得 |
| 多言語 | next-intl | ja / en / ko |
| データ分析 | Streamlit (別リポジトリ) | シミュレーター |

---

## ディレクトリ構成

```
hawk-wave/
├── CLAUDE.md              ← このファイル
├── README.md
├── .gitignore
├── docs/
│   ├── discussions/       ← 議論した内容（意思決定の記録）
│   ├── architecture/      ← アーキテクチャ図・技術選定
│   ├── services/          ← 使用サービスの知識・設定メモ
│   ├── planning/          ← 作業手順書（番号付き連番）
│   ├── issues/            ← 今後取り組む課題
│   └── releases/          ← 実施済みの作業記録
├── public/                ← 静的アセット（画像・favicon等）
└── src/                   ← アプリケーションコード（Next.js）
    ├── app/               ← App Router
    │   ├── (public)/      ← 認証不要ページ
    │   ├── (members)/     ← PW認証ページ
    │   └── (staff)/       ← Discord認証ページ
    ├── components/
    ├── lib/
    └── locales/
        ├── ja.json
        ├── en.json
        └── ko.json
```

---

## コーディング規約

- **言語**: TypeScript（strict mode）
- **スタイル**: Tailwind CSS
- **コンポーネント**: shadcn/ui ベース
- **コミットメッセージ**: `feat:` / `fix:` / `docs:` / `chore:` プレフィックス
- **ブランチ**: `main`（本番）/ `dev`（開発）/ `feature/xxx`（機能）

---

## Claude Code への指示スタイル

日本語での指示を優先してください。

### よく使う指示パターン

```
「施設一覧ページを作って。src/app/(public)/facilities/page.tsx に作成。
 データは src/lib/facilities.ts の定数を使って。」

「docs/planning/ に新しい作業手順書を追加して。
 ファイル名は 02-password-auth.md で、手順を番号付きで書いて。」

「Google Sheets の CSV を取得する関数を src/lib/sheets.ts に作って。
 シートURLを引数で受け取り、パースして返す。」
```

### 禁止事項

- APIキー・シークレットをコードにハードコードしない（必ず `.env.local` を使用）
- `console.log` をコミットに含めない
- `any` 型の使用を避ける

---

## 環境変数（.env.local）

```bash
# Discord OAuth
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_GUILD_ID=          # 対象サーバーID
DISCORD_STAFF_ROLE_ID=     # 幹部ロールID

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# メンバーページ パスワード
MEMBERS_PASSWORD=

# Google Sheets（任意）
GOOGLE_SHEETS_API_KEY=
```

---

## ドキュメント更新ルール

作業完了後は必ず以下を更新してください：

1. `docs/releases/` に実施内容を記録
2. `README.md` の「最新リリース」セクションを更新
3. 新しいアーキテクチャ決定は `docs/architecture/` に追記
4. 未解決の課題は `docs/issues/backlog.md` に追記
