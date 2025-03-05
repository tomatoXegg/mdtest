const process = require('node:process')
const cors = require('cors')
const express = require('express')
const convertRouter = require('./routes/convert')

const app = express()

// 中间件
app.use(cors())
app.use(express.json({ limit: '5mb' }))

// 路由
app.use('/api', convertRouter)

// 错误处理
app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(err.status || 500).json({
    code: err.code || 500,
    message: err.message || '服务器内部错误',
  })
})

// 仅在非生产环境启动服务器
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`API 服务已启动在端口 ${PORT}`)
  })
}

// 导出 app 实例供 Vercel 使用
module.exports = app
