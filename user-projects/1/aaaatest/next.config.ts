/** @type {import('next').NextConfig} */
const nextConfig = {
  // 允许从父目录导入模块
  experimental: {
    externalDir: true,
  },
  // 配置 webpack 以解析父目录的模块
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 添加父目录的 node_modules 到解析路径
    config.resolve.modules.push('../node_modules');
    
    // 允许解析父目录的文件
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': '../src/components',
      '@/lib': '../src/lib',
      '@/utils': '../src/utils',
      '@/types': '../src/types',
      '@/hooks': '../src/hooks',
    };
    
    return config;
  },
};

export default nextConfig;
