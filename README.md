# 安装
```bash
npm i
```

# 运行
```bash
# local dev
npm run start

# test environment
npm run start:test

# production environment
npm run start:prod
```

# 把数据库结构同步到数据库
```bash
npm run migrate
```

# 项目结构
```bash
./src
├── app.js
├── controllers # 处理 HTTP 请求的业务逻
│   ├── fileController.js
│   └── userController.js
├── middlewares
│   └── authMiddleware.js
├── models # 数据库CURD
│   ├── prisma.js
│   └── userModel.js
├── routes # 自定义路由
│   ├── fileRoutes.js
│   ├── index.js
│   └── userRoutes.js
└── utils
    └── index.js
./prisma
├── migrations
│   ├── 20240804104919_
│   │   └── migration.sql
│   └── migration_lock.toml
└── schema.prisma
./tmp # 临时文件夹，用来保存用户上传的文件
```

# 环境变量
1. .env 本地开发
2. .env.test 测试环境
3. .env.production 生成环境
```bash
PORT=3000
# 数据库的URL
DATABASE_URL=
# token加密密钥
SECRET_KEY=
# ali-oss 区域
REGION=
# ali-oss 密钥 ID
ACCESSKEYID=
# ali-oss 密钥
ACCESSKEYSECRET=
# ali-oss 存储桶的名称
BUCKET=
```

# 中间件
1. authMiddleware.js 对指定路由进行鉴权
```js
  app.use(authMiddleware(SECRET_KEY, { path: [/^\/user/] }))
```
# 文件上传的接口
```bash
# 单文件上传
/file/uploadSingle

# 多文件上传接口
/file/uploadBatch

# 自定义上传接口key
/file/uploadMulter
```

# 开发流程
1. 定义数据模型schema.prisma
2. 定义路由 routes/
3. 编写curd models/
4. 便携HTTP请求业务逻辑 controllers/


