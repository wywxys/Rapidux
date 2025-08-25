# 部署指南

## 环境变量配置

### 开发环境
使用 `.env.local` 文件（已配置，无需修改）

### 生产环境部署

#### 1. Vercel 部署
在 Vercel Dashboard 的环境变量设置中添加：

```bash
NEXTAUTH_SECRET=你的32位随机密钥
NEXTAUTH_URL=https://your-app.vercel.app
NODE_ENV=production
```

生成安全密钥的命令：
```bash
openssl rand -base64 32
```

#### 2. 其他云服务器部署
在服务器上设置环境变量：

```bash
export NEXTAUTH_SECRET="你的32位随机密钥"
export NEXTAUTH_URL="https://你的域名.com"
export NODE_ENV="production"
```

或者创建 `.env.production.local` 文件：
```bash
NEXTAUTH_SECRET=你的32位随机密钥
NEXTAUTH_URL=https://你的域名.com
NODE_ENV=production
```

#### 3. Docker 部署
在 docker-compose.yml 中：
```yaml
environment:
  - NEXTAUTH_SECRET=你的32位随机密钥
  - NEXTAUTH_URL=https://你的域名.com
  - NODE_ENV=production
```

## 测试账户
- admin@rapidux.com / admin123
- test@rapidux.com / test123

## 调试
访问 `/api/debug` 检查环境配置（仅在开发环境或使用DEBUG_TOKEN时可用）

## 部署检查清单
- [ ] NEXTAUTH_SECRET 已设置（32位以上）
- [ ] NEXTAUTH_URL 匹配实际域名
- [ ] NODE_ENV=production
- [ ] 测试登录功能
- [ ] 检查服务器日志
