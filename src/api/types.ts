export interface ConvertOptions {
  theme?: string
  fontSize?: string
  fontFamily?: string
  primaryColor?: string
  codeTheme?: string
  useIndent?: boolean
}

export interface ConvertRequest {
  markdown: string
  options?: {
    theme?: string
    fontSize?: string
    fontFamily?: string
    useIndent?: boolean
  }
}

export interface ConvertResponse {
  code: number
  data: {
    html: string
    title: string
    readingTime: {
      minutes: number
      words: number
    }
  }
  message: string
}
