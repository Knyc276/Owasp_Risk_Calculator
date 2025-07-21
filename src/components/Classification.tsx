import React, { useState } from 'react';
import { Filter, Download, Eye, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';

interface Vulnerability {
  id: string;
  name: string;
  target: string;
  cvss: number;
  riskScore: number;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  exploitProbability: number;
  businessImpact: number;
  discoveredDate: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Accepted';
}

const Classification: React.FC = () => {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([
    {
      id: 'VULN-001',
      name: 'Log4Shell Remote Code Execution',
      target: 'web-app.company.com',
      cvss: 10.0,
      riskScore: 9.5,
      category: 'Web Application',
      severity: 'Critical',
      exploitProbability: 0.95,
      businessImpact: 0.90,
      discoveredDate: '2025-01-10',
      status: 'Open'
    },
    {
      id: 'VULN-002',
      name: 'SQL Injection in Login Form',
      target: 'auth.company.com',
      cvss: 8.1,
      riskScore: 7.8,
      category: 'Web Application',
      severity: 'High',
      exploitProbability: 0.75,
      businessImpact: 0.80,
      discoveredDate: '2025-01-09',
      status: 'In Progress'
    },
    {
      id: 'VULN-003',
      name: 'Outdated SSH Configuration',
      target: '192.168.1.100',
      cvss: 5.3,
      riskScore: 6.2,
      category: 'Network Service',
      severity: 'Medium',
      exploitProbability: 0.40,
      businessImpact: 0.60,
      discoveredDate: '2025-01-08',
      status: 'Open'
    },
    {
      id: 'VULN-004',
      name: 'Missing Security Headers',
      target: 'api.company.com',
      cvss: 3.7,
      riskScore: 4.1,
      category: 'Web Application',
      severity: 'Low',
      exploitProbability: 0.30,
      businessImpact: 0.25,
      discoveredDate: '2025-01-07',
      status: 'Accepted'
    },
    {
      id: 'VULN-005',
      name: 'Privilege Escalation Vulnerability',
      target: 'server-01.company.com',
      cvss: 7.8,
      riskScore: 8.2,
      category: 'Operating System',
      severity: 'High',
      exploitProbability: 0.65,
      businessImpact: 0.85,
      discoveredDate: '2025-01-06',
      status: 'Resolved'
    }
  ]);

  const [filters, setFilters] = useState({
    severity: '',
    category: '',
    status: '',
    riskScoreMin: 0,
    riskScoreMax: 10
  });

  const [sortBy, setSortBy] = useState('riskScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500';
      case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500';
      case 'Low': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-red-500 bg-red-500/10';
      case 'In Progress': return 'text-yellow-500 bg-yellow-500/10';
      case 'Resolved': return 'text-emerald-500 bg-emerald-500/10';
      case 'Accepted': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-slate-500 bg-slate-500/10';
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 8) return { level: 'Critical', color: 'text-red-500' };
    if (score >= 6) return { level: 'High', color: 'text-orange-500' };
    if (score >= 4) return { level: 'Medium', color: 'text-yellow-500' };
    return { level: 'Low', color: 'text-emerald-500' };
  };

  const filteredVulnerabilities = vulnerabilities.filter((vuln) => {
    return (
      (filters.severity === '' || vuln.severity === filters.severity) &&
      (filters.category === '' || vuln.category === filters.category) &&
      (filters.status === '' || vuln.status === filters.status) &&
      vuln.riskScore >= filters.riskScoreMin &&
      vuln.riskScore <= filters.riskScoreMax
    );
  });

  const sortedVulnerabilities = [...filteredVulnerabilities].sort((a, b) => {
    const aValue = a[sortBy as keyof Vulnerability];
    const bValue = b[sortBy as keyof Vulnerability];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    }
    
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    if (sortOrder === 'desc') {
      return bStr.localeCompare(aStr);
    }
    return aStr.localeCompare(bStr);
  });

  const riskDistribution = {
    critical: vulnerabilities.filter(v => v.riskScore >= 8).length,
    high: vulnerabilities.filter(v => v.riskScore >= 6 && v.riskScore < 8).length,
    medium: vulnerabilities.filter(v => v.riskScore >= 4 && v.riskScore < 6).length,
    low: vulnerabilities.filter(v => v.riskScore < 4).length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Vulnerability Classification</h2>
        <p className="text-slate-400">Classify and prioritize vulnerabilities based on OWASP risk scores and exploit impact</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Critical Risk</h3>
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-500 mb-2">{riskDistribution.critical}</div>
          <p className="text-slate-400 text-sm">Risk Score ≥ 8.0</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">High Risk</h3>
            <TrendingUp className="h-6 w-6 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-orange-500 mb-2">{riskDistribution.high}</div>
          <p className="text-slate-400 text-sm">Risk Score 6.0 - 7.9</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Medium Risk</h3>
            <BarChart3 className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-yellow-500 mb-2">{riskDistribution.medium}</div>
          <p className="text-slate-400 text-sm">Risk Score 4.0 - 5.9</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Low Risk</h3>
            <BarChart3 className="h-6 w-6 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-emerald-500 mb-2">{riskDistribution.low}</div>
          <p className="text-slate-400 text-sm">Risk Score {'<'} 4.0</p>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter & Sort</span>
          </h3>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Severity</label>
            <select
              value={filters.severity}
              onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="">All Categories</option>
              <option value="Web Application">Web Application</option>
              <option value="Network Service">Network Service</option>
              <option value="Operating System">Operating System</option>
              <option value="Database">Database</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="riskScore">Risk Score</option>
              <option value="cvss">CVSS Score</option>
              <option value="exploitProbability">Exploit Probability</option>
              <option value="businessImpact">Business Impact</option>
              <option value="discoveredDate">Discovery Date</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Risk Score Range: {filters.riskScoreMin} - {filters.riskScoreMax}
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={filters.riskScoreMin}
              onChange={(e) => setFilters({ ...filters, riskScoreMin: parseFloat(e.target.value) })}
              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={filters.riskScoreMax}
              onChange={(e) => setFilters({ ...filters, riskScoreMax: parseFloat(e.target.value) })}
              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Vulnerability Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">
            Classified Vulnerabilities ({sortedVulnerabilities.length} of {vulnerabilities.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Vulnerability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">CVSS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Exploit Prob.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Business Impact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {sortedVulnerabilities.map((vuln) => {
                const riskLevel = getRiskLevel(vuln.riskScore);
                return (
                  <tr key={vuln.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-500 font-mono text-sm">{vuln.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-white font-medium text-sm">{vuln.name}</p>
                        <p className="text-slate-400 text-xs">{vuln.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-slate-300 text-sm font-mono">{vuln.target}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg font-bold ${riskLevel.color}`}>
                          {vuln.riskScore.toFixed(1)}
                        </span>
                        <span className={`text-xs ${riskLevel.color}`}>
                          {riskLevel.level}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white font-medium">{vuln.cvss.toFixed(1)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(vuln.severity)}`}>
                        {vuln.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-orange-500"
                            style={{ width: `${vuln.exploitProbability * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-slate-300 text-sm">{Math.round(vuln.exploitProbability * 100)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-red-500"
                            style={{ width: `${vuln.businessImpact * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-slate-300 text-sm">{Math.round(vuln.businessImpact * 100)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vuln.status)}`}>
                        {vuln.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-500 hover:text-blue-400 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Classification;