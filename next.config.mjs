/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/(.*)', // 모든 경로에 대해 적용
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "media-src 'self' blob: *.oaiusercontent.com https://cdn.openai.com https://persistent.oaistatic.com https://dict-dn.pstatic.net;",
            },
          ],
        },
      ];
    },
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
  reactStrictMode: false,

};

export default nextConfig;
