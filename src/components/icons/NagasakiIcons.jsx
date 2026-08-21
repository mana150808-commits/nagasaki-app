// 長崎モチーフの手描き風SVGアイコン集。
// 直線的になりすぎないよう、線に少し揺らぎを持たせている。
// stroke は currentColor を使うので、親要素の text color で色を変えられる。

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// 教会（大浦天主堂などの尖塔をイメージ）
export function ChurchIcon({ size = 48, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <g {...base}>
        <path d="M24 4c1 3 .6 5 .3 7" />
        <path d="M21 9h6" />
        <path d="M24 11l7 8v22H17V19l7-8z" />
        <path d="M20 41V31c0-2.4 1.7-4 4-4s4 1.6 4 4v10" />
        <path d="M24 15v6M21 18h6" />
      </g>
    </svg>
  )
}

// 路面電車（長崎電気軌道）
export function TramIcon({ size = 48, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <g {...base}>
        <path d="M12 34V16c0-2.2 1.9-4 4.2-4h15.6C34 12 36 13.8 36 16v18" />
        <path d="M10 34h28" />
        <path d="M15 17h18v8H15z" />
        <circle cx="18" cy="37" r="2.4" />
        <circle cx="30" cy="37" r="2.4" />
        <path d="M24 12V7M18 7h12" />
      </g>
    </svg>
  )
}

// 港・船（長崎港）
export function PortIcon({ size = 48, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <g {...base}>
        <path d="M24 8v18" />
        <path d="M24 12l8 3-8 3" />
        <path d="M12 26h24l-4 8c-1 2-3 3-5 3H21c-2 0-4-1-5-3l-4-8z" />
        <path d="M8 40c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0 4-1.5 6 0 4 1.5 6 0" />
      </g>
    </svg>
  )
}

// 坂道（オランダ坂など長崎の坂の街）
export function SlopeIcon({ size = 48, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <g {...base}>
        <path d="M6 40L38 12" />
        <path d="M12 34l4 4M18 29l4 4M24 24l4 4M30 19l4 4" />
        <path d="M38 12h4v6" />
      </g>
    </svg>
  )
}

// ランタン（長崎ランタンフェスティバル）
export function LanternIcon({ size = 48, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <g {...base}>
        <path d="M24 6v4M18 10h12" />
        <path d="M17 14c0-1 1-2 2-2h10c1 0 2 1 2 2 3 3 3 12 0 15 0 1-1 2-2 2H19c-1 0-2-1-2-2-3-3-3-12 0-15z" />
        <path d="M24 12v23" />
        <path d="M20 35h8M22 38l-1 4M26 38l1 4" />
      </g>
    </svg>
  )
}

// 折りたたんだ地図（MAPカード用）
export function MapPinIcon({ size = 48, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <g {...base}>
        <path d="M8 14l10-4 12 4 10-4v24l-10 4-12-4-10 4z" />
        <path d="M18 10v24M30 14v24" />
        <path d="M24 20c-2.2 0-4 1.7-4 3.9 0 2.7 4 6.1 4 6.1s4-3.4 4-6.1c0-2.2-1.8-3.9-4-3.9z" />
        <circle cx="24" cy="23.6" r="1.1" />
      </g>
    </svg>
  )
}

// 吹き出し・ペン（アンケートカード用）
export function FeedbackIcon({ size = 48, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <g {...base}>
        <path d="M8 12c0-2 1.6-3 3.5-3h21C34.4 9 36 10 36 12v14c0 2-1.6 3-3.5 3H20l-7 6 1-6h-2.5C9.6 29 8 28 8 26V12z" />
        <path d="M14 16h14M14 21h9" />
        <path d="M40 20l3 3-9 9-4 1 1-4 9-9z" />
      </g>
    </svg>
  )
}

// 星（評価用）。filled で塗りつぶし表現。
export function StarIcon({ size = 44, filled = false, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M24 5l5.6 11.6L42 18.4l-9 8.9 2.2 12.6L24 34l-11.2 5.9L15 27.3l-9-8.9 12.4-1.8L24 5z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
