// 店舗データの一元管理。
// 新しいお店を追加するには、この配列に1オブジェクト足すだけ（30店以上でもOK）。
// 任意で public/shops/<id>/ に写真(jpg)を置けば、プレースホルダーから自動で差し替わる。
//
// ▼ マップについて：
//   MapView は実地図（MapLibre GL）で、ピンの位置は geo.lat/geo.lng を使う。
//   店舗ページ(ShopPage)は一切変更不要。
//   geo.lat/lng は address の住所を国土地理院の住所検索APIで番地レベルに変換した値。
//   店舗を追加したら、同じように住所から座標を取って入れること（概算値は使わない）。
//
// ▼ 住所・営業時間について：
//   address（日本語の住所）と hours（曜日ごとの営業時間）は店舗ページに表示する。
//   hours は日〜土をキーに持ち、値は時間帯の配列、定休日は null。
//   深夜までの営業は「19:00–03:00」のように翌日の時刻で書く。
//   ⚠️ 営業時間は変わりやすいため、定期的に店舗へ確認すること。
//
// ▼ 多言語対応について：
//   description（店舗の説明）と menu[].description（料理の説明）は
//   { en, ja, zhCN, zhTW, ko } の多言語オブジェクトになっている。
//   表示側は LanguageContext.jsx の pickText(value, lang) を通して参照し、
//   訳が無い言語ではenにフォールバックする。
//   店名（nameI18n）・エリア名（areaI18n）・メニュー品目名（menu[].nameI18n）も
//   同様に { en, ja, zhCN, zhTW, ko } を持つ（表示側は `obj?.[lang] || obj.en` で参照）。
//   category は CATEGORY_LABEL（walkRingsText.js）で表示側が変換する。
//   住所（address）だけは日本語のまま（タクシーや店員に見せて使うため意図的に翻訳しない）。
//   ⚠️ 説明文・店名・エリア名・メニュー品目名の翻訳はAIによる下訳です。実在店の情報として
//      公開する前に、各言語のネイティブ話者による確認・校正を強く推奨します。

export const shops = [
  {
    id: 'asa',
    name: 'ASA Kisaburo',
    nameJa: '亜紗　喜三郎',
    nameI18n: { en: 'ASA Kisaburo', zhCN: '亚纱 喜三郎', zhTW: '亞紗 喜三郎', ko: '아사 기사부로', ja: '亜紗 喜三郎' },
    heroDish: { name: { en: 'Hatoshi (shrimp toast)', zhCN: '虾多士', zhTW: '蝦多士', ko: '하토시 (새우 토스트)', ja: 'ハトシ' }, price: '¥680', image: 'exterior.jpg' },
    category: 'Izakaya',
    area: 'Dōza-machi, Nagasaki',
    areaJa: '長崎市銅座町',
    areaI18n: { en: 'Dōza-machi, Nagasaki', zhCN: '长崎铜座町', zhTW: '長崎銅座町', ko: '나가사키 도자마치', ja: '長崎市銅座町' },

    // 現・仮マップ用の位置（%座標）
    map: { x: 56, y: 42 },
    geo: { lat: 32.74271, lng: 129.877197 },
    address: '〒850-0841 長崎県長崎市銅座町7-9 1F',
    hours: {
      sun: ['17:00–24:00'],
      mon: ['17:00–24:00'],
      tue: ['17:00–24:00'],
      wed: ['17:00–24:00'],
      thu: ['17:00–24:00'],
      fri: ['17:00–24:00'],
      sat: ['17:00–24:00'],
    },

    // 画像フォルダ規約： public/shops/<id>/ に置く
    photoBase: '/shops/asa',
    exterior: 'exterior.jpg',

    // ※ 亜紗は実在店のため、以下は差し替え前提の一般的なサンプル文。
    description: {
      en:
        'Robata Asa Kisaburo is operated by the "Asa Group," a highly popular ' +
        'seafood izakaya chain in Nagasaki City. Located in the Doza entertainment ' +
        'district, the restaurant offers fresh, seasonal sashimi landed at local ' +
        'Nagasaki ports, as well as seafood and vegetables grilled to aromatic ' +
        'perfection over a robata (open hearth). With its refined Japanese-style ' +
        'atmosphere and warm hospitality, it is a beloved establishment cherished ' +
        'not only by locals for banquets and business entertaining but also by ' +
        'tourists eager to savor Nagasaki’s local sake and seasonal flavors.',
      ja:
        '炉端 亜紗 喜三郎は、長崎市内で人気の海鮮居酒屋チェーン「亜紗グループ」が営む' +
        '店です。銅座の歓楽街に位置し、長崎の地元港で水揚げされた新鮮な旬の刺身はもちろん、' +
        '炉端（囲炉裏）で香ばしく焼き上げた魚介や野菜も楽しめます。上品な和の雰囲気と' +
        'あたたかいおもてなしで、宴会や接待で地元の人々に愛されるだけでなく、長崎の地酒や' +
        '旬の味覚を求める観光客からも親しまれています。',
      zhCN:
        '炉端亚纱喜三郎由长崎市内广受欢迎的海鲜居酒屋连锁「亚纱集团」经营。餐厅位于铜座' +
        '娱乐街区，供应长崎当地港口捕获的新鲜时令生鱼片，还能品尝到在炉端（地炉）上烤得' +
        '香气四溢的海鲜和蔬菜。店内拥有典雅的日式氛围和热情的待客之道，不仅深受当地人喜爱、' +
        '常用于宴会和商务招待，也吸引着许多渴望品尝长崎地酒与时令风味的游客。',
      zhTW:
        '爐端亞紗喜三郎由長崎市內廣受歡迎的海鮮居酒屋連鎖「亞紗集團」經營。餐廳位於銅座' +
        '娛樂街區，供應長崎當地港口捕獲的新鮮時令生魚片，還能品嚐到在爐端（地爐）上烤得' +
        '香氣四溢的海鮮和蔬菜。店內擁有典雅的日式氛圍與熱情的待客之道，不僅深受當地人喜愛、' +
        '常用於宴會和商務招待，也吸引許多渴望品嚐長崎地酒與時令風味的遊客。',
      ko:
        '로바타 아사 키사부로는 나가사키시에서 인기 있는 해산물 이자카야 체인 ' +
        "'아사 그룹'이 운영하는 가게입니다. 도자 유흥가에 위치해 있으며, 나가사키 현지 " +
        '항구에서 갓 잡은 신선한 제철 사시미는 물론, 로바타(화로)에서 향긋하게 구운 해산물과 ' +
        '채소도 즐길 수 있습니다. 세련된 일본풍 분위기와 따뜻한 환대로 연회나 접대를 위해 ' +
        '찾는 현지인뿐 아니라, 나가사키의 지역 사케와 제철 맛을 즐기려는 관광객들에게도 ' +
        '사랑받고 있습니다.',
    },

    // 代表的なメニュー（写真3〜5枚）。
    // 各項目に id を付けると /shop/<shopId>/menu/<id> の詳細ページになる。
    // nameJa / romaji / price / description は任意（無ければ詳細ページで非表示）。
    // ※ 価格・説明は実データ不明のため差し替え前提のサンプル。
    menu: [
      {
        id: 'sashimi',
        name: 'Assorted sashimi platter',
        nameJa: '刺身盛り合わせ',
        nameI18n: { en: 'Assorted sashimi platter', zhCN: '什锦生鱼片拼盘', zhTW: '什錦生魚片拼盤', ko: '모둠 사시미', ja: '刺身盛り合わせ' },
        romaji: 'Sashimi moriawase',
        price: 'Approx. ¥1,600 – ¥2,000',
        img: 'menu1.jpg',
        description: {
          en:
            'A vibrant selection of locally caught, seasonal raw fish served at ' +
            'peak freshness. Nagasaki is renowned for its rich waters, making this ' +
            "platter the absolute best way to experience the region's finest seafood.",
          ja:
            '地元で獲れた旬の魚を、最高の鮮度でカラフルに盛り合わせました。豊かな漁場で' +
            '知られる長崎ならではの、極上の海の幸を味わうのに一番の一皿です。',
          zhCN:
            '精选当地捕获的时令鲜鱼，以最佳新鲜度缤纷呈现。长崎以丰饶的渔场闻名，' +
            '这道拼盘是体验当地极致海鲜的最佳方式。',
          zhTW:
            '精選當地捕獲的時令鮮魚，以最佳新鮮度繽紛呈現。長崎以豐饒的漁場聞名，' +
            '這道拼盤是體驗當地極致海鮮的最佳方式。',
          ko:
            '현지에서 잡은 제철 생선을 최상의 신선도로 화려하게 담아냈습니다. ' +
            '풍요로운 어장으로 유명한 나가사키에서 최고의 해산물을 맛볼 수 있는 최고의 ' +
            '한 접시입니다.',
        },
      },
      {
        id: 'turban-shell',
        name: 'Grilled Turban Shell',
        nameJa: 'さざえの壺焼き',
        nameI18n: { en: 'Grilled Turban Shell', zhCN: '烤海螺', zhTW: '烤海螺', ko: '소라 구이', ja: 'さざえの壺焼き' },
        romaji: 'Sazae no tsuboyaki',
        price: '¥1,180',
        img: 'menu2.jpg',
        description: {
          en:
            'Fresh turban shell snail grilled right in its shell over an open flame ' +
            'with soy sauce and dashi broth. It offers a chewy texture and a rich, ' +
            'savory ocean flavor.',
          ja:
            '新鮮なサザエを殻ごと直火で焼き上げ、醤油とだしで味付けした一品。コリコリとした' +
            '食感と、濃厚で旨味豊かな磯の風味が楽しめます。',
          zhCN: '新鲜的蠑螺连壳直接用明火烤制，以酱油和高汤调味。口感弹牙有嚼劲，海洋鲜味浓郁醇厚。',
          zhTW: '新鮮的蠑螺連殼直接用明火烤製，以醬油和高湯調味。口感彈牙有嚼勁，海洋鮮味濃郁醇厚。',
          ko:
            '신선한 소라를 껍질째 직화로 구워 간장과 육수로 맛을 낸 요리입니다. 쫄깃한 ' +
            '식감과 진하고 감칠맛 나는 바다 향을 즐길 수 있습니다.',
        },
      },
      {
        id: 'wagyu-steak',
        name: 'Wagyu Steak',
        nameJa: '和牛ステーキ',
        nameI18n: { en: 'Wagyu Steak', zhCN: '和牛牛排', zhTW: '和牛牛排', ko: '와규 스테이크', ja: '和牛ステーキ' },
        romaji: 'Wagyū sutēki',
        price: '¥1,700',
        img: 'menu3.jpg',
        description: {
          en:
            'Tender, beautifully marbled Japanese Wagyu beef seared to perfection. ' +
            'Juicy and melt-in-your-mouth tender, it is served with savory local ' +
            'seasonings to highlight the natural richness of the meat.',
          ja:
            '美しい霜降りの和牛を絶妙に焼き上げたステーキ。ジューシーで口の中でとろけるような' +
            '柔らかさを、地元の調味料でお肉本来の旨味を引き立てて味わえます。',
          zhCN:
            '油花分布均匀的日本和牛，煎烤火候恰到好处。多汁软嫩、入口即化，搭配当地调味料，' +
            '衬托出牛肉天然的浓郁风味。',
          zhTW:
            '油花分布均勻的日本和牛，煎烤火候恰到好處。多汁軟嫩、入口即化，搭配當地調味料，' +
            '襯托出牛肉天然的濃郁風味。',
          ko:
            '아름다운 마블링의 일본 와규를 절묘하게 구워낸 스테이크입니다. 육즙이 풍부하고 ' +
            '입안에서 녹아내리는 부드러움을, 현지 조미료로 고기 본연의 풍미를 살려 즐길 수 ' +
            '있습니다.',
        },
      },
      {
        id: 'hatoshi',
        name: 'Hatoshi',
        nameJa: 'ハトシ',
        nameI18n: { en: 'Hatoshi', zhCN: '虾多士', zhTW: '蝦多士', ko: '하토시 (새우 토스트)', ja: 'ハトシ' },
        romaji: 'Hatoshi',
        price: '¥680',
        img: 'menu4.jpg',
        description: {
          en:
            'A classic Nagasaki specialty featuring a savory minced shrimp paste ' +
            'sandwiched between thin slices of white bread and fried until crispy ' +
            'and golden brown. Crunchy on the outside and tender on the inside.',
          ja:
            '長崎の伝統的な名物料理。薄切りの食パンでエビのすり身を挟み、きつね色にカリッと' +
            '揚げた一品。外はサクサク、中はふんわりとした食感が楽しめます。',
          zhCN: '长崎经典名菜，将鲜香的虾泥夹在薄片白吐司中，炸至金黄酥脆。外酥内嫩，口感丰富。',
          zhTW: '長崎經典名菜，將鮮香的蝦泥夾在薄片白吐司中，炸至金黃酥脆。外酥內嫩，口感豐富。',
          ko:
            '나가사키의 전통 명물 요리로, 얇게 썬 식빵 사이에 감칠맛 나는 새우 다짐육을 넣고 ' +
            '노릇하고 바삭하게 튀긴 요리입니다. 겉은 바삭하고 속은 촉촉합니다.',
        },
      },
    ],
  },

  {
    id: 'irish-pub',
    name: 'Irish Pub Nagasaki',
    nameJa: '',
    nameI18n: { en: 'Irish Pub Nagasaki', zhCN: '长崎爱尔兰酒吧', zhTW: '長崎愛爾蘭酒吧', ko: '아이리시 펍 나가사키', ja: 'アイリッシュパブ長崎' },
    heroDish: { name: { en: 'Guinness Draught', zhCN: '健力士生啤', zhTW: '健力士生啤', ko: '기네스 생맥주', ja: 'ギネス生' }, price: '¥1,320', image: 'exterior.jpg' },
    category: 'Bar',
    area: 'Near Nagasaki Station',
    areaJa: '長崎駅周辺',
    areaI18n: { en: 'Near Nagasaki Station', zhCN: '长崎站附近', zhTW: '長崎站附近', ko: '나가사키역 근처', ja: '長崎駅周辺' },

    // 現・仮マップ用の位置（%座標）※長崎駅寄り（港側）に配置
    map: { x: 16, y: 20 },
    geo: { lat: 32.753357, lng: 129.871506 },
    address: '〒850-0057 長崎県長崎市大黒町2-1',
    hours: {
      sun: ['17:00–01:00'],
      mon: ['15:30–01:00'],
      tue: ['15:30–01:00'],
      wed: ['15:30–01:00'],
      thu: ['15:30–01:00'],
      fri: ['15:30–01:00'],
      sat: ['15:30–01:00'],
    },

    photoBase: '/shops/irish-pub',
    exterior: 'exterior.jpg',

    description: {
      en:
        'Irish Pub Nagasaki is a welcoming and vibrant British/Irish-style pub ' +
        'located right near Nagasaki Station. Known for its casual atmosphere, ' +
        'friendly staff, and English-friendly environment, it is a top gathering ' +
        'spot for international travelers and locals alike. Whether you want to ' +
        'enjoy a cold pint of Guinness, watch sports, or socialize with fellow ' +
        'travelers, this pub offers an easygoing, pay-as-you-go setup that makes ' +
        'everyone feel at home.',
      ja:
        'アイリッシュパブ長崎は、長崎駅のすぐ近くにある、活気あふれる英国・アイルランド風' +
        'パブです。カジュアルな雰囲気、フレンドリーなスタッフ、英語が通じる環境で知られ、' +
        '外国人旅行者にも地元の人にも人気の集いの場となっています。冷えたギネスを一杯' +
        '楽しむのも、スポーツ観戦も、旅行者同士の交流も、その都度支払うだけの気軽な' +
        'スタイルで、誰もが居心地よく過ごせます。',
      zhCN:
        '长崎爱尔兰酒吧是一家位于长崎站附近、氛围热闹的英式/爱尔兰风格酒吧。以轻松的氛围、' +
        '友好的员工和英语畅通的环境而闻名，是国际游客和当地人都喜爱的聚会场所。无论是想' +
        '畅饮一杯冰镇健力士黑啤、观看体育赛事，还是与其他旅行者交流，这里轻松自在、即点即付' +
        '的方式都能让每个人宾至如归。',
      zhTW:
        '長崎愛爾蘭酒吧是一家位於長崎車站附近、氣氛熱鬧的英式/愛爾蘭風格酒吧。以輕鬆的氛圍、' +
        '友善的員工和英語暢通的環境而聞名，是國際遊客和當地人都喜愛的聚會場所。無論是想' +
        '暢飲一杯冰鎮健力士黑啤、觀看體育賽事，還是與其他旅行者交流，這裡輕鬆自在、即點即付' +
        '的方式都能讓每個人賓至如歸。',
      ko:
        '아이리시 펍 나가사키는 나가사키역 바로 근처에 위치한, 활기 넘치는 영국·아일랜드풍 ' +
        '펍입니다. 캐주얼한 분위기와 친절한 직원, 영어가 잘 통하는 환경으로 유명해 외국인 ' +
        '여행객과 현지인 모두에게 인기 있는 만남의 장소입니다. 시원한 기네스 한 잔을 ' +
        '즐기거나 스포츠를 관람하거나 다른 여행자들과 어울리고 싶을 때, 그때그때 편하게 ' +
        '계산하는 캐주얼한 방식으로 누구나 편안하게 머물 수 있습니다.',
    },

    menu: [
      {
        id: 'guinness',
        name: 'Guinness Draught',
        nameI18n: { en: 'Guinness Draught', zhCN: '健力士生啤', zhTW: '健力士生啤', ko: '기네스 생맥주', ja: 'ギネス生' },
        price: 'Approx. ¥1,320',
        img: 'menu1.jpg',
        description: {
          en:
            'A quintessential pub staple. Served fresh on tap with a rich, creamy ' +
            'head and smooth malt flavour, perfect for kicking off your evening.',
          ja:
            'パブの定番中の定番。生樽から注がれる、クリーミーな泡とまろやかな麦芽の風味が' +
            '特徴で、夜の始まりにぴったりの一杯です。',
          zhCN:
            '酒吧里最经典的招牌饮品。生啤酒龙头现点现倒，绵密奶油般的泡沫与顺滑的麦芽风味，' +
            '是开启夜晚的完美选择。',
          zhTW:
            '酒吧裡最經典的招牌飲品。生啤酒龍頭現點現倒，綿密奶油般的泡沫與順滑的麥芽風味，' +
            '是開啟夜晚的完美選擇。',
          ko:
            '펍의 대표적인 필수 메뉴. 생맥주로 신선하게 서빙되며, 풍성하고 크리미한 거품과 ' +
            '부드러운 몰트 풍미로 저녁을 시작하기에 완벽합니다.',
        },
      },
      {
        id: 'fish-and-chips',
        name: 'Fish & Chips',
        nameI18n: { en: 'Fish & Chips', zhCN: '炸鱼薯条', zhTW: '炸魚薯條', ko: '피시 앤 칩스', ja: 'フィッシュ＆チップス' },
        price: 'Large ¥1,100 / Small ¥660',
        img: 'menu2.jpg',
        description: {
          en:
            'Crispy beer-battered fish served with golden fries. It is ' +
            'traditionally enjoyed with malt vinegar drizzled over top — a classic ' +
            'pairing with a cold pint of beer.',
          ja:
            'ビール衣でカリッと揚げた魚に、黄金色のフライドポテトを添えて。伝統的に' +
            'モルトビネガーをかけて楽しまれ、冷えたビールとの相性は抜群です。',
          zhCN:
            '以啤酒面糊炸得酥脆的鱼肉，搭配金黄薯条。传统吃法是淋上麦芽醋，是搭配冰镇' +
            '啤酒的经典组合。',
          zhTW:
            '以啤酒麵糊炸得酥脆的魚肉，搭配金黃薯條。傳統吃法是淋上麥芽醋，是搭配冰鎮' +
            '啤酒的經典組合。',
          ko:
            '비어 배터로 바삭하게 튀긴 생선에 노릇한 감자튀김을 곁들였습니다. 전통적으로 ' +
            '몰트 식초를 뿌려 즐기며, 시원한 맥주 한 잔과 잘 어울리는 클래식한 조합입니다.',
        },
      },
      {
        id: 'shepherds-pie',
        name: "Shepherd's Pie",
        price: 'Approx. ¥770',
        img: 'menu3.jpg',
        description: {
          en:
            'A comforting British pub classic featuring seasoned minced meat topped ' +
            'with a layer of smooth mashed potato and baked until golden brown.',
          ja:
            '英国パブの定番、心温まる家庭料理。味付けしたひき肉の上に、なめらかな' +
            'マッシュポテトをのせ、きつね色になるまで焼き上げました。',
          zhCN: '英式酒吧的经典家常菜，调味碎肉上铺一层绵密土豆泥，烤至金黄焦香。',
          zhTW: '英式酒吧的經典家常菜，調味碎肉上鋪一層綿密馬鈴薯泥，烤至金黃焦香。',
          ko:
            '영국 펍의 대표적인 클래식 메뉴로, 양념한 다진 고기 위에 부드러운 매시트포테이토를 ' +
            '올려 노릇하게 구워냈습니다.',
        },
      },
      {
        id: 'nagasaki-pickles',
        name: 'Nagasaki Pickles',
        nameI18n: { en: 'Nagasaki Pickles', zhCN: '长崎风味泡菜', zhTW: '長崎風味泡菜', ko: '나가사키 피클', ja: '長崎風ピクルス' },
        price: 'Approx. ¥550',
        img: 'menu4.jpg',
        description: {
          en:
            'Homemade pickles made using fresh, locally sourced Nagasaki vegetables. ' +
            'A light, tangy, and refreshing bar snack to go with your drinks.',
          ja:
            '長崎産の新鮮な野菜を使った自家製ピクルス。軽やかで酸味が効いた、お酒によく合う' +
            '爽やかなおつまみです。',
          zhCN: '使用长崎当地新鲜蔬菜制作的自制泡菜。清爽微酸，是佐酒的绝佳小食。',
          zhTW: '使用長崎當地新鮮蔬菜製作的自製泡菜。清爽微酸，是佐酒的絕佳小食。',
          ko: '신선한 나가사키산 채소로 만든 홈메이드 피클. 가볍고 새콤하며 상큼해서 술안주로 잘 어울립니다.',
        },
      },
    ],
  },

  {
    id: 'base',
    name: 'cafe＆bar BASE',
    nameJa: '',
    nameI18n: { en: 'cafe & bar BASE', zhCN: 'cafe & bar BASE', zhTW: 'cafe & bar BASE', ko: '카페&바 BASE', ja: 'カフェ＆バー BASE' },
    heroDish: { name: { en: 'Berry French Toast', zhCN: '莓果法式吐司', zhTW: '莓果法式吐司', ko: '베리 프렌치토스트', ja: 'ベリーのフレンチトースト' }, price: '¥1,150', image: 'menu2.jpg' },
    category: 'Cafe',
    area: 'Near Shianbashi',
    areaJa: '思案橋周辺',
    areaI18n: { en: 'Near Shianbashi', zhCN: '思案桥附近', zhTW: '思案橋附近', ko: '시안바시 근처', ja: '思案橋周辺' },

    // 現・仮マップ用の位置（%座標）※思案橋寄り
    map: { x: 36, y: 80 },
    geo: { lat: 32.742664, lng: 129.88118 },
    address: '〒850-0832 長崎県長崎市油屋町1-14 しあんばしビル 3F',
    hours: {
      sun: ['12:00–20:00'],
      mon: ['12:00–20:00'],
      tue: ['12:00–20:00'],
      wed: ['12:00–17:00'],
      thu: null, // 定休日
      fri: ['12:00–24:00'],
      sat: ['12:00–24:00'],
    },

    photoBase: '/shops/base',
    exterior: 'exterior.jpg',

    description: {
      en:
        'cafe＆bar BASE is a stylish and versatile cafe-bar located just a 2-minute ' +
        'walk from the Shianbashi tram stop. Combining a modern, welcoming atmosphere ' +
        'with a broad menu that covers everything from specialty coffees and desserts ' +
        'to craft cocktails, beers, and hearty meals, it is a great spot for any time ' +
        'of day. Whether you want to enjoy a late lunch, relax with sweet French ' +
        'toast, or have a casual drink in a cozy setting, this friendly spot welcomes ' +
        'international travelers with open arms.',
      ja:
        'カフェ&バーBASEは、思案橋電停から徒歩2分の場所にある、おしゃれで多彩なカフェ&バー' +
        'です。モダンで居心地の良い雰囲気と、こだわりのコーヒーやデザートからクラフト' +
        'カクテル、ビール、食べ応えのある食事まで揃う幅広いメニューで、一日のどんな時間にも' +
        'ぴったりの場所です。遅めのランチを楽しむのも、甘いフレンチトーストでくつろぐのも、' +
        '居心地の良い空間でカジュアルに一杯飲むのも、外国人旅行者を温かく迎えてくれます。',
      zhCN:
        '咖啡&酒吧BASE是一家时尚多元的咖啡酒吧，距思案桥电车站步行仅2分钟。现代而温馨的' +
        '氛围，搭配从精品咖啡、甜点到精酿鸡尾酒、啤酒及丰盛餐点的多样菜单，无论一天中的' +
        '哪个时段前来都很合适。无论是享用迟来的午餐、品尝香甜的法式吐司放松身心，还是在' +
        '惬意的环境中小酌一杯，这里都热情欢迎国际游客的到来。',
      zhTW:
        '咖啡&酒吧BASE是一家時尚多元的咖啡酒吧，距思案橋電車站步行僅2分鐘。現代而溫馨的' +
        '氛圍，搭配從精品咖啡、甜點到精釀雞尾酒、啤酒及豐盛餐點的多樣菜單，無論一天中的' +
        '哪個時段前來都很合適。無論是享用遲來的午餐、品嚐香甜的法式吐司放鬆身心，還是在' +
        '愜意的環境中小酌一杯，這裡都熱情歡迎國際遊客的到來。',
      ko:
        '카페&바 BASE는 시안바시 전차역에서 도보 2분 거리에 있는, 세련되고 다채로운 카페 ' +
        '바입니다. 모던하고 편안한 분위기에 스페셜티 커피와 디저트부터 크래프트 칵테일, ' +
        '맥주, 든든한 식사까지 다양한 메뉴를 갖추고 있어 하루 중 언제 찾아도 좋은 곳입니다. ' +
        '늦은 점심을 즐기거나 달콤한 프렌치토스트로 여유를 부리거나, 아늑한 분위기 속에서 ' +
        '편하게 한 잔 마시고 싶을 때, 이곳은 외국인 여행객을 언제나 반갑게 맞이합니다.',
    },

    menu: [
      {
        id: 'base-burger',
        name: 'Signature BASE Burger',
        nameI18n: { en: 'Signature BASE Burger', zhCN: 'BASE招牌汉堡', zhTW: 'BASE招牌漢堡', ko: 'BASE 시그니처 버거', ja: 'BASE特製バーガー' },
        price: 'Approx. ¥1,150',
        img: 'menu1.jpg',
        description: {
          en:
            'The house-specialty burger loaded with a juicy beef patty, fresh ' +
            'lettuce, tomatoes, melted cheese, and a flavorful teriyaki sauce with a ' +
            'touch of mustard. A hearty meal that pairs amazingly with a cold beer.',
          ja:
            'ジューシーなビーフパティ、新鮮なレタスとトマト、とろけるチーズに、マスタードを' +
            '効かせた風味豊かな照り焼きソースをのせた看板バーガー。冷えたビールとの相性抜群の' +
            'ボリューム満点な一品です。',
          zhCN:
            '招牌汉堡，多汁牛肉饼搭配新鲜生菜、番茄、融化芝士，以及带有芥末微辣的浓郁照烧酱。' +
            '分量十足，与冰啤酒是绝佳搭配。',
          zhTW:
            '招牌漢堡，多汁牛肉餅搭配新鮮生菜、番茄、融化起司，以及帶有芥末微辣的濃郁照燒醬。' +
            '份量十足，與冰啤酒是絕佳搭配。',
          ko:
            '육즙 가득한 비프 패티에 신선한 양상추와 토마토, 녹인 치즈, 머스터드를 살짝 더한 ' +
            '풍미 있는 데리야키 소스를 올린 하우스 시그니처 버거입니다. 든든한 한 끼로 시원한 ' +
            '맥주와 환상의 궁합을 자랑합니다.',
        },
      },
      {
        id: 'berry-french-toast',
        name: 'Berry French Toast',
        nameI18n: { en: 'Berry French Toast', zhCN: '莓果法式吐司', zhTW: '莓果法式吐司', ko: '베리 프렌치토스트', ja: 'ベリーのフレンチトースト' },
        price: 'Approx. ¥1,150',
        img: 'menu2.jpg',
        description: {
          en:
            'A fluffy, thick-cut French toast topped with vanilla ice cream, rich ' +
            'mixed berry sauce, and crunchy granola. One of the most popular sweet ' +
            'treats on the menu, ideal for dessert or a café coffee break.',
          ja:
            'ふわふわの厚切りフレンチトーストに、バニラアイス、濃厚なミックスベリーソース、' +
            '香ばしいグラノーラをトッピング。メニューの中でも一番人気のスイーツで、デザートや' +
            'カフェタイムにぴったりです。',
          zhCN:
            '蓬松的厚切法式吐司，搭配香草冰淇淋、浓郁的混合莓果酱和香脆格兰诺拉麦片。是菜单上' +
            '最受欢迎的甜点之一，无论作为餐后甜点还是咖啡时光都很合适。',
          zhTW:
            '蓬鬆的厚切法式吐司，搭配香草冰淇淋、濃郁的混合莓果醬和香脆格蘭諾拉麥片。是菜單上' +
            '最受歡迎的甜點之一，無論作為餐後甜點還是咖啡時光都很合適。',
          ko:
            '폭신한 두툼한 프렌치토스트 위에 바닐라 아이스크림, 진한 믹스베리 소스, 바삭한 ' +
            '그래놀라를 올렸습니다. 메뉴 중에서도 가장 인기 있는 디저트로, 후식이나 카페 ' +
            '타임에 안성맞춤입니다.',
        },
      },
      {
        id: 'hamburger-doria',
        name: 'Tomato Sauce Hamburger Doria',
        nameI18n: { en: 'Tomato Sauce Hamburger Doria', zhCN: '番茄酱汉堡排焗饭', zhTW: '番茄醬漢堡排焗飯', ko: '토마토 소스 함박 도리아', ja: 'トマトソースハンバーグドリア' },
        price: 'Approx. ¥1,000',
        img: 'menu3.jpg',
        description: {
          en:
            'A comforting Japanese-style baked rice dish topped with a juicy ' +
            'hamburger patty, rich tomato sauce, and melted cheese, served piping ' +
            'hot. A satisfying and flavorful comfort food loved by locals.',
          ja:
            'ジューシーなハンバーグに濃厚なトマトソース、とろけるチーズをのせて焼き上げた、' +
            '心温まる和風グラタン風ライス料理。熱々でボリューム満点、地元の人々にも愛される' +
            '定番の味です。',
          zhCN:
            '多汁汉堡排搭配浓郁番茄酱和融化芝士，铺在米饭上烤制而成的日式暖心料理，趁热享用。' +
            '满足感十足，深受当地人喜爱。',
          zhTW:
            '多汁漢堡排搭配濃郁番茄醬和融化起司，鋪在米飯上烤製而成的日式暖心料理，趁熱享用。' +
            '滿足感十足，深受當地人喜愛。',
          ko:
            '육즙 가득한 함박스테이크에 진한 토마토 소스와 녹인 치즈를 올려 구운 일본식 ' +
            '도리아입니다. 뜨끈하게 서빙되며, 든든하고 풍미 가득해 현지인들에게도 사랑받는 ' +
            '메뉴입니다.',
        },
      },
      {
        id: 'design-latte',
        name: 'Design Latte',
        nameI18n: { en: 'Design Latte', zhCN: '拉花拿铁', zhTW: '拉花拿鐵', ko: '디자인 라떼', ja: 'デザインラテ' },
        price: 'Coffee from approx. ¥500',
        img: 'menu4.jpg',
        description: {
          en:
            'Enjoy beautiful latte art or choose from a wide selection of alcoholic ' +
            'beverages including classic cocktails, spirits, and beers in a relaxed ' +
            'atmosphere.',
          ja:
            '美しいラテアートを楽しむもよし、クラシックカクテルやスピリッツ、ビールなど豊富な' +
            'お酒からお好みの一杯を選ぶもよし。くつろいだ雰囲気の中でお楽しみください。',
          zhCN:
            '可欣赏精美的拉花艺术，也可在轻松的氛围中，从经典鸡尾酒、烈酒和啤酒等丰富的酒类' +
            '中自由选择。',
          zhTW:
            '可欣賞精美的拉花藝術，也可在輕鬆的氛圍中，從經典雞尾酒、烈酒和啤酒等豐富的酒類' +
            '中自由選擇。',
          ko:
            '아름다운 라떼 아트를 즐기거나, 클래식 칵테일과 스피릿, 맥주 등 다양한 주류 중에서 ' +
            '편안한 분위기 속에 원하는 것을 골라보세요.',
        },
      },
    ],
  },

  {
    id: 'iwi',
    name: 'BAR IWI',
    nameJa: '',
    nameI18n: { en: 'BAR IWI', zhCN: 'BAR IWI', zhTW: 'BAR IWI', ko: '바 이위', ja: 'バー イウィ' },
    heroDish: { name: { en: 'House Cocktails', zhCN: '招牌鸡尾酒', zhTW: '招牌雞尾酒', ko: '하우스 칵테일', ja: 'オリジナルカクテル' }, price: '¥800', image: 'menu1.jpg' },
    category: 'Bar',
    area: 'Shianbashi',
    areaJa: '思案橋',
    areaI18n: { en: 'Shianbashi', zhCN: '思案桥', zhTW: '思案橋', ko: '시안바시', ja: '思案橋' },

    // 現・仮マップ用の位置（%座標）※思案橋エリア
    map: { x: 84, y: 76 },
    geo: { lat: 32.742786, lng: 129.879578 },
    address: '〒850-0901 長崎県長崎市本石灰町1-9',
    hours: {
      sun: null, // 定休日
      mon: null, // 定休日
      tue: ['19:00–03:00'],
      wed: ['19:00–03:00'],
      thu: ['19:00–03:00'],
      fri: ['19:00–03:00'],
      sat: ['19:00–03:00'],
    },

    photoBase: '/shops/iwi',
    exterior: 'exterior.jpg',

    // メニュー写真がイメージ画である旨を表示（設定した店舗のみ表示される）
    menuImageNote: 'Menu photos are for illustration purposes only.',

    description: {
      en:
        'BAR IWI is a popular and welcoming international bar located in the ' +
        'Shianbashi nightlife district, run by a friendly New Zealander owner. It is ' +
        'famous among both locals and expats for its warm, inclusive vibe, making it ' +
        'one of the easiest places in Nagasaki for international travelers to walk in ' +
        'and feel right at home. Whether you are looking for a relaxed drink on a ' +
        'weeknight or a lively music-filled atmosphere on the weekend, it is a ' +
        'fantastic spot to connect with locals and fellow travelers.',
      ja:
        'BAR IWIは、思案橋の歓楽街にある人気の国際色豊かなバーで、気さくなニュージーランド' +
        '出身のオーナーが営んでいます。温かく誰でも受け入れてくれる雰囲気で地元の人にも' +
        '在住外国人にも人気があり、長崎の中でも外国人旅行者が気軽に立ち寄ってくつろげる場所の' +
        'ひとつです。平日の夜にゆったり一杯飲みたいときも、週末に音楽が流れる賑やかな雰囲気を' +
        '楽しみたいときも、地元の人や他の旅行者と交流できる素晴らしいスポットです。',
      zhCN:
        'BAR IWI是一家位于思案桥夜生活街区的热门国际化酒吧，由一位友善的新西兰籍老板经营。' +
        '以其温暖包容的氛围而闻名于当地人和外籍居民之间，是长崎最容易让国际游客轻松走进、' +
        '感到宾至如归的地方之一。无论是平日夜晚想小酌放松，还是周末想感受充满音乐的热闹气氛，' +
        '这里都是结识当地人和其他旅行者的绝佳去处。',
      zhTW:
        'BAR IWI是一家位於思案橋夜生活街區的熱門國際化酒吧，由一位友善的紐西蘭籍老闆經營。' +
        '以其溫暖包容的氛圍而聞名於當地人和外籍居民之間，是長崎最容易讓國際遊客輕鬆走進、' +
        '感到賓至如歸的地方之一。無論是平日夜晚想小酌放鬆，還是週末想感受充滿音樂的熱鬧氣氛，' +
        '這裡都是結識當地人和其他旅行者的絕佳去處。',
      ko:
        'BAR IWI는 시안바시 유흥가에 위치한 인기 있는 인터내셔널 바로, 친절한 뉴질랜드 출신 ' +
        '오너가 운영합니다. 따뜻하고 포용력 있는 분위기로 현지인과 외국인 거주자 모두에게 ' +
        '유명하며, 나가사키에서 외국인 여행자가 부담 없이 들어가 편안함을 느낄 수 있는 곳 ' +
        '중 하나입니다. 평일 밤 여유롭게 한 잔 하고 싶을 때든, 주말에 음악이 흐르는 활기찬 ' +
        '분위기를 즐기고 싶을 때든, 현지인 및 다른 여행자들과 교류하기에 훌륭한 장소입니다.',
    },

    menu: [
      {
        id: 'house-cocktails',
        name: 'Special House Cocktails',
        nameI18n: { en: 'Special House Cocktails', zhCN: '特调鸡尾酒', zhTW: '特調雞尾酒', ko: '스페셜 하우스 칵테일', ja: 'スペシャルハウスカクテル' },
        price: 'Approx. ¥800',
        img: 'menu1.jpg',
        description: {
          en:
            'Freshly mixed signature cocktails crafted by the owner. Delicious, ' +
            'creative, and perfect for kicking off your evening in Shianbashi.',
          ja:
            'オーナー自らが作る、フレッシュなシグネチャーカクテル。美味しく創造性にあふれ、' +
            '思案橋での夜の始まりにぴったりです。',
          zhCN: '由老板亲自调制的新鲜招牌鸡尾酒。美味又富有创意，是在思案桥开启夜晚的完美选择。',
          zhTW: '由老闆親自調製的新鮮招牌雞尾酒。美味又富有創意，是在思案橋開啟夜晚的完美選擇。',
          ko: '오너가 직접 만드는 신선한 시그니처 칵테일. 맛있고 창의적이며, 시안바시에서의 밤을 시작하기에 완벽합니다.',
        },
      },
      {
        id: 'spirits-mixers',
        name: 'Standard Spirits & Mixers',
        nameI18n: { en: 'Standard Spirits & Mixers', zhCN: '基酒与调酒饮料', zhTW: '基酒與調酒飲料', ko: '스탠다드 스피릿 & 믹서', ja: '定番スピリッツ＆ミキサー' },
        price: 'Approx. ¥500 – ¥700',
        img: 'menu2.jpg',
        description: {
          en:
            'Simple, high-quality standard drinks like Gin & Tonics, Highballs, or ' +
            'Rum & Cokes served at very reasonable prices.',
          ja:
            'ジントニックやハイボール、ラム&コークなど、シンプルで質の良い定番ドリンクを' +
            'お手頃な価格で提供しています。',
          zhCN: '杜松子汽水、Highball威士忌苏打、朗姆可乐等简单优质的经典饮品，价格十分实惠。',
          zhTW: '琴通寧、Highball威士忌蘇打、蘭姆可樂等簡單優質的經典飲品，價格十分實惠。',
          ko: '진토닉, 하이볼, 럼콕 등 심플하면서도 고품질인 스탠다드 음료를 매우 합리적인 가격에 제공합니다.',
        },
      },
      {
        id: 'beers',
        name: 'Domestic & Imported Beers',
        nameI18n: { en: 'Domestic & Imported Beers', zhCN: '国产与进口啤酒', zhTW: '國產與進口啤酒', ko: '국산 및 수입 맥주', ja: '国産・輸入ビール' },
        price: 'Approx. ¥600 – ¥800',
        img: 'menu3.jpg',
        description: {
          en:
            'A selection of ice-cold bottled and draft beers, perfect for sipping ' +
            'casually while chatting at the bar counter.',
          ja:
            'キンキンに冷えた瓶ビールと生ビールを各種取り揃え。バーカウンターでおしゃべりしながら' +
            '気軽に楽しむのにぴったりです。',
          zhCN: '精选冰镇瓶装及生啤酒，非常适合在吧台一边闲聊一边轻松小酌。',
          zhTW: '精選冰鎮瓶裝及生啤酒，非常適合在吧檯一邊閒聊一邊輕鬆小酌。',
          ko: '시원하게 냉장된 병맥주와 생맥주를 다양하게 준비했습니다. 바 카운터에서 이야기를 나누며 편하게 즐기기에 좋습니다.',
        },
      },
      {
        id: 'bar-snacks',
        name: 'Casual Bar Snacks',
        nameI18n: { en: 'Casual Bar Snacks', zhCN: '休闲小食', zhTW: '休閒小食', ko: '캐주얼 안주', ja: 'カジュアルなおつまみ' },
        price: 'Approx. ¥400 – ¥600',
        img: 'menu4.jpg',
        description: {
          en:
            'Light and easy finger foods — such as mixed nuts or chips — ideal for ' +
            'sharing over drinks with new friends.',
          ja:
            'ミックスナッツやチップスなど、軽くつまめるおつまみをご用意。新しく出会った仲間と' +
            'シェアしながら楽しむのにぴったりです。',
          zhCN: '综合坚果、薯片等轻食小吃，非常适合与新朋友一起小酌分享。',
          zhTW: '綜合堅果、洋芋片等輕食小吃，非常適合與新朋友一起小酌分享。',
          ko: '믹스넛이나 칩스 등 가볍게 즐길 수 있는 안주를 준비했습니다. 새로 사귄 친구들과 함께 나눠 먹기 좋습니다.',
        },
      },
    ],
  },

  {
    id: 'pure',
    name: 'Nagasaki Wagyu Yakiniku Pure',
    nameJa: '',
    nameI18n: { en: 'Yakiniku Pure', zhCN: '长崎和牛烤肉 Pure', zhTW: '長崎和牛燒肉 Pure', ko: '야키니쿠 Pure', ja: '長崎和牛焼肉 Pure' },
    heroDish: { name: { en: 'Nagasaki Wagyu Assortment (for 3)', zhCN: '长崎和牛拼盘（3人份）', zhTW: '長崎和牛拼盤（3人份）', ko: '나가사키 와규 모둠 (3인분)', ja: '長崎和牛盛合せ(３人前)' }, price: '¥8,690', image: 'exterior.jpg' },
    category: 'Yakiniku',
    area: 'Near Shinchi Chinatown',
    areaJa: '新地中華街周辺',
    areaI18n: { en: 'Near Shinchi Chinatown', zhCN: '新地中华街附近', zhTW: '新地中華街附近', ko: '신치 차이나타운 근처', ja: '新地中華街周辺' },

    // 現・仮マップ用の位置（%座標）※新地中華街寄り（中央）
    map: { x: 40, y: 58 },
    geo: { lat: 32.741982, lng: 129.874863 },
    address: '〒850-0842 長崎県長崎市新地町2-7',
    hours: {
      sun: ['11:00–14:00', '17:00–21:00'],
      mon: ['11:30–14:00', '17:00–21:00'],
      tue: ['11:30–14:00', '17:00–21:00'],
      wed: ['11:30–14:00', '17:00–21:00'],
      thu: ['11:30–14:00', '17:00–21:00'],
      fri: ['11:30–14:00', '17:00–21:00'],
      sat: ['11:00–14:00', '17:00–21:00'],
    },

    photoBase: '/shops/pure',
    exterior: 'exterior.jpg',

    description: {
      en:
        'Nagasaki Wagyu Yakiniku Pure is a premier Japanese BBQ restaurant directly ' +
        'operated by JA Zennoh Nagasaki (the local agricultural cooperative). It is ' +
        'famous for serving top-tier, authentic Nagasaki Wagyu beef — celebrated for ' +
        'its tender texture, deep marbling, and rich, savory flavor — at reasonable ' +
        'prices. Featuring clean, modern Japanese-style seating and user-friendly ' +
        'ordering (often with multi-language tablet menus), it provides an ' +
        'exceptionally comfortable and high-quality Wagyu dining experience for ' +
        'international travelers.',
      ja:
        '長崎和牛焼肉Pureは、JA全農長崎（地元の農業協同組合）が直営する本格焼肉店です。' +
        '柔らかな肉質と深い霜降り、濃厚で豊かな旨味で知られる最上級の本場長崎和牛を、' +
        '手頃な価格で提供することで有名です。清潔感のあるモダンな和風の座席と、使いやすい' +
        '注文システム（多言語対応のタブレットメニューを導入していることも多い）を備え、' +
        '外国人旅行者にも快適で質の高い和牛体験を提供しています。',
      zhCN:
        '长崎和牛烤肉Pure是由JA全农长崎（当地农业协同组合）直营的正宗日式烤肉餐厅。以实惠的' +
        '价格提供肉质细嫩、油花丰富、风味浓郁的顶级正宗长崎和牛而闻名。餐厅拥有整洁现代的' +
        '日式座位和便捷的点餐系统（常配备多语言平板菜单），为国际游客带来格外舒适、高品质的' +
        '和牛用餐体验。',
      zhTW:
        '長崎和牛烤肉Pure是由JA全農長崎（當地農業協同組合）直營的正宗日式烤肉餐廳。以實惠的' +
        '價格提供肉質細嫩、油花豐富、風味濃郁的頂級正宗長崎和牛而聞名。餐廳擁有整潔現代的' +
        '日式座位和便捷的點餐系統（常配備多語言平板菜單），為國際遊客帶來格外舒適、高品質的' +
        '和牛用餐體驗。',
      ko:
        '나가사키 와규 야키니쿠 Pure는 JA 젠노 나가사키(지역 농업협동조합)가 직영하는 ' +
        '정통 일본식 야키니쿠 레스토랑입니다. 부드러운 육질과 깊은 마블링, 진하고 풍부한 ' +
        '감칠맛으로 유명한 최상급 정통 나가사키 와규를 합리적인 가격에 제공하는 것으로 ' +
        '유명합니다. 깔끔하고 모던한 일본식 좌석과 사용하기 쉬운 주문 시스템(다국어 태블릿 ' +
        '메뉴를 갖춘 경우가 많음)을 갖추고 있어 외국인 여행객에게도 편안하고 고품질의 와규 ' +
        '다이닝 경험을 제공합니다.',
    },

    menu: [
      {
        id: 'wagyu-assortment-3',
        name: 'Nagasaki Wagyu Assortment (for 3)',
        nameJa: '長崎和牛盛合せ(３人前)',
        nameI18n: { en: 'Nagasaki Wagyu Assortment (for 3)', zhCN: '长崎和牛拼盘（3人份）', zhTW: '長崎和牛拼盤（3人份）', ko: '나가사키 와규 모둠 (3인분)', ja: '長崎和牛盛合せ(３人前)' },
        price: '¥8,690',
        img: 'menu1.jpg',
      },
      {
        id: 'special-3-assortment',
        name: 'Special 3-Cut Assortment',
        nameJa: '特選３種盛合せ',
        nameI18n: { en: 'Special 3-Cut Assortment', zhCN: '特选三种拼盘', zhTW: '特選三種拼盤', ko: '특선 3종 모둠', ja: '特選３種盛合せ' },
        price: '¥5,390',
        img: 'menu2.jpg',
      },
      {
        id: 'thick-karubi-2way',
        name: 'Thick-Cut Karubi, 2-Way',
        nameJa: '厚切りカルビの２種盛り',
        nameI18n: { en: 'Thick-Cut Karubi, 2-Way', zhCN: '厚切五花两种拼盘', zhTW: '厚切五花兩種拼盤', ko: '두꺼운 갈비 2종 모둠', ja: '厚切りカルビの２種盛り' },
        price: '¥3,190',
        img: 'menu3.jpg',
      },
      {
        id: '5000yen-course',
        name: '¥5,000 Course',
        nameJa: '５０００円コース',
        nameI18n: { en: '¥5,000 Course', zhCN: '5000日元套餐', zhTW: '5000日圓套餐', ko: '5000엔 코스', ja: '５０００円コース' },
        price: '¥5,500',
        img: 'menu4.jpg',
      },
    ],
  },

  {
    id: 'kamadojyaya',
    name: 'Kamadojyaya',
    nameJa: '',
    nameI18n: { en: 'Kamadojyaya', zhCN: '灶家', zhTW: '灶家', ko: '가마도자야', ja: 'かまど家' },
    heroDish: { name: { en: 'Dutch Hot Pot', zhCN: '荷兰火锅', zhTW: '荷蘭火鍋', ko: '네덜란드식 전골', ja: 'オランダ鍋' }, price: '¥2,200', image: 'menu3.jpg' },
    category: 'Izakaya',
    area: 'Shianbashi',
    areaJa: '思案橋',
    areaI18n: { en: 'Shianbashi', zhCN: '思案桥', zhTW: '思案橋', ko: '시안바시', ja: '思案橋' },

    // 現・仮マップ用の位置（%座標）※思案橋エリア
    map: { x: 66, y: 62 },
    geo: { lat: 32.741848, lng: 129.879654 },
    address: '〒850-0901 長崎県長崎市本石灰町5-14',
    hours: {
      sun: null, // 定休日
      mon: ['18:00–23:00'],
      tue: ['18:00–23:00'],
      wed: ['18:00–23:00'],
      thu: ['18:00–23:00'],
      fri: ['18:00–23:00'],
      sat: ['18:00–23:00'],
    },

    photoBase: '/shops/kamadojyaya',
    exterior: 'exterior.jpg',

    description: {
      en:
        'Kamadojyaya is a long-established Japanese izakaya located in the heart of ' +
        'the Shianbashi nightlife area. Founded in 1978, it offers a warm, nostalgic ' +
        'Japanese dining atmosphere where you can savor local Nagasaki seafood, whale ' +
        'dishes, and unique regional hot pots. The restaurant features a comprehensive ' +
        'English menu as well as photo-friendly dishes, making it exceptionally ' +
        'welcoming and stress-free for international travelers who want to experience ' +
        'authentic Japanese pub culture.',
      ja:
        'かまど家は、思案橋の歓楽街の中心にある老舗の居酒屋です。1978年創業で、長崎の地魚や' +
        '鯨料理、地域ならではの鍋料理を、温かく懐かしい和の雰囲気の中で味わえます。充実した' +
        '英語メニューと写真映えする料理を揃えており、本場の日本の居酒屋文化を体験したい' +
        '外国人旅行者にも安心して楽しんでいただけます。',
      zhCN:
        'kamadojyaya是位于思案桥娱乐街中心的老字号日式居酒屋。创业于1978年，在温馨怀旧的' +
        '日式用餐氛围中，可品尝长崎本地海鲜、鲸鱼料理和地方特色火锅。餐厅备有完整的英文菜单' +
        '以及适合拍照的菜品，让想体验正宗日本居酒屋文化的国际游客也能安心尽兴。',
      zhTW:
        'kamadojyaya是位於思案橋娛樂街中心的老字號日式居酒屋。創業於1978年，在溫馨懷舊的' +
        '日式用餐氛圍中，可品嚐長崎本地海鮮、鯨魚料理和地方特色火鍋。餐廳備有完整的英文菜單' +
        '以及適合拍照的菜品，讓想體驗正宗日本居酒屋文化的國際遊客也能安心盡興。',
      ko:
        '카마도자야는 시안바시 유흥가 중심에 위치한 오래된 전통 이자카야입니다. 1978년 ' +
        '창업하여, 따뜻하고 정겨운 일본풍 분위기 속에서 나가사키 현지 해산물, 고래 요리, ' +
        '지역 특유의 나베(전골) 요리를 맛볼 수 있습니다. 상세한 영어 메뉴와 사진 찍기 좋은 ' +
        '요리들을 갖추고 있어, 정통 일본 이자카야 문화를 경험하고 싶은 외국인 여행객도 부담 ' +
        '없이 즐길 수 있습니다.',
    },

    menu: [
      {
        id: 'seasonal-sashimi',
        name: 'Sashimi of seasonal fish',
        nameI18n: { en: 'Sashimi of seasonal fish', zhCN: '时令鱼生鱼片', zhTW: '時令魚生魚片', ko: '제철 생선 사시미', ja: '旬魚の刺身' },
        price: '¥2,750',
        img: 'menu1.jpg',
        description: {
          en:
            'A beautiful platter of super-fresh, locally caught seasonal fish from ' +
            "Nagasaki's coastal waters. Sliced to order, it is the best way to " +
            'experience the renowned quality of Nagasaki’s seafood.',
          ja:
            '長崎近海で獲れた、超新鮮な旬の魚を美しく盛り付けた一皿。注文が入ってから切り' +
            '分けるので、長崎の海鮮の評判高い上質さを味わうのに最適です。',
          zhCN: '精美呈现长崎近海捕获的超新鲜时令鱼类拼盘。现点现切，是体验长崎海鲜盛名品质的最佳方式。',
          zhTW: '精美呈現長崎近海捕獲的超新鮮時令魚類拼盤。現點現切，是體驗長崎海鮮盛名品質的最佳方式。',
          ko:
            '나가사키 근해에서 잡은 매우 신선한 제철 생선을 아름답게 담아낸 한 접시입니다. ' +
            '주문이 들어오면 그 자리에서 썰어내어, 명성 높은 나가사키 해산물의 품질을 가장 잘 ' +
            '경험할 수 있습니다.',
        },
      },
      {
        id: 'whale-three-piece',
        name: 'Whale three-piece set',
        nameI18n: { en: 'Whale three-piece set', zhCN: '鲸鱼三拼', zhTW: '鯨魚三拼', ko: '고래 3종 모둠', ja: '鯨三点盛り' },
        price: 'Approx. ¥2,400',
        img: 'menu2.jpg',
        description: {
          en:
            'A special chef’s selection of three different cuts of whale meat — a ' +
            'rare, traditional delicacy representing Nagasaki’s unique food culture.',
          ja:
            'シェフ特選の、3種の部位を食べ比べられる鯨肉の盛り合わせ。長崎ならではの食文化を' +
            '伝える、貴重で伝統的な珍味です。',
          zhCN: '主厨特选的三种不同部位鲸肉拼盘——一道珍贵的传统美味，展现长崎独特的饮食文化。',
          zhTW: '主廚特選的三種不同部位鯨肉拼盤——一道珍貴的傳統美味，展現長崎獨特的飲食文化。',
          ko: '셰프가 엄선한 세 가지 부위의 고래고기 모둠 — 나가사키만의 독특한 음식 문화를 보여주는 희귀하고 전통적인 별미입니다.',
        },
      },
      {
        id: 'dutch-hot-pot',
        name: 'Specialty “Dutch hot pot”',
        nameI18n: { en: 'Specialty “Dutch hot pot”', zhCN: '招牌荷兰锅', zhTW: '招牌荷蘭鍋', ko: '명물 네덜란드식 전골', ja: '名物「オランダ鍋」' },
        price: '¥2,200',
        img: 'menu3.jpg',
        description: {
          en:
            'A unique Nagasaki fusion hot pot loaded with fresh seafood, mushrooms, ' +
            'and seasonal vegetables simmered in a creamy milk broth, topped with ' +
            "freshly grated Parmigiano cheese. A hearty, comforting dish reflecting " +
            "Nagasaki's historic Western influence.",
          ja:
            '新鮮な魚介やきのこ、旬の野菜をクリーミーなミルクスープでじっくり煮込んだ、長崎' +
            'ならではの創作鍋。削りたてのパルミジャーノチーズをたっぷりかけて。長崎の異国情緒' +
            'あふれる歴史を感じさせる、心温まる一品です。',
          zhCN:
            '长崎独有的创意融合火锅，以浓郁奶汤慢炖新鲜海鲜、菌菇与时令蔬菜，最后撒上现磨' +
            '帕玛森芝士。这道暖心料理体现了长崎悠久的西洋文化影响。',
          zhTW:
            '長崎獨有的創意融合火鍋，以濃郁奶湯慢燉新鮮海鮮、菇類與時令蔬菜，最後撒上現磨' +
            '帕瑪森起司。這道暖心料理體現了長崎悠久的西洋文化影響。',
          ko:
            '신선한 해산물, 버섯, 제철 채소를 크리미한 우유 육수에 푹 끓인 나가사키만의 퓨전 ' +
            '나베입니다. 갓 갈아낸 파르미지아노 치즈를 듬뿍 올려 마무리합니다. 나가사키의 ' +
            '서양 문화 영향이 담긴, 든든하고 정겨운 요리입니다.',
        },
      },
      {
        id: 'miso-oden',
        name: 'Specialty miso oden',
        nameI18n: { en: 'Specialty miso oden', zhCN: '招牌味噌关东煮', zhTW: '招牌味噌關東煮', ko: '명물 미소 오뎅', ja: '名物みそおでん' },
        price: '¥990',
        img: 'menu4.jpg',
        description: {
          en:
            'Japanese comfort food featuring ingredients like daikon radish, konjac, ' +
            'and beef tendon simmered in savory broth, served with rich red and sweet ' +
            'white miso sauces. A comforting winter-style delicacy that pairs ' +
            'wonderfully with Japanese sake.',
          ja:
            '大根やこんにゃく、牛すじなどを旨味たっぷりの出汁でじっくり煮込んだ、心も体も' +
            '温まる家庭の味。濃厚な赤味噌とまろやかな白味噌、2種のタレでお楽しみいただけます。' +
            '日本酒との相性も抜群の、冬にぴったりの一品です。',
          zhCN:
            '萝卜、蒟蒻、牛筋等食材以鲜美高汤慢炖而成的日式暖心料理，搭配浓郁的红味噌酱与' +
            '香甜的白味噌酱享用。是与日本清酒绝配的冬日暖心美味。',
          zhTW:
            '蘿蔔、蒟蒻、牛筋等食材以鮮美高湯慢燉而成的日式暖心料理，搭配濃郁的紅味噌醬與' +
            '香甜的白味噌醬享用。是與日本清酒絕配的冬日暖心美味。',
          ko:
            '무, 곤약, 소 힘줄 등을 깊은 맛의 육수에 푹 끓인 일본의 정겨운 가정식 요리로, ' +
            '진한 붉은 된장과 달콤한 흰 된장 소스를 곁들여 즐깁니다. 일본 사케와도 잘 어울리는, ' +
            '겨울철에 딱 맞는 따뜻한 별미입니다.',
        },
      },
    ],
  },

  {
    id: 'tito-dragon',
    name: 'Darts Cafe TiTO Dragon',
    nameJa: '',
    nameI18n: { en: 'TiTO Dragon', zhCN: 'TiTO Dragon 飞镖咖啡', zhTW: 'TiTO Dragon 飛鏢咖啡', ko: '다트 카페 TiTO Dragon', ja: 'ダーツカフェ TiTO Dragon' },
    heroDish: { name: { en: 'Margherita Pizza', zhCN: '玛格丽特披萨', zhTW: '瑪格麗特披薩', ko: '마르게리타 피자', ja: 'マルゲリータ' }, price: '¥800', image: 'exterior.jpg' },
    category: 'Bar',
    area: 'Shianbashi',
    areaJa: '思案橋',
    areaI18n: { en: 'Shianbashi', zhCN: '思案桥', zhTW: '思案橋', ko: '시안바시', ja: '思案橋' },

    // 現・仮マップ用の位置（%座標）※思案橋（電停横）
    map: { x: 82, y: 40 },
    geo: { lat: 32.743011, lng: 129.880249 },
    address: '〒850-0832 長崎県長崎市油屋町1-2 モトビル 3F',
    hours: {
      sun: ['19:00–01:00'],
      mon: ['19:00–03:00'],
      tue: ['19:00–03:00'],
      wed: ['19:00–03:00'],
      thu: ['19:00–03:00'],
      fri: ['19:00–04:00'],
      sat: ['19:00–04:00'],
    },

    photoBase: '/shops/tito-dragon',
    exterior: 'exterior.jpg',

    description: {
      en:
        'Darts Cafe TiTO Dragon is a lively and spacious sports-and-darts bar located ' +
        'right next to the Shianbashi tram stop. Equipped with modern electronic dart ' +
        'boards, large TV screens for sports viewing, and a relaxed counter area, it ' +
        'is a favorite spot for young locals and international travelers alike. With a ' +
        'wide selection of drinks, casual bar food, and an English menu available, it ' +
        'provides a fun, interactive environment where anyone can easily play a game ' +
        'of darts and socialize.',
      ja:
        'ダーツカフェ TiTO Dragonは、思案橋電停のすぐ隣にある、活気ある広々としたスポーツ&' +
        'ダーツバーです。最新の電子ダーツボードや、スポーツ観戦用の大画面テレビ、ゆったりとした' +
        'カウンター席を備え、地元の若者にも外国人旅行者にも人気のスポットです。豊富なドリンクと' +
        'カジュアルなバーフード、英語メニューも用意されており、誰でも気軽にダーツを楽しみながら' +
        '交流できる、賑やかで参加しやすい雰囲気が魅力です。',
      zhCN:
        '飞镖咖啡厅 TiTO Dragon是一家位于思案桥电车站旁、氛围热闹、空间宽敞的运动飞镖酒吧。' +
        '配备最新电子飞镖靶、大屏电视用于观看体育赛事，以及惬意的吧台区域，深受当地年轻人和' +
        '国际游客的喜爱。这里备有丰富的饮品、休闲酒吧小食及英文菜单，营造出轻松互动的氛围，' +
        '让任何人都能轻松参与飞镖游戏并结交朋友。',
      zhTW:
        '飛鏢咖啡廳 TiTO Dragon是一家位於思案橋電車站旁、氛圍熱鬧、空間寬敞的運動飛鏢酒吧。' +
        '配備最新電子飛鏢靶、大螢幕電視用於觀看體育賽事，以及愜意的吧檯區域，深受當地年輕人和' +
        '國際遊客的喜愛。這裡備有豐富的飲品、休閒酒吧小食及英文菜單，營造出輕鬆互動的氛圍，' +
        '讓任何人都能輕鬆參與飛鏢遊戲並結交朋友。',
      ko:
        '다츠 카페 TiTO Dragon은 시안바시 전차역 바로 옆에 위치한, 활기차고 넓은 스포츠·다트 ' +
        '바입니다. 최신 전자 다트보드와 스포츠 시청용 대형 TV, 여유로운 카운터석을 갖추고 있어 ' +
        '현지 젊은이들과 외국인 여행객 모두에게 인기 있는 장소입니다. 다양한 음료와 캐주얼한 ' +
        '바 안주, 영어 메뉴까지 갖추고 있어 누구나 부담 없이 다트를 즐기며 어울릴 수 있는 ' +
        '즐겁고 활기찬 공간을 제공합니다.',
    },

    menu: [
      {
        id: 'tequila-horn',
        name: '"Ring the Horn for Tequila!" Shot',
        nameJa: '鳴らすと危険！ワンパフテキーラ',
        nameI18n: { en: '"Ring the Horn for Tequila!" Shot', zhCN: '敲钟就请客！一口闷龙舌兰', zhTW: '敲鐘就請客！一口乾龍舌蘭', ko: '울리면 위험! 원샷 데킬라', ja: '鳴らすと危険！ワンパフテキーラ' },
        price: '¥700 per shot',
        img: 'menu1.jpg',
        description: {
          en:
            'A fun and playful bar game! Blow the horn on your table once, and a shot ' +
            'of Tequila will immediately be served to your table (blow it three times, ' +
            'and you get three shots!). Perfect for party tricks or drinking games ' +
            'with friends.',
          ja:
            '楽しい遊び心満載のバーゲーム！テーブルのホーンを1回鳴らすと、すぐにテキーラ' +
            'ショットが1杯届きます（3回鳴らせば3杯届きます！）。友達との飲み会の余興や、' +
            'パーティーの盛り上げにぴったりです。',
          zhCN:
            '有趣好玩的酒吧游戏！按一次桌上的喇叭，就会立刻送上一杯龙舌兰烈酒（按三次就送' +
            '三杯！）。是朋友聚会助兴或喝酒游戏的绝佳选择。',
          zhTW:
            '有趣好玩的酒吧遊戲！按一次桌上的喇叭，就會立刻送上一杯龍舌蘭烈酒（按三次就送' +
            '三杯！）。是朋友聚會助興或喝酒遊戲的絕佳選擇。',
          ko:
            '재미있고 유쾌한 바 게임! 테이블의 나팔을 한 번 불면 즉시 테킬라 샷 한 잔이 ' +
            '서빙됩니다(세 번 불면 세 잔!). 친구들과의 파티나 술게임에 딱 좋습니다.',
        },
      },
      {
        id: 'darts-games',
        name: 'Darts & Various Party Games',
        nameI18n: { en: 'Darts & Various Party Games', zhCN: '飞镖与各种派对游戏', zhTW: '飛鏢與各種派對遊戲', ko: '다트 & 다양한 파티 게임', ja: 'ダーツ＆パーティーゲーム各種' },
        price: 'Darts from approx. ¥100 per game / Board games available',
        img: 'menu2.jpg',
        description: {
          en:
            'In addition to modern electronic darts, the bar offers a wide variety of ' +
            'fun party and table games. A fantastic way to break the ice, enjoy ' +
            'drinks, and make unforgettable memories with friends and locals.',
          ja:
            '最新の電子ダーツに加え、楽しいパーティーゲームやテーブルゲームも豊富に揃って' +
            'います。打ち解けるきっかけにもなり、お酒を楽しみながら友達や地元の人々と忘れ' +
            'られない思い出を作るのにぴったりです。',
          zhCN:
            '除了现代电子飞镖，酒吧还提供多种趣味派对游戏和桌游。是打破隔阂、畅饮小酌、与' +
            '朋友及当地人共创难忘回忆的绝佳方式。',
          zhTW:
            '除了現代電子飛鏢，酒吧還提供多種趣味派對遊戲和桌遊。是打破隔閡、暢飲小酌、與' +
            '朋友及當地人共創難忘回憶的絕佳方式。',
          ko:
            '최신 전자 다트 외에도 다양한 파티 게임과 테이블 게임을 즐길 수 있습니다. 어색함을 ' +
            '풀고 술을 즐기며 친구, 현지인들과 잊지 못할 추억을 만들기에 좋은 방법입니다.',
        },
      },
      {
        id: 'margherita-pizza',
        name: 'Margherita Pizza',
        nameJa: 'マルゲリータピザ',
        nameI18n: { en: 'Margherita Pizza', zhCN: '玛格丽特披萨', zhTW: '瑪格麗特披薩', ko: '마르게리타 피자', ja: 'マルゲリータピザ' },
        price: '¥800',
        img: 'menu3.jpg',
        description: {
          en:
            'A classic oven-baked pizza with rich tomato sauce, melted mozzarella ' +
            'cheese, and fragrant basil. A crowd-pleasing comfort food that pairs ' +
            'effortlessly with a cold draft beer or cocktail.',
          ja:
            '濃厚なトマトソースと、とろけるモッツァレラチーズ、香り豊かなバジルをのせた、' +
            '定番の窯焼きピザ。みんなに愛される味わいで、冷えた生ビールやカクテルとも相性' +
            '抜群です。',
          zhCN:
            '经典窑烤披萨，浓郁番茄酱、融化的马苏里拉芝士与香气四溢的罗勒。老少咸宜的美味，' +
            '与冰镇生啤或鸡尾酒天生一对。',
          zhTW:
            '經典窯烤披薩，濃郁番茄醬、融化的莫札瑞拉起司與香氣四溢的羅勒。老少咸宜的美味，' +
            '與冰鎮生啤或雞尾酒天生一對。',
          ko:
            '진한 토마토 소스와 녹인 모짜렐라 치즈, 향긋한 바질을 올린 클래식 화덕 피자입니다. ' +
            '누구나 좋아하는 맛으로 시원한 생맥주나 칵테일과 무리 없이 잘 어울립니다.',
        },
      },
      {
        id: 'assorted-sausages',
        name: 'Assorted Sausages',
        nameJa: 'ソーセージの盛り合わせ',
        nameI18n: { en: 'Assorted Sausages', zhCN: '香肠拼盘', zhTW: '香腸拼盤', ko: '소시지 모둠', ja: 'ソーセージの盛り合わせ' },
        price: '¥700',
        img: 'menu4.jpg',
        description: {
          en:
            'A platter of juicy, grilled assorted sausages served with mustard. Hot, ' +
            'savory, and easy to eat while playing games or watching sports matches.',
          ja:
            'ジューシーに焼き上げたソーセージの盛り合わせに、マスタードを添えて。熱々で食べ' +
            'やすく、ゲームやスポーツ観戦をしながらつまむのにぴったりです。',
          zhCN: '多汁烤制的综合香肠拼盘，佐以芥末酱。热腾腾、咸香可口，边玩游戏边看球赛时也方便享用。',
          zhTW: '多汁烤製的綜合香腸拼盤，佐以芥末醬。熱騰騰、鹹香可口，邊玩遊戲邊看球賽時也方便享用。',
          ko: '육즙 가득 구운 모듬 소시지에 머스터드를 곁들였습니다. 뜨겁고 짭짤해 게임을 하거나 스포츠 경기를 보면서 간편하게 즐기기 좋습니다.',
        },
      },
    ],
  },

  {
    id: 'shunsai-nagaya',
    name: 'Shunsai Nagaya',
    nameJa: '',
    nameI18n: { en: 'Shunsai Nagaya', zhCN: '旬彩 长家', zhTW: '旬彩 長家', ko: '슌사이 나가야', ja: '旬彩 なが家' },
    heroDish: { name: { en: 'Wagyu Beef Tempura', zhCN: '和牛天妇罗', zhTW: '和牛天婦羅', ko: '와규 튀김', ja: '和牛の天ぷら' }, price: '¥1,380', image: 'menu1.jpg' },
    category: 'Izakaya',
    area: 'Near Shianbashi & Doza',
    areaJa: '思案橋・銅座周辺',
    areaI18n: { en: 'Near Shianbashi & Doza', zhCN: '思案桥・铜座附近', zhTW: '思案橋・銅座附近', ko: '시안바시・도자 근처', ja: '思案橋・銅座周辺' },

    // 現・仮マップ用の位置（%座標）※思案橋・銅座エリア
    map: { x: 70, y: 90 },
    geo: { lat: 32.745056, lng: 129.878876 },
    address: '〒850-0852 長崎県長崎市万屋町4-13 二葉屋ビル 3F',
    hours: {
      sun: ['17:30–23:00'],
      mon: ['17:30–23:00'],
      tue: ['11:30–14:00', '17:30–23:00'],
      wed: ['11:30–14:00', '17:30–23:00'],
      thu: ['11:30–14:00', '17:30–23:00'],
      fri: ['11:30–14:00', '17:30–23:00'],
      sat: ['11:30–14:00', '17:30–23:00'],
    },

    photoBase: '/shops/shunsai-nagaya',
    exterior: 'exterior.jpg',

    description: {
      en:
        'Shunsai Nagaya is a refined yet accessible Japanese izakaya located near the ' +
        'Shianbashi and Doza nightlife districts. Celebrated for its creative Japanese ' +
        'cuisine, the restaurant highlights local Nagasaki seafood, top-grade Wagyu, ' +
        'and unique regional ingredients in a modern, welcoming atmosphere. It is an ' +
        'exceptional spot for international travelers seeking an authentic, ' +
        'high-quality Japanese dining experience paired with fine local sake.',
      ja:
        '旬彩なが家は、思案橋・銅座の歓楽街近くにある、上品ながらも気軽に入れる和食居酒屋です。' +
        '創作和食に定評があり、長崎の地魚や上質な和牛、長崎ならではの食材を、モダンで居心地の' +
        '良い雰囲気の中で楽しめます。本格的で質の高い和食体験を、上質な地酒とともに味わいたい' +
        '外国人旅行者に特におすすめのお店です。',
      zhCN:
        '旬彩nagaya是一家位于思案桥、铜座娱乐街区附近，格调雅致又平易近人的日式居酒屋。以' +
        '创意日本料理著称，在现代而温馨的氛围中，主打长崎当地海鲜、顶级和牛以及独特的地方' +
        '食材。对于寻求正宗、高品质日式用餐体验并搭配优质地方清酒的国际游客来说，这里是' +
        '绝佳去处。',
      zhTW:
        '旬彩nagaya是一家位於思案橋、銅座娛樂街區附近，格調雅致又平易近人的日式居酒屋。以' +
        '創意日本料理著稱，在現代而溫馨的氛圍中，主打長崎當地海鮮、頂級和牛以及獨特的地方' +
        '食材。對於尋求正宗、高品質日式用餐體驗並搭配優質地方清酒的國際遊客來說，這裡是' +
        '絕佳去處。',
      ko:
        '슌사이 나가야는 시안바시·도자 유흥가 근처에 위치한, 세련되면서도 편안하게 방문할 수 ' +
        '있는 일본식 이자카야입니다. 창의적인 일본 요리로 정평이 나 있으며, 현대적이고 아늑한 ' +
        '분위기 속에서 나가사키 현지 해산물, 최고급 와규, 그리고 독특한 지역 식재료를 ' +
        '선보입니다. 고급 지역 사케와 함께 정통의 고품질 일본 다이닝 경험을 원하는 외국인 ' +
        '여행객에게 특히 추천하는 곳입니다.',
    },

    menu: [
      {
        id: 'wagyu-tempura',
        name: 'Nagasaki Kuroge Wagyu Beef Tempura',
        nameI18n: { en: 'Nagasaki Kuroge Wagyu Beef Tempura', zhCN: '长崎黑毛和牛天妇罗', zhTW: '長崎黑毛和牛天婦羅', ko: '나가사키 쿠로게 와규 튀김', ja: '長崎黒毛和牛の天ぷら' },
        price: '¥1,380',
        img: 'menu1.jpg',
        description: {
          en:
            'Luxurious tempura featuring top-tier Nagasaki Kuroge Wagyu beef. ' +
            'Deep-fried with a light, crispy batter that locks in the rich Umami and ' +
            'juicy texture of the Wagyu, offering a novel twist on traditional tempura.',
          ja:
            '最上級の長崎黒毛和牛を使用した贅沢な天ぷら。軽くカリッとした衣で揚げることで、' +
            '和牛の豊かな旨味とジューシーな食感を閉じ込めました。伝統的な天ぷらに新しさを' +
            '加えた一品です。',
          zhCN:
            '使用顶级长崎黑毛和牛制作的奢华天妇罗。以轻薄酥脆的面衣油炸，锁住和牛浓郁的鲜味' +
            '与多汁口感，为传统天妇罗带来新颖的诠释。',
          zhTW:
            '使用頂級長崎黑毛和牛製作的奢華天婦羅。以輕薄酥脆的麵衣油炸，鎖住和牛濃郁的鮮味' +
            '與多汁口感，為傳統天婦羅帶來新穎的詮釋。',
          ko:
            '최상급 나가사키 흑모 와규로 만든 고급 튀김입니다. 가볍고 바삭한 튀김옷으로 와규의 ' +
            '진한 감칠맛과 육즙을 그대로 가두어, 전통 튀김에 새로운 매력을 더했습니다.',
        },
      },
      {
        id: 'shimaaji-shabu',
        name: 'Yukou Shima-Aji Shabu-Shabu with Goto Udon Finish',
        nameI18n: { en: 'Yukou Shima-Aji Shabu-Shabu with Goto Udon Finish', zhCN: '柚香竹荚鱼涮锅（五岛乌冬收尾）', zhTW: '柚香竹莢魚涮鍋（五島烏龍麵收尾）', ko: '유자향 전갱이 샤부샤부 (고토 우동 마무리)', ja: '柚香しまあじしゃぶしゃぶ 五島うどん締め' },
        price: '¥2,500',
        img: 'menu2.jpg',
        description: {
          en:
            'Striped Jack (Shima-Aji) raised in Toishi, Nagasaki, fed with "Yukou" — a ' +
            'rare, traditional Nagasaki citrus. Swished briefly in hot broth, this ' +
            'firm, flavorful fish loses all fishiness while retaining its rich fat. ' +
            'Served with famous Goto Udon noodles to finish the meal.',
          ja:
            '長崎県戸石産、希少な伝統柑橘「ゆうこう」を食べて育ったシマアジを使用。熱い出汁に' +
            'さっとくぐらせることで、身の締まった旨味豊かな魚から臭みが消え、豊かな脂はそのまま' +
            '残ります。仕上げには名物の五島うどんをどうぞ。',
          zhCN:
            '使用在长崎户石饲养、以稀有传统柑橘「柚柑（Yukou）」喂养的岛鲹（Shima-Aji）。在热' +
            '高汤中轻涮片刻，这种紧实鲜美的鱼肉去除了腥味，同时保留了丰腴的脂香。最后以著名的' +
            '五岛乌冬面收尾。',
          zhTW:
            '使用在長崎戶石飼養、以稀有傳統柑橘「柚柑（Yukou）」餵養的島鰺（Shima-Aji）。在熱' +
            '高湯中輕涮片刻，這種緊實鮮美的魚肉去除了腥味，同時保留了豐腴的脂香。最後以著名的' +
            '五島烏龍麵收尾。',
          ko:
            '나가사키 토이시에서 희귀한 전통 감귤 "유코"를 먹여 키운 시마아지(줄전갱이)를 ' +
            '사용합니다. 뜨거운 육수에 살짝 데치면 탄탄하고 감칠맛 나는 생선살에서 비린내가 ' +
            '사라지고 풍부한 지방은 그대로 남습니다. 마무리로 유명한 고토 우동을 곁들입니다.',
        },
      },
      {
        id: 'pork-lemon-butter',
        name: 'Pork Shoulder Roast Lemon Butter Steak on Hot Plate',
        nameI18n: { en: 'Pork Shoulder Roast Lemon Butter Steak on Hot Plate', zhCN: '猪肩里脊柠檬黄油铁板牛排', zhTW: '豬肩里脊檸檬奶油鐵板牛排', ko: '돼지 어깨살 레몬버터 철판 스테이크', ja: '豚肩ロースのレモンバターステーキ 鉄板焼き' },
        price: '¥1,280',
        img: 'menu3.jpg',
        description: {
          en:
            'Juicy pork shoulder roast cooked on a ceramic hot plate (Toban) with a ' +
            'savory lemon-butter sauce. The refreshing citrus notes cut through the ' +
            'richness of the pork, creating an irresistible aroma and taste.',
          ja:
            'ジューシーな豚肩ロースを陶板焼きで仕上げ、風味豊かなレモンバターソースを' +
            'からめた一品。爽やかな柑橘の香りが豚肉のコクを引き締め、たまらない香りと味わいを' +
            '生み出します。',
          zhCN:
            '多汁猪肩肉以陶板烧烤制而成，搭配浓郁的柠檬奶油酱。清新的柑橘香气中和了猪肉的' +
            '丰腴，带来令人难以抗拒的香气与滋味。',
          zhTW:
            '多汁豬肩肉以陶板燒烤製而成，搭配濃郁的檸檬奶油醬。清新的柑橘香氣中和了豬肉的' +
            '豐腴，帶來令人難以抗拒的香氣與滋味。',
          ko:
            '육즙 가득한 돼지 어깨살을 도반야키(세라믹 철판)로 구워 감칠맛 나는 레몬버터 ' +
            '소스를 곁들였습니다. 상큼한 시트러스 향이 돼지고기의 풍미를 산뜻하게 잡아주어 ' +
            '거부할 수 없는 향과 맛을 선사합니다.',
        },
      },
      {
        id: 'sake-tasting',
        name: "Shunsai Nagaya's Selected Sake Tasting Set",
        price: '¥1,980',
        img: 'menu4.jpg',
        description: {
          en:
            'A carefully curated flight of fine Japanese sakes chosen by the ' +
            'restaurant. A perfect option for international guests who want to sample, ' +
            'compare, and discover different flavor profiles of premium Japanese sake.',
          ja:
            'お店が厳選した、上質な日本酒の飲み比べセット。様々な銘柄の味わいを試し、比べ、' +
            '新たな発見をしたい海外からのお客様にぴったりのメニューです。',
          zhCN:
            '由餐厅精心甄选的日本清酒品鉴套组。是希望品尝、比较并探索优质日本清酒不同风味的' +
            '国际游客的完美选择。',
          zhTW:
            '由餐廳精心甄選的日本清酒品鑑套組。是希望品嚐、比較並探索優質日本清酒不同風味的' +
            '國際遊客的完美選擇。',
          ko:
            '레스토랑이 엄선한 고급 일본 사케 테이스팅 세트입니다. 프리미엄 일본 사케의 다양한 ' +
            '풍미를 맛보고 비교하며 발견하고 싶은 해외 손님들에게 완벽한 메뉴입니다.',
        },
      },
    ],
  },

  {
    id: 'kozanro',
    name: 'Kozanro',
    nameJa: '江山楼',
    nameI18n: { en: 'Kozanro', zhCN: '江山楼', zhTW: '江山樓', ko: '코잔로', ja: '江山楼' },
    heroDish: { name: { en: 'Special Champon', zhCN: '特制什锦面', zhTW: '特製什錦麵', ko: '특제 짬뽕', ja: '特製ちゃんぽん' }, price: '¥2,000–', image: 'exterior.jpg' },
    // 中華街の店は他の飲食店と区別できるよう、専用のカテゴリー（＝専用のピン）にしている。
    category: 'Chinese',
    area: 'Shinchi Chinatown',
    areaJa: '長崎市新地町',
    areaI18n: { en: 'Shinchi Chinatown', zhCN: '新地中华街', zhTW: '新地中華街', ko: '신치 차이나타운', ja: '長崎市新地町' },

    map: { x: 44, y: 46 },
    geo: { lat: 32.741222, lng: 129.87587 },
    address: '〒850-0842 長崎県長崎市新地町13-13',
    hours: {
      sun: ['11:00–15:00', '17:00–20:30'],
      mon: null, // 定休日
      tue: null, // 定休日
      wed: ['11:30–15:00', '17:00–20:30'],
      thu: ['11:30–15:00', '17:00–20:30'],
      fri: ['11:30–15:00', '17:00–20:30'],
      sat: ['11:00–15:00', '17:00–20:30'],
    },

    photoBase: '/shops/kozanro',
    exterior: 'exterior.jpg',

    description: {
      en:
        'Kozanro is one of the most famous and historic Chinese restaurants in ' +
        'Nagasaki Shinchi Chinatown. Renowned for perfecting Nagasaki’s legendary ' +
        'culinary specialties, it is considered a must-visit spot for anyone wanting ' +
        'to taste authentic Champon and Sara Udon. Its greatest pride is the signature ' +
        'Champon broth made from 100% chicken bones, creating a rich, milky paitan soup ' +
        'that is deeply flavorful yet remarkably clean and crisp. With its grand, ' +
        'traditional decor, Kozanro offers an exceptional atmosphere for international ' +
        'travelers to enjoy high-quality Nagasaki-style Chinese cuisine.',
      ja:
        '江山楼は、長崎新地中華街を代表する老舗の中華料理店です。長崎名物を極めた店として' +
        '知られ、本場のちゃんぽんと皿うどんを味わうなら外せない一軒とされています。' +
        '最大の自慢は、鶏ガラ100％でとった看板のちゃんぽんスープ。濃厚な白湯でありながら、' +
        '後味は驚くほど澄んでいてすっきりとしています。風格ある伝統的な内装で、海外からの' +
        'お客様が上質な長崎中華を楽しむのにふさわしい雰囲気です。',
      zhCN:
        '江山楼是长崎新地中华街最著名的老字号中餐厅之一。以将长崎名菜做到极致而闻名，' +
        '想品尝正宗什锦面（强棒面）和什锦烩面的人都不可错过。最引以为傲的是招牌汤底——' +
        '以100%鸡骨熬制的白汤，浓郁奶白却又十分清爽干净。店内装潢气派传统，' +
        '是外国游客享用高品质长崎中华料理的绝佳去处。',
      zhTW:
        '江山樓是長崎新地中華街最著名的老字號中餐廳之一。以將長崎名菜做到極致而聞名，' +
        '想品嚐道地什錦麵（強棒麵）與什錦燴麵的人都不可錯過。最引以為傲的是招牌湯底——' +
        '以100%雞骨熬製的白湯，濃郁奶白卻又十分清爽乾淨。店內裝潢氣派傳統，' +
        '是外國旅客享用高品質長崎中華料理的絕佳去處。',
      ko:
        '고잔로(江山楼)는 나가사키 신치 차이나타운을 대표하는 역사 깊은 중식당입니다. ' +
        '나가사키 명물 요리를 완성한 곳으로 유명해, 정통 짬뽕과 사라우동을 맛보고 싶다면 ' +
        '반드시 들러야 할 가게로 꼽힙니다. 가장 큰 자랑은 닭뼈 100%로 우려낸 짬뽕 육수로, ' +
        '진한 유백색 국물이면서도 뒷맛은 놀랍도록 깔끔합니다. 웅장하고 전통적인 인테리어로, ' +
        '해외 여행객이 수준 높은 나가사키식 중화요리를 즐기기에 좋은 분위기입니다.',
    },

    menu: [
      {
        id: 'tokujo-champon',
        name: 'Special Champon',
        nameJa: '特上ちゃんぽん',
        nameI18n: { en: 'Special Champon', zhCN: '特上什锦面', zhTW: '特上什錦麵', ko: '특상 짬뽕', ja: '特上ちゃんぽん' },
        romaji: 'Tokujo champon',
        price: 'Approx. ¥2,000 – ¥2,200',
        img: 'menu1.jpg',
        description: {
          en:
            'Kozanro’s legendary specialty noodle soup, featuring their signature 100% ' +
            'chicken broth. Loaded with chewy noodles, fresh shrimp, squid, pork, seasonal ' +
            'vegetables, and topped with premium delicacies like shark fin.',
          ja:
            '鶏ガラ100％の看板スープでいただく、江山楼を代表する名物麺。もちもちの麺に、' +
            '新鮮な海老やイカ、豚肉、旬の野菜がたっぷり入り、フカヒレなどの高級食材が' +
            '添えられます。',
          zhCN:
            '以100%鸡骨招牌汤底烹制的江山楼名物面食。弹牙的面条搭配新鲜虾仁、鱿鱼、猪肉与' +
            '时令蔬菜，并以鱼翅等高级食材点缀。',
          zhTW:
            '以100%雞骨招牌湯底烹製的江山樓名物麵食。彈牙的麵條搭配新鮮蝦仁、花枝、豬肉與' +
            '時令蔬菜，並以魚翅等高級食材點綴。',
          ko:
            '닭뼈 100% 육수로 만든 고잔로의 대표 명물 면 요리. 쫄깃한 면에 신선한 새우와 ' +
            '오징어, 돼지고기, 제철 채소가 듬뿍 들어가고 샥스핀 등 고급 재료가 올라갑니다.',
        },
      },
      {
        id: 'tokujo-sara-udon',
        name: 'Special Crispy Noodles',
        nameJa: '特上皿うどん',
        nameI18n: { en: 'Special Crispy Noodles', zhCN: '特上炒乌冬脆面', zhTW: '特上炒烏龍脆麵', ko: '특상 사라우동', ja: '特上皿うどん' },
        romaji: 'Tokujo sara udon',
        price: 'Approx. ¥2,000 – ¥2,200',
        img: 'menu2.jpg',
        description: {
          en:
            'Thin, extra-crispy fried noodles smothered in a thick, savory seafood and ' +
            'vegetable gravy. You can enjoy the delicious contrast between the crunchy ' +
            'noodles and the hot, flavorful sauce.',
          ja:
            'パリパリに揚げた細麺に、海鮮と野菜のとろみのあるあんをたっぷりかけた一皿。' +
            '香ばしい麺と熱々のあんの食感の違いが楽しめます。',
          zhCN:
            '细面炸至酥脆，再淋上浓稠鲜美的海鲜蔬菜芡汁。酥脆的面条与热腾腾的酱汁形成' +
            '美妙对比。',
          zhTW:
            '細麵炸至酥脆，再淋上濃稠鮮美的海鮮蔬菜芡汁。酥脆的麵條與熱騰騰的醬汁形成' +
            '美妙對比。',
          ko:
            '바삭하게 튀긴 가는 면 위에 해산물과 채소가 들어간 걸쭉한 소스를 듬뿍 얹었습니다. ' +
            '바삭한 면과 뜨거운 소스의 대비가 매력입니다.',
        },
      },
      {
        id: 'sweet-sour-pork',
        name: 'Sweet and Sour Pork',
        nameJa: '酢豚',
        nameI18n: { en: 'Sweet and Sour Pork', zhCN: '糖醋肉', zhTW: '糖醋肉', ko: '탕수육', ja: '酢豚' },
        img: 'menu5.jpg',
        description: {
          en:
            'Bite-sized fried pork tossed with onion, bell pepper, and pineapple in a ' +
            'tangy-sweet sauce — a comforting classic on any Chinese-restaurant table.',
          ja:
            '一口大の豚肉を揚げ、玉ねぎ・ピーマン・パイナップルと共に甘酢あんで仕上げた' +
            '定番の一皿です。',
          zhCN:
            '一口大小的炸猪肉，与洋葱、青椒、菠萝一同裹上酸甜芡汁，是中餐桌上的经典家常菜。',
          zhTW:
            '一口大小的炸豬肉，與洋蔥、青椒、鳳梨一同裹上酸甜芡汁，是中餐桌上的經典家常菜。',
          ko:
            '한입 크기로 튀긴 돼지고기를 양파, 피망, 파인애플과 함께 새콤달콤한 소스로 ' +
            '버무린 중화요리의 정석입니다.',
        },
      },
      {
        id: 'dongpo-rou',
        name: 'Braised Pork Belly',
        nameJa: '東坡肉',
        nameI18n: { en: 'Braised Pork Belly', zhCN: '东坡肉', zhTW: '東坡肉', ko: '동파육', ja: '東坡肉' },
        romaji: 'Tonporo',
        price: 'Approx. ¥800 – ¥1,200 per portion',
        img: 'menu3.jpg',
        description: {
          en:
            'Succulent pork belly slow-braised in a sweet and savory soy-sauce glaze until ' +
            'it melts in your mouth. A classic, comforting dish that highlights traditional ' +
            'Chinese cooking techniques.',
          ja:
            '豚バラ肉を甘辛い醤油だれでじっくり煮込み、口の中でとろけるほど柔らかく' +
            '仕上げた一品。中国料理の伝統的な技が光る、定番の味わいです。',
          zhCN:
            '五花肉以甜咸酱汁慢火炖煮至入口即化。是一道展现中华传统烹饪技艺的经典佳肴。',
          zhTW:
            '五花肉以甜鹹醬汁慢火燉煮至入口即化。是一道展現中華傳統烹飪技藝的經典佳餚。',
          ko:
            '삼겹살을 달콤짭짤한 간장 소스에 오래 조려 입에서 녹을 정도로 부드럽게 ' +
            '완성했습니다. 중국 전통 조리법이 돋보이는 고전적인 요리입니다.',
        },
      },
      {
        id: 'fukahire-soup',
        name: 'Shark Fin Soup',
        nameJa: 'フカヒレスープ',
        nameI18n: { en: 'Shark Fin Soup', zhCN: '鱼翅汤', zhTW: '魚翅湯', ko: '샥스핀 수프', ja: 'フカヒレスープ' },
        romaji: 'Fukahire soup',
        price: 'Approx. ¥1,800 – ¥2,500',
        img: 'menu4.jpg',
        description: {
          en:
            'A luxurious, silky soup featuring premium shark fin simmered in a rich, ' +
            'flavorful broth. An elegant dish that adds a touch of high-end indulgence ' +
            'to your meal.',
          ja:
            '上質なフカヒレを、旨みのあるスープでじっくり煮込んだ贅沢な一品。' +
            'なめらかな口当たりで、食事に華やかさを添えます。',
          zhCN:
            '选用上等鱼翅，以浓郁高汤慢火炖煮而成的奢华汤品。口感滑顺，为整桌菜增添' +
            '高级风味。',
          zhTW:
            '選用上等魚翅，以濃郁高湯慢火燉煮而成的奢華湯品。口感滑順，為整桌菜餚增添' +
            '高級風味。',
          ko:
            '고급 샥스핀을 진한 육수에 천천히 끓여낸 호화로운 수프. 부드러운 목넘김으로 ' +
            '식사에 품격을 더합니다.',
        },
      },
    ],
  },

  {
    id: 'kairakuen',
    name: 'Kairakuen',
    nameJa: '会楽園',
    nameI18n: { en: 'Kairakuen', zhCN: '会乐园', zhTW: '會樂園', ko: '카이라쿠엔', ja: '会楽園' },
    heroDish: { name: { en: 'Nagasaki Champon', zhCN: '长崎什锦面', zhTW: '長崎什錦麵', ko: '나가사키 짬뽕', ja: '長崎ちゃんぽん' }, price: '¥1,200', image: 'menu1.jpg' },
    category: 'Chinese',
    area: 'Shinchi Chinatown',
    areaJa: '長崎市新地町',
    areaI18n: { en: 'Shinchi Chinatown', zhCN: '新地中华街', zhTW: '新地中華街', ko: '신치 차이나타운', ja: '長崎市新地町' },

    map: { x: 42, y: 48 },
    geo: { lat: 32.741982, lng: 129.875717 },
    address: '〒850-0842 長崎県長崎市新地町10-16',
    hours: {
      sun: ['11:00–14:30', '17:00–19:50'],
      mon: ['11:00–14:30', '17:00–19:50'],
      tue: ['11:00–14:30', '17:00–19:50'],
      wed: ['11:00–14:30', '17:00–19:50'],
      thu: ['11:00–14:30', '17:00–19:50'],
      fri: ['11:00–14:30', '17:00–19:50'],
      sat: ['11:00–14:30', '17:00–19:50'],
    },

    photoBase: '/shops/kairakuen',
    exterior: 'exterior.jpg',

    description: {
      en:
        'Kairakuen is one of the historic Chinese restaurants in Nagasaki Shinchi ' +
        'Chinatown, founded in the early Showa period. Its signature Champon broth ' +
        'features a perfected 7:3 ratio of chicken bones to pork bones, developed ' +
        'through years of trial and error. Flash-cooked over high heat, the dish ' +
        'combines a deeply flavorful soup with perfectly crisp, fresh vegetables. ' +
        'It offers a warm, comfortable atmosphere where international travelers can ' +
        'taste the fine fusion of traditional Chinese techniques and Nagasaki’s rich ' +
        'food culture.',
      ja:
        '会楽園は、昭和初期に創業した長崎新地中華街の老舗中華料理店です。看板のちゃんぽん' +
        'スープは、長年の試行錯誤の末にたどり着いた鶏ガラと豚骨の7対3の配合。強火で一気に' +
        '仕上げることで、旨みの濃いスープとシャキシャキの野菜が見事に調和します。' +
        '中国伝統の技と長崎の豊かな食文化の融合を、海外からのお客様が落ち着いた雰囲気の中で' +
        '味わえる一軒です。',
      zhCN:
        '会乐园是创业于昭和初期的长崎新地中华街老字号中餐厅。招牌什锦面汤底采用历经多年' +
        '钻研调配出的鸡骨与猪骨7比3的黄金比例，以猛火快炒一气呵成，让浓郁的汤头与爽脆的' +
        '蔬菜完美融合。店内气氛温馨舒适，外国游客可在此品尝中国传统技艺与长崎饮食文化的' +
        '精彩结合。',
      zhTW:
        '會樂園是創業於昭和初期的長崎新地中華街老字號中餐廳。招牌什錦麵湯底採用歷經多年' +
        '鑽研調配出的雞骨與豬骨7比3的黃金比例，以猛火快炒一氣呵成，讓濃郁的湯頭與爽脆的' +
        '蔬菜完美融合。店內氣氛溫馨舒適，外國旅客可在此品嚐中國傳統技藝與長崎飲食文化的' +
        '精彩結合。',
      ko:
        '가이라쿠엔(会楽園)은 쇼와 초기에 문을 연 나가사키 신치 차이나타운의 노포 중식당입니다. ' +
        '간판 짬뽕 육수는 오랜 시행착오 끝에 완성한 닭뼈와 돼지뼈 7대 3의 배합이 특징입니다. ' +
        '센 불에서 단숨에 볶아내어 진한 국물과 아삭한 채소가 훌륭하게 어우러집니다. ' +
        '중국 전통 기법과 나가사키의 풍부한 식문화가 어우러진 맛을 편안한 분위기에서 ' +
        '즐길 수 있습니다.',
    },

    menu: [
      {
        id: 'nagasaki-champon',
        name: 'Nagasaki Champon',
        nameJa: '長崎ちゃんぽん',
        nameI18n: { en: 'Nagasaki Champon', zhCN: '长崎什锦面', zhTW: '長崎什錦麵', ko: '나가사키 짬뽕', ja: '長崎ちゃんぽん' },
        romaji: 'Nagasaki champon',
        price: '¥1,200',
        img: 'menu1.jpg',
        description: {
          en:
            'The iconic noodle dish of Nagasaki. Features chewy noodles in a signature ' +
            'chicken-and-pork blend broth, topped with crisp vegetables and rich seafood ' +
            'and pork.',
          ja:
            '長崎を代表する名物麺。鶏ガラと豚骨を合わせた看板スープに、もちもちの麺と' +
            'シャキシャキの野菜、海鮮や豚肉がたっぷり入ります。',
          zhCN:
            '长崎最具代表性的面食。以鸡骨与猪骨调配的招牌汤底，搭配弹牙面条、爽脆蔬菜' +
            '以及丰富的海鲜和猪肉。',
          zhTW:
            '長崎最具代表性的麵食。以雞骨與豬骨調配的招牌湯底，搭配彈牙麵條、爽脆蔬菜' +
            '以及豐富的海鮮與豬肉。',
          ko:
            '나가사키를 대표하는 명물 면 요리. 닭뼈와 돼지뼈를 함께 우린 간판 육수에 ' +
            '쫄깃한 면과 아삭한 채소, 해산물과 돼지고기가 듬뿍 들어갑니다.',
        },
      },
      {
        id: 'chili-crab',
        name: 'Deep-Fried Crab in Chili Sauce',
        nameJa: 'カニのチリソース',
        nameI18n: { en: 'Deep-Fried Crab in Chili Sauce', zhCN: '辣椒蟹', zhTW: '辣椒蟹', ko: '칠리 크랩', ja: 'カニのチリソース' },
        romaji: 'Kani no chili sauce',
        price: '¥1,700',
        img: 'menu2.jpg',
        description: {
          en:
            'Crispy deep-fried crab tossed in a sweet, savory, and spicy chili sauce. ' +
            'A luxurious dish with an irresistible aroma that pairs perfectly with a cold ' +
            'beer or a bowl of rice.',
          ja:
            'カラッと揚げたカニを、甘辛いチリソースで絡めた一品。食欲をそそる香りで、' +
            '冷えたビールにもご飯にもよく合う贅沢な料理です。',
          zhCN:
            '将螃蟹酥炸后裹上甜辣可口的辣酱。香气诱人，无论配冰啤酒还是白饭都十分对味的' +
            '豪华料理。',
          zhTW:
            '將螃蟹酥炸後裹上甜辣可口的辣醬。香氣誘人，無論配冰啤酒或白飯都十分對味的' +
            '豪華料理。',
          ko:
            '바삭하게 튀긴 게에 달콤하고 매콤한 칠리소스를 버무렸습니다. 식욕을 돋우는 ' +
            '향으로 시원한 맥주에도 밥에도 잘 어울리는 호화로운 요리입니다.',
        },
      },
      {
        id: 'yurinchi',
        name: 'Crispy Chicken with Sweet Soy Sauce',
        nameJa: '油淋鶏',
        nameI18n: { en: 'Crispy Chicken with Sweet Soy Sauce', zhCN: '油淋鸡', zhTW: '油淋雞', ko: '유린기', ja: '油淋鶏' },
        romaji: 'Yurinchi',
        price: '¥1,600',
        img: 'menu3.jpg',
        description: {
          en:
            'Crispy, deep-fried chicken topped with a savory sweet-and-sour soy sauce, ' +
            'scallions, and a touch of chili. Juicy on the inside and crunchy on the ' +
            'outside, it is a crowd-pleasing Chinese classic.',
          ja:
            'カリッと揚げた鶏肉に、甘酸っぱい醤油だれとねぎ、少しの唐辛子をかけた一品。' +
            '外はサクサク、中はジューシーで、幅広く好まれる中華の定番です。',
          zhCN:
            '酥炸鸡肉淋上酸甜酱油汁，再撒上葱花与少许辣椒。外酥内嫩，是老少咸宜的中华' +
            '经典菜。',
          zhTW:
            '酥炸雞肉淋上酸甜醬油汁，再撒上蔥花與少許辣椒。外酥內嫩，是老少咸宜的中華' +
            '經典菜。',
          ko:
            '바삭하게 튀긴 닭고기에 새콤달콤한 간장 소스와 파, 약간의 고추를 곁들였습니다. ' +
            '겉은 바삭하고 속은 촉촉한, 누구나 좋아하는 중식 대표 요리입니다.',
        },
      },
      {
        id: 'mapo-tofu',
        name: 'Mapo Tofu',
        nameJa: '麻婆豆腐',
        nameI18n: { en: 'Mapo Tofu', zhCN: '麻婆豆腐', zhTW: '麻婆豆腐', ko: '마파두부', ja: '麻婆豆腐' },
        romaji: 'Mabo dofu',
        price: '¥1,000',
        img: 'menu4.jpg',
        description: {
          en:
            'Smooth tofu simmered with minced pork in a flavorful, spicy sauce balanced ' +
            'with Sichuan peppers and rich soybean paste. A comforting and satisfying dish ' +
            'that goes exceptionally well with steamed rice.',
          ja:
            'なめらかな豆腐と豚ひき肉を、花椒とコクのある豆板醤のきいたピリ辛のたれで' +
            '煮込んだ一品。白いご飯が進む、満足感のある味わいです。',
          zhCN:
            '滑嫩豆腐与猪肉末，以花椒与浓郁豆瓣酱调和的麻辣酱汁炖煮而成。下饭又满足的' +
            '经典家常味。',
          zhTW:
            '滑嫩豆腐與豬絞肉，以花椒與濃郁豆瓣醬調和的麻辣醬汁燉煮而成。下飯又滿足的' +
            '經典家常味。',
          ko:
            '부드러운 두부와 다진 돼지고기를 산초와 진한 두반장이 어우러진 매콤한 소스에 ' +
            '끓였습니다. 흰밥과 특히 잘 어울리는 든든한 요리입니다.',
        },
      },
    ],
  },

  {
    id: 'kyokaen',
    name: 'Kyokaen',
    nameJa: '京香園',
    nameI18n: { en: 'Kyokaen', zhCN: '京香园', zhTW: '京香園', ko: '교카엔', ja: '京香園' },
    heroDish: { name: { en: 'Hot and Sour Soup', zhCN: '酸辣汤', zhTW: '酸辣湯', ko: '쏸라탕', ja: '酸辣湯' }, price: '¥1,100', image: 'menu3.jpg' },
    category: 'Chinese',
    area: 'Shinchi Chinatown',
    areaJa: '長崎市新地町',
    areaI18n: { en: 'Shinchi Chinatown', zhCN: '新地中华街', zhTW: '新地中華街', ko: '신치 차이나타운', ja: '長崎市新地町' },

    map: { x: 40, y: 47 },
    geo: { lat: 32.741905, lng: 129.875595 },
    address: '〒850-0842 長崎県長崎市新地町9-7',
    hours: {
      sun: ['11:00–14:30', '17:00–19:30'],
      mon: ['11:00–14:30', '17:00–19:30'],
      tue: ['11:00–14:30', '17:00–19:30'],
      wed: ['11:00–14:30', '17:00–19:30'],
      thu: ['11:00–14:30', '17:00–19:30'],
      fri: ['11:00–14:30', '17:00–19:30'],
      sat: ['11:00–14:30', '17:00–19:50'],
    },

    photoBase: '/shops/kyokaen',
    exterior: 'exterior.jpg',

    description: {
      en:
        'Kyokaen is a historic Chinese restaurant conveniently located right at the ' +
        'entrance of Nagasaki Shinchi Chinatown. Its signature Champon broth features ' +
        'a 1:2 blend of pork bones to chicken bones, creating a light, smooth, and ' +
        'refreshing soup flavor. Unlike traditional methods, the noodles are boiled ' +
        'separately in a different pot, ensuring the vegetables retain their fresh, ' +
        'crisp texture. Offering a spacious dining room and comfortable atmosphere, ' +
        'Kyokaen provides an authentic Nagasaki-Chinese dining experience for ' +
        'international visitors.',
      ja:
        '京香園は、長崎新地中華街の入口すぐという便利な場所にある老舗の中華料理店です。' +
        '看板のちゃんぽんスープは豚骨と鶏ガラを1対2で合わせたもので、軽やかでまろやか、' +
        'すっきりとした味わいに仕上がっています。麺を別の鍋で茹でる独自の作り方により、' +
        '野菜のシャキシャキとした食感が保たれているのも特徴です。ゆったりとした客席と' +
        '落ち着いた雰囲気で、海外からのお客様も本場の長崎中華を楽しめます。',
      zhCN:
        '京香园是位于长崎新地中华街入口处的老字号中餐厅，交通十分便利。招牌什锦面汤底' +
        '以猪骨与鸡骨1比2的比例调配，口感清爽顺滑。与传统做法不同，面条以另一锅单独煮制，' +
        '因此蔬菜能保持爽脆新鲜的口感。店内空间宽敞、气氛舒适，让外国游客也能享受道地的' +
        '长崎中华料理。',
      zhTW:
        '京香園是位於長崎新地中華街入口處的老字號中餐廳，交通十分便利。招牌什錦麵湯底' +
        '以豬骨與雞骨1比2的比例調配，口感清爽順滑。與傳統做法不同，麵條以另一鍋單獨煮製，' +
        '因此蔬菜能保持爽脆新鮮的口感。店內空間寬敞、氣氛舒適，讓外國旅客也能享受道地的' +
        '長崎中華料理。',
      ko:
        '교카엔(京香園)은 나가사키 신치 차이나타운 입구 바로 앞에 자리한 역사 깊은 중식당입니다. ' +
        '간판 짬뽕 육수는 돼지뼈와 닭뼈를 1대 2로 배합해 가볍고 부드러우며 깔끔한 맛을 냅니다. ' +
        '전통적인 방식과 달리 면을 다른 냄비에서 따로 삶아, 채소의 아삭한 식감이 그대로 ' +
        '살아 있습니다. 넓은 홀과 편안한 분위기에서 해외 여행객도 정통 나가사키 중화요리를 ' +
        '즐길 수 있습니다.',
    },

    menu: [
      {
        id: 'nagasaki-champon',
        name: 'Nagasaki Champon',
        nameJa: '長崎ちゃんぽん',
        nameI18n: { en: 'Nagasaki Champon', zhCN: '长崎什锦面', zhTW: '長崎什錦麵', ko: '나가사키 짬뽕', ja: '長崎ちゃんぽん' },
        romaji: 'Nagasaki champon',
        price: '¥1,200',
        img: 'menu1.jpg',
        description: {
          en:
            "Kyokaen's signature noodle dish. Served in a lighter, clean broth made with " +
            'a 1:2 blend of pork and chicken bones. The noodles are boiled separately, ' +
            'keeping the colorful topping of seafood, pork, and seasonal vegetables ' +
            'beautifully crisp and fresh.',
          ja:
            '京香園の看板の麺料理。豚骨と鶏ガラを1対2で合わせた、軽やかで澄んだスープが' +
            '特徴です。麺を別に茹でているため、海鮮や豚肉、旬の野菜の彩りと食感が' +
            'そのまま生きています。',
          zhCN:
            '京香园的招牌面食。汤底以猪骨与鸡骨1比2调配，清爽不腻。由于面条单独煮制，' +
            '海鲜、猪肉与时令蔬菜都保持着鲜艳的色泽与爽脆口感。',
          zhTW:
            '京香園的招牌麵食。湯底以豬骨與雞骨1比2調配，清爽不膩。由於麵條單獨煮製，' +
            '海鮮、豬肉與時令蔬菜都保持著鮮豔的色澤與爽脆口感。',
          ko:
            '교카엔의 간판 면 요리. 돼지뼈와 닭뼈를 1대 2로 배합한 가볍고 깔끔한 육수가 ' +
            '특징입니다. 면을 따로 삶아 해산물과 돼지고기, 제철 채소의 색과 아삭한 식감이 ' +
            '그대로 살아 있습니다.',
        },
      },
      {
        id: 'kourou-fan',
        name: 'Braised Pork Belly Rice Bowl',
        nameJa: '角煮飯',
        nameI18n: { en: 'Braised Pork Belly Rice Bowl', zhCN: '红烧猪肉盖饭', zhTW: '紅燒豬肉蓋飯', ko: '가쿠니 덮밥', ja: '角煮飯' },
        romaji: 'Kakuni meshi',
        price: 'Approx. ¥1,200',
        img: 'menu2.jpg',
        description: {
          en:
            'A specialty rice bowl topped with thick, melt-in-your-mouth braised pork belly ' +
            '(Dongpo pork) smothered in a rich, savory-sweet soy glaze. A comforting and ' +
            'satisfying option for lovers of braised meats.',
          ja:
            'とろけるように柔らかい厚切りの角煮を、甘辛い醤油だれごとご飯にのせた名物丼。' +
            '煮込み料理が好きな方にはたまらない、満足感のある一杯です。',
          zhCN:
            '将入口即化的厚切东坡肉连同甜咸酱汁一起盖在米饭上的招牌盖饭。喜爱炖煮肉类的人' +
            '一定会满足。',
          zhTW:
            '將入口即化的厚切東坡肉連同甜鹹醬汁一起蓋在米飯上的招牌蓋飯。喜愛燉煮肉類的人' +
            '一定會滿足。',
          ko:
            '입에서 녹을 정도로 부드러운 두툼한 동파육을 달콤짭짤한 간장 소스와 함께 밥 위에 ' +
            '올린 명물 덮밥. 조림 요리를 좋아하는 분께 안성맞춤인 든든한 한 그릇입니다.',
        },
      },
      {
        id: 'suanlatang',
        name: 'Hot and Sour Soup',
        nameJa: '酸辣湯',
        nameI18n: { en: 'Hot and Sour Soup', zhCN: '酸辣汤', zhTW: '酸辣湯', ko: '쏸라탕', ja: '酸辣湯' },
        romaji: 'Sanratan',
        price: 'Approx. ¥1,100',
        img: 'menu3.jpg',
        description: {
          en:
            'A hearty, flavorful soup characterized by its perfect balance of spicy chili ' +
            'heat and refreshing acidity. Packed with bamboo shoots, mushrooms, tofu, and ' +
            'shredded meat, it warms the body and stimulates the appetite.',
          ja:
            '辛さと酸味の絶妙なバランスが持ち味の、具だくさんのスープ。たけのこ、きのこ、' +
            '豆腐、細切りの肉がたっぷり入り、体が温まって食欲もわいてきます。',
          zhCN:
            '以辣与酸的绝妙平衡为特色的浓郁汤品。竹笋、菇类、豆腐与肉丝料多实在，' +
            '既暖身又开胃。',
          zhTW:
            '以辣與酸的絕妙平衡為特色的濃郁湯品。竹筍、菇類、豆腐與肉絲料多實在，' +
            '既暖身又開胃。',
          ko:
            '매콤함과 새콤함의 절묘한 균형이 매력인 건더기 가득한 수프. 죽순과 버섯, 두부, ' +
            '채썬 고기가 듬뿍 들어가 몸을 따뜻하게 하고 식욕을 돋웁니다.',
        },
      },
      {
        id: 'shumai',
        name: 'Steamed Pork Dumplings',
        nameJa: 'シュウマイ',
        nameI18n: { en: 'Steamed Pork Dumplings', zhCN: '烧卖', zhTW: '燒賣', ko: '슈마이', ja: 'シュウマイ' },
        romaji: 'Shumai',
        price: 'Approx. ¥800 per portion',
        img: 'menu4.jpg',
        description: {
          en:
            'Plump, hand-crafted steamed dumplings stuffed with juicy minced pork and ' +
            'onions, wrapped in a thin dough. Hot, tender, and an ideal side dish or ' +
            'appetizer to share alongside a bowl of Champon.',
          ja:
            '薄い皮で包んだ、ふっくらとした手作りのシュウマイ。ジューシーな豚ひき肉と' +
            '玉ねぎの餡が詰まっています。熱々でやわらかく、ちゃんぽんと一緒に分け合う' +
            '一品としても最適です。',
          zhCN:
            '以薄皮包裹、手工制作的饱满烧卖，内馅是多汁的猪肉末与洋葱。热腾腾又软嫩，' +
            '很适合搭配什锦面一起分享。',
          zhTW:
            '以薄皮包裹、手工製作的飽滿燒賣，內餡是多汁的豬絞肉與洋蔥。熱騰騰又軟嫩，' +
            '很適合搭配什錦麵一起分享。',
          ko:
            '얇은 피로 감싼 통통한 수제 슈마이. 육즙 가득한 다진 돼지고기와 양파 소가 ' +
            '들어 있습니다. 뜨겁고 부드러워 짬뽕과 함께 나눠 먹기에 좋습니다.',
        },
      },
    ],
  },

  {
    id: 'laolee',
    name: 'Lao Lee',
    nameJa: '老李',
    nameI18n: { en: 'Lao Lee', zhCN: '老李', zhTW: '老李', ko: '라오리', ja: '老李' },
    heroDish: { name: { en: 'Lao Lee Set Menu', zhCN: '老李套餐', zhTW: '老李套餐', ko: '라오리 세트', ja: '老李セット' }, price: '¥1,650', image: 'menu1.jpg' },
    category: 'Chinese',
    area: 'Shinchi Chinatown',
    areaJa: '長崎市新地町',
    areaI18n: { en: 'Shinchi Chinatown', zhCN: '新地中华街', zhTW: '新地中華街', ko: '신치 차이나타운', ja: '長崎市新地町' },

    map: { x: 41, y: 50 },
    geo: { lat: 32.74094, lng: 129.875504 },
    address: '〒850-0842 長崎県長崎市新地町12-7',
    hours: {
      sun: ['11:30–14:30', '17:00–21:30'],
      mon: ['11:30–14:30', '17:00–21:30'],
      tue: ['11:30–14:30', '17:00–21:30'],
      wed: ['11:30–14:30', '17:00–21:30'],
      thu: ['11:30–14:30', '17:00–21:30'],
      fri: ['11:30–14:30', '17:00–21:30'],
      sat: ['11:30–14:30', '17:00–21:30'],
    },

    photoBase: '/shops/laolee',
    exterior: 'exterior.jpg',

    description: {
      en:
        'Lao Lee is a hugely popular Taiwanese-style Chinese restaurant located in ' +
        'Nagasaki Shinchi Chinatown. Its signature Champon features a rich 100% chicken ' +
        'broth that pairs flawlessly with exclusive noodles crafted by Shinchi Noodle ' +
        'Factory, made using Nagasaki’s traditional Karaaku lye water for an authentic ' +
        'texture. Renowned for its juicy water dumplings and vibrant Taiwanese fusion ' +
        'dishes, Lao Lee offers a welcoming atmosphere and a satisfying culinary ' +
        'experience for international travelers.',
      ja:
        '老李（ラオリー）は、長崎新地中華街にある台湾料理系の人気中華料理店です。看板の' +
        'ちゃんぽんは鶏ガラ100％の濃厚なスープが特徴で、長崎伝統の唐灰汁（とうあく）を' +
        '使って新地製麺所が作る専用の麺と見事に合わさります。肉汁あふれる水餃子や、' +
        '彩り豊かな台湾料理でも知られ、海外からのお客様も気軽に立ち寄れる雰囲気です。',
      zhCN:
        '老李是位于长崎新地中华街的人气台式中华料理店。招牌什锦面采用100%鸡骨熬制的浓郁' +
        '汤底，搭配新地制面厂以长崎传统唐灰汁制作的专用面条，口感道地。店内以多汁的水饺' +
        '和丰富的台湾料理闻名，气氛亲切，是外国游客也能尽情享用的一家餐厅。',
      zhTW:
        '老李是位於長崎新地中華街的人氣台式中華料理店。招牌什錦麵採用100%雞骨熬製的濃郁' +
        '湯底，搭配新地製麵廠以長崎傳統唐灰汁製作的專用麵條，口感道地。店內以多汁的水餃' +
        '和豐富的台灣料理聞名，氣氛親切，是外國旅客也能盡情享用的一家餐廳。',
      ko:
        '라오리(老李)는 나가사키 신치 차이나타운에 자리한 인기 대만식 중화요리점입니다. ' +
        '간판 짬뽕은 닭뼈 100%로 우려낸 진한 육수가 특징이며, 나가사키 전통의 도아쿠(간수)로 ' +
        '만든 신치 제면소의 전용 면과 훌륭하게 어우러집니다. 육즙 가득한 물만두와 다채로운 ' +
        '대만 요리로도 유명하며, 해외 여행객도 편안하게 즐길 수 있는 분위기입니다.',
    },

    menu: [
      {
        id: 'laolee-set',
        name: 'Lao Lee Set Menu',
        nameJa: '老李セット',
        nameI18n: { en: 'Lao Lee Set Menu', zhCN: '老李套餐', zhTW: '老李套餐', ko: '라오리 세트', ja: '老李セット' },
        romaji: 'Lao Lee set',
        price: '¥1,650',
        img: 'menu1.jpg',
        description: {
          en:
            'An ultimate value set featuring Taiwanese ramen, fragrant fried rice, juicy ' +
            'signature boiled dumplings (Sui-Gyoza), and a delightful dessert. A perfect ' +
            "all-in-one meal to taste Lao Lee's most popular specialties.",
          ja:
            '台湾ラーメン、香ばしいチャーハン、名物の肉汁あふれる水餃子、デザートまで' +
            'そろったお得なセット。老李の人気料理をまとめて味わえる一皿です。',
          zhCN:
            '包含台湾拉面、香喷喷的炒饭、招牌多汁水饺以及甜点的超值套餐。可以一次品尝' +
            '老李最受欢迎的招牌料理。',
          zhTW:
            '包含台灣拉麵、香噴噴的炒飯、招牌多汁水餃以及甜點的超值套餐。可以一次品嚐' +
            '老李最受歡迎的招牌料理。',
          ko:
            '대만 라멘과 고소한 볶음밥, 명물인 육즙 가득한 물만두, 디저트까지 갖춘 알찬 세트. ' +
            '라오리의 인기 메뉴를 한 번에 맛볼 수 있습니다.',
        },
      },
      {
        id: 'karasumi-champon',
        name: 'Dried Mullet Roe Champon',
        nameJa: 'からすみちゃんぽん',
        nameI18n: { en: 'Dried Mullet Roe Champon', zhCN: '乌鱼子什锦面', zhTW: '烏魚子什錦麵', ko: '숭어알 짬뽕', ja: 'からすみちゃんぽん' },
        romaji: 'Karasumi champon',
        price: '¥1,540',
        img: 'menu2.jpg',
        description: {
          en:
            'A luxurious Nagasaki Champon topped generously with finely grated Karasumi ' +
            '(dried mullet roe), a famous local delicacy. The rich umami of the 100% ' +
            'chicken broth combined with the salty, complex flavour of Karasumi creates ' +
            'an unforgettable gourmet dish.',
          ja:
            '長崎名産のからすみをたっぷり削りかけた、贅沢な長崎ちゃんぽん。鶏ガラ100％の' +
            'スープの旨みと、からすみの塩気とコクが重なり、忘れられない一杯になります。',
          zhCN:
            '慷慨刨上长崎名产乌鱼子的奢华长崎什锦面。100%鸡骨汤底的浓郁鲜味与乌鱼子的' +
            '咸香层次交织，令人难忘。',
          zhTW:
            '慷慨刨上長崎名產烏魚子的奢華長崎什錦麵。100%雞骨湯底的濃郁鮮味與烏魚子的' +
            '鹹香層次交織，令人難忘。',
          ko:
            '나가사키 명산인 가라스미(어란)를 듬뿍 갈아 올린 호화로운 나가사키 짬뽕. ' +
            '닭뼈 100% 육수의 진한 감칠맛과 가라스미의 짭조름한 풍미가 어우러져 잊을 수 없는 ' +
            '한 그릇이 됩니다.',
        },
      },
      {
        id: 'juicy-gyoza',
        name: 'Original Nagasaki Juicy Boiled Dumplings',
        nameJa: '元祖長崎肉汁水餃子',
        nameI18n: { en: 'Original Nagasaki Juicy Boiled Dumplings', zhCN: '元祖长崎多汁水饺', zhTW: '元祖長崎多汁水餃', ko: '원조 나가사키 육즙 물만두', ja: '元祖長崎肉汁水餃子' },
        romaji: 'Ganso Nagasaki nikujiru sui-gyoza',
        price: '¥430',
        img: 'menu3.jpg',
        description: {
          en:
            "Lao Lee's award-winning signature dish. Tender dumpling wrappers stuffed with " +
            'a savoury pork filling that bursts with rich, flavourful juice in every bite.',
          ja:
            '数々の賞を受けた老李の看板料理。もちもちの皮に豚肉の餡を包み、噛むたびに' +
            '旨みたっぷりの肉汁があふれ出します。',
          zhCN:
            '老李屡获奖项的招牌菜。柔软的饺子皮包裹着猪肉馅，一口咬下鲜美的肉汁瞬间涌出。',
          zhTW:
            '老李屢獲獎項的招牌菜。柔軟的餃子皮包裹著豬肉餡，一口咬下鮮美的肉汁瞬間湧出。',
          ko:
            '여러 상을 받은 라오리의 간판 요리. 쫄깃한 만두피 속 돼지고기 소에서 한 입 베어 물 ' +
            '때마다 진한 육즙이 흘러넘칩니다.',
        },
      },
      {
        id: 'taiwanese-mazesoba',
        name: 'Taiwanese Mazesoba',
        nameJa: '台湾まぜそば',
        nameI18n: { en: 'Taiwanese Mazesoba', zhCN: '台湾拌面', zhTW: '台灣拌麵', ko: '타이완 마제소바', ja: '台湾まぜそば' },
        romaji: 'Taiwan mazesoba',
        price: '¥1,160',
        img: 'menu4.jpg',
        description: {
          en:
            'Flavourful brothless noodles topped with spicy minced pork, fresh scallions, ' +
            'minced garlic, seaweed and a raw egg yolk. Mix everything thoroughly before ' +
            'eating for a bold, addictive punch of Taiwanese flavour.',
          ja:
            'スープのない和えそば。ピリ辛の肉味噌、ねぎ、にんにく、海苔、卵黄をのせて' +
            'います。よく混ぜてから食べると、台湾料理らしい濃厚な味わいが楽しめます。',
          zhCN:
            '无汤拌面，铺上香辣肉燥、青葱、蒜末、海苔与生蛋黄。充分拌匀后享用，' +
            '浓郁的台湾风味令人上瘾。',
          zhTW:
            '無湯拌麵，鋪上香辣肉燥、青蔥、蒜末、海苔與生蛋黃。充分拌勻後享用，' +
            '濃郁的台灣風味令人上癮。',
          ko:
            '국물 없는 비빔면으로, 매콤한 고기 소와 파, 다진 마늘, 김, 노른자를 올렸습니다. ' +
            '충분히 비벼 먹으면 진한 대만식 풍미를 즐길 수 있습니다.',
        },
      },
    ],
  },

  {
    id: 'fukuju',
    name: 'Fukuju',
    nameJa: '中華料理 福寿',
    nameI18n: { en: 'Fukuju', zhCN: '福寿', zhTW: '福壽', ko: '후쿠주', ja: '福寿' },
    heroDish: { name: { en: 'Nagasaki Champon', zhCN: '长崎什锦面', zhTW: '長崎什錦麵', ko: '나가사키 짬뽕', ja: '長崎ちゃんぽん' }, price: '¥800', image: 'menu1.jpg' },
    category: 'Chinese',
    area: 'Shinchi Chinatown',
    areaJa: '長崎市新地町',
    areaI18n: { en: 'Shinchi Chinatown', zhCN: '新地中华街', zhTW: '新地中華街', ko: '신치 차이나타운', ja: '長崎市新地町' },

    map: { x: 39, y: 49 },
    geo: { lat: 32.742134, lng: 129.874985 },
    address: '〒850-0842 長崎県長崎市新地町2-5',
    hours: {
      sun: ['11:00–14:00', '17:00–20:00'],
      mon: ['11:00–14:00', '17:00–20:00'],
      tue: ['11:00–14:00', '17:00–20:00'],
      wed: ['11:00–14:00', '17:00–20:00'],
      thu: ['11:00–14:00', '17:00–20:00'],
      fri: ['11:00–14:00', '17:00–20:00'],
      sat: ['11:00–14:00', '17:00–20:00'],
    },

    photoBase: '/shops/fukuju',
    exterior: 'exterior.jpg',

    description: {
      en:
        'Fukuju is a long-established, beloved Chinese restaurant in Nagasaki Shinchi ' +
        'Chinatown. Its culinary pride lies in its signature broth, made from 100% ' +
        'chicken bones using traditional methods unchanged since its opening. The broth ' +
        'is uniquely clear until heat is applied, creating an ultimate, rich soup the ' +
        'very moment it cooks. Offering a casual and welcoming atmosphere, Fukuju ' +
        'provides international travelers with an authentic taste of historic ' +
        'Nagasaki-Chinese comfort food.',
      ja:
        '中華料理 福寿は、長崎新地中華街で長く親しまれている老舗の中華料理店です。' +
        '自慢は、創業以来変わらない製法で鶏ガラ100％からとる看板スープ。火を入れるまでは' +
        '澄んでいて、加熱した瞬間に濃厚な旨みへと変わるのが特徴です。気取らない' +
        '入りやすい雰囲気で、海外からのお客様も長崎中華の本来の味を楽しめます。',
      zhCN:
        '中华料理福寿是长崎新地中华街深受喜爱的老字号中餐厅。最自豪的是自创业以来沿用' +
        '传统做法、以100%鸡骨熬制的招牌汤底。加热前清澈透亮，一经加热便化为浓郁鲜美的' +
        '极致汤头。店内气氛轻松随和，外国游客也能品尝到地道的长崎中华家常味。',
      zhTW:
        '中華料理福壽是長崎新地中華街深受喜愛的老字號中餐廳。最自豪的是自創業以來沿用' +
        '傳統做法、以100%雞骨熬製的招牌湯底。加熱前清澈透亮，一經加熱便化為濃郁鮮美的' +
        '極致湯頭。店內氣氛輕鬆隨和，外國旅客也能品嚐到道地的長崎中華家常味。',
      ko:
        '중화요리 후쿠주는 나가사키 신치 차이나타운에서 오래도록 사랑받아 온 노포 중식당입니다. ' +
        '자랑거리는 창업 이래 변하지 않은 방식으로 닭뼈 100%를 우려낸 간판 육수입니다. ' +
        '가열하기 전에는 맑다가 불을 올리는 순간 진한 감칠맛으로 바뀌는 것이 특징입니다. ' +
        '편안하고 소탈한 분위기에서 해외 여행객도 정통 나가사키 중화의 맛을 즐길 수 있습니다.',
    },

    menu: [
      {
        id: 'nagasaki-champon',
        name: 'Nagasaki Champon',
        nameJa: '長崎ちゃんぽん',
        nameI18n: { en: 'Nagasaki Champon', zhCN: '长崎什锦面', zhTW: '長崎什錦麵', ko: '나가사키 짬뽕', ja: '長崎ちゃんぽん' },
        romaji: 'Nagasaki champon',
        price: '¥800',
        img: 'menu1.jpg',
        description: {
          en:
            "Fukuju's classic signature dish. Made with their ultimate 100% chicken broth, " +
            'packed with chewy noodles, pork, fresh seafood and a generous portion of ' +
            "vegetables. A budget-friendly yet deeply flavourful bowl of Nagasaki's " +
            'favourite comfort food.',
          ja:
            '福寿の定番にして看板の一杯。鶏ガラ100％の自慢のスープに、もちもちの麺、豚肉、' +
            '新鮮な海鮮、たっぷりの野菜が入ります。手頃な価格ながら、旨みの深い長崎の' +
            '定番の味です。',
          zhCN:
            '福寿的经典招牌。以100%鸡骨熬制的自豪汤底，搭配弹牙面条、猪肉、新鲜海鲜与' +
            '满满的蔬菜。价格亲民却滋味深厚，是长崎的代表家常味。',
          zhTW:
            '福壽的經典招牌。以100%雞骨熬製的自豪湯底，搭配彈牙麵條、豬肉、新鮮海鮮與' +
            '滿滿的蔬菜。價格親民卻滋味深厚，是長崎的代表家常味。',
          ko:
            '후쿠주의 대표 메뉴. 닭뼈 100%로 우려낸 자랑의 육수에 쫄깃한 면과 돼지고기, ' +
            '신선한 해산물, 넉넉한 채소가 들어갑니다. 부담 없는 가격에 깊은 맛을 즐길 수 있는 ' +
            '나가사키의 대표 음식입니다.',
        },
      },
      {
        id: 'soboro-sara-udon',
        name: 'Soboro Sara Udon (Thick Noodles)',
        nameJa: 'そぼろ皿うどん（太麺）',
        nameI18n: { en: 'Soboro Sara Udon (Thick Noodles)', zhCN: '肉末皿乌冬粗面', zhTW: '肉末皿烏龍粗麵', ko: '소보로 사라우동 (굵은 면)', ja: 'そぼろ皿うどん（太麺）' },
        romaji: 'Soboro sara udon',
        price: '¥1,150',
        img: 'menu2.jpg',
        description: {
          en:
            'A specialty variation of Nagasaki Sara Udon using soft, thick champon-style ' +
            'noodles instead of crispy thin ones. Tossed with a rich savoury sauce, minced ' +
            'meat (soboro), and fresh seafood and vegetables.',
          ja:
            'パリパリの細麺ではなく、やわらかい太麺を使った長崎皿うどんの一種。旨みのある' +
            'あんに、そぼろ肉と新鮮な海鮮、野菜を合わせています。',
          zhCN:
            '不用酥脆细面，而以柔软粗面制作的长崎什锦烩面。搭配浓郁芡汁、肉燥与新鲜海鲜' +
            '和蔬菜。',
          zhTW:
            '不用酥脆細麵，而以柔軟粗麵製作的長崎什錦燴麵。搭配濃郁芡汁、肉燥與新鮮海鮮' +
            '和蔬菜。',
          ko:
            '바삭한 가는 면 대신 부드러운 굵은 면을 사용한 나가사키 사라우동. 감칠맛 나는 ' +
            '소스에 다진 고기와 신선한 해산물, 채소를 곁들였습니다.',
        },
      },
      {
        id: 'sweet-sour-pork',
        name: 'Sweet and Sour Pork',
        nameJa: '酢豚',
        nameI18n: { en: 'Sweet and Sour Pork', zhCN: '糖醋肉', zhTW: '糖醋肉', ko: '탕수육', ja: '酢豚' },
        romaji: 'Subuta',
        price: '¥1,260',
        img: 'menu3.jpg',
        description: {
          en:
            'Crispy, golden-brown fried pork pieces and colourful vegetables tossed in a ' +
            'glossy, appetising sweet-and-sour glaze. A universally loved Chinese staple ' +
            'that goes fantastically with rice or beer.',
          ja:
            'こんがり揚げた豚肉と彩りのよい野菜を、つやのある甘酢あんで絡めた一品。' +
            'ご飯にもビールにもよく合う、誰にでも好まれる中華の定番です。',
          zhCN:
            '将炸得金黄酥脆的猪肉与缤纷蔬菜裹上亮泽的糖醋芡汁。无论配饭还是啤酒都十分' +
            '对味，是老少咸宜的中华经典。',
          zhTW:
            '將炸得金黃酥脆的豬肉與繽紛蔬菜裹上亮澤的糖醋芡汁。無論配飯或啤酒都十分' +
            '對味，是老少咸宜的中華經典。',
          ko:
            '노릇하게 튀긴 돼지고기와 색색의 채소를 윤기 나는 새콤달콤한 소스에 버무렸습니다. ' +
            '밥에도 맥주에도 잘 어울리는, 누구나 좋아하는 중식 대표 요리입니다.',
        },
      },
      {
        id: 'chinjao-rosu',
        name: 'Stir-Fried Beef and Green Peppers',
        nameJa: '牛肉とピーマンの炒め（青椒肉絲）',
        nameI18n: { en: 'Stir-Fried Beef and Green Peppers', zhCN: '青椒肉丝', zhTW: '青椒肉絲', ko: '피망 소고기 볶음', ja: '牛肉とピーマンの炒め（青椒肉絲）' },
        romaji: 'Chinjao rosu',
        price: 'Small ¥1,890 / Large ¥2,840',
        img: 'menu4.jpg',
        description: {
          en:
            'Tender strips of beef stir-fried over high heat with crisp green bell peppers ' +
            'and bamboo shoots in a savoury soy-based sauce. Offered in two portion sizes, ' +
            'making it ideal for individual diners or group sharing.',
          ja:
            '細切りの牛肉を、シャキッとしたピーマンとたけのこと一緒に強火で炒め、醤油' +
            'ベースのたれで仕上げた一品。小（1〜2人前）と大（3〜4人前）があり、一人でも' +
            '大人数でも楽しめます。',
          zhCN:
            '牛肉丝与爽脆青椒、竹笋一同大火快炒，以酱油为底调味。提供小份（1–2人）与' +
            '大份（3–4人），一人用餐或多人分享都合适。',
          zhTW:
            '牛肉絲與爽脆青椒、竹筍一同大火快炒，以醬油為底調味。提供小份（1–2人）與' +
            '大份（3–4人），一人用餐或多人分享都合適。',
          ko:
            '채썬 소고기를 아삭한 피망, 죽순과 함께 센 불에 볶아 간장 베이스 소스로 ' +
            '마무리했습니다. 소(1~2인분)와 대(3~4인분)가 있어 혼자서도 여럿이서도 좋습니다.',
        },
      },
    ],
  },
  {
    id: "shianbashi-ramen",
    name: "Shianbashi Ramen",
    nameJa: "思案橋ラーメン",
    nameI18n: { en: "Shianbashi Ramen", zhCN: "思案桥拉面", zhTW: "思案橋拉麵", ko: "시안바시 라멘", ja: "思案橋ラーメン" },
    heroDish: { name: { en: "Bakudan Ramen", zhCN: "爆弹拉面", zhTW: "爆彈拉麵", ko: "바쿠단 라멘", ja: "バクダンラーメン" }, image: 'exterior.jpg' },
    category: "Ramen",
    area: "Shianbashi",
    areaJa: "思案橋",
    areaI18n: { en: "Shianbashi", zhCN: "思案桥", zhTW: "思案橋", ko: "시안바시", ja: "思案橋" },

    geo: { lat: 32.743095, lng: 129.87915 },
    address: "〒850-0853 長崎県長崎市浜町6-17",
    hours: {
      sun: ["11:00–15:00", "17:00–01:30"],
      mon: ["11:00–15:00", "17:00–01:30"],
      tue: ["11:00–15:00", "17:00–01:30"],
      wed: ["11:00–15:00", "17:00–01:30"],
      thu: null,
      fri: ["11:00–15:00", "17:00–01:30"],
      sat: ["11:00–15:00", "17:00–01:30"],
    },

    photoBase: "/shops/shianbashi-ramen",
    exterior: 'exterior.jpg',
    menuBoardImage: 'menu-board.jpg',

    description: {
      en: "A Shianbashi ramen shop open for lunch and late into the night (closed Thursdays). Best known for its fiery \"Bakudan\" (bomb) spicy champon and ramen, plus oden — a popular final stop after a night out.",
      ja: "思案橋のラーメン店。昼と夜の二部営業で、深夜1時半まで営業（木曜定休）。名物は激辛の「バクダンチャンポン」「バクダンラーメン」で、おでんも人気。飲んだ後の〆としても親しまれています。",
      zhCN: "思案桥的拉面店，午市与夜市分开营业，最晚至凌晨1点半（周四休息）。招牌是超辣的「爆弹什锦面」「爆弹拉面」，关东煮也很受欢迎，是夜饮后常去的收尾之选。",
      zhTW: "思案橋的拉麵店，午市與夜市分開營業，最晚至凌晨1點半（週四公休）。招牌是超辣的「爆彈什錦麵」「爆彈拉麵」，關東煮也很受歡迎，是夜飲後常去的收尾之選。",
      ko: "시안바시의 라멘 가게로, 점심과 저녁으로 나뉘어 영업하며 새벽 1시 반까지 운영합니다 (목요일 휴무). 매운맛으로 유명한 \"바쿠단 짬뽕\"과 \"바쿠단 라멘\"이 대표 메뉴이며, 오뎅도 인기입니다.",
    },

    menu: [
      {
        id: "bakudan-champon",
        name: "Bakudan Champon",
        nameJa: "バクダンチャンポン",
        nameI18n: { en: "Bakudan Champon", zhCN: "爆弹什锦面", zhTW: "爆彈什錦麵", ko: "바쿠단 짬뽕", ja: "バクダンチャンポン" },
        img: "menu1.jpg",
      },
      {
        id: "bakudan-ramen",
        name: "Bakudan Ramen",
        nameJa: "バクダンラーメン",
        nameI18n: { en: "Bakudan Ramen", zhCN: "爆弹拉面", zhTW: "爆彈拉麵", ko: "바쿠단 라멘", ja: "バクダンラーメン" },
        img: "menu2.jpg",
      },
      {
        id: "oden",
        name: "Oden",
        nameJa: "おでん",
        nameI18n: { en: "Oden", zhCN: "关东煮", zhTW: "關東煮", ko: "오뎅", ja: "おでん" },
        img: "menu3.jpg",
      },
    ],
  },
  {
    id: "tsuruchan",
    name: "Tsuruchan",
    nameJa: "ツル茶ん",
    nameI18n: { en: "Tsuruchan", zhCN: "鹤茶", zhTW: "鶴茶", ko: "츠루짱", ja: "ツル茶ん" },
    heroDish: { name: { en: "Nostalgic Turkish Rice", zhCN: "怀旧土耳其饭", zhTW: "懷舊土耳其飯", ko: "노스탤직 터키라이스", ja: "昔なつかしトルコライス" }, image: 'exterior.jpg' },
    category: "Cafe",
    area: "Near Shianbashi",
    areaJa: "思案橋周辺",
    areaI18n: { en: "Near Shianbashi", zhCN: "思案桥附近", zhTW: "思案橋附近", ko: "시안바시 근처", ja: "思案橋周辺" },

    geo: { lat: 32.743137, lng: 129.880661 },
    address: "〒850-0832 長崎県長崎市油屋町2-47",
    hours: {
      sun: ["09:00–21:00"],
      mon: ["09:00–21:00"],
      tue: ["09:00–21:00"],
      wed: ["09:00–21:00"],
      thu: ["09:00–21:00"],
      fri: ["09:00–21:00"],
      sat: ["09:00–21:00"],
    },

    photoBase: "/shops/tsuruchan",
    exterior: 'exterior.jpg',

    description: {
      en: "Kyushu's oldest kissaten (Japanese-style cafe), open since 1925. Famous for Nagasaki's beloved \"Turkish Rice\" (pilaf, spaghetti and a pork cutlet on one plate) and the original Nagasaki-style milk seiki.",
      ja: "大正14年（1925年）創業、九州最古の喫茶店。ピラフ・スパゲティ・カツを一皿にのせた長崎名物「トルコライス」と、元祖「ミルクセーキ」で知られています。",
      zhCN: "创业于1925年，九州最古老的咖啡馆。以长崎名物「土耳其饭」（炒饭、意面与炸猪排同盘）和元祖奶昔而闻名。",
      zhTW: "創業於1925年，九州最古老的咖啡館。以長崎名物「土耳其飯」（炒飯、義麵與炸豬排同盤）和元祖奶昔而聞名。",
      ko: "1925년 창업한 규슈에서 가장 오래된 다방. 필라프·스파게티·돈가스를 한 접시에 담은 나가사키 명물 \"터키라이스\"와 원조 밀크셰이크로 유명합니다.",
    },

    menu: [
      {
        id: "natsukashi-turkish-rice",
        name: "Nostalgic Turkish Rice",
        nameJa: "昔なつかしトルコライス",
        nameI18n: { en: "Nostalgic Turkish Rice", zhCN: "怀旧土耳其饭", zhTW: "懷舊土耳其飯", ko: "노스탤직 터키라이스", ja: "昔なつかしトルコライス" },
        img: "menu1.jpg",
      },
      {
        id: "shinsei-turkish-rice",
        name: "Authentic Turkish Rice",
        nameJa: "真正トルコライス",
        nameI18n: { en: "Authentic Turkish Rice", zhCN: "正宗土耳其饭", zhTW: "正宗土耳其飯", ko: "정통 터키라이스", ja: "真正トルコライス" },
        img: "menu2.jpg",
      },
      {
        id: "milk-seiki",
        name: "Original Nagasaki-Style Milk Seiki",
        nameJa: "元祖長崎風ミルクセーキ",
        nameI18n: { en: "Original Nagasaki-Style Milk Seiki", zhCN: "元祖长崎风奶昔", zhTW: "元祖長崎風奶昔", ko: "원조 나가사키식 밀크셰이크", ja: "元祖長崎風ミルクセーキ" },
        img: "menu3.jpg",
      },
      {
        id: "custard-pudding",
        name: "Custard Pudding",
        nameJa: "カスタードプリン",
        nameI18n: { en: "Custard Pudding", zhCN: "焦糖布丁", zhTW: "焦糖布丁", ko: "커스터드 푸딩", ja: "カスタードプリン" },
        img: "menu4.jpg",
      },
    ],
  },
  {
    id: "shippoku-hamakatsu",
    name: "Nagasaki Shippoku Hamakatsu",
    nameJa: "長崎卓袱浜勝",
    nameI18n: { en: "Nagasaki Shippoku Hamakatsu", zhCN: "长崎卓袱滨胜", zhTW: "長崎卓袱濱勝", ko: "나가사키 싯포쿠 하마카츠", ja: "長崎卓袱浜勝" },
    heroDish: { name: { en: "Shippoku Bugyo Course", zhCN: "卓袱奉行套餐", zhTW: "卓袱奉行套餐", ko: "싯포쿠 부교 코스", ja: "卓袱奉行コース" }, image: 'exterior.jpg' },
    category: "Japanese",
    area: "Near Shianbashi & Doza",
    areaJa: "思案橋・銅座周辺",
    areaI18n: { en: "Near Shianbashi & Doza", zhCN: "思案桥・铜座附近", zhTW: "思案橋・銅座附近", ko: "시안바시・도자 근처", ja: "思案橋・銅座周辺" },

    geo: { lat: 32.743282, lng: 129.881302 },
    address: "〒850-0831 長崎県長崎市鍛冶屋町6-50",
    hours: {
      sun: ["11:00–15:00", "17:00–21:30"],
      mon: ["11:00–15:00", "17:00–21:30"],
      tue: ["11:00–15:00", "17:00–21:30"],
      wed: ["11:00–15:00", "17:00–21:30"],
      thu: ["11:00–15:00", "17:00–21:30"],
      fri: ["11:00–15:00", "17:00–21:30"],
      sat: ["11:00–15:00", "17:00–21:30"],
    },

    photoBase: "/shops/shippoku-hamakatsu",
    exterior: 'exterior.jpg',

    description: {
      en: "A specialist in Shippoku, Nagasaki's historic banquet-style cuisine blending Japanese, Chinese and Western dishes on one round table. A good way to sample a wide range of Nagasaki flavors in a single course.",
      ja: "和華蘭（和・中・洋）の料理が一つの卓を囲む、長崎の郷土料理「卓袱料理」の専門店。一度のコースで長崎の様々な味を楽しめます。",
      zhCN: "长崎传统宴席料理「卓袱料理」专门店，和、中、洋式菜肴同桌共享。可在一套料理中品尝长崎的多种风味。",
      zhTW: "長崎傳統宴席料理「卓袱料理」專門店，和、中、洋式菜餚同桌共享。可在一套料理中品嚐長崎的多種風味。",
      ko: "일본·중국·서양 요리가 한 상에 오르는 나가사키 전통 연회 요리 싯포쿠 요리 전문점. 한 번의 코스로 나가사키의 다양한 맛을 즐길 수 있습니다.",
    },

    menu: [
      {
        id: "bugyo-course",
        name: "Shippoku Bugyo Course",
        nameJa: "卓袱奉行コース",
        nameI18n: { en: "Shippoku Bugyo Course", zhCN: "卓袱奉行套餐", zhTW: "卓袱奉行套餐", ko: "싯포쿠 부교 코스", ja: "卓袱奉行コース" },
        img: "menu1.jpg",
        description: {
          en: "The grandest course, with the widest spread of dishes. Reservation required, from 2 people.",
          ja: "最も豪華な、品数の多いコース。要予約・2名様より。",
          zhCN: "菜品最丰盛豪华的套餐。需预约，2位起。",
          zhTW: "菜色最豐盛豪華的套餐。需預約，2位起。",
          ko: "가장 호화롭고 가짓수가 많은 코스. 예약 필수, 2인 이상부터.",
        },
      },
      {
        id: "capitan-course",
        name: "Shippoku Capitan Course",
        nameJa: "卓袱カピタンコース",
        nameI18n: { en: "Shippoku Capitan Course", zhCN: "卓袱卡比丹套餐", zhTW: "卓袱卡比丹套餐", ko: "싯포쿠 카피탄 코스", ja: "卓袱カピタンコース" },
        img: "menu2.jpg",
        description: {
          en: "A slightly more compact course than Bugyo, still full of variety. From 2 people.",
          ja: "奉行コースよりやや品数を抑えた、それでも種類豊富なコース。2名様より。",
          zhCN: "比奉行套餐稍精简，但依然种类丰富的套餐。2位起。",
          zhTW: "比奉行套餐稍精簡，但依然種類豐富的套餐。2位起。",
          ko: "부교 코스보다 가짓수는 조금 적지만 여전히 다양한 코스. 2인 이상부터.",
        },
      },
      {
        id: "biidoro-course",
        name: "Shippoku Biidoro Course",
        nameJa: "卓袱ビードロコース",
        nameI18n: { en: "Shippoku Biidoro Course", zhCN: "卓袱比多罗套餐", zhTW: "卓袱比多羅套餐", ko: "싯포쿠 비이도로 코스", ja: "卓袱ビードロコース" },
        img: "menu3.jpg",
        description: {
          en: "A smaller-format course, the only one available for a single diner.",
          ja: "一回り小さい規模のコースで、1名様から利用できる唯一のコース。",
          zhCN: "规模较小的套餐，唯一可供1人用餐的选择。",
          zhTW: "規模較小的套餐，唯一可供1人用餐的選擇。",
          ko: "규모가 조금 작은 코스로, 1인부터 이용할 수 있는 유일한 코스입니다.",
        },
      },
    ],
  },
  {
    id: "yossou",
    name: "Yossou",
    nameJa: "吉宗",
    nameI18n: { en: "Yossou", zhCN: "吉宗", zhTW: "吉宗", ko: "요소", ja: "吉宗" },
    heroDish: { name: { en: "Classic Set (Chawanmushi & Mushizushi)", zhCN: "招牌套餐（茶碗蒸・蒸寿司）", zhTW: "招牌套餐（茶碗蒸・蒸壽司）", ko: "클래식 세트 (자완무시 & 무시즈시)", ja: "御一人前（茶碗むし・蒸寿し揃）" }, price: "¥1,650", image: 'exterior.jpg' },
    category: "Japanese",
    area: "Near Shianbashi",
    areaJa: "思案橋周辺",
    areaI18n: { en: "Near Shianbashi", zhCN: "思案桥附近", zhTW: "思案橋附近", ko: "시안바시 근처", ja: "思案橋周辺" },

    geo: { lat: 32.744514, lng: 129.878799 },
    address: "〒850-0853 長崎県長崎市浜町8-9",
    hours: {
      sun: ["11:00–21:00"],
      mon: ["11:00–21:00"],
      tue: ["11:00–21:00"],
      wed: ["11:00–21:00"],
      thu: ["11:00–21:00"],
      fri: ["11:00–21:00"],
      sat: ["11:00–21:00"],
    },

    photoBase: "/shops/yossou",
    exterior: 'exterior.jpg',

    description: {
      en: "Founded in 1866, the original specialist in Nagasaki's giant chawanmushi (steamed egg custard) and mushizushi (steamed sushi), a local classic rich with seafood and mountain vegetables.",
      ja: "慶応2年（1866年）創業、元祖・茶碗蒸し専門店。具だくさんの大きな茶碗蒸しと蒸し寿司が名物の老舗です。",
      zhCN: "创业于1866年，元祖茶碗蒸专门店。料多味美的大份茶碗蒸与蒸寿司是招牌名物。",
      zhTW: "創業於1866年，元祖茶碗蒸專門店。料多味美的大份茶碗蒸與蒸壽司是招牌名物。",
      ko: "1866년 창업한 원조 자완무시(달걀찜) 전문점. 건더기가 가득한 큼직한 자완무시와 찜스시가 명물인 노포입니다.",
    },

    menu: [
      {
        id: "gonin-mae-set",
        name: "Classic Set (Chawanmushi & Mushizushi)",
        nameJa: "御一人前（茶碗むし・蒸寿し揃）",
        nameI18n: { en: "Classic Set (Chawanmushi & Mushizushi)", zhCN: "招牌套餐（茶碗蒸・蒸寿司）", zhTW: "招牌套餐（茶碗蒸・蒸壽司）", ko: "클래식 세트 (자완무시 & 무시즈시)", ja: "御一人前（茶碗むし・蒸寿し揃）" },
        price: "¥1,650",
        img: "menu1.jpg",
      },
      {
        id: "yossou-teishoku",
        name: "Yossou Set Meal",
        nameJa: "吉宗定食",
        nameI18n: { en: "Yossou Set Meal", zhCN: "吉宗定食", zhTW: "吉宗定食", ko: "요소 정식", ja: "吉宗定食" },
        price: "¥3,080",
        img: "menu2.jpg",
      },
      {
        id: "makunouchi",
        name: "Makunouchi Bento (with Soup)",
        nameJa: "幕の内（吸物付）",
        nameI18n: { en: "Makunouchi Bento (with Soup)", zhCN: "幕之内便当（附汤）", zhTW: "幕之內便當（附湯）", ko: "마쿠노우치 벤토 (국 포함)", ja: "幕の内（吸物付）" },
        price: "¥1,815",
        img: "menu3.jpg",
      },
    ],
  },
  {
    id: "osakaya-hamamachi",
    name: "Osakaya Hamamachi",
    nameJa: "大阪屋 浜町店",
    nameI18n: { en: "Osakaya Hamamachi", zhCN: "大阪屋 滨町店", zhTW: "大阪屋 濱町店", ko: "오사카야 하마마치점", ja: "大阪屋 浜町店" },
    heroDish: { name: { en: "Popular Course", zhCN: "人气套餐", zhTW: "人氣套餐", ko: "인기 코스", ja: "人気コース" }, price: "¥9,240", image: 'exterior.jpg' },
    category: "Yakiniku",
    area: "Shianbashi",
    areaJa: "思案橋",
    areaI18n: { en: "Shianbashi", zhCN: "思案桥", zhTW: "思案橋", ko: "시안바시", ja: "思案橋" },

    geo: { lat: 32.743576, lng: 129.880524 },
    address: "〒850-0853 長崎県長崎市浜町11-11",
    hours: {
      sun: ["17:00–24:00"],
      mon: ["17:00–24:00"],
      tue: ["17:00–24:00"],
      wed: ["17:00–24:00"],
      thu: ["17:00–24:00"],
      fri: ["17:00–24:00"],
      sat: ["17:00–24:00"],
    },

    photoBase: "/shops/osakaya-hamamachi",
    exterior: 'exterior.jpg',

    description: {
      en: "A yakiniku restaurant just off the Shianbashi arcade, known for its course menus (from 2 people) rather than ordering piece by piece — a solid choice for a grilled-meat dinner near the hotel.",
      ja: "思案橋のアーケードそばにある焼肉店。単品より、2名様から楽しめるコースメニューが人気です。",
      zhCN: "位于思案桥拱廊附近的烤肉店，比起单点更以套餐（2位起）闻名，是酒店附近享用烤肉晚餐的好选择。",
      zhTW: "位於思案橋拱廊附近的烤肉店，比起單點更以套餐（2位起）聞名，是飯店附近享用烤肉晚餐的好選擇。",
      ko: "시안바시 아케이드 근처의 야키니쿠 식당으로, 단품보다 2인 이상부터 즐기는 코스 메뉴로 유명합니다.",
    },

    menu: [
      {
        id: "popular-course",
        name: "Popular Course",
        nameJa: "人気コース",
        nameI18n: { en: "Popular Course", zhCN: "人气套餐", zhTW: "人氣套餐", ko: "인기 코스", ja: "人気コース" },
        price: "¥9,240",
        description: {
          en: "10 dishes including a special tongue stew and yukhoe-style rare steak. The shop's most-repeated course. From 2 people.",
          ja: "特製タンシチューやユッケ風レアステーキを含む全10品。リピート率が高い看板コース。2名様より。",
          zhCN: "共10道菜，包含特制牛舌炖汤与生拌牛肉风味嫩煎牛排。回头率最高的招牌套餐。2位起。",
          zhTW: "共10道菜，包含特製牛舌燉湯與生拌牛肉風味嫩煎牛排。回頭率最高的招牌套餐。2位起。",
          ko: "특제 혀 스튜와 육회풍 레어 스테이크가 포함된 총 10가지 요리. 재방문율이 높은 대표 코스. 2인 이상부터.",
        },
      },
      {
        id: "banquet-course",
        name: "Banquet Course (2hr All-You-Can-Drink)",
        nameJa: "宴会コース（2時間飲み放題付き）",
        nameI18n: { en: "Banquet Course (2hr All-You-Can-Drink)", zhCN: "宴会套餐（含2小时无限畅饮）", zhTW: "宴會套餐（含2小時無限暢飲）", ko: "연회 코스 (2시간 음료 무제한 포함)", ja: "宴会コース（2時間飲み放題付き）" },
        price: "¥9,240",
        description: {
          en: "9 dishes with 2 hours of all-you-can-drink included, featuring yaki-suki and salted black tongue. From 2 people.",
          ja: "2時間の飲み放題付きで全9品。焼きすきや黒タン塩が楽しめます。2名様より。",
          zhCN: "共9道菜，含2小时无限畅饮，可品尝寿喜烧风烤肉与黑毛和牛舌盐烤。2位起。",
          zhTW: "共9道菜，含2小時無限暢飲，可品嚐壽喜燒風烤肉與黑毛和牛舌鹽烤。2位起。",
          ko: "2시간 음료 무제한이 포함된 총 9가지 요리로, 야키스키와 소금 간 흑우 혀를 즐길 수 있습니다. 2인 이상부터.",
        },
      },
    ],
  },
  {
    id: "kadoya",
    name: "Kadoya",
    nameJa: "かどや",
    nameI18n: { en: "Kadoya", zhCN: "角屋", zhTW: "角屋", ko: "카도야", ja: "かどや" },
    heroDish: { name: { en: "Kadoya Ramen", zhCN: "角屋拉面", zhTW: "角屋拉麵", ko: "카도야 라멘", ja: "かどやラーメン" }, image: 'exterior.jpg' },
    category: "Ramen",
    area: "Shianbashi",
    areaJa: "思案橋",
    areaI18n: { en: "Shianbashi", zhCN: "思案桥", zhTW: "思案橋", ko: "시안바시", ja: "思案橋" },

    geo: { lat: 32.743225, lng: 129.87854 },
    address: "〒850-0853 長崎県長崎市浜町6-23",
    hours: {
      sun: ["11:00–01:00"],
      mon: ["11:00–03:00"],
      tue: ["11:00–03:00"],
      wed: ["11:00–03:00"],
      thu: ["11:00–03:00"],
      fri: ["11:00–03:00"],
      sat: ["11:00–03:00"],
    },

    photoBase: "/shops/kadoya",
    exterior: 'exterior.jpg',

    description: {
      en: "A ramen shop near Kankodori known for its deeply rich tonkotsu broth, open very late — a favorite stop after a night out in the area.",
      ja: "観光通り近くのラーメン店。濃厚な豚骨スープが評判で、深夜まで営業しているため飲んだ後に立ち寄る人も多い人気店です。",
      zhCN: "位于观光通附近的拉面店，以浓厚的豚骨汤底闻名，营业至深夜，是夜饮后的热门去处。",
      zhTW: "位於觀光通附近的拉麵店，以濃厚的豚骨湯底聞名，營業至深夜，是夜飲後的熱門去處。",
      ko: "간코도리 근처의 라멘 가게로, 진한 돈코츠 육수로 유명하며 밤늦게까지 영업해 술자리 후 들르기 좋은 곳입니다.",
    },

    menu: [
      {
        id: "kadoya-ramen",
        name: "Kadoya Ramen",
        nameJa: "かどやラーメン",
        nameI18n: { en: "Kadoya Ramen", zhCN: "角屋拉面", zhTW: "角屋拉麵", ko: "카도야 라멘", ja: "かどやラーメン" },
        img: "menu1.jpg",
      },
      {
        id: "aka-ramen",
        name: "Aka (Red) Spicy Ramen",
        nameJa: "赤ラーメン",
        nameI18n: { en: "Aka (Red) Spicy Ramen", zhCN: "红辣拉面", zhTW: "紅辣拉麵", ko: "아카 라멘 (매운맛)", ja: "赤ラーメン" },
        img: "menu2.jpg",
      },
      {
        id: "koku-miso-champon",
        name: "Rich Miso Champon",
        nameJa: "コク味噌ちゃんぽん",
        nameI18n: { en: "Rich Miso Champon", zhCN: "浓郁味噌什锦面", zhTW: "濃郁味噌什錦麵", ko: "코쿠 미소 짬뽕", ja: "コク味噌ちゃんぽん" },
        img: "menu3.jpg",
      },
      {
        id: "kadoya-meat-ramen",
        name: "Kadoya Special Meat Ramen",
        nameJa: "かどや特製肉ラーメン",
        nameI18n: { en: "Kadoya Special Meat Ramen", zhCN: "角屋特制叉烧拉面", zhTW: "角屋特製叉燒拉麵", ko: "카도야 특제 고기 라멘", ja: "かどや特製肉ラーメン" },
        img: "menu4.jpg",
      },
    ],
  },
  {
    id: "kaniya-doza",
    name: "Kaniya",
    nameJa: "かにや",
    nameI18n: { en: "Kaniya", zhCN: "蟹屋", zhTW: "蟹屋", ko: "카니야", ja: "かにや" },
    heroDish: { name: { en: "Salted Mackerel Onigiri", zhCN: "盐烤鲭鱼饭团", zhTW: "鹽烤鯖魚飯糰", ko: "소금 고등어 오니기리", ja: "塩さば" }, price: "¥280", image: 'exterior.jpg' },
    category: "Japanese",
    area: "Dōza-machi, Nagasaki",
    areaJa: "長崎市銅座町",
    areaI18n: { en: "Dōza-machi, Nagasaki", zhCN: "长崎铜座町", zhTW: "長崎銅座町", ko: "나가사키 도자마치", ja: "長崎市銅座町" },

    geo: { lat: 32.742653, lng: 129.877487 },
    address: "〒850-0841 長崎県長崎市銅座町10-2",
    hours: {
      sun: null,
      mon: ["18:00–02:00"],
      tue: ["18:00–02:00"],
      wed: ["18:00–02:00"],
      thu: ["18:00–02:00"],
      fri: ["18:00–03:00"],
      sat: ["18:00–03:00"],
    },

    photoBase: "/shops/kaniya-doza",
    exterior: 'exterior.jpg',

    description: {
      en: "An onigiri (rice ball) specialty shop since 1965, a Nagasaki institution for ending a night out with a hand-shaped rice ball instead of ramen — the local answer to a late-night snack.",
      ja: "昭和40年創業のおにぎり専門店。長崎では飲んだ後の〆にラーメンではなくおにぎりを食べる文化があり、その代表格として親しまれています。",
      zhCN: "创业于1965年的饭团专门店。长崎有夜饮后以饭团代替拉面收尾的文化，本店正是其代表。",
      zhTW: "創業於1965年的飯糰專門店。長崎有夜飲後以飯糰代替拉麵收尾的文化，本店正是其代表。",
      ko: "1965년 창업한 오니기리(주먹밥) 전문점. 나가사키에는 술자리 마무리로 라멘 대신 오니기리를 먹는 문화가 있는데, 그 대표 격인 가게입니다.",
    },

    menu: [
      {
        id: "shio-saba",
        name: "Salted Mackerel Onigiri",
        nameJa: "塩さば",
        nameI18n: { en: "Salted Mackerel Onigiri", zhCN: "盐烤鲭鱼饭团", zhTW: "鹽烤鯖魚飯糰", ko: "소금 고등어 오니기리", ja: "塩さば" },
        price: "¥280",
        img: "menu1.jpg",
      },
      {
        id: "iwa-nori",
        name: "Rock Seaweed Onigiri",
        nameJa: "岩のり",
        nameI18n: { en: "Rock Seaweed Onigiri", zhCN: "岩海苔饭团", zhTW: "岩海苔飯糰", ko: "바위김 오니기리", ja: "岩のり" },
        price: "¥280",
        img: "menu2.jpg",
      },
      {
        id: "takana",
        name: "Pickled Takana Greens Onigiri",
        nameJa: "高菜",
        nameI18n: { en: "Pickled Takana Greens Onigiri", zhCN: "芥菜饭团", zhTW: "芥菜飯糰", ko: "다카나(갓) 절임 오니기리", ja: "高菜" },
        price: "¥280",
        img: "menu3.jpg",
      },
    ],
  },
  {
    id: "yakitori-ren",
    name: "Yakitori Ren",
    nameJa: "焼鳥 蓮",
    nameI18n: { en: "Yakitori Ren", zhCN: "烤鸡肉串 莲", zhTW: "烤雞肉串 蓮", ko: "야키토리 렌", ja: "焼鳥 蓮" },
    heroDish: { name: { en: "Assorted Yakitori Skewers", zhCN: "烤鸡肉串拼盘", zhTW: "烤雞肉串拼盤", ko: "모둠 야키토리", ja: "焼き鳥盛り合わせ" }, image: 'exterior.jpg' },
    category: "Izakaya",
    area: "Dōza-machi, Nagasaki",
    areaJa: "長崎市銅座町",
    areaI18n: { en: "Dōza-machi, Nagasaki", zhCN: "长崎铜座町", zhTW: "長崎銅座町", ko: "나가사키 도자마치", ja: "長崎市銅座町" },

    geo: { lat: 32.743298, lng: 129.87764 },
    address: "〒850-0841 長崎県長崎市銅座町6-8 HANA銅座ビル1F",
    hours: {
      sun: ["18:00–22:00"],
      mon: ["18:00–22:00"],
      tue: ["18:00–22:00"],
      wed: ["18:00–22:00"],
      thu: ["18:00–22:00"],
      fri: ["18:00–22:00"],
      sat: ["18:00–22:00"],
    },

    photoBase: "/shops/yakitori-ren",
    exterior: 'exterior.jpg',

    description: {
      en: "A charcoal-grilled yakitori restaurant in Doza, serving skewers alongside izakaya-style small plates — a cozy evening spot near the hotel.",
      ja: "銅座にある炭火焼鳥の店。焼き鳥を中心に、居酒屋メニューも楽しめる夜の一軒です。",
      zhCN: "位于铜座的炭火烤鸡肉串店，以烤串为主，也提供居酒屋风味小菜，是酒店附近惬意的夜间去处。",
      zhTW: "位於銅座的炭火烤雞肉串店，以烤串為主，也提供居酒屋風味小菜，是飯店附近愜意的夜間去處。",
      ko: "도자에 있는 숯불 야키토리 가게로, 꼬치구이를 중심으로 이자카야풍 안주도 즐길 수 있는 아늑한 저녁 식당입니다.",
    },

    menu: [
      {
        id: "yakitori-set",
        name: "Assorted Yakitori Skewers",
        nameJa: "焼き鳥盛り合わせ",
        nameI18n: { en: "Assorted Yakitori Skewers", zhCN: "烤鸡肉串拼盘", zhTW: "烤雞肉串拼盤", ko: "모둠 야키토리", ja: "焼き鳥盛り合わせ" },
        img: "menu1.jpg",
      },
    ],
  },
  {
    id: "hiiragi-ramen",
    name: "Ramen Hiiragi",
    nameJa: "らーめん柊",
    nameI18n: { en: "Ramen Hiiragi", zhCN: "柊拉面", zhTW: "柊拉麵", ko: "라멘 히이라기", ja: "らーめん柊" },
    heroDish: { name: { en: "Tomato Ramen", zhCN: "番茄拉面", zhTW: "番茄拉麵", ko: "토마토 라멘", ja: "トマトらーめん" }, price: "¥1,000", image: 'exterior.jpg' },
    category: "Ramen",
    area: "Dōza-machi, Nagasaki",
    areaJa: "長崎市銅座町",
    areaI18n: { en: "Dōza-machi, Nagasaki", zhCN: "长崎铜座町", zhTW: "長崎銅座町", ko: "나가사키 도자마치", ja: "長崎市銅座町" },

    geo: { lat: 32.743206, lng: 129.877563 },
    address: "〒850-0841 長崎県長崎市銅座町6-9",
    hours: {
      sun: ["11:00–03:00"],
      mon: ["11:00–03:00"],
      tue: null,
      wed: ["11:00–03:00"],
      thu: ["11:00–03:00"],
      fri: ["11:00–05:00"],
      sat: ["11:00–05:00"],
    },

    photoBase: "/shops/hiiragi-ramen",
    exterior: 'exterior.jpg',

    description: {
      en: "A classic tonkotsu ramen shop in Doza, open into the small hours on weekends — a reliable late-night bowl of noodles near the hotel.",
      ja: "銅座にある豚骨ラーメンの店。週末は深夜まで営業しており、〆の一杯に便利な一軒です。",
      zhCN: "位于铜座的豚骨拉面店，周末营业至深夜，是收尾一碗面的便利选择。",
      zhTW: "位於銅座的豚骨拉麵店，週末營業至深夜，是收尾一碗麵的便利選擇。",
      ko: "도자에 있는 돈코츠 라멘 가게로, 주말에는 새벽까지 영업해 마무리 한 그릇으로 들르기 좋습니다.",
    },

    menu: [
      {
        id: "tomato-ramen",
        name: "Tomato Ramen",
        nameJa: "トマトらーめん",
        nameI18n: { en: "Tomato Ramen", zhCN: "番茄拉面", zhTW: "番茄拉麵", ko: "토마토 라멘", ja: "トマトらーめん" },
        price: "¥1,000",
        img: "menu1.jpg",
      },
      {
        id: "asari-gohan",
        name: "Bite-Size Clam Rice",
        nameJa: "一口あさりごはん",
        nameI18n: { en: "Bite-Size Clam Rice", zhCN: "一口蛤蜊饭", zhTW: "一口蛤蜊飯", ko: "한입 바지락밥", ja: "一口あさりごはん" },
        img: "menu2.jpg",
      },
      {
        id: "aosa-ramen",
        name: "Aosa Seaweed Ramen",
        nameJa: "あおさらーめん",
        nameI18n: { en: "Aosa Seaweed Ramen", zhCN: "海藻拉面", zhTW: "海藻拉麵", ko: "아오사 해조 라멘", ja: "あおさらーめん" },
        price: "¥900",
        img: "menu3.jpg",
      },
      {
        id: "tonkotsu",
        name: "Tonkotsu Ramen",
        nameJa: "とんこつらーめん",
        nameI18n: { en: "Tonkotsu Ramen", zhCN: "豚骨拉面", zhTW: "豚骨拉麵", ko: "돈코츠 라멘", ja: "とんこつらーめん" },
        price: "¥830",
        img: "menu4.jpg",
      },
      {
        id: "tantanmen",
        name: "Tantanmen",
        nameJa: "坦々麺",
        nameI18n: { en: "Tantanmen", zhCN: "担担面", zhTW: "擔擔麵", ko: "탄탄멘", ja: "坦々麺" },
        price: "¥900",
        img: "menu5.jpg",
      },
    ],
  },
  {
    id: "dashibonz",
    name: "Dashi Bonz",
    nameJa: "だしぼんず",
    nameI18n: { en: "Dashi Bonz", zhCN: "Dashi Bonz", zhTW: "Dashi Bonz", ko: "다시본즈", ja: "だしぼんず" },
    heroDish: { name: { en: "Nagasaki Sea Bream Dashi Udon", zhCN: "长崎鲷鱼高汤乌冬", zhTW: "長崎鯛魚高湯烏龍", ko: "나가사키 도미 육수 우동", ja: "長崎鯛だしうどん" }, price: "¥935", image: 'exterior.jpg' },
    category: "Izakaya",
    area: "Near Shianbashi",
    areaJa: "思案橋周辺",
    areaI18n: { en: "Near Shianbashi", zhCN: "思案桥附近", zhTW: "思案橋附近", ko: "시안바시 근처", ja: "思案橋周辺" },

    geo: { lat: 32.743881, lng: 129.877365 },
    address: "〒850-0853 長崎県長崎市浜町4-22 明星ビル1F",
    hours: {
      sun: ["11:00–22:00"],
      mon: ["11:00–22:00"],
      tue: ["11:00–22:00"],
      wed: ["11:00–22:00"],
      thu: ["11:00–22:00"],
      fri: ["11:00–22:00"],
      sat: ["11:00–22:00"],
    },

    photoBase: "/shops/dashibonz",
    exterior: 'exterior.jpg',

    description: {
      en: "An izakaya specializing in Goto udon — thin, chewy noodles from the Goto Islands served with a rich dashi broth — alongside other Nagasaki-sourced ingredients.",
      ja: "五島うどんを中心に、長崎の食材を活かした料理を提供する居酒屋。細くてコシのある五島うどんと出汁が自慢です。",
      zhCN: "以五岛乌冬面为主打的居酒屋，善用长崎当地食材。细滑有嚼劲的五岛乌冬搭配浓郁高汤是招牌。",
      zhTW: "以五島烏龍麵為主打的居酒屋，善用長崎當地食材。細滑有嚼勁的五島烏龍麵搭配濃郁高湯是招牌。",
      ko: "고토 우동을 중심으로 나가사키 현지 식재료를 활용하는 이자카야. 가늘고 쫄깃한 고토 우동과 진한 육수가 자랑입니다.",
    },

    menu: [
      {
        id: "tai-dashi-udon",
        name: "Nagasaki Sea Bream Dashi Udon",
        nameJa: "長崎鯛だしうどん",
        nameI18n: { en: "Nagasaki Sea Bream Dashi Udon", zhCN: "长崎鲷鱼高汤乌冬", zhTW: "長崎鯛魚高湯烏龍", ko: "나가사키 도미 육수 우동", ja: "長崎鯛だしうどん" },
        price: "¥935",
        img: "menu1.jpg",
      },
      {
        id: "niku-gobo-tempura-udon",
        name: "Beef & Burdock Tempura Udon",
        nameJa: "肉ごぼう天うどん",
        nameI18n: { en: "Beef & Burdock Tempura Udon", zhCN: "牛肉牛蒡天妇罗乌冬", zhTW: "牛肉牛蒡天婦羅烏龍", ko: "소고기 우엉 튀김 우동", ja: "肉ごぼう天うどん" },
        price: "¥880",
        img: "menu2.jpg",
      },
      {
        id: "tenzaru-udon",
        name: "Cold Udon with Tempura (Tenzaru)",
        nameJa: "天ざるうどん",
        nameI18n: { en: "Cold Udon with Tempura (Tenzaru)", zhCN: "天妇罗冷乌冬", zhTW: "天婦羅冷烏龍", ko: "덴자루 우동 (튀김 곁들인 냉우동)", ja: "天ざるうどん" },
        price: "¥935",
        img: "menu3.jpg",
      },
    ],
  },
  {
    id: "sushi-kozo",
    name: "Sushi Kozo",
    nameJa: "鮨 幸三",
    nameI18n: { en: "Sushi Kozo", zhCN: "寿司 幸三", zhTW: "壽司 幸三", ko: "스시 코조", ja: "鮨 幸三" },
    heroDish: { name: { en: "Chef's Omakase Sushi", zhCN: "主厨精选寿司", zhTW: "主廚精選壽司", ko: "오마카세 스시", ja: "おまかせにぎり" }, price: "¥4,000", image: 'exterior.jpg' },
    category: "Sushi",
    area: "Dōza-machi, Nagasaki",
    areaJa: "長崎市銅座町",
    areaI18n: { en: "Dōza-machi, Nagasaki", zhCN: "长崎铜座町", zhTW: "長崎銅座町", ko: "나가사키 도자마치", ja: "長崎市銅座町" },

    geo: { lat: 32.742706, lng: 129.87822 },
    address: "〒850-0841 長崎県長崎市銅座町12-2",
    hours: {
      sun: null,
      mon: ["18:00–24:00"],
      tue: ["18:00–24:00"],
      wed: ["18:00–24:00"],
      thu: ["18:00–24:00"],
      fri: ["18:00–24:00"],
      sat: ["18:00–24:00"],
    },

    photoBase: "/shops/sushi-kozo",
    exterior: 'exterior.jpg',
    menuBoardImage: 'menu-board.jpg',

    description: {
      en: "A counter sushi restaurant in Doza offering chef's-choice courses built around the day's catch — a special-occasion choice for fresh Nagasaki seafood.",
      ja: "銅座にあるカウンター寿司店。その日仕入れた鮮魚を使ったおまかせコースが中心の、特別な夜に向く一軒です。",
      zhCN: "位于铜座的吧台寿司店，以当日进货的新鲜海鲜制作主厨精选套餐，适合特别夜晚的选择。",
      zhTW: "位於銅座的吧檯壽司店，以當日進貨的新鮮海鮮製作主廚精選套餐，適合特別夜晚的選擇。",
      ko: "도자에 있는 카운터 스시집으로, 그날 들어온 신선한 생선으로 만드는 오마카세 코스가 중심인 특별한 밤을 위한 곳입니다.",
    },

    menu: [
      {
        id: "omakase",
        name: "Chef's Omakase Nigiri",
        nameJa: "おまかせにぎり",
        nameI18n: { en: "Chef's Omakase Nigiri", zhCN: "主厨精选握寿司", zhTW: "主廚精選握壽司", ko: "오마카세 니기리", ja: "おまかせにぎり" },
        price: "¥4,000",
        img: "menu1.jpg",
      },
    ],
  },
  {
    id: "koda-shokudo",
    name: "Koda Shokudo",
    nameJa: "甲田食堂",
    nameI18n: { en: "Koda Shokudo", zhCN: "甲田食堂", zhTW: "甲田食堂", ko: "코다 쇼쿠도", ja: "甲田食堂" },
    heroDish: { name: { en: "Salmon & Salmon Roe Rice Bowl", zhCN: "三文鱼鱼子盖饭", zhTW: "鮭魚魚卵蓋飯", ko: "연어 이쿠라 덮밥", ja: "サーモンいくら丼" }, image: 'exterior.jpg' },
    category: "Japanese",
    area: "Dōza-machi, Nagasaki",
    areaJa: "長崎市銅座町",
    areaI18n: { en: "Dōza-machi, Nagasaki", zhCN: "长崎铜座町", zhTW: "長崎銅座町", ko: "나가사키 도자마치", ja: "長崎市銅座町" },

    geo: { lat: 32.742546, lng: 129.878235 },
    address: "〒850-0841 長崎県長崎市銅座町15-16",
    hours: {
      sun: null,
      mon: null,
      tue: ["11:30–18:30"],
      wed: ["11:30–18:30"],
      thu: ["11:30–18:30"],
      fri: ["11:30–18:30"],
      sat: ["11:30–18:30"],
    },

    photoBase: "/shops/koda-shokudo",
    exterior: 'exterior.jpg',

    description: {
      en: "A set-meal diner run directly by a local fishmonger, serving teishoku built around whatever fresh fish came in that day — simple, honest seafood cooking.",
      ja: "鮮魚店直営の定食店。その日仕入れた魚を使った定食が中心で、新鮮な魚介を気軽に楽しめます。",
      zhCN: "由鲜鱼店直营的定食店，以当日进货的鲜鱼制作定食为主，能轻松品尝新鲜海鲜。",
      zhTW: "由鮮魚店直營的定食店，以當日進貨的鮮魚製作定食為主，能輕鬆品嚐新鮮海鮮。",
      ko: "생선 가게가 직접 운영하는 정식 식당으로, 그날 들어온 신선한 생선으로 만드는 정식이 중심입니다.",
    },

    menu: [
      {
        id: "salmon-ikura-don",
        name: "Salmon & Salmon Roe Rice Bowl",
        nameJa: "サーモンいくら丼",
        nameI18n: { en: "Salmon & Salmon Roe Rice Bowl", zhCN: "三文鱼鱼子盖饭", zhTW: "鮭魚魚卵蓋飯", ko: "연어 이쿠라 덮밥", ja: "サーモンいくら丼" },
        img: "menu1.jpg",
      },
      {
        id: "nagasaki-kaisen-don-set",
        name: "Nagasaki Seafood Rice Bowl Set",
        nameJa: "長崎海鮮丼セット",
        nameI18n: { en: "Nagasaki Seafood Rice Bowl Set", zhCN: "长崎海鲜盖饭套餐", zhTW: "長崎海鮮蓋飯套餐", ko: "나가사키 해산물 덮밥 세트", ja: "長崎海鮮丼セット" },
        img: "menu2.jpg",
      },
      {
        id: "sashimi-moriawase",
        name: "Assorted Sashimi",
        nameJa: "刺身の盛り合わせ",
        nameI18n: { en: "Assorted Sashimi", zhCN: "生鱼片拼盘", zhTW: "生魚片拼盤", ko: "모둠 사시미", ja: "刺身の盛り合わせ" },
        img: "menu3.jpg",
      },
    ],
  },
]

// id から店舗を取得
export const getShopById = (id) => shops.find((s) => s.id === id)

// 店舗内のメニュー項目を id で取得
export const getMenuItem = (shop, menuId) =>
  shop ? shop.menu.find((m) => m.id === menuId) : undefined

// 画像のフルパスを組み立てる小ヘルパー（photoBase + ファイル名）
export const shopImageUrl = (shop, file) =>
  file ? `${shop.photoBase}/${file}` : null
