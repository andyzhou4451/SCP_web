# Docker 开发环境使用说明

- 基于 Node.js 24 Alpine 镜像

## 快速开始

### 1. 构建镜像

```bash
docker build -t scp-web .
```

### 2. 运行容器

```bash
# 使用 docker-compose（推荐）
docker-compose up

# 或者使用 docker 命令
docker run -p 80:80 -v $(pwd):/app -v /app/node_modules scp-web
```

## 常用命令

### 使用 Docker Compose

```bash
# 启动服务
docker-compose up

# 后台启动
docker-compose up -d

# 停止服务
docker-compose down

# 重新构建并启动
docker-compose up --build

# 查看日志
docker-compose logs -f

# 进入容器
docker-compose exec scp-web sh
```

### 使用 Docker 命令

```bash
# 构建镜像
docker build -t scp-web .

# 运行容器
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules scp-web

# 进入容器
docker exec -it <container_id> sh

# 停止容器
docker stop <container_id>

# 删除容器
docker rm <container_id>
```

## 开发工作流程

### 1. 首次运行

```bash
# 克隆项目
git clone <your-repo>
cd scp_web

# 使用 Docker Compose 启动
docker-compose up
```

### 2. 日常开发

```bash
# 启动开发环境
docker-compose up

# 访问应用
打开浏览器访问 http://localhost

# 修改代码后，应用会自动热重载
```

### 3. 安装新依赖

```bash
# 进入容器
docker-compose exec scp-web sh

# 在容器内安装依赖
pnpm install <package-name>

# 或者直接在宿主机安装（会自动同步到容器）
pnpm install <package-name>
```

## 注意事项

1. **端口冲突**：如果3000端口已被占用，可以修改 `docker-compose.yml` 中的端口映射
2. **文件权限**：在Linux/macOS上可能需要设置文件权限
3. **热重载**：由于使用了卷挂载，代码修改会实时同步到容器中
4. **依赖安装**：建议在容器内使用 pnpm 安装依赖，避免兼容性问题

## 故障排除

### 1. 构建失败

- 检查网络连接
- 清理 Docker 缓存：`docker system prune -a`
- 重新构建：`docker-compose build --no-cache`

### 2. 依赖安装失败

- 删除 node_modules 和 lock 文件
- 重新构建镜像

### 3. 端口被占用

- 修改 docker-compose.yml 中的端口映射
- 或者停止占用80端口的服务
- 例如改为8080端口：将 `80:80` 改为 `8080:80`
