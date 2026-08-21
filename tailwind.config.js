/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // 長崎の海・空・異国情緒をイメージした配色
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
      },
      fontFamily: {
        // インパクト重視のタイトル(Anton)＋読みやすい本文(Poppins)
        display: ['"Anton"', 'Impact', 'system-ui', 'sans-serif'],
        hand: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        blob: '16px',
        blob2: '22px',
      },
      boxShadow: {
        hand: '0 6px 18px rgba(10,24,48,0.12)',
        handlg: '0 14px 40px rgba(10,24,48,0.25)',
        glow: '0 0 28px rgba(244,197,107,0.45)',
      },
    },
  },
  plugins: [],
}
