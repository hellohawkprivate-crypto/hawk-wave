# 複数イベント・複数同盟への対応方針

**日付**: 2026-04-09  
**ステータス**: 決定済み ✅

---

## 背景

hawk-wave はイベントごとに同盟構成が変わるため、パスワードや Discord サーバーIDなどのアクセス制御の設定も都度変わる。  
この前提でディレクトリ構成をどう設計するかを検討した。

---

## 検討した案

### 案A: コードで分ける（同一アプリ内に複数イベント）

```
app/[eventId]/(members)/
app/[eventId]/(staff)/
```

**メリット**
- 1つのURLで複数イベントを管理できる

**デメリット**
- ルーティングが複雑になる
- イベントごとの設定（パスワード・Discord Guild ID・Role ID）をコード内で管理する必要がある
- 認証ロジックがイベントIDに依存して複雑化する

---

### 案B: デプロイで分ける（イベントごとに別Vercelプロジェクト）← **採用**

```
app/(public)/
app/(members)/
app/(staff)/
```

環境変数でイベントごとの設定を切り替える。

```bash
# イベントAのデプロイ
MEMBERS_PASSWORD=xxxxx
DISCORD_GUILD_ID=111111
DISCORD_STAFF_ROLE_ID=222222

# イベントBのデプロイ（別Vercelプロジェクト）
MEMBERS_PASSWORD=yyyyy
DISCORD_GUILD_ID=333333
DISCORD_STAFF_ROLE_ID=444444
```

**メリット**
- コードはシンプルで変更不要
- 同じリポジトリから複数イベント向けにデプロイできる
- イベント終了後はVercelプロジェクトを削除するだけ
- Next.js の Route Groups の設計意図に沿っている

**デメリット**
- イベントごとにVercelプロジェクトを作成する手間がある
- URLがイベントごとに変わる（例: `kinmyaku.vercel.app` / `nextevent.vercel.app`）

---

## 決定

**案B を採用する。**

コードの単純さと保守性を優先する。  
イベントごとの差異は環境変数のみで吸収し、コードは共通化する。

---

## 影響するファイル

- `src/src/app/` のディレクトリ構成は3層固定
- `docs/planning/02-password-auth.md`
- `docs/planning/03-discord-oauth.md`
- Vercel の環境変数設定（イベントごとに変更）
