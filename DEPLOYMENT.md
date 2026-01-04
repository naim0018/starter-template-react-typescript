# Deployment Guide

This guide covers deploying your React + TypeScript application to various hosting platforms.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass (when implemented)
- [ ] Build succeeds locally: `npm run build`
- [ ] Environment variables are configured
- [ ] API endpoints are accessible from production domain
- [ ] CORS is configured on backend for production domain
- [ ] No console.log statements in production code
- [ ] Security best practices are followed
- [ ] Assets are optimized

## 🏗️ Build for Production

```bash
# Create production build
npm run build

# Output will be in the dist/ directory
```

The build process:
1. TypeScript compilation
2. Vite optimization (code splitting, minification)
3. Asset optimization
4. Source map generation

## 🚀 Deployment Options

### Vercel (Recommended)

**Automatic Deployment via GitHub**

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variables in Vercel dashboard
7. Deploy!

**Environment Variables in Vercel**:
```
VITE_API_BASE_URL=https://api.yoursite.com
VITE_ENV=production
```

**vercel.json** (already configured):
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Netlify

**Via Drag & Drop**:
1. Run `npm run build`
2. Visit [app.netlify.com](https://app.netlify.com)
3. Drag the `dist/` folder to the deploy zone

**Via GitHub**:
1. Connect your GitHub repository
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Add environment variables in Netlify dashboard
4. Deploy

**netlify.toml** (create this file):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update vite.config.ts:
   ```typescript
   export default defineConfig({
     base: '/your-repo/',
     plugins: [react(), tailwindcss()],
     // ... rest of config
   });
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### AWS S3 + CloudFront

**1. Create S3 Bucket**:
```bash
aws s3 mb s3://your-app-name
aws s3 website s3://your-app-name --index-document index.html --error-document index.html
```

**2. Upload Build**:
```bash
npm run build
aws s3 sync dist/ s3://your-app-name --delete
```

**3. Set Bucket Policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-app-name/*"
    }
  ]
}
```

**4. Create CloudFront Distribution** (optional, for HTTPS and CDN):
- Origin: Your S3 bucket
- Default Root Object: `index.html`
- Error Pages: 404 → /index.html (200 response)

### Docker

**Dockerfile**:
```dockerfile
# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Build and Run**:
```bash
docker build -t your-app .
docker run -p 8080:80 your-app
```

### Railway

1. Visit [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Configure:
   - **Build Command**: `npm run build`
   - **Start Command**: `npx serve dist -l $PORT`
4. Add environment variables
5. Deploy

Install serve in dependencies:
```bash
npm install --save serve
```

### DigitalOcean App Platform

1. Connect GitHub repository
2. Configure:
   - **Type**: Static Site
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Set environment variables
4. Deploy

## 🔐 Environment Variables

### Required Variables

```bash
VITE_API_BASE_URL=https://api.yoursite.com
VITE_ENV=production
```

### Setting Variables by Platform

| Platform | How to Set |
|----------|-----------|
| Vercel | Dashboard → Project → Settings → Environment Variables |
| Netlify | Dashboard → Site → Build & Deploy → Environment |
| GitHub Pages | GitHub Secrets (for Actions) |
| AWS | CloudFormation or Console |
| Docker | Docker run `-e` flag or docker-compose |

## 🔒 Security Configuration

### HTTP Headers

Add security headers via your hosting platform or reverse proxy:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

**For Vercel**, add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### HTTPS

Always use HTTPS in production:
- Vercel/Netlify: Automatic HTTPS
- Custom domain: Use Let's Encrypt
- CloudFront: ACM certificates

## 🌐 Custom Domain

### Vercel
1. Add domain in project settings
2. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Netlify
1. Add domain in site settings
2. Configure DNS:
   ```
   Type: A
   Name: @
   Value: (Netlify's IP)
   
   Type: CNAME
   Name: www
   Value: yoursite.netlify.app
   ```

### CloudFlare (Recommended for additional security)
1. Add site to CloudFlare
2. Update nameservers at registrar
3. Enable:
   - Always Use HTTPS
   - Auto Minify (JS, CSS, HTML)
   - Brotli compression
   - Caching

## 📊 Post-Deployment Monitoring

### Performance Monitoring

1. **Google Lighthouse**:
   ```bash
   npx lighthouse https://yoursite.com --view
   ```

2. **Web Vitals**: Monitor Core Web Vitals
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

### Error Tracking

Consider integrating:
- **Sentry**: Real-time error tracking
- **LogRocket**: Session replay
- **DataDog**: Full-stack monitoring

### Analytics

Options:
- Google Analytics 4
- Plausible (privacy-friendly)
- PostHog (open source)

## 🔄 CI/CD Automation

### GitHub Actions (already configured)

The `.github/workflows/ci.yml` runs on every push/PR:
- Linting
- Type checking
- Build validation

**Add deployment workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist
```

## 🐛 Troubleshooting

### Build Fails
- Check Node version matches requirements
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Ensure all environment variables are set

### 404 on Routes
- Configure rewrites to point all routes to index.html
- Check routing configuration in hosting platform

### Assets Not Loading
- Verify `base` in vite.config.ts matches deployment path
- Check asset paths are relative
- Ensure CORS allows asset requests

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Rebuild after changing variables
- Check variables are set in hosting platform

## 📈 Performance Optimization

### Pre-Deployment
- [ ] Enable gzip/brotli compression
- [ ] Configure CDN caching
- [ ] Lazy load routes
- [ ] Optimize images
- [ ] Remove unused dependencies

### Post-Deployment
- Monitor bundle size
- Analyze with webpack-bundle-analyzer
- Check load times
- Review Lighthouse scores

## 📝 Rollback Strategy

Keep previous builds accessible:
1. Tag releases in Git
2. Use platform's rollback feature
3. Maintain staging environment
4. Test in staging before production

---

**Deployed successfully? Don't forget to:**
- Monitor error logs
- Set up uptime monitoring
- Configure backup strategy
- Document your deployment process
