import cors from 'cors'
import createDOMPurify from 'dompurify'
import express from 'express'
import { JSDOM } from 'jsdom'
import { marked } from 'marked'

// 创建 DOMPurify 实例
const window = new JSDOM(``).window
const DOMPurify = createDOMPurify(window)

const app = express()
app.use(cors())
app.use(express.json())

app.post(`/api/convert`, (req, res) => {
  try {
    const { markdown } = req.body

    // 转换 markdown 为 HTML
    const html = marked(markdown)

    // XSS 防护
    const cleanHtml = DOMPurify.sanitize(html)

    // 提取标题 - 修复正则表达式
    const titleMatch = markdown.match(/^#\s(.+)$/m)
    const title = titleMatch ? titleMatch[1] : ``

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
      message: `success`,
    })
  }
  catch (error) {
    res.status(500).json({
      code: 500,
      message: error instanceof Error ? error.message : `服务器内部错误`,
    })
  }
})

// 添加服务器启动代码
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API 服务已启动在端口 ${PORT}`)
})
