import { useLanguage } from '../LanguageContext.jsx'

// メニューと価格は時期によって変わる旨の注記。
// 店舗ページ（メニュー一覧の上）と料理ページ（価格の下）の両方に出す。
// 実在店の情報なので、掲載内容が最新と限らないことをお客様に伝えておく。

const TEXT = {
  en: 'Menu items and prices may change depending on the season.',
  zhCN: '菜品与价格可能随季节变动。',
  zhTW: '菜色與價格可能隨季節變動。',
  ko: '메뉴와 가격은 시기에 따라 달라질 수 있습니다.',
  ja: 'メニューと価格は時期によって変わることがあります。',
}

export default function MenuNote({ className = '' }) {
  const { lang } = useLanguage()
  return (
    <p className={`text-xs leading-snug text-ink/55 ${className}`}>
      * {TEXT[lang] || TEXT.en}
    </p>
  )
}
