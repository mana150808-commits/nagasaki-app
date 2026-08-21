import { useNavigate } from 'react-router-dom'

// 画面上部に置く「戻る」ボタン。常にホーム画面へ戻す。
export default function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate('/')}
      className="card-hand press inline-flex items-center gap-2 rounded-blob px-4 py-2 font-display text-lg text-navy"
    >
      <span aria-hidden="true">←</span>
      <span>Back</span>
    </button>
  )
}
