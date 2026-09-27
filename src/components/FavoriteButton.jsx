import { useFavorites, toggleFavorite } from '../favorites.js'
import { useLanguage } from '../LanguageContext.jsx'

// お気に入りの登録／解除ボタン（ハート）。
// 登録すると地図の「♡」で絞り込めるようになるので、その旨が伝わる文言にしている。

const TEXT = {
  save: { en: 'Save', zhCN: '收藏', zhTW: '收藏', ko: '저장', ja: '保存' },
  saved: { en: 'Saved', zhCN: '已收藏', zhTW: '已收藏', ko: '저장됨', ja: '保存済み' },
}

function HeartIcon({ filled, size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z" />
    </svg>
  )
}

export default function FavoriteButton({ shopId }) {
  const { lang } = useLanguage()
  const favorites = useFavorites()
  const saved = favorites.includes(shopId)
  const label = saved ? TEXT.saved[lang] || TEXT.saved.en : TEXT.save[lang] || TEXT.save.en

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(shopId)}
      aria-pressed={saved}
      className={`press inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-hand text-sm font-bold shadow-hand ${
        saved ? 'bg-vermilion text-white' : 'bg-white text-vermilion'
      }`}
    >
      <HeartIcon filled={saved} />
      {label}
    </button>
  )
}
