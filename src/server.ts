const process = require('node:process')
const cors = require('cors')
const createDOMPurify = require('dompurify')
const express = require('express')
const { JSDOM } = require('jsdom')
const { marked } = require('marked')

// 创建 DOMPurify 实例
const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

const app = express()
app.use(cors())
app.use(express.json())

// 添加根路由
app.get('/', (_req: any, res: any) => {
  res.json({
    code: 0,
    message: 'Markdown API 服务正常运行',
  })
})

app.post('/api/convert', (req: any, res: any) => {
  try {
    const { markdown } = req.body

    // 转换 markdown 为 HTML
    const html = marked(markdown)

    // XSS 防护
    const cleanHtml = DOMPurify.sanitize(html)

    // 提取标题
    const titleMatch = markdown.match(/^#\s(.+)$/m)
    const title = titleMatch ? titleMatch[1] : ''

    res.json({
      code: 0,
      data: {
        html: cleanHtml,
        title,
        readingTime: {
          minutes: 1,
          words: markdown.length,
        },
      },
      message: 'success',
    })
  }
  catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message || '服务器内部错误',
    })
  }
})

// 仅在非生产环境启动服务器
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`API 服务已启动在端口 ${PORT}`)
  })
}

module.exports = app
