const express = require('express')
const { convertMarkdown } = require('../controllers/convertController')

const router = express.Router()

router.post('/api/convert', (req: any, res: any) => {
  try {
    const { markdown } = req.body

    // 参数验证
    if (!markdown) {
      return res.status(400).json({
        code: 400,
        message: 'markdown 内容不能为空',
      })
    }

    const result = convertMarkdown({ markdown })
    res.json(result)
  }
  catch (error: any) {
    res.status(error.code || 500).json({
      code: error.code || 500,
      message: error.message || '服务器内部错误',
    })
  }
})

module.exports = router
