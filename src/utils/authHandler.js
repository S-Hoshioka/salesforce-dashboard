/**
 * Salesforce OAuth認証ハンドラー
 */

/**
 * URLフラグメントからアクセストークンを抽出
 */
export function parseAuthCallback() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);

  const accessToken = params.get('access_token');
  const instanceUrl = params.get('instance_url');
  const refreshToken = params.get('refresh_token');

  if (accessToken && instanceUrl) {
    return {
      accessToken,
      instanceUrl,
      refreshToken,
      expiresAt: Date.now() + 2 * 60 * 60 * 1000, // 2時間（推定）
    };
  }

  return null;
}

/**
 * 認証情報をlocalStorageに保存
 */
export function saveAuth(authData) {
  localStorage.setItem('salesforce_auth', JSON.stringify(authData));
}

/**
 * localStorageから認証情報を取得
 */
export function loadAuth() {
  const data = localStorage.getItem('salesforce_auth');
  if (!data) return null;

  try {
    const authData = JSON.parse(data);

    // トークンの有効期限をチェック
    if (authData.expiresAt && Date.now() > authData.expiresAt) {
      clearAuth();
      return null;
    }

    return authData;
  } catch (error) {
    console.error('Failed to parse auth data:', error);
    clearAuth();
    return null;
  }
}

/**
 * 認証情報をクリア（ログアウト）
 */
export function clearAuth() {
  localStorage.removeItem('salesforce_auth');
}

/**
 * 認証状態を確認
 */
export function isAuthenticated() {
  const auth = loadAuth();
  return auth !== null;
}
