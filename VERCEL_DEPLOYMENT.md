# Vercel Deployment Guide for SignSee App

This guide will help you deploy your SignSee app to Vercel with Supabase as your backend.

## Prerequisites

1. **Supabase Project**: Set up with the database schema from `BACKEND_INTEGRATION.md`
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Repository**: Your code should be in a GitHub repository

## Step 1: Prepare Your Supabase Backend

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Set up Database Schema**:
   - Use the SQL schema from `BACKEND_INTEGRATION.md`
   - Run the SQL commands in your Supabase SQL editor

3. **Configure Row Level Security (RLS)**:
   ```sql
   -- Enable RLS on all tables
   ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
   ALTER TABLE signs ENABLE ROW LEVEL SECURITY;
   ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
   ALTER TABLE gesture_recognition ENABLE ROW LEVEL SECURITY;
   ALTER TABLE lesson_signs ENABLE ROW LEVEL SECURITY;

   -- Create policies (example - adjust based on your needs)
   CREATE POLICY "Allow public read access to lessons" ON lessons FOR SELECT USING (true);
   CREATE POLICY "Allow public read access to signs" ON signs FOR SELECT USING (true);
   CREATE POLICY "Allow users to manage their own progress" ON user_progress FOR ALL USING (auth.uid()::text = user_id);
   CREATE POLICY "Allow users to manage their own gesture data" ON gesture_recognition FOR ALL USING (auth.uid()::text = user_id);
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:
   - In the Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

5. **Redeploy**:
   ```bash
   vercel --prod
   ```

## Step 3: Configure Your Domain (Optional)

1. **Custom Domain**:
   - In Vercel dashboard, go to your project
   - Navigate to "Domains"
   - Add your custom domain
   - Follow the DNS configuration instructions

2. **Update Supabase Settings**:
   - In your Supabase dashboard, go to "Authentication" > "URL Configuration"
   - Add your Vercel domain to "Site URL" and "Redirect URLs"

## Step 4: Test Your Deployment

1. **Visit Your App**:
   - Go to your Vercel deployment URL
   - Test all major features:
     - Learning modules
     - Practice sessions
     - Gesture recognition
     - User progress tracking

2. **Check Console for Errors**:
   - Open browser developer tools
   - Look for any API connection errors
   - Verify Supabase connection is working

## Step 5: Monitor and Optimize

1. **Vercel Analytics**:
   - Enable Vercel Analytics in your dashboard
   - Monitor performance and user behavior

2. **Supabase Monitoring**:
   - Check your Supabase dashboard for API usage
   - Monitor database performance

3. **Performance Optimization**:
   - Use Vercel's built-in performance insights
   - Optimize images and assets
   - Consider implementing caching strategies

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**:
   - Ensure variables are prefixed with `NEXT_PUBLIC_`
   - Redeploy after adding new variables
   - Check variable names match exactly

2. **Supabase Connection Errors**:
   - Verify your Supabase URL and anon key
   - Check RLS policies are correctly configured
   - Ensure your Supabase project is active

3. **Build Errors**:
   - Check TypeScript errors in your local build
   - Ensure all dependencies are properly installed
   - Review Vercel build logs for specific errors

4. **CORS Issues**:
   - Add your Vercel domain to Supabase CORS settings
   - Check Supabase project settings

### Performance Tips

1. **Image Optimization**:
   - Use Next.js Image component
   - Optimize image sizes before upload
   - Consider using a CDN for static assets

2. **Code Splitting**:
   - Use dynamic imports for heavy components
   - Implement lazy loading for non-critical features

3. **Caching**:
   - Implement proper caching headers
   - Use Supabase's built-in caching features
   - Consider implementing Redis for session storage

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to your repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Supabase Security**:
   - Implement proper RLS policies
   - Use Supabase Auth for user management
   - Regularly audit your database permissions

3. **API Security**:
   - Validate all user inputs
   - Implement rate limiting
   - Use HTTPS for all communications

## Monitoring and Maintenance

1. **Regular Updates**:
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update Supabase client library regularly

2. **Backup Strategy**:
   - Enable Supabase database backups
   - Keep your code in version control
   - Document your deployment process

3. **Scaling**:
   - Monitor Vercel usage limits
   - Consider upgrading Supabase plan if needed
   - Implement proper error handling and logging

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

Your SignSee app is now ready for production deployment on Vercel! 🚀
