import { useState } from 'react'

// 店舗の写真表示。
// src の画像が読み込めればそれを表示、無い/失敗ならテーマに合った
// プレースホルダー枠（淡いグラデ＋アイコン＋ラベル）を表示する。
// → 後で public/shops/<id>/ に実写真を置くだけで自動で切り替わる。
export default function ShopImage({ src, alt, label, variant = 'menu', className = '' }) {
  const [failed, setFailed] = useState(false)
  const showImg = src && !failed

  return (
    <div className={`relative overflow-hidden bg-cream ${className}`}>
      {showImg ? (
        <img
          src={src}
          alt={alt || label || ''}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <Placeholder label={label} variant={variant} />
      )}
    </div>
  )
}

// 実写真が無いときの枠
function Placeholder({ label, variant }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-cream to-[#e7ddc4] text-terracotta/70">
      {variant === 'exterior' ? <StorefrontGlyph /> : <BowlGlyph />}
      {label && (
        <span className="px-2 text-center text-xs font-medium text-ink/45">{label}</span>
      )}
      <span className="text-[10px] uppercase tracking-widest text-ink/30">photo</span>
    </div>
  )
}

// 店舗外観（暖簾のかかった店先）
function StorefrontGlyph() {
  return (
    <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 20 L10 12 H38 L40 20" />
        <path d="M10 20 V40 H38 V20" />
        <path d="M10 20 q3.5 4 7 0 q3.5 4 7 0 q3.5 4 7 0 q3.5 4 7 0" />
        <path d="M20 40 V30 h8 v10" />
      </g>
    </svg>
  )
}

// 料理（丼）
function BowlGlyph() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22 H40 a16 16 0 0 1 -32 0 Z" />
        <path d="M6 22 H42" />
        <path d="M20 14 q4 -4 8 0" />
        <path d="M24 10 v4" />
      </g>
    </svg>
  )
}
