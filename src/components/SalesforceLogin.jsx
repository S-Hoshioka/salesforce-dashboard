import { useState } from 'react';
import './SalesforceLogin.css';

/**
 * Salesforce OAuth 2.0 ログインコンポーネント
 *
 * セットアップ手順:
 * 1. Salesforce Connected Appを作成
 * 2. 以下の環境変数を設定:
 *    - VITE_SALESFORCE_CLIENT_ID: Consumer Key
 *    - VITE_SALESFORCE_REDIRECT_URI: Callback URL
 * 3. または、下記のCONFIGを直接編集
 */

const CONFIG = {
  // Salesforce Connected Appの設定
  clientId: import.meta.env.VITE_SALESFORCE_CLIENT_ID || 'YOUR_CLIENT_ID_HERE',
  redirectUri: import.meta.env.VITE_SALESFORCE_REDIRECT_URI || window.location.origin + '/salesforce-dashboard/callback',

  // Salesforce環境
  loginUrl: 'https://login.salesforce.com', // 本番環境
  // loginUrl: 'https://test.salesforce.com', // Sandbox環境の場合
};

function SalesforceLogin({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [useSandbox, setUseSandbox] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    // OAuth 2.0 認証URLを構築
    const authUrl = new URL(`${useSandbox ? 'https://test.salesforce.com' : CONFIG.loginUrl}/services/oauth2/authorize`);
    authUrl.searchParams.set('response_type', 'token');
    authUrl.searchParams.set('client_id', CONFIG.clientId);
    authUrl.searchParams.set('redirect_uri', CONFIG.redirectUri);
    authUrl.searchParams.set('scope', 'api refresh_token');
    authUrl.searchParams.set('prompt', 'login');

    // Salesforceログイン画面へリダイレクト
    window.location.href = authUrl.toString();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Salesforce Dashboard</h1>
        <p className="login-description">
          Salesforceにログインして、取引先と商談を管理しましょう
        </p>

        <div className="environment-toggle">
          <label>
            <input
              type="checkbox"
              checked={useSandbox}
              onChange={(e) => setUseSandbox(e.target.checked)}
            />
            Sandbox環境を使用
          </label>
        </div>

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'ログイン中...' : 'Salesforceでログイン'}
        </button>

        <div className="info-box">
          <h3>セットアップが必要</h3>
          <ol>
            <li>Salesforce Connected Appを作成</li>
            <li>Consumer Keyを取得</li>
            <li>Callback URLを設定: <code>{CONFIG.redirectUri}</code></li>
            <li>環境変数 <code>VITE_SALESFORCE_CLIENT_ID</code> を設定</li>
          </ol>
          <p className="demo-note">
            <strong>デモモード:</strong> 設定なしでモックデータを表示するには、
            ページを更新してください。
          </p>
        </div>
      </div>
    </div>
  );
}

export default SalesforceLogin;
