/**
 * モックデータサービス
 *
 * Salesforce環境がない場合のデモ用データ
 * 実際のSalesforce APIのレスポンス形式に準拠
 */

// 取引先のモックデータ
export const mockAccounts = {
  totalSize: 10,
  done: true,
  records: [
    {
      Id: '001xx000003DGb2AAG',
      Name: 'テクノロジー株式会社',
      Industry: 'Technology',
      AnnualRevenue: 50000000,
      NumberOfEmployees: 250,
      Phone: '03-1234-5678',
      Website: 'https://example-tech.com',
      BillingCity: '東京',
      BillingCountry: '日本',
      CreatedDate: '2024-01-15T10:30:00.000+0000'
    },
    {
      Id: '001xx000003DGb3AAG',
      Name: '金融サービス株式会社',
      Industry: 'Finance',
      AnnualRevenue: 120000000,
      NumberOfEmployees: 500,
      Phone: '03-9876-5432',
      Website: 'https://example-finance.com',
      BillingCity: '大阪',
      BillingCountry: '日本',
      CreatedDate: '2024-02-10T14:20:00.000+0000'
    },
    {
      Id: '001xx000003DGb4AAG',
      Name: '小売チェーン株式会社',
      Industry: 'Retail',
      AnnualRevenue: 80000000,
      NumberOfEmployees: 1200,
      Phone: '06-1111-2222',
      Website: 'https://example-retail.com',
      BillingCity: '名古屋',
      BillingCountry: '日本',
      CreatedDate: '2024-03-05T09:15:00.000+0000'
    },
    {
      Id: '001xx000003DGb5AAG',
      Name: '製造業株式会社',
      Industry: 'Manufacturing',
      AnnualRevenue: 150000000,
      NumberOfEmployees: 800,
      Phone: '052-3333-4444',
      Website: 'https://example-manufacturing.com',
      BillingCity: '横浜',
      BillingCountry: '日本',
      CreatedDate: '2024-04-20T11:45:00.000+0000'
    },
    {
      Id: '001xx000003DGb6AAG',
      Name: 'ヘルスケア株式会社',
      Industry: 'Healthcare',
      AnnualRevenue: 90000000,
      NumberOfEmployees: 450,
      Phone: '045-5555-6666',
      Website: 'https://example-healthcare.com',
      BillingCity: '福岡',
      BillingCountry: '日本',
      CreatedDate: '2024-05-12T16:00:00.000+0000'
    },
  ],
};

// 商談のモックデータ
export const mockOpportunities = {
  totalSize: 15,
  done: true,
  records: [
    {
      Id: '006xx000001X8Z1AAK',
      Name: 'クラウドシステム導入',
      AccountId: '001xx000003DGb2AAG',
      Account: { Name: 'テクノロジー株式会社' },
      Amount: 5000000,
      StageName: 'Prospecting',
      Probability: 10,
      CloseDate: '2024-12-31',
      CreatedDate: '2024-06-01T10:00:00.000+0000'
    },
    {
      Id: '006xx000001X8Z2AAK',
      Name: 'セキュリティソリューション',
      AccountId: '001xx000003DGb3AAG',
      Account: { Name: '金融サービス株式会社' },
      Amount: 8000000,
      StageName: 'Qualification',
      Probability: 20,
      CloseDate: '2024-11-30',
      CreatedDate: '2024-06-15T11:30:00.000+0000'
    },
    {
      Id: '006xx000001X8Z3AAK',
      Name: 'POSシステム更新',
      AccountId: '001xx000003DGb4AAG',
      Account: { Name: '小売チェーン株式会社' },
      Amount: 12000000,
      StageName: 'Needs Analysis',
      Probability: 30,
      CloseDate: '2024-10-31',
      CreatedDate: '2024-07-01T09:00:00.000+0000'
    },
    {
      Id: '006xx000001X8Z4AAK',
      Name: '生産管理システム',
      AccountId: '001xx000003DGb5AAG',
      Account: { Name: '製造業株式会社' },
      Amount: 15000000,
      StageName: 'Value Proposition',
      Probability: 50,
      CloseDate: '2024-09-30',
      CreatedDate: '2024-07-15T14:20:00.000+0000'
    },
    {
      Id: '006xx000001X8Z5AAK',
      Name: '電子カルテシステム',
      AccountId: '001xx000003DGb6AAG',
      Account: { Name: 'ヘルスケア株式会社' },
      Amount: 20000000,
      StageName: 'Proposal/Price Quote',
      Probability: 60,
      CloseDate: '2024-08-31',
      CreatedDate: '2024-08-01T10:30:00.000+0000'
    },
    {
      Id: '006xx000001X8Z6AAK',
      Name: 'AIコンサルティング',
      AccountId: '001xx000003DGb2AAG',
      Account: { Name: 'テクノロジー株式会社' },
      Amount: 3000000,
      StageName: 'Negotiation/Review',
      Probability: 80,
      CloseDate: '2024-07-31',
      CreatedDate: '2024-08-10T15:00:00.000+0000'
    },
    {
      Id: '006xx000001X8Z7AAK',
      Name: 'データ分析プラットフォーム',
      AccountId: '001xx000003DGb3AAG',
      Account: { Name: '金融サービス株式会社' },
      Amount: 10000000,
      StageName: 'Closed Won',
      Probability: 100,
      CloseDate: '2024-06-30',
      CreatedDate: '2024-05-01T12:00:00.000+0000'
    },
  ],
};

// 商談ステージ別統計
export const mockOpportunityStats = {
  totalSize: 7,
  done: true,
  records: [
    { StageName: 'Prospecting', total: 2, totalAmount: 8000000 },
    { StageName: 'Qualification', total: 3, totalAmount: 15000000 },
    { StageName: 'Needs Analysis', total: 2, totalAmount: 18000000 },
    { StageName: 'Value Proposition', total: 1, totalAmount: 15000000 },
    { StageName: 'Proposal/Price Quote', total: 2, totalAmount: 25000000 },
    { StageName: 'Negotiation/Review', total: 1, totalAmount: 3000000 },
    { StageName: 'Closed Won', total: 4, totalAmount: 45000000 },
  ],
};

// 業界別統計
export const mockAccountsByIndustry = {
  totalSize: 5,
  done: true,
  records: [
    { Industry: 'Technology', total: 3 },
    { Industry: 'Finance', total: 2 },
    { Industry: 'Retail', total: 2 },
    { Industry: 'Manufacturing', total: 2 },
    { Industry: 'Healthcare', total: 1 },
  ],
};

/**
 * モックAPIサービス
 */
class MockSalesforceAPI {
  constructor() {
    this.isAuthenticated = false;
  }

  setAuth(instanceUrl, accessToken) {
    this.isAuthenticated = true;
  }

  async getAccounts() {
    await this.delay(500);
    return mockAccounts;
  }

  async getOpportunities() {
    await this.delay(500);
    return mockOpportunities;
  }

  async getOpportunityStats() {
    await this.delay(300);
    return mockOpportunityStats;
  }

  async getAccountsByIndustry() {
    await this.delay(300);
    return mockAccountsByIndustry;
  }

  async createRecord(objectType, data) {
    await this.delay(500);
    return { id: 'mock' + Date.now(), success: true };
  }

  async updateRecord(objectType, recordId, data) {
    await this.delay(500);
    return { success: true };
  }

  async deleteRecord(objectType, recordId) {
    await this.delay(500);
    return { success: true };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new MockSalesforceAPI();
