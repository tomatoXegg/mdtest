import type { ConvertRequest, ConvertResponse } from '../types'
import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'

export async function convertMarkdown(req: ConvertRequest): Promise<ConvertResponse> {
  try {
    const { markdown } = req

    // 转换 Markdown 为 HTML
    const html = await Promise.resolve(marked(markdown))

    // XSS 防护
    const cleanHtml = DOMPurify.sanitize(html)

    // 提取标题 - 使用固定长度的空白字符匹配
    const titleMatch = markdown.match(/^# ([^\n]+)$/m)
    const title = titleMatch ? titleMatch[1].trim() : ``

    return {
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
    }
  }
  catch (error) {
    throw new Error(error instanceof Error ? error.message : `服务器内部错误`)
  }
}
