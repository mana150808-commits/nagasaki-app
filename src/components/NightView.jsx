// 長崎の夜景（世界新三大夜景）をモチーフにしたヒーローSVG。
// 湾を囲む斜面いっぱいに散らばる街の灯り、水面の反射、月、
// 教会の尖塔、浮かぶランタン（差し色）で「長崎らしさ」を強く表現する。

// 決定論的な乱数（描画のたびに同じ配置になるようシード固定）
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const LIGHT_COLORS = ['#f4c56b', '#ffd98a', '#fff2cf', '#ffb347', '#f4c56b', '#e0453e']

// 指定範囲に街灯りを散らす（下ほど大きく・密に見えるよう調整）
function makeLights(seed, count, x0, x1, y0, y1) {
  const rand = mulberry32(seed)
  const lights = []
  for (let i = 0; i < count; i++) {
    const t = rand()
    const y = y0 + (y1 - y0) * Math.pow(rand(), 0.7) // 下側に寄せる
    const x = x0 + (x1 - x0) * rand()
    const depth = (y - y0) / (y1 - y0) // 0(奥/上) → 1(手前/下)
    lights.push({
      x,
      y,
      r: 0.6 + depth * 1.3 + rand() * 0.5,
      o: 0.45 + depth * 0.55,
      c: LIGHT_COLORS[Math.floor(t * LIGHT_COLORS.length)],
      // 点灯の時間差：下（y大）から上（y小）へ順に点く（+わずかなゆらぎ）
      d: ((560 - y) / 560) * 0.9 + rand() * 0.12,
    })
  }
  return lights
}

// 各斜面に載せる灯り（clipPath で山の形に切り抜く）
const LEFT_LIGHTS = makeLights(11, 150, 2, 150, 260, 552)
const RIGHT_LIGHTS = makeLights(29, 170, 250, 398, 250, 552)
const BACK_LIGHTS = makeLights(7, 40, 120, 285, 288, 306)

function Lights({ list }) {
  return list.map((l, i) => (
    <circle
      key={i}
      cx={l.x}
      cy={l.y}
      r={l.r}
      fill={l.c}
      opacity={l.o}
      className="lit"
      style={{ '--lit-o': l.o, animationDelay: `${l.d}s` }}
    />
  ))
}

// 浮かぶランタン（差し色の朱）
function Lantern({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="6" rx="8" ry="3" fill="#e0453e" opacity="0.25" />
      <rect x="-7" y="-9" width="14" height="18" rx="7" fill="#e0453e" />
      <rect x="-7" y="-9" width="14" height="18" rx="7" fill="url(#lanternGlow)" />
      <rect x="-4" y="-12" width="8" height="3" rx="1.5" fill="#f4c56b" />
      <rect x="-4" y="9" width="8" height="3" rx="1.5" fill="#f4c56b" />
      <line x1="0" y1="-16" x2="0" y2="-12" stroke="#f4c56b" strokeWidth="1" />
    </g>
  )
}

// 大浦天主堂をイメージした教会のシルエット（夜色＋窓明かり）
function OuraChurch({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* 身廊（本体） */}
      <path d="M-16 40 L-16 6 Q-16 2 -12 2 L12 2 Q16 2 16 6 L16 40 Z" fill="#0a1626" />
      {/* 中央の塔 */}
      <rect x="-7" y="-14" width="14" height="20" fill="#0a1626" />
      {/* 尖塔 */}
      <path d="M-7 -14 L0 -34 L7 -14 Z" fill="#0a1626" />
      {/* 十字架 */}
      <rect x="-0.8" y="-45" width="1.6" height="11" fill="#0a1626" />
      <rect x="-3" y="-42" width="6" height="1.6" fill="#0a1626" />
      {/* バラ窓 */}
      <circle cx="0" cy="-4" r="3" fill="#f4c56b" opacity="0.6" />
      {/* 灯りの入った窓 */}
      {[-12, -1.5, 9].map((wx, i) => (
        <rect key={i} x={wx} y="16" width="3" height="7" rx="1.5" fill="#f4c56b" opacity="0.5" />
      ))}
    </g>
  )
}

// 長崎新地中華街の牌楼（門）をイメージしたシルエット（朱＋金の灯り）
function ChinatownGate({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* 柱 */}
      <rect x="-26" y="-2" width="7" height="46" fill="#4a1512" />
      <rect x="19" y="-2" width="7" height="46" fill="#4a1512" />
      {/* 下の梁 */}
      <rect x="-31" y="9" width="62" height="6" fill="#3a1010" />
      {/* 看板（朱） */}
      <rect x="-15" y="0" width="30" height="8" rx="1" fill="#6f1e18" />
      <rect x="-15" y="0" width="30" height="8" rx="1" fill="url(#lanternGlow)" opacity="0.45" />
      {/* 大屋根（反り返った軒） */}
      <path
        d="M-40 -2 Q-36 -9 -20 -8 L20 -8 Q36 -9 40 -2 Q30 3 18 1.5 L-18 1.5 Q-30 3 -40 -2 Z"
        fill="#241013"
      />
      {/* 反り返る両端 */}
      <path d="M-40 -2 q-5 -3 -3 -9" stroke="#241013" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 -2 q5 -3 3 -9" stroke="#241013" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* 上段の小屋根 */}
      <path d="M-15 -8 Q0 -19 15 -8 Z" fill="#241013" />
      <path d="M0 -19 v-4" stroke="#f4c56b" strokeOpacity="0.5" strokeWidth="1" />
      {/* 棟のゴールドライン */}
      <path d="M-38 -2 Q0 -9 38 -2" fill="none" stroke="#f4c56b" strokeOpacity="0.5" strokeWidth="1" />
      {/* 吊り提灯（朱＋光） */}
      {[-22, 22].map((lx, i) => (
        <g key={i}>
          <circle cx={lx} cy="16" r="5.5" fill="url(#lanternGlow)" />
          <ellipse cx={lx} cy="16" rx="3" ry="4" fill="#e0453e" />
          <rect x={lx - 1.5} y="11" width="3" height="1.6" fill="#f4c56b" />
        </g>
      ))}
    </g>
  )
}

export default function NightView({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 560"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050d1f" />
          <stop offset="45%" stopColor="#0c1b35" />
          <stop offset="72%" stopColor="#1a2547" />
          <stop offset="100%" stopColor="#3a2a4a" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fdf6e3" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#fdf6e3" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#fdf6e3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#132a44" />
          <stop offset="100%" stopColor="#081428" />
        </linearGradient>
        <radialGradient id="lanternGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e0453e" stopOpacity="0" />
        </radialGradient>

        {/* 山の形に灯りを切り抜くクリップ */}
        <clipPath id="clipLeft">
          <path d="M0,560 L0,268 C40,240 92,250 132,292 C152,332 150,470 150,560 Z" />
        </clipPath>
        <clipPath id="clipRight">
          <path d="M400,560 L400,258 C360,232 312,246 268,292 C248,332 250,470 250,560 Z" />
        </clipPath>
        <clipPath id="clipBack">
          <path d="M118,306 C155,288 178,285 200,287 C228,290 258,296 286,306 L286,320 L118,320 Z" />
        </clipPath>
      </defs>

      {/* 空 */}
      <rect x="0" y="0" width="400" height="560" fill="url(#sky)" />

      {/* 星 */}
      {makeLights(99, 40, 10, 390, 10, 250).map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r * 0.5}
          fill="#ffffff"
          opacity={s.o * 0.7}
          className="lit"
          style={{ '--lit-o': s.o * 0.7, animationDelay: `${s.d}s` }}
        />
      ))}

      {/* 月（上部なので最後の方に点灯） */}
      <g className="lit" style={{ animationDelay: '0.85s' }}>
        <circle cx="292" cy="92" r="46" fill="url(#moonGlow)" />
        <circle cx="292" cy="92" r="20" fill="#fdf6e3" />
        <circle cx="300" cy="86" r="20" fill="#0c1b35" opacity="0.55" />
      </g>

      {/* 浮かぶランタン（下にあるものから点灯） */}
      <g className="lit" style={{ animationDelay: '0.5s' }}>
        <Lantern x="52" y="210" s="0.6" />
      </g>
      <g className="lit" style={{ animationDelay: '0.62s' }}>
        <Lantern x="72" y="150" s="1.1" />
      </g>
      <g className="lit" style={{ animationDelay: '0.7s' }}>
        <Lantern x="126" y="112" s="0.8" />
      </g>

      {/* 奥のなだらかな稜線 */}
      <path
        d="M118,306 C155,288 178,285 200,287 C228,290 258,296 286,306 L286,320 L118,320 Z"
        fill="#16264a"
      />
      <g clipPath="url(#clipBack)">
        <Lights list={BACK_LIGHTS} />
      </g>

      {/* 湾（水面） */}
      <path
        d="M186,300 C170,380 152,470 150,560 L250,560 C248,470 230,380 214,300 C205,296 195,296 186,300 Z"
        fill="url(#water)"
      />
      {/* 水面の光の反射 */}
      <g className="lit" style={{ animationDelay: '0.3s' }}>
        {[172, 185, 200, 215, 228].map((x, i) => (
          <rect
            key={i}
            x={x}
            y={308 + i * 4}
            width="2.4"
            height={70 + (i % 3) * 40}
            rx="1.2"
            fill={i % 2 ? '#f4c56b' : '#ffd98a'}
            opacity="0.25"
          />
        ))}
      </g>

      {/* 左の斜面＋街灯り */}
      <path d="M0,560 L0,268 C40,240 92,250 132,292 C152,332 150,470 150,560 Z" fill="#0f2038" />
      <g clipPath="url(#clipLeft)">
        <Lights list={LEFT_LIGHTS} />
      </g>

      {/* 右の斜面＋街灯り */}
      <path d="M400,560 L400,258 C360,232 312,246 268,292 C248,332 250,470 250,560 Z" fill="#0c1c33" />
      <g clipPath="url(#clipRight)">
        <Lights list={RIGHT_LIGHTS} />
      </g>

      {/* 大浦天主堂（右の丘の稜線＝上部なので遅めに点灯） */}
      <g className="lit" style={{ animationDelay: '0.6s' }}>
        <OuraChurch x="322" y="250" s="0.95" />
      </g>

      {/* 港のクレーン（水辺＝下部なので早めに点灯） */}
      <g
        stroke="#050d1f"
        strokeWidth="2"
        fill="none"
        opacity="0.9"
        className="lit"
        style={{ '--lit-o': 0.9, animationDelay: '0.15s' }}
      >
        <path d="M150,470 v-34 h40" />
        <path d="M156,436 l-6,-8" />
        <path d="M250,470 v-40 h-34" />
      </g>

      {/* 中華街の牌楼（ホーム下側の前景＝早めに点灯） */}
      <g className="lit" style={{ animationDelay: '0.2s' }}>
        <ChinatownGate x="92" y="470" s="1.5" />
      </g>
    </svg>
  )
}
