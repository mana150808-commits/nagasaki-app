import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MapPage from './pages/MapPage.jsx'
import SurveyPage from './pages/SurveyPage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import AdminResults from './pages/AdminResults.jsx'
import { markNavigated } from './introState.js'

// スマホ画面を想定した縦長レイアウト。max-width で中央寄せし、
// PCブラウザで開いても破綻しないようにしている。
export default function App() {
  // 最初に表示されたルートから別ルートへ動いたら「遷移した」と記録する。
  // → 以降はホームの導入アニメを再生しない（起動時のみ再生）。
  const location = useLocation()
  const initialPath = useRef(location.pathname)
  useEffect(() => {
    if (location.pathname !== initialPath.current) markNavigated()
  }, [location])

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        {/* お店の詳細ページ（データ駆動：/shop/<id>）。店舗追加は data/shops.js に足すだけ。 */}
        <Route path="/shop/:shopId" element={<ShopPage />} />
        {/* 料理の詳細ページ（/shop/<id>/menu/<menuId>）。 */}
        <Route path="/shop/:shopId/menu/:menuId" element={<MenuPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        {/*
          開発者専用の隠しルート。
          ホーム等のUIからは一切リンクを張らず、URLを知っている人だけがアクセスできる。
        */}
        <Route path="/admin-results" element={<AdminResults />} />
      </Routes>
    </div>
  )
}
