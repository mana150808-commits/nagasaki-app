/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // 長崎の海・空・異国情緒をイメージした配色（旧デザイン。Survey/AdminResults等、
      // 今回の「Walk Rings」リデザイン対象外の画面はまだこちらを使っている）
      colors: {
        navy: '#1f3a5f',      // 長崎の海の藍
        night: '#0a1830',     // 夜景の空（濃紺）
        night2: '#122341',    // 夜景の山の陰
        gold: '#f4c56b',      // 夜景の街灯・窓明かり
        terracotta: '#c96f4a',
        cream: '#f4ecd8',
        vermilion: '#e0453e', // ランタン・差し色の朱
        pine: '#3f7d5c',
        ink: '#20242b',       // 本文の文字色

        // "Organic" デザインシステム（Walk Rings リデザイン用）。
        // Nagasaki Eats Walk Rings 仕様書のトークンをそのまま移植。
        bg: '#f5ead8',
        surface: '#ebddc5',
        text: '#201e1d',
        accent: {
          DEFAULT: '#c67139',
          100: '#fff2eb', 200: '#ffe1d0', 300: '#ffc6a5', 400: '#f6a06b',
          500: '#d67f48', 600: '#b2622d', 700: '#8c491a', 800: '#643312', 900: '#402310',
        },
        'accent-2': {
          DEFAULT: '#7a8a5e',
          100: '#f0fae1', 200: '#e1eecc', 300: '#ccdbb2', 400: '#aebf92',
          500: '#8fa073', 600: '#728157', 700: '#56633f', 800: '#3d472b', 900: '#272e1b',
        },
        neutral: {
          100: '#f9f4ed', 200: '#eee7db', 300: '#dcd3c4', 400: '#c0b6a5',
          500: '#a19786', 600: '#82796a', 700: '#645c50', 800: '#474238', 900: '#2e2b25',
        },
      },
      fontFamily: {
        // インパクト重視のタイトル(Anton)＋読みやすい本文(Poppins) — 旧デザイン用
        display: ['"Anton"', 'Impact', 'system-ui', 'sans-serif'],
        hand: ['"Poppins"', 'system-ui', 'sans-serif'],
        // Organicデザインシステム用（Walk Rings）
        heading: ['"Caprasimo"', 'serif'],
        body: ['"Figtree"', 'system-ui', 'sans-serif'],
        jp: ['"Zen Maru Gothic"', '"Figtree"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        blob: '16px',
        blob2: '22px',
        'radius-sm': '8px',
        'radius-md': '16px',
        'radius-lg': '28px',
      },
      boxShadow: {
        hand: '0 6px 18px rgba(10,24,48,0.12)',
        handlg: '0 14px 40px rgba(10,24,48,0.25)',
        glow: '0 0 28px rgba(244,197,107,0.45)',
        // Organicデザインシステム用（Walk Rings）
        'organic-sm': '0 1px 2px rgba(46,43,37,.14)',
        'organic-md': '0 3px 10px rgba(46,43,37,.16)',
        'organic-lg': '0 12px 32px rgba(46,43,37,.22)',
      },
    },
  },
  plugins: [],
}
