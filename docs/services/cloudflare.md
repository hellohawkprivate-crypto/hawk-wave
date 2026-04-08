# Cloudflare — サービス知識メモ

**最終更新**: 2025-04-09

---

## 概要

Cloudflareはグローバルなエッジネットワークを持つインフラ企業。
Web開発で関係するサービスは主に2つ：**Pages**（ホスティング）と **Workers**（エッジ関数）。

## Cloudflare Pages vs Vercel

| 項目 | CF Pages | Vercel |
|---|---|---|
| 帯域幅 | **無制限** | 100GB/月（無料） |
| サーバーレス関数 | Workers（高速） | Edge Functions |
| Next.js対応 | ○（@cloudflare/next-on-pages） | ◎（ネイティブ） |
| 設定の簡単さ | ○ | ◎ |
| カスタムドメイン | 無制限 | 無制限 |
| Access（認証） | 無料枠あり | 別途 |

**結論**: 最初はVercelが簡単。大規模になったらCF Pagesを検討。

## Cloudflare Access（無料枠）

メールアドレス認証やOIDCでページを保護できるサービス。
無料枠: 50ユーザーまで。

### 設定手順（パスワード保護の代替として）

1. Cloudflare にドメインを登録
2. Zero Trust → Access → Applications → 「Add an application」
3. Self-hosted を選択
4. ポリシー: メールアドレスのリストや特定ドメイン（例: guild-member@example.com）

**ユースケース**: 同盟員のメールアドレスリストでアクセス制限する場合に有効。

## Cloudflare DNS

独自ドメインを取得した場合、DNSをCloudflareに向けることで：
- DDoS保護
- CDNによる高速化
- HTTPSの自動発行
が無料で使える。

## Workers KV（キーバリューストア）

Cloudflare Workers から使えるグローバルKVストレージ。
無料枠: 100,000リクエスト/日。

Vercel のサーバーレス関数の代替として、セッション管理や設定の保存に使える。

## 参考リンク

- [Cloudflare Pages ドキュメント](https://developers.cloudflare.com/pages/)
- [CF Pages + Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/)
