/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ohfftirpfjwsakryntaz.supabase.co',
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
