import type { ReadTimeResults } from 'reading-time'

export interface ConvertRequest {
  markdown: string
}

export interface ConvertResponse {
  code: number
  data: {
    html: string
    title: string
    readingTime: ReadTimeResults
  }
  message: string
}