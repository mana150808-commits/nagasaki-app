import { createContext, useContext, useEffect, useState } from 'react'

// マップの言語切り替えと同じ5言語を、アプリ全体（店舗の説明文など）でも共有する。
// マップ側でどれかを選ぶと、店舗ページ・料理ページの説明文もその言語に切り替わる。
export const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'zhCN', label: '简' },
  { code: 'zhTW', label: '繁' },
  { code: 'ko', label: '한' },
  { code: 'ja', label: '日' },
]

const STORAGE_KEY = 'nagasaki_app_lang'
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // localStorageが使えない環境でも動作は継続する
    }
  }, [lang])

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

// 多言語オブジェクト（{ en, ja, zhCN, zhTW, ko }）から、現在の言語のテキストを取り出す。
// 未翻訳の言語やプレーンな文字列（翻訳未対応の項目）にも安全に対応する。
export function pickText(value, lang) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.en || ''
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
