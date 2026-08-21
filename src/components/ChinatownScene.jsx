// Feedback（アンケート）画面の背景。
// ホーム画面の「暗い夜景」とは対照的に、明るい中華街＆ランタン祭りをイメージ。
// 連なった赤いランタンの列と、彩り豊かな中華門（牌楼）を主役にした賑やかなシーン。

// 明るい提灯（ランタン）
function FestLantern({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* 房（下飾り） */}
      <line x1="0" y1="10" x2="0" y2="16" stroke="#e6a817" strokeWidth="1.4" />
      <path d="M-2.4 15 h4.8 l-2.4 6 z" fill="#e6a817" />
      {/* 本体 */}
      <ellipse cx="0" cy="1" rx="9" ry="10.5" fill="#e0453e" />
      <ellipse cx="0" cy="1" rx="9" ry="10.5" fill="url(#lampShine)" />
      {/* 縦の筋 */}
      <path d="M0 -9 V11" stroke="#b8332c" strokeWidth="0.7" opacity="0.55" />
      <path d="M-4.6 -7 Q-6.2 1 -4.6 10" stroke="#b8332c" strokeWidth="0.6" fill="none" opacity="0.45" />
      <path d="M4.6 -7 Q6.2 1 4.6 10" stroke="#b8332c" strokeWidth="0.6" fill="none" opacity="0.45" />
      {/* 上下の金キャップ */}
      <rect x="-5" y="-11" width="10" height="3" rx="1.2" fill="#e6a817" />
      <rect x="-5" y="9" width="10" height="3" rx="1.2" fill="#e6a817" />
    </g>
  )
}

// 連なったランタンの一列（たるんだ紐＋ぶら下がる提灯）
function LanternRow({ yTop, amp, count, startX, endX, s = 1, drop = 12 }) {
  const items = []
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1)
    const x = startX + (endX - startX) * t
    const cy = yTop + 2 * amp * t * (1 - t) // 中央がたるむ
    items.push({ x, cy, d: drop + (i % 2) * 6 })
  }
  const cordD = `M${startX},${yTop} Q${(startX + endX) / 2},${yTop + 2 * amp} ${endX},${yTop}`
  return (
    <g>
      <path d={cordD} fill="none" stroke="#c9302c" strokeWidth="1.4" opacity="0.85" />
      {items.map((it, i) => (
        <g key={i}>
          <line x1={it.x} y1={it.cy} x2={it.x} y2={it.cy + it.d} stroke="#c9302c" strokeWidth="1" opacity="0.8" />
          <FestLantern x={it.x} y={it.cy + it.d + 11 * s} s={s} />
        </g>
      ))}
    </g>
  )
}

// 中華門（牌楼）：赤い柱＋翡翠色の反り屋根＋金の装飾
function BrightGate({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* 柱 */}
      {[-34, 25].map((px, i) => (
        <g key={i}>
          <rect x={px} y="-6" width="9" height="66" rx="1.5" fill="#c8352b" />
          <rect x={px} y="-6" width="9" height="66" rx="1.5" fill="url(#pillarShine)" />
        </g>
      ))}
      {/* 看板（金文字風のドット） */}
      <rect x="-22" y="-4" width="44" height="13" rx="2" fill="#a5231b" />
      {[-14, -5, 4, 13].map((cx, i) => (
        <circle key={i} cx={cx} cy="2.5" r="2.2" fill="#f4c56b" />
      ))}
      {/* 大屋根（翡翠色・反り軒） */}
      <path
        d="M-46 -6 Q-40 -16 -20 -14 L20 -14 Q40 -16 46 -6 Q34 0 20 -2 L-20 -2 Q-34 0 -46 -6 Z"
        fill="#2f7d5c"
      />
      <path d="M-46 -6 q-6 -2 -6 -11" stroke="#2f7d5c" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M46 -6 q6 -2 6 -11" stroke="#2f7d5c" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M-44 -6 Q0 -15 44 -6" fill="none" stroke="#f4c56b" strokeWidth="1.6" />
      {/* 上段の小屋根 */}
      <path d="M-18 -14 Q0 -27 18 -14 Z" fill="#2f7d5c" />
      <path d="M0 -27 v-5" stroke="#f4c56b" strokeWidth="1.6" />
      <circle cx="0" cy="-33" r="2.2" fill="#f4c56b" />
      {/* 軒下の吊り提灯 */}
      <FestLantern x="-30" y="7" s="0.8" />
      <FestLantern x="30" y="7" s="0.8" />
    </g>
  )
}

// 中華街の街並み（反り屋根の商店が並ぶシルエット）
function Rooftops({ y }) {
  return (
    <g>
      {[50, 150, 250, 350].map((cx, i) => (
        <g key={i} transform={`translate(${cx} ${y})`}>
          <rect x="-36" y="0" width="72" height="60" fill={i % 2 ? '#a8402f' : '#b84a37'} />
          {/* 窓の灯り */}
          {[-22, -6, 10, 24].map((wx, j) => (
            <rect key={j} x={wx} y="10" width="8" height="12" rx="1" fill="#f4c56b" opacity="0.75" />
          ))}
          {/* 反り屋根 */}
          <path
            d="M-44 0 Q-38 -12 -18 -10 L18 -10 Q38 -12 44 0 Q30 5 16 3 L-16 3 Q-30 5 -44 0 Z"
            fill="#7f2c22"
          />
          <path d="M-44 0 q-5 -2 -5 -8" stroke="#7f2c22" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M44 0 q5 -2 5 -8" stroke="#7f2c22" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      ))}
    </g>
  )
}

const BOKEH = [
  [40, 220, 6], [360, 260, 8], [70, 400, 5], [330, 430, 7],
  [50, 520, 6], [350, 560, 5], [200, 300, 4], [150, 620, 6],
]

export default function ChinatownScene({ className = '' }) {
  return (
    <svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="daysky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff2d6" />
          <stop offset="52%" stopColor="#ffe0b8" />
          <stop offset="100%" stopColor="#f6c39a" />
        </linearGradient>
        <radialGradient id="warmGlow" cx="50%" cy="18%" r="60%">
          <stop offset="0%" stopColor="#fff6e0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff6e0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lampShine" cx="38%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff8a7a" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#e0453e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pillarShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 空 */}
      <rect x="0" y="0" width="400" height="720" fill="url(#daysky)" />
      <rect x="0" y="0" width="400" height="720" fill="url(#warmGlow)" />

      {/* ぼかしの光（お祭りの華やぎ） */}
      {BOKEH.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#ffd98a" opacity="0.35" />
      ))}

      {/* 街並み（下部）→ 門 の順で奥から重ねる */}
      <Rooftops y={660} />
      <BrightGate x="200" y="640" s="1.7" />

      {/* 連なったランタン（上部・主役／2列） */}
      <LanternRow yTop={70} amp={26} count={6} startX={16} endX={384} s={1.15} drop={14} />
      <LanternRow yTop={128} amp={20} count={5} startX={46} endX={354} s={0.9} drop={10} />
    </svg>
  )
}
