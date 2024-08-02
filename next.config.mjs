/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    logging: {
        fetches: {
            fullUrl: true,
        }
    },
    experimental: {
        optimizePackageImports: ['@emotion/styled', '@emotion/react', '@mui/icons-material', '@mui/joy', 'lucide-react'],
    },
};

export default nextConfig;
