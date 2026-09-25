import { useEffect, useState } from 'react'
import { useLanguage } from '../LanguageContext.jsx'

// 「ホーム画面に追加」の案内。
//
// ホテルではQRコードから開いてもらうため、そのままブラウザで見て終わる人が多い。
// アイコンから全画面で起動できることを知らせ、アプリとして残してもらうのが目的。
//
// 端末による違い：
//  ・Android/PCのChrome系 … beforeinstallprompt を受け取れるので、ボタン1つでインストールできる。
//  ・iPhone/iPad の Safari … 自動の案内もAPIも無いため、「共有 → ホーム画面に追加」を図で説明する。
//
// 出さない条件：すでにホーム画面から起動している／一度閉じられた（localStorageに記録）。

const DISMISS_KEY = 'nagasaki_install_dismissed'

const TEXT = {
  title: {
    en: 'Add to Home Screen',
    zhCN: '添加到主屏幕',
    zhTW: '加入主畫面',
    ko: '홈 화면에 추가',
    ja: 'ホーム画面に追加',
  },
  body: {
    en: 'Keep this guide on your phone and open it like an app.',
    zhCN: '把这份指南留在手机上，像应用一样打开。',
    zhTW: '把這份指南留在手機上，像應用程式一樣開啟。',
    ko: '이 가이드를 휴대폰에 저장하고 앱처럼 열어 보세요.',
    ja: 'このガイドをスマホに残して、アプリのように開けます。',
  },
  install: {
    en: 'Install',
    zhCN: '安装',
    zhTW: '安裝',
    ko: '설치',
    ja: 'インストール',
  },
  // iOSはブラウザ側にインストール機能が無く、必ず自分で操作してもらう必要がある。
  // 「押せるボタンが無い」と誤解されないよう、手動である旨を見出しで明示し、
  // 3ステップに分けて示す。
  iosLead: {
    en: 'Add it yourself — 3 steps',
    zhCN: '请手动添加 — 3 个步骤',
    zhTW: '請手動加入 — 3 個步驟',
    ko: '직접 추가하세요 — 3단계',
    ja: '手動で追加します（3ステップ）',
  },
  iosStep1: {
    en: 'Tap the Share button at the bottom of the screen',
    zhCN: '点按屏幕下方的「分享」按钮',
    zhTW: '點一下螢幕下方的「分享」按鈕',
    ko: '화면 아래의 공유 버튼을 누르세요',
    ja: '画面下の共有ボタンを押す',
  },
  iosStep2: {
    en: 'Scroll down and choose "Add to Home Screen"',
    zhCN: '向下滑动，选择「添加到主屏幕」',
    zhTW: '向下捲動，選擇「加入主畫面」',
    ko: '아래로 스크롤해 "홈 화면에 추가"를 선택',
    ja: '下にスクロールして「ホーム画面に追加」を選ぶ',
  },
  iosStep3: {
    en: 'Tap "Add" in the top right',
    zhCN: '点按右上角的「添加」',
    zhTW: '點右上角的「加入」',
    ko: '오른쪽 위의 "추가"를 누르세요',
    ja: '右上の「追加」を押す',
  },
  close: {
    en: 'Not now',
    zhCN: '以后再说',
    zhTW: '稍後再說',
    ko: '나중에',
    ja: 'あとで',
  },
}

function pick(dict, lang) {
  return dict[lang] || dict.en
}

// iOSの共有ボタン（四角に上向き矢印）。手順を文章だけで説明しても伝わりにくいため添える。
function ShareIcon({ size = 16 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m8 7 4-4 4 4" />
      <path d="M6 12H5v8h14v-8h-1" />
    </svg>
  )
}

function isStandalone() {
  try {
    return (
      window.matchMedia?.('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    )
  } catch {
    return false
  }
}

function isIos() {
  const ua = window.navigator.userAgent
  // iPadOSはMacintoshを名乗るため、タッチ有無で判別する
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
}

export default function InstallPrompt() {
  const { lang } = useLanguage()
  const [deferred, setDeferred] = useState(null) // Chrome系のインストール要求
  const [showIos, setShowIos] = useState(false)
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (dismissed || isStandalone()) return

    // Chrome系：インストールできる状態になるとイベントが飛んでくる。
    // 既定のミニ案内は preventDefault で止め、こちらのカードから promptを出す。
    const onBeforeInstall = (e) => {
      e.preventDefault()
      setDeferred(e)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    // インストール済みになったら以後は出さない
    const onInstalled = () => setDismissed(true)
    window.addEventListener('appinstalled', onInstalled)

    // iOSはイベントが無いので、少し待ってから手順を出す（読み込み直後に被せない）
    let timer
    if (isIos()) timer = setTimeout(() => setShowIos(true), 3000)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
      clearTimeout(timer)
    }
  }, [dismissed])

  const close = () => {
    setDismissed(true)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // localStorageが使えない環境でも動作は継続する
    }
  }

  const install = async () => {
    if (!deferred) return
    deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
    close()
  }

  if (dismissed || (!deferred && !showIos)) return null

  return (
    <div className="pointer-events-auto fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4">
      {/* 夜景の上に重なるため、背景は半透明にせず読みやすさを優先する */}
      <div className="w-full max-w-sm rounded-2xl bg-cream p-5 text-navy shadow-handlg ring-1 ring-navy/10">
        <p className="font-display text-xl leading-tight">{pick(TEXT.title, lang)}</p>
        <p className="mt-1.5 text-[15px] leading-relaxed text-navy/80">{pick(TEXT.body, lang)}</p>

        {deferred ? (
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={install}
              className="press flex-1 rounded-full bg-vermilion px-4 py-3 font-hand text-base font-bold text-white shadow-hand"
            >
              {pick(TEXT.install, lang)}
            </button>
            <button
              type="button"
              onClick={close}
              className="press rounded-full px-3 py-3 font-hand text-[15px] text-navy/70"
            >
              {pick(TEXT.close, lang)}
            </button>
          </div>
        ) : (
          <div className="mt-4">
            {/* 押せるボタンが無く、自分で操作する必要があることを最初に伝える */}
            <p className="font-hand text-[15px] font-bold text-vermilion">
              {pick(TEXT.iosLead, lang)}
            </p>

            <ol className="mt-2.5 space-y-2.5">
              {[TEXT.iosStep1, TEXT.iosStep2, TEXT.iosStep3].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy font-hand text-[13px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="flex items-center gap-1.5 text-[15px] leading-snug text-navy">
                    {step === TEXT.iosStep1 && (
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-navy ring-1 ring-navy/15">
                        <ShareIcon size={15} />
                      </span>
                    )}
                    {pick(step, lang)}
                  </span>
                </li>
              ))}
            </ol>

            {/* 共有ボタンは画面下にあるので、その方向を指し示す */}
            <p className="mt-2 text-center text-lg leading-none text-vermilion" aria-hidden="true">
              ↓
            </p>

            <button
              type="button"
              onClick={close}
              className="press mt-1 w-full rounded-full px-3 py-2.5 font-hand text-[15px] text-navy/70"
            >
              {pick(TEXT.close, lang)}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
