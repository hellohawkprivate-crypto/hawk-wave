# 01 — GitHub + Vercel で静的サイトを公開する

**ステータス**: Step 2 完了（Next.js初期化済み）  
**難易度**: ⭐（初心者向け）  
**所要時間**: 1〜2時間

---

## 目標

「金脈攻防戦」のゲームルール解説ページを作り、Vercelで公開する。
GitHub push → 自動デプロイの流れを体験する。

---

## 前提条件

- [x] GitHubアカウントを作成済み
- [x] Node.js 18以上がインストール済み（`node -v` で確認）→ nvm で v22.22.2 インストール済み
- [ ] Claude Code がインストール済み（`npm install -g @anthropic-ai/claude-code`）

---

## 手順

### Step 1: ローカルにリポジトリをクローン

```bash
# GitHubでリポジトリを作成後
git clone https://github.com/YOUR_USERNAME/hawk-wave.git
cd hawk-wave
```

### Step 2: Next.js プロジェクトを初期化

```bash
npx create-next-app@latest src --typescript --tailwind --app --src-dir
```

設定の選択:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- import alias: No（デフォルト）

### Step 3: Claude Code で最初のページを作成

```bash
cd hawk-wave
claude
```

Claude Codeに以下を指示:
```
「金脈攻防戦のゲームルール解説ページを作って。
 src/app/page.tsx に作成。
 内容: ゲーム概要、施設種類（小型拠点・大都市・中型拠点・軍事要塞・ゴールデンパレス）、
 破壊値の目標（5000pt）を日本語で説明するシンプルなページ。
 Tailwind CSSでスタイリングして。」
```

### Step 4: ローカルで動作確認

```bash
cd src
npm run dev
# → http://localhost:3000 を開く
```

### Step 5: GitHubにpush

```bash
git add .
git commit -m "feat: 初期ページ作成（ゲームルール解説）"
git push origin main
```

### Step 6: Vercelと連携

1. [vercel.com](https://vercel.com) → 「Continue with GitHub」
2. 「New Project」→ `hawk-wave` を選択
3. Root Directory を `src` に変更
4. 「Deploy」をクリック
5. 数分後にURLが発行される（例: `hawk-wave.vercel.app`）

### Step 7: 動作確認

- 発行されたURLにアクセス
- ページが表示されることを確認
- `README.md` の「最新リリース」に記録

---

## 完了後にやること

1. `docs/releases/` にリリースノートを追加
2. `README.md` の最新リリースを更新
3. 次のステップ: [02 — パスワード保護ページを追加する](02-password-auth.md)（まだ未作成）

---

## トラブルシューティング

| 症状 | 原因 | 対処 |
|---|---|---|
| `node: command not found` | Node.js未インストール | [nodejs.org](https://nodejs.org) からインストール |
| Vercelデプロイ失敗 | Root Directoryが違う | Settings → General → Root Directory を `src` に変更 |
| ページが真っ白 | JSエラー | ブラウザのコンソールを確認 |
