import React, { useState } from 'react';
import { Shield, Scan, Network, BarChart3, Settings, AlertTriangle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import RiskCalculator from './components/RiskCalculator';
import VulnerabilityScanner from './components/VulnerabilityScanner';
import SIEMIntegration from './components/SIEMIntegration';
import Classification from './components/Classification';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'risk-calculator', label: 'OWASP Risk Calculator', icon: Shield },
    { id: 'scanner', label: 'Vulnerability Scanner', icon: Scan },
    { id: 'siem', label: 'SIEM Integration', icon: Network },
    { id: 'classification', label: 'Classification', icon: AlertTriangle },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'risk-calculator':
        return <RiskCalculator />;
      case 'scanner':
        return <VulnerabilityScanner />;
      case 'siem':
        return <SIEMIntegration />;
      case 'classification':
        return <Classification />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-500" />
              <h1 className="text-xl font-bold text-white">VulnGuard Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Settings className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;