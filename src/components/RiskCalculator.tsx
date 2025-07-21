import React, { useState, useEffect } from 'react';
import { Calculator, Info, AlertTriangle } from 'lucide-react';

interface RiskFactor {
  id: string;
  label: string;
  description: string;
  value: number;
  category: 'threat' | 'vulnerability' | 'technical' | 'business';
}

const RiskCalculator: React.FC = () => {
  const [factors, setFactors] = useState<RiskFactor[]>([
    // Threat Agent Factors
    { id: 'skill_level', label: 'Skill Level', description: 'How technically skilled is the threat agent?', value: 5, category: 'threat' },
    { id: 'motive', label: 'Motive', description: 'How motivated is the threat agent to find and exploit this vulnerability?', value: 5, category: 'threat' },
    { id: 'opportunity', label: 'Opportunity', description: 'What resources and opportunities are required for the threat agent to find and exploit this vulnerability?', value: 5, category: 'threat' },
    { id: 'size', label: 'Size', description: 'How large is the group of threat agents?', value: 5, category: 'threat' },
    
    // Vulnerability Factors
    { id: 'ease_of_discovery', label: 'Ease of Discovery', description: 'How easy is it for the threat agent to discover this vulnerability?', value: 5, category: 'vulnerability' },
    { id: 'ease_of_exploit', label: 'Ease of Exploit', description: 'How easy is it for the threat agent to actually exploit this vulnerability?', value: 5, category: 'vulnerability' },
    { id: 'awareness', label: 'Awareness', description: 'How well known is this vulnerability to the group of threat agents?', value: 5, category: 'vulnerability' },
    { id: 'intrusion_detection', label: 'Intrusion Detection', description: 'How likely is an exploit to be detected?', value: 5, category: 'vulnerability' },
    
    // Technical Impact Factors
    { id: 'loss_of_confidentiality', label: 'Loss of Confidentiality', description: 'How much data could be disclosed and how sensitive is it?', value: 5, category: 'technical' },
    { id: 'loss_of_integrity', label: 'Loss of Integrity', description: 'How much data could be corrupted and how damaged is it?', value: 5, category: 'technical' },
    { id: 'loss_of_availability', label: 'Loss of Availability', description: 'How much service could be lost and how vital is it?', value: 5, category: 'technical' },
    { id: 'loss_of_accountability', label: 'Loss of Accountability', description: 'Are the threat agents actions traceable to an individual?', value: 5, category: 'technical' },
    
    // Business Impact Factors
    { id: 'financial_damage', label: 'Financial Damage', description: 'How much financial damage will result from an exploit?', value: 5, category: 'business' },
    { id: 'reputation_damage', label: 'Reputation Damage', description: 'Would an exploit result in reputation damage that would harm the business?', value: 5, category: 'business' },
    { id: 'non_compliance', label: 'Non-Compliance', description: 'How much exposure does this create for non-compliance?', value: 5, category: 'business' },
    { id: 'privacy_violation', label: 'Privacy Violation', description: 'How much personally identifiable information could be disclosed?', value: 5, category: 'business' },
  ]);

  const [riskScore, setRiskScore] = useState({ likelihood: 0, impact: 0, overall: 0 });

  useEffect(() => {
    calculateRiskScore();
  }, [factors]);

  const calculateRiskScore = () => {
    const threatFactors = factors.filter(f => f.category === 'threat');
    const vulnerabilityFactors = factors.filter(f => f.category === 'vulnerability');
    const technicalFactors = factors.filter(f => f.category === 'technical');
    const businessFactors = factors.filter(f => f.category === 'business');

    const threatScore = threatFactors.reduce((sum, f) => sum + f.value, 0) / threatFactors.length;
    const vulnerabilityScore = vulnerabilityFactors.reduce((sum, f) => sum + f.value, 0) / vulnerabilityFactors.length;
    const technicalScore = technicalFactors.reduce((sum, f) => sum + f.value, 0) / technicalFactors.length;
    const businessScore = businessFactors.reduce((sum, f) => sum + f.value, 0) / businessFactors.length;

    const likelihood = (threatScore + vulnerabilityScore) / 2;
    const impact = (technicalScore + businessScore) / 2;
    const overall = (likelihood + impact) / 2;

    setRiskScore({ likelihood, impact, overall });
  };

  const updateFactor = (id: string, value: number) => {
    setFactors(factors.map(f => f.id === id ? { ...f, value } : f));
  };

  const getRiskLevel = (score: number) => {
    if (score >= 8) return { level: 'Critical', color: 'text-red-500', bg: 'bg-red-500' };
    if (score >= 6) return { level: 'High', color: 'text-orange-500', bg: 'bg-orange-500' };
    if (score >= 4) return { level: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-500' };
    return { level: 'Low', color: 'text-emerald-500', bg: 'bg-emerald-500' };
  };

  const categories = [
    { key: 'threat', title: 'Threat Agent Factors', description: 'Factors related to the threat agent group' },
    { key: 'vulnerability', title: 'Vulnerability Factors', description: 'Factors related to the vulnerability involved' },
    { key: 'technical', title: 'Technical Impact Factors', description: 'Technical impact that can be created by a successful exploit' },
    { key: 'business', title: 'Business Impact Factors', description: 'Business impact that can be created by a successful exploit' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">OWASP Risk Rating Calculator</h2>
          <p className="text-slate-400">Calculate risk scores based on OWASP Risk Rating Methodology</p>
        </div>
        <div className="flex items-center space-x-4">
          <Calculator className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      {/* Risk Score Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Likelihood</h3>
            <Info className="h-5 w-5 text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-blue-500 mb-2">
            {riskScore.likelihood.toFixed(1)}
          </div>
          <div className={`text-sm font-medium ${getRiskLevel(riskScore.likelihood).color}`}>
            {getRiskLevel(riskScore.likelihood).level}
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Impact</h3>
            <Info className="h-5 w-5 text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-purple-500 mb-2">
            {riskScore.impact.toFixed(1)}
          </div>
          <div className={`text-sm font-medium ${getRiskLevel(riskScore.impact).color}`}>
            {getRiskLevel(riskScore.impact).level}
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Overall Risk</h3>
            <AlertTriangle className="h-5 w-5 text-slate-400" />
          </div>
          <div className={`text-3xl font-bold mb-2 ${getRiskLevel(riskScore.overall).color}`}>
            {riskScore.overall.toFixed(1)}
          </div>
          <div className={`text-sm font-medium ${getRiskLevel(riskScore.overall).color}`}>
            {getRiskLevel(riskScore.overall).level}
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.key} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
              <p className="text-slate-400 text-sm">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {factors.filter(f => f.category === category.key).map((factor) => (
                <div key={factor.id} className="space-y-3">
                  <div>
                    <label className="text-white font-medium text-sm">{factor.label}</label>
                    <p className="text-slate-400 text-xs mt-1">{factor.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Low (0)</span>
                      <span className="text-white font-medium">{factor.value}</span>
                      <span className="text-slate-400 text-sm">High (9)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="9"
                      value={factor.value}
                      onChange={(e) => updateFactor(factor.id, parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskCalculator;