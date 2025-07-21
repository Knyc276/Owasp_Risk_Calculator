# VulnGuard Pro - OWASP Risk-Based Vulnerability Management Tool

A comprehensive vulnerability management platform that combines OWASP Risk Rating methodology with advanced vulnerability scanning and SIEM integration capabilities.

## 🚀 Live Demo

**[View Live Application](https://owaspriskcalculator.netlify.app)**

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [OWASP Risk Rating](#owasp-risk-rating)
- [Vulnerability Scanner](#vulnerability-scanner)
- [SIEM Integration](#siem-integration)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🛡️ OWASP Risk Rating Calculator
- **Comprehensive Risk Assessment**: Calculate risk scores based on the complete OWASP Risk Rating Methodology
- **Four Factor Categories**: 
  - Threat Agent Factors (Skill Level, Motive, Opportunity, Size)
  - Vulnerability Factors (Ease of Discovery, Ease of Exploit, Awareness, Intrusion Detection)
  - Technical Impact Factors (Loss of Confidentiality, Integrity, Availability, Accountability)
  - Business Impact Factors (Financial Damage, Reputation Damage, Non-Compliance, Privacy Violation)
- **Real-time Scoring**: Interactive sliders with instant risk score calculation
- **Risk Level Classification**: Automatic categorization into Critical, High, Medium, and Low risk levels

### 🔍 Advanced Vulnerability Scanner
- **Multiple Scan Types**: Quick, Comprehensive, Stealth, and Aggressive scanning modes
- **Network Discovery**: Port scanning, service detection, and OS fingerprinting
- **Vulnerability Assessment**: Automated identification of security weaknesses
- **Real-time Progress**: Live scan progress monitoring with detailed statistics
- **Configurable Options**: Customizable port ranges, scan timing, and detection methods

### 🔗 SIEM Integration Platform
- **Multi-Platform Support**: Integration with Splunk, Elastic SIEM, IBM QRadar, Microsoft Sentinel
- **Real-time Data Export**: Automated vulnerability data synchronization
- **API Endpoints**: RESTful APIs for seamless integration
- **Webhook Support**: Real-time alert notifications
- **Activity Logging**: Comprehensive integration activity tracking

### 📊 Vulnerability Classification System
- **Risk-Based Prioritization**: Sort and filter vulnerabilities by calculated risk scores
- **Advanced Filtering**: Multi-criteria filtering by severity, category, status, and risk score ranges
- **Exploit Impact Analysis**: Detailed probability and business impact assessments
- **Status Tracking**: Vulnerability lifecycle management (Open, In Progress, Resolved, Accepted)
- **Export Capabilities**: Generate reports in multiple formats

### 📈 Security Dashboard
- **Real-time Metrics**: Live vulnerability statistics and risk distribution
- **Visual Analytics**: Interactive charts and graphs for risk visualization
- **Recent Activity**: Timeline of recent scans and discoveries
- **Asset Overview**: Comprehensive view of security posture across all assets

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom security-focused theme
- **Icons**: Lucide React icon library
- **Build Tool**: Vite for fast development and optimized builds
- **Deployment**: Netlify with automatic CI/CD

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vulnguard-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Usage

### Getting Started

1. **Dashboard Overview**: Start with the main dashboard to get an overview of your security posture
2. **Risk Assessment**: Use the OWASP Risk Calculator to assess individual vulnerabilities
3. **Vulnerability Scanning**: Configure and run scans against your network assets
4. **SIEM Integration**: Connect your existing SIEM tools for automated data flow
5. **Classification**: Review and prioritize vulnerabilities based on calculated risk scores

### OWASP Risk Rating Workflow

1. Navigate to the **OWASP Risk Calculator** tab
2. Configure the four factor categories using the interactive sliders:
   - **Threat Agent Factors**: Assess the capabilities and motivation of potential attackers
   - **Vulnerability Factors**: Evaluate how easily the vulnerability can be discovered and exploited
   - **Technical Impact**: Determine the technical consequences of successful exploitation
   - **Business Impact**: Assess the business consequences and regulatory implications
3. Review the calculated **Likelihood**, **Impact**, and **Overall Risk** scores
4. Use the risk scores to prioritize remediation efforts

### Vulnerability Scanner Usage

1. Go to the **Vulnerability Scanner** tab
2. Configure scan parameters:
   - **Target**: IP address, hostname, or network range
   - **Scan Type**: Choose from Quick, Comprehensive, Stealth, or Aggressive
   - **Port Range**: Specify ports to scan (e.g., "1-1000" or "80,443,8080")
   - **Options**: Enable service detection, OS detection, or aggressive scanning
3. Click **Start Scan** to begin the assessment
4. Monitor progress and review results as they appear
5. Export results for further analysis or reporting

### SIEM Integration Setup

1. Navigate to the **SIEM Integration** tab
2. Configure your SIEM connections:
   - Select supported platforms (Splunk, Elastic, QRadar, Sentinel)
   - Configure API endpoints and authentication
   - Set data export frequency and formats
3. Test connections and verify data flow
4. Monitor integration activity through the activity log

## 🔒 Security Considerations

- **Data Privacy**: All vulnerability data is processed locally in your browser
- **Network Security**: Scanner operates within configured network boundaries
- **API Security**: SIEM integrations use secure authentication methods
- **Access Control**: Implement proper access controls in production deployments

## 🤝 Contributing

We welcome contributions to improve VulnGuard Pro! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting with Prettier
- Write comprehensive tests for new features
- Update documentation for any API changes
- Follow security best practices for vulnerability management tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, feature requests, or bug reports:

- Create an issue in the GitHub repository
- Review the [API Documentation](docs/API.md) for integration questions
- Check the [User Guide](docs/USER_GUIDE.md) for detailed usage instructions

## 🙏 Acknowledgments

- **OWASP Foundation** for the Risk Rating Methodology
- **Security Community** for vulnerability research and best practices
- **Open Source Contributors** who make projects like this possible

---

**Built with ❤️ for the cybersecurity community**