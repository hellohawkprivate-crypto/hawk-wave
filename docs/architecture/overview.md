# アーキテクチャ概要

**最終更新**: 2025-04-09

---

## システム構成図

```
[Claude Code] → [GitHub] → [Vercel / CI/CD] → [ブラウザ]
                                ↑
                    [Google Sheets CSV]（データソース）
                    [Discord API]（認証）
```

## アクセス制御レイヤー

```
/                    ← 公開（誰でも）
/members/**          ← パスワード保護（同盟員）
/staff/**            ← Discord OAuth（幹部）
```

Vercel Middleware（`middleware.ts`）でルーティング前に認証チェックを行う。

## ファイル構成（Next.js App Router）

```
src/
├── app/
│   ├── (public)/              # 認証不要
│   │   ├── page.tsx           # トップページ
│   │   ├── rules/page.tsx     # ゲームルール解説
│   │   └── facilities/page.tsx # 施設一覧
│   ├── (members)/             # PW認証
│   │   ├── strategy/page.tsx  # 作戦共有
│   │   └── schedule/page.tsx  # 戦闘スケジュール
│   └── (staff)/               # Discord OAuth
│       ├── analytics/page.tsx # データ分析
│       └── simulation/page.tsx # 破壊値シミュレーター
├── components/
│   ├── FacilityMap.tsx        # マップUI
│   ├── DestructionProgress.tsx # 進行度バー
│   └── LanguageSwitcher.tsx   # 言語切替
├── lib/
│   ├── sheets.ts              # Google Sheets fetch
│   ├── facilities.ts          # 施設データ定数
│   └── auth.ts                # 認証ヘルパー
└── locales/
    ├── ja.json
    ├── en.json
    └── ko.json
```

## データフロー

### Google Sheets → ページ

1. 同盟員がスプレッドシートに戦闘データを入力
2. シートを「ウェブに公開」→ CSV URL を取得
3. `src/lib/sheets.ts` で fetch・パース
4. Next.js の ISR（Incremental Static Regeneration）でキャッシュ
5. ページに表示

### Discord 認証フロー

1. ユーザーが `/staff/` にアクセス
2. Middleware がセッションを確認
3. 未認証 → `/api/auth/signin?callbackUrl=/staff/` にリダイレクト
4. Discord OAuth → NextAuth がトークン取得
5. ギルドメンバーシップ + ロールを確認
6. 認証成功 → ページ表示

## 関連ドキュメント

- [Webページ公開ロードマップ](web-publishing-roadmap.html)（ビジュアル版）
- [技術選定の議論](../discussions/2025-04-09-web-publishing-strategy.md)
- [Vercel 設定メモ](../services/vercel.md)
- [NextAuth.js 設定メモ](../services/nextauth-discord.md)
