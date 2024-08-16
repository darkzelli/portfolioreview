/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                port: '',
                hostname: 'ohfftirpfjwsakryntaz.supabase.co',
                pathname: '/**'
            }
        ]
    },
    reactStrictMode: false,
    logging: {
        fetches: {
            fullUrl: true,
        }
    },
    experimental: {
        optimizePackageImports: ['@emotion/styled', '@emotion/react', '@mui/icons-material', '@mui/joy', 'lucide-react', '@mui/material'],
    },
};

export default nextConfig;
