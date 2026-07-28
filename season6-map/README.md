# season6-map

Season 6 のマップデータと、その閲覧用ビューア（React + Vite）。

## 由来

もとは独立リポジトリ `hellohawkprivate-crypto/LW` の `S6/` として開発していたもの。
ただし `S6/` は一度も push されておらず、ローカルにしか存在しない状態だった。
データ消失を避けるため 2026-07-29 に hawk-wave へ取り込み、`LW` リポジトリは廃止した。

## マップデータ

`src/data/season6_map.json` が一次ソース（`public/` 側は同一内容のコピー）。

- 件数: 2,165
- スキーマ: `id` / `name` / `level` / `buff` / `coordinates`

`src/components/MapView.jsx` が `../data/season6_map.json` を直接 import している。

## ビューアの起動

hawk-wave 本体（`src/` の Next.js アプリ）とは独立した Vite アプリで、依存関係も別管理。

```bash
cd season6-map
npm install
npm run dev
```

## 今後

hawk-wave のマップシミュレーター（`src/src/app/[locale]/(members)/members/goldvein-prep/map-simulator/`）は
独自の `facilityData.ts` を持っており、このデータとは未連携。統合するかは未決。
