import axios from 'axios';

/**
 * Salesforce REST API サービス
 *
 * 注意: 本番環境では以下が必要です:
 * 1. Salesforce Connected App の作成
 * 2. OAuth 2.0 認証フローの実装
 * 3. アクセストークンの管理
 * 4. CORS設定（プロキシサーバーまたはSalesforce設定）
 */

class SalesforceAPI {
  constructor() {
    this.instanceUrl = null;
    this.accessToken = null;
    this.apiVersion = 'v59.0'; // 最新のAPIバージョン
  }

  /**
   * 認証情報を設定
   */
  setAuth(instanceUrl, accessToken) {
    this.instanceUrl = instanceUrl;
    this.accessToken = accessToken;
  }

  /**
   * API リクエストのベースメソッド
   */
  async request(endpoint, method = 'GET', data = null) {
    if (!this.instanceUrl || !this.accessToken) {
      throw new Error('認証が必要です。先にログインしてください。');
    }

    const url = `${this.instanceUrl}/services/data/${this.apiVersion}${endpoint}`;

    try {
      const response = await axios({
        method,
        url,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        data,
      });
      return response.data;
    } catch (error) {
      console.error('Salesforce API エラー:', error);
      throw error;
    }
  }

  /**
   * SOQL クエリを実行
   */
  async query(soql) {
    const encodedQuery = encodeURIComponent(soql);
    return this.request(`/query/?q=${encodedQuery}`);
  }

  /**
   * 取引先（Account）を取得
   */
  async getAccounts(limit = 100) {
    const soql = `SELECT Id, Name, Industry, AnnualRevenue, NumberOfEmployees, Phone, Website, BillingCity, BillingCountry, CreatedDate FROM Account ORDER BY CreatedDate DESC LIMIT ${limit}`;
    return this.query(soql);
  }

  /**
   * 商談（Opportunity）を取得
   */
  async getOpportunities(limit = 100) {
    const soql = `SELECT Id, Name, AccountId, Account.Name, Amount, StageName, Probability, CloseDate, CreatedDate FROM Opportunity ORDER BY CreatedDate DESC LIMIT ${limit}`;
    return this.query(soql);
  }

  /**
   * 特定のレコードを取得
   */
  async getRecord(objectType, recordId, fields = null) {
    let endpoint = `/sobjects/${objectType}/${recordId}`;
    if (fields) {
      endpoint += `?fields=${fields.join(',')}`;
    }
    return this.request(endpoint);
  }

  /**
   * レコードを作成
   */
  async createRecord(objectType, data) {
    return this.request(`/sobjects/${objectType}`, 'POST', data);
  }

  /**
   * レコードを更新
   */
  async updateRecord(objectType, recordId, data) {
    return this.request(`/sobjects/${objectType}/${recordId}`, 'PATCH', data);
  }

  /**
   * レコードを削除
   */
  async deleteRecord(objectType, recordId) {
    return this.request(`/sobjects/${objectType}/${recordId}`, 'DELETE');
  }

  /**
   * 商談のステージ別統計を取得
   */
  async getOpportunityStats() {
    const soql = `SELECT StageName, COUNT(Id) total, SUM(Amount) totalAmount FROM Opportunity GROUP BY StageName`;
    return this.query(soql);
  }

  /**
   * 業界別の取引先統計を取得
   */
  async getAccountsByIndustry() {
    const soql = `SELECT Industry, COUNT(Id) total FROM Account WHERE Industry != null GROUP BY Industry ORDER BY COUNT(Id) DESC`;
    return this.query(soql);
  }

  /**
   * 月別の商談作成数を取得
   */
  async getOpportunitiesByMonth() {
    const soql = `SELECT CALENDAR_MONTH(CreatedDate) month, COUNT(Id) total FROM Opportunity WHERE CreatedDate = THIS_YEAR GROUP BY CALENDAR_MONTH(CreatedDate) ORDER BY CALENDAR_MONTH(CreatedDate)`;
    return this.query(soql);
  }
}

export default new SalesforceAPI();
