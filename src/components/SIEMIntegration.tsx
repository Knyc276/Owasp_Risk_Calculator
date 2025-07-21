import React, { useState } from 'react';
import { Network, Database, CheckCircle, AlertCircle, Settings, Send, RefreshCw } from 'lucide-react';

interface SIEMProvider {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  eventsReceived: number;
  alertsSent: number;
}

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  event: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  message: string;
}

const SIEMIntegration: React.FC = () => {
  const [providers, setProviders] = useState<SIEMProvider[]>([
    {
      id: 'splunk',
      name: 'Splunk Enterprise',
      logo: '🔍',
      status: 'connected',
      lastSync: '2 minutes ago',
      eventsReceived: 1247,
      alertsSent: 23
    },
    {
      id: 'elastic',
      name: 'Elastic SIEM',
      logo: '🔸',
      status: 'connected',
      lastSync: '5 minutes ago',
      eventsReceived: 892,
      alertsSent: 15
    },
    {
      id: 'qradar',
      name: 'IBM QRadar',
      logo: '🔷',
      status: 'disconnected',
      lastSync: '2 hours ago',
      eventsReceived: 456,
      alertsSent: 8
    },
    {
      id: 'sentinel',
      name: 'Microsoft Sentinel',
      logo: '🛡️',
      status: 'error',
      lastSync: '1 hour ago',
      eventsReceived: 234,
      alertsSent: 5
    }
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '2025-01-10 14:32:15',
      source: 'Splunk',
      event: 'Vulnerability Alert',
      severity: 'Critical',
      message: 'CVE-2021-44228 detected on web-server-01.company.com'
    },
    {
      id: '2',
      timestamp: '2025-01-10 14:28:42',
      source: 'Elastic SIEM',
      event: 'Risk Score Update',
      severity: 'High',
      message: 'Risk score increased to 8.5 for database-server-02'
    },
    {
      id: '3',
      timestamp: '2025-01-10 14:25:18',
      source: 'VulnGuard Scanner',
      event: 'Scan Complete',
      severity: 'Info',
      message: 'Network scan completed for 192.168.1.0/24 - 12 vulnerabilities found'
    },
    {
      id: '4',
      timestamp: '2025-01-10 14:20:33',
      source: 'IBM QRadar',
      event: 'Connection Lost',
      severity: 'Medium',
      message: 'Lost connection to QRadar instance - attempting reconnection'
    }
  ]);

  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [showConfigModal, setShowConfigModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-emerald-500';
      case 'disconnected': return 'text-slate-500';
      case 'error': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'disconnected': return AlertCircle;
      case 'error': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500';
      case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500';
      case 'Low': return 'text-blue-500 bg-blue-500/10 border-blue-500';
      case 'Info': return 'text-slate-500 bg-slate-500/10 border-slate-500';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500';
    }
  };

  const testConnection = (providerId: string) => {
    // Simulate connection test
    console.log(`Testing connection to ${providerId}`);
  };

  const syncData = (providerId: string) => {
    // Simulate data sync
    console.log(`Syncing data with ${providerId}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">SIEM Integration</h2>
        <p className="text-slate-400">Manage connections and data flow with Security Information and Event Management systems</p>
      </div>

      {/* Provider Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {providers.map((provider) => {
          const StatusIcon = getStatusIcon(provider.status);
          return (
            <div key={provider.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{provider.logo}</span>
                  <div>
                    <h3 className="text-white font-medium">{provider.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <StatusIcon className={`h-3 w-3 ${getStatusColor(provider.status)}`} />
                      <span className={`text-xs capitalize ${getStatusColor(provider.status)}`}>
                        {provider.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Settings
                  className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors"
                  onClick={() => setSelectedProvider(provider.id)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Last Sync</span>
                  <span className="text-white">{provider.lastSync}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Events</span>
                  <span className="text-white">{provider.eventsReceived.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Alerts Sent</span>
                  <span className="text-white">{provider.alertsSent}</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => testConnection(provider.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white text-xs font-medium transition-colors"
                >
                  Test
                </button>
                <button
                  onClick={() => syncData(provider.id)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded text-white text-xs font-medium transition-colors flex items-center justify-center space-x-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Sync</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Data Flow Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Integration Settings */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">Integration Settings</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Data Export Format</label>
              <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="json">JSON</option>
                <option value="xml">XML</option>
                <option value="csv">CSV</option>
                <option value="syslog">Syslog</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Export Frequency</label>
              <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="realtime">Real-time</option>
                <option value="5min">Every 5 minutes</option>
                <option value="15min">Every 15 minutes</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Event Types to Export</label>
              <div className="space-y-2">
                {[
                  { id: 'vulnerabilities', label: 'Vulnerability Discoveries' },
                  { id: 'risk_scores', label: 'Risk Score Changes' },
                  { id: 'scan_results', label: 'Scan Results' },
                  { id: 'compliance', label: 'Compliance Status' },
                ].map((type) => (
                  <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-slate-300">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Minimum Risk Score for Alerts</label>
              <input
                type="range"
                min="0"
                max="10"
                defaultValue="6"
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Low (0)</span>
                <span>Critical (10)</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">API Endpoints</h3>
          
          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-500 font-mono text-sm">GET /api/v1/vulnerabilities</span>
                <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs">Active</span>
              </div>
              <p className="text-slate-400 text-sm">Retrieve all discovered vulnerabilities with risk scores</p>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-500 font-mono text-sm">POST /api/v1/webhooks/alerts</span>
                <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs">Active</span>
              </div>
              <p className="text-slate-400 text-sm">Receive real-time vulnerability alerts and updates</p>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-500 font-mono text-sm">GET /api/v1/risk-scores</span>
                <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs">Active</span>
              </div>
              <p className="text-slate-400 text-sm">Export calculated OWASP risk scores for assets</p>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-500 font-mono text-sm">GET /api/v1/scan-results</span>
                <span className="bg-slate-500 text-white px-2 py-1 rounded text-xs">Inactive</span>
              </div>
              <p className="text-slate-400 text-sm">Access detailed vulnerability scan results and reports</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-700 rounded-lg border border-slate-600">
            <h4 className="text-white font-medium mb-2">Authentication</h4>
            <p className="text-slate-400 text-sm mb-3">Use API keys for authentication. Include in header:</p>
            <code className="bg-slate-800 p-2 rounded text-green-400 text-sm block">
              Authorization: Bearer your_api_key_here
            </code>
          </div>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Integration Activity Log</h3>
          <div className="flex items-center space-x-4">
            <Database className="h-5 w-5 text-slate-400" />
            <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
              Export Logs
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600">
              <div className="flex items-center space-x-4">
                <span className="text-slate-400 text-sm font-mono">{log.timestamp}</span>
                <span className="text-blue-500 text-sm font-medium">{log.source}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(log.severity)}`}>
                  {log.severity}
                </span>
              </div>
              <div className="flex-1 mx-4">
                <span className="text-white text-sm font-medium">{log.event}</span>
                <p className="text-slate-400 text-xs mt-1">{log.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SIEMIntegration;