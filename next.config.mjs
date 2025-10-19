/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking for production
  },
  images: {
    unoptimized: true, // Keep this for Vercel deployment
    domains: ['your-supabase-project.supabase.co'], // Add your Supabase domain
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Enable static optimization for better performance
  output: 'standalone',
  // Optimize for Vercel
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
