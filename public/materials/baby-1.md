# 成长相册

一个供家庭成员共同记录宝宝成长的私密相册。当前版本已接入真实账号、家庭权限、PostgreSQL 和服务器本地文件存储，家庭成员登录后可以同步查看同一家庭的数据与照片。

## 技术架构

- Next.js 16、React 19、TypeScript、Tailwind CSS
- PostgreSQL 16：账号、会话、家庭、宝宝、成长记录、成员和邀请
- 服务器本地目录：照片和视频原文件；仅登录家庭成员可通过应用读取
- Argon2id 密码哈希、随机会话令牌、HttpOnly Cookie
- Docker Compose：Next.js、PostgreSQL、Nginx

## 本地运行

```bash
npm install
npm run dev
```

复制 `.env.example` 为 `.env.local`，填写数据库连接；照片默认写入 `data/media`。打开 [http://localhost:3000](http://localhost:3000)，注册新账号并创建或加入家庭。

## 质量检查

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

## 阿里云 ECS 部署

本机部署使用 [专用 Compose 配置](deploy/compose.aliyun.yaml)：PostgreSQL 仅在容器网络内开放，Next.js 仅绑定服务器的 `127.0.0.1:18002`，由现有 1Panel OpenResty 提供 HTTPS 入口 `https://album.47.237.109.221.sslip.io/`。数据库密码保存在服务器 `/opt/babygrowth-album/.env`，不提交到 Git。

照片目录挂载为 `/opt/babygrowth-album/media`。部署前创建该目录并赋予容器用户写权限：

```bash
sudo mkdir -p /opt/babygrowth-album/media
sudo chown 1001:1001 /opt/babygrowth-album/media
```

将 `deploy/album.nginx.conf` 同步到 OpenResty 站点配置后重载 Nginx，以便媒体上传走更大的请求体限制。

```bash
cd /opt/babygrowth-album
docker compose --env-file .env -p growthalbum -f deploy/compose.aliyun.yaml up -d --build
docker compose --env-file .env -p growthalbum -f deploy/compose.aliyun.yaml ps
```

服务器每日使用 `growthalbum-backup.timer` 将 PostgreSQL 与照片目录备份到 `/opt/babygrowth-album/backups`，保留 14 天；`papermind-cert-renew.timer` 负责续签同一 OpenResty 中的所有 Let's Encrypt 证书。

这台 ECS 只有约 896 MB 内存，已配置 2 GB 交换空间，并将 `vm.swappiness` 调整为 60。原有 1Panel MySQL 曾反复被系统因内存不足终止，现将其 Performance Schema 关闭、InnoDB 缓冲池设为 64 MB，并降低连接数；原配置备份在服务器 `/opt/1panel/apps/mysql/mysql/conf/my.cnf.before-growthalbum-20261026`。

## 备份

`deploy/backup-aliyun.sh` 会把数据库备份和 `media` 目录打包写入 `/opt/babygrowth-album/backups`，保留 14 天。建议将备份额外复制到另一处存储。
