# Netlify Deployment Checklist

## Pre-deployment Steps
- [ ] Code pushed to GitHub/GitLab repository
- [ ] Backend API deployed to hosting service (Heroku, Railway, Render)
- [ ] Database provisioned and accessible
- [ ] CORS configured on backend for your Netlify domain

## Netlify Setup
1. [ ] Go to netlify.com and create account
2. [ ] Click "New site from Git"
3. [ ] Connect your repository
4. [ ] Verify build settings:
   - Build command: `vite build`
   - Publish directory: `dist/public`
   - Node version: 20

## Environment Variables
Set in Netlify Site Settings → Environment Variables:
- [ ] `VITE_API_URL` = your backend API URL
- [ ] Any additional API keys or configuration

## Post-deployment Testing
- [ ] Site builds successfully
- [ ] All pages load correctly
- [ ] API connections work
- [ ] Games load and function properly
- [ ] User authentication works (if implemented)
- [ ] Database operations complete successfully

## Optional Enhancements
- [ ] Custom domain setup
- [ ] SSL certificate (automatic with Netlify)
- [ ] Performance monitoring
- [ ] Analytics integration