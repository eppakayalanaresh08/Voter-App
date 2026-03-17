/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    eslint: {
        ignoreDuringBuilds: true, // ✅ IMPORTANT
    },
};

module.exports = nextConfig;