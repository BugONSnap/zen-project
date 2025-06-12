# Deploying Zen Project to Render

This guide will help you deploy your SvelteKit application with SQLite database to Render.

## Prerequisites

1. A Render account (free tier available)
2. Your code pushed to a Git repository (GitHub, GitLab, etc.)

## Step-by-Step Deployment Instructions

### 1. Prepare Your Repository

Make sure your repository contains all the necessary files:
- `package.json` with all dependencies
- `svelte.config.js` with Node.js adapter
- `render.yaml` configuration file
- `src/lib/server/db/` with database files

### 2. Connect to Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your Git repository
4. Select the repository containing your Zen project

### 3. Configure the Web Service

Use these settings in Render:

**Basic Settings:**
- **Name**: `zen-project` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)

**Build & Deploy Settings:**
- **Build Command**: `bun install && bun run build`
- **Start Command**: `bun run db:init && bun run start`

**Environment Variables:**
Add these environment variables in Render:
- `NODE_ENV`: `production`
- `PORT`: `10000`
- `DATABASE_URL`: `file:/opt/render/project/src/zen.db`
- `JWT_SECRET`: (Generate a secure random string)
- `SESSION_SECRET`: (Generate a secure random string)

### 4. Add Persistent Disk

1. In your Render service settings, go to "Disk" tab
2. Click "Add Disk"
3. Configure:
   - **Name**: `sqlite-data`
   - **Mount Path**: `/opt/render/project/src`
   - **Size**: `1 GB` (adjust as needed)

### 5. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Monitor the build logs for any issues

### 6. Verify Deployment

1. Once deployed, your app will be available at the provided URL
2. Test the login/register functionality
3. Check that the database is working properly

## Important Notes

### Database Persistence
- The SQLite database file will be stored on the persistent disk
- Data will survive service restarts and redeployments
- The database file is located at `/opt/render/project/src/zen.db`

### Environment Variables
- `JWT_SECRET` and `SESSION_SECRET` should be unique, secure random strings
- You can generate them using: `openssl rand -base64 32`

### Scaling Considerations
- SQLite is suitable for small to medium applications
- For high-traffic applications, consider migrating to PostgreSQL
- The free tier has limitations on build minutes and runtime

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are in `package.json`
2. **Database Errors**: Ensure the persistent disk is properly mounted
3. **Port Issues**: Make sure the app listens on the `PORT` environment variable

### Logs
- Check Render logs for detailed error information
- Database initialization logs will show in the deployment logs

## Security Notes

- Change default JWT and session secrets in production
- Consider using environment-specific database files
- Regularly backup your database file

## Cost Optimization

- Free tier includes 750 hours/month
- Persistent disk costs $0.25/GB/month
- Monitor usage in Render dashboard 