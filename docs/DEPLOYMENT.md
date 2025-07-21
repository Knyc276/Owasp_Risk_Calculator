# VulnGuard Pro Deployment Guide

This guide covers deployment options and configurations for VulnGuard Pro in various environments.

## 📋 Table of Contents

- [Deployment Options](#deployment-options)
- [Production Deployment](#production-deployment)
- [Docker Deployment](#docker-deployment)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Security Considerations](#security-considerations)
- [Monitoring and Maintenance](#monitoring-and-maintenance)

## 🚀 Deployment Options

### 1. Static Site Deployment (Recommended)

VulnGuard Pro is built as a single-page application (SPA) and can be deployed as static files.

**Supported Platforms:**
- Netlify (Current deployment)
- Vercel
- AWS S3 + CloudFront
- Azure Static Web Apps
- GitHub Pages

### 2. Container Deployment

Deploy using Docker containers for consistent environments.

### 3. Kubernetes Deployment

Enterprise-grade deployment with orchestration and scaling.

## 🏭 Production Deployment

### Environment Variables

Create a `.env.production` file:

```env
# Application Configuration
VITE_APP_NAME=VulnGuard Pro
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.vulnguard.pro/v1

# Security Configuration
VITE_ENABLE_HTTPS=true
VITE_SECURE_COOKIES=true
VITE_CSP_ENABLED=true

# Analytics (Optional)
VITE_ANALYTICS_ID=your_analytics_id
VITE_ERROR_REPORTING_DSN=your_sentry_dsn
```

### Build Configuration

Update `vite.config.ts` for production:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
});
```

### Security Headers

Configure security headers in your web server:

```nginx
# Nginx configuration
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  vulnguard-pro:
    build: .
    ports:
      - "80:80"
      - "443:443"
    environment:
      - NODE_ENV=production
    volumes:
      - ./ssl:/etc/nginx/ssl:ro
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Optional: Add a reverse proxy
  nginx-proxy:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./proxy.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - vulnguard-pro
    restart: unless-stopped
```

### Build and Deploy

```bash
# Build the Docker image
docker build -t vulnguard-pro:latest .

# Run the container
docker run -d \
  --name vulnguard-pro \
  -p 80:80 \
  -p 443:443 \
  --restart unless-stopped \
  vulnguard-pro:latest

# Or use Docker Compose
docker-compose up -d
```

## ☸️ Kubernetes Deployment

### Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: vulnguard-pro
```

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vulnguard-pro
  namespace: vulnguard-pro
  labels:
    app: vulnguard-pro
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vulnguard-pro
  template:
    metadata:
      labels:
        app: vulnguard-pro
    spec:
      containers:
      - name: vulnguard-pro
        image: vulnguard-pro:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: vulnguard-pro-service
  namespace: vulnguard-pro
spec:
  selector:
    app: vulnguard-pro
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP
```

### Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: vulnguard-pro-ingress
  namespace: vulnguard-pro
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - vulnguard.yourdomain.com
    secretName: vulnguard-pro-tls
  rules:
  - host: vulnguard.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: vulnguard-pro-service
            port:
              number: 80
```

### ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: vulnguard-pro-config
  namespace: vulnguard-pro
data:
  nginx.conf: |
    server {
        listen 80;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
```

### Deploy to Kubernetes

```bash
# Apply all configurations
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml

# Check deployment status
kubectl get pods -n vulnguard-pro
kubectl get services -n vulnguard-pro
kubectl get ingress -n vulnguard-pro
```

## 🔒 Security Considerations

### SSL/TLS Configuration

```nginx
# Nginx SSL configuration
server {
    listen 443 ssl http2;
    server_name vulnguard.yourdomain.com;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.vulnguard.pro;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
">
```

### Environment Security

1. **Secrets Management**: Use proper secrets management (Kubernetes secrets, Docker secrets, etc.)
2. **Network Security**: Implement proper network segmentation and firewall rules
3. **Access Control**: Configure proper authentication and authorization
4. **Monitoring**: Implement security monitoring and alerting
5. **Updates**: Keep all components updated with security patches

## 📊 Monitoring and Maintenance

### Health Checks

```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0'
  });
});
```

### Logging Configuration

```yaml
# Kubernetes logging with Fluentd
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/vulnguard-pro*.log
      pos_file /var/log/fluentd-containers.log.pos
      tag kubernetes.*
      format json
    </source>
    
    <match kubernetes.**>
      @type elasticsearch
      host elasticsearch.logging.svc.cluster.local
      port 9200
      index_name vulnguard-pro
    </match>
```

### Monitoring with Prometheus

```yaml
# ServiceMonitor for Prometheus
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: vulnguard-pro-monitor
  namespace: vulnguard-pro
spec:
  selector:
    matchLabels:
      app: vulnguard-pro
  endpoints:
  - port: http
    path: /metrics
    interval: 30s
```

### Backup and Recovery

```bash
#!/bin/bash
# Backup script for configuration and data

BACKUP_DIR="/backups/vulnguard-pro"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR/$DATE"

# Backup Kubernetes configurations
kubectl get all -n vulnguard-pro -o yaml > "$BACKUP_DIR/$DATE/k8s-resources.yaml"

# Backup ConfigMaps and Secrets
kubectl get configmaps -n vulnguard-pro -o yaml > "$BACKUP_DIR/$DATE/configmaps.yaml"
kubectl get secrets -n vulnguard-pro -o yaml > "$BACKUP_DIR/$DATE/secrets.yaml"

# Compress backup
tar -czf "$BACKUP_DIR/vulnguard-pro-backup-$DATE.tar.gz" -C "$BACKUP_DIR" "$DATE"

# Clean up old backups (keep last 30 days)
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: vulnguard-pro-backup-$DATE.tar.gz"
```

### Performance Optimization

1. **CDN Configuration**: Use a CDN for static asset delivery
2. **Caching**: Implement proper caching strategies
3. **Compression**: Enable gzip/brotli compression
4. **Resource Optimization**: Optimize images and assets
5. **Load Balancing**: Implement load balancing for high availability

### Maintenance Tasks

1. **Regular Updates**: Keep dependencies and base images updated
2. **Security Scanning**: Regularly scan containers for vulnerabilities
3. **Performance Monitoring**: Monitor application performance metrics
4. **Log Analysis**: Regularly analyze logs for issues and optimization opportunities
5. **Capacity Planning**: Monitor resource usage and plan for scaling

---

This deployment guide provides comprehensive information for deploying VulnGuard Pro in various environments. Choose the deployment method that best fits your infrastructure and security requirements.