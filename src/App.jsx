import { useState, useEffect } from 'react'
import './App.css'
import mockSalesforceAPI from './services/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

function App() {
  const [loading, setLoading] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [opportunityStats, setOpportunityStats] = useState([])
  const [industryStats, setIndustryStats] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [editingRecord, setEditingRecord] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // モックデータを読み込み
      mockSalesforceAPI.setAuth('https://example.salesforce.com', 'mock-token')

      const [accountsData, opportunitiesData, oppStatsData, industryData] = await Promise.all([
        mockSalesforceAPI.getAccounts(),
        mockSalesforceAPI.getOpportunities(),
        mockSalesforceAPI.getOpportunityStats(),
        mockSalesforceAPI.getAccountsByIndustry(),
      ])

      setAccounts(accountsData.records)
      setOpportunities(opportunitiesData.records)
      setOpportunityStats(oppStatsData.records)
      setIndustryStats(industryData.records)
    } catch (error) {
      console.error('データ読み込みエラー:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount || 0)
  }

  const handleEdit = (record, type) => {
    setEditingRecord({ ...record, type })
    setIsModalOpen(true)
  }

  const handleDelete = async (id, type) => {
    if (window.confirm('本当に削除しますか？')) {
      try {
        await mockSalesforceAPI.deleteRecord(type, id)
        loadData()
        alert('削除しました')
      } catch (error) {
        alert('削除に失敗しました')
      }
    }
  }

  const handleSave = async () => {
    try {
      if (editingRecord.Id) {
        await mockSalesforceAPI.updateRecord(editingRecord.type, editingRecord.Id, editingRecord)
        alert('更新しました')
      } else {
        await mockSalesforceAPI.createRecord(editingRecord.type, editingRecord)
        alert('作成しました')
      }
      setIsModalOpen(false)
      setEditingRecord(null)
      loadData()
    } catch (error) {
      alert('保存に失敗しました')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Salesforce ダッシュボード</h1>
        <p>取引先と商談の管理・分析</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          ダッシュボード
        </button>
        <button
          className={activeTab === 'accounts' ? 'active' : ''}
          onClick={() => setActiveTab('accounts')}
        >
          取引先
        </button>
        <button
          className={activeTab === 'opportunities' ? 'active' : ''}
          onClick={() => setActiveTab('opportunities')}
        >
          商談
        </button>
      </nav>

      {loading ? (
        <div className="loading">データを読み込み中...</div>
      ) : (
        <>
          {activeTab === 'dashboard' && (
            <div className="dashboard">
              <div className="stats-cards">
                <div className="stats-card">
                  <h3>取引先数</h3>
                  <p className="stat-number">{accounts.length}</p>
                </div>
                <div className="stats-card">
                  <h3>商談数</h3>
                  <p className="stat-number">{opportunities.length}</p>
                </div>
                <div className="stats-card">
                  <h3>総商談金額</h3>
                  <p className="stat-number">
                    {formatCurrency(opportunities.reduce((sum, opp) => sum + (opp.Amount || 0), 0))}
                  </p>
                </div>
              </div>

              <div className="charts">
                <div className="chart-container">
                  <h3>商談ステージ別分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={opportunityStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="StageName" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#8884d8" name="件数" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <h3>業界別取引先分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={industryStats}
                        dataKey="total"
                        nameKey="Industry"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {industryStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div className="data-table">
              <div className="table-header">
                <h2>取引先一覧</h2>
                <button className="btn-primary" onClick={() => handleEdit({type: 'Account'}, 'Account')}>
                  新規作成
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>会社名</th>
                    <th>業界</th>
                    <th>年間売上</th>
                    <th>従業員数</th>
                    <th>電話番号</th>
                    <th>都市</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.Id}>
                      <td>{account.Name}</td>
                      <td>{account.Industry}</td>
                      <td>{formatCurrency(account.AnnualRevenue)}</td>
                      <td>{account.NumberOfEmployees}</td>
                      <td>{account.Phone}</td>
                      <td>{account.BillingCity}</td>
                      <td>
                        <button className="btn-small" onClick={() => handleEdit(account, 'Account')}>
                          編集
                        </button>
                        <button className="btn-small btn-danger" onClick={() => handleDelete(account.Id, 'Account')}>
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'opportunities' && (
            <div className="data-table">
              <div className="table-header">
                <h2>商談一覧</h2>
                <button className="btn-primary" onClick={() => handleEdit({type: 'Opportunity'}, 'Opportunity')}>
                  新規作成
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>商談名</th>
                    <th>取引先</th>
                    <th>金額</th>
                    <th>ステージ</th>
                    <th>確度</th>
                    <th>完了予定日</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((opp) => (
                    <tr key={opp.Id}>
                      <td>{opp.Name}</td>
                      <td>{opp.Account?.Name}</td>
                      <td>{formatCurrency(opp.Amount)}</td>
                      <td>
                        <span className="stage-badge">{opp.StageName}</span>
                      </td>
                      <td>{opp.Probability}%</td>
                      <td>{opp.CloseDate}</td>
                      <td>
                        <button className="btn-small" onClick={() => handleEdit(opp, 'Opportunity')}>
                          編集
                        </button>
                        <button className="btn-small btn-danger" onClick={() => handleDelete(opp.Id, 'Opportunity')}>
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingRecord.Id ? '編集' : '新規作成'}</h2>
            <p>実際の実装では、ここにフォームを配置します。</p>
            <div className="modal-buttons">
              <button className="btn-primary" onClick={handleSave}>保存</button>
              <button onClick={() => setIsModalOpen(false)}>キャンセル</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
