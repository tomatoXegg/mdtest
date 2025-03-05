import process from 'node:process'
import cors from 'cors'
import express from 'express'
import convertRouter from './routes/convert'

const app = express()

// 中间件
app.use(cors())
app.use(express.json({ limit: `5mb` }))

// 路由
app.use(`/api`, convertRouter)

// 错误处理
app.use((_err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(_err.status || 500).json({
    code: _err.code || 500,
    message: _err.message || `服务器内部错误`,
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`API 服务已启动在端口 ${PORT}`)
})
