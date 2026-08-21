import BackButton from '../components/BackButton.jsx'
import SurveyForm from '../components/SurveyForm.jsx'
import ChinatownScene from '../components/ChinatownScene.jsx'

// Feedback（アンケート）画面。
// ホームの暗い夜景とは対照的に、明るい中華街＆ランタン祭りの背景を敷く。
export default function SurveyPage() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* 背景：明るい中華街シーン */}
      <ChinatownScene className="absolute inset-0 h-full w-full" />
      {/* フォームを読みやすくする淡いオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/40" />

      {/* コンテンツ */}
      <div className="relative z-10 flex min-h-dvh flex-col px-5 pb-10 pt-6">
        <div className="mb-4">
          <BackButton />
        </div>

        <header className="mb-4 text-center">
          <h1 className="font-display text-3xl uppercase tracking-wide text-vermilion drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">
            Feedback
          </h1>
          <p className="text-sm font-medium text-ink/70">Rate this app</p>
        </header>

        <div className="my-auto">
          <SurveyForm />
        </div>
      </div>
    </main>
  )
}
