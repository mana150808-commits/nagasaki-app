// 店舗データの一元管理。
// 新しいお店を追加するには、この配列に1オブジェクト足すだけ（30店以上でもOK）。
// 任意で public/shops/<id>/ に写真(jpg)を置けば、プレースホルダーから自動で差し替わる。
//
// ▼ マップ差し替えについて：
//   このデータはマップ実装に依存しない。現・仮マップ(MapView)は map.x/map.y(%) を使うが、
//   将来 Google Maps 等に差し替える際は geo.lat/geo.lng を使えばよく、
//   店舗ページ(ShopPage)は一切変更不要。

export const shops = [
  {
    id: 'asa',
    name: 'ASA Kisaburo',
    nameJa: '亜紗　喜三郎',
    category: 'Izakaya',
    area: 'Dōza-machi, Nagasaki',
    areaJa: '長崎市銅座町',

    // 現・仮マップ用の位置（%座標）
    map: { x: 56, y: 42 },
    // 将来の実地図用（差し替え時に使用）
    geo: { lat: null, lng: null },

    // 画像フォルダ規約： public/shops/<id>/ に置く
    photoBase: '/shops/asa',
    exterior: 'exterior.jpg',

    // ※ 亜紗は実在店のため、以下は差し替え前提の一般的なサンプル文。
    description:
      'Robata Asa Kisaburo is operated by the "Asa Group," a highly popular ' +
      'seafood izakaya chain in Nagasaki City. Located in the Doza entertainment ' +
      'district, the restaurant offers fresh, seasonal sashimi landed at local ' +
      'Nagasaki ports, as well as seafood and vegetables grilled to aromatic ' +
      'perfection over a robata (open hearth). With its refined Japanese-style ' +
      'atmosphere and warm hospitality, it is a beloved establishment cherished ' +
      'not only by locals for banquets and business entertaining but also by ' +
      'tourists eager to savor Nagasaki’s local sake and seasonal flavors.',

    // 代表的なメニュー（写真3〜5枚）。
    // 各項目に id を付けると /shop/<shopId>/menu/<id> の詳細ページになる。
    // nameJa / romaji / price / description は任意（無ければ詳細ページで非表示）。
    // ※ 価格・説明は実データ不明のため差し替え前提のサンプル。
    menu: [
      {
        id: 'sashimi',
        name: 'Assorted sashimi platter',
        nameJa: '刺身盛り合わせ',
        romaji: 'Sashimi moriawase',
        price: 'Approx. ¥1,600 – ¥2,000',
        img: 'menu1.jpg',
        description:
          'A vibrant selection of locally caught, seasonal raw fish served at ' +
          'peak freshness. Nagasaki is renowned for its rich waters, making this ' +
          "platter the absolute best way to experience the region's finest seafood.",
      },
      {
        id: 'turban-shell',
        name: 'Grilled Turban Shell',
        nameJa: 'さざえの壺焼き',
        romaji: 'Sazae no tsuboyaki',
        price: 'Approx. ¥700 – ¥1,000',
        img: 'menu2.jpg',
        description:
          'Fresh turban shell snail grilled right in its shell over an open flame ' +
          'with soy sauce and dashi broth. It offers a chewy texture and a rich, ' +
          'savory ocean flavor.',
      },
      {
        id: 'wagyu-steak',
        name: 'Wagyu Steak',
        nameJa: '和牛ステーキ',
        romaji: 'Wagyū sutēki',
        price: 'Approx. ¥1,500 – ¥2,500',
        img: 'menu3.jpg',
        description:
          'Tender, beautifully marbled Japanese Wagyu beef seared to perfection. ' +
          'Juicy and melt-in-your-mouth tender, it is served with savory local ' +
          'seasonings to highlight the natural richness of the meat.',
      },
      {
        id: 'hatoshi',
        name: 'Hatoshi',
        nameJa: 'ハトシ',
        romaji: 'Hatoshi',
        price: 'Approx. ¥600 – ¥800',
        img: 'menu4.jpg',
        description:
          'A classic Nagasaki specialty featuring a savory minced shrimp paste ' +
          'sandwiched between thin slices of white bread and fried until crispy ' +
          'and golden brown. Crunchy on the outside and tender on the inside.',
      },
    ],
  },

  {
    id: 'irish-pub',
    name: 'Irish Pub Nagasaki',
    nameJa: '',
    category: 'Bar',
    area: 'Near Nagasaki Station',
    areaJa: '長崎駅周辺',

    // 現・仮マップ用の位置（%座標）※長崎駅寄り（港側）に配置
    map: { x: 16, y: 20 },
    geo: { lat: null, lng: null },

    photoBase: '/shops/irish-pub',
    exterior: 'exterior.jpg',

    description:
      'Irish Pub Nagasaki is a welcoming and vibrant British/Irish-style pub ' +
      'located right near Nagasaki Station. Known for its casual atmosphere, ' +
      'friendly staff, and English-friendly environment, it is a top gathering ' +
      'spot for international travelers and locals alike. Whether you want to ' +
      'enjoy a cold pint of Guinness, watch sports, or socialize with fellow ' +
      'travelers, this pub offers an easygoing, pay-as-you-go setup that makes ' +
      'everyone feel at home.',

    menu: [
      {
        id: 'guinness',
        name: 'Guinness Draught',
        price: 'Approx. ¥1,320',
        img: 'menu1.jpg',
        description:
          'A quintessential pub staple. Served fresh on tap with a rich, creamy ' +
          'head and smooth malt flavour, perfect for kicking off your evening.',
      },
      {
        id: 'fish-and-chips',
        name: 'Fish & Chips',
        price: 'Large ¥1,100 / Small ¥660',
        img: 'menu2.jpg',
        description:
          'Crispy beer-battered fish served with golden fries. It is ' +
          'traditionally enjoyed with malt vinegar drizzled over top — a classic ' +
          'pairing with a cold pint of beer.',
      },
      {
        id: 'shepherds-pie',
        name: "Shepherd's Pie",
        price: 'Approx. ¥770',
        img: 'menu3.jpg',
        description:
          'A comforting British pub classic featuring seasoned minced meat topped ' +
          'with a layer of smooth mashed potato and baked until golden brown.',
      },
      {
        id: 'nagasaki-pickles',
        name: 'Nagasaki Pickles',
        price: 'Approx. ¥550',
        img: 'menu4.jpg',
        description:
          'Homemade pickles made using fresh, locally sourced Nagasaki vegetables. ' +
          'A light, tangy, and refreshing bar snack to go with your drinks.',
      },
    ],
  },

  {
    id: 'base',
    name: 'cafe＆bar BASE',
    nameJa: '',
    category: 'Cafe & Bar',
    area: 'Near Shianbashi',
    areaJa: '思案橋周辺',

    // 現・仮マップ用の位置（%座標）※思案橋寄り
    map: { x: 36, y: 80 },
    geo: { lat: null, lng: null },

    photoBase: '/shops/base',
    exterior: 'exterior.jpg',

    description:
      'cafe＆bar BASE is a stylish and versatile cafe-bar located just a 2-minute ' +
      'walk from the Shianbashi tram stop. Combining a modern, welcoming atmosphere ' +
      'with a broad menu that covers everything from specialty coffees and desserts ' +
      'to craft cocktails, beers, and hearty meals, it is a great spot for any time ' +
      'of day. Whether you want to enjoy a late lunch, relax with sweet French ' +
      'toast, or have a casual drink in a cozy setting, this friendly spot welcomes ' +
      'international travelers with open arms.',

    menu: [
      {
        id: 'base-burger',
        name: 'Signature BASE Burger',
        price: 'Approx. ¥1,150',
        img: 'menu1.jpg',
        description:
          'The house-specialty burger loaded with a juicy beef patty, fresh ' +
          'lettuce, tomatoes, melted cheese, and a flavorful teriyaki sauce with a ' +
          'touch of mustard. A hearty meal that pairs amazingly with a cold beer.',
      },
      {
        id: 'berry-french-toast',
        name: 'Berry French Toast',
        price: 'Approx. ¥1,150',
        img: 'menu2.jpg',
        description:
          'A fluffy, thick-cut French toast topped with vanilla ice cream, rich ' +
          'mixed berry sauce, and crunchy granola. One of the most popular sweet ' +
          'treats on the menu, ideal for dessert or a café coffee break.',
      },
      {
        id: 'hamburger-doria',
        name: 'Tomato Sauce Hamburger Doria',
        price: 'Approx. ¥1,000',
        img: 'menu3.jpg',
        description:
          'A comforting Japanese-style baked rice dish topped with a juicy ' +
          'hamburger patty, rich tomato sauce, and melted cheese, served piping ' +
          'hot. A satisfying and flavorful comfort food loved by locals.',
      },
      {
        id: 'design-latte',
        name: 'Design Latte',
        price: 'Coffee from approx. ¥500',
        img: 'menu4.jpg',
        description:
          'Enjoy beautiful latte art or choose from a wide selection of alcoholic ' +
          'beverages including classic cocktails, spirits, and beers in a relaxed ' +
          'atmosphere.',
      },
    ],
  },

  {
    id: 'iwi',
    name: 'BAR IWI',
    nameJa: '',
    category: 'Bar',
    area: 'Shianbashi',
    areaJa: '思案橋',

    // 現・仮マップ用の位置（%座標）※思案橋エリア
    map: { x: 84, y: 76 },
    geo: { lat: null, lng: null },

    photoBase: '/shops/iwi',
    exterior: 'exterior.jpg',

    // メニュー写真がイメージ画である旨を表示（設定した店舗のみ表示される）
    menuImageNote: 'Menu photos are for illustration purposes only.',

    description:
      'BAR IWI is a popular and welcoming international bar located in the ' +
      'Shianbashi nightlife district, run by a friendly New Zealander owner. It is ' +
      'famous among both locals and expats for its warm, inclusive vibe, making it ' +
      'one of the easiest places in Nagasaki for international travelers to walk in ' +
      'and feel right at home. Whether you are looking for a relaxed drink on a ' +
      'weeknight or a lively music-filled atmosphere on the weekend, it is a ' +
      'fantastic spot to connect with locals and fellow travelers.',

    menu: [
      {
        id: 'house-cocktails',
        name: 'Special House Cocktails',
        price: 'Approx. ¥800',
        img: 'menu1.jpg',
        description:
          'Freshly mixed signature cocktails crafted by the owner. Delicious, ' +
          'creative, and perfect for kicking off your evening in Shianbashi.',
      },
      {
        id: 'spirits-mixers',
        name: 'Standard Spirits & Mixers',
        price: 'Approx. ¥500 – ¥700',
        img: 'menu2.jpg',
        description:
          'Simple, high-quality standard drinks like Gin & Tonics, Highballs, or ' +
          'Rum & Cokes served at very reasonable prices.',
      },
      {
        id: 'beers',
        name: 'Domestic & Imported Beers',
        price: 'Approx. ¥600 – ¥800',
        img: 'menu3.jpg',
        description:
          'A selection of ice-cold bottled and draft beers, perfect for sipping ' +
          'casually while chatting at the bar counter.',
      },
      {
        id: 'bar-snacks',
        name: 'Casual Bar Snacks',
        price: 'Approx. ¥400 – ¥600',
        img: 'menu4.jpg',
        description:
          'Light and easy finger foods — such as mixed nuts or chips — ideal for ' +
          'sharing over drinks with new friends.',
      },
    ],
  },

  {
    id: 'pure',
    name: 'Nagasaki Wagyu Yakiniku Pure',
    nameJa: '',
    category: 'Yakiniku',
    area: 'Near Shinchi Chinatown',
    areaJa: '新地中華街周辺',

    // 現・仮マップ用の位置（%座標）※新地中華街寄り（中央）
    map: { x: 40, y: 58 },
    geo: { lat: null, lng: null },

    photoBase: '/shops/pure',
    exterior: 'exterior.jpg',

    description:
      'Nagasaki Wagyu Yakiniku Pure is a premier Japanese BBQ restaurant directly ' +
      'operated by JA Zennoh Nagasaki (the local agricultural cooperative). It is ' +
      'famous for serving top-tier, authentic Nagasaki Wagyu beef — celebrated for ' +
      'its tender texture, deep marbling, and rich, savory flavor — at reasonable ' +
      'prices. Featuring clean, modern Japanese-style seating and user-friendly ' +
      'ordering (often with multi-language tablet menus), it provides an ' +
      'exceptionally comfortable and high-quality Wagyu dining experience for ' +
      'international travelers.',

    menu: [
      {
        id: 'wagyu-assortment',
        name: 'Premium Nagasaki Wagyu Assortment',
        price: 'Approx. ¥6,000 – ¥8,000 (ideal for 2–3 people)',
        img: 'menu1.jpg',
        description:
          'A luxurious platter featuring various highly marbled cuts of Nagasaki ' +
          'Wagyu, such as sirloin, premium rib (Karubi), and loin (Rosu). It is the ' +
          'ultimate way to taste and compare different rich textures and ' +
          'melt-in-your-mouth flavors.',
      },
      {
        id: 'wagyu-sirloin-karubi',
        name: 'Thick-Cut Karubi',
        price: '¥3,190',
        img: 'menu2.jpg',
        description:
          'Thickly sliced cuts of top-grade Nagasaki Wagyu grilled directly over ' +
          'heat at your table. Simply seasoned with a touch of sea salt and freshly ' +
          "grated wasabi to highlight the beef's natural, rich Umami.",
      },
      {
        id: 'cold-noodles-bibimbap',
        name: 'Cold Noodles',
        price: '¥1,078',
        img: 'menu3.jpg',
        description:
          'A perfect side dish or meal-closer to go with rich BBQ. The refreshing, ' +
          'chewy Japanese-style cold noodles (Reimen) serve as a fantastic palate ' +
          'cleanser after enjoying flavorful Wagyu meats.',
      },
      {
        id: 'highball-beer',
        name: 'Nagasaki Local Sake',
        price: 'Approx. ¥800 – ¥1,200 per glass',
        img: 'menu4.jpg',
        description:
          'Premium local Japanese sake produced in Nagasaki Prefecture. Served ' +
          'chilled, these sakes offer a clean, crisp finish that pairs exquisitely ' +
          'with the rich, savory flavors of grilled Nagasaki Wagyu beef.',
      },
    ],
  },

  {
    id: 'kamadojyaya',
    name: 'Kamadojyaya',
    nameJa: '',
    category: 'Izakaya',
    area: 'Shianbashi',
    areaJa: '思案橋',

    // 現・仮マップ用の位置（%座標）※思案橋エリア
    map: { x: 66, y: 62 },
    geo: { lat: null, lng: null },

    photoBase: '/shops/kamadojyaya',
    exterior: 'exterior.jpg',

    description:
      'Kamadojyaya is a long-established Japanese izakaya located in the heart of ' +
      'the Shianbashi nightlife area. Founded in 1978, it offers a warm, nostalgic ' +
      'Japanese dining atmosphere where you can savor local Nagasaki seafood, whale ' +
      'dishes, and unique regional hot pots. The restaurant features a comprehensive ' +
      'English menu as well as photo-friendly dishes, making it exceptionally ' +
      'welcoming and stress-free for international travelers who want to experience ' +
      'authentic Japanese pub culture.',

    menu: [
      {
        id: 'seasonal-sashimi',
        name: 'Sashimi of seasonal fish',
        price: 'Approx. ¥2,000 – ¥2,500',
        img: 'menu1.jpg',
        description:
          'A beautiful platter of super-fresh, locally caught seasonal fish from ' +
          "Nagasaki's coastal waters. Sliced to order, it is the best way to " +
          'experience the renowned quality of Nagasaki’s seafood.',
      },
      {
        id: 'whale-three-piece',
        name: 'Whale three-piece set',
        price: 'Approx. ¥2,400',
        img: 'menu2.jpg',
        description:
          'A special chef’s selection of three different cuts of whale meat — a ' +
          'rare, traditional delicacy representing Nagasaki’s unique food culture.',
      },
      {
        id: 'dutch-hot-pot',
        name: 'Specialty “Dutch hot pot”',
        price: 'Approx. ¥1,500 – ¥2,000',
        img: 'menu3.jpg',
        description:
          'A unique Nagasaki fusion hot pot loaded with fresh seafood, mushrooms, ' +
          'and seasonal vegetables simmered in a creamy milk broth, topped with ' +
          "freshly grated Parmigiano cheese. A hearty, comforting dish reflecting " +
          "Nagasaki's historic Western influence.",
      },
      {
        id: 'miso-oden',
        name: 'Specialty miso oden',
        price: 'Approx. ¥800 – ¥1,200',
        img: 'menu4.jpg',
        description:
          'Japanese comfort food featuring ingredients like daikon radish, konjac, ' +
          'and beef tendon simmered in savory broth, served with rich red and sweet ' +
          'white miso sauces. A comforting winter-style delicacy that pairs ' +
          'wonderfully with Japanese sake.',
      },
    ],
  },

  {
    id: 'tito-dragon',
    name: 'Darts Cafe TiTO Dragon',
    nameJa: '',
    category: 'Bar',
    area: 'Shianbashi',
    areaJa: '思案橋',

    // 現・仮マップ用の位置（%座標）※思案橋（電停横）
    map: { x: 82, y: 40 },
    geo: { lat: null, lng: null },

    photoBase: '/shops/tito-dragon',
    exterior: 'exterior.jpg',

    description:
      'Darts Cafe TiTO Dragon is a lively and spacious sports-and-darts bar located ' +
      'right next to the Shianbashi tram stop. Equipped with modern electronic dart ' +
      'boards, large TV screens for sports viewing, and a relaxed counter area, it ' +
      'is a favorite spot for young locals and international travelers alike. With a ' +
      'wide selection of drinks, casual bar food, and an English menu available, it ' +
      'provides a fun, interactive environment where anyone can easily play a game ' +
      'of darts and socialize.',

    menu: [
      {
        id: 'tequila-horn',
        name: '"Ring the Horn for Tequila!" Shot',
        nameJa: '鳴らすと危険！ワンパフテキーラ',
        price: '¥700 per shot',
        img: 'menu1.jpg',
        description:
          'A fun and playful bar game! Blow the horn on your table once, and a shot ' +
          'of Tequila will immediately be served to your table (blow it three times, ' +
          'and you get three shots!). Perfect for party tricks or drinking games ' +
          'with friends.',
      },
      {
        id: 'darts-games',
        name: 'Darts & Various Party Games',
        price: 'Darts from approx. ¥100 per game / Board games available',
        img: 'menu2.jpg',
        description:
          'In addition to modern electronic darts, the bar offers a wide variety of ' +
          'fun party and table games. A fantastic way to break the ice, enjoy ' +
          'drinks, and make unforgettable memories with friends and locals.',
      },
      {
        id: 'margherita-pizza',
        name: 'Margherita Pizza',
        nameJa: 'マルゲリータピザ',
        price: '¥800',
        img: 'menu3.jpg',
        description:
          'A classic oven-baked pizza with rich tomato sauce, melted mozzarella ' +
          'cheese, and fragrant basil. A crowd-pleasing comfort food that pairs ' +
          'effortlessly with a cold draft beer or cocktail.',
      },
      {
        id: 'assorted-sausages',
        name: 'Assorted Sausages',
        nameJa: 'ソーセージの盛り合わせ',
        price: '¥700',
        img: 'menu4.jpg',
        description:
          'A platter of juicy, grilled assorted sausages served with mustard. Hot, ' +
          'savory, and easy to eat while playing games or watching sports matches.',
      },
    ],
  },

  {
    id: 'shunsai-nagaya',
    name: 'Shunsai Nagaya',
    nameJa: '',
    category: 'Izakaya',
    area: 'Near Shianbashi & Doza',
    areaJa: '思案橋・銅座周辺',

    // 現・仮マップ用の位置（%座標）※思案橋・銅座エリア
    map: { x: 70, y: 90 },
    geo: { lat: null, lng: null },

    photoBase: '/shops/shunsai-nagaya',
    exterior: 'exterior.jpg',

    description:
      'Shunsai Nagaya is a refined yet accessible Japanese izakaya located near the ' +
      'Shianbashi and Doza nightlife districts. Celebrated for its creative Japanese ' +
      'cuisine, the restaurant highlights local Nagasaki seafood, top-grade Wagyu, ' +
      'and unique regional ingredients in a modern, welcoming atmosphere. It is an ' +
      'exceptional spot for international travelers seeking an authentic, ' +
      'high-quality Japanese dining experience paired with fine local sake.',

    menu: [
      {
        id: 'wagyu-tempura',
        name: 'Nagasaki Kuroge Wagyu Beef Tempura',
        price: '¥1,380',
        img: 'menu1.jpg',
        description:
          'Luxurious tempura featuring top-tier Nagasaki Kuroge Wagyu beef. ' +
          'Deep-fried with a light, crispy batter that locks in the rich Umami and ' +
          'juicy texture of the Wagyu, offering a novel twist on traditional tempura.',
      },
      {
        id: 'shimaaji-shabu',
        name: 'Yukou Shima-Aji Shabu-Shabu with Goto Udon Finish',
        price: '¥2,500',
        img: 'menu2.jpg',
        description:
          'Striped Jack (Shima-Aji) raised in Toishi, Nagasaki, fed with "Yukou" — a ' +
          'rare, traditional Nagasaki citrus. Swished briefly in hot broth, this ' +
          'firm, flavorful fish loses all fishiness while retaining its rich fat. ' +
          'Served with famous Goto Udon noodles to finish the meal.',
      },
      {
        id: 'pork-lemon-butter',
        name: 'Pork Shoulder Roast Lemon Butter Steak on Hot Plate',
        price: '¥1,280',
        img: 'menu3.jpg',
        description:
          'Juicy pork shoulder roast cooked on a ceramic hot plate (Toban) with a ' +
          'savory lemon-butter sauce. The refreshing citrus notes cut through the ' +
          'richness of the pork, creating an irresistible aroma and taste.',
      },
      {
        id: 'sake-tasting',
        name: "Shunsai Nagaya's Selected Sake Tasting Set",
        price: '¥1,980',
        img: 'menu4.jpg',
        description:
          'A carefully curated flight of fine Japanese sakes chosen by the ' +
          'restaurant. A perfect option for international guests who want to sample, ' +
          'compare, and discover different flavor profiles of premium Japanese sake.',
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
