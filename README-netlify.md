# Netlify Deployment Guide for Educational Gaming Platform

## Overview
Your educational gaming platform is now properly configured for Netlify deployment. The setup separates the React frontend (deployed to Netlify) from the Express backend (deployed separately).

## Files Created for Deployment

- `netlify.toml` - Netlify configuration with build settings
- `DEPLOYMENT.md` - Step-by-step deployment instructions  
- `.env.example` - Environment variables template
- `client/src/lib/apiConfig.ts` - Production API configuration
- `build-netlify.js` - Custom build script (optional)

## Project Structure

```
your-project/
├── client/                 # React frontend → Netlify
├── server/                 # Express backend → Deploy separately  
├── shared/                 # Shared schemas and types
├── netlify.toml           # Netlify build configuration
├── .env.example           # Environment variables template
└── DEPLOYMENT.md          # Deployment instructions
```

## Deployment Steps

### 1. Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your GitHub/GitLab repository
4. Choose your repository

### 2. Configure Build Settings
Netlify will automatically detect the `netlify.toml` configuration:
- **Build command**: `node build-netlify.js`
- **Publish directory**: `dist/public`
- **Node version**: 20

### 3. Environment Variables (if needed)
If your frontend requires API endpoints or external services:
1. Go to Site settings → Environment variables
2. Add any required API keys or configuration variables
3. Prefix frontend variables with `VITE_` (e.g., `VITE_API_URL`)

### 4. Domain Configuration
- Netlify provides a random subdomain (e.g., `amazing-site-123456.netlify.app`)
- You can customize this in Site settings → Domain management
- For custom domains, follow Netlify's domain setup guide

## Build Process

The `build-netlify.js` script:
1. Builds the React frontend using Vite
2. Outputs static files to `dist/public`
3. Includes proper routing configuration for single-page apps

## Features Available in Static Deployment

✅ **Working Features:**
- Complete React frontend
- Client-side routing
- Static game assets
- Responsive design
- Educational content display

⚠️ **Requires Backend Integration:**
- User authentication
- Progress tracking
- Real-time features
- Database operations

## Backend Integration Options

For full functionality, consider these approaches:

### Option 1: External API
- Deploy your Express backend to Railway, Render, or Heroku
- Update frontend API calls to point to your deployed backend
- Configure CORS properly

### Option 2: Netlify Functions
- Convert Express routes to Netlify serverless functions
- Place functions in `netlify/functions/` directory
- Update API endpoints to use function URLs

### Option 3: Headless CMS
- Use services like Strapi, Contentful, or Sanity
- Migrate game content and educational data
- Connect frontend to CMS APIs

## File Configuration

### netlify.toml
```toml
[build]
  command = "node build-netlify.js"
  publish = "dist/public"
  environment = { NODE_VERSION = "20" }

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables Example
```bash
# For external API integration
VITE_API_URL=https://your-backend.herokuapp.com/api
VITE_GAME_CDN_URL=https://your-cdn.com/games
```

## Troubleshooting

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Review build logs in Netlify dashboard

### Routing Issues
- Ensure `netlify.toml` includes the redirect rule
- Check that routes match your React Router setup

### Asset Loading
- Verify asset paths are relative
- Check that images and game files are in the build output

## Performance Optimization

1. **Enable Gzip**: Netlify automatically compresses files
2. **Asset Optimization**: Use Vite's built-in optimization
3. **CDN**: Netlify provides global CDN automatically
4. **Caching**: Configure cache headers in `netlify.toml`

## Next Steps After Deployment

1. Test all frontend functionality
2. Set up backend service if needed
3. Configure custom domain
4. Set up monitoring and analytics
5. Implement CI/CD workflows