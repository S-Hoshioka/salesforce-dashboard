# Salesforce Dashboard

Salesforce REST APIと連携した取引先・商談管理ダッシュボード

## 機能

### ダッシュボード
- 取引先数、商談数、総商談金額の統計表示
- 商談ステージ別分布（棒グラフ）
- 業界別取引先分布（円グラフ）

### 取引先管理
- 一覧表示（会社名、業界、年間売上、従業員数、電話番号、都市）
- CRUD操作（新規作成、編集、削除）

### 商談管理
- 一覧表示（商談名、取引先、金額、ステージ、確度、完了予定日）
- CRUD操作（新規作成、編集、削除）
- ステージバッジ表示

## 技術スタック

- **フロントエンド**: React 19, Vite 7
- **グラフ**: Recharts 3
- **HTTP通信**: Axios 1
- **API**: Salesforce REST API
- **認証**: OAuth 2.0

## デモ

**ライブデモ**: https://s-hoshioka.github.io/salesforce-dashboard

デモモードではモックデータを使用しているため、Salesforce環境なしで動作確認できます。

## セットアップ

### 1. ローカル開発環境

```bash
# リポジトリをクローン
git clone https://github.com/S-Hoshioka/salesforce-dashboard.git
cd salesforce-dashboard

# 依存関係をインストール
npm install

# 開発サーバーを起動（デモモード）
npm run dev
```

ブラウザで http://localhost:5175/ にアクセス

### 2. 実際のSalesforce環境と接続

#### 2.1 Salesforce Connected Appの作成

1. **Salesforceにログイン**

2. **Setup（設定）を開く**
   - 右上の歯車アイコン → Setup

3. **App Managerに移動**
   - Quick Find で "App Manager" と入力
   - App Manager を選択

4. **New Connected Appを作成**
   - 「New Connected App」をクリック

5. **基本情報を入力**
   ```
   Connected App Name: React Dashboard
   API Name: React_Dashboard
   Contact Email: your-email@example.com
   ```

6. **OAuth設定を有効化**
   - 「Enable OAuth Settings」にチェック
   - **Callback URL**:
     ```
     http://localhost:5175/callback
     https://s-hoshioka.github.io/salesforce-dashboard/callback
     ```
   - **Selected OAuth Scopes**:
     - Access and manage your data (api)
     - Perform requests on your behalf at any time (refresh_token, offline_access)
     - Access your basic information (id, profile, email, address, phone)

7. **保存して待機**
   - 保存後、2-10分待つ

8. **Consumer KeyとSecretを取得**
   - App Manager → 作成したアプリの「View」
   - 「Consumer Key」をコピー

#### 2.2 環境変数の設定

```bash
# .env.exampleをコピー
cp .env.example .env

# .envファイルを編集
# VITE_SALESFORCE_CLIENT_ID に Consumer Key を設定
```

```.env
VITE_SALESFORCE_CLIENT_ID=your_consumer_key_here
VITE_SALESFORCE_REDIRECT_URI=http://localhost:5175/callback
```

#### 2.3 再起動

```bash
# 開発サーバーを再起動
npm run dev
```

ブラウザで http://localhost:5175/ にアクセスすると、Salesforceログイン画面が表示されます。

## デプロイ

### GitHub Pagesへのデプロイ

```bash
npm run deploy
```

デプロイ後、https://s-hoshioka.github.io/salesforce-dashboard/ でアクセス可能になります。

**注意**: GitHub Pagesでも実際のSalesforce環境と接続する場合は、Callback URLに本番URLを追加してください：
```
https://s-hoshioka.github.io/salesforce-dashboard/callback
```

## プロジェクト構造

```
salesforce-dashboard/
├── src/
│   ├── components/
│   │   ├── SalesforceLogin.jsx     # ログイン画面
│   │   └── SalesforceLogin.css     # ログイン画面スタイル
│   ├── services/
│   │   ├── salesforceApi.js        # Salesforce REST API連携
│   │   └── mockData.js             # デモ用モックデータ
│   ├── utils/
│   │   └── authHandler.js          # OAuth認証ハンドラー
│   ├── App.jsx                     # メインアプリケーション
│   ├── App.css                     # スタイル
│   └── main.jsx                    # エントリーポイント
├── .env.example                    # 環境変数のサンプル
├── package.json
└── vite.config.js
```

## Salesforce API仕様

### 実装済みエンドポイント

- `GET /services/data/v59.0/query/` - SOQLクエリ実行
- `GET /services/data/v59.0/sobjects/:type/:id` - レコード取得
- `POST /services/data/v59.0/sobjects/:type` - レコード作成
- `PATCH /services/data/v59.0/sobjects/:type/:id` - レコード更新
- `DELETE /services/data/v59.0/sobjects/:type/:id` - レコード削除

### 実装済みオブジェクト

- **Account**（取引先）: Name, Industry, AnnualRevenue, NumberOfEmployees, Phone, Website, BillingCity, BillingCountry
- **Opportunity**（商談）: Name, AccountId, Amount, StageName, Probability, CloseDate

## トラブルシューティング

### CORS エラーが発生する

Salesforce側でCORS設定を追加：
1. Setup → CORS
2. Allowed Origins List に以下を追加:
   - `http://localhost:5175`
   - `https://s-hoshioka.github.io`

### 認証エラーが発生する

- Connected Appの設定を確認
- Consumer Keyが正しいか確認
- Callback URLが正確に設定されているか確認

## ライセンス

MIT

## 作成者

S-Hoshioka

## リポジトリ

https://github.com/S-Hoshioka/salesforce-dashboard
