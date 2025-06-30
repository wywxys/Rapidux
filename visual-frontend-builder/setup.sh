#!/bin/bash

echo "🚀 Visual Frontend Builder 安装脚本"
echo "======================================"

# 检查是否安装了 Bun
if ! command -v bun &> /dev/null; then
    echo "❌ 未检测到 Bun，请先安装 Bun:"
    echo "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ 检测到 Bun"

# 检查是否安装了 Docker
if ! command -v docker &> /dev/null; then
    echo "⚠️  未检测到 Docker，某些功能可能无法使用"
else
    echo "✅ 检测到 Docker"
fi

# 安装依赖
echo "📦 安装依赖..."
bun install

# 设置环境变量
if [ ! -f .env ]; then
    echo "📄 创建环境配置文件..."
    cp .env.example .env
    echo "⚠️  请编辑 .env 文件并填入您的 API 密钥"
fi

# 初始化数据库
echo "🗄️  初始化数据库..."
mkdir -p data
bun --filter @visual-builder/db db:setup

echo ""
echo "🎉 安装完成！"
echo ""
echo "下一步："
echo "1. 编辑 .env 文件，填入您的 OpenAI 或 Anthropic API 密钥"
echo "2. 运行 'bun dev' 启动开发服务器"
echo "3. 或运行 'docker compose -f docker-compose.new.yml up' 启动 Docker 服务"
echo ""
