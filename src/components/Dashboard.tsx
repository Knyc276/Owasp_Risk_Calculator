import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, Shield, Activity, Target, Clock } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, trend = 'neutral' }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-red-500';
      case 'down': return 'text-emerald-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${getTrendColor()}`}>
              {change}
            </p>
          )}
        </div>
        <div className="h-12 w-12 bg-slate-700 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [recentScans, setRecentScans] = useState([
    { id: 1, target: '192.168.1.0/24', vulnerabilities: 12, riskScore: 8.5, status: 'completed', time: '2 hours ago' },
    { id: 2, target: 'web-server.company.com', vulnerabilities: 5, riskScore: 6.2, status: 'completed', time: '4 hours ago' },
    { id: 3, target: '10.0.0.0/16', vulnerabilities: 23, riskScore: 9.1, status: 'running', time: 'In progress' },
  ]);

  const getRiskColor = (score: number) => {
    if (score >= 8) return 'text-red-500';
    if (score >= 6) return 'text-yellow-500';
    if (score >= 4) return 'text-blue-500';
    return 'text-emerald-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500';
      case 'running': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Security Dashboard</h2>
        <p className="text-slate-400">Real-time vulnerability management and risk assessment overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Vulnerabilities"
          value="247"
          change="+12% from last week"
          icon={AlertCircle}
          trend="up"
        />
        <MetricCard
          title="High Risk Assets"
          value="18"
          change="-5% from last week"
          icon={Shield}
          trend="down"
        />
        <MetricCard
          title="Average Risk Score"
          value="6.8"
          change="+0.3 from last month"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title="Active Scans"
          value="3"
          change="2 completed today"
          icon={Activity}
          trend="neutral"
        />
      </div>

      {/* Risk Distribution Chart */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Risk Distribution</h3>
        <div className="space-y-4">
          {[
            { level: 'Critical', count: 15, percentage: 85, color: 'bg-red-500' },
            { level: 'High', count: 32, percentage: 70, color: 'bg-orange-500' },
            { level: 'Medium', count: 89, percentage: 45, color: 'bg-yellow-500' },
            { level: 'Low', count: 111, percentage: 25, color: 'bg-emerald-500' },
          ].map((item) => (
            <div key={item.level} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                <span className="text-slate-300 font-medium">{item.level}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-white font-medium w-8 text-right">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Scans</h3>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentScans.map((scan) => (
            <div key={scan.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <Target className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-white font-medium">{scan.target}</p>
                  <p className="text-slate-400 text-sm">{scan.vulnerabilities} vulnerabilities found</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className={`font-medium ${getRiskColor(scan.riskScore)}`}>
                    Risk Score: {scan.riskScore}
                  </p>
                  <p className="text-slate-400 text-sm flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {scan.time}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(scan.status)}`}></div>
                  <span className="text-slate-300 text-sm capitalize">{scan.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;