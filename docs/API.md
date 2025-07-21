# VulnGuard Pro API Documentation

This document provides comprehensive information about the VulnGuard Pro API endpoints for SIEM integration and data export.

## 📋 Table of Contents

- [Authentication](#authentication)
- [Base URL](#base-url)
- [Rate Limiting](#rate-limiting)
- [Response Format](#response-format)
- [Endpoints](#endpoints)
- [Webhooks](#webhooks)
- [Error Handling](#error-handling)
- [Examples](#examples)

## 🔐 Authentication

All API requests require authentication using API keys. Include your API key in the request header:

```http
Authorization: Bearer your_api_key_here
```

### Obtaining API Keys

1. Navigate to the SIEM Integration tab in VulnGuard Pro
2. Click on "Generate API Key" 
3. Copy and securely store your API key
4. Configure your SIEM tool with the API key

## 🌐 Base URL

```
https://api.vulnguard.pro/v1
```

## ⚡ Rate Limiting

- **Standard Plan**: 1000 requests per hour
- **Enterprise Plan**: 10000 requests per hour
- **Rate limit headers** are included in all responses:
  - `X-RateLimit-Limit`: Request limit per hour
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Time when rate limit resets (Unix timestamp)

## 📊 Response Format

All API responses follow a consistent JSON format:

```json
{
  "success": true,
  "data": {},
  "message": "Request successful",
  "timestamp": "2025-01-10T14:30:00Z",
  "version": "1.0"
}
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request parameters are invalid",
    "details": {}
  },
  "timestamp": "2025-01-10T14:30:00Z"
}
```

## 🔗 Endpoints

### Vulnerabilities

#### GET /vulnerabilities

Retrieve all discovered vulnerabilities with risk scores.

**Parameters:**
- `limit` (optional): Number of results to return (default: 100, max: 1000)
- `offset` (optional): Number of results to skip (default: 0)
- `severity` (optional): Filter by severity (Critical, High, Medium, Low)
- `status` (optional): Filter by status (Open, In Progress, Resolved, Accepted)
- `risk_score_min` (optional): Minimum risk score (0-10)
- `risk_score_max` (optional): Maximum risk score (0-10)
- `discovered_after` (optional): ISO 8601 date string
- `discovered_before` (optional): ISO 8601 date string

**Example Request:**
```http
GET /v1/vulnerabilities?severity=Critical&limit=50
Authorization: Bearer your_api_key_here
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "vulnerabilities": [
      {
        "id": "VULN-001",
        "name": "Log4Shell Remote Code Execution",
        "description": "Apache Log4j2 JNDI features do not protect against attacker controlled LDAP endpoints",
        "target": "web-app.company.com",
        "cvss_score": 10.0,
        "risk_score": 9.5,
        "severity": "Critical",
        "category": "Web Application",
        "status": "Open",
        "exploit_probability": 0.95,
        "business_impact": 0.90,
        "discovered_date": "2025-01-10T12:00:00Z",
        "last_updated": "2025-01-10T14:30:00Z",
        "remediation": {
          "solution": "Update Log4j2 to version 2.17.1 or later",
          "priority": "Immediate",
          "estimated_effort": "2-4 hours"
        }
      }
    ],
    "total_count": 247,
    "page_info": {
      "has_next_page": true,
      "has_previous_page": false,
      "current_page": 1,
      "total_pages": 5
    }
  },
  "message": "Vulnerabilities retrieved successfully",
  "timestamp": "2025-01-10T14:30:00Z"
}
```

#### GET /vulnerabilities/{id}

Retrieve detailed information about a specific vulnerability.

**Example Request:**
```http
GET /v1/vulnerabilities/VULN-001
Authorization: Bearer your_api_key_here
```

### Risk Scores

#### GET /risk-scores

Export calculated OWASP risk scores for all assets.

**Parameters:**
- `asset_type` (optional): Filter by asset type (web_application, network_service, database, etc.)
- `risk_level` (optional): Filter by risk level (Critical, High, Medium, Low)
- `include_factors` (optional): Include detailed risk factor breakdown (true/false)

**Example Response:**
```json
{
  "success": true,
  "data": {
    "risk_scores": [
      {
        "asset_id": "web-app-001",
        "asset_name": "web-app.company.com",
        "asset_type": "web_application",
        "overall_risk_score": 8.5,
        "risk_level": "Critical",
        "likelihood_score": 8.2,
        "impact_score": 8.8,
        "factors": {
          "threat_agent": {
            "skill_level": 7,
            "motive": 9,
            "opportunity": 8,
            "size": 8
          },
          "vulnerability": {
            "ease_of_discovery": 9,
            "ease_of_exploit": 8,
            "awareness": 9,
            "intrusion_detection": 3
          },
          "technical_impact": {
            "loss_of_confidentiality": 9,
            "loss_of_integrity": 8,
            "loss_of_availability": 9,
            "loss_of_accountability": 8
          },
          "business_impact": {
            "financial_damage": 9,
            "reputation_damage": 8,
            "non_compliance": 9,
            "privacy_violation": 9
          }
        },
        "last_calculated": "2025-01-10T14:30:00Z"
      }
    ]
  }
}
```

### Scan Results

#### GET /scan-results

Access detailed vulnerability scan results and reports.

**Parameters:**
- `scan_type` (optional): Filter by scan type (quick, comprehensive, stealth, aggressive)
- `target` (optional): Filter by scan target
- `status` (optional): Filter by scan status (running, completed, failed)
- `started_after` (optional): ISO 8601 date string
- `started_before` (optional): ISO 8601 date string

**Example Response:**
```json
{
  "success": true,
  "data": {
    "scan_results": [
      {
        "scan_id": "SCAN-001",
        "target": "192.168.1.0/24",
        "scan_type": "comprehensive",
        "status": "completed",
        "started_at": "2025-01-10T12:00:00Z",
        "completed_at": "2025-01-10T12:45:00Z",
        "duration_seconds": 2700,
        "statistics": {
          "hosts_discovered": 25,
          "ports_scanned": 1000,
          "open_ports": 47,
          "services_identified": 23,
          "vulnerabilities_found": 12
        },
        "vulnerabilities": [
          {
            "host": "192.168.1.100",
            "port": 22,
            "service": "SSH",
            "vulnerability": "Weak SSH Configuration",
            "severity": "Medium",
            "cvss_score": 5.3
          }
        ]
      }
    ]
  }
}
```

#### POST /scan-results

Submit new scan results to the system.

**Request Body:**
```json
{
  "target": "192.168.1.100",
  "scan_type": "comprehensive",
  "vulnerabilities": [
    {
      "name": "Outdated SSH Configuration",
      "port": 22,
      "service": "SSH",
      "severity": "Medium",
      "cvss_score": 5.3,
      "description": "SSH server allows weak ciphers",
      "solution": "Update SSH configuration"
    }
  ]
}
```

### Assets

#### GET /assets

Retrieve information about monitored assets.

**Example Response:**
```json
{
  "success": true,
  "data": {
    "assets": [
      {
        "id": "asset-001",
        "name": "web-app.company.com",
        "type": "web_application",
        "ip_address": "192.168.1.100",
        "last_scanned": "2025-01-10T12:00:00Z",
        "vulnerability_count": 5,
        "risk_score": 7.2,
        "status": "active"
      }
    ]
  }
}
```

## 🔔 Webhooks

VulnGuard Pro supports webhooks for real-time notifications of security events.

### Webhook Events

- `vulnerability.discovered`: New vulnerability found
- `vulnerability.updated`: Vulnerability status changed
- `scan.completed`: Vulnerability scan finished
- `risk_score.changed`: Asset risk score updated

### Webhook Configuration

Configure webhooks in the SIEM Integration tab:

1. Provide your webhook endpoint URL
2. Select events to subscribe to
3. Configure authentication (optional)
4. Test the webhook connection

### Webhook Payload Format

```json
{
  "event": "vulnerability.discovered",
  "timestamp": "2025-01-10T14:30:00Z",
  "data": {
    "vulnerability": {
      "id": "VULN-002",
      "name": "SQL Injection",
      "severity": "High",
      "target": "api.company.com",
      "risk_score": 8.1
    }
  },
  "signature": "sha256=abc123..."
}
```

### Webhook Security

- All webhook payloads are signed using HMAC-SHA256
- Verify the signature using your webhook secret
- Implement idempotency to handle duplicate deliveries

## ❌ Error Handling

### HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Invalid or missing API key
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### Error Codes

- `INVALID_REQUEST`: Request parameters are invalid
- `UNAUTHORIZED`: Authentication failed
- `FORBIDDEN`: Access denied
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## 📝 Examples

### Python Integration Example

```python
import requests
import json

class VulnGuardAPI:
    def __init__(self, api_key, base_url="https://api.vulnguard.pro/v1"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def get_vulnerabilities(self, severity=None, limit=100):
        params = {"limit": limit}
        if severity:
            params["severity"] = severity
        
        response = requests.get(
            f"{self.base_url}/vulnerabilities",
            headers=self.headers,
            params=params
        )
        return response.json()
    
    def get_risk_scores(self, include_factors=True):
        params = {"include_factors": include_factors}
        response = requests.get(
            f"{self.base_url}/risk-scores",
            headers=self.headers,
            params=params
        )
        return response.json()

# Usage
api = VulnGuardAPI("your_api_key_here")
critical_vulns = api.get_vulnerabilities(severity="Critical")
risk_scores = api.get_risk_scores()
```

### Splunk Integration Example

```python
# Splunk Universal Forwarder Script
import splunklib.client as client
import requests
import json
from datetime import datetime

def fetch_vulnguard_data():
    api_key = "your_api_key_here"
    headers = {"Authorization": f"Bearer {api_key}"}
    
    # Fetch vulnerabilities
    response = requests.get(
        "https://api.vulnguard.pro/v1/vulnerabilities",
        headers=headers
    )
    
    vulnerabilities = response.json()["data"]["vulnerabilities"]
    
    # Format for Splunk
    for vuln in vulnerabilities:
        event_data = {
            "timestamp": datetime.now().isoformat(),
            "source": "vulnguard",
            "sourcetype": "vulnerability",
            "event": vuln
        }
        print(json.dumps(event_data))

if __name__ == "__main__":
    fetch_vulnguard_data()
```

### Elastic SIEM Integration Example

```javascript
// Logstash configuration for VulnGuard integration
const { Client } = require('@elastic/elasticsearch');
const axios = require('axios');

const client = new Client({ node: 'http://localhost:9200' });

async function ingestVulnGuardData() {
  try {
    const response = await axios.get('https://api.vulnguard.pro/v1/vulnerabilities', {
      headers: {
        'Authorization': 'Bearer your_api_key_here'
      }
    });

    const vulnerabilities = response.data.data.vulnerabilities;

    for (const vuln of vulnerabilities) {
      await client.index({
        index: 'vulnguard-vulnerabilities',
        body: {
          '@timestamp': new Date(),
          vulnerability: vuln,
          source: 'vulnguard'
        }
      });
    }

    console.log(`Indexed ${vulnerabilities.length} vulnerabilities`);
  } catch (error) {
    console.error('Error ingesting data:', error);
  }
}

// Run every 5 minutes
setInterval(ingestVulnGuardData, 5 * 60 * 1000);
```

## 🔄 Data Export Formats

### JSON Export
```json
{
  "export_type": "vulnerabilities",
  "generated_at": "2025-01-10T14:30:00Z",
  "data": [...]
}
```

### CSV Export
```csv
ID,Name,Target,Severity,CVSS,Risk Score,Status,Discovered Date
VULN-001,Log4Shell RCE,web-app.company.com,Critical,10.0,9.5,Open,2025-01-10
```

### XML Export
```xml
<?xml version="1.0" encoding="UTF-8"?>
<vulnerabilities>
  <vulnerability id="VULN-001">
    <name>Log4Shell RCE</name>
    <target>web-app.company.com</target>
    <severity>Critical</severity>
    <cvss_score>10.0</cvss_score>
    <risk_score>9.5</risk_score>
  </vulnerability>
</vulnerabilities>
```

### Syslog Format
```
<134>Jan 10 14:30:00 vulnguard: VULNERABILITY id=VULN-001 name="Log4Shell RCE" target=web-app.company.com severity=Critical cvss=10.0 risk_score=9.5
```

---

For additional support or questions about the API, please contact our support team or create an issue in the GitHub repository.