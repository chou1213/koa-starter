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
./prisma
└── schema.prisma  #定义数据模型
./src
├── app.js
├── middlewares
│   └── authMiddleware.js
├── models
│   ├── prisma.js
│   └── user.js 
├── routes
│   ├── index.js  #定义路由
│   └── userRoutes.js
└── utils
    └── index.js
```

# 环境变量
```bash
PORT=
DATABASE_URL=
SECRET_KEY=
```

# 开发流程
1. 定义数据模型schema.prisma
2. 定义路由 routes/index.js
3. 编写curd models/user.js


