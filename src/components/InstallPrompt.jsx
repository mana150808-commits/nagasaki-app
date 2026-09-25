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
  // iOSは自分で操作してもらうので、手順を短く示す
  iosStep: {
    en: 'Tap the Share button, then "Add to Home Screen".',
    zhCN: '点按「分享」按钮，然后选择「添加到主屏幕」。',
    zhTW: '點一下「分享」按鈕，然後選擇「加入主畫面」。',
    ko: '공유 버튼을 누른 뒤 "홈 화면에 추가"를 선택하세요.',
    ja: '共有ボタンを押して「ホーム画面に追加」を選びます。',
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
      <div className="w-full max-w-sm rounded-2xl bg-paper/95 p-4 text-navy shadow-hand backdrop-blur">
        <p className="font-display text-lg leading-tight">{pick(TEXT.title, lang)}</p>
        <p className="mt-1 text-sm text-ink/80">{pick(TEXT.body, lang)}</p>

        {deferred ? (
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={install}
              className="press flex-1 rounded-full bg-vermilion px-4 py-2 font-hand text-sm font-bold text-white shadow-hand"
            >
              {pick(TEXT.install, lang)}
            </button>
            <button
              type="button"
              onClick={close}
              className="press rounded-full px-3 py-2 font-hand text-sm text-navy/60"
            >
              {pick(TEXT.close, lang)}
            </button>
          </div>
        ) : (
          <div className="mt-3">
            <p className="flex items-center gap-1.5 text-sm text-ink/90">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-navy shadow-hand">
                <ShareIcon />
              </span>
              {pick(TEXT.iosStep, lang)}
            </p>
            <button
              type="button"
              onClick={close}
              className="press mt-2 w-full rounded-full px-3 py-2 font-hand text-sm text-navy/60"
            >
              {pick(TEXT.close, lang)}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
