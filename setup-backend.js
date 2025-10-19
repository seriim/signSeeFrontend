#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up SignSee Frontend for Supabase Backend Integration\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local already exists');
} else {
  console.log('📝 Creating .env.local file...');
  const envContent = `# Supabase Configuration
# Get these values from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Example:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
}

console.log('\n📋 Next Steps:');
console.log('1. Set up your Supabase project with the database schema from BACKEND_INTEGRATION.md');
console.log('2. Update .env.local with your actual Supabase URL and anon key');
console.log('3. Run "npm run dev" to start your development server');
console.log('4. Test the integration by visiting /learn or /practice pages');

console.log('\n🔗 Useful Links:');
console.log('- Supabase Dashboard: https://supabase.com/dashboard');
console.log('- Database Schema: See BACKEND_INTEGRATION.md');
console.log('- API Documentation: See lib/api.ts');

console.log('\n✨ Your frontend is now ready to connect to your Supabase backend!');
