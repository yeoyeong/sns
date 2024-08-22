/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'naiuwynkzwfqzahhlglm.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/profile_img/**',
          },
        ],
    },
    webpack(config) {
      config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
      });

      return config;
  },
};

export default nextConfig;
