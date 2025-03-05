import type { Request, Response } from 'express'
import type { ConvertRequest } from '../types'
import express from 'express'
import { convertMarkdown } from '../controllers/convertController'

const router = express.Router()

router.post(`/convert`, (req: Request, res: Response) => {
  (async () => {
    try {
      const request = req.body as ConvertRequest

      // 参数验证
      if (!request.markdown) {
        return res.status(400).json({
          code: 400,
          message: `markdown 内容不能为空`,
        })
      }

      const result = await convertMarkdown(request)
      res.json(result)
    }
    catch (error: any) {
      res.status(error.code || 500).json({
        code: error.code || 500,
        message: error.message || `服务器内部错误`,
      })
    }
  })()
})

export default router
