import { useNavigate } from 'react-router-dom'

// ホーム（夜景ヒーロー）上に置くナビゲーションボタン。
// variant="hero" … MAP用の大きく目立つCTA。
// variant="mini" … アンケート用の小さなガラス風ボタン（右下）。
export default function HomeCard({ to, variant = 'hero', title, icon }) {
  const navigate = useNavigate()

  if (variant === 'mini') {
    return (
      <button
        type="button"
        onClick={() => navigate(to)}
        aria-label={title}
        className="press inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md hover:bg-white/20"
      >
        <span className="text-gold">{icon}</span>
        {title}
      </button>
    )
  }

  // hero: 大きく光るCTA
  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      aria-label={title}
      className="press group flex w-full items-center gap-4 rounded-2xl border border-gold/30 bg-gradient-to-r from-vermilion to-terracotta p-5 text-left shadow-glow hover:shadow-handlg"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-display text-3xl uppercase leading-none tracking-wide text-white">
          {title}
        </span>
        <span className="mt-1 block text-xs font-medium uppercase tracking-[0.2em] text-white/70">
          Tap to open
        </span>
      </span>
      <span className="text-3xl text-white transition-transform group-hover:translate-x-1">→</span>
    </button>
  )
}
